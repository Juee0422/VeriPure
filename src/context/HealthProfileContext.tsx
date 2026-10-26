import React, { createContext, useContext } from 'react';
import { HealthCondition, ProductVerificationData } from '../types';
import { useAuth } from './AuthContext';

export interface HealthMatchReport {
  overallStatus: 'safe' | 'caution' | 'danger';
  headline: string;
  matchedRules: {
    condition: HealthCondition;
    status: 'safe' | 'caution' | 'danger';
    title: string;
    description: string;
    criticalMetric?: string;
  }[];
}

interface HealthProfileContextType {
  activeConditions: HealthCondition[];
  toggleCondition: (condition: HealthCondition) => void;
  evaluateProductForUser: (product: ProductVerificationData) => HealthMatchReport;
}

const HealthProfileContext = createContext<HealthProfileContextType | undefined>(undefined);

export const HealthProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUserConditions } = useAuth();
  const activeConditions: HealthCondition[] = user ? user.activeConditions : ['diabetic', 'low_sodium'];

  const toggleCondition = (condition: HealthCondition) => {
    let next: HealthCondition[];
    if (activeConditions.includes(condition)) {
      next = activeConditions.filter((c: HealthCondition) => c !== condition);
    } else {
      next = [...activeConditions, condition];
    }
    updateUserConditions(next);
  };

  const evaluateProductForUser = (product: ProductVerificationData): HealthMatchReport => {
    const matchedRules: HealthMatchReport['matchedRules'] = [];
    const macros = product.nutrition.macros;
    const allergens = product.nutrition.allergens.map(a => a.toLowerCase());
    const ingredients = (product.nutrition.ingredientsListText || '').toLowerCase();

    // 1. Diabetic Check
    if (activeConditions.includes('diabetic')) {
      const sugarVal = macros.sugars.amount;
      if (sugarVal > 15) {
        matchedRules.push({
          condition: 'diabetic',
          status: 'danger',
          title: `⚠️ WARNING: Contains ${sugarVal}g Sugar — Exceeds your Diabetic profile limit of 15g/snack`,
          description: `Contains ${sugarVal}g sugar per serving (Exceeds diabetic maximum limit of 15g/snack). High risk of acute glycemic spike and insulin shock.`,
          criticalMetric: `${sugarVal}g Sugar / Serving`
        });
      } else if (sugarVal > 8) {
        matchedRules.push({
          condition: 'diabetic',
          status: 'caution',
          title: 'Moderate Sugar Load (Monitor Glycemic Index)',
          description: `Contains ${sugarVal}g sugar. Recommend pairing with high-fiber foods to mitigate absorption speed.`,
          criticalMetric: `${sugarVal}g Sugar`
        });
      } else {
        matchedRules.push({
          condition: 'diabetic',
          status: 'safe',
          title: 'Diabetic Friendly Carbohydrate Level',
          description: `Low sugar content (${sugarVal}g). Minimal impact on glycemic index.`,
          criticalMetric: `${sugarVal}g Sugar`
        });
      }
    }

    // 2. Hypertension / High Blood Pressure Check
    if (activeConditions.includes('hypertension')) {
      const sodiumVal = macros.sodium.amount;
      const hasCaffeine = product.nutrition.additives.some(a => a.name.toLowerCase().includes('caffeine')) || ingredients.includes('caffeine');
      if (sodiumVal > 350 || hasCaffeine) {
        matchedRules.push({
          condition: 'hypertension',
          status: 'danger',
          title: hasCaffeine ? 'High Stimulant / Vasoconstriction Risk' : 'High Sodium Warning (Hypertension)',
          description: hasCaffeine 
            ? `Contains active caffeine / stimulant compounds which directly elevate peripheral arterial pressure.`
            : `Contains ${sodiumVal}mg sodium (Exceeds safe hypertensive threshold of 350mg). May elevate arterial blood pressure.`,
          criticalMetric: `${sodiumVal}mg Sodium`
        });
      } else {
        matchedRules.push({
          condition: 'hypertension',
          status: 'safe',
          title: 'Cardiovascular Safe Sodium Level',
          description: `Sodium levels (${sodiumVal}mg) are well within controlled arterial limits.`,
          criticalMetric: `${sodiumVal}mg Sodium`
        });
      }
    }

    // 3. Lactose Intolerant Check
    if (activeConditions.includes('lactose_intolerant')) {
      const dairyKeywords = ['milk', 'whey', 'casein', 'lactose', 'butter', 'cream', 'dairy', 'cheese', 'yogurt'];
      const hasDairy = allergens.some(a => dairyKeywords.some(kw => a.includes(kw))) ||
                        dairyKeywords.some(kw => ingredients.includes(kw));

      if (hasDairy) {
        matchedRules.push({
          condition: 'lactose_intolerant',
          status: 'danger',
          title: '⚠️ WARNING: Contains Dairy / Lactose Sugar',
          description: 'Product formulated with milk solids, whey, or lactose. High risk of acute gastrointestinal distress and bloating for lactose intolerant individuals.',
          criticalMetric: 'Dairy / Lactose Present'
        });
      } else {
        matchedRules.push({
          condition: 'lactose_intolerant',
          status: 'safe',
          title: 'Dairy-Free & Lactose-Free Verified',
          description: 'Contains no milk byproducts or lactose sugars on official label declaration.',
          criticalMetric: '100% Lactose-Free'
        });
      }
    }

    // 4. Nut Allergy Check
    if (activeConditions.includes('nut_allergy')) {
      const nutKeywords = ['nut', 'peanut', 'hazelnut', 'almond', 'walnut', 'cashew', 'pistachio', 'macadamia', 'pecan'];
      const foundNutAllergen = allergens.some(a => nutKeywords.some(kw => a.includes(kw))) ||
                               nutKeywords.some(kw => ingredients.includes(kw));

      if (foundNutAllergen) {
        matchedRules.push({
          condition: 'nut_allergy',
          status: 'danger',
          title: 'CRITICAL ALLERGEN: Contains Tree Nuts / Peanuts',
          description: 'Contains whole or processed nut proteins. Extreme risk of acute anaphylaxis and airway restriction.',
          criticalMetric: 'Severe Allergen Present'
        });
      } else {
        matchedRules.push({
          condition: 'nut_allergy',
          status: 'safe',
          title: 'No Tree Nuts or Peanuts Identified',
          description: 'No nut proteins declared on official formulation ingredients list.',
          criticalMetric: 'Nut-Free Formulation'
        });
      }
    }

    // 5. Weight Loss Check
    if (activeConditions.includes('weight_loss')) {
      const calories = product.nutrition.calories;
      const sugarVal = macros.sugars.amount;
      const fatVal = macros.fats.amount;

      if (calories > 250 || sugarVal > 15 || fatVal > 12) {
        matchedRules.push({
          condition: 'weight_loss',
          status: 'caution',
          title: 'High Calorie & Energy Density',
          description: `Delivers ${calories} kcal (${fatVal}g fat, ${sugarVal}g sugars). Recommend consuming in portion-controlled quantities to maintain caloric deficit.`,
          criticalMetric: `${calories} kcal / Serving`
        });
      } else {
        matchedRules.push({
          condition: 'weight_loss',
          status: 'safe',
          title: 'Calorie Deficit Friendly',
          description: `Moderate energy density (${calories} kcal). Easily fits into daily structured caloric budget.`,
          criticalMetric: `${calories} kcal`
        });
      }
    }

    // 6. Gluten Free / Celiac Check
    if (activeConditions.includes('gluten_free')) {
      const glutenKeywords = ['wheat', 'barley', 'rye', 'gluten', 'malt', 'maltodextrin (wheat)'];
      const hasGluten = allergens.some(a => glutenKeywords.some(kw => a.includes(kw))) ||
                        glutenKeywords.some(kw => ingredients.includes(kw));

      if (hasGluten) {
        matchedRules.push({
          condition: 'gluten_free',
          status: 'danger',
          title: 'Gluten Warning: Contains Wheat or Cereal Grains',
          description: 'Contains gluten-bearing grains. Triggers autoimmune intestinal villi inflammation in celiac individuals.',
          criticalMetric: 'Gluten Detected'
        });
      } else {
        matchedRules.push({
          condition: 'gluten_free',
          status: 'safe',
          title: 'Gluten-Free Ingredients',
          description: 'No wheat, rye, or barley detected in verified formulation.',
          criticalMetric: 'Gluten Safe'
        });
      }
    }

    // 7. Vegan Check
    if (activeConditions.includes('vegan')) {
      const animalKeywords = ['milk', 'whey', 'casein', 'gelatin', 'egg', 'honey', 'carmine', 'cochineal', 'lard', 'bovine'];
      const hasAnimal = allergens.some(a => animalKeywords.some(kw => a.includes(kw))) ||
                        animalKeywords.some(kw => ingredients.includes(kw));

      if (hasAnimal) {
        matchedRules.push({
          condition: 'vegan',
          status: 'danger',
          title: 'Contains Animal Byproducts',
          description: 'Formulated with dairy, egg, honey, or animal derivatives. Incompatible with vegan lifestyle.',
          criticalMetric: 'Animal Derived'
        });
      } else {
        matchedRules.push({
          condition: 'vegan',
          status: 'safe',
          title: '100% Plant-Based Verified',
          description: 'Contains zero animal derivatives or slaughterhouse byproducts.',
          criticalMetric: 'Plant-Based'
        });
      }
    }

    // 8. Muscle Gain / High Protein Check
    if (activeConditions.includes('muscle_gain')) {
      const protein = macros.protein.amount;
      if (protein >= 15) {
        matchedRules.push({
          condition: 'muscle_gain',
          status: 'safe',
          title: 'High Anabolic Density (MPS Trigger)',
          description: `Excellent protein density (${protein}g). Sufficient to stimulate muscular leucine saturation threshold.`,
          criticalMetric: `${protein}g Protein`
        });
      } else {
        matchedRules.push({
          condition: 'muscle_gain',
          status: 'caution',
          title: 'Low Protein Content',
          description: `Contains only ${protein}g protein. Requires supplementary protein sources to reach hypertrophy targets.`,
          criticalMetric: `${protein}g Protein`
        });
      }
    }

    // 9. Low Sodium Check
    if (activeConditions.includes('low_sodium')) {
      const sodium = macros.sodium.amount;
      if (sodium > 200) {
        matchedRules.push({
          condition: 'low_sodium',
          status: 'danger',
          title: 'Exceeds Strict Sodium Threshold',
          description: `Contains ${sodium}mg sodium per serving (Budget limit: 200mg).`,
          criticalMetric: `${sodium}mg Sodium`
        });
      } else {
        matchedRules.push({
          condition: 'low_sodium',
          status: 'safe',
          title: 'Low Sodium Approved',
          description: `Only ${sodium}mg sodium, well below renal limit.`,
          criticalMetric: `${sodium}mg Sodium`
        });
      }
    }

    // Determine overall status
    const hasDanger = matchedRules.some(r => r.status === 'danger');
    const hasCaution = matchedRules.some(r => r.status === 'caution');
    const overallStatus: 'safe' | 'caution' | 'danger' = hasDanger ? 'danger' : hasCaution ? 'caution' : 'safe';

    let headline = 'Product is fully compatible with your active health profile!';
    if (hasDanger) {
      headline = 'WARNING: Product conflicts with your personalized health profile!';
    } else if (hasCaution) {
      headline = 'CAUTION: Product contains moderate ingredients to monitor.';
    }

    return {
      overallStatus,
      headline,
      matchedRules
    };
  };

  return (
    <HealthProfileContext.Provider
      value={{
        activeConditions,
        toggleCondition,
        evaluateProductForUser
      }}
    >
      {children}
    </HealthProfileContext.Provider>
  );
};

export const useHealthProfile = () => {
  const context = useContext(HealthProfileContext);
  if (!context) {
    throw new Error('useHealthProfile must be used within a HealthProfileProvider');
  }
  return context;
};

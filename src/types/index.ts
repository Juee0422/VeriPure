export type HealthCondition = 
  | 'diabetic' 
  | 'hypertension' 
  | 'lactose_intolerant'
  | 'nut_allergy' 
  | 'gluten_free' 
  | 'vegan' 
  | 'weight_loss'
  | 'muscle_gain' 
  | 'low_sodium';

export interface UserHealthProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  activeConditions: HealthCondition[];
  dailyCalorieTarget: number;
  maxSugarPerServing: number; // in grams
  maxSodiumPerServing: number; // in mg
  allergensList: string[];
  notes?: string;
}

export type VerificationCategory = 'SAFE' | 'SUSPICIOUS' | 'COUNTERFEIT';

// Maintained for full backwards compatibility while standardizing on 3 tiers: SAFE, SUSPICIOUS, COUNTERFEIT
export type AuthenticityStatus = 'SAFE' | 'SUSPICIOUS' | 'COUNTERFEIT' | 'VERIFIED_AUTHENTIC' | 'COUNTERFEIT_DETECTED';

export type NutriScoreGrade = 'A' | 'B' | 'C' | 'D' | 'E' | 'UNKNOWN';
export type NovaGroup = 1 | 2 | 3 | 4 | 0;

export interface VerificationCheck {
  status: 'pass' | 'fail' | 'warning';
  title: string;
  summary: string;
  details: string[];
  metricLabel?: string;
  metricValue?: string | number;
}

export interface XAIHeatmapRegion {
  id: string;
  label: string;
  confidence: number;
  box: { x: number; y: number; width: number; height: number }; // percentage 0-100
  status: 'authentic' | 'anomaly' | 'tampered';
  findingDescription: string;
  inspectionDetail: string;
}

export interface AdditiveInfo {
  code: string;
  name: string;
  riskLevel: 'low' | 'moderate' | 'high';
  description: string;
  commonUses: string;
}

export interface MacroNutrient {
  label: string;
  amount: number;
  unit: string;
  dailyValuePercentage: number;
  status: 'optimal' | 'moderate' | 'high';
}

export interface AIIntakeAdvice {
  productSummary: string;
  contextualAdvice: string;
  timingAdvice: string;
  safetyScoreIndex: number; // 0 - 100
  servingRecommendation: string;
  healthProfileImpacts: {
    condition: HealthCondition;
    status: 'safe' | 'caution' | 'danger';
    headline: string;
    description: string;
  }[];
}

export interface ProductVerificationData {
  id: string;
  barcode: string;
  barcodeFormat: string;
  productName: string;
  brand: string;
  category: string;
  packagingFrontImage: string;
  packagingBackImage?: string;
  barcodeImage?: string;
  authenticityStatus: AuthenticityStatus;
  authenticityScore: number; // 0 - 100
  msrpPrice: number;
  reportedMarketPrice?: number;
  verifiedTimestamp: string;
  lotBatchNumber?: string;
  originCountry: string;
  
  // 3-Layer + Price Checks
  checks: {
    barcodeRegistry: VerificationCheck;
    typographyInspection: VerificationCheck;
    packagingHologram: VerificationCheck;
    priceDistribution: VerificationCheck;
  };

  // Explainable AI Bounding Boxes on packaging image
  xaiHeatmapRegions: XAIHeatmapRegion[];

  // Nutrition & Quality Specs
  nutrition: {
    nutriScore: NutriScoreGrade;
    nutriScoreScore?: number;
    novaGroup: NovaGroup;
    servingSize: string;
    calories: number;
    macros: {
      protein: MacroNutrient;
      carbs: MacroNutrient;
      sugars: MacroNutrient;
      fats: MacroNutrient;
      saturatedFats: MacroNutrient;
      fiber: MacroNutrient;
      sodium: MacroNutrient;
    };
    additives: AdditiveInfo[];
    allergens: string[];
    ingredientsListText: string;
    packagingEcoScore?: string;
  };

  // AI Intake Guidance
  aiIntakeAdvice: AIIntakeAdvice;

  // Counterfeit Statistics
  fraudIntelligence?: {
    knownFakesCount: number;
    reportedIncidentLocations: string[];
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    officialManufacturerContact?: string;
  };
}

export interface ScanHistoryItem {
  id: string;
  product: ProductVerificationData;
  timestamp: string;
}

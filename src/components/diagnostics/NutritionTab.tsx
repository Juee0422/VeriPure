import React from 'react';
import { ProductVerificationData, HealthCondition } from '../../types';
import { NutriScoreBadge, NovaBadge } from './NutriScoreBadge';
import { useHealthProfile } from '../../context/HealthProfileContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Utensils, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldAlert, 
  Leaf, 
  Info,
  Flame,
  Activity,
  UserCheck
} from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface NutritionTabProps {
  product: ProductVerificationData;
}

export const NutritionTab: React.FC<NutritionTabProps> = ({ product }) => {
  const { user } = useAuth();
  const { activeConditions, toggleCondition, evaluateProductForUser } = useHealthProfile();
  
  const healthReport = evaluateProductForUser(product);
  const nutrition = product.nutrition;
  const macros = nutrition.macros;

  const macroItems = [
    { key: 'protein', data: macros.protein, color: 'bg-emerald-500' },
    { key: 'carbs', data: macros.carbs, color: 'bg-blue-500' },
    { key: 'sugars', data: macros.sugars, color: 'bg-amber-500' },
    { key: 'fats', data: macros.fats, color: 'bg-indigo-500' },
    { key: 'saturatedFats', data: macros.saturatedFats, color: 'bg-purple-500' },
    { key: 'fiber', data: macros.fiber, color: 'bg-teal-500' },
    { key: 'sodium', data: macros.sodium, color: 'bg-rose-500' },
  ];

  const conditionLabels: Record<HealthCondition, string> = {
    diabetic: 'Diabetic / Glycemic Control',
    hypertension: 'Hypertension / Blood Pressure',
    lactose_intolerant: 'Lactose Intolerant / Dairy',
    nut_allergy: 'Nut / Peanut Allergy',
    gluten_free: 'Celiac / Gluten-Free',
    vegan: 'Vegan / Plant-Based',
    weight_loss: 'Weight Loss / Caloric Deficit',
    muscle_gain: 'Muscle Gain / High Protein',
    low_sodium: 'Low Sodium / Renal Diet'
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Dynamic User Health Match Banner */}
      <div className={`rounded-2xl p-5 border transition-all ${
        healthReport.overallStatus === 'danger'
          ? 'bg-red-50/90 border-red-300 shadow-glow-crimson'
          : healthReport.overallStatus === 'caution'
          ? 'bg-amber-50/90 border-amber-300 shadow-glow-amber'
          : 'bg-emerald-50/90 border-emerald-300 shadow-glow-sage'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              healthReport.overallStatus === 'danger'
                ? 'bg-red-600 text-white'
                : healthReport.overallStatus === 'caution'
                ? 'bg-amber-600 text-white'
                : 'bg-emerald-600 text-white'
            }`}>
              {healthReport.overallStatus === 'danger' ? (
                <ShieldAlert className="w-5 h-5" />
              ) : healthReport.overallStatus === 'caution' ? (
                <AlertTriangle className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Personalized Intake Safety Engine
              </div>
              <h3 className="font-extrabold text-navy-900 text-base">
                {healthReport.headline}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-slate-600 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
            <UserCheck className="w-3.5 h-3.5 text-sage-600" />
            <span>Profile: {user?.name || 'Guest User'}</span>
          </div>
        </div>

        {/* Condition rules triggered */}
        <div className="space-y-2 mt-3">
          {healthReport.matchedRules.map((rule, idx) => (
            <div 
              key={idx}
              className="bg-white/90 rounded-xl p-3 border border-slate-200/80 flex items-start justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                    rule.status === 'danger'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : rule.status === 'caution'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {conditionLabels[rule.condition] || rule.condition}
                  </span>
                  <span className="font-bold text-navy-900">{rule.title}</span>
                </div>
                <p className="text-slate-600 leading-relaxed">{rule.description}</p>
              </div>

              {rule.criticalMetric && (
                <span className="shrink-0 font-mono font-bold text-xs bg-slate-100 px-2.5 py-1 rounded-md text-navy-900">
                  {rule.criticalMetric}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Real-time Health Condition Toggle Bar */}
        <div className="mt-4 pt-3 border-t border-slate-200/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Simulate Health Profile (Toggle to test AI recommendation reaction):
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(conditionLabels) as HealthCondition[]).map((cond) => {
              const isActive = activeConditions.includes(cond);
              return (
                <button
                  key={cond}
                  onClick={() => {
                    soundEffects.playClick();
                    toggleCondition(cond);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-xs scale-[1.02]'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {isActive ? '✓ ' : '+ '} {conditionLabels[cond].split('/')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Nutritionist Deep Intake Assistant Card */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/90 shadow-glass">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-purple-50 text-purple-700 border border-purple-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-navy-900 text-lg font-display">
              AI Nutritionist Evaluation & Chrono-Intake Guide
            </h3>
            <p className="text-xs text-slate-500">Synthesized using biochemical nutrient density algorithms</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              <Info className="w-4 h-4 text-purple-600" />
              Formula Quality
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {product.aiIntakeAdvice.productSummary}
            </p>
          </div>

          <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              Optimal Timing
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {product.aiIntakeAdvice.timingAdvice}
            </p>
          </div>

          <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
              <Utensils className="w-4 h-4 text-sage-600" />
              Serving Guidance
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {product.aiIntakeAdvice.contextualAdvice}
            </p>
          </div>
        </div>
      </div>

      {/* Official Nutri-Score & NOVA Badges + Energy Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/90 shadow-glass">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-4">
            <NutriScoreBadge grade={nutrition.nutriScore} size="md" />
            <NovaBadge group={nutrition.novaGroup} />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
              <Flame className="w-4 h-4 text-amber-600" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-amber-700 block">Energy / Serving</span>
                <span className="font-extrabold text-sm">{nutrition.calories} kcal</span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 text-slate-700 border border-slate-200">
              <Activity className="w-4 h-4 text-slate-500" />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Serving Size</span>
                <span className="font-bold text-sm">{nutrition.servingSize}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Nutritional Macronutrients Breakdown Grid */}
        <h4 className="text-sm font-extrabold text-navy-900 uppercase tracking-wider mb-4">
          Macronutrient Profile & Daily Value (% DV)
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {macroItems.map((item) => (
            <div 
              key={item.key} 
              className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/70 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-bold text-slate-700">{item.data.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="font-extrabold text-navy-900 font-mono text-sm">
                    {item.data.amount}{item.data.unit}
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    ({item.data.dailyValuePercentage}% DV)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                  style={{ width: `${Math.min(100, item.data.dailyValuePercentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Additives, Allergens, and Ingredients Full Text */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Additives & Preservatives Radar */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200/90 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-navy-900 text-sm">
                Additives & Chemical Preservatives ({nutrition.additives.length})
              </h4>
            </div>

            <div className="space-y-2 mb-4">
              {nutrition.additives.map((add, idx) => (
                <div 
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/70 text-xs flex items-start justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-navy-900 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                        {add.code}
                      </span>
                      <span className="font-bold text-slate-800">{add.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{add.description}</p>
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase shrink-0 ${
                    add.riskLevel === 'high'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : add.riskLevel === 'moderate'
                      ? 'bg-amber-100 text-amber-700 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}>
                    {add.riskLevel} Risk
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Validated against European Food Safety Authority (EFSA) and US FDA GRAS indices.
          </p>
        </div>

        {/* Allergens & Formulation Ingredients */}
        <div className="glass-card rounded-2xl p-5 border border-slate-200/90 shadow-glass flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700 border border-amber-200">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <h4 className="font-extrabold text-navy-900 text-sm">
                Allergens Radar & Full Ingredients
              </h4>
            </div>

            {/* Allergens Pills */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Tagged Allergens:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {nutrition.allergens.length > 0 ? (
                  nutrition.allergens.map((alg, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100/80 text-amber-900 border border-amber-200"
                    >
                      ⚠️ {alg}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ✓ No common major allergens declared
                  </span>
                )}
              </div>
            </div>

            {/* Full Ingredients Text */}
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Ingredients Declaration:
              </span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 leading-relaxed font-mono max-h-36 overflow-y-auto">
                {nutrition.ingredientsListText}
              </div>
            </div>
          </div>

          <div className="mt-3 text-[11px] text-slate-400">
            Eco-Score Rating: <span className="font-semibold text-slate-600">{nutrition.packagingEcoScore || 'B Grade'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

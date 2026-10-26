import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useHealthProfile } from '../context/HealthProfileContext';
import { HealthCondition } from '../types';
import { 
  HeartPulse, 
  User, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  Sliders, 
  Activity, 
  AlertTriangle,
  Save,
  CheckCircle2
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

export const ProfilePage: React.FC = () => {
  const { user, switchDemoProfile, updateUserConditions } = useAuth();
  const { activeConditions, toggleCondition } = useHealthProfile();

  const [savedNotification, setSavedNotification] = useState(false);
  const [calorieTarget, setCalorieTarget] = useState(user?.dailyCalorieTarget || 2000);
  const [maxSugar, setMaxSugar] = useState(user?.maxSugarPerServing || 15);
  const [maxSodium, setMaxSodium] = useState(user?.maxSodiumPerServing || 350);

  const conditionOptions: { key: HealthCondition; label: string; desc: string; icon: string }[] = [
    { key: 'diabetic', label: 'Diabetic / Glycemic Spike Control', desc: 'Flags products with rapid absorption sugars (>15g) and high glycemic index loads.', icon: '🩸' },
    { key: 'hypertension', label: 'Hypertension / High Blood Pressure', desc: 'Warns against excess sodium (>350mg) and vasoconstrictive stimulant caffeine.', icon: '💓' },
    { key: 'lactose_intolerant', label: 'Lactose Intolerant / Dairy Sensitivity', desc: 'Flags dairy ingredients, whey powder, milk solids, butterfat, and lactose.', icon: '🥛' },
    { key: 'nut_allergy', label: 'Tree Nut & Peanut Allergy', desc: 'Immediate critical alert for whole nuts, hazelnut pastes, almond flours, and trace warnings.', icon: '🥜' },
    { key: 'gluten_free', label: 'Celiac / Strict Gluten-Free', desc: 'Identifies hidden wheat, barley, rye grains, and cross-contact risk.', icon: '🌾' },
    { key: 'vegan', label: '100% Plant-Based / Vegan', desc: 'Detects milk derivatives, whey peptides, gelatin, honey, and animal fats.', icon: '🌱' },
    { key: 'weight_loss', label: 'Weight Loss / Calorie Deficit', desc: 'Alerts on high calorie density (>250 kcal/serving) and hidden fats.', icon: '⚖️' },
    { key: 'muscle_gain', label: 'Muscle Gain & Hypertrophy', desc: 'Highlights products delivering >=15g complete protein and leucine triggers.', icon: '💪' },
    { key: 'low_sodium', label: 'Low Sodium / Renal Protocol', desc: 'Enforces strict 200mg sodium per meal limit.', icon: '🧂' },
  ];

  const handleSavePreferences = () => {
    soundEffects.playSuccessFanfare();
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold mb-2">
          <HeartPulse className="w-3.5 h-3.5 text-sage-700" />
          <span>Biochemical Preferences & Health Goals</span>
        </div>
        <h1 className="text-3xl font-black text-navy-900 font-display">
          Personalized Health Profile
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-2xl">
          Configure clinical parameters that guide the AI Intake Assistant and trigger real-time hazard banners across all product scans.
        </p>
      </div>

      {/* User Card + 1-Click Demo Profiles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Details (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200/90 shadow-glass flex flex-col justify-between">
          <div className="flex items-center gap-4 mb-4">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
              alt={user?.name || 'User'}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-sage-500 shadow-md"
            />
            <div>
              <h2 className="text-xl font-bold text-navy-900 font-display">
                {user?.name || 'Sarah Chen'}
              </h2>
              <span className="text-xs text-slate-500 font-medium block">
                {user?.email || 'sarah.chen@example.com'}
              </span>
              <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sage-100 text-sage-800">
                Active Member
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Focus:</span>
            <p className="font-medium">
              {activeConditions.length > 0 
                ? activeConditions.map(c => c.replace('_', ' ')).join(' • ')
                : 'General Wellness / No Special Conditions'}
            </p>
          </div>
        </div>

        {/* 1-Click Persona Switcher for Quick Demos (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200/90 shadow-glass space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <h3 className="font-extrabold text-navy-900 text-sm font-display">
              Test Instant Demo Personas (1-Click Switch)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Switch test personas to immediately observe how AI recommendation flags shift across products:
          </p>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => {
                soundEffects.playClick();
                switchDemoProfile('diabetic');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                user?.name.includes('Sarah') 
                  ? 'bg-sage-50 border-sage-500 ring-2 ring-sage-500/20 shadow-xs' 
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-navy-900 text-xs">Sarah Chen</div>
              <div className="text-[10px] text-slate-500">Diabetic & Low Sodium</div>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                switchDemoProfile('fitness');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                user?.name.includes('Marcus') 
                  ? 'bg-sage-50 border-sage-500 ring-2 ring-sage-500/20 shadow-xs' 
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-navy-900 text-xs">Marcus Vance</div>
              <div className="text-[10px] text-slate-500">Muscle Gain & Hypertrophy</div>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                switchDemoProfile('allergy');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                user?.name.includes('Elena') 
                  ? 'bg-sage-50 border-sage-500 ring-2 ring-sage-500/20 shadow-xs' 
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-navy-900 text-xs">Elena Rostova</div>
              <div className="text-[10px] text-slate-500">Nut Anaphylaxis & Vegan</div>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                switchDemoProfile('general');
              }}
              className={`p-3 rounded-2xl border text-left transition-all ${
                user?.name.includes('Jordan') 
                  ? 'bg-sage-50 border-sage-500 ring-2 ring-sage-500/20 shadow-xs' 
                  : 'bg-white hover:bg-slate-50 border-slate-200'
              }`}
            >
              <div className="font-bold text-navy-900 text-xs">Jordan Lee</div>
              <div className="text-[10px] text-slate-500">Hypertension Management</div>
            </button>
          </div>
        </div>
      </div>

      {/* Conditions Toggle Matrix */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-glass space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-navy-900 text-base font-display">
              Health Conditions & Dietary Protocols
            </h3>
            <p className="text-xs text-slate-500">Toggle conditions to actively monitor in scans</p>
          </div>
          <span className="text-xs font-mono font-bold text-sage-700 bg-sage-50 px-2.5 py-1 rounded-lg border border-sage-200">
            {activeConditions.length} Protocols Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
          {conditionOptions.map((opt) => {
            const isChecked = activeConditions.includes(opt.key);

            return (
              <div
                key={opt.key}
                onClick={() => {
                  soundEffects.playClick();
                  toggleCondition(opt.key);
                }}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                  isChecked
                    ? 'bg-sage-50/80 border-sage-400 text-navy-900 shadow-glass-sm'
                    : 'bg-white/80 hover:bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <span className="text-2xl shrink-0 mt-0.5">{opt.icon}</span>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-extrabold text-navy-900 text-sm">
                      {opt.label}
                    </span>
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isChecked ? 'bg-sage-600 border-sage-600 text-white' : 'border-slate-300'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {opt.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metabolic Threshold Sliders */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-glass space-y-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-sage-600" />
          <h3 className="font-extrabold text-navy-900 text-base font-display">
            Metabolic Threshold Tolerances
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Max Free Sugar / Serving</span>
              <span className="font-mono text-navy-900 text-sm">{maxSugar}g</span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={maxSugar}
              onChange={(e) => setMaxSugar(parseInt(e.target.value, 10))}
              className="w-full accent-sage-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Scans with sugar exceeding this trigger an acute spike warning.</p>
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Max Sodium / Serving</span>
              <span className="font-mono text-navy-900 text-sm">{maxSodium}mg</span>
            </div>
            <input
              type="range"
              min="100"
              max="800"
              step="25"
              value={maxSodium}
              onChange={(e) => setMaxSodium(parseInt(e.target.value, 10))}
              className="w-full accent-sage-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Cardiovascular limit per meal or packaged snack.</p>
          </div>

          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-700">Daily Caloric Target</span>
              <span className="font-mono text-navy-900 text-sm">{calorieTarget} kcal</span>
            </div>
            <input
              type="range"
              min="1400"
              max="3500"
              step="50"
              value={calorieTarget}
              onChange={(e) => setCalorieTarget(parseInt(e.target.value, 10))}
              className="w-full accent-sage-600 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">Used to calibrate Daily Value (% DV) bars in Tab 2.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          {savedNotification && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
            </span>
          )}
          <button
            onClick={handleSavePreferences}
            className="px-6 py-2.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Health Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};

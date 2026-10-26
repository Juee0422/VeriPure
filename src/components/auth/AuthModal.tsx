import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HealthCondition } from '../../types';
import { X, Lock, Mail, User, ShieldCheck, Sparkles, Check, ExternalLink } from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultTab = 'signin' }) => {
  const navigate = useNavigate();
  const { login, signup, switchDemoProfile } = useAuth();
  const [tab, setTab] = useState<'signin' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<HealthCondition[]>(['diabetic']);

  if (!isOpen) return null;

  const availableConditions: { key: HealthCondition; label: string }[] = [
    { key: 'diabetic', label: 'Diabetic / Glycemic Spike Control' },
    { key: 'hypertension', label: 'Hypertension / High Blood Pressure' },
    { key: 'lactose_intolerant', label: 'Lactose Intolerant / Dairy Sensitivity' },
    { key: 'nut_allergy', label: 'Tree Nut & Peanut Allergy' },
    { key: 'vegan', label: '100% Plant-Based / Vegan' },
    { key: 'weight_loss', label: 'Weight Loss / Calorie Deficit' },
    { key: 'gluten_free', label: 'Celiac / Gluten-Free' },
    { key: 'muscle_gain', label: 'Muscle Gain / High Protein' },
    { key: 'low_sodium', label: 'Low Sodium / Renal Protocol' },
  ];

  const toggleCondition = (cond: HealthCondition) => {
    soundEffects.playClick();
    if (selectedConditions.includes(cond)) {
      setSelectedConditions(selectedConditions.filter(c => c !== cond));
    } else {
      setSelectedConditions([...selectedConditions, cond]);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    login(email || 'demo.user@veripure.io', name || 'Verified User', selectedConditions);
    onClose();
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playClick();
    signup(name || 'New Member', email || 'member@veripure.io', selectedConditions);
    onClose();
  };

  const handleSelectDemoPersona = (persona: 'diabetic' | 'fitness' | 'allergy' | 'general') => {
    soundEffects.playSuccessFanfare();
    switchDemoProfile(persona);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-md animate-fadeIn">
      <div className="glass-card bg-white/95 rounded-3xl max-w-md w-full p-6 border border-slate-200/90 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-sage-50 text-sage-700 flex items-center justify-center border border-sage-200 shadow-glow-sage">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-navy-900 font-display">
            {tab === 'signin' ? 'Welcome Back to VeriPure' : 'Create Your Health Account'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Personalized counterfeit protection and metabolic nutrition intelligence
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => {
              soundEffects.playClick();
              setTab('signin');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'signin' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              soundEffects.playClick();
              setTab('signup');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              tab === 'signup' ? 'bg-white text-navy-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Google SSO Placeholder */}
        <button
          onClick={() => {
            soundEffects.playClick();
            login('google.user@gmail.com', 'Google User', ['diabetic']);
            onClose();
          }}
          className="w-full py-2.5 px-4 mb-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 absolute">
            Or with email
          </span>
        </div>

        {/* Email Password Form */}
        <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp} className="space-y-3.5">
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
              />
            </div>
          </div>

          {/* Sign Up Health Profile Preferences */}
          {tab === 'signup' && (
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Select Your Health Profile Conditions:
              </label>
              <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                {availableConditions.map((cond) => {
                  const isChecked = selectedConditions.includes(cond.key);
                  return (
                    <div
                      key={cond.key}
                      onClick={() => toggleCondition(cond.key)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-sage-50 border-sage-400 text-sage-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cond.label}</span>
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked ? 'bg-sage-600 border-sage-600 text-white' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-4"
          >
            <span>{tab === 'signin' ? 'Sign In to VeriPure' : 'Complete Registration'}</span>
          </button>
        </form>

        {/* Quick Demo Personas 1-Click Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-sage-600" />
            Quick Demo Login Personas:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleSelectDemoPersona('diabetic')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-colors"
            >
              <div className="font-bold text-navy-900">Sarah Chen</div>
              <div className="text-[10px] text-slate-500">Diabetic & Low Sodium</div>
            </button>
            <button
              onClick={() => handleSelectDemoPersona('fitness')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-colors"
            >
              <div className="font-bold text-navy-900">Marcus Vance</div>
              <div className="text-[10px] text-slate-500">Muscle Gain / Hypertrophy</div>
            </button>
            <button
              onClick={() => handleSelectDemoPersona('allergy')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-colors"
            >
              <div className="font-bold text-navy-900">Elena Rostova</div>
              <div className="text-[10px] text-slate-500">Nut Allergy & Vegan</div>
            </button>
            <button
              onClick={() => handleSelectDemoPersona('general')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-colors"
            >
              <div className="font-bold text-navy-900">Jordan Lee</div>
              <div className="text-[10px] text-slate-500">Hypertension Watch</div>
            </button>
          </div>
        </div>

        {/* Open Dedicated Standalone Page */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              onClose();
              navigate(`/login?tab=${tab}`);
            }}
            className="text-xs font-semibold text-slate-500 hover:text-sage-700 flex items-center justify-center gap-1 mx-auto transition-colors"
          >
            <span>Open Dedicated Login Page</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

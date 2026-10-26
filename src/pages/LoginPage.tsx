import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { HealthCondition } from '../types';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  User, 
  Sparkles, 
  Check, 
  ArrowRight,
  HeartPulse,
  Leaf,
  CheckCircle2
} from 'lucide-react';
import { soundEffects } from '../services/audioService';

export const LoginPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, signup, switchDemoProfile, isAuthenticated, user } = useAuth();

  const initialTab = searchParams.get('tab') === 'signup' ? 'signup' : 'signin';
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<HealthCondition[]>([
    'diabetic',
    'low_sodium'
  ]);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const availableConditions: { key: HealthCondition; label: string; tag: string; icon: string }[] = [
    { key: 'diabetic', label: 'Diabetic / Glycemic Spike Control', tag: 'Diabetic', icon: '🩸' },
    { key: 'hypertension', label: 'Hypertension / High BP', tag: 'Hypertension', icon: '💓' },
    { key: 'lactose_intolerant', label: 'Lactose Intolerant / Dairy Sensitivity', tag: 'Lactose Intolerant', icon: '🥛' },
    { key: 'nut_allergy', label: 'Tree Nut & Peanut Anaphylaxis', tag: 'Nut Allergy', icon: '🥜' },
    { key: 'vegan', label: '100% Plant-Based / Vegan', tag: 'Vegan', icon: '🌱' },
    { key: 'weight_loss', label: 'Weight Loss / Calorie Deficit', tag: 'Weight Loss', icon: '⚖️' },
    { key: 'gluten_free', label: 'Celiac / Gluten-Free', tag: 'Gluten-Free', icon: '🌾' },
    { key: 'muscle_gain', label: 'Muscle Gain / High Protein', tag: 'Muscle Gain', icon: '💪' },
    { key: 'low_sodium', label: 'Low Sodium / Renal Protocol', tag: 'Low Sodium', icon: '🧂' },
  ];

  const handleTabChange = (newTab: 'signin' | 'signup') => {
    soundEffects.playClick();
    setTab(newTab);
    setSearchParams({ tab: newTab });
  };

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
    soundEffects.playSuccessFanfare();
    login(email || 'demo.user@veripure.io', name || 'Verified Member', selectedConditions);
    setSubmittedMessage('Successfully signed in! Redirecting to scan hub...');
    setTimeout(() => {
      navigate('/scan');
    }, 1000);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    soundEffects.playSuccessFanfare();
    signup(name || 'New Member', email || 'member@veripure.io', selectedConditions);
    setSubmittedMessage('Account created with your health preferences! Redirecting...');
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  };

  const handleGoogleSSO = () => {
    soundEffects.playClick();
    login('google.user@gmail.com', 'Alex Rivers', ['diabetic', 'lactose_intolerant']);
    setSubmittedMessage('Google Authentication Verified! Loading...');
    setTimeout(() => {
      navigate('/scan');
    }, 1000);
  };

  const handleSelectDemoPersona = (persona: 'diabetic' | 'fitness' | 'allergy' | 'general') => {
    soundEffects.playSuccessFanfare();
    switchDemoProfile(persona);
    setSubmittedMessage(`Switched to demo persona! Loading...`);
    setTimeout(() => {
      navigate('/profile');
    }, 800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-xl space-y-6 animate-fadeIn">
        
        {/* Top Brand Hero */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-4 h-4 text-sage-700" />
            <span>Biometric & Clinical Anti-Fraud Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight font-display">
            {tab === 'signin' ? 'Welcome Back to VeriPure' : 'Join VeriPure & Protect Your Health'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Real-time counterfeit screening, GS1 authenticity proofs, and precision biochemical nutrition intelligence.
          </p>
        </div>

        {/* Main Glassmorphic Auth Card */}
        <div className="glass-card bg-white/95 rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-2xl relative overflow-hidden">
          
          {/* Success Banner Notification */}
          {submittedMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-sage-50 border border-sage-300 text-sage-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-sage-700 shrink-0" />
              <span>{submittedMessage}</span>
            </div>
          )}

          {/* Tab Toggle */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-6 shadow-xs">
            <button
              type="button"
              onClick={() => handleTabChange('signin')}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                tab === 'signin' 
                  ? 'bg-white text-navy-900 shadow-sm' 
                  : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('signup')}
              className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all ${
                tab === 'signup' 
                  ? 'bg-white text-navy-900 shadow-sm' 
                  : 'text-slate-500 hover:text-navy-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Google SSO Placeholder */}
          <button
            type="button"
            onClick={handleGoogleSSO}
            className="w-full py-3 px-4 mb-5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-3 transition-colors shadow-xs"
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

          <div className="relative flex items-center justify-center my-5">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 absolute">
              Or with email credentials
            </span>
          </div>

          {/* Auth Form */}
          <form onSubmit={tab === 'signin' ? handleSignIn : handleSignUp} className="space-y-4">
            {tab === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Chen"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl glass-input border border-slate-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl glass-input border border-slate-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl glass-input border border-slate-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500 outline-none"
                />
              </div>
            </div>

            {/* Health Profile Preferences Multi-Select for Sign Up */}
            {tab === 'signup' && (
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-navy-900 uppercase tracking-wide flex items-center gap-1.5">
                    <HeartPulse className="w-4 h-4 text-sage-600" />
                    <span>Select Health Profile Conditions:</span>
                  </label>
                  <span className="text-[10px] text-slate-400">Multi-Select</span>
                </div>
                <p className="text-[11px] text-slate-500 mb-2.5">
                  Select dietary parameters to activate real-time danger alerts when scanning packaged products:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {availableConditions.map((cond) => {
                    const isChecked = selectedConditions.includes(cond.key);
                    return (
                      <div
                        key={cond.key}
                        onClick={() => toggleCondition(cond.key)}
                        className={`p-2.5 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all select-none ${
                          isChecked
                            ? 'bg-sage-50 border-sage-500 text-sage-900 font-bold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-sm shrink-0">{cond.icon}</span>
                          <span className="truncate">{cond.tag}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ml-1.5 ${
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
              className="w-full py-3 px-4 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all mt-4"
            >
              <span>{tab === 'signin' ? 'Sign In to VeriPure' : 'Register Account with Health Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Personas 1-Click Login Section */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-slate-600">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Instant Demo Login Personas:</span>
              </div>
              <span className="text-[10px] text-slate-400">1-Click Test</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleSelectDemoPersona('diabetic')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-all hover:border-sage-300"
              >
                <div className="font-extrabold text-navy-900">Sarah Chen</div>
                <div className="text-[10px] text-slate-500">Diabetic & Low Sodium</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoPersona('fitness')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-all hover:border-sage-300"
              >
                <div className="font-extrabold text-navy-900">Marcus Vance</div>
                <div className="text-[10px] text-slate-500">Muscle Gain / Hypertrophy</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoPersona('allergy')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-all hover:border-sage-300"
              >
                <div className="font-extrabold text-navy-900">Elena Rostova</div>
                <div className="text-[10px] text-slate-500">Nut Allergy & Vegan</div>
              </button>

              <button
                type="button"
                onClick={() => handleSelectDemoPersona('general')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-sage-50 border border-slate-200 text-left transition-all hover:border-sage-300"
              >
                <div className="font-extrabold text-navy-900">Jordan Lee</div>
                <div className="text-[10px] text-slate-500">Hypertension Management</div>
              </button>
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-slate-400">
          <span>By signing in, you agree to VeriPure's </span>
          <Link to="/" className="text-sage-700 underline font-semibold">Terms of Clinical Guidance</Link>
          <span> and </span>
          <Link to="/" className="text-sage-700 underline font-semibold">Privacy Policy</Link>.
        </div>

      </div>
    </div>
  );
};
export default LoginPage;

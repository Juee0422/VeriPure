import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';
import { 
  Scan, 
  Search, 
  BarChart3, 
  User, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown, 
  Sparkles,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { soundEffects } from '../../services/audioService';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchDemoProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'signin' | 'signup'>('signin');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Multi-Scanner', path: '/scan', icon: Scan },
    { label: 'Database Search', path: '/search', icon: Search },
    { label: 'Analytics Demo', path: '/analytics', icon: BarChart3 },
    { label: 'Health Profiles', path: '/profile', icon: HeartPulse },
  ];

  const handleOpenAuth = (tab: 'signin' | 'signup') => {
    soundEffects.playClick();
    setAuthDefaultTab(tab);
    setIsAuthModalOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    soundEffects.playClick();
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-nav backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link 
            to="/" 
            onClick={() => soundEffects.playClick()}
            className="flex items-center gap-3 group shrink-0"
          >
            {/* Animated VeriPure Leaf + Shield Logo */}
            <div className="relative w-11 h-11 flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <div className="absolute inset-0 rounded-2xl bg-sage-100 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/logo.svg" 
                alt="VeriPure Logo" 
                className="w-10 h-10 relative z-10 drop-shadow-sm"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-navy-900 tracking-tight font-display">
                  Veri<span className="text-sage-700">Pure</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md bg-sage-100 text-sage-800 border border-sage-200">
                  AI v2.4
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wide hidden sm:block">
                Authentic Nutrition & Anti-Fraud
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-2xl border border-slate-200/80 shadow-xs">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-navy-900 text-white shadow-xs'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Section: Persona Selector + Auth */}
          <div className="flex items-center gap-2.5">
            {/* Active Health Profile Persona Indicator Pill */}
            {user && (
              <div className="relative hidden lg:block">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sage-50 hover:bg-sage-100 border border-sage-200/80 transition-all text-xs"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={user.name}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-sage-500"
                  />
                  <div className="text-left">
                    <span className="font-bold text-navy-900 block leading-tight">{user.name.split(' ')[0]}</span>
                    <span className="text-[10px] text-sage-800 font-medium capitalize">
                      {user.activeConditions[0] ? user.activeConditions[0].replace('_', ' ') : 'General'}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-sage-700 ml-0.5" />
                </button>

                {/* Profile Switcher Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Switch Demo Persona
                      </span>
                      <p className="text-xs text-slate-500">Test how nutritional intake advice adapts:</p>
                    </div>

                    <div className="space-y-1">
                      <button
                        onClick={() => {
                          switchDemoProfile('diabetic');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs rounded-xl hover:bg-slate-50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-navy-900">Sarah Chen</div>
                          <div className="text-[10px] text-slate-500">Diabetic / Low Sodium</div>
                        </div>
                        {user.name.includes('Sarah') && <span className="text-sage-600 font-bold">✓</span>}
                      </button>

                      <button
                        onClick={() => {
                          switchDemoProfile('fitness');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs rounded-xl hover:bg-slate-50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-navy-900">Marcus Vance</div>
                          <div className="text-[10px] text-slate-500">Muscle Gain / Protein</div>
                        </div>
                        {user.name.includes('Marcus') && <span className="text-sage-600 font-bold">✓</span>}
                      </button>

                      <button
                        onClick={() => {
                          switchDemoProfile('allergy');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-left text-xs rounded-xl hover:bg-slate-50 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-navy-900">Elena Rostova</div>
                          <div className="text-[10px] text-slate-500">Nut Allergy / Vegan</div>
                        </div>
                        {user.name.includes('Elena') && <span className="text-sage-600 font-bold">✓</span>}
                      </button>
                    </div>

                    <div className="border-t border-slate-100 mt-2 pt-1">
                      <button
                        onClick={() => {
                          navigate('/profile');
                          setIsProfileMenuOpen(false);
                        }}
                        className="w-full p-2 text-xs font-bold text-navy-900 hover:bg-slate-50 rounded-xl text-left"
                      >
                        Manage Full Health Profile →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={logout}
                  className="p-2.5 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenAuth('signin')}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold text-navy-900 hover:bg-slate-100/70 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-sage-700 hover:bg-sage-800 text-white transition-all shadow-sm"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-nav border-t border-slate-200/80 px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 ${
                    isActive ? 'bg-navy-900 text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </button>
              );
            })}

            {!isAuthenticated && (
              <div className="pt-2 border-t border-slate-200 flex flex-col gap-2">
                <button
                  onClick={() => handleOpenAuth('signin')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold text-navy-900 bg-slate-100"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleOpenAuth('signup')}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-sage-700 text-white"
                >
                  Create Free Account
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authDefaultTab}
      />
    </>
  );
};

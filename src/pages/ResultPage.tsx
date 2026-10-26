import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ProductVerificationData } from '../types';
import { OpenFoodFactsService } from '../services/openFoodFactsService';
import { AuthenticityTab } from '../components/diagnostics/AuthenticityTab';
import { NutritionTab } from '../components/diagnostics/NutritionTab';
import { soundEffects } from '../services/audioService';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Apple, 
  Scan, 
  Loader2, 
  AlertTriangle, 
  Printer, 
  CheckCircle2, 
  ShieldAlert,
  AlertOctagon,
  HeartPulse
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthProfile } from '../context/HealthProfileContext';

export const ResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { evaluateProductForUser } = useHealthProfile();

  const [product, setProduct] = useState<ProductVerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [analysisStatus, setAnalysisStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [activeTab, setActiveTab] = useState<'authenticity' | 'nutrition'>('authenticity');
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      setLoading(true);
      setAnalysisStatus('LOADING');
      setHasTriggeredConfetti(false); // Reset on new product load

      try {
        const data = await OpenFoodFactsService.fetchProduct(id);
        if (!mountedRef.current) return;

        setProduct(data);
        setAnalysisStatus('SUCCESS');

        // Normalizing category status
        const isSafe = data.authenticityStatus === 'SAFE' || data.authenticityStatus === 'VERIFIED_AUTHENTIC';
        const isCounterfeit = data.authenticityStatus === 'COUNTERFEIT' || data.authenticityStatus === 'COUNTERFEIT_DETECTED';

        // Sound feedback
        if (isSafe) {
          soundEffects.playSuccessFanfare();
        } else if (isCounterfeit) {
          soundEffects.playDangerAlert();
        } else {
          soundEffects.playScanBeep();
        }

        // Strict Event-Driven Confetti Guard:
        // ONLY triggers when analysis completes with 100% "SAFE" classification score, exactly once
        if (isSafe && data.authenticityScore === 100 && !hasTriggeredConfetti) {
          confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#2E7D32', '#4CAF50', '#81C784', '#E8F5E9']
          });
          setHasTriggeredConfetti(true);
        }
      } catch (err) {
        console.error('[VeriPure] Error loading product:', err);
        if (mountedRef.current) {
          setAnalysisStatus('ERROR');
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
        <Loader2 className="w-10 h-10 text-sage-600 animate-spin mb-4" />
        <h3 className="text-xl font-extrabold text-navy-900 font-display">
          Running Dual-Diagnostic Engine...
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          Synthesizing Open Food Facts nutrition specs, GS1 checksums, and optical typography verification.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-md mx-auto my-16 glass-card rounded-3xl p-8 text-center border border-slate-200">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-navy-900">Product Not Found</h3>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          Unable to resolve barcode {id} in local databases or Open Food Facts.
        </p>
        <button
          onClick={() => navigate('/scan')}
          className="px-5 py-2.5 rounded-xl bg-navy-900 text-white text-xs font-bold"
        >
          Return to Scanner
        </button>
      </div>
    );
  }

  // Exact 3-Tier Classification Categories
  const isSafe = product.authenticityStatus === 'SAFE' || product.authenticityStatus === 'VERIFIED_AUTHENTIC';
  const isSuspicious = product.authenticityStatus === 'SUSPICIOUS';
  const isCounterfeit = product.authenticityStatus === 'COUNTERFEIT' || product.authenticityStatus === 'COUNTERFEIT_DETECTED';

  // Evaluate user profile match for dynamic warning banner
  const healthReport = evaluateProductForUser(product);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-6">
      {/* Breadcrumb Navigation & Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Link to="/" className="text-slate-500 hover:text-navy-900 font-semibold">Home</Link>
          <span className="text-slate-300">/</span>
          <Link to="/scan" className="text-slate-500 hover:text-navy-900 font-semibold">Scanner</Link>
          <span className="text-slate-300">/</span>
          <span className="text-navy-900 font-bold font-mono">{product.barcode}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              navigate('/scan');
            }}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Scan className="w-3.5 h-3.5 text-sage-600" />
            <span>Scan Another</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Print Report</span>
          </button>
        </div>
      </div>

      {/* 3-Tier Classification Main Status Banner */}
      {isSafe && (
        <div className="p-4 rounded-2xl bg-sage-50 border border-sage-300 text-sage-900 shadow-glow-sage flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-sage-700 text-white shadow-xs">
              <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-sage-700">
                1. CLASSIFICATION: SAFE (100% SCORE)
              </div>
              <div className="font-extrabold text-sm sm:text-base text-navy-900">
                Authentic Brand & Safe Ingredients verified.
              </div>
            </div>
          </div>
          <span className="text-xs bg-sage-700 text-white font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider shrink-0 shadow-xs">
            ✓ 100% AUTHENTIC
          </span>
        </div>
      )}

      {isSuspicious && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 shadow-glow-amber flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-600 text-white shadow-xs">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-amber-800">
                2. CLASSIFICATION: SUSPICIOUS ({product.authenticityScore}% SCORE)
              </div>
              <div className="font-extrabold text-sm sm:text-base text-navy-900">
                Caution: Unverified Batch or Packaging Discrepancies Detected.
              </div>
            </div>
          </div>
          <span className="text-xs bg-amber-600 text-white font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider shrink-0 shadow-xs">
            ⚠️ AUDIT ADVISED
          </span>
        </div>
      )}

      {isCounterfeit && (
        <div className="p-4 rounded-2xl bg-red-600 text-white shadow-glow-crimson flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/20">
              <ShieldAlert className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-red-200">
                3. CLASSIFICATION: COUNTERFEIT ({product.authenticityScore}% SCORE)
              </div>
              <div className="font-extrabold text-sm sm:text-base">
                WARNING: High Risk of Counterfeit / Fraudulent Product.
              </div>
            </div>
          </div>
          <span className="text-xs bg-white text-red-800 font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider shrink-0 shadow-xs">
            🚨 DO NOT INGEST / APPLY
          </span>
        </div>
      )}

      {/* Dynamic Personalized Health Profile Conflict Warning Banner */}
      {healthReport.overallStatus === 'danger' && (
        <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-sm flex items-start gap-3">
          <div className="p-2 rounded-xl bg-rose-600 text-white shrink-0 mt-0.5">
            <HeartPulse className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-rose-700">
                Personalized Health Profile Alert: {user?.name || 'Active Profile'}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-navy-900 mt-0.5 leading-snug">
              {healthReport.matchedRules.find(r => r.status === 'danger')?.title || healthReport.headline}
            </p>
            <p className="text-xs text-rose-800 font-medium mt-1">
              {healthReport.matchedRules.find(r => r.status === 'danger')?.description}
            </p>
          </div>
        </div>
      )}

      {/* Diagnostic Tab Switcher (TAB A vs TAB B) */}
      <div className="glass-card p-1.5 rounded-2xl border border-slate-200/90 shadow-glass flex gap-2">
        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('authenticity');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'authenticity'
              ? 'bg-navy-900 text-white shadow-md'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Tab A: Product Authenticity & Verification Breakdown</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
            isCounterfeit ? 'bg-red-500 text-white' : isSuspicious ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'
          }`}>
            {product.authenticityScore}%
          </span>
        </button>

        <button
          onClick={() => {
            soundEffects.playClick();
            setActiveTab('nutrition');
          }}
          className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'nutrition'
              ? 'bg-navy-900 text-white shadow-md'
              : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
          }`}
        >
          <Apple className="w-4 h-4 text-amber-400" />
          <span>Tab B: Nutritional Analysis & AI Intake Guide</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-white font-mono font-bold">
            Nutri-Score {product.nutrition.nutriScore}
          </span>
        </button>
      </div>

      {/* Active Tab View */}
      {activeTab === 'authenticity' ? (
        <AuthenticityTab product={product} />
      ) : (
        <NutritionTab product={product} />
      )}
    </div>
  );
};

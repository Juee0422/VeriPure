import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scan, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  Activity, 
  MapPin, 
  Heart,
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { NutriScoreBadge } from '../components/diagnostics/NutriScoreBadge';
import { soundEffects } from '../services/audioService';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [quickBarcodeInput, setQuickBarcodeInput] = useState('');

  // Animated live scan simulation in Hero (strictly visual, NO confetti triggers on homepage)
  const [demoState, setDemoState] = useState<'scanning' | 'verified'>('scanning');

  useEffect(() => {
    let isMounted = true;
    const timer = setInterval(() => {
      if (isMounted) {
        setDemoState(prev => prev === 'scanning' ? 'verified' : 'scanning');
      }
    }, 4500);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const handleQuickSearch = (barcode: string) => {
    soundEffects.playScanBeep();
    navigate(`/result/${barcode}`);
  };

  const sampleButtons = [
    { name: 'Nutella Hazelnut', code: '3017620422003', tag: 'SAFE' },
    { name: 'Coca-Cola (330ml)', code: '5449000000996', tag: 'SAFE' },
    { name: 'Oreo Biscuits', code: '7622300441242', tag: 'SAFE' },
    { name: 'Red Bull Can', code: '9002490100070', tag: 'SAFE' },
    { name: 'Maggi Noodles', code: '8901058814728', tag: 'SAFE' },
    { name: '⚠️ Suspicious Energy Drink', code: '1234567890123', tag: 'SUSPICIOUS' },
    { name: '🚨 Fake Whey Protein', code: '8901234567890', tag: 'COUNTERFEIT' },
    { name: '🚨 Fake Luxury Chocolate', code: '9999999999999', tag: 'COUNTERFEIT' },
  ];

  return (
    <div className="space-y-16 pb-20 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative pt-8 sm:pt-14 pb-12 overflow-hidden">
        {/* Soft Ambient Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-sage-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Instant Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/80 border border-sage-300/80 text-sage-900 text-xs font-bold shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Next-Gen Consumer Verification Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-navy-900 tracking-tight leading-[1.1] font-display">
                Eat Authentically. <br />
                <span className="text-sage-700 bg-gradient-to-r from-sage-800 via-sage-700 to-emerald-600 bg-clip-text text-transparent">
                  Know Every Ingredient.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Dual-diagnostic technology that simultaneously detects dangerous counterfeits via 3-layer optical forensics and delivers personalized metabolic nutrition intelligence.
              </p>

              {/* Instant Quick Search Bar */}
              <div className="max-w-xl mx-auto lg:mx-0">
                <div className="relative">
                  <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
                  <input
                    type="text"
                    placeholder="Scan or enter any barcode (e.g. 3017620422003)..."
                    value={quickBarcodeInput}
                    onChange={(e) => setQuickBarcodeInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && quickBarcodeInput.trim()) {
                        handleQuickSearch(quickBarcodeInput.trim());
                      }
                    }}
                    className="w-full pl-12 pr-32 py-3.5 rounded-2xl glass-input text-sm font-semibold text-navy-900 placeholder:text-slate-400 shadow-glass"
                  />
                  <button
                    onClick={() => {
                      if (quickBarcodeInput.trim()) {
                        handleQuickSearch(quickBarcodeInput.trim());
                      } else {
                        navigate('/scan');
                      }
                    }}
                    className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span>{quickBarcodeInput.trim() ? 'Verify' : 'Open Scanner'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Sample Buttons for 1-Click Test Scans */}
                <div className="flex flex-wrap items-center gap-2 mt-3 justify-center lg:justify-start">
                  <span className="text-xs font-bold text-slate-400">Quick Test:</span>
                  {sampleButtons.map((btn) => (
                    <button
                      key={btn.code}
                      onClick={() => handleQuickSearch(btn.code)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs transition-all flex items-center gap-1"
                    >
                      <span>{btn.name}</span>
                      <span className="text-[10px] text-sage-600 font-mono">({btn.tag})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    navigate('/scan');
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-sage-700 hover:bg-sage-800 text-white font-extrabold text-sm flex items-center gap-2 shadow-glow-sage hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Scan className="w-5 h-5" />
                  <span>Launch Live Multi-Scanner</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    navigate('/search');
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-navy-900 font-bold text-sm border border-slate-200/90 shadow-glass flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <Search className="w-4 h-4 text-slate-500" />
                  <span>Browse Verified Database</span>
                </button>
              </div>
            </div>

            {/* Right Column: Animated Live Scan Simulation Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Holographic Frame Backdrop */}
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-sage-300 via-emerald-200 to-teal-300 opacity-40 blur-xl animate-pulse-slow" />

                <div className="relative glass-card rounded-3xl p-6 border border-white/90 shadow-2xl overflow-hidden">
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center border border-sage-200">
                        <Scan className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Live Sensor Feed
                        </span>
                        <span className="text-xs font-bold text-navy-900">
                          Optical Scanner Pipeline
                        </span>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
                      GTIN: 0748927028669
                    </span>
                  </div>

                  {/* Animated Simulated Image & Scanner Viewport */}
                  <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-4 bg-slate-900 border border-slate-200">
                    <img
                      src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80"
                      alt="Gold Standard Whey Scan"
                      className="w-full h-full object-cover select-none"
                    />

                    {/* Scanning Reticle & Laser */}
                    {demoState === 'scanning' ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative w-48 h-32 border-2 border-emerald-400 rounded-xl shadow-glow-sage">
                          <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34D399] animate-scan-line" />
                        </div>
                        <div className="mt-3 px-3 py-1 rounded-lg bg-navy-950/80 backdrop-blur-md text-emerald-300 text-[11px] font-mono font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                          <span>Scanning Barcode & Image...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center animate-fadeIn">
                        <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg mb-2">
                          <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-black bg-white text-emerald-800 shadow-md uppercase tracking-wider mb-1">
                          VERIFIED AUTHENTIC 100%
                        </span>
                        <p className="text-[11px] text-white/90 font-medium">
                          Glanbia Master Registry Match Confirmed
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Verification Specs Banner */}
                  <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-extrabold text-navy-900">
                        Optimum Nutrition Gold Standard Whey
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        24g High Protein | Informed-Choice Certified
                      </span>
                    </div>

                    <div className="shrink-0">
                      <NutriScoreBadge grade="A" size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Counter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-glass">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-navy-900 font-display">
                1,428,940+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-sage-600" />
                Products Verified
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-red-600 font-display">
                43,190+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center justify-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                Fake Items Caught & Flagged
              </div>
            </div>

            <div className="pt-4 sm:pt-0">
              <div className="text-3xl sm:text-4xl font-black text-sage-700 font-display">
                8,920,410+
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1 flex items-center justify-center gap-1.5">
                <Activity className="w-4 h-4 text-sage-600" />
                Nutritional Analyses Performed
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-wider text-sage-700 bg-sage-100 px-3 py-1 rounded-full">
            Clinical Precision & Forensic Intelligence
          </span>
          <h2 className="text-3xl font-black text-navy-900 font-display mt-3">
            How VeriPure Protects Every Meal
          </h2>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Combining computer vision, GS1 cryptographic registry cross-referencing, and personalized AI nutritional engines.
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: 3-Layer Fake Detection (Spans 7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-7 border border-slate-200/90 shadow-glass hover:shadow-xl transition-all group">
            <div className="p-3 w-fit rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 mb-5 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 font-display mb-2">
              3-Layer Deep Fake Detection Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-6">
              Never be fooled by superficial copycats. VeriPure simultaneously audits GS1 barcode mathematical checksums, performs client-side OCR typography font comparison, and inspects tamper-evident induction seal reflections.
            </p>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="font-bold text-navy-900 block mb-0.5">Layer 1</span>
                <span className="text-slate-500 text-[11px]">GS1 Checksum & Prefix Match</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="font-bold text-navy-900 block mb-0.5">Layer 2</span>
                <span className="text-slate-500 text-[11px]">OCR Typography & Misspellings</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <span className="font-bold text-navy-900 block mb-0.5">Layer 3</span>
                <span className="text-slate-500 text-[11px]">Hologram & Seal Diffraction</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Nutri-Score & Quality Index (Spans 5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-7 border border-slate-200/90 shadow-glass hover:shadow-xl transition-all group">
            <div className="p-3 w-fit rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 font-display mb-2">
              Instant Nutri-Score & Quality Index
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
              Real-time classification based on official European Nutri-Score algorithms (Grades A to E) and NOVA food processing groups (1 to 4).
            </p>

            <div className="p-3 bg-white/90 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Sample Evaluation</span>
                <span className="text-xs font-bold text-navy-900">Whole Almond Snack Bar</span>
              </div>
              <NutriScoreBadge grade="A" size="sm" />
            </div>
          </div>

          {/* Bento Card 3: Personalized AI Nutritionist (Spans 5 cols) */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-7 border border-slate-200/90 shadow-glass hover:shadow-xl transition-all group">
            <div className="p-3 w-fit rounded-2xl bg-purple-50 text-purple-700 border border-purple-200 mb-5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 font-display mb-2">
              Personalized AI Chrono-Nutritionist
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
              Contextual guidance tailored to your body. Real-time warnings if a product's sugars or sodium spike your specific diabetic or hypertensive thresholds.
            </p>

            <div className="p-3 bg-red-50/80 rounded-2xl border border-red-200 text-xs text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Dynamic Warning: </span>
                Exceeds your Diabetic glucose spike limit by 18g.
              </div>
            </div>
          </div>

          {/* Bento Card 4: Real-time Counterfeit Heatmaps (Spans 7 cols) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-7 border border-slate-200/90 shadow-glass hover:shadow-xl transition-all group">
            <div className="p-3 w-fit rounded-2xl bg-rose-50 text-rose-700 border border-rose-200 mb-5 group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 font-display mb-2">
              Global Counterfeit Heatmaps & Fraud Alerts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mb-4">
              Crowdsourced public health network tracking unauthorized batch clones, reported illicit liquidations, and grey-market distributor collisions across 140+ countries.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold">
                🚨 Sports Supplements Fraud Alert (Lot ON-2024-X9)
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold">
                🚨 Infant Formula Tampered Batch Alert
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Medical Disclaimer */}
      <footer className="border-t border-slate-200 pt-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs text-slate-500 space-y-2">
        <p>
          VeriPure™ is an independent authentic product verification and nutritional intelligence platform.
        </p>
        <p className="text-[11px] text-slate-400">
          Open Food Facts data is licensed under Open Database License (ODbL). Not a replacement for professional clinical medical advice or official law enforcement seizure reports.
        </p>
      </footer>
    </div>
  );
};

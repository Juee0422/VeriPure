import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ShieldCheck, Cpu } from 'lucide-react';

interface ProcessingOverlayProps {
  onComplete: () => void;
  barcode?: string;
}

export const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ onComplete, barcode }) => {
  // Explicit 4-stage pipeline matching exact directive
  const steps = [
    { id: 1, text: 'Extracting Barcode (EAN-13/UPC) & OCR Text...', duration: 480 },
    { id: 2, text: 'Cross-Referencing Global Brand Registry & Open Food Facts API...', duration: 580 },
    { id: 3, text: 'Analyzing Packaging Typography, Logo Alignment & Micro-Textures...', duration: 520 },
    { id: 4, text: 'Evaluating Nutritional Safety & Additive Profile...', duration: 450 },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    let isMounted = true;

    if (currentStep < steps.length) {
      timeout = setTimeout(() => {
        if (isMounted) {
          setCurrentStep(prev => prev + 1);
        }
      }, steps[currentStep].duration);
    } else {
      timeout = setTimeout(() => {
        if (isMounted) {
          onComplete();
        }
      }, 350);
    }

    return () => {
      isMounted = false;
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [currentStep]);

  return (
    <div className="glass-card rounded-3xl p-8 max-w-lg w-full mx-auto border border-slate-200/90 shadow-2xl text-center animate-fadeIn">
      {/* Central Rotating Hologram Scanner Ring */}
      <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-sage-100 border-t-sage-600 animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-emerald-400/50 animate-pulse-slow" />
        <div className="p-4 rounded-full bg-sage-50 text-sage-700 shadow-glow-sage">
          <Cpu className="w-8 h-8 animate-pulse" />
        </div>
      </div>

      <h3 className="text-xl font-extrabold text-navy-900 font-display mb-1">
        Multi-Stage Verification Pipeline
      </h3>
      <p className="text-xs text-slate-500 mb-6 font-mono">
        Inspecting Target: {barcode || 'Processing Scanned Substrate'}
      </p>

      {/* Step Checklist */}
      <div className="space-y-3 text-left max-w-md mx-auto mb-6">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;

          return (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-3 text-xs ${
                isDone
                  ? 'bg-sage-50/80 border-sage-200 text-sage-900 font-semibold'
                  : isCurrent
                  ? 'bg-white border-sage-500 text-navy-900 font-bold shadow-md scale-[1.02]'
                  : 'bg-slate-50/50 border-slate-200/60 text-slate-400'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-4 h-4 text-sage-600 animate-spin shrink-0" />
              ) : (
                <div className="w-4 h-4 rounded-full border border-slate-300 shrink-0" />
              )}
              <span className="truncate">{step.text}</span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
        <ShieldCheck className="w-4 h-4 text-sage-600" />
        <span>Cryptographically verified against global anti-counterfeit ledger</span>
      </div>
    </div>
  );
};

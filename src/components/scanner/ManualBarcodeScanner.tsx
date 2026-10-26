import React, { useState } from 'react';
import { Barcode, ArrowRight, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { validateGTINChecksum, getGS1PrefixInfo } from '../../services/counterfeitEngine';
import { soundEffects } from '../../services/audioService';

interface ManualBarcodeScannerProps {
  onBarcodeSubmit: (barcode: string) => void;
}

export const ManualBarcodeScanner: React.FC<ManualBarcodeScannerProps> = ({ onBarcodeSubmit }) => {
  const [barcodeInput, setBarcodeInput] = useState('');

  // Exactly 10 real-world fallback products specified in directive
  const sampleChips = [
    { label: 'Nutella Hazelnut', code: '3017620422003', tier: 'SAFE' },
    { label: 'Coca-Cola (330ml)', code: '5449000000996', tier: 'SAFE' },
    { label: 'Fake Whey Protein', code: '8901234567890', tier: 'COUNTERFEIT' },
    { label: 'Suspicious Energy Drink', code: '1234567890123', tier: 'SUSPICIOUS' },
    { label: 'Oreo Biscuits', code: '7622300441242', tier: 'SAFE' },
    { label: 'Fake Luxury Chocolate', code: '9999999999999', tier: 'COUNTERFEIT' },
    { label: 'Red Bull Can', code: '9002490100070', tier: 'SAFE' },
    { label: 'Suspicious Honey', code: '8909876543210', tier: 'SUSPICIOUS' },
    { label: 'Maggi Noodles', code: '8901058814728', tier: 'SAFE' },
    { label: 'Fake Designer Perfume', code: '1111111111111', tier: 'COUNTERFEIT' },
  ];

  const cleanDigits = barcodeInput.replace(/\D/g, '');
  const isValidChecksum = cleanDigits.length >= 8 && cleanDigits.length <= 14 ? validateGTINChecksum(cleanDigits) : null;
  const gs1Info = cleanDigits.length >= 3 ? getGS1PrefixInfo(cleanDigits) : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cleanDigits.length >= 8) {
      soundEffects.playScanBeep();
      onBarcodeSubmit(cleanDigits);
    }
  };

  const handleChipClick = (code: string) => {
    soundEffects.playClick();
    setBarcodeInput(code);
    soundEffects.playScanBeep();
    onBarcodeSubmit(code);
  };

  return (
    <div className="space-y-6">
      {/* Input Field Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200/90 shadow-glass">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
              Enter Barcode Number (EAN-13, UPC-A, GTIN-14)
            </label>
            <div className="relative">
              <Barcode className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                placeholder="e.g. 3017620422003, 8901234567890, 5449000000996..."
                value={barcodeInput}
                onChange={(e) => setBarcodeInput(e.target.value)}
                className="w-full pl-12 pr-32 py-3.5 text-base font-mono font-bold tracking-wider rounded-2xl glass-input placeholder:text-slate-400 placeholder:font-normal placeholder:tracking-normal"
              />
              <button
                type="submit"
                disabled={cleanDigits.length < 8}
                className="absolute right-2 top-2 bottom-2 px-5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
              >
                <span>Run Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Math Checksum & Prefix indicator */}
          {cleanDigits.length >= 8 && (
            <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2">
                {isValidChecksum ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                )}
                <span className="font-semibold text-slate-700">
                  {isValidChecksum ? 'GTIN Modulo-10 Checksum Valid' : 'Invalid GTIN Checksum (Possible Counterfeit / Typo)'}
                </span>
              </div>

              {gs1Info && (
                <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Jurisdiction: {gs1Info.country}
                </span>
              )}
            </div>
          )}
        </form>
      </div>

      {/* 10 Real-World Verification Test Chips */}
      <div>
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5 px-1">
          10 Verified Test Products (1-Click Instant Analysis Pipeline):
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleChips.map((chip) => {
            let badgeBg = 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200';
            let prefix = '✓ ';
            if (chip.tier === 'COUNTERFEIT') {
              badgeBg = 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200';
              prefix = '🚨 ';
            } else if (chip.tier === 'SUSPICIOUS') {
              badgeBg = 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200';
              prefix = '⚠️ ';
            }

            return (
              <button
                key={chip.code}
                onClick={() => handleChipClick(chip.code)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border ${badgeBg}`}
              >
                <span>{prefix}{chip.label}</span>
                <span className="text-[10px] font-mono opacity-60">({chip.code.slice(-4)})</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

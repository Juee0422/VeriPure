import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, UploadCloud, Barcode, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';
import { CameraScanner } from '../components/scanner/CameraScanner';
import { ImageUploadScanner } from '../components/scanner/ImageUploadScanner';
import { ManualBarcodeScanner } from '../components/scanner/ManualBarcodeScanner';
import { ProcessingOverlay } from '../components/scanner/ProcessingOverlay';
import { soundEffects } from '../services/audioService';

export const ScannerPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'camera' | 'upload' | 'manual'>('camera');
  const [isProcessing, setIsProcessing] = useState(false);
  const [targetBarcode, setTargetBarcode] = useState<string | null>(null);

  const handleBarcodeIdentified = (barcode: string) => {
    setTargetBarcode(barcode);
    setIsProcessing(true);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    if (targetBarcode) {
      navigate(`/result/${targetBarcode}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-sage-700" />
            <span>Dual-Diagnostic Scanner Hub</span>
          </div>
          <h1 className="text-3xl font-black text-navy-900 font-display">
            Verify Product Authenticity & Nutrition
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Scan packaging to cross-reference brand registries and calculate metabolic suitability.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            navigate('/');
          }}
          className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-navy-900 bg-white border border-slate-200/90 shadow-xs flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Main Scanner Container or Processing Overlay */}
      {isProcessing ? (
        <ProcessingOverlay
          barcode={targetBarcode || undefined}
          onComplete={handleProcessingComplete}
        />
      ) : (
        <div className="space-y-6">
          {/* Tab Selector Buttons */}
          <div className="glass-card p-1.5 rounded-2xl border border-slate-200/90 flex gap-1 shadow-glass">
            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('camera');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'camera'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Camera Scan</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('upload');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'upload'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Image Upload & OCR</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                setActiveTab('manual');
              }}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'manual'
                  ? 'bg-navy-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70'
              }`}
            >
              <Barcode className="w-4 h-4" />
              <span>Manual Barcode</span>
            </button>
          </div>

          {/* Active Tab View */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-glass">
            {activeTab === 'camera' && (
              <CameraScanner onBarcodeDetected={handleBarcodeIdentified} />
            )}

            {activeTab === 'upload' && (
              <ImageUploadScanner onBarcodeDetected={handleBarcodeIdentified} />
            )}

            {activeTab === 'manual' && (
              <ManualBarcodeScanner onBarcodeSubmit={handleBarcodeIdentified} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

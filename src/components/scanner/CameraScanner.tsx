import React, { useState, useEffect, useRef } from 'react';
import { Camera, SwitchCamera, AlertCircle, Play, Sparkles } from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface CameraScannerProps {
  onBarcodeDetected: (barcode: string) => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onBarcodeDetected }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [isSimulated, setIsSimulated] = useState(false);

  // Initialize webcam
  useEffect(() => {
    let activeStream: MediaStream | null = null;

    async function startCamera() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setIsSimulated(true);
          setHasPermission(true);
          return;
        }

        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode, width: { ideal: 1280 }, height: { ideal: 720 } }
        });
        activeStream = s;
        setStream(s);
        setHasPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
        }
      } catch (err) {
        console.warn('[VeriPure] Camera initialization fallback:', err);
        setIsSimulated(true);
        setHasPermission(true);
      }
    }

    startCamera();

    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [facingMode]);

  const toggleFacingMode = () => {
    soundEffects.playClick();
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const handleSimulateScan = (barcode: string) => {
    soundEffects.playScanBeep();
    onBarcodeDetected(barcode);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden bg-navy-950 border-2 border-slate-200/90 shadow-2xl flex items-center justify-center">
        {/* Real Video or Simulated Feed */}
        {!isSimulated && stream ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col items-center justify-center bg-radial from-slate-800 to-navy-950 text-white p-6 text-center select-none">
            {/* Simulated Live Viewport Graphics */}
            <div className="absolute inset-0 subtle-grid-bg opacity-20" />
            
            <img 
              src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=600&q=80" 
              alt="Simulated packaging target" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 filter blur-[1px]"
            />

            <div className="relative z-10 bg-navy-900/80 backdrop-blur-md p-3.5 rounded-xl border border-white/20 max-w-xs text-xs">
              <span className="font-bold text-sage-400 block mb-1">
                Virtual Camera Active
              </span>
              <p className="text-slate-300 text-[11px] mb-2">
                Simulated optical feed ready. Tap a quick barcode below to trigger real-time detection:
              </p>
              <div className="flex flex-wrap gap-1.5 justify-center">
                <button
                  onClick={() => handleSimulateScan('3017620422003')}
                  className="px-2 py-1 rounded bg-sage-600 hover:bg-sage-500 text-white font-mono text-[10px] font-bold"
                >
                  Nutella (Authentic)
                </button>
                <button
                  onClick={() => handleSimulateScan('0748927028670')}
                  className="px-2 py-1 rounded bg-red-600 hover:bg-red-500 text-white font-mono text-[10px] font-bold"
                >
                  Fake Whey (Counterfeit)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Laser Scanner Reticle Overlays */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-56 h-36 rounded-2xl border-2 border-sage-400/80 shadow-glow-sage flex items-center justify-center">
            {/* Reticle Corner Marks */}
            <div className="absolute -top-1.5 -left-1.5 w-6 h-6 border-t-4 border-l-4 border-sage-400 rounded-tl-lg" />
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 border-t-4 border-r-4 border-sage-400 rounded-tr-lg" />
            <div className="absolute -bottom-1.5 -left-1.5 w-6 h-6 border-b-4 border-l-4 border-sage-400 rounded-bl-lg" />
            <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 border-b-4 border-r-4 border-sage-400 rounded-br-lg" />

            {/* Animated Laser Scanning Beam */}
            <div className="absolute left-1 right-1 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10B981] animate-scan-line" />

            <div className="text-[10px] font-mono font-bold tracking-widest text-emerald-300 uppercase px-2 py-0.5 rounded bg-navy-950/70 backdrop-blur-xs">
              Align Barcode in Reticle
            </div>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={toggleFacingMode}
            className="p-2 rounded-xl bg-navy-900/80 hover:bg-navy-900 text-white backdrop-blur-md border border-white/20 transition-all shadow-md"
            title="Switch Camera"
          >
            <SwitchCamera className="w-4 h-4" />
          </button>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-navy-900/80 backdrop-blur-md text-white text-[11px] font-mono border border-white/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Optical Engine 60 FPS</span>
        </div>
      </div>

      <p className="text-xs text-slate-500 mt-3 text-center">
        Hold the barcode or packaging logo steady within the green target frame.
      </p>
    </div>
  );
};

import React from 'react';
import { AuthenticityStatus } from '../../types';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface GaugeProps {
  score: number; // 0 - 100
  status: AuthenticityStatus;
  size?: number;
}

export const AuthenticityGauge: React.FC<GaugeProps> = ({ score, status, size = 180 }) => {
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  const isCounterfeit = status === 'COUNTERFEIT' || status === 'COUNTERFEIT_DETECTED' || score < 50;
  const isSuspicious = status === 'SUSPICIOUS' || (score >= 50 && score < 85);

  let strokeColor = '#2E7D32'; // Emerald Green
  let glowColor = 'rgba(46, 125, 50, 0.25)';
  let bgColor = '#E8F5E9';
  let statusText = 'SAFE';
  let statusSubtext = 'Authentic Brand & Safe Ingredients verified.';
  let Icon = ShieldCheck;

  if (isCounterfeit) {
    strokeColor = '#C62828'; // Crimson Red
    glowColor = 'rgba(198, 40, 40, 0.3)';
    bgColor = '#FFEBEE';
    statusText = 'COUNTERFEIT';
    statusSubtext = 'WARNING: High Risk of Counterfeit / Fraudulent Product.';
    Icon = ShieldAlert;
  } else if (isSuspicious) {
    strokeColor = '#EF6C00'; // Amber / Coral
    glowColor = 'rgba(239, 108, 0, 0.25)';
    bgColor = '#FFF3E0';
    statusText = 'SUSPICIOUS';
    statusSubtext = 'Caution: Unverified Batch or Packaging Discrepancies Detected.';
    Icon = AlertTriangle;
  }

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div 
        className="relative flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {/* Ambient Glow */}
        <div 
          className="absolute inset-0 rounded-full blur-xl transition-all duration-700"
          style={{ backgroundColor: glowColor, transform: 'scale(0.85)' }}
        />

        <svg 
          width={size} 
          height={size} 
          viewBox={`0 0 ${size} ${size}`}
          className="relative transform -rotate-90"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#EEF2F6"
            strokeWidth={strokeWidth}
          />
          {/* Animated Value Arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <div className="flex items-baseline gap-0.5">
            <span className="text-4xl font-black tracking-tight text-navy-900 font-display">
              {score}
            </span>
            <span className="text-xl font-bold text-slate-500">%</span>
          </div>
          <span className="text-[11px] font-bold tracking-wide uppercase text-slate-500 mt-0.5">
            Verification
          </span>
        </div>
      </div>

      {/* 3-Tier Status Pill Badge */}
      <div className="mt-4 flex flex-col items-center max-w-xs">
        <div 
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-black tracking-wider shadow-xs uppercase"
          style={{ 
            backgroundColor: bgColor, 
            borderColor: strokeColor, 
            color: strokeColor 
          }}
        >
          <Icon className="w-4 h-4 animate-pulse" />
          <span>{statusText}</span>
        </div>
        <p className="text-xs text-slate-600 font-medium mt-1.5 leading-snug">
          {statusSubtext}
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { NutriScoreGrade, NovaGroup } from '../../types';

interface NutriScoreProps {
  grade: NutriScoreGrade;
  size?: 'sm' | 'md' | 'lg';
}

export const NutriScoreBadge: React.FC<NutriScoreProps> = ({ grade, size = 'md' }) => {
  const grades: NutriScoreGrade[] = ['A', 'B', 'C', 'D', 'E'];
  
  const colors: Record<NutriScoreGrade, { bg: string; activeBg: string; text: string }> = {
    A: { bg: 'bg-emerald-100/60', activeBg: 'bg-[#038141] text-white shadow-emerald-500/30', text: 'text-emerald-800' },
    B: { bg: 'bg-lime-100/60', activeBg: 'bg-[#85BB2F] text-white shadow-lime-500/30', text: 'text-lime-800' },
    C: { bg: 'bg-amber-100/60', activeBg: 'bg-[#FECB02] text-navy-900 shadow-amber-500/30', text: 'text-amber-800' },
    D: { bg: 'bg-orange-100/60', activeBg: 'bg-[#EE8100] text-white shadow-orange-500/30', text: 'text-orange-800' },
    E: { bg: 'bg-red-100/60', activeBg: 'bg-[#E63E11] text-white shadow-red-500/30', text: 'text-red-800' },
    UNKNOWN: { bg: 'bg-gray-100', activeBg: 'bg-gray-400 text-white', text: 'text-gray-600' }
  };

  const heights = {
    sm: 'h-6 text-xs px-1.5',
    md: 'h-9 text-sm px-2.5',
    lg: 'h-12 text-base px-3.5',
  };

  const activeHeights = {
    sm: 'h-8 text-sm px-2.5 -my-1',
    md: 'h-11 text-base px-3.5 -my-1',
    lg: 'h-14 text-lg px-4 -my-1',
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Official Nutri-Score</span>
      <div className="inline-flex items-center bg-white/80 backdrop-blur-md p-1 rounded-xl border border-slate-200/80 shadow-xs">
        {grades.map((g) => {
          const isActive = g === grade.toUpperCase();
          const cfg = colors[g];

          return (
            <div
              key={g}
              className={`flex items-center justify-center font-bold rounded-lg transition-all duration-200 ${
                isActive
                  ? `${cfg.activeBg} font-extrabold shadow-md scale-105 z-10 ${activeHeights[size]}`
                  : `${cfg.bg} ${cfg.text} opacity-40 hover:opacity-75 ${heights[size]}`
              }`}
            >
              {g}
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface NovaBadgeProps {
  group: NovaGroup;
  size?: 'sm' | 'md';
}

export const NovaBadge: React.FC<NovaBadgeProps> = ({ group }) => {
  const meta: Record<NovaGroup, { label: string; desc: string; color: string; border: string; bg: string }> = {
    1: { label: 'NOVA 1', desc: 'Unprocessed / Minimally Processed', color: 'text-emerald-700', border: 'border-emerald-300', bg: 'bg-emerald-50' },
    2: { label: 'NOVA 2', desc: 'Processed Culinary Ingredients', color: 'text-blue-700', border: 'border-blue-300', bg: 'bg-blue-50' },
    3: { label: 'NOVA 3', desc: 'Processed Food', color: 'text-amber-700', border: 'border-amber-300', bg: 'bg-amber-50' },
    4: { label: 'NOVA 4', desc: 'Ultra-Processed Food Formulation', color: 'text-rose-700', border: 'border-rose-300', bg: 'bg-rose-50' },
    0: { label: 'NOVA N/A', desc: 'Non-Food or Cosmetic Product', color: 'text-slate-600', border: 'border-slate-300', bg: 'bg-slate-50' },
  };

  const item = meta[group] || meta[3];

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <span className="text-[10px] font-bold tracking-wider uppercase text-slate-500">Processing Grade</span>
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border ${item.border} ${item.bg}`}>
        <span className={`text-xs font-black px-1.5 py-0.5 rounded-md bg-white border ${item.border} ${item.color}`}>
          {item.label}
        </span>
        <span className={`text-xs font-medium ${item.color}`}>
          {item.desc}
        </span>
      </div>
    </div>
  );
};

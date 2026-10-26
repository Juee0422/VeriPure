import React, { useState } from 'react';
import { 
  BarChart3, 
  MapPin, 
  ShieldAlert, 
  TrendingUp, 
  AlertTriangle, 
  Globe2, 
  Building2, 
  ArrowUpRight, 
  ShieldCheck, 
  Layers,
  Flag
} from 'lucide-react';
import { ReportFraudModal } from '../components/diagnostics/ReportFraudModal';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { soundEffects } from '../services/audioService';

export const AnalyticsPage: React.FC = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const sampleCounterfeit = MOCK_PRODUCTS.find(p => p.id === 'on-whey-fake') || MOCK_PRODUCTS[3];

  const categoryFraudStats = [
    { name: 'Sports & Fitness Supplements', share: 38, count: '18,420 seizures', trend: '+14%', color: 'bg-red-500' },
    { name: 'Skincare & Dermo-Cosmetics', share: 24, count: '11,280 seizures', trend: '+28%', color: 'bg-orange-500' },
    { name: 'Infant Formula & Pediatric', share: 18, count: '8,410 seizures', trend: '+5%', color: 'bg-amber-500' },
    { name: 'Packaged Confectionery & Spreads', share: 12, count: '5,600 seizures', trend: '-2%', color: 'bg-blue-500' },
    { name: 'Energy & Stimulant Beverages', share: 8, count: '3,820 seizures', trend: '+8%', color: 'bg-purple-500' },
  ];

  const regionalIntercepts = [
    { region: 'North America (US & Canada)', intercepts: '18,920', risk: 'HIGH', topFakes: 'Whey Protein, Hair Serums, Energy Drinks' },
    { region: 'European Union & UK', intercepts: '14,240', risk: 'MEDIUM', topFakes: 'Luxury Cosmetics, Confectionery Spreads' },
    { region: 'South & Southeast Asia', intercepts: '24,800', risk: 'CRITICAL', topFakes: 'Infant Formula, Protein Supplements, Spices' },
    { region: 'Latin America', intercepts: '9,410', risk: 'HIGH', topFakes: 'Beverages, Bulk Packaged Goods' },
    { region: 'Middle East & Africa', intercepts: '7,120', risk: 'MEDIUM', topFakes: 'Baby Food, Imported Candies' },
  ];

  const activeFraudBulletins = [
    {
      id: 'B-2024-09',
      date: 'Latest Dispatch',
      title: 'Counterfeit Whey Protein (Lot FAKE-ON-2024-X9)',
      brand: 'Optimum Nutrition Clone',
      details: 'Substituted raw maltodextrin and flour. Misspelled "Optimum Nutriton" on front neck label.',
      severity: 'CRITICAL',
    },
    {
      id: 'B-2024-08',
      date: 'Active Public Notice',
      title: 'Infant Formula Tampered Lot (Lot ENF-FORGE-8842)',
      brand: 'Counterfeit Enfamil NeuroPro',
      details: 'Resealed foil membrane with dangerous dilution misprint (1 scoop / 4 oz water). Severe risk of infant malnutrition.',
      severity: 'CRITICAL',
    },
    {
      id: 'B-2024-07',
      date: 'Intercept Advisory',
      title: 'Forged Cosmetic Serum (The Ordinary Niacinamide 3C01)',
      brand: 'Deciem / Estée Lauder Clone',
      details: 'Non-sterile tap water suspension with heavy industrial phthalates and stiff PVC dropper bulbs.',
      severity: 'HIGH',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-red-700" />
            <span>Global Brand Protection Network</span>
          </div>
          <h1 className="text-3xl font-black text-navy-900 font-display">
            Counterfeit Heatmaps & Fraud Alerts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-2xl">
            Live telemetry monitoring illicit manufacturing hubs, fraudulent marketplace sellers, and intercepted consumer goods.
          </p>
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            setIsReportModalOpen(true);
          }}
          className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
        >
          <Flag className="w-4 h-4" />
          <span>File Whistleblower Fraud Report</span>
        </button>
      </div>

      {/* Top High-Level Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-200/90 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Total Seized Batches</span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-display">75,290+</div>
          <span className="text-[11px] text-red-600 font-semibold flex items-center gap-0.5 mt-1">
            <TrendingUp className="w-3 h-3" /> +16.2% vs prior quarter
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/90 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Intercepted Retail Value</span>
            <Building2 className="w-4 h-4 text-sage-600" />
          </div>
          <div className="text-2xl font-black text-navy-900 font-display">$142.8M</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Across 140+ national customs gates
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/90 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">Critical Public Hazard Lots</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-red-600 font-display">1,840</div>
          <span className="text-[11px] text-red-600 font-semibold block mt-1">
            Infant formula & supplements flagged
          </span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-200/90 shadow-glass">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider">OCR Algorithm Precision</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-sage-800 font-display">99.4%</div>
          <span className="text-[11px] text-slate-500 font-medium mt-1 block">
            Sub-millimeter glyph & vector match
          </span>
        </div>
      </div>

      {/* Breakdown: Category Distribution + Regional Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown (7 cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-slate-200/90 shadow-glass space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-navy-900 text-base font-display">
                Counterfeit Incidence by Category
              </h3>
              <p className="text-xs text-slate-500">Relative share of fraudulent lots confiscated worldwide</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-400">YTD 2024</span>
          </div>

          <div className="space-y-4">
            {categoryFraudStats.map((item) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{item.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{item.count}</span>
                    <span className="font-mono font-extrabold text-navy-900">{item.share}%</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                    style={{ width: `${item.share}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Regional Intercept Radar (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-slate-200/90 shadow-glass space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
                <Globe2 className="w-4 h-4" />
              </div>
              <h3 className="font-extrabold text-navy-900 text-base font-display">
                Regional Intercept Watchlist
              </h3>
            </div>

            <div className="space-y-2.5">
              {regionalIntercepts.map((reg) => (
                <div 
                  key={reg.region}
                  className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 text-xs flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-bold text-navy-900 block">{reg.region}</span>
                    <span className="text-[10px] text-slate-500">Top risks: {reg.topFakes}</span>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      reg.risk === 'CRITICAL' 
                        ? 'bg-red-100 text-red-700' 
                        : reg.risk === 'HIGH' 
                        ? 'bg-orange-100 text-orange-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {reg.risk} RISK
                    </span>
                    <span className="text-[11px] font-mono font-bold text-slate-700 block mt-0.5">
                      {reg.intercepts} items
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Source: Interpol Intellectual Property Crime Action Group & GS1 Authenticity Gate
          </div>
        </div>
      </div>

      {/* Active Law Enforcement Fraud Bulletins */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-navy-900 font-display flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          Active Public Fraud Bulletins & Recalls
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeFraudBulletins.map((bulletin) => (
            <div
              key={bulletin.id}
              className="glass-card rounded-2xl p-5 border border-red-200 bg-red-50/20 shadow-glass-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                    {bulletin.id}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">{bulletin.date}</span>
                </div>

                <h4 className="font-bold text-navy-900 text-sm mb-1">
                  {bulletin.title}
                </h4>

                <span className="text-xs text-red-700 font-bold block mb-2">
                  Target: {bulletin.brand}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {bulletin.details}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-red-200/60 flex items-center justify-between text-xs">
                <span className="font-black text-[10px] text-red-800 uppercase tracking-wider">
                  SEVERITY: {bulletin.severity}
                </span>
                <span className="text-navy-900 font-bold text-[11px] hover:underline cursor-pointer">
                  Inspect Dossier →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Whistleblower Modal */}
      <ReportFraudModal
        product={sampleCounterfeit}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

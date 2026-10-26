import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { ProductVerificationData, NutriScoreGrade, AuthenticityStatus } from '../types';
import { NutriScoreBadge } from '../components/diagnostics/NutriScoreBadge';
import { Search, Filter, ShieldCheck, ShieldAlert, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { soundEffects } from '../services/audioService';

export const DatabaseSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNutriScore, setSelectedNutriScore] = useState<string>('all');

  const categories = [
    'all',
    'Sports Nutrition & Protein Supplements',
    'Spreads & Sweet Confectionery',
    'Carbonated Beverages',
    'Healthy Snacks & Whole Nut Bars',
    'Plant-Based Milk Alternatives',
    'Dermatological Sun Care & Skincare',
    'Counterfeit Sports Supplements / Fraud Alert',
    'Counterfeit Skincare / Chemical Hazard Alert',
    'Infant Formula / Critical Public Health Hazard'
  ];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const query = searchQuery.toLowerCase();
    const matchesQuery = 
      product.productName.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.barcode.includes(query) ||
      product.category.toLowerCase().includes(query);

    const matchesStatus = 
      selectedStatus === 'all' ||
      (selectedStatus === 'authentic' && product.authenticityStatus === 'VERIFIED_AUTHENTIC') ||
      (selectedStatus === 'counterfeit' && product.authenticityStatus === 'COUNTERFEIT_DETECTED');

    const matchesCategory = 
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesNutriScore = 
      selectedNutriScore === 'all' || product.nutrition.nutriScore === selectedNutriScore;

    return matchesQuery && matchesStatus && matchesCategory && matchesNutriScore;
  });

  const handleInspect = (barcode: string) => {
    soundEffects.playScanBeep();
    navigate(`/result/${barcode}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn space-y-8">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-bold mb-2">
          <Search className="w-3.5 h-3.5 text-sage-700" />
          <span>Global CPG Ledger</span>
        </div>
        <h1 className="text-3xl font-black text-navy-900 font-display">
          Verified Brand & Counterfeit Catalog
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium max-w-2xl">
          Search over pre-validated consumer packaged goods, verified nutritional indexes, and active law-enforcement counterfeit seizure alerts.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-card rounded-3xl p-5 border border-slate-200/90 shadow-glass space-y-4">
        {/* Search Input Bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by product name, brand, category, or barcode (e.g. Nutella, Optimum, 0748927028670)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm font-medium"
          />
        </div>

        {/* Filter Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {/* Status Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Verification Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full py-2 px-3 rounded-xl glass-input text-xs font-semibold text-slate-700"
            >
              <option value="all">All Verification States</option>
              <option value="authentic">✓ Verified Authentic (Official)</option>
              <option value="counterfeit">🚨 Counterfeit Alerts Flagged</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full py-2 px-3 rounded-xl glass-input text-xs font-semibold text-slate-700"
            >
              <option value="all">All Product Categories</option>
              {categories.filter(c => c !== 'all').map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Nutri-Score Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
              Nutri-Score Grade
            </label>
            <select
              value={selectedNutriScore}
              onChange={(e) => setSelectedNutriScore(e.target.value)}
              className="w-full py-2 px-3 rounded-xl glass-input text-xs font-semibold text-slate-700"
            >
              <option value="all">All Nutri-Scores</option>
              <option value="A">Grade A (Optimal Quality)</option>
              <option value="B">Grade B (Good)</option>
              <option value="C">Grade C (Moderate)</option>
              <option value="D">Grade D (Low)</option>
              <option value="E">Grade E (Occasional Treat)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Catalog Results Grid */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredProducts.length} Verified Records
          </span>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => {
              const isFake = p.authenticityStatus === 'COUNTERFEIT_DETECTED';

              return (
                <div
                  key={p.id}
                  className={`glass-card rounded-3xl p-5 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between ${
                    isFake ? 'border-red-200 bg-red-50/15' : 'border-slate-200/90'
                  }`}
                >
                  <div>
                    {/* Top Status & Format Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                        isFake ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {isFake ? <ShieldAlert className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        <span>{isFake ? 'COUNTERFEIT DETECTED' : 'VERIFIED AUTHENTIC'}</span>
                      </span>

                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {p.authenticityScore}% Score
                      </span>
                    </div>

                    {/* Image Viewport */}
                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 mb-4 bg-slate-900 border border-slate-200/80">
                      <img
                        src={p.packagingFrontImage}
                        alt={p.productName}
                        className="w-full h-full object-cover select-none"
                      />
                      {isFake && (
                        <div className="absolute inset-0 bg-red-950/40 backdrop-blur-[1px] flex items-center justify-center p-2 text-center">
                          <span className="text-[11px] font-black uppercase text-white bg-red-600 px-2.5 py-1 rounded-lg shadow-md">
                            FRAUD WARNING LOT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <span className="text-[10px] font-bold text-sage-700 uppercase tracking-wide block mb-0.5">
                      {p.brand}
                    </span>

                    <h3 className="font-extrabold text-navy-900 text-sm mb-1 leading-snug line-clamp-2">
                      {p.productName}
                    </h3>

                    <p className="text-[11px] font-mono text-slate-400 mb-4">
                      GTIN: {p.barcode}
                    </p>
                  </div>

                  {/* Bottom Strip: NutriScore & Action */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <NutriScoreBadge grade={p.nutrition.nutriScore} size="sm" />

                    <button
                      onClick={() => handleInspect(p.barcode)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                        isFake
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-navy-900 hover:bg-navy-800 text-white'
                      }`}
                    >
                      <span>Diagnose</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-12 text-center border border-slate-200">
            <Filter className="w-10 h-10 text-slate-400 mx-auto mb-2" />
            <h4 className="font-bold text-navy-900 text-base">No Matching Records</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Try adjusting your search keywords or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedStatus('all');
                setSelectedCategory('all');
                setSelectedNutriScore('all');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-navy-900 text-white"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

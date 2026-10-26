import React, { useState } from 'react';
import { ProductVerificationData, VerificationCheck } from '../../types';
import { AuthenticityGauge } from './AuthenticityGauge';
import { XAIHeatmapViewer } from './XAIHeatmapViewer';
import { ReportFraudModal } from './ReportFraudModal';
import { 
  Barcode, 
  FileText, 
  ShieldCheck, 
  TrendingDown, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  FileDown, 
  Flag,
  Share2,
  Calendar,
  Layers,
  MapPin
} from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface AuthenticityTabProps {
  product: ProductVerificationData;
}

export const AuthenticityTab: React.FC<AuthenticityTabProps> = ({ product }) => {
  const [expandedCheck, setExpandedCheck] = useState<string | null>('barcodeRegistry');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const toggleCheck = (key: string) => {
    soundEffects.playClick();
    setExpandedCheck(expandedCheck === key ? null : key);
  };

  const checkConfigs: { key: keyof typeof product.checks; title: string; icon: any; data: VerificationCheck }[] = [
    {
      key: 'barcodeRegistry',
      title: '1. GS1 Barcode Registry & GTIN Checksum',
      icon: Barcode,
      data: product.checks.barcodeRegistry
    },
    {
      key: 'typographyInspection',
      title: '2. Optical Typography & Micro-Print OCR',
      icon: FileText,
      data: product.checks.typographyInspection
    },
    {
      key: 'packagingHologram',
      title: '3. Hologram, Seal & Optical Geometry',
      icon: ShieldCheck,
      data: product.checks.packagingHologram
    },
    {
      key: 'priceDistribution',
      title: '4. Distribution Channel & MSRP Anomaly Check',
      icon: TrendingDown,
      data: product.checks.priceDistribution
    }
  ];

  const handleShare = () => {
    soundEffects.playClick();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  const handleDownloadDossier = () => {
    soundEffects.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(product, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `VeriPure-Audit-${product.barcode}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner & Quick Actions */}
      <div className="glass-card rounded-2xl p-6 border border-slate-200/90 shadow-glass">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Radial Authenticity Gauge */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200/80 pb-6 lg:pb-0 lg:pr-6">
            <AuthenticityGauge
              score={product.authenticityScore}
              status={product.authenticityStatus}
              size={180}
            />
          </div>

          {/* Product Dossier Overview */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200">
                  {product.barcodeFormat}: {product.barcode}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-sage-50 text-sage-800 border border-sage-200">
                  {product.category}
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {product.originCountry}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-navy-900 font-display">
                {product.productName}
              </h2>
              <p className="text-sm text-slate-600 font-medium mt-0.5">
                Brand Owner: <span className="font-bold text-navy-900">{product.brand}</span>
              </p>
            </div>

            {/* Quick Meta Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 text-xs">
              <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Standard MSRP</div>
                <div className="text-navy-900 font-extrabold text-sm mt-0.5">${product.msrpPrice.toFixed(2)}</div>
              </div>
              <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Reported Price</div>
                <div className={`font-extrabold text-sm mt-0.5 ${
                  product.reportedMarketPrice && product.reportedMarketPrice < product.msrpPrice * 0.6 
                    ? 'text-red-600' 
                    : 'text-navy-900'
                }`}>
                  ${product.reportedMarketPrice?.toFixed(2) || product.msrpPrice.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Lot / Batch</div>
                <div className="text-navy-900 font-bold truncate text-xs mt-1" title={product.lotBatchNumber || 'N/A'}>
                  {product.lotBatchNumber || 'Standard Lot'}
                </div>
              </div>
              <div className="bg-slate-50/80 p-2.5 rounded-xl border border-slate-200/70">
                <div className="text-slate-400 text-[10px] uppercase font-bold">Verified Date</div>
                <div className="text-navy-900 font-bold text-xs mt-1 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-sage-600" />
                  Today
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                onClick={handleDownloadDossier}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <FileDown className="w-3.5 h-3.5 text-sage-600" />
                <span>Export Audit JSON</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors shadow-xs relative"
              >
                <Share2 className="w-3.5 h-3.5 text-blue-600" />
                <span>{copiedNotification ? 'Link Copied!' : 'Share Dossier'}</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsReportModalOpen(true);
                }}
                className={`ml-auto px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                  product.authenticityStatus === 'COUNTERFEIT_DETECTED'
                    ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                    : 'bg-slate-100 hover:bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Counterfeit Batch</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Layer + Price Diagnostic Inspection Accordion */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-base font-extrabold text-navy-900 font-display flex items-center gap-2">
            <Layers className="w-4 h-4 text-sage-600" />
            3-Layer Deep Forensic Inspection Matrix
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click any row to reveal cryptographic inspection evidence</span>
        </div>

        {checkConfigs.map((chk) => {
          const isExpanded = expandedCheck === chk.key;
          const status = chk.data.status;
          const Icon = chk.icon;

          let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
          let StatusIcon = CheckCircle2;
          if (status === 'fail') {
            badgeColor = 'bg-red-100 text-red-800 border-red-200';
            StatusIcon = XCircle;
          } else if (status === 'warning') {
            badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
            StatusIcon = AlertTriangle;
          }

          return (
            <div
              key={chk.key}
              className={`rounded-2xl transition-all border ${
                status === 'fail' 
                  ? 'bg-red-50/20 border-red-200' 
                  : status === 'warning' 
                  ? 'bg-amber-50/20 border-amber-200' 
                  : 'bg-white border-slate-200/90 shadow-glass-sm'
              }`}
            >
              <button
                onClick={() => toggleCheck(chk.key)}
                className="w-full p-4 flex items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${
                    status === 'fail' ? 'bg-red-100 text-red-700' : status === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-sage-50 text-sage-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">{chk.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{chk.data.summary}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {chk.data.metricValue && (
                    <div className="hidden sm:block text-right">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">{chk.data.metricLabel || 'Confidence'}</div>
                      <div className="text-xs font-bold text-navy-900 font-mono">{chk.data.metricValue}</div>
                    </div>
                  )}

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border flex items-center gap-1 ${badgeColor}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    <span className="uppercase">{status}</span>
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 pt-1 border-t border-slate-100">
                  <div className="bg-slate-50/80 rounded-xl p-3.5 border border-slate-200/70">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Cryptographic Evidence & Substrate Log:
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {chk.data.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-sage-600 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Explainable AI Heatmap Packaging Inspector */}
      <XAIHeatmapViewer
        imageUrl={product.packagingFrontImage}
        regions={product.xaiHeatmapRegions}
        productName={product.productName}
      />

      {/* Counterfeit Report Modal */}
      <ReportFraudModal
        product={product}
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};

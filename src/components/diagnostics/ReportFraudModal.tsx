import React, { useState } from 'react';
import { ProductVerificationData } from '../../types';
import { ShieldAlert, X, Check, Building2, MapPin, Store, AlertTriangle, Send } from 'lucide-react';
import { soundEffects } from '../../services/audioService';

interface ReportFraudModalProps {
  product: ProductVerificationData;
  isOpen: boolean;
  onClose: () => void;
}

export const ReportFraudModal: React.FC<ReportFraudModalProps> = ({ product, isOpen, onClose }) => {
  const [vendorName, setVendorName] = useState('');
  const [purchaseLocation, setPurchaseLocation] = useState('');
  const [pricePaid, setPricePaid] = useState(product.reportedMarketPrice ? product.reportedMarketPrice.toString() : '');
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    soundEffects.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCaseId = `CASE-VP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedRef(generatedCaseId);
      soundEffects.playSuccessFanfare();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/40 backdrop-blur-md animate-fadeIn">
      <div className="glass-card bg-white/95 rounded-2xl max-w-lg w-full p-6 border border-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-navy-900 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedRef ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-red-50 text-red-600 border border-red-200">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 font-display">
                  Report Counterfeit & Fraud
                </h3>
                <p className="text-xs text-slate-500">
                  Notify Brand Protection & GS1 Global Registry Enforcement
                </p>
              </div>
            </div>

            <div className="p-3 bg-red-50/60 rounded-xl border border-red-200/60 mb-4 text-xs text-red-800 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <div>
                <span className="font-bold">Item Identified: </span>
                {product.productName} ({product.barcode})
                <div className="text-[11px] text-red-600 mt-0.5">
                  Your report triggers automated intake by authorized brand security specialists.
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Retailer / Platform / Store Name
                </label>
                <div className="relative">
                  <Store className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amazon Marketplace Vendor, City Bodega, TikTok Shop"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    City / Country / Web URL
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. London / Online URL"
                      value={purchaseLocation}
                      onChange={(e) => setPurchaseLocation(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl glass-input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Price Paid ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="e.g. 19.99"
                    value={pricePaid}
                    onChange={(e) => setPricePaid(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl glass-input"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Observations (Packaging flaws, missing seal, taste/smell)
                </label>
                <textarea
                  rows={3}
                  placeholder="Detail any packaging anomalies, seal defects, missing batch numbers, or health effects experienced..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl glass-input resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting to Brand Protection Network...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Fraud Dossier</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-xl font-bold text-navy-900 font-display mb-1">
              Fraud Case Logged Successfully
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto mb-4">
              Your report has been assigned reference case ID <span className="font-mono font-bold text-navy-900">{submittedRef}</span> and relayed to:
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 text-left text-xs space-y-2 mb-5">
              <div className="flex items-center gap-2 text-slate-700">
                <Building2 className="w-4 h-4 text-sage-600 shrink-0" />
                <span>Brand Legal Team: {product.brand} Brand Protection Unit</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span>GS1 Global Anti-Counterfeit Registry Intercept Desk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>National Consumer Protection & Customs Authority</span>
              </div>
            </div>

            <button
              onClick={() => {
                setSubmittedRef(null);
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold transition-all shadow-md"
            >
              Done & Return to Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

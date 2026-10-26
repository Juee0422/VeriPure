import React, { useState } from 'react';
import { XAIHeatmapRegion } from '../../types';
import { Scan, Eye, CheckCircle2, AlertOctagon, AlertTriangle, ZoomIn, Info } from 'lucide-react';

interface XAIHeatmapProps {
  imageUrl: string;
  regions: XAIHeatmapRegion[];
  productName: string;
}

export const XAIHeatmapViewer: React.FC<XAIHeatmapProps> = ({ imageUrl, regions, productName }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(
    regions.length > 0 ? regions[0].id : null
  );
  const [showOverlays, setShowOverlays] = useState<boolean>(true);

  const activeRegion = regions.find(r => r.id === selectedRegionId) || regions[0];

  return (
    <div className="glass-card rounded-2xl p-5 border border-slate-200/80 shadow-glass">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-sage-50 text-sage-700 border border-sage-200/80">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-navy-900 text-base">Explainable AI (XAI) Packaging Heatmap</h4>
            <p className="text-xs text-slate-500">Optical feature extraction & bounding box anomaly analysis</p>
          </div>
        </div>

        <button
          onClick={() => setShowOverlays(!showOverlays)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs"
        >
          <Eye className="w-3.5 h-3.5 text-slate-600" />
          <span>{showOverlays ? 'Hide Inspection Boxes' : 'Show Inspection Boxes'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Interactive Packaging Canvas Frame */}
        <div className="lg:col-span-7">
          <div className="relative rounded-xl overflow-hidden bg-slate-900 border border-slate-200/80 aspect-4/3 flex items-center justify-center group shadow-inner">
            <img 
              src={imageUrl} 
              alt={productName}
              className="w-full h-full object-cover object-center select-none"
            />

            {/* Subtle Diagnostic Scanning Grid Lines */}
            <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

            {/* Bounding Boxes Layer */}
            {showOverlays && regions.map((region) => {
              const isSelected = region.id === selectedRegionId;
              let borderClass = 'border-emerald-500 bg-emerald-500/15 text-emerald-800 shadow-glow-sage';
              let badgeBg = 'bg-emerald-600 text-white';

              if (region.status === 'tampered') {
                borderClass = 'border-red-500 bg-red-500/25 text-red-900 shadow-glow-crimson animate-pulse';
                badgeBg = 'bg-red-600 text-white';
              } else if (region.status === 'anomaly') {
                borderClass = 'border-amber-500 bg-amber-500/20 text-amber-900 shadow-glow-amber';
                badgeBg = 'bg-amber-600 text-white';
              }

              return (
                <div
                  key={region.id}
                  onClick={() => setSelectedRegionId(region.id)}
                  className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-300 ${borderClass} ${
                    isSelected ? 'ring-4 ring-white/80 ring-offset-2 ring-offset-navy-900 z-20 scale-[1.02]' : 'hover:scale-[1.01] z-10'
                  }`}
                  style={{
                    left: `${region.box.x}%`,
                    top: `${region.box.y}%`,
                    width: `${region.box.width}%`,
                    height: `${region.box.height}%`,
                  }}
                >
                  {/* Pin Badge */}
                  <div className={`absolute -top-3.5 left-2 px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md ${badgeBg}`}>
                    {region.status === 'authentic' && <CheckCircle2 className="w-2.5 h-2.5" />}
                    {region.status === 'anomaly' && <AlertTriangle className="w-2.5 h-2.5" />}
                    {region.status === 'tampered' && <AlertOctagon className="w-2.5 h-2.5" />}
                    <span>{region.confidence}%</span>
                  </div>

                  {/* Corner Crosshairs */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-white" />
                </div>
              );
            })}

            {/* Instruction tooltip overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none px-3 py-1.5 rounded-lg bg-navy-900/70 backdrop-blur-md text-white text-[11px]">
              <span className="flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5 text-sage-400" />
                Tap any highlighted bounding box to inspect forensic proof
              </span>
              <span className="font-mono text-slate-300 text-[10px]">
                {regions.length} inspection nodes mapped
              </span>
            </div>
          </div>
        </div>

        {/* Selected Region Forensic Diagnostic Detail Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          {activeRegion ? (
            <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-200/90 flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5 ${
                    activeRegion.status === 'tampered'
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : activeRegion.status === 'anomaly'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {activeRegion.status === 'tampered' && <AlertOctagon className="w-3.5 h-3.5" />}
                    {activeRegion.status === 'anomaly' && <AlertTriangle className="w-3.5 h-3.5" />}
                    {activeRegion.status === 'authentic' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    <span>{activeRegion.status.toUpperCase()}</span>
                  </span>

                  <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    Confidence: {activeRegion.confidence}%
                  </span>
                </div>

                <h5 className="font-extrabold text-navy-900 text-base mb-1">
                  {activeRegion.label}
                </h5>

                <p className="text-xs text-slate-700 leading-relaxed font-medium mb-3">
                  {activeRegion.findingDescription}
                </p>

                <div className="p-3 bg-white rounded-lg border border-slate-200/80 mb-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1 text-[11px] uppercase tracking-wide">
                    <Info className="w-3 h-3 text-sage-600" />
                    Forensic Inspection Note:
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {activeRegion.inspectionDetail}
                  </p>
                </div>
              </div>

              {/* Selector pills */}
              <div>
                <span className="text-[10px] font-bold tracking-wide text-slate-400 uppercase block mb-1.5">
                  Select Inspection Region:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {regions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedRegionId(r.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${
                        r.id === selectedRegionId
                          ? 'bg-navy-900 text-white shadow-xs'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {r.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 text-xs">
              No inspection regions detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

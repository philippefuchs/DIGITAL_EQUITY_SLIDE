
import React from 'react';
import { TemplateType, UploadedImage, SlideData } from '../types';

interface Props {
  template: TemplateType;
  images: UploadedImage[];
  data: SlideData;
  customLogo?: string | null;
}

const TemplateRenderer: React.FC<Props> = ({ template, images, data, customLogo }) => {
  const mainImageSrc = data.aiImageUrl || (images[0] ? images[0].url : null);

  const renderDigitalEquityLogo = () => {
    if (customLogo) {
      return (
        <div className="flex flex-col items-end flex-shrink-0">
          <img src={customLogo} alt="Custom logo" className="max-h-16 object-contain" />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-end flex-shrink-0">
        <div className="de-logo-bars mb-1">
          <div className="de-bar de-bar-1"></div>
          <div className="de-bar de-bar-2"></div>
          <div className="de-bar de-bar-3"></div>
          <div className="de-bar de-bar-4"></div>
          <div className="de-bar de-bar-5"></div>
        </div>
        <div className="digital-equity-logo-text text-lg leading-none">DIGITAL EQUITY</div>
        <div className="text-[8px] font-bold text-[#0077C8] tracking-[0.2em] mt-0.5">VALUE CREATION</div>
      </div>
    );
  };

  const renderChevrons = () => (
    <div className="chevron-container scale-75 origin-right">
      <div className="chevron-outline"></div>
      <div className="chevron-outline"></div>
      <div className="chevron-outline"></div>
    </div>
  );

  const renderHeader = () => (
    <div className="mb-6 flex justify-between items-start gap-4">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl font-black text-[#0077C8] uppercase tracking-tight mb-1 leading-tight break-words">
          {data.title || "Strategic Objective"}
        </h1>
        <div className="h-1 w-20 bg-[#0077C8] mb-3"></div>
        <p className="text-sm text-slate-500 font-medium italic line-clamp-2">
          {data.subtitle || "Accelerating value through digital equity frameworks"}
        </p>
      </div>
      {renderDigitalEquityLogo()}
    </div>
  );

  const renderFooter = () => (
    <div className="mt-4 flex justify-between items-end border-t border-slate-100 pt-4 flex-shrink-0">
      <div className="flex flex-col gap-0.5">
        <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0077C8]">Digital Equity Value Creation</div>
        <div className="text-[8px] font-medium text-slate-400 uppercase tracking-widest">Confidential Strategy Deck • 2024</div>
      </div>
      {renderChevrons()}
    </div>
  );

  const renderContent = () => {
    switch (template) {
      case TemplateType.PORTFOLIO_GRID:
        return (
          <div className="grid grid-cols-2 gap-8 h-full items-center">
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight line-clamp-2">{data.mainPoint}</h2>
              <div className="space-y-3">
                {data.bulletPoints.slice(0, 3).map((p, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="text-[#0077C8] font-black text-base">0{i + 1}</span>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            {mainImageSrc && (
              <div className="relative rounded-sm overflow-hidden shadow-xl aspect-video self-center">
                <img src={mainImageSrc} className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-[8px] border-white/10 pointer-events-none"></div>
              </div>
            )}
          </div>
        );
      case TemplateType.STRATEGIC_FRAMEWORK:
        return (
          <div className="flex flex-col gap-6 h-full justify-between">
            <div className="grid grid-cols-5 gap-2">
              {['DISCOVER', 'STRATEGIZE', 'OPTIMIZE', 'SCALE', 'REALIZE'].map((step, i) => (
                <div key={i} className={`p-2 border-b-2 ${i === 2 ? 'border-[#0077C8] bg-blue-50' : 'border-slate-100 bg-white'} text-center`}>
                  <span className="text-[8px] font-black text-[#0077C8]">STEP 0{i + 1}</span>
                  <p className="text-[9px] font-bold text-slate-800 mt-0.5">{step}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-8 items-center flex-1 min-h-0">
              {mainImageSrc && (
                <div className="w-1/4 h-full max-h-[250px] rounded-sm overflow-hidden shadow-lg flex-shrink-0">
                  <img src={mainImageSrc} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-2">{data.mainPoint}</h3>
                <ul className="space-y-3">
                  {data.bulletPoints.slice(0, 3).map((p, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0077C8] mt-1 flex-shrink-0"></div>
                      <span className="line-clamp-2">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex gap-10 h-full items-center">
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <div className="bg-[#0077C8] text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-widest inline-block mb-3 self-start">
                Executive Brief
              </div>
              <h2 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tight leading-tight break-words">
                {data.mainPoint}
              </h2>
              <div className="space-y-4">
                {data.bulletPoints.slice(0, 3).map((p, i) => (
                  <div key={i} className="flex gap-3 min-h-0">
                    <div className="w-0.5 h-auto bg-[#0077C8]/20 rounded-full flex-shrink-0"></div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-3">{p}</p>
                  </div>
                ))}
              </div>
            </div>
            {mainImageSrc && (
              <div className="w-[42%] relative group aspect-square flex-shrink-0">
                <div className="absolute inset-0 bg-[#0077C8] translate-x-3 translate-y-3 rounded-sm -z-10 opacity-10"></div>
                <div className="h-full rounded-sm overflow-hidden shadow-xl relative">
                  <img src={mainImageSrc} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#0077C8]/20 to-transparent"></div>
                </div>
              </div>
            )}
          </div>
        );
    }
  }

  return (
    <div
      id="slide-capture"
      className="bg-white p-12 w-full shadow-[0_35px_60px_-15px_rgba(0,0,0,0.1)] border-l-[12px] border-[#0077C8] min-h-[580px] flex flex-col overflow-hidden"
      style={{ aspectRatio: '16 / 9' }}
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {renderHeader()}
        <div className="flex-1 min-h-0 overflow-hidden">
          {renderContent()}
        </div>
        {renderFooter()}
      </div>
    </div>
  );
};

export default TemplateRenderer;

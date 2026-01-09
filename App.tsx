
import React, { useState, useRef } from 'react';
import { UploadedImage, TemplateType, SlideData } from './types';
import { TEMPLATES } from './constants';
import TemplateRenderer from './components/TemplateRenderer';
import ImageEditor from './components/ImageEditor';
import { generateSlideDeck, generateThematicImage } from './services/geminiService';

const App: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const [deck, setDeck] = useState<SlideData[]>([
    {
      id: 'initial-1',
      title: 'Digital Equity Transformation',
      subtitle: 'Maximizing corporate value through strategic digital asset alignment',
      mainPoint: 'The Digital Equity Value Chain',
      bulletPoints: [
        'Defining baseline digital readiness across the enterprise',
        'Identifying high-impact opportunities for digital arbitrage',
        'Scaling equity through standardized technological frameworks'
      ],
      template: TemplateType.EXECUTIVE_SUMMARY
    }
  ]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [editingImage, setEditingImage] = useState<UploadedImage | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState('');
  const [generationStep, setGenerationStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    (Array.from(files) as File[]).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newImg: UploadedImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: event.target.result as string,
            name: file.name,
            mimeType: file.type
          };
          setImages(prev => [...prev, newImg]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCustomLogo(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSmartGenerate = async () => {
    if (!aiPrompt) return;
    setIsGenerating(true);
    setGenerationStep(0);
    setGenerationProgress('Modeling Digital Equity strategy...');

    const deckStructure = await generateSlideDeck(aiPrompt);

    if (deckStructure && deckStructure.length > 0) {
      const newDeck: SlideData[] = [];
      const totalSlides = deckStructure.length;

      for (let i = 0; i < totalSlides; i++) {
        setGenerationStep(i + 1);
        const s = deckStructure[i];
        setGenerationProgress(`Rendering Slide ${i + 1}/${totalSlides}: ${s.title}...`);

        const aiUrl = await generateThematicImage(s.visualPrompt);

        newDeck.push({
          id: Math.random().toString(36).substr(2, 9),
          title: s.title,
          subtitle: s.subtitle,
          mainPoint: s.mainPoint,
          bulletPoints: s.bulletPoints,
          template: s.template as TemplateType,
          aiImageUrl: aiUrl || undefined,
          aiPromptUsed: s.visualPrompt
        });
      }

      setDeck(newDeck);
      setCurrentSlideIndex(0);
    }

    setIsGenerating(false);
    setGenerationProgress('');
    setGenerationStep(0);
  };

  const downloadPDF = async () => {
    // @ts-ignore
    const { jsPDF } = window.jspdf;
    // @ts-ignore
    const html2canvas = window.html2canvas;

    const pdf = new jsPDF('l', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const originalIndex = currentSlideIndex;

    for (let i = 0; i < deck.length; i++) {
      setCurrentSlideIndex(i);
      await new Promise(r => setTimeout(r, 800));

      const element = document.getElementById('slide-capture');
      if (!element) continue;

      const canvas = await html2canvas(element, { scale: 3, useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    pdf.save(`Digital_Equity_Strategic_Deck_${new Date().getTime()}.pdf`);
    setCurrentSlideIndex(originalIndex);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F1F5F9]">
      {/* Top Nav: Digital Equity Brand */}
      <header className="bg-[#0077C8] text-white py-4 px-8 flex justify-between items-center no-print border-b border-white/10 z-50 sticky top-0 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white p-1 rounded-sm shadow-inner flex items-end gap-[2px]">
            <div className="w-[3px] h-2 bg-[#0077C8]"></div>
            <div className="w-[3px] h-3 bg-[#0077C8]"></div>
            <div className="w-[3px] h-4 bg-[#0077C8]"></div>
          </div>
          <div className="h-5 w-[1px] bg-white/20"></div>
          <div>
            <h1 className="text-[10px] font-black tracking-[0.4em] uppercase opacity-95">Digital Equity</h1>
            <p className="text-[8px] font-bold tracking-[0.2em] uppercase opacity-60">Value Creation Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={downloadPDF}
            className="bg-white text-[#0077C8] px-8 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2 shadow-xl hover:bg-blue-50 active:scale-95"
          >
            Export Strategy Deck (PDF)
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row gap-0 overflow-hidden">
        {/* Left Side: Controls */}
        <aside className="w-full lg:w-[420px] bg-white border-r border-slate-200 overflow-y-auto no-print p-8 space-y-10 shadow-lg z-40">
          <div className="space-y-6">
            <label className="text-[11px] font-black text-[#0077C8] uppercase tracking-widest flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isGenerating ? 'bg-[#0077C8] animate-ping' : 'bg-slate-300'}`}></span>
              Value Creation Prompt
            </label>
            <div className="relative">
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Describe your transformation goal... (e.g. 'Optimizing cloud costs and operational agility for a retail chain')"
                className="w-full h-40 p-5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-4 focus:ring-[#0077C8]/10 focus:border-[#0077C8] transition-all resize-none shadow-inner font-medium text-slate-700"
              />
              <button
                onClick={handleSmartGenerate}
                disabled={isGenerating || !aiPrompt}
                className={`absolute bottom-4 right-4 p-3 rounded-xl shadow-2xl transition-all ${isGenerating ? 'bg-slate-100' : 'bg-[#0077C8] text-white hover:scale-105 active:scale-90'
                  }`}
              >
                {isGenerating ? (
                  <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                )}
              </button>
            </div>
            {isGenerating && (
              <div className="space-y-3">
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div className="h-full bg-[#0077C8] transition-all duration-700" style={{ width: `${(generationStep / 5) * 100}%` }}></div>
                </div>
                <p className="text-[10px] font-bold text-[#0077C8] uppercase tracking-widest text-center">{generationProgress}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Custom Logo</h3>
            <div className="space-y-4">
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <button
                onClick={() => logoInputRef.current?.click()}
                className="w-full p-4 border-2 border-dashed border-slate-200 rounded-2xl hover:border-[#0077C8] hover:bg-blue-50 transition-all flex flex-col items-center gap-2 group"
              >
                {customLogo ? (
                  <>
                    <img src={customLogo} alt="Custom logo" className="max-h-16 object-contain" />
                    <span className="text-[10px] font-bold text-[#0077C8]">Click to change logo</span>
                  </>
                ) : (
                  <>
                    <svg className="w-8 h-8 text-slate-300 group-hover:text-[#0077C8] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#0077C8] transition-colors">Upload your logo</span>
                  </>
                )}
              </button>
              {customLogo && (
                <button
                  onClick={() => setCustomLogo(null)}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold rounded-xl transition-all"
                >
                  Reset to default logo
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategy Roadmap</h3>
            <div className="space-y-4">
              {deck.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentSlideIndex(i)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left shadow-sm ${currentSlideIndex === i ? 'border-[#0077C8] bg-blue-50 ring-2 ring-blue-500/10' : 'border-slate-100 bg-white'
                    }`}
                >
                  <span className={`text-[12px] font-black ${currentSlideIndex === i ? 'text-[#0077C8]' : 'text-slate-200'}`}>0{i + 1}</span>
                  <span className={`text-[12px] font-bold ${currentSlideIndex === i ? 'text-[#0077C8]' : 'text-slate-500'} truncate`}>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Preview Side */}
        <section className="flex-1 p-12 overflow-y-auto flex flex-col items-center relative bg-slate-50">
          <div className="w-full max-w-5xl transition-all duration-700 z-10 shadow-2xl">
            <TemplateRenderer
              template={deck[currentSlideIndex].template}
              images={images}
              data={deck[currentSlideIndex]}
              customLogo={customLogo}
            />
          </div>
          <p className="mt-8 text-[10px] font-black uppercase tracking-[0.6em] text-slate-300 no-print">
            Digital Equity Value Creation • Internal Presentation Draft
          </p>
        </section>
      </main>
    </div>
  );
};

export default App;

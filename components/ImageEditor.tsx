
import React, { useState } from 'react';
import { UploadedImage } from '../types';
import { editImage } from '../services/geminiService';

interface Props {
  image: UploadedImage;
  onUpdate: (newUrl: string) => void;
  onClose: () => void;
}

const ImageEditor: React.FC<Props> = ({ image, onUpdate, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleEdit = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setError('');

    try {
      // Convert URL to Base64 if it's not already
      // For this app, uploaded images are usually data URLs already.
      const base64Part = image.url.split(',')[1];
      const result = await editImage(base64Part, image.mimeType, prompt);
      
      if (result) {
        onUpdate(result);
        onClose();
      } else {
        setError('Failed to process image. Check your prompt or API key.');
      }
    } catch (e) {
      setError('An error occurred during AI processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-mckinsey-blue mckinsey-serif">AI Strategy Image Editor</h3>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Powered by Gemini 2.5 Flash Image</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold mb-2 text-slate-700">Original Asset</p>
            <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-inner">
              <img src={image.url} alt="To Edit" className="w-full h-full object-contain" />
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-slate-700">Transformation Prompt</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Add a corporate blue filter', 'Apply a high-contrast professional look', 'Remove the distracting background objects'"
                className="w-full h-32 p-3 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-mckinsey-blue focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <button
                onClick={handleEdit}
                disabled={isProcessing || !prompt}
                className={`w-full py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-lg ${
                  isProcessing || !prompt 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-mckinsey-blue text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Synthesizing...
                  </span>
                ) : 'Execute Transformation'}
              </button>
              
              <div className="p-3 bg-slate-50 border border-slate-100 rounded text-[11px] text-slate-500 italic">
                Tip: Use specific consulting terminology like "professional gradient," "minimalist overlay," or "monochrome style" for best results.
              </div>
            </div>
            
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;

import React, { useState, useEffect } from 'react';
import API from '../../../api/api.jsx';
import SubsectionWrapper from './SubsectionWrapper.jsx';

const CampusUpdateCard = ({ subsection, items = [], color1, color2, darkMode }) => {
  const [pdfModal, setPdfModal] = useState(null);

  // Close PDF on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && pdfModal) {
        setPdfModal(null);
      }
    };
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [pdfModal]);
  return (
    <SubsectionWrapper title={subsection.title} icon={subsection.icon || '📰'} color1={color1} darkMode={darkMode}>
      <div className="space-y-3 h-[380px] overflow-y-auto pr-2 custom-scrollbar">
        {items.slice(0, 6).map((n, i) => (
          <a key={n.id || i} href={n.link || '/'} className={`block p-4 rounded-xl transition-all hover:shadow-xl ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`} style={{ border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}` }}>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
                  {n.date ? new Date(n.date).getDate() : ''}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h5 className={`text-sm font-semibold leading-tight mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{n.date ? new Date(n.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}</p>
                  {n.isNew && (<span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#8b5cf6', color: '#fff' }}>LATEST</span>)}
                </div>
                {n.description && <p className={`text-xs mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>{n.description}</p>}
                {n.pdfLink && (<div className="mt-3"><button onClick={(e) => {e.preventDefault(); e.stopPropagation(); setPdfModal(API.getImageUrl(n.pdfLink) || n.pdfLink);}} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition" style={{ backgroundColor: color1 }}>PDF 📄</button></div>)}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Full-Page PDF Viewer */}
      {pdfModal && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPdfModal(null);
            }
          }}
        >
          {/* Header with Close Button */}
          <div className={`flex items-center justify-between p-4 border-b flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📄 PDF Document</h2>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPdfModal(null);
              }}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-300 text-gray-900 hover:bg-gray-400'}`}
            >
              ✕ Close
            </button>
          </div>

          {/* PDF Viewer - Full Height */}
          <div className="flex-1 overflow-auto bg-gray-200">
            <iframe
              src={pdfModal}
              className="w-full h-full border-0"
              title="PDF Viewer"
              type="application/pdf"
              onError={() => {
                console.error('❌ PDF failed to load:', pdfModal);
              }}
            />
          </div>

          {/* Footer with Download Button */}
          <div className={`flex items-center justify-between p-4 border-t flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const link = document.createElement('a');
                link.href = pdfModal;
                link.download = 'document.pdf';
                link.click();
              }}
              className="px-6 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
              style={{ backgroundColor: color1 }}
            >
              ⬇️ Download PDF
            </button>
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Press ESC or click Close to exit
            </span>
          </div>
        </div>
      )}
    </SubsectionWrapper>
  );
};

export default CampusUpdateCard;

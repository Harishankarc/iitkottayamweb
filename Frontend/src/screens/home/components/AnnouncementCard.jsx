import React, { useState, useEffect } from 'react';
import API from '../../../api/api.jsx';
import SubsectionWrapper from './SubsectionWrapper.jsx';

const AnnouncementCard = ({ subsection, items = [], color1, darkMode }) => {
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
    <SubsectionWrapper title={subsection.title} icon={subsection.icon || '📢'} color1={color1} darkMode={darkMode}>
      <div className="space-y-3 h-[380px] overflow-y-auto pr-2 custom-scrollbar">
        {items.slice(0, 8).map((n, i) => (
          <a key={n.id || i} href={n.link || '/'} className={`block p-4 rounded-lg transition-all hover:shadow-lg relative border-l-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`} style={{ borderLeftColor: n.isNew ? '#fbbf24' : color1 }}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h5 className={`text-sm font-semibold leading-tight flex-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
              {n.isNew && (<span className="inline-block text-[9px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#fbbf24', color: '#1e3a5f' }}>NEW</span>)}
            </div>
            <div className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <span>📅</span>
              <span>{n.date ? new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : ''}</span>
            </div>
            {n.description && (
              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>{n.description}</p>
            )}
            {n.pdfLink && (
              <div className="mt-3">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPdfModal(API.getImageUrl(n.pdfLink) || n.pdfLink);
                  }}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition" 
                  style={{ backgroundColor: color1 }}
                >
                  PDF 📄
                </button>
              </div>
            )}
          </a>
        ))}
      </div>

      {/* Full-Page PDF Viewer */}
      {pdfModal && (
        <div 
          className="fixed inset-0 z-50 flex flex-col bg-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              // Only close if clicking the outer container, not inner content
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

export default AnnouncementCard;

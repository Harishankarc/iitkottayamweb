import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import API from '../../../api/api.jsx';
import SubsectionWrapper from './SubsectionWrapper.jsx';

const QuickUpdateCard = ({ subsection, items = [], color1, darkMode }) => {
  const [pdfModal, setPdfModal] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);

  // Manage PDF Modal body scroll lock and key listeners
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && pdfModal) {
        setPdfModal(null);
      }
    };
    if (pdfModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [pdfModal]);

  // Reset loading state when PDF url changes
  useEffect(() => {
    if (pdfModal) {
      setIframeLoading(true);
    }
  }, [pdfModal]);

  const handleCardClick = (e, item) => {
    const targetUrl = item.pdfLink || item.link;
    const isPdf = targetUrl && (targetUrl.toLowerCase().endsWith('.pdf') || targetUrl.includes('/uploads/'));
    
    if (isPdf) {
      e.preventDefault();
      e.stopPropagation();
      const rawUrl = API.getImageUrl(targetUrl) || targetUrl;
      const isMobileOrTablet = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 1024;
      if (isMobileOrTablet) {
        window.open(rawUrl, '_blank', 'noopener,noreferrer');
      } else {
        setPdfModal(rawUrl);
      }
    } else if (item.link && item.link !== '/' && item.link !== '#') {
      e.preventDefault();
      if (item.link.startsWith('http')) {
        window.open(item.link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = item.link;
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <>
      <SubsectionWrapper title={subsection.title} icon={subsection.icon || '⚡'} color1={color1} darkMode={darkMode}>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} style={{ color: color1 }}>{items.length} items</span>
        </div>
        <div className="space-y-2 h-[380px] overflow-y-auto pr-2 custom-scrollbar">
          {items.slice(0, 8).map((n, i) => (
            <div 
              key={n.id || i} 
              onClick={(e) => handleCardClick(e, n)} 
              className={`block rounded-lg transition-all hover:shadow-md cursor-pointer ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-white'}`}
            >
              <div className="flex gap-3 p-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color1 }}>{i + 1}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className={`text-sm font-semibold leading-tight mb-1.5 line-clamp-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                  <div className="flex items-center gap-3">
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{n.date ? new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : ''}</p>
                    {n.isNew && (<span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color1, color: '#fff' }}>NEW</span>)}
                  </div>
                  {n.description && (
                    <p className={`text-xs mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2`}>{n.description}</p>
                  )}
                  {n.pdfLink && (
                    <div className="mt-2">
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const rawUrl = API.getImageUrl(n.pdfLink) || n.pdfLink;
                          const isMobileOrTablet = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 1024;
                          if (isMobileOrTablet) {
                            window.open(rawUrl, '_blank', 'noopener,noreferrer');
                          } else {
                            setPdfModal(rawUrl);
                          }
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
                        style={{ 
                          backgroundColor: `${color1}15`, 
                          color: color1, 
                          border: `1px solid ${color1}30` 
                        }}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span>PDF</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SubsectionWrapper>

      {/* PDF Viewer Modal: 90vw wide & 80vh high on mobile/tablet, 80vw wide & 90vh high on desktop */}
      {pdfModal && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setPdfModal(null);
            }
          }}
        >
          <div className={`w-[90vw] md:w-[80vw] h-[80vh] md:h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Header with Close Button */}
            <div className={`flex items-center justify-between px-6 py-4 border-b flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
              <h2 className={`text-base font-bold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <span>📄</span> <span>PDF Document</span>
              </h2>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setPdfModal(null);
                }}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* PDF Viewer - Full Height */}
            <div className="flex-1 overflow-auto bg-gray-100 relative flex items-center justify-center" style={{ WebkitOverflowScrolling: 'touch' }}>
              {iframeLoading && (
                <div className={`absolute inset-0 flex items-center justify-center z-10 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2" style={{ borderColor: color1 }}></div>
                </div>
              )}
              <iframe
                src={pdfModal}
                onLoad={() => setIframeLoading(false)}
                className="w-full h-full border-0 block"
                title="PDF Viewer"
                type="application/pdf"
                style={{ overflow: 'auto' }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default QuickUpdateCard;

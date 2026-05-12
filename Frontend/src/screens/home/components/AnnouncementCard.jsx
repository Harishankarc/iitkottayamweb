import React, { useState } from 'react';
import API from '../../../api/api.jsx';
import SubsectionWrapper from './SubsectionWrapper.jsx';

const AnnouncementCard = ({ subsection, items = [], color1, darkMode }) => {
  const [pdfModal, setPdfModal] = useState(null);
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
                  onClick={() => setPdfModal(API.getImageUrl(n.pdfLink) || n.pdfLink)}
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

      {/* PDF Modal */}
      {pdfModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col`}>
            <div className="flex items-center justify-between p-4 border-b" style={{ borderBottomColor: darkMode ? '#374151' : '#e5e7eb' }}>
              <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>📄 PDF Viewer</h3>
              <button
                onClick={() => setPdfModal(null)}
                className={`text-2xl font-bold hover:opacity-70 transition ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-auto bg-gray-100 flex items-center justify-center">
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(pdfModal)}&embedded=true`}
                className="w-full h-full border-0"
                title="PDF Viewer"
                onError={() => {
                  console.error('❌ PDF iframe failed to load:', pdfModal);
                }}
              />
            </div>
            <div className="flex items-center justify-between p-4 border-t" style={{ borderTopColor: darkMode ? '#374151' : '#e5e7eb' }}>
              <button
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = pdfModal;
                  link.download = 'document.pdf';
                  link.click();
                }}
                className="px-4 py-2 rounded-lg text-white font-semibold hover:opacity-90 transition"
                style={{ backgroundColor: color1 }}
              >
                ⬇️ Download
              </button>
              <button
                onClick={() => setPdfModal(null)}
                className={`px-4 py-2 rounded-lg font-semibold ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'}`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </SubsectionWrapper>
  );
};

export default AnnouncementCard;

import React, { useState } from 'react';
import API from '../../../api/api.jsx';
import SubsectionWrapper from './SubsectionWrapper.jsx';

const CampusUpdateCard = ({ subsection, items = [], color1, color2, darkMode }) => {
  const [pdfModal, setPdfModal] = useState(null);
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
                {n.pdfLink && (<div className="mt-3"><button onClick={() => setPdfModal(API.getImageUrl(n.pdfLink) || n.pdfLink)} className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition" style={{ backgroundColor: color1 }}>PDF 📄</button></div>)}
              </div>
            </div>
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

export default CampusUpdateCard;

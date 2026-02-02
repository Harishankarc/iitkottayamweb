import { useState } from 'react';
import { ExternalLink, X, Maximize2 } from 'lucide-react';
import { useTheme } from '../context/createContext';

export default function MediaCard({ item }) {
  const { darkMode } = useTheme();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    if (item.type === 'image' || item.type === 'news') {
      e.preventDefault();
      setShowModal(true);
    } else if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  return (
    <>
      {/* Card */}
      <div
        className={`rounded-lg overflow-hidden border transition-all duration-300 hover:scale-105 cursor-pointer ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}
        onClick={handleClick}
      >
        {/* Header with Source Name */}
        <div
          className={`px-4 py-3 border-b ${
            darkMode ? 'bg-blue-900/30 border-gray-700' : 'bg-blue-50 border-gray-200'
          }`}
        >
          <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {item.source || 'Media Source'}
          </h3>
        </div>

        {/* Image */}
        <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
          {item.image ? (
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Maximize2 className="w-12 h-12 text-gray-400" />
            </div>
          )}
          {/* Overlay Icon */}
          <div className="absolute top-2 right-2 bg-black/60 rounded-full p-2">
            <Maximize2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Footer with Link */}
        <div className="p-4">
          <a
            href={item.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="truncate">{item.linkText || 'View More'}</span>
            <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0" />
          </a>
        </div>
      </div>

      {/* Modal for enlarged view */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh] overflow-auto">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
              onClick={() => setShowModal(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Enlarged Image */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Details */}
            <div className="mt-4 bg-white/10 backdrop-blur-md rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-2">{item.source}</h2>
              {item.title && (
                <p className="text-gray-200 mb-4">{item.title}</p>
              )}
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {item.linkText || 'View Full Article'}
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

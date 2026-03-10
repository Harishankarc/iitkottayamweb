import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Wifi, Server, CheckCircle } from 'lucide-react';



export default function Internet() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInternetData = async () => {
      try {
        setError(null);
        const response = await API.get('/api/content-blocks/page/internet');
        const blocks = response.data.data || response.data || [];
        setContentBlocks(blocks.filter(block => block.isVisible));
      } catch (error) {
        console.error('Error fetching internet data:', error);
        setError('Failed to load internet facilities information. Please try again later.');
        setContentBlocks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchInternetData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    API.get('/api/content-blocks/page/internet')
      .then((response) => {
        const blocks = response.data.data || response.data || [];
        setContentBlocks(blocks.filter(block => block.isVisible));
      })
      .catch((error) => {
        console.error('Error fetching internet data:', error);
        setError('Failed to load internet facilities information. Please try again later.');
        setContentBlocks([]);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get blocks by type
  const heroBlock = contentBlocks.find(block => block.blockType === 'hero');
  const paragraphBlocks = contentBlocks.filter(block => block.blockType === 'paragraph');
  const listBlocks = contentBlocks.filter(block => block.blockType === 'list');
  const imageBlocks = contentBlocks.filter(block => block.blockType === 'image');

  // Render list items with icons
  const renderListItem = (item, index) => {
    return (
      <div 
        key={index}
        className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
          darkMode ? 'bg-gray-700/30 hover:bg-gray-700/50' : 'bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: color1 }} />
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {item}
        </p>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      {heroBlock && (
        <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Wifi className="w-4 h-4" style={{ color: color1 }} />
              {heroBlock.content.badge || 'Network Infrastructure'}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {heroBlock.content.title || 'Internet'}
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {heroBlock.content.description || ''}
            </p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Paragraph Blocks */}
        {paragraphBlocks.map((block, index) => (
          <div 
            key={block.id}
            className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
            } shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            {block.content.title && (
              <div className="flex items-center gap-3 mb-6">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color1}20` }}
                >
                  <Server className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <h2 className="text-3xl font-bold" style={{ color: color1 }}>
                  {block.content.title}
                </h2>
              </div>
            )}
            <div 
              className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: block.content.text?.replace(/\n/g, '<br/>') }}
            />
          </div>
        ))}

        {/* List Blocks */}
        {listBlocks.map((block, index) => (
          <div 
            key={block.id}
            className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
            } shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            {block.content.title && (
              <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
                {block.content.title}
              </h2>
            )}
            <div className="space-y-2">
              {block.content.items && block.content.items.map((item, idx) => renderListItem(item, idx))}
            </div>
          </div>
        ))}

        {/* Image Gallery */}
        {imageBlocks.length > 0 && (
          <div 
            className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
            } shadow-xl border-2 hover:border-opacity-100`}
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Internet Facilities Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageBlocks.map((block, index) => (
                <div
                  key={block.id}
                  className={`aspect-video rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={API.getImageUrl(block.content.url)}
                    alt={block.content.alt || `Internet facility image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
                          <div class="text-center">
                            <svg class="w-12 h-12 mx-auto mb-2 opacity-30" style="color: ${color1}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p class="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}">Image ${index + 1}</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

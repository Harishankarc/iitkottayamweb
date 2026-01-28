import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Trophy, Users, Target, MapPin, Clock, Award, Camera, Activity } from 'lucide-react';

export default function Sports() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    setLoading(true);
    setError(null);
    API.get('/api/content-blocks/page/sports')
      .then((response) => {
        const blocks = response.data.data || response.data || [];
        setContentBlocks(blocks.filter(block => block.isVisible));
      })
      .catch((error) => {
        console.error('Error fetching sports content:', error);
        setError('Failed to load sports facilities content. Please try again later.');
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
            onClick={fetchContent}
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      {heroBlock && (
        <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" 
                 style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Trophy className="w-4 h-4" style={{ color: color1 }} />
              {heroBlock.content.badge || 'Athletics & Recreation'}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {heroBlock.content.title}
            </h1>
            {heroBlock.content.description && (
              <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {heroBlock.content.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Paragraph Blocks */}
        {paragraphBlocks.map((block, index) => (
          <div 
            key={block.blockId || index}
            className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
            style={{ borderColor: `${color1}20` }} 
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
          >
            {block.content.title && (
              <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
                {block.content.title}
              </h2>
            )}
            <div 
              className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            />
          </div>
        ))}

        {/* List Blocks */}
        {listBlocks.map((block, index) => (
          <div key={block.blockId || index} className="mb-12">
            {block.content.title && (
              <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
                {block.content.title}
              </h2>
            )}
            <div className="space-y-3">
              {block.content.items && block.content.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`p-4 border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  }`}
                  style={{ borderLeftColor: color1 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color1}20` }}>
                      <Trophy className="w-4 h-4" style={{ color: color1 }} />
                    </div>
                    <div className="flex-1">
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Image Gallery */}
        {imageBlocks.length > 0 && (
          <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Sports Facilities Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {imageBlocks.map((block, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <img
                    src={API.getImageUrl(block.content.src || block.content.url)}
                    alt={block.content.alt || `Sports facility ${index + 1}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => e.currentTarget.src = `https://placehold.co/600x400/${color1.replace('#', '')}/ffffff?text=Sports+Facility`}
                  />
                  {block.content.caption && (
                    <div className="p-4">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {block.content.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
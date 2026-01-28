import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Dumbbell, Activity, Heart, Users, Clock, Trophy, Camera } from 'lucide-react';

export default function Gym() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/content-blocks/page/gym`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const blocks = data.data;
          
          // Parse content blocks
          const heroBlock = blocks.find(b => b.blockType === 'hero');
          const paragraphBlocks = blocks.filter(b => b.blockType === 'paragraph');
          const listBlock = blocks.find(b => b.blockType === 'list');
          const imageBlocks = blocks.filter(b => b.blockType === 'image');
          
          // Parse JSON content
          const parseContent = (block) => {
            if (!block) return null;
            return typeof block.content === 'string' ? JSON.parse(block.content) : block.content;
          };
          
          setContent({
            hero: parseContent(heroBlock),
            about: parseContent(paragraphBlocks.find(b => b.blockId === 'about-gym')),
            equipment: parseContent(listBlock),
            guidance: parseContent(paragraphBlocks.find(b => b.blockId === 'professional-guidance')),
            images: imageBlocks.map(b => parseContent(b)).filter(c => c)
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gym content:', err);
        setError('Failed to load content');
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {error || 'Content not available'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          {content.hero && (
            <>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" 
                   style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Dumbbell className="w-4 h-4" style={{ color: color1 }} />
                {content.hero.badge}
              </div>
              <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {content.hero.title}
              </h1>
              <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {content.hero.description}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Section */}
        {content.about && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              {content.about.title}
            </h2>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {content.about.text}
            </p>
          </div>
        )}

        {/* Equipment List */}
        {content.equipment && content.equipment.items && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              {content.equipment.title}
            </h2>
            <div className="space-y-3">
              {content.equipment.items.map((item, index) => {
                const [name, description] = item.split(' - ');
                return (
                  <div
                    key={index}
                    className={`p-4 border-l-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                    }`}
                    style={{ borderLeftColor: color1 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color1}20` }}>
                        <Dumbbell className="w-4 h-4" style={{ color: color1 }} />
                      </div>
                      <div>
                        <h3 className={`font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {name}
                        </h3>
                        {description && (
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Professional Guidance */}
        {content.guidance && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <div className="text-center">
              <div 
                className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${color1}20` }}
              >
                <Users className="w-8 h-8" style={{ color: color1 }} />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: color1 }}>
                {content.guidance.title}
              </h2>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {content.guidance.text}
              </p>
            </div>
          </div>
        )}

        {/* Image Gallery */}
        {content.images && content.images.length > 0 && (
          <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Gymnasium Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.images.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-video rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                >
                  <img
                    src={API.getImageUrl(image.src || image.url)}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                          <div class="text-center">
                            <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                            </svg>
                            <p class="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}">${image.caption}</p>
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

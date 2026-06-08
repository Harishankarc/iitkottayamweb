import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { renderContentBlock } from '../../hooks/usePageContent.jsx';
import { Trophy, Users, Target, MapPin, Clock, Award, Camera, Activity } from 'lucide-react';
import { cleanHtmlFormatting } from '../../utils/sanitizeHtml.js';



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
        const parsedBlocks = blocks.map(block => ({
          ...block,
          content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
        }));
        setContentBlocks(parsedBlocks.filter(block => block.isVisible));
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
  const orderedBlocks = [...contentBlocks]
    .sort((a, b) => (a.blockOrder ?? 0) - (b.blockOrder ?? 0) || (a.id ?? 0) - (b.id ?? 0));

  const renderSingleBlock = (block, index) => {
    if (block.blockType === 'hero') {
      return (
        <div key={block.id || index} className={`py-2 px-6 mb-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" 
                 style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Trophy className="w-4 h-4" style={{ color: color1 }} />
              {block.content.badge || 'Athletics & Recreation'}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {block.content.title}
            </h1>
            {block.content.subtitle && (
              <p className={`text-sm md:text-base font-semibold mb-2 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {block.content.subtitle}
              </p>
            )}
            {block.content.description && (
              <div 
                className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(block.content.description) }}
              />
            )}
          </div>
        </div>
      );
    }

    if (block.blockType === 'paragraph') {
      return (
        <div 
          key={block.id || index}
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
          <div className={`content-html text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(block.content.text) }} />
        </div>
      );
    }

    if (block.blockType === 'list') {
      return (
        <div key={block.id || index} className="mb-12">
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
      );
    }

    return (
      <div key={block.id || index} className="mb-12">
        {renderContentBlock(block, { darkMode, color1, color2: API.color2 })}
      </div>
    );
  };

  const renderImageGroup = (blocks, index) => {
    if (blocks.length === 1) {
      const block = blocks[0];
      return (
        <div key={`image-group-${index}`} className="mb-12 flex justify-center">
          <div
            className={`w-full max-w-2xl rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ border: `1px solid ${color1}20` }}
          >
            {block.content.title && (
              <div className="p-4 border-b" style={{ borderColor: `${color1}20` }}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {block.content.title}
                </h3>
              </div>
            )}
            <img
              src={API.getImageUrl(block.content.src || block.content.url)}
              alt={block.content.alt || 'Sports facility'}
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
        </div>
      );
    }

    return (
      <div key={`image-group-${index}`} className={`p-8 rounded-2xl mb-12 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
           style={{ borderColor: `${color1}20` }} 
           onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
           onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
        <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
          {blocks[0]?.content?.title || 'Sports Facilities Gallery'}
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {blocks.map((block, idx) => (
            <div
              key={block.id || idx}
              className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              {block.content.title && (
                <div className="p-4 border-b" style={{ borderColor: `${color1}20` }}>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {block.content.title}
                  </h3>
                </div>
              )}
              <img
                src={API.getImageUrl(block.content.src || block.content.url)}
                alt={block.content.alt || `Sports facility ${idx + 1}`}
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
    );
  };

  const renderOrderedBlocks = () => {
    const rendered = [];
    let currentImageGroup = [];

    for (let i = 0; i < orderedBlocks.length; i++) {
      const block = orderedBlocks[i];

      if (block.blockType === 'image') {
        currentImageGroup.push(block);
      } else {
        if (currentImageGroup.length > 0) {
          rendered.push(renderImageGroup(currentImageGroup, rendered.length));
          currentImageGroup = [];
        }
        rendered.push(renderSingleBlock(block, rendered.length));
      }
    }

    if (currentImageGroup.length > 0) {
      rendered.push(renderImageGroup(currentImageGroup, rendered.length));
    }

    return rendered;
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {renderOrderedBlocks()}
      </div>
    </div>
  );
}

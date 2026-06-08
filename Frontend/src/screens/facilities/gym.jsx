import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { renderContentBlock } from '../../hooks/usePageContent.jsx';
import { Dumbbell, Users } from 'lucide-react';
import cleanHtmlFormatting from '../../utils/cleanHtmlFormatting';

export default function Gym() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/content-blocks/page/gym`);
        const data = await response.json();
        
        if (data.success && data.data) {
          const rawBlocks = Array.isArray(data.data) ? data.data : (data.data.data || data.data || []);
          const blocks = Array.isArray(rawBlocks) ? rawBlocks : [];
          const parsedBlocks = blocks.map(block => ({
            ...block,
            content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
          }));
          const visibleBlocks = parsedBlocks.filter(block => block.isVisible !== false);
          setContentBlocks(visibleBlocks);
        } else {
          setError('Content not available');
        }
      } catch (err) {
        console.error('Error fetching gym content:', err);
        setError('Failed to load content');
      } finally {
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

  if (error || contentBlocks.length === 0) {
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

  // Get blocks sorted by blockOrder
  const orderedBlocks = [...contentBlocks]
    .sort((a, b) => (a.blockOrder ?? 0) - (b.blockOrder ?? 0) || (a.id ?? 0) - (b.id ?? 0));

  const renderSingleBlock = (block, index) => {
    if (block.blockType === 'hero') {
      return (
        <div key={block.id || index} className={`py-2 px-6 mb-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" 
                 style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Dumbbell className="w-4 h-4" style={{ color: color1 }} />
              {block.content.badge || 'Gymnasium'}
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
                className={`content-html text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(block.content.description || '') }}
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
          <div className={`content-html text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(block.content.text || '') }} />
        </div>
      );
    }

    if (block.blockType === 'list') {
      const isEquipment = block.sectionName === 'equipment' || 
                          block.blockId === 'gym-equipment-list' || 
                          (block.content.title && block.content.title.toLowerCase().includes('equipment'));
      
      if (isEquipment) {
        return (
          <div key={block.id || index} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              {block.content.title || 'Available Equipment'}
            </h2>
            <div className="space-y-3">
              {block.content.items && block.content.items.map((item, idx) => {
                const [name, description] = item.split(' - ');
                return (
                  <div
                    key={idx}
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
        );
      } else {
        return (
          <div key={block.id || index} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              {block.content.title || 'Key Features'}
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {block.content.items && block.content.items.map((feature, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl transition-all duration-300 hover:shadow-xl ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
                  }`}
                  style={{ border: `1px solid ${color1}15` }}
                >
                  <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }
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
              alt={block.content.alt || 'Gymnasium facility'}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `
                  <div class="w-full h-64 flex items-center justify-center ${darkMode ? 'bg-gray-750' : 'bg-gray-150'}">
                    <div class="text-center p-4">
                      <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                      <p class="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}">${block.content.caption || ''}</p>
                    </div>
                  </div>
                `;
              }}
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
          {blocks[0]?.content?.title || 'Gymnasium Gallery'}
        </h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                alt={block.content.alt || `Gymnasium facility ${idx + 1}`}
                className="w-full h-64 object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.innerHTML = `
                    <div class="w-full h-64 flex items-center justify-center ${darkMode ? 'bg-gray-750' : 'bg-gray-150'}">
                      <div class="text-center p-4">
                        <svg class="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                        </svg>
                        <p class="text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}">${block.content.caption || ''}</p>
                      </div>
                    </div>
                  `;
                }}
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

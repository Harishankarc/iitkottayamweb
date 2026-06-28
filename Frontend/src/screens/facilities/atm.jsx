import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { renderContentBlock } from '../../hooks/usePageContent.jsx';
import { CreditCard } from 'lucide-react';

export default function BankATM() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/content-blocks/page/bank-atm`);
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
        console.error('Error fetching Bank/ATM content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
        </div>
      </div>
    );
  }

  if (error || contentBlocks.length === 0) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {error || 'No content available'}
            </p>
          </div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <CreditCard className="w-4 h-4" style={{ color: color1 }} />
              {block.content.badge || 'Banking Services'}
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {block.content.title}
            </h1>
            <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {block.content.description}
            </p>
          </div>
        </div>
      );
    }

    if (block.blockType === 'paragraph') {
      return (
        <div 
          key={block.id || index}
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
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
            className={`content-html text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            dangerouslySetInnerHTML={{ __html: block.content.text }}
          />
        </div>
      );
    }

    if (block.blockType === 'list') {
      return (
        <div 
          key={block.id || index}
          className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
          style={{ borderColor: `${color1}20` }} 
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
          onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
        >
          {block.content.title && (
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              {block.content.title}
            </h2>
          )}
          <div className="space-y-3">
            {block.content.items && block.content.items.map((feature, idx) => (
              <div 
                key={idx}
                className={`p-4 rounded-lg border-l-4 transition-all duration-300 ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}
                style={{ borderLeftColor: `${color1}40` }}
                onMouseEnter={(e) => e.currentTarget.style.borderLeftColor = color1}
                onMouseLeave={(e) => e.currentTarget.style.borderLeftColor = `${color1}40`}
              >
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {feature}
                </p>
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
      const image = block.content;
      return (
        <div key={`image-group-${index}`} className="mb-12 flex justify-center">
          <div
            className={`w-full max-w-2xl rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{ border: `1px solid ${color1}20` }}
          >
            {image.title && (
              <div className="p-4 border-b" style={{ borderColor: `${color1}20` }}>
                <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {image.title}
                </h3>
              </div>
            )}
            <img 
              src={API.getImageUrl(image.src || image.url)} 
              alt={image.alt || 'ATM Facility'}
              className="w-full h-64 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="24"%3EATM Facility Image%3C/text%3E%3C/svg%3E';
              }}
            />
            {image.caption && (
              <div className="p-4">
                <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {image.caption}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div key={`image-group-${index}`} className={`max-w-full mx-auto mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
        style={{ borderColor: `${color1}20` }} 
        onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
        onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
      >
        {blocks[0]?.content?.title && (
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            {blocks[0].content.title}
          </h2>
        )}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {blocks.map((block, idx) => {
            const image = block.content;
            return (
              <div key={block.id || idx} className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ border: `1px solid ${color1}20` }}>
                {image.title && (
                  <div className="p-4 border-b" style={{ borderColor: `${color1}20` }}>
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {image.title}
                    </h3>
                  </div>
                )}
                <img 
                  src={API.getImageUrl(image.src || image.url)} 
                  alt={image.alt || `ATM Facility ${idx + 1}`}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="24"%3EATM Facility Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                {image.caption && (
                  <div className="p-4">
                    <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
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

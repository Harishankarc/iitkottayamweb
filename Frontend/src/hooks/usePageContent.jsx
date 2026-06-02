import { useState, useEffect } from 'react';
import API from '../api/api';

/**
 * Helper function to clean HTML by removing extra dir and style attributes
 * Keeps only essential formatting tags (strong, em, u, a, ul, ol, li)
 */
function cleanHtmlFormatting(html) {
  if (!html) return '';
  
  return html
    // Remove dir="ltr" attributes
    .replace(/\s+dir="ltr"/g, '')
    // Remove style attributes but keep the tags
    .replace(/\s+style="[^"]*direction:\s*ltr[^"]*"/g, '')
    // Remove unicode-bidi related styles
    .replace(/\s+style="[^"]*unicode-bidi:\s*isolate[^"]*"/g, '')
    // Clean up any remaining empty style attributes
    .replace(/\s+style=""/g, '')
    // Remove any remaining style attributes entirely
    .replace(/\s+style="[^"]*"/g, '');
}

/**
 * Custom hook to fetch and manage page content from the database
 * @param {string} pageName - Unique page identifier (e.g., 'homepage', 'why-iiitk')
 * @returns {object} { content, blocks, loading, error, refetch }
 */
export function usePageContent(pageName) {
  const [pageContent, setPageContent] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPageContent = async () => {
    if (!pageName) return;
    
    setLoading(true);
    setError(null);

    try {
      // Fetch page metadata (title, SEO, etc.)
      const pageResponse = await API.get(`/api/pages/${pageName}`);
      if (pageResponse.success && pageResponse.data) {
        setPageContent(pageResponse.data);
      } else {
        setPageContent(null);
      }

      // Fetch actual content from content_blocks table (ALL content is here now!)
      const blocksResponse = await API.get(`/api/content-blocks/page/${pageName}`);
      if (blocksResponse.success && blocksResponse.data) {
        // Handle both nested and direct array responses
        const blocks = Array.isArray(blocksResponse.data) 
          ? blocksResponse.data 
          : (blocksResponse.data.data || blocksResponse.data);
        setContentBlocks(Array.isArray(blocks) ? blocks : []);
      } else {
        setContentBlocks([]);
      }
    } catch (err) {
      console.error('Error fetching page content:', err);
      setError(err.message || 'Failed to load page content');
      setPageContent(null);
      setContentBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPageContent();
  }, [pageName]);

  return {
    content: pageContent,
    blocks: contentBlocks,
    loading,
    error,
    refetch: fetchPageContent
  };
}

/**
 * Helper function to get content block by section name
 * @param {Array} blocks - Array of content blocks
 * @param {string} sectionName - Section identifier
 * @returns {object|null} Content block or null
 */
export function getBlockBySection(blocks, sectionName) {
  if (!Array.isArray(blocks)) return null;
  return blocks.find(block => block.sectionName === sectionName) || null;
}

/**
 * Helper function to get all blocks of a specific type
 * @param {Array} blocks - Array of content blocks
 * @param {string} blockType - Block type (hero, paragraph, list, etc.)
 * @returns {Array} Array of matching blocks
 */
export function getBlocksByType(blocks, blockType) {
  if (!Array.isArray(blocks)) return [];
  return blocks.filter(block => (block.blockType || block.type) === blockType);
}

/**
 * Helper function to get visible blocks only
 * @param {Array} blocks - Array of content blocks
 * @returns {Array} Array of visible blocks
 */
export function getVisibleBlocks(blocks) {
  if (!Array.isArray(blocks)) return [];
  return blocks.filter(block => block.isVisible !== false);
}

/**
 * Helper function to render content blocks based on type
 * @param {object} block - Content block object
 * @param {object} options - Rendering options (darkMode, colors, etc.)
 * @returns {JSX.Element|null} Rendered block or null
 */
export function renderContentBlock(block, options = {}) {
  if (!block || block.isVisible === false) return null;

  const { darkMode = false, color1 = '#239244', color2 = '#e8f5f0', t = (text) => text } = options;
  const content = block.content || {};
  const blockType = block.blockType || block.type; // Support both field names

  // Helper function to get correct image URL
  const getImageUrl = (imgUrl) => {
    // Return empty string if no URL provided
    if (!imgUrl || imgUrl === 'undefined' || imgUrl === 'null') {
      console.warn('Invalid image URL:', imgUrl);
      return '';
    }
    // If it's already a full URL, use as is
    if (imgUrl.startsWith('http')) {
      return imgUrl;
    }
    // If it's an uploaded file, prepend backend URL
    if (imgUrl.startsWith('/uploads/')) {
      return `http://localhost:5000${imgUrl}`;
    }
    // If it's a static image from /images, use as is
    if (imgUrl.startsWith('/images/')) {
      return imgUrl;
    }
    // Try to import from assets
    try {
      return new URL(`../assets/images/${imgUrl}`, import.meta.url).href;
    } catch (e) {
      console.error('Failed to load image:', imgUrl, e);
      return '';
    }
  };

  switch (blockType) {
    case 'hero':
      return (
        <div 
          className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`}
          style={{ 
            backgroundImage: content.backgroundImage ? `url(${API.getImageUrl(content.backgroundImage)})` : 'none',
            borderColor: darkMode ? '#374151' : color1 + '30'
          }}
        >
          <div className="mx-auto py-2">
            <div className="max-w-5xl mx-auto text-center px-6">
              {content.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" 
                  style={{ 
                    backgroundColor: `${color1}1A`, 
                    color: color1, 
                    borderColor: `${color1}66` 
                  }}>
                  <span className="text-base">✨</span>
                  {t(content.badge)}
                </div>
              )}
              {content.title && (
                <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {content.title.split(' ')[0]} <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>{content.title.split(' ').slice(1).join(' ')}</span>
                </h1>
              )}
              {content.subtitle && (
                <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {t(content.subtitle)}
                </p>
              )}
              {content.description && (
                <p className={`text-sm mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {t(content.description)}
                </p>
              )}
              {content.buttonText && content.buttonLink && (
                <a 
                  href={content.buttonLink}
                  className="inline-block mt-6 px-8 py-3 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300"
                  style={{ backgroundColor: color1 }}
                >
                  {t(content.buttonText)}
                </a>
              )}
            </div>
          </div>
        </div>
      );

    case 'heading':
      const level = content.level || content.headingLevel || 'h2';
      const HeadingTag = typeof level === 'number' ? `h${level}` : level;
      const alignmentClass = content.align === 'center' ? 'text-center' : content.align === 'right' ? 'text-right' : 'text-left';
      const sizeClasses = {
        h1: 'text-4xl md:text-5xl',
        h2: 'text-3xl md:text-4xl',
        h3: 'text-2xl md:text-3xl',
        h4: 'text-xl md:text-2xl'
      };
      
      return (
        <div className={`py-6 ${alignmentClass} ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <HeadingTag className={`${sizeClasses[HeadingTag] || sizeClasses.h2} font-bold tracking-tight`}>
            {content.text || content.title || 'Heading'}
          </HeadingTag>
        </div>
      );

    case 'paragraph':
      return (
        <div 
          className={`content-html w-full rounded-lg shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl p-10 md:p-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
        >
          {content.icon && (
            <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold mb-4 border-2 shadow-md text-white rounded-lg" style={{ backgroundColor: color1, borderColor: color1 }}>
              <span className="text-lg">{content.icon}</span>
              {t(content.title)}
            </div>
          )}
          {!content.icon && content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>{t(content.title)}</h3>
          )}
          {content.text && (
            <div 
              className={`leading-relaxed text-sm md:text-base mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(content.text) }}
              style={{
                wordBreak: 'break-word',
              }}
            >
            </div>
          )}
          {content.tags && Array.isArray(content.tags) && (
            <div className="flex flex-wrap gap-3 mt-5">
              {content.tags.map((tag, i) => (
                <span 
                  key={i}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{ 
                    backgroundColor: darkMode ? '#1f2937' : color2,
                    color: color1,
                    borderColor: `${color1}66`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <style>{`
            .content-html strong { font-weight: 700; }
            .content-html em { font-style: italic; }
            .content-html u { text-decoration: underline; }
            .content-html a { color: ${color1}; font-weight: 600; text-decoration: underline; }
            .content-html a:hover { opacity: 0.8; }
            .content-html ul { margin: 12px 0; padding-left: 24px; list-style-type: disc; }
            .content-html ol { margin: 12px 0; padding-left: 24px; list-style-type: decimal; }
            .content-html li { margin: 6px 0; }
          `}</style>
        </div>
      );

    case 'text': // For HTML content
      return (
        <div 
          className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(content.text || '') }}
          style={{ wordBreak: 'break-word' }}
        />
      );

    case 'gallery':
    case 'image':
      // Handle both single image and image arrays
      if (content.images && Array.isArray(content.images)) {
        const normalizedImages = content.images
          .map((img) => {
            if (!img) return null;
            if (typeof img === 'string') {
              return { url: img, alt: '', caption: '' };
            }
            return img;
          })
          .filter(Boolean);

        // Filter out images with invalid URLs
        const validImages = normalizedImages.filter(img => {
          const url = img.url || img.src;
          return url && url !== 'undefined' && url !== 'null';
        });

        if (validImages.length === 0) {
          return null; // Don't render if no valid images
        }

        return (
          <div className="w-full py-8">
            {content.title && (
              <h3 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {content.title}
              </h3>
            )}
            <div className="grid grid-cols-3 gap-4 max-w-7xl mx-auto">
              {validImages.map((img, idx) => {
                const imgSrc = getImageUrl(img.url || img.src);
                
                return (
                  <div key={idx} className="relative rounded-lg overflow-hidden shadow-lg h-64">
                    <img 
                      src={imgSrc} 
                      alt={img.alt || `Image ${idx + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load image:', imgSrc);
                        e.target.style.display = 'none';
                      }}
                    />
                    {img.caption && (
                      <div className="absolute bottom-0 right-0 bg-black bg-opacity-60 text-white px-4 py-2 text-sm font-medium">
                        {img.caption}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }
      
      // Single image fallback
      const singleImgSrc = getImageUrl(content.url || content.src);
      return (
        <div className="py-4 max-w-3xl mx-auto">
          {content.title && (
            <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ color: color1 }}>
              {content.title}
            </h3>
          )}
          <img 
            src={singleImgSrc} 
            alt={content.alt || 'Image'} 
            className="w-full rounded-lg max-h-96 object-cover"
            onError={(e) => {
              console.error('Failed to load image:', singleImgSrc);
              e.target.style.display = 'none';
            }}
          />
          {content.caption && (
            <p className={`text-sm mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {content.caption}
            </p>
          )}
        </div>
      );

    case 'list':
      const listItems = Array.isArray(content) ? content : (Array.isArray(content.items) ? content.items : (typeof content.items === 'string' ? content.items.split(' ') : []));
      
      // Detect document style: check for SCALES/BOOK/DOC keywords OR if blockId contains 'documents'
      const hasDocumentStyle = listItems.some(item => typeof item === 'string' && /^(SCALES|BOOK|DOC|ARCHIVE)/.test(item)) || block.blockId?.includes('documents');
      
      if (hasDocumentStyle && listItems.length <= 5) {
        // Document card style for governance documents
        return (
          <div 
            className={`w-full rounded-lg shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl p-10 md:p-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
          >
            {content.title && (
              <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {content.title.includes(' ') ? (
                  <>
                    {content.title.split(' ')[0]} <span style={{ color: color1 }}>{content.title.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : (
                  <span style={{ color: color1 }}>{content.title}</span>
                )}
              </h2>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listItems.map((item, idx) => {
                // Map text placeholders to emojis
                const iconMap = {
                  'SCALES': '⚖️',
                  'BOOK': '📖',
                  'DOC': '📄',
                  'ARCHIVE': '🗄️'
                };
                
                // Parse for link: "ICON Text|URL" format
                const [contentPart, url] = typeof item === 'string' && item.includes('|') 
                  ? item.split('|') 
                  : [item, '#'];
                
                const [firstWord, ...textParts] = contentPart.split(' ');
                const icon = iconMap[firstWord] || firstWord;
                const text = iconMap[firstWord] ? textParts.join(' ') : contentPart;
                
                return (
                  <a
                    key={idx}
                    href={url || '#'}
                    target={url && url !== '#' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className={`group relative rounded-lg p-5 border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb'}
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color1 }}></div>
                    <div className="relative flex items-center gap-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                        <span className="text-2xl">{icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-base font-bold transition-colors duration-300 leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {text}
                        </h3>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        );
      }
      
      // Special styling for annual reports (many items in grid)
      if (content.badge || listItems.length > 6) {
        return (
          <div 
            className={`w-full rounded-lg p-10 md:p-16 shadow-xl overflow-hidden relative border-2 transition-all duration-500 ${darkMode ? 'bg-gray-800' : ''}`}
            style={{ borderColor: darkMode ? '#374151' : `${color1}33`, backgroundColor: darkMode ? '' : color2 }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-10 right-10 w-60 h-60 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            </div>
            
            <div className="relative text-center">
              {content.badge && (
                <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-4 border-2 shadow-md" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                  {content.icon && <span className="text-base">{content.icon}</span>}
                  {t(content.badge)}
                </div>
              )}
              {content.title && (
                <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  {t(content.title)}
                </h2>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {listItems.map((item, idx) => {
                  // Parse item for link: "Text|URL" format
                  const [itemText, itemUrl] = typeof item === 'string' && item.includes('|') 
                    ? item.split('|') 
                    : [item, '#'];
                  
                  return (
                    <a
                      key={idx}
                      href={itemUrl || '#'}
                      target={itemUrl && itemUrl !== '#' ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 backdrop-blur-sm px-3 py-2 rounded-lg border-2 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                      style={{ borderColor: `${color1}4D` }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}99`}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}44`}
                    >
                      <span className="text-sm shrink-0" style={{ color: color1 }}>📥</span>
                      <span className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{itemText}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }
      // Default tag/badge style
      return (
        <div 
          className={`w-full rounded-lg shadow-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl p-10 md:p-16 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
        >
          {content.title && (
            <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>
              {t(content.title)}
            </h3>
          )}
          <div className="flex flex-wrap gap-3">
            {listItems.map((item, idx) => {
              // Parse item for link: "Text|URL" format
              const [itemText, itemUrl] = typeof item === 'string' && item.includes('|') 
                ? item.split('|') 
                : [item, null];
              
              if (itemUrl) {
                return (
                  <a
                    key={idx}
                    href={itemUrl}
                    target={itemUrl !== '#' ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl text-xs font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                    style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                  >
                    {t(itemText)}
                  </a>
                );
              }
              
              return (
                <span
                  key={idx}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                >
                  {t(item)}
                </span>
              );
            })}
          </div>
        </div>
      );

    case 'button':
      return (
        <div className="py-4">
          <a
            href={content.link || '#'}
            className="block"
          >
            <div 
              className="rounded-lg p-8 md:p-10 shadow-xl border relative overflow-hidden transition-all duration-300"
              style={{ backgroundColor: color1, borderColor: color1 }}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {content.title || content.text || 'Learn More'}
                  </h3>
                  {content.description && (
                    <p className="text-sm md:text-base text-gray-50">
                      {content.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 transition-all duration-300 hover:scale-110">
                  <span className="font-bold text-sm transition-colors duration-300 text-white">
                    {content.buttonText || 'Learn More'}
                  </span>
                  <svg className="w-5 h-5 text-white hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      );

    case 'card':
      return (
        <div className="py-2">
          <a
            href={content.link || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className={`block rounded-lg overflow-hidden border transition-all duration-300 hover:scale-105 hover:shadow-xl ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
            style={{
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Header with Title/Source */}
            {content.title && (
              <div
                className={`px-4 py-3 border-b ${
                  darkMode ? 'bg-blue-900/30 border-gray-700' : 'bg-blue-50 border-gray-200'
                }`}
              >
                <h3 className={`font-bold text-sm flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {content.icon && <span>{content.icon}</span>}
                  {content.title}
                </h3>
              </div>
            )}

            {/* Image */}
            {content.image && (
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={getImageUrl(content.image)}
                  alt={content.title || 'Card image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Description and Button */}
            <div className="p-4">
              {content.description && (
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {content.description}
                </p>
              )}
              <div
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                <span>{content.buttonText || 'Learn More'}</span>
                <svg className="w-3 h-3 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      );

    case 'table':
      const tableHeaders = Array.isArray(content.headers) ? content.headers : (Array.isArray(content.columns) ? content.columns : []);
      const tableRows = Array.isArray(content.rows) ? content.rows : (Array.isArray(content.data) ? content.data : []);
      const tableNotes = Array.isArray(content.notes) ? content.notes : [];

      return (
        <div className={`w-full rounded-lg p-8 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 ${darkMode ? 'bg-gray-800' : ''}`}
          style={{ borderColor: darkMode ? '#374151' : `${color1}33`, backgroundColor: darkMode ? '' : '' }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          </div>
          
          <div className="relative">
            {content.title && (
              <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {content.title}
              </h3>
            )}

            {content.subtitle && tableHeaders.length > 0 && (
              <div className="mb-8 p-6 rounded-2xl border-2 border-dashed bg-white" style={{ borderColor: `${color1}66`, backgroundColor: darkMode ? '#1f2937' : 'white' }}>
                <h4 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {content.subtitle}
                </h4>
                <div className="overflow-x-auto rounded-lg border" style={{ borderColor: `${color1}33`, backgroundColor: darkMode ? '#374151' : 'white' }}>
                  <table className="w-full text-center">
                    <thead style={{ backgroundColor: color2 }}>
                      <tr style={{ backgroundColor: darkMode ? '#374151' : color2 }}>
                        {tableHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 text-base font-bold text-center" style={{ color: color1, borderBottom: `2px solid ${color1}66` }}>
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableRows.map((row, rowIdx) => (
                        <tr key={rowIdx} className={`border-b ${darkMode ? 'text-gray-300' : ''}`} style={{ borderColor: `${color1}33` }}>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className={`p-3 text-center ${cellIdx === 0 ? 'font-medium' : ''} ${darkMode ? (cellIdx === 0 ? 'text-gray-200' : 'text-gray-300') : (cellIdx === 0 ? 'text-gray-800' : 'text-gray-700')}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {!content.subtitle && tableHeaders.length > 0 && (
              <div className={`overflow-x-auto rounded-2xl shadow-md border-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-[1200px] text-center text-sm">
                  <thead className="border-b" style={{ backgroundColor: darkMode ? '#1f2937' : color2, borderColor: `${color1}66` }}>
                    <tr>
                      {tableHeaders.map((header, idx) => (
                        <th key={idx} className={`p-3 font-semibold text-center ${idx === 0 ? 'text-base font-bold align-middle' : ''} ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                          style={idx === 0 ? { color: color1, borderRight: `2px solid ${color1}66` } : (idx === tableHeaders.length - 1 ? {} : { borderRight: idx % 2 === 0 ? `2px solid ${color1}66` : `1px solid ${color1}33` })}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="border-b" style={{ borderColor: `${color1}33` }}>
                        {row.map((cell, cellIdx) => (
                          <td key={cellIdx} className={`p-3 text-center ${cellIdx === 0 ? 'font-semibold' : ''} ${darkMode ? (cellIdx === 0 ? 'text-gray-200' : 'text-gray-300') : (cellIdx === 0 ? 'text-gray-800' : 'text-gray-700')}`}
                            style={cellIdx === 0 ? { borderRight: `2px solid ${color1}66` } : (cellIdx === row.length - 1 ? {} : { borderRight: cellIdx % 2 === 0 ? `2px solid ${color1}66` : `1px solid ${color1}33` })}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {tableNotes.length > 0 && (
              <div className="mt-8 space-y-4">
                {tableNotes.map((note, idx) => {
                  const [noteText, noteUrl] = note.includes('|') ? note.split('|') : [note, null];
                  return (
                    <div key={idx} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                      <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {noteUrl ? (
                          <>
                            {noteText.split('->')[0]}
                            {noteText.includes('->') && (
                              <>
                                → <a href={noteUrl} className="font-semibold" style={{ color: color1 }}>{noteText.split('->')[1]}</a>
                              </>
                            )}
                          </>
                        ) : (
                          noteText.includes(':') ? (
                            <>
                              <strong>{noteText.split(':')[0]}:</strong> {noteText.split(':').slice(1).join(':')}
                            </>
                          ) : noteText
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {tableHeaders.length === 0 && !content.subtitle && (
              <div className={`p-8 text-center rounded-lg border-2 border-dashed ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`} style={{ borderColor: `${color1}66` }}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📊 Table with no data</p>
              </div>
            )}
          </div>
        </div>
      );

    case 'statistics':
      const statsItems = Array.isArray(content.stats)
        ? content.stats
        : (Array.isArray(content.items) ? content.items : []);

      return (
        <div className={`w-full rounded-lg p-8 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          </div>

          <div className="relative">
            {content.title && (
              <h3 className={`text-2xl md:text-3xl font-bold mb-8 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                {content.title}
              </h3>
            )}

            {statsItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statsItems.map((stat, idx) => {
                  const normalizedStat = typeof stat === 'string'
                    ? { value: '', label: stat }
                    : stat;

                  return (
                  <div
                    key={idx}
                    className={`relative p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden group ${
                      darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gradient-to-br from-white to-blue-50 border-gray-200'
                    }`}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color1;
                      e.currentTarget.style.boxShadow = `0 0 20px ${color1}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: color1 }}></div>
                    
                    <div className="relative text-center">
                      <div
                        className="text-4xl md:text-5xl font-bold mb-3 transition-all duration-300"
                        style={{ color: color1 }}
                      >
                        {normalizedStat.value}
                      </div>
                      <div className={`text-sm md:text-base font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {normalizedStat.label}
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
            ) : (
              <div className={`p-8 text-center rounded-lg border-2 border-dashed ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`} style={{ borderColor: `${color1}66` }}>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>📈 No statistics to display</p>
              </div>
            )}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default usePageContent;

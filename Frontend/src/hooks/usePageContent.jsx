import { useState, useEffect } from 'react';
import API from '../api/api';

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
        const blocks = blocksResponse.data;
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

  const { darkMode = false, color1 = '#239244', color2 = '#e8f5f0' } = options;
  const content = block.content || {};
  const blockType = block.blockType || block.type; // Support both field names

  switch (blockType) {
    case 'hero':
      return (
        <div 
          className={`relative py-16 px-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          style={{ backgroundImage: content.backgroundImage ? `url(${API.getImageUrl(content.backgroundImage)})` : 'none' }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {content.title && (
              <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {content.title}
              </h1>
            )}
            {content.subtitle && (
              <h2 className={`text-xl mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {content.subtitle}
              </h2>
            )}
            {content.description && (
              <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {content.description}
              </p>
            )}
            {content.buttonText && content.buttonLink && (
              <a 
                href={content.buttonLink}
                className="inline-block mt-6 px-8 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: color1 }}
              >
                {content.buttonText}
              </a>
            )}
          </div>
        </div>
      );

    case 'heading':
      return (
        <div className={`py-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-2xl font-bold">{content.title || content.text}</h2>
        </div>
      );

    case 'paragraph':
      return (
        <div className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {content.title && <h3 className="text-xl font-semibold mb-2">{content.title}</h3>}
          <p className="leading-relaxed">{content.text}</p>
        </div>
      );

    case 'text': // For HTML content
      return (
        <div 
          className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
          dangerouslySetInnerHTML={{ __html: content.text || '' }}
        />
      );

    case 'image':
      return (
        <div className="py-4">
          <img 
            src={API.getImageUrl(content.src)} 
            alt={content.alt || 'Image'} 
            className="w-full rounded-lg"
          />
          {content.caption && (
            <p className={`text-sm mt-2 text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {content.caption}
            </p>
          )}
        </div>
      );

    case 'list':
      const listItems = Array.isArray(content) ? content : (Array.isArray(content.items) ? content.items : []);
      return (
        <div className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {content.title && <h3 className="text-xl font-semibold mb-3">{content.title}</h3>}
          <div className="flex flex-wrap gap-3">
            {listItems.map((item, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl text-xs font-semibold border-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: color2, color: color1, borderColor: `${color1}66` }}
              >
                {item}
              </span>
            ))}
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
              className="rounded-lg p-8 md:p-10 shadow-xl border relative overflow-hidden group transition-all duration-300 hover:shadow-2xl"
              style={{ backgroundColor: color1, borderColor: color1 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
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
                <div className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                  <span className="group-hover:text-[#239244] font-bold text-sm transition-colors duration-300 text-white">
                    {content.buttonText || 'Learn More'}
                  </span>
                  <svg className="w-5 h-5 text-white group-hover:text-[#239244] group-hover:translate-x-2 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      );

    default:
      return null;
  }
}

export default usePageContent;

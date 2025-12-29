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
      // Fetch page metadata
      const pageResponse = await API.get(`/api/page-contents?pageName=${pageName}`);
      if (pageResponse.success && pageResponse.data.data && pageResponse.data.data.length > 0) {
        const page = pageResponse.data.data[0];
        setPageContent(page);

        // Parse content blocks if they exist
        if (page.contentBlocks) {
          try {
            const blocks = typeof page.contentBlocks === 'string' 
              ? JSON.parse(page.contentBlocks) 
              : page.contentBlocks;
            setContentBlocks(Array.isArray(blocks) ? blocks : []);
          } catch (parseError) {
            console.error('Error parsing content blocks:', parseError);
            setContentBlocks([]);
          }
        } else {
          setContentBlocks([]);
        }
      } else {
        // Page not found
        setPageContent(null);
        setContentBlocks([]);
      }
    } catch (err) {
      console.error('Error fetching page content:', err);
      setError(err.message || 'Failed to load page content');
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
  return blocks.filter(block => block.type === blockType);
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

  switch (block.type) {
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
      return (
        <div className={`py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {content.title && <h3 className="text-xl font-semibold mb-3">{content.title}</h3>}
          <ul className="space-y-2">
            {Array.isArray(content.items) && content.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span style={{ color: color1 }}>✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );

    case 'button':
      return (
        <div className="py-4">
          <a
            href={content.link || '#'}
            className="inline-block px-6 py-3 rounded-lg text-white font-semibold"
            style={{ backgroundColor: color1 }}
          >
            {content.text || 'Learn More'}
          </a>
        </div>
      );

    default:
      return null;
  }
}

export default usePageContent;

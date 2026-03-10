import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { useNavigate } from 'react-router-dom';
import API from '../../api/api.jsx';
import { ExternalLink, Calendar, Users, BookOpen } from 'lucide-react';



export default function FdpWebinar() {
  const { darkMode } = useTheme();
    const navigate = useNavigate();
  const color1 = API.color1;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const targetUrl = 'https://iiitkottayam.ac.in/#!/fdp';

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    setLoading(true);
    setError(null);
    API.get('/api/content-blocks/page/fdp-webinar')
      .then((response) => {
        const blocks = response.data.data || response.data || [];
        const parsedBlocks = blocks.map(block => ({
          ...block,
          content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
        }));
        const visibleBlocks = parsedBlocks.filter(block => block.isVisible);
        setContentBlocks(visibleBlocks);
      })
      .catch((error) => {
        console.error('Error fetching FDP webinar content:', error);
        setError('Failed to load FDP webinar content. Please try again later.');
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

  // Filter blocks by type
  const heroBlock = contentBlocks.find(block => block.blockType === 'hero');
  const paragraphBlocks = contentBlocks.filter(block => block.blockType === 'paragraph');
  const listBlocks = contentBlocks.filter(block => block.blockType === 'list');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <BookOpen className="w-4 h-4" style={{ color: color1 }} />
            {heroBlock?.content.badge || 'Professional Development'}
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {heroBlock?.content.title || 'Faculty Development Programmes'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {heroBlock?.content.description || 'Workshops, webinars, and professional development initiatives for faculty enhancement.'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Dynamic Paragraph Blocks */}
        {paragraphBlocks.map((block, index) => (
          <div key={index} className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              {block.content.title}
            </h2>
            <div 
              className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            />
            {block.content.title === 'Access FDP Details' && (
              <div className="text-center mt-6">
                <button
                  onClick={() => navigate('/fdp')}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  style={{ backgroundColor: color1 }}
                >
                  <span>View FDP Details</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Dynamic List Blocks */}
        {listBlocks.map((block, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              {block.content.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {block.content.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border-2`}
                  style={{ borderColor: `${color1}33` }}
                >
                  <div className="text-center">
                    <div 
                      className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${color1}20` }}
                    >
                      <BookOpen className="w-8 h-8" style={{ color: color1 }} />
                    </div>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

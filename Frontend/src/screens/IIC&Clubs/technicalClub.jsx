import { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { Code2, Users, Mail, Trophy, Lightbulb, Camera, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api.jsx';
import { renderContentBlock } from '../../hooks/usePageContent.jsx';
import cleanHtmlFormatting from '../../utils/cleanHtmlFormatting';

const MemberCard = ({ name, email, isCoordinator = false }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        darkMode
          ? `bg-gray-800 border-gray-700 hover:border-${API.color1} hover:shadow-lg`
          : `bg-white border-gray-200 hover:border-${API.color1} hover:shadow-lg`
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = API.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          {email && (
            <p className={`text-sm flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail size={16} />
              {email}
            </p>
          )}
        </div>
        {isCoordinator && (
          <span
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: API.color1 }}
          >
            FIC
          </span>
        )}
      </div>
    </div>
  );
};

export default function TechnicalClub() {
  const { darkMode } = useTheme();
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    setLoading(true);
    setError(null);
    API.get('/api/content-blocks/page/technical-club')
      .then((response) => {
        const blocks = response.data.data || response.data || [];
        const parsedBlocks = blocks.map(block => ({
          ...block,
          content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
        }));
        const visibleBlocks = parsedBlocks.filter(block => block.isVisible);
        setContentBlocks(visibleBlocks);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching content:', error);
        setError('Failed to load content. Please try again later.');
        setLoading(false);
      });
  };

  const handleRetry = () => {
    fetchContent();
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ color: API.color1 }} />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading club information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Oops! Something went wrong</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: API.color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const heroBlock = contentBlocks.find(b => b.blockType === 'hero');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Code2 className="w-4 h-4" style={{ color: API.color1 }} />
            Technical Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {heroBlock?.content?.title || 'Beta Labs'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {heroBlock?.content?.description || 'Inspiring innovation through technical excellence and collaborative learning'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">
          {contentBlocks
            .filter((block) => block.blockType !== 'hero')
            .map((block, index) => {
              const blockKey = block.blockId || block.id || index;

              if (block.blockType === 'paragraph' || block.blockId === 'tech-about') {
                return (
                  <div key={blockKey} className={`p-8 rounded-lg border-2 transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                    style={{
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = API.color1;
                      e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Lightbulb size={28} style={{ color: API.color1 }} />
                      {block.content?.title || 'About Technical Club'}
                    </h2>
                    <div 
                      className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}
                      dangerouslySetInnerHTML={{ __html: cleanHtmlFormatting(block.content?.text || '') }}
                    />
                  </div>
                );
              }

              if (block.blockId === 'tech-coordinators') {
                return (
                  <div key={blockKey}>
                    <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Users size={28} style={{ color: API.color1 }} />
                      {block.content?.title || 'Faculty Coordinators'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {block.content?.items?.map((item, idx) => {
                        const parts = item.split(' - ');
                        return (
                          <MemberCard 
                            key={idx}
                            name={parts[0]} 
                            isCoordinator={item.includes('FIC')}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (block.blockId === 'tech-members') {
                return (
                  <div key={blockKey}>
                    <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Code2 size={28} style={{ color: API.color1 }} />
                      {block.content?.title || 'Student Mentors'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {block.content?.items?.map((item, idx) => {
                        const parts = item.split(' - ');
                        return (
                          <MemberCard 
                            key={idx}
                            name={parts[0]} 
                            email={parts[1]}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              }

              if (block.blockId === 'tech-achievements') {
                return (
                  <div key={blockKey}>
                    <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Trophy size={28} style={{ color: API.color1 }} />
                      {block.content?.title || 'Achievements'}
                    </h2>
                    <div className="space-y-3">
                      {block.content?.items?.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-5 rounded-lg border-2 transition-all duration-300 ${
                            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                          }`}
                          style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = API.color1;
                            e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <Trophy size={20} style={{ color: API.color1, flexShrink: 0 }} />
                            <p className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {item}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              return (
                <div key={blockKey}>
                  {renderContentBlock(block, { darkMode, color1: API.color1, color2: API.color2 })}
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}


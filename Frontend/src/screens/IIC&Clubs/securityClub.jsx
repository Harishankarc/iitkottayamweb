import { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { Shield, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api.jsx';
import { renderContentBlock } from '../../hooks/usePageContent.jsx';

export default function SecurityClub() {
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
    API.get('/api/content-blocks/page/cyber-security-club')
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
            <Shield className="w-4 h-4" style={{ color: API.color1 }} />
            Cyber Security Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {heroBlock?.content?.title || 'Cyber Security Club'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {heroBlock?.content?.description || 'Securing the digital world. One byte at a time'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">
          {contentBlocks
            .filter((block) => block.blockType !== 'hero')
            .map((block, index) => (
              <div key={block.blockId || block.id || index}>
                {renderContentBlock(block, { darkMode, color1: API.color1, color2: API.color2 })}
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

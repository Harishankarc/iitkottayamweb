import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Palette, Users, Music, Star, Calendar, Award, Mail, Camera, ExternalLink } from 'lucide-react';



// Faculty/Member Card Component
const MemberCard = ({ member, color1, darkMode, type = 'faculty' }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <div className="text-center">
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <Users className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {member.name}
        </h3>
        {member.role && (
          <p className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {member.role}
          </p>
        )}
        {member.batch && (
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {member.batch}
          </p>
        )}
      </div>
    </div>
  );
};

// Activity Card Component
const ActivityCard = ({ activity, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <div className="text-center">
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <activity.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {activity.title}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {activity.description}
        </p>
      </div>
    </div>
  );
};

// Event Showcase Component
const EventShowcase = ({ event, color1, darkMode }) => {
  return (
    <div className={`p-6 rounded-xl transition-all duration-300 hover:shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2`}
         style={{ borderColor: `${color1}33` }}>
      <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {event.name}
      </h3>
      
      {/* Image Placeholder */}
      <div
        className={`aspect-video rounded-lg border-2 border-dashed flex items-center justify-center mb-4 ${
          darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'
        }`}
        style={{ borderColor: `${color1}40` }}
      >
        <div className="text-center">
          <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" style={{ color: color1 }} />
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {event.name} Images
          </p>
        </div>
      </div>
      
      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {event.description}
      </p>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ color1, darkMode }) => {
  const imageSlots = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {imageSlots.map((slot) => (
        <div
          key={slot}
          className={`aspect-video rounded-xl border-2 border-dashed flex items-center justify-center transition-all duration-300 hover:shadow-lg ${
            darkMode ? 'bg-gray-800 border-gray-600 hover:border-gray-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'
          }`}
          style={{
            borderColor: `${color1}40`
          }}
        >
          <div className="text-center">
            <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" style={{ color: color1 }} />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Cultural Event {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ClubCarnival() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = () => {
    setLoading(true);
    setError(null);
    API.get('/api/content-blocks/page/cultural-club')
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
        console.error('Error fetching cultural club content:', error);
        setError('Failed to load cultural club content. Please try again later.');
        setContentBlocks([]);
      })
      .finally(() => setLoading(false));
  };

  const handleRetry = () => {
    fetchContent();
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
            onClick={handleRetry}
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
  const imageBlocks = contentBlocks.filter(block => block.blockType === 'image');

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Palette className="w-4 h-4" style={{ color: color1 }} />
            {heroBlock?.content.badge || 'Arts & Culture'}
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {heroBlock?.content.title || 'Cultural Club - Wildbeats'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {heroBlock?.content.description || 'Expressing creativity through art, music, dance, drama, and cultural celebrations.'}
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
              className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              dangerouslySetInnerHTML={{ __html: block.content.text }}
            />
          </div>
        ))}

        {/* Dynamic List Blocks */}
        {listBlocks.map((block, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              {block.content.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      <Users className="w-8 h-8" style={{ color: color1 }} />
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

        {/* Image Gallery */}
        {imageBlocks.length > 0 && (
          <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
               style={{ borderColor: `${color1}20` }} 
               onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
               onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Cultural Events Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageBlocks.map((block, index) => (
                <div
                  key={index}
                  className={`aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <img
                    src={API.getImageUrl(block.content.url || block.content.src)}
                    alt={block.content.alt || `Cultural event ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center border-2 border-dashed" style="border-color: ${color1}40; background-color: ${darkMode ? '#1F2937' : '#F9FAFB'}">
                          <div class="text-center">
                            <svg class="w-8 h-8 mx-auto mb-2 opacity-50" style="color: ${color1}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                            <p class="text-sm" style="color: ${darkMode ? '#9CA3AF' : '#6B7280'}">Cultural Event ${index + 1}</p>
                          </div>
                        </div>
                      `;
                    }}
                  />
                  {block.content.caption && (
                    <div className="p-2 text-center">
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {block.content.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

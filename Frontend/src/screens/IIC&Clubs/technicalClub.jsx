import { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { Code2, Users, Mail, Trophy, Lightbulb, Camera, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api.jsx';

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

const ImageGallery = ({ images = [], darkMode }) => {
  if (!images || images.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
            }`}
            style={{
              borderColor: darkMode ? '#374151' : '#d1d5db',
            }}
          >
            <Camera className={darkMode ? 'text-gray-600' : 'text-gray-400'} size={32} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => {
        const imageUrl = image.url || image;
        const fullUrl = API.getImageUrl(imageUrl);
        
        return (
          <div
            key={index}
            className={`aspect-square rounded-lg border-2 overflow-hidden transition-all duration-300 flex items-center justify-center ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
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
            <img 
              src={fullUrl} 
              alt={image.alt || image.caption || `Gallery image ${index + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                console.error('Image load error:', fullUrl);
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center"><svg class="w-8 h-8 ${darkMode ? 'text-gray-600' : 'text-gray-400'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>`;
              }}
            />
            {image.caption && (
              <div className={`absolute bottom-0 left-0 right-0 p-2 text-xs ${darkMode ? 'bg-gray-900/80 text-gray-300' : 'bg-white/80 text-gray-700'}`}>
                {image.caption}
              </div>
            )}
          </div>
        );
      })}
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
        const visibleBlocks = blocks.filter(block => block.isVisible);
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
  const aboutBlock = contentBlocks.find(b => b.blockType === 'paragraph');
  const coordinatorsBlock = contentBlocks.find(b => b.blockId === 'tech-coordinators');
  const membersBlock = contentBlocks.find(b => b.blockId === 'tech-members');
  const achievementsBlock = contentBlocks.find(b => b.blockId === 'tech-achievements');
  const galleryBlocks = contentBlocks.filter(b => b.blockType === 'gallery' || b.blockType === 'image');
  
  // Extract images from gallery blocks
  const galleryImages = galleryBlocks.flatMap(block => {
    const images = [];
    
    if (block.blockType === 'gallery' && block.content?.images) {
      images.push(...block.content.images);
    } else if (block.blockType === 'image') {
      // Handle images array if present
      if (block.content?.images) {
        images.push(...block.content.images);
      }
      // Also add single url if present (admin-added image)
      if (block.content?.url) {
        images.push({
          url: block.content.url,
          alt: block.content.alt || 'Gallery image',
          caption: block.content.caption || ''
        });
      }
    }
    
    return images;
  });
  
  console.log('Gallery Images:', galleryImages.length, galleryImages);

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

          {/* Introduction */}
          {aboutBlock && (
            <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
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
                {aboutBlock.content?.title || 'About Technical Club'}
              </h2>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} style={{ whiteSpace: 'pre-wrap' }}>
                {aboutBlock.content?.text || ''}
              </p>
            </div>
          )}

          {/* Faculty Coordinators */}
          {coordinatorsBlock && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Users size={28} style={{ color: API.color1 }} />
                {coordinatorsBlock.content?.title || 'Faculty Coordinators'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coordinatorsBlock.content?.items?.map((item, index) => {
                  const parts = item.split(' - ');
                  return (
                    <MemberCard 
                      key={index}
                      name={parts[0]} 
                      isCoordinator={item.includes('FIC')}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Student Mentors */}
          {membersBlock && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Code2 size={28} style={{ color: API.color1 }} />
                {membersBlock.content?.title || 'Student Mentors'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {membersBlock.content?.items?.map((item, index) => {
                  const parts = item.split(' - ');
                  return (
                    <MemberCard 
                      key={index}
                      name={parts[0]} 
                      email={parts[1]}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* Achievements */}
          {achievementsBlock && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Trophy size={28} style={{ color: API.color1 }} />
                {achievementsBlock.content?.title || 'Achievements'}
              </h2>
              <div className="space-y-3">
                {achievementsBlock.content?.items?.map((item, index) => (
                  <div
                    key={index}
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
          )}

          {/* Gallery */}
          {galleryImages.length > 0 && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Camera size={28} style={{ color: API.color1 }} />
                Gallery
              </h2>
              <ImageGallery images={galleryImages} darkMode={darkMode} />
            </div>
          )}

        </div>
      </section>
    </div>
  );
}

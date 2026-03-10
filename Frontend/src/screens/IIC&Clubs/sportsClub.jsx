import { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { Trophy, Users, Mail, Target, Dumbbell, Camera, Award, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api.jsx';

const MemberCard = ({ name, email, role }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
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
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          {role && (
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {role}
            </p>
          )}
          {email && (
            <p className={`text-sm flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail size={16} />
              {email}
            </p>
          )}
        </div>
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
            style={{ borderColor: darkMode ? '#374151' : '#d1d5db' }}
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
            <img 
              src={fullUrl} 
              alt={image.alt || image.caption || `Gallery image ${index + 1}`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
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

export default function SportsClub() {
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
    API.get('/api/content-blocks/page/sports-club')
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
  const aboutBlock = contentBlocks.find(b => b.blockId === 'sports-about');
  const activitiesBlock = contentBlocks.find(b => b.blockId === 'sports-activities');
  const mentorBlock = contentBlocks.find(b => b.blockId === 'sports-mentor');
  const detailsBlock = contentBlocks.find(b => b.blockId === 'sports-details');
  const achievementsBlock = contentBlocks.find(b => b.blockId === 'sports-achievements');
  const galleryBlocks = contentBlocks.filter(b => b.blockType === 'gallery' || b.blockType === 'image');
  
  // Extract images from gallery blocks
  const galleryImages = galleryBlocks.flatMap(block => {
    const images = [];
    
    if (block.blockType === 'gallery' && block.content?.images) {
      images.push(...block.content.images);
    } else if (block.blockType === 'image') {
      if (block.content?.images) {
        images.push(...block.content.images);
      }
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Trophy className="w-4 h-4" style={{ color: API.color1 }} />
            Sports Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {heroBlock?.content?.title || 'Sports Club'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {heroBlock?.content?.description || '"Sports do not build Character, they Reveal it."'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* About */}
          {aboutBlock && (
            <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
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
              <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Target size={28} style={{ color: API.color1 }} />
                {aboutBlock.content?.title || 'About Sports Club'}
              </h2>
              <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} style={{ whiteSpace: 'pre-wrap' }}>
                {aboutBlock.content?.text || ''}
              </p>
            </div>
          )}

          {/* Activities */}
          {activitiesBlock && (
            <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
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
              <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Dumbbell size={24} style={{ color: API.color1 }} />
                {activitiesBlock.content?.title || 'Sports Activities'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {activitiesBlock.content?.items?.map((activity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: API.color1 }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Details */}
          {detailsBlock && (
            <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
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
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {detailsBlock.content?.title || 'About Sports Events'}
              </h2>
              <div className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`} style={{ whiteSpace: 'pre-wrap' }}>
                {detailsBlock.content?.text || ''}
              </div>
            </div>
          )}

          {/* Mentor */}
          {mentorBlock && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Users size={28} style={{ color: API.color1 }} />
                {mentorBlock.content?.title || 'Mentor'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                {mentorBlock.content?.items?.map((item, index) => {
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

          {/* Achievements in Sports */}
          {achievementsBlock && (
            <div>
              <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Award size={28} style={{ color: API.color1 }} />
                {achievementsBlock.content?.title || 'Achievements in Sports'}
              </h2>
              <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <thead>
                    <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                        style={{ backgroundColor: `${API.color1}15` }}>
                      {achievementsBlock.content?.headers?.map((header, index) => (
                        <th key={index} className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {achievementsBlock.content?.rows?.map((row, index) => (
                      <tr 
                        key={index}
                        className={`${index !== achievementsBlock.content.rows.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.slNo}
                        </td>
                        <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.achievement}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.names}
                        </td>
                        <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {row.event || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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


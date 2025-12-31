import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Camera, Calendar, Users, Award, Palette, Activity, ExternalLink } from 'lucide-react';

// Event Gallery Card Component
const EventGalleryCard = ({ event, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
      style={{ borderColor: `${color1}20` }} 
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.borderColor = color1;
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.borderColor = `${color1}20`;
      }}
    >
      {/* Event Header */}
      <div 
        className="p-4 rounded-t-2xl text-white"
        style={{ backgroundColor: color1 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">{event.title}</h3>
          <event.icon className="w-6 h-6" />
        </div>
        <p className="text-sm opacity-90 mt-1">{event.date}</p>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {event.description}
        </p>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {Array.from({ length: event.imageCount }, (_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300 hover:shadow-md ${
                darkMode ? 'bg-gray-700 border-gray-600 hover:border-gray-500' : 'bg-gray-50 border-gray-300 hover:border-gray-400'
              }`}
              style={{
                borderColor: isHovered ? `${color1}60` : (darkMode ? '#4B5563' : '#D1D5DB')
              }}
            >
              <div className="text-center">
                <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" style={{ color: color1 }} />
                <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Image {i + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View Gallery Button */}
        <div className="text-center">
          <button 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg  text-sm"
            style={{ backgroundColor: color1 }}
          >
            <span >View Gallery</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Image Gallery Component for Featured Section
const FeaturedGallery = ({ color1, darkMode }) => {
  const imageSlots = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
              Featured Image {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Gallery() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [eventGalleries, setEventGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/gallery`);
        const data = await response.json();
        
        if (data.success) {
          const formattedGallery = data.data
            .filter(item => item.isPublished)
            .map(item => ({
              id: item.id,
              title: item.title,
              date: item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
              description: item.description || '',
              imageCount: item.images ? JSON.parse(item.images).length : 6,
              icon: getIconForCategory(item.category)
            }));
          setEventGalleries(formattedGallery);
        }
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const getIconForCategory = (category) => {
    const iconMap = {
      'conference': Award,
      'sports': Activity,
      'cultural': Palette,
      'festival': Users,
      'celebration': Calendar,
      'default': Camera
    };
    return iconMap[category?.toLowerCase()] || iconMap.default;
  };

  // Gallery features
  const galleryFeatures = [
    {
      icon: Camera,
      title: 'Event Photography',
      description: 'Comprehensive photo documentation of all institute events'
    },
    {
      icon: Calendar,
      title: 'Timeline Archives',
      description: 'Chronologically organized galleries from past years'
    },
    {
      icon: Users,
      title: 'Community Moments',
      description: 'Capturing memorable moments of our campus community'
    },
    {
      icon: Award,
      title: 'Achievement Records',
      description: 'Visual records of competitions and achievements'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Camera className="w-4 h-4" style={{ color: color1 }} />
            Visual Archive
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Photo Gallery
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore memorable moments and events from our vibrant campus life through our comprehensive photo archives.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Gallery */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Our Gallery
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Our photo gallery serves as a visual chronicle of IIIT Kottayam's journey, capturing the essence of academic excellence, cultural diversity, and community spirit. From technical conferences to cultural festivals, every significant moment is preserved for posterity.
          </p>

          {/* Gallery Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className={`flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${color1}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: color1 }} />
                  </div>
                  <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {feature.title}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event Galleries */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Event Galleries
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventGalleries.map((event) => (
              <EventGalleryCard key={event.id} event={event} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Featured Images */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Featured Images
          </h2>
          <FeaturedGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
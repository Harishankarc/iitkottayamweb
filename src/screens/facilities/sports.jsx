import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Trophy, Users, Target, MapPin, Clock, Award, Camera, Activity } from 'lucide-react';

// Sports Facility Card Component
const SportsFacilityCard = ({ facility, color1, darkMode }) => {
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
        {/* Facility Icon */}
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <facility.icon className="w-8 h-8" style={{ color: color1 }} />
        </div>

        {/* Facility Details */}
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {facility.name}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {facility.description}
        </p>
      </div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ color1, darkMode }) => {
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
              Sports Image {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Sports() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  // Sports facilities data
  const sportsFacilities = [
    {
      id: 1,
      name: 'Cricket Ground',
      description: 'Professional cricket field with proper pitch',
      icon: Target
    },
    {
      id: 2,
      name: 'Football Field',
      description: 'Standard size football ground',
      icon: Target
    },
    {
      id: 3,
      name: 'Basketball Court',
      description: 'Indoor basketball court with proper flooring',
      icon: Target
    },
    {
      id: 4,
      name: 'Volleyball Court',
      description: 'Outdoor volleyball court',
      icon: Target
    },
    {
      id: 5,
      name: 'Badminton Court',
      description: 'Indoor badminton courts',
      icon: Target
    },
    {
      id: 6,
      name: 'Table Tennis',
      description: 'Multiple table tennis tables',
      icon: Target
    },
    {
      id: 7,
      name: 'Athletics Track',
      description: 'Running track and field events area',
      icon: Activity
    },
    {
      id: 8,
      name: 'Chess & Carrom',
      description: 'Indoor games facility',
      icon: Target
    }
  ];

  // Sports features
  const sportsFeatures = [
    {
      icon: Trophy,
      title: 'Competitive Sports',
      description: 'Regular tournaments and inter-college competitions'
    },
    {
      icon: Users,
      title: 'Team Building',
      description: 'Sports activities for team collaboration and fitness'
    },
    {
      icon: Clock,
      title: 'Extended Hours',
      description: 'Available during flexible hours for students'
    },
    {
      icon: Award,
      title: 'Achievement Recognition',
      description: 'Recognition and awards for sports excellence'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Trophy className="w-4 h-4" style={{ color: color1 }} />
            Athletics & Recreation
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Sports Facilities
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Comprehensive sports infrastructure promoting physical fitness, team spirit, and competitive excellence.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Sports Facilities */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Our Sports Facilities
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            IIIT Kottayam provides comprehensive sports infrastructure to promote physical fitness, team spirit, and competitive excellence among students. Our facilities include both indoor and outdoor sports venues, supporting a wide range of athletic activities and recreational pursuits.
          </p>

          {/* Sports Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sportsFeatures.map((feature, index) => {
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

        {/* Available Sports Facilities */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Available Sports Facilities
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sportsFacilities.map((facility) => (
              <SportsFacilityCard key={facility.id} facility={facility} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Sports Activities & Programs */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <div className="text-center">
            <div 
              className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Users className="w-8 h-8" style={{ color: color1 }} />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: color1 }}>
              Sports Activities & Programs
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our sports program encourages participation in various competitive and recreational activities. Regular tournaments, inter-collegiate competitions, and fitness programs help students develop athletic skills, maintain physical health, and build team spirit.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Outdoor Sports
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Cricket, Football, Volleyball, Athletics, and other outdoor recreational activities
                </p>
              </div>
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Indoor Sports
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Basketball, Badminton, Table Tennis, Chess, Carrom, and other indoor games
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Sports Facilities Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
 import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Shield, Users, Eye, Clock, Phone, MapPin, Camera } from 'lucide-react';

// Security Personnel Card Component
const SecurityCard = ({ person, color1, darkMode }) => {
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
      <div className="flex items-start gap-4">
        {/* Profile Image Placeholder */}
        <div 
          className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            border: `3px solid ${color1}`,
            backgroundColor: `${color1}10`
          }}
        >
          <Shield className="w-8 h-8" style={{ color: color1 }} />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {person.name}
          </h3>
          <p 
            className="text-sm font-semibold mb-2"
            style={{ color: color1 }}
          >
            {person.role}
          </p>
          
          {person.designation && (
            <p className={`text-xs mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {person.designation}
            </p>
          )}

          {/* Contact Information */}
          <div className="space-y-1">
            {person.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" style={{ color: color1 }} />
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {person.phone}
                </span>
              </div>
            )}
            {person.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" style={{ color: color1 }} />
                <span className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {person.location}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
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
              Security Image {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Security() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  // Security personnel data
  const securityPersonnel = [
    {
      id: 1,
      name: 'Security Officer',
      role: 'Chief Security Officer',
      designation: 'Army Welfare Placement Organization (AWPO)',
      phone: '+91 0482-2202xxx',
      location: 'Main Security Office'
    },
    {
      id: 2,
      name: 'Security Guard',
      role: 'Campus Security',
      designation: 'Retired Army Personnel',
      phone: '+91 0482-2202xxx',
      location: 'Main Gate'
    },
    {
      id: 3,
      name: 'Security Guard',
      role: 'Hostel Security',
      designation: 'Retired Army Personnel',
      phone: '+91 0482-2202xxx',
      location: 'Hostel Block'
    }
  ];

  // Security features
  const securityFeatures = [
    {
      icon: Shield,
      title: '24/7 Security',
      description: 'Round-the-clock security coverage across campus'
    },
    {
      icon: Eye,
      title: 'CCTV Surveillance',
      description: 'Comprehensive camera monitoring system'
    },
    {
      icon: Users,
      title: 'Trained Personnel',
      description: 'Experienced retired army personnel with 15+ years experience'
    },
    {
      icon: Clock,
      title: 'Emergency Response',
      description: 'Quick response team for any security concerns'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Shield className="w-4 h-4" style={{ color: color1 }} />
            Campus Safety
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Security
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Ensuring a safe and secure environment for all students and staff.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Security */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Campus Security
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            The retired army personnel (with minimum 15 years of experience in army) through Army Welfare Placement Organization (AWPO) are deployed for taking care of security of entire IIIT Kottayam, including external hostels. They have served many remote parts of the country and can speak many languages such as Malayalam, Hindi, Telugu, Kannada, Bengali etc. Thus apart from security and vigilance they take care of students from different states of India with variety of linguistic background.
          </p>

          {/* Security Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {securityFeatures.map((feature, index) => {
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

        {/* Security Personnel */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Security Personnel
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {securityPersonnel.map((person) => (
              <SecurityCard key={person.id} person={person} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Security Facilities Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
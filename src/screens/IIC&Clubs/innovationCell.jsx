import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Lightbulb, Users, Target, Rocket, TrendingUp, Award, Mail, Phone, ExternalLink, CheckCircle, Camera } from 'lucide-react';

// Team Member Card Component
const TeamMemberCard = ({ member, color1, darkMode }) => {
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
        {/* Profile Icon */}
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <Users className="w-8 h-8" style={{ color: color1 }} />
        </div>

        {/* Details */}
        <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {member.name}
        </h3>
        <p className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {member.role}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 justify-center">
            <Mail className="w-4 h-4" style={{ color: color1 }} />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {member.email}
            </span>
          </div>
          
          <div className="flex items-center gap-2 justify-center">
            <Phone className="w-4 h-4" style={{ color: color1 }} />
            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {member.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Focus Item Card Component
const FocusCard = ({ item, index, color1, darkMode }) => {
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
          <Target className="w-8 h-8" style={{ color: color1 }} />
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {item}
        </p>
      </div>
    </div>
  );
};

// Objective Card Component
const ObjectiveCard = ({ item, index, color1, darkMode }) => {
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
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: `${color1}20`
          }}
        >
          <CheckCircle className="w-6 h-6" style={{ color: color1 }} />
        </div>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {item}
        </p>
      </div>
    </div>
  );
};

// Image Gallery Component
const ImageGallery = ({ color1, darkMode }) => {
  const imageSlots = Array.from({ length: 6 }, (_, i) => i + 1);

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
              Innovation Activity {slot}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function InnovationCell() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;

  // Team Members Data
  const teamMembers = [
    {
      id: 1,
      name: 'Dr. Ragesh G K',
      role: 'Faculty In-Charge Institute Innovation Cell',
      email: 'ragesh@iiitkottayam.ac.in',
      phone: '+91 4822202175'
    },
    {
      id: 2,
      name: 'Mr. Anuroop K B',
      role: 'Chief Innovation Officer',
      email: 'cio@iiitkottayam.ac.in',
      phone: '+91 4822202211'
    }
  ];

  // Major Focus Points
  const majorFocus = [
    'To create a vibrant local innovation ecosystem.',
    'Start-up supporting Mechanism in HEIs.',
    'Prepare Institute for Atal Ranking of Institutions on Innovation Achievements Framework.',
    'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas.',
    'Develop better Cognitive Ability for Technology Students.'
  ];

  // Objectives
  const objectives = [
    'To create a vibrant local innovation ecosystem',
    'Start-up/ entrepreneurship supporting Mechanism in HEIs',
    'Prepare institute for Atal Ranking of Institutions on Innovation Achievements Framework (ARIIA)',
    'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas',
    'Develop better Cognitive Ability amongst Technology Students'
  ];

  // Innovation features
  const innovationFeatures = [
    {
      icon: Lightbulb,
      title: 'Innovation Culture',
      description: 'Foster creativity and innovative thinking among students'
    },
    {
      icon: Rocket,
      title: 'Startup Support',
      description: 'Entrepreneurship ecosystem for emerging startups'
    },
    {
      icon: TrendingUp,
      title: 'ARIIA Framework',
      description: 'Excellence in innovation achievements ranking'
    },
    {
      icon: Award,
      title: 'Pre-incubation',
      description: 'Scouting and nurturing innovative ideas'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Lightbulb className="w-4 h-4" style={{ color: color1 }} />
            Innovation & Entrepreneurship
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Institution Innovation Council
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Fostering a culture of innovation and entrepreneurship among students and faculty.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About IIC Section */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Institution Innovation Council
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Ministry of Human Resource Development (MHRD), Govt. of India has established 'MHRD's Innovation Cell (MIC)' to systematically foster the culture of Innovation amongst all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are informative years.
          </p>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            MIC has envisioned encouraging the creation of 'Institution's Innovation Council (IICs)' across selected HEIs. A network of these IICs will be established to promote innovation in the Institution through multitudinous modes leading to an innovation promotion eco-system in the campuses.
          </p>

          {/* Innovation Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {innovationFeatures.map((feature, index) => {
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

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Major Focus Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Major Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorFocus.map((item, index) => (
              <FocusCard key={index} item={item} index={index} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Objectives Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Our Objectives
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {objectives.map((item, index) => (
              <ObjectiveCard key={index} item={item} index={index} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Image Gallery */}
        <div className={`p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`}
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Innovation Activities Gallery
          </h2>
          <ImageGallery color1={color1} darkMode={darkMode} />
        </div>
      </div>
    </div>
  );
}
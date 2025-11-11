import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Lightbulb, Users, Target, Rocket, TrendingUp, Award, Mail, Phone, ExternalLink, CheckCircle, Sparkles } from 'lucide-react';

// Team Member Card Component
const TeamMemberCard = ({ member, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-6 rounded-2xl transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-xl'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)
      }}
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <div 
          className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden shadow-lg transition-transform duration-300"
          style={{
            border: `4px solid ${color1}`,
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => e.currentTarget.src = `https://placehold.co/128x128/e8f5f0/239244?text=${member.name.charAt(0)}`}
          />
        </div>

        {/* Details */}
        <div className="flex-1 text-center md:text-left">
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ color: color1 }}
          >
            {member.name}
          </h3>
          <p className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {member.role}
          </p>
          
          <div className={`space-y-1 text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>{member.institute}</p>
            <p>{member.address}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Mail className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
              <a 
                href={`mailto:${member.email}`}
                className={`text-sm hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {member.email}
              </a>
            </div>
            
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Phone className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
              <a 
                href={`tel:${member.phone}`}
                className={`text-sm hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                Hello at: {member.phone}
              </a>
            </div>
            
            {member.link && (
              <a 
                href={member.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold mt-2 hover:shadow-lg transition-all duration-300"
                style={{ backgroundColor: color1 }}
              >
                Visit
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Fancy Focus Card Component
const FocusCard = ({ item, index, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isHovered ? 'shadow-2xl scale-105' : 'shadow-lg'
      } border-2`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: darkMode 
          ? 'linear-gradient(145deg, #1f2937 0%, #111827 100%)' 
          : 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
        borderColor: isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)
      }}
    >
      {/* Animated Background */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color1}20, transparent 70%)`
        }}
      />

      {/* Decorative Corner */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full transition-all duration-500"
        style={{
          background: `linear-gradient(135deg, ${color1}30, transparent)`,
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          opacity: isHovered ? 0.8 : 0.5
        }}
      />



      {/* Content */}
      <div className="relative p-6 pt-20">
        <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
          {item}
        </p>
      </div>

    </div>
  );
};

// Fancy Objective Card Component
const ObjectiveCard = ({ item, index, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isHovered ? 'shadow-2xl translate-y-[-8px]' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: darkMode 
          ? 'linear-gradient(145deg, #1f2937 0%, #111827 100%)' 
          : 'linear-gradient(145deg, #ffffff 0%, #f9fafb 100%)',
        border: `2px solid ${isHovered ? color1 : 'transparent'}`
      }}
    >
      {/* Animated Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${color1}10, transparent)`
        }}
      />

      {/* Side Accent Bar */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-1.5 transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, ${color1}, ${color1}80)`,
          width: isHovered ? '6px' : '4px'
        }}
      />

      {/* Content */}
      <div className="relative p-6 pl-8 flex items-start gap-4">
        {/* Icon */}
        <div 
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${color1}, ${color1}dd)`,
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)'
          }}
        >
          <CheckCircle className="w-7 h-7 text-white" />
        </div>

        {/* Text */}
        <div className="flex-1">
          <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
            {item}
          </p>
        </div>

        {/* Sparkle Icon */}
        <Sparkles 
          className={`w-5 h-5 flex-shrink-0 transition-all duration-500 ${
            isHovered ? 'opacity-100 rotate-180' : 'opacity-0'
          }`}
          style={{ color: color1 }}
        />
      </div>
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
      institute: 'Indian Institute of Information Technology Kottayam',
      address: 'Valavoor P.O, Pala, Kottayam - 686635, Kerala, India.',
      email: 'ragesh at iiitkottayam dot ac.in',
      phone: '00 91 04822202175',
      link: '#',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=RGK'
    },
    {
      id: 2,
      name: 'Mr. Anuroop K B',
      role: 'Chief Innovation Officer',
      institute: 'Indian Institute of Information Technology Kottayam',
      address: 'Valavoor P.O, Pala, Kottayam - 686635, Kerala, India.',
      email: 'cio at iiitkottayam dot ac.in',
      phone: '00 91 04822202211',
      link: '#',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=AKB'
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Full Width, 70% Height */}
      <div className={`relative overflow-hidden w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '70vh' }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f293780' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        
        {/* Centered Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Lightbulb className="w-4 h-4" style={{ color: color1 }} />
              Innovation & Entrepreneurship
            </div>
            <h1 className={`text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Institute Innovation Cell (IIC)
            </h1>
            <p className={`text-l md:text-2xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fostering a culture of innovation and entrepreneurship.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Team Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
            Our Team
          </h2>
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* About IIC Section */}
        <div 
          className={`max-w-5xl mx-auto mb-12 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl transition-all duration-300 border-2`}
          style={{
            borderColor: darkMode ? '#374151' : `${color1}33`
          }}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
        >
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            ABOUT IIC
          </h2>
          <div className={`space-y-4 text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <p>
              Ministry of Human Resource Development (MHRD), Govt. of India has established 'MHRD's Innovation Cell (MIC)' to systematically foster the culture of Innovation amongst all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are informative years.
            </p>
            <p>
              MIC has envisioned encouraging the creation of 'Institution's Innovation Council (IICs)' across selected HEIs. A network of these IICs will be established to promote innovation in the Institution through multitudinous modes leading to an innovation promotion eco-system in the campuses.
            </p>
          </div>
        </div>

        {/* Major Focus Section - NEW FANCY DESIGN */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <h2 className="text-4xl font-bold" style={{ color: color1 }}>
                The major focus of IIC
              </h2>
            </div>
            <div 
              className="h-1 w-32 mx-auto rounded-full"
              style={{ background: `linear-gradient(90deg, ${color1}, ${color1}80)` }}
            />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorFocus.map((item, index) => (
              <FocusCard key={index} item={item} index={index} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>

        {/* Objectives Section - NEW FANCY DESIGN */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <h2 className="text-4xl font-bold" style={{ color: color1 }}>
                Objectives of our IIC
              </h2>
            </div>
            <div 
              className="h-1 w-32 mx-auto rounded-full"
              style={{ background: `linear-gradient(90deg, ${color1}, ${color1}80)` }}
            />
          </div>
          
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
            {objectives.map((item, index) => (
              <ObjectiveCard key={index} item={item} index={index} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
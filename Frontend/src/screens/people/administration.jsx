import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Users, Mail, Phone, MapPin, Search, BookOpenText, UserCog, Headphones } from 'lucide-react';

// Sub-component for the profile card with modern, professional design
const ProfileCard = ({ person, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered 
          ? `2px solid ${color1}` 
          : `2px solid ${darkMode ? '#374151' : '#E5E7EB'}`
      }}
    >
      {/* Decorative gradient overlay on hover */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-5' : 'opacity-0'}`}
        style={{
          background: `linear-gradient(135deg, ${color1}20, transparent)`
        }}
      />
      
      {/* Card Content Container */}
      <div className="relative">
        {/* Header Section with Gradient */}
        <div 
          className="relative p-4 pb-12"
          style={{
            background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-2 right-2 w-12 h-12 rounded-full bg-white opacity-10 pointer-events-none" />
          <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white opacity-10 pointer-events-none" />
          
          <h3 className="text-lg font-bold text-white relative z-10 leading-relaxed">
            {person.name}
          </h3>
        </div>
        
        {/* Profile Image - overlapping header */}
        <div className="absolute left-1/2 transform -translate-x-1/2" style={{ top: '70px' }}>
          <div className="relative">
            {/* Animated ring on hover */}
            <div 
              className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-300 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
              }`}
              style={{
                border: `2px solid ${color1}`,
                padding: '2px'
              }}
            />
            <img
              src={person.image}
              alt={person.name}
              className={`w-24 h-24 rounded-full object-cover shadow-lg border-4 transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${darkMode ? 'border-gray-800' : 'border-white'}`}
              onError={(e) => e.currentTarget.src = `https://placehold.co/96x96/e8f5f0/239244?text=${person.name.charAt(0)}`}
            />
          </div>
        </div>
        
        {/* Card Body */}
        <div className="pt-16 px-4 pb-4">
          {/* Title and Roles */}
          <div className="text-center mb-4">
            <p 
              className={`text-base font-bold mb-1 transition-colors duration-300 ${
                darkMode ? 'text-gray-100' : 'text-gray-900'
              }`}
              style={{ color: isHovered ? color1 : undefined }}
            >
              {person.title}
            </p>
            {person.roles.map((role, index) => (
              <p 
                key={index} 
                className={`text-xs leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {role}
              </p>
            ))}
          </div>
          
          {/* Gradient Divider */}
          <div 
            className="h-0.5 mx-auto mb-4 rounded-full transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, ${color1}, ${color1}80)`,
              width: isHovered ? '64px' : '48px'
            }}
          />
          
          {/* Contact Information */}
          <div className="space-y-2.5">
            <div 
              className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 ${
                isHovered ? (darkMode ? 'bg-gray-750' : 'bg-gray-50') : ''
              }`}
            >
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: `${color1}15`
                }}
              >
                <Mail className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Email
                </p>
                <a 
                  href={`mailto:${person.email}`}
                  className={`text-xs break-all hover:underline transition-colors ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  {person.email}
                </a>
              </div>
            </div>
            
            <div 
              className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 ${
                isHovered ? (darkMode ? 'bg-gray-750' : 'bg-gray-50') : ''
              }`}
            >
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: `${color1}15`
                }}
              >
                <Phone className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phone
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {person.phone}
                </p>
              </div>
            </div>
            
            <div 
              className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors duration-200 ${
                isHovered ? (darkMode ? 'bg-gray-750' : 'bg-gray-50') : ''
              }`}
            >
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ 
                  backgroundColor: `${color1}15`
                }}
              >
                <MapPin className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Location
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {person.room}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact List Card Component for FAC-IN-CHARGE and Support
const CompactListCard = ({ person, color1, darkMode, icon: Icon }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`relative rounded-lg overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-sm'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: isHovered 
          ? `2px solid ${color1}` 
          : `2px solid ${darkMode ? '#374151' : '#E5E7EB'}`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
      }}
    >
      <div className="p-4 flex items-center gap-4">
        {/* Profile Image */}
        <div className="flex-shrink-0">
          <div className="relative">
            <div 
              className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-300 ${
                isHovered ? 'scale-110 opacity-100' : 'scale-100 opacity-0'
              }`}
              style={{
                border: `2px solid ${color1}`,
              }}
            />
            <img
              src={person.image}
              alt={person.name}
              className={`w-16 h-16 rounded-full object-cover shadow-md border-2 transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              } ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onError={(e) => e.currentTarget.src = `https://placehold.co/64x64/e8f5f0/239244?text=${person.name.charAt(0)}`}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 
            className={`text-base font-bold mb-1 transition-colors duration-300 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
            style={{ color: isHovered ? color1 : undefined }}
          >
            {person.name}
          </h4>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {person.title}
          </p>
          {person.roles.length > 0 && (
            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} line-clamp-2`}>
              {person.roles.join(' | ')}
            </p>
          )}
        </div>

        {/* Icon */}
        <div 
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300"
          style={{ 
            backgroundColor: `${color1}15`,
            transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0) scale(1)'
          }}
        >
          <Icon className="w-6 h-6" style={{ color: color1 }} />
        </div>
      </div>

      {/* Quick Contact Info */}
      <div 
        className={`px-4 pb-4 pt-2 border-t transition-all duration-300 ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}
      >
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <Mail className="w-3 h-3" style={{ color: color1 }} />
            <a 
              href={`mailto:${person.email}`}
              className={`hover:underline truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              {person.email.split('@')[0]}
            </a>
          </div>
          <div className="flex items-center gap-1.5">
            <Phone className="w-3 h-3" style={{ color: color1 }} />
            <span className={`truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {person.phone.split('|')[0].trim()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Administration() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [activeTab, setActiveTab] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');

  // Data from the screenshot
  const administrationData = [
    {
      name: 'Prof. Prasad Krishna',
      title: 'Director, NIT Calicut',
      roles: ['Director (Addl. charge), IIIT Kottayam'],
      email: 'director@iiitkottayam.ac.in',
      phone: '+91 0482-2202137 (Office) | +91 0482-2202112 (Office)',
      room: 'N/A',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=PK',
      category: 'general'
    },
    {
      name: 'Dr. M Radhakrishnan',
      title: 'Registrar, IIIT Kottayam',
      roles: ['Former Registrar, IISER-TVM', 'Former Dy. Registrar NIT Calicut'],
      email: 'registrar@iiitkottayam.ac.in',
      phone: '+91 0482-2202100',
      room: 'N/A',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=MR',
      category: 'general'
    },
    {
      name: 'Prof Ashok S',
      title: 'Adjunct Professor and Professor In-charge (Academics)',
      roles: ['Former Professor NIT Calicut'],
      email: 'pic.academics@iiitkottayam.ac.in',
      phone: '+91 0482-2202132 | +91 0482-2202175(off.)',
      room: 'Room No: AC 307',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=AS',
      category: 'general'
    },
    {
      name: 'Dr. Ebin Deni Raj',
      title: 'Associate Dean (Academic Affairs)',
      roles: [],
      email: 'ebindeniraj@iiitkottayam.ac.in',
      phone: '+91 (0) 482-2202195',
      room: 'Room No: AC 308 / AA 117',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=EDR',
      category: 'general'
    },
    {
      name: 'Dr Divya Sindhu Lekha',
      title: 'Associate Dean (Academic Affairs-PG)',
      roles: [],
      email: 'divyasindhu@iiitkottayam.ac.in',
      phone: '+91 (0) 482-2202161',
      room: 'Room No: BD 417 / AA 116',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=DSL',
      category: 'general'
    },
    {
      name: 'Dr. Bakkyaraj T',
      title: 'Associate Dean (Hostel Affairs & Student Events)',
      roles: [],
      email: 'bakkyaraj@iiitkottayam.ac.in',
      phone: '+91 (0) 482-2202160',
      room: 'Room No: AB 212 / AA 118',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=BT',
      category: 'general'
    },
    {
      name: 'Dr. J. V. Bibal Benifa',
      title: 'Associate Dean (Students Welfare & Career Development Services)',
      roles: [],
      email: 'benifa@iiitkottayam.ac.in',
      phone: '+91 (0) 482-2202163',
      room: 'Room No: BD 416 / AB 216',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=JVB',
      category: 'general'
    },
    {
      name: 'Dr. Ragesh G K',
      title: 'Associate Dean (Industrial Relations & Funding)',
      roles: ['Faculty In-Charge (Public Relations & Intellectual Property Rights, Institute Innovation Cell, Gyaan Innovation Lab-IIITK, Certificate Programme)'],
      email: 'ragesh@iiitkottayam.ac.in',
      phone: '+91 (0) 482-2202179',
      room: 'Room No: CAB 103 B',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=RGK',
      category: 'fac-in-charge'
    },
  ];

  // Sample data for Support tab (you can customize this)
  const supportData = [
    {
      name: 'IT Support Team',
      title: 'Technical Support Officer',
      roles: ['Network Administration', 'System Maintenance'],
      email: 'itsupport@iiitkottayam.ac.in',
      phone: '+91 0482-2202190',
      room: 'IT Center',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=IT',
      category: 'support'
    },
    {
      name: 'Library Services',
      title: 'Library In-Charge',
      roles: ['Digital Resources', 'Library Management'],
      email: 'library@iiitkottayam.ac.in',
      phone: '+91 0482-2202191',
      room: 'Central Library',
      image: 'https://placehold.co/128x128/e8f5f0/239244?text=LIB',
      category: 'support'
    },
  ];

  // Filtered results based on search term
  const filteredResults = administrationData.filter((person) => {
    const term = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(term) ||
      person.title.toLowerCase().includes(term) ||
      person.email.toLowerCase().includes(term) ||
      person.roles.some(role => role.toLowerCase().includes(term))
    );
  });

  // Filter data by category
  const facInChargeData = administrationData.filter(person => person.category === 'fac-in-charge');

  const tabs = [
    { name: 'General Administration', key: 'General' },
    { name: 'Search Administrator', key: 'Search' },
    { name: 'FAC-IN-CHARGE', key: 'FacInCharge' },
    { name: 'Support', key: 'Support' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Users className="w-4 h-4" style={{ color: color1 }} />
            Administration Team
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Administration
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Meet our dedicated administrative team ensuring excellence in institutional management and student services.
          </p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Tab Navigation */}
        <div className="mb-12  top-20 z-40 w-full"> 
          <div className={`flex flex-wrap justify-center gap-2 rounded-lg p-2 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {tabs.map((tab) => (
              <button 
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-semibold rounded-md transition-all duration-300
                  ${activeTab === tab.key
                    ? `text-white shadow-md`
                    : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-200'}`
                  }
                `}
                style={{
                  color: activeTab === tab.key ? '#FFFFFF' : darkMode ? '#9CA3AF' : '#4B5563',
                  backgroundColor: activeTab === tab.key ? color1 : 'transparent',
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content for the active tab */}
        <div className="space-y-12">
          {activeTab === 'General' && (
            <div className="space-y-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {administrationData.filter(person => person.category === 'general').map((person, index) => (
                  <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'Search' && (
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="search"
                  placeholder="Search by name, title, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-lg border-2 shadow-inner transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  } focus:ring-0 focus:outline-none`}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: darkMode ? `${color1}99` : color1 }}
                />
              </div>

              {/* Search Results Grid */}
              {searchTerm && filteredResults.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredResults.map((person, index) => (
                    <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {searchTerm && filteredResults.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">No results found for "{searchTerm}"</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try searching for a different name, title, or email.
                  </p>
                </div>
              )}

              {/* Initial Prompt Message */}
              {!searchTerm && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">Search Administrators</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Type in the box above to find an administrator.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'FacInCharge' && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-l-4`} style={{ borderColor: color1 }}>
                <div className="flex items-center gap-3 mb-3">
                  <UserCog className="w-8 h-8" style={{ color: color1 }} />
                  <h2 className="text-3xl font-bold" style={{ color: color1 }}>Faculty In-Charge</h2>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Faculty members responsible for various institutional activities and programs
                </p>
              </div>

              {/* Compact List Layout */}
              <div className="grid gap-4">
                {facInChargeData.map((person, index) => (
                  <CompactListCard 
                    key={index} 
                    person={person} 
                    color1={color1} 
                    darkMode={darkMode}
                    icon={UserCog}
                  />
                ))}
              </div>

              {facInChargeData.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <UserCog className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: color1 }} />
                  <h3 className="text-2xl font-semibold">No Faculty In-Charge Listed</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Information will be updated soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Support' && (
            <div className="space-y-6">
              {/* Header Section */}
              <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} border-l-4`} style={{ borderColor: color1 }}>
                <div className="flex items-center gap-3 mb-3">
                  <Headphones className="w-8 h-8" style={{ color: color1 }} />
                  <h2 className="text-3xl font-bold" style={{ color: color1 }}>Support Services</h2>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Technical and administrative support staff for student and faculty assistance
                </p>
              </div>

              {/* Compact List Layout */}
              <div className="grid gap-4">
                {supportData.map((person, index) => (
                  <CompactListCard 
                    key={index} 
                    person={person} 
                    color1={color1} 
                    darkMode={darkMode}
                    icon={Headphones}
                  />
                ))}
              </div>

              {supportData.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <Headphones className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: color1 }} />
                  <h3 className="text-2xl font-semibold">No Support Services Listed</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Information will be updated soon.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
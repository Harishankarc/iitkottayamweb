import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Users, Mail, Phone, MapPin, Search, BookOpenText, UserCog, Headphones } from 'lucide-react';



// Sub-component for the profile card - matching reference design
const ProfileCard = ({ person, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl transform -translate-y-1' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${darkMode ? '#374151' : '#E5E7EB'}`
      }}
    >
      {/* Header Section with Gradient Background */}
      <div 
        className="relative p-6 pb-16"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color1}ee)`
        }}
      >
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white opacity-10 transform translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white opacity-10 transform -translate-x-12 translate-y-12" />
        
        {/* Name on Green Background */}
        <h3 className="text-xl font-bold text-white relative z-10 mb-2">
          {person.name}
        </h3>
      </div>
      
      {/* Profile Image - Circular, centered, overlapping */}
      <div className="flex justify-center" style={{ marginTop: '-60px' }}>
        <div className="relative">
          <div 
            className={`rounded-full p-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.3)' : '0 5px 15px rgba(0,0,0,0.2)'
            }}
          >
            <img
              src={person.image}
              alt={person.name}
              className={`w-28 h-28 rounded-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => e.currentTarget.src = `https://placehold.co/112x112/22a05e/ffffff?text=${person.name.charAt(0)}`}
            />
          </div>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="px-6 pb-6 pt-4">
        {/* Title and Department */}
        <div className="text-center mb-4">
          <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {person.title}
          </h4>
          {person.roles.map((role, index) => (
            <p 
              key={index} 
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}
            >
              {role}
            </p>
          ))}
        </div>
        
        {/* Divider */}
        <div className={`h-px w-full mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        
        {/* Contact Information - Stacked */}
        <div className="space-y-3">
          <div className={`flex items-start gap-3 p-2.5 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div 
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Mail className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Email
              </p>
              <a 
                href={`mailto:${person.email}`}
                className={`text-sm break-all hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                onClick={(e) => e.stopPropagation()}
              >
                {person.email}
              </a>
            </div>
          </div>
          
          <div className={`flex items-start gap-3 p-2.5 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div 
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Phone className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <div className="flex-1">
              <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Phone
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {person.phone}
              </p>
            </div>
          </div>
          
          <div className={`flex items-start gap-3 p-2.5 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div 
              className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: `${color1}20` }}
            >
              <MapPin className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <div className="flex-1">
              <p className={`text-xs font-semibold mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Location
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                {person.room}
              </p>
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
  const [administrationData, setAdministrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch administration data from API
  useEffect(() => {
    const fetchAdministration = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/administration`);
        const data = await response.json();
        console.log('API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          // Transform API data to match component structure
          const transformedData = data.data
            .filter(person => person.isActive !== false)
            .map(person => ({
              name: person.name || 'Unknown',
              title: person.designation || 'Administrator',
              roles: person.department ? [person.department] : [],
              email: person.email || 'N/A',
              phone: person.phone || 'N/A',
              room: person.qualification || 'N/A',
              image: API.getImageUrl(person.photo) || `https://placehold.co/128x128/22a05e/ffffff?text=${person.name?.charAt(0) || 'A'}`,
              category: person.specialization || 'general' // Use specialization field as category
            }));
          setAdministrationData(transformedData);
        } else {
          console.error('Invalid response format:', data);
          setAdministrationData([]);
        }
      } catch (error) {
        console.error('Error fetching administration data:', error);
        setAdministrationData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministration();
  }, []);

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
  const supportData = administrationData.filter(person => person.category === 'support');

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
          {loading ? (
            <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading administration data...</p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Mail, Phone, MapPin, Search, GraduationCap, Building2 } from 'lucide-react';

// HOD Card Component - Vertical Layout Only
const HODCard = ({ hod, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colored Top Bar */}
      <div 
        className="h-2 w-full"
        style={{
          background: `linear-gradient(90deg, ${color1}, ${color1}cc)`
        }}
      />

      {/* Content Container */}
      <div className="p-8">
        {/* Profile Image with Border */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl blur-xl opacity-30 transition-opacity duration-300"
              style={{ 
                backgroundColor: color1,
                opacity: isHovered ? 0.4 : 0.2
              }}
            />
            <div 
              className="relative rounded-2xl overflow-hidden border-4 transition-all duration-300"
              style={{
                borderColor: isHovered ? color1 : (darkMode ? '#374151' : '#E5E7EB')
              }}
            >
              <img
                src={hod.image}
                alt={hod.name}
                className="w-36 h-36 object-cover"
                onError={(e) => e.currentTarget.src = `https://placehold.co/144x144/e8f5f0/239244?text=${hod.name.charAt(0)}`}
              />
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-6">
          <h3 
            className={`text-2xl font-bold mb-2 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {hod.name}
          </h3>
          <div 
            className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-3"
            style={{
              backgroundColor: `${color1}15`,
              color: color1
            }}
          >
            Head of Department
          </div>
          <p className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {hod.department}
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Contact Information - Stacked */}
        <div className="space-y-4">
          {/* Phone Numbers */}
          {hod.phones.map((phone, index) => (
            <div 
              key={index}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}
            >
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Phone className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Phone {hod.phones.length > 1 ? index + 1 : ''}
                </p>
                <a 
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className={`text-sm hover:underline ${
                    darkMode ? 'text-gray-200' : 'text-gray-800'
                  }`}
                >
                  {phone}
                </a>
              </div>
            </div>
          ))}

          {/* Email */}
          <div 
            className={`flex items-center gap-3 p-3 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <div 
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color1}15` }}
            >
              <Mail className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Email
              </p>
              <a 
                href={`mailto:${hod.email}`}
                className={`text-sm hover:underline break-all ${
                  darkMode ? 'text-gray-200' : 'text-gray-800'
                }`}
              >
                {hod.email}
              </a>
            </div>
          </div>

          {/* Room Location */}
          <div 
            className={`flex items-center gap-3 p-3 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}
          >
            <div 
              className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${color1}15` }}
            >
              <MapPin className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Office
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                {hod.room}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HeadofDepartment() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [hodData, setHodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHODs = async () => {
      try {
        const response = await API.get('/api/people/type/hod');
        // Transform API response to match component structure
        const transformedData = (response.data || []).map(person => ({
          id: person.id,
          name: person.name,
          department: person.designation || person.department,
          phones: person.phone ? [person.phone] : [],
          email: person.email || '',
          room: person.room || '',
          image: person.photo || `https://placehold.co/128x128/e8f5f0/239244?text=${person.name.charAt(0)}`
        }));
        setHodData(transformedData);
      } catch (error) {
        console.error('Error fetching HOD data:', error);
        setHodData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHODs();
  }, []);

  // Filtered results based on search term
  const filteredHODs = hodData.filter((hod) => {
    const term = searchTerm.toLowerCase();
    return (
      hod.name.toLowerCase().includes(term) ||
      hod.department.toLowerCase().includes(term) ||
      hod.email.toLowerCase().includes(term) ||
      hod.room.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <GraduationCap className="w-4 h-4" style={{ color: color1 }} />
            Leadership & Faculty
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Head of Department
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Meet the leaders driving excellence in education and research.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Search Bar Section */}
        <div className="mb-12">
          <div className={`max-w-2xl mx-auto p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: color1 }}
            >
              Search Head of Department
            </h2>
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name, department, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-4 pl-12 rounded-xl border-2 shadow-sm transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                } focus:ring-0 focus:outline-none`}
                style={{
                  borderColor: searchTerm ? color1 : undefined
                }}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300"
                style={{ color: searchTerm ? color1 : (darkMode ? '#9CA3AF' : '#6B7280') }}
              />
            </div>
          </div>
        </div>

        {/* HOD Cards Grid - Vertical Layout Only */}
        {filteredHODs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHODs.map((hod) => (
              <HODCard key={hod.id} hod={hod} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No department heads match your search for "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: color1 }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
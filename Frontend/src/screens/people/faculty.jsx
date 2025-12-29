import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Search, GraduationCap, Globe, BookOpen, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

// Faculty Card Component - Compact Sleek Design
const FacultyCard = ({ faculty, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      {/* Compact Header */}
      <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 md:p-5 lg:p-6" style={{
        background: `linear-gradient(135deg, ${color1}10, ${color1}05)`
      }}>
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div 
            className="rounded-full overflow-hidden transition-transform duration-300"
            style={{
              width: '60px',
              height: '60px',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-full h-full object-cover"
              onError={(e) => e.currentTarget.src = `https://placehold.co/60x60/e8f5f0/239244?text=${faculty.name.charAt(0)}`}
            />
          </div>
          {/* Role Badge */}
          <div 
            className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color1 }}
          >
            <BookOpen className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold mb-1 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {faculty.name}
          </h3>
          <p 
            className="text-xs sm:text-sm font-semibold mb-1 px-2 py-0.5 rounded inline-block"
            style={{
              backgroundColor: `${color1}20`,
              color: color1
            }}
          >
            {faculty.role}
          </p>
          <p className={`text-xs sm:text-sm truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {faculty.designation}
          </p>
        </div>

        {/* Arrow Icon */}
        <ChevronRight 
          className={`w-5 h-5 transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
          style={{ color: color1 }}
        />
      </div>

      {/* Content Section */}
      <div className="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 space-y-3">
        {/* Research Interests - Compact Tags */}
        {faculty.interests && faculty.interests.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {faculty.interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs sm:text-sm ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {interest}
                </span>
              ))}
              {faculty.interests.length > 4 && (
                <span className={`px-2 py-1 rounded text-xs sm:text-sm font-bold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  +{faculty.interests.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className={`h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Contact Info - Inline */}
        <div className="space-y-2 text-xs sm:text-sm">
          {faculty.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: color1 }} />
              <a 
                href={`tel:${faculty.phone.replace(/[^0-9+]/g, '')}`}
                className={`hover:underline truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {faculty.phone}
              </a>
            </div>
          )}
          {faculty.email && (
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: color1 }} />
              <a 
                href={`mailto:${faculty.email}`}
                className={`hover:underline truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {faculty.email}
              </a>
            </div>
          )}
          <div className="flex items-center justify-between gap-4">
            {faculty.room && (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
                <span className={`truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faculty.room}
                </span>
              </div>
            )}
            {faculty.website && (
              <a 
                href={faculty.website}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 hover:underline flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
              >
                <Globe className="w-3.5 h-3.5" style={{ color: color1 }} />
                Visit
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div 
        className="h-1 w-full transition-all duration-300"
        style={{
          background: isHovered ? `linear-gradient(90deg, ${color1}, ${color1}80)` : `${color1}40`
        }}
      />
    </div>
  );
};

export default function Faculty() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Faculty Data from API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/faculty');
        const data = await response.json();
        
        if (data.success) {
          const formattedFaculty = data.data
            .filter(item => item.isActive)
            .map(item => ({
              id: item.id,
              name: item.name,
              designation: item.designation,
              affiliation: item.department,
              role: item.position || 'Faculty',
              interests: item.specialization ? item.specialization.split(',').map(s => s.trim()) : [],
              education: item.qualifications || '',
              phone: item.phone || '',
              email: item.email,
              room: item.office || '',
              website: item.website || '#',
              image: item.photo || `https://placehold.co/70x70/e8f5f0/239244?text=${item.name.charAt(0)}`
            }));
          setFacultyData(formattedFaculty);
        }
      } catch (error) {
        console.error('Error fetching faculty:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaculty();
  }, []);

  const roles = ['All', ...new Set(facultyData.map(f => f.role))];

  const filteredFaculty = facultyData.filter((faculty) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      faculty.name.toLowerCase().includes(term) ||
      faculty.designation.toLowerCase().includes(term) ||
      faculty.email.toLowerCase().includes(term) ||
      faculty.interests.some(interest => interest.toLowerCase().includes(term));
    
    const matchesRole = filterRole === 'All' || faculty.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: color1 }} />
            Our Educators
          </div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Faculty
          </h1>
          <p className={`text-sm sm:text-base md:text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Dedicated educators and researchers shaping the future of technology.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-10 max-w-screen-2xl">
        {/* Combined Search and Filter Box */}
        <div className={`mb-8 sm:mb-10 md:mb-12 top-4 z-40 max-w-4xl mx-auto rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="p-4 sm:p-5 md:p-6 lg:p-8">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mb-4 sm:mb-5 md:mb-6">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 ${
                    filterRole === role 
                      ? 'shadow-md' 
                      : darkMode 
                        ? 'text-gray-400 hover:bg-gray-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  style={{
                    backgroundColor: filterRole === role ? color1 : 'transparent',
                    color: filterRole === role ? '#ffffff' : undefined
                  }}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name, designation, interests, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-3 sm:p-4 pl-10 sm:pl-12 rounded-xl border-2 shadow-sm transition-all duration-300 text-sm sm:text-base ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:ring-0 focus:outline-none`}
                style={{
                  borderColor: searchTerm ? color1 : (darkMode ? '#4B5563' : '#D1D5DB')
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = searchTerm ? color1 : (darkMode ? '#4B5563' : '#D1D5DB')}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: searchTerm ? color1 : (darkMode ? '#9CA3AF' : '#6B7280') }}
              />
            </div>
          </div>
        </div>

        {/* Faculty Cards Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300" style={{ borderTopColor: color1 }}></div>
            <p className={`mt-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading faculty data...</p>
          </div>
        ) : filteredFaculty.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-12 sm:p-14 md:p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}>
            <GraduationCap className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 md:mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">No Results Found</h3>
            <p className={`text-base sm:text-lg md:text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No faculty members match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRole('All');
              }}
              className="mt-4 sm:mt-5 md:mt-6 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-white text-sm sm:text-base font-semibold hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: color1 }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Search, GraduationCap, Globe, BookOpen, ChevronRight, Award, Briefcase, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

// Faculty Card Component - Enhanced Design with More Details
const FacultyCard = ({ faculty, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [imageHovered, setImageHovered] = React.useState(false);
  const [detailsHovered, setDetailsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl h-[600px] flex flex-col ${
        isHovered ? 'shadow-2xl -translate-y-1' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : '#E5E7EB')}`,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        willChange: 'transform, box-shadow'
      }}
    >
      {/* Image Section */}
      <div 
        className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
          imageHovered ? 'h-full' : detailsHovered ? 'h-0 opacity-0' : 'h-64'
        }`}
        style={{ willChange: 'height, opacity' }}
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        <img
          src={faculty.image}
          alt={faculty.name}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            imageHovered ? 'scale-105' : 'scale-100'
          }`}
          style={{ willChange: 'transform' }}
          onError={(e) => {
            e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=400&background=239244&color=ffffff&bold=true`;
          }}
        />
        {/* Gradient Overlay - Lighter on Image Hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 ${
            imageHovered ? 'from-black/40 via-black/10' : 'from-black/80 via-black/20'
          }`}
        />
        
        {/* Role Badge - Hidden on Image Hover */}
        <div 
          className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-white font-bold text-sm backdrop-blur-sm transition-opacity duration-500 ${
            imageHovered ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundColor: `${color1}E6` }}
        >
          {faculty.role}
        </div>

        {/* Name and Designation on Image - Hidden on Image Hover */}
        <div className={`absolute bottom-0 left-0 right-0 p-5 text-white transition-opacity duration-500 ${
          imageHovered ? 'opacity-0' : 'opacity-100'
        }`}>
          <h3 className="text-xl font-bold mb-1 line-clamp-1">
            {faculty.name}
          </h3>
          <p className="text-sm opacity-90 line-clamp-1">
            {faculty.designation}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          imageHovered ? 'h-0 opacity-0 overflow-hidden' : 'flex-1 overflow-y-auto'
        } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
        style={{ willChange: 'height, opacity' }}
        onMouseEnter={() => setDetailsHovered(true)}
        onMouseLeave={() => setDetailsHovered(false)}
      >
        <div className={`p-5 space-y-4 ${detailsHovered ? 'pt-8' : ''}`}>
        {/* Name and Designation - Show in Details Hover */}
        {detailsHovered && (
          <div className="mb-4">
            <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {faculty.name}
            </h3>
            <p 
              className="text-sm font-semibold px-3 py-1.5 rounded inline-block mb-2"
              style={{
                backgroundColor: `${color1}20`,
                color: color1
              }}
            >
              {faculty.role}
            </p>
            <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {faculty.designation}
            </p>
          </div>
        )}

        {/* Department/Affiliation - Always show */}
        {!detailsHovered && faculty.affiliation && (
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {faculty.affiliation}
            </span>
          </div>
        )}

        {/* Basic Contact - Show only email when not hovered */}
        {!detailsHovered && faculty.email && (
          <a 
            href={`mailto:${faculty.email}`}
            className={`flex items-center gap-2.5 group/email hover:translate-x-1 transition-transform`}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color1}15` }}
            >
              <Mail className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <span className={`text-sm truncate ${darkMode ? 'text-gray-300 group-hover/email:text-white' : 'text-gray-700 group-hover/email:text-gray-900'}`}>
              {faculty.email}
            </span>
          </a>
        )}

        {/* Phone - Show when not hovered */}
        {!detailsHovered && faculty.phone && (
          <a 
            href={`tel:${faculty.phone.replace(/[^0-9+]/g, '')}`}
            className={`flex items-center gap-2.5 group/phone hover:translate-x-1 transition-transform`}
          >
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${color1}15` }}
            >
              <Phone className="w-4 h-4" style={{ color: color1 }} />
            </div>
            <span className={`text-sm ${darkMode ? 'text-gray-300 group-hover/phone:text-white' : 'text-gray-700 group-hover/phone:text-gray-900'}`}>
              {faculty.phone}
            </span>
          </a>
        )}

        {/* Qualification Preview - Show when not hovered */}
        {!detailsHovered && faculty.education && (
          <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-1`}>
                {faculty.education}
              </span>
            </div>
          </div>
        )}

        {/* Research Interests Preview - Show 2-3 tags when not hovered */}
        {!detailsHovered && faculty.researchInterests && faculty.researchInterests.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {faculty.researchInterests.slice(0, 3).map((interest, index) => (
              <span
                key={index}
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {interest}
              </span>
            ))}
            {faculty.researchInterests.length > 3 && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${color1}20`, color: color1 }}
              >
                +{faculty.researchInterests.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Education/Qualifications - Show only on hover */}
        {detailsHovered && faculty.education && (
          <div className={`text-xs px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'}`}>
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-3.5 h-3.5" style={{ color: color1 }} />
              <span className="font-semibold">Qualification</span>
            </div>
            <span>{faculty.education}</span>
          </div>
        )}

        {/* Specialization - Show only on hover */}
        {detailsHovered && faculty.interests && faculty.interests.length > 0 && (
          <div>
            <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Specialization
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {faculty.interests}
            </p>
          </div>
        )}

        {/* Experience - Show only on hover */}
        {detailsHovered && faculty.experience > 0 && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {faculty.experience} years of experience
            </span>
          </div>
        )}

        {/* Research Interests from researchInterests field - Show only on hover */}
        {detailsHovered && faculty.researchInterests && faculty.researchInterests.length > 0 && (
          <div>
            <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Research Focus
            </p>
            <div className="flex flex-wrap gap-2">
              {faculty.researchInterests.map((interest, index) => (
                <span
                  key={index}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                    darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Publications Count */}
        {detailsHovered && faculty.publications && faculty.publications.length > 0 && (
          <div className={`px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" style={{ color: color1 }} />
              <span className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {faculty.publications.length} Publication{faculty.publications.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        )}

        {/* Social Links */}
        {detailsHovered && (faculty.googleScholar || faculty.linkedIn || faculty.researchGate) && (
          <div>
            <p className={`text-xs font-semibold mb-2 uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Academic Profiles
            </p>
            <div className="flex flex-wrap gap-2">
              {faculty.googleScholar && (
                <a 
                  href={faculty.googleScholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  Google Scholar
                </a>
              )}
              {faculty.linkedIn && (
                <a 
                  href={faculty.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  LinkedIn
                </a>
              )}
              {faculty.researchGate && (
                <a 
                  href={faculty.researchGate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <ExternalLink className="w-3 h-3" />
                  ResearchGate
                </a>
              )}
            </div>
          </div>
        )}

        {/* Contact Info - Show full details on hover */}
        {detailsHovered && (
        <div className="space-y-2.5">
          {faculty.email && (
            <a 
              href={`mailto:${faculty.email}`}
              className={`flex items-center gap-2.5 group/email hover:translate-x-1 transition-transform`}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Mail className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <span className={`text-sm truncate ${darkMode ? 'text-gray-300 group-hover/email:text-white' : 'text-gray-700 group-hover/email:text-gray-900'}`}>
                {faculty.email}
              </span>
            </a>
          )}
          
          {faculty.phone && (
            <a 
              href={`tel:${faculty.phone.replace(/[^0-9+]/g, '')}`}
              className={`flex items-center gap-2.5 group/phone hover:translate-x-1 transition-transform`}
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Phone className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-300 group-hover/phone:text-white' : 'text-gray-700 group-hover/phone:text-gray-900'}`}>
                {faculty.phone}
              </span>
            </a>
          )}

          {faculty.room && (
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color1}15` }}
              >
                <MapPin className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {faculty.room}
              </span>
            </div>
          )}

          {faculty.website && faculty.website !== '#' && (
            <a 
              href={faculty.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 group/web hover:translate-x-1 transition-transform"
            >
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Globe className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300 group-hover/web:text-white' : 'text-gray-700 group-hover/web:text-gray-900'}`}>
                Visit Website
              </span>
            </a>
          )}
        </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default function Faculty() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');
  const [facultyData, setFacultyData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Faculty Data from API
  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/faculty`);
        const data = await response.json();
        
        if (data.success) {
          const formattedFaculty = data.data
            .filter(item => item.isActive)
            .map(item => ({
              id: item.id,
              name: item.name,
              designation: item.designation,
              affiliation: item.department,
              role: item.designation || 'Faculty',
              interests: item.specialization ? item.specialization.split(',').map(s => s.trim()) : [],
              researchInterests: item.researchInterests || [],
              education: item.qualification || '',
              phone: item.phone || '+91-9876543210',
              email: item.email,
              room: item.department ? `${item.department} Department` : '',
              website: item.googleScholar || item.linkedIn || item.researchGate || '#',
              experience: item.experience || 0,
              publications: item.publications || [],
              googleScholar: item.googleScholar || '',
              linkedIn: item.linkedIn || '',
              researchGate: item.researchGate || '',
              image: API.getImageUrl(item.photo) || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&size=400&background=239244&color=ffffff&bold=true`
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
      <div className={`py-4 sm:py-5 md:py-6 px-4 sm:px-6 md:px-8 lg:px-10 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium mb-2 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: color1 }} />
            Our Educators
          </div>
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Faculty
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Dedicated educators and researchers shaping the future of technology.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-10 max-w-screen-2xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
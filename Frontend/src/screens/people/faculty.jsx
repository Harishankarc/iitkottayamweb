import React, { useState, useEffect } from 'react';
import { Mail, Phone, Search, GraduationCap, ExternalLink } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

const parseDetailList = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fallback to comma-separated parsing when non-JSON strings are received.
    }
    return value.split(',').map(item => item.trim()).filter(Boolean);
  }
  return [];
};



// Faculty Card Component - Expanded horizontal layout with full details
const FacultyCard = ({ faculty, color1, darkMode }) => {
  return (
    <div
      className={`group overflow-hidden rounded-xl transition-all duration-300 hover:shadow-2xl ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border flex flex-col sm:flex-row h-full hover:-translate-y-1`}
    >
      {/* Left: Image Section with details below */}
      <div className="w-full sm:w-48 flex-shrink-0 flex flex-col bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=500&background=239244&color=ffffff&bold=true`;
            }}
          />
        </div>
        {/* Role and details below image */}
        <div className="p-3 space-y-2 border-t sm:border-t-0" style={{ borderColor: `${color1}30` }}>
          <p className="text-xs font-semibold rounded-full px-2 py-1 text-center" style={{ backgroundColor: `${color1}20`, color: color1 }}>
            {faculty.role}
          </p>
          {faculty.affiliation && (
            <div className="flex items-center justify-center gap-1 text-center">
              <GraduationCap className="w-3 h-3 flex-shrink-0" style={{ color: color1 }} />
              <span className={`text-xs font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{faculty.affiliation}</span>
            </div>
          )}
          {faculty.bottomImageDetails && faculty.bottomImageDetails.length > 0 && (
            <ul className={`pt-1 space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {faculty.bottomImageDetails.map((detail, index) => (
                <li key={index} className="text-[11px] leading-snug text-center">
                  {detail}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Right: Full content section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col space-y-4 overflow-y-auto" style={{ maxHeight: '600px' }}>
        {/* Name and Designation */}
        <div>
          <h3 className={`text-xl font-bold leading-tight mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {faculty.name}
          </h3>
          {faculty.designation && (
            <p className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {faculty.designation}
            </p>
          )}
        </div>
        {/* Education */}
        {faculty.education && (
          <div className="border-t pt-3" style={{ borderColor: `${color1}20` }}>
            <p className={`text-xs font-bold uppercase mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ color: color1 }}>
              Education
            </p>
            <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {faculty.education}
            </p>
          </div>
        )}
        {faculty.rightSideDetails && faculty.rightSideDetails.length > 0 && (
          <div className="border-t pt-3" style={{ borderColor: `${color1}20` }}>
            <p className={`text-xs font-bold uppercase mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ color: color1 }}>
              Profile Highlights
            </p>
            <ul className={`space-y-1.5 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {faculty.rightSideDetails.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-1.5" style={{ color: color1 }}>•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Research Interests */}
        {faculty.interests && faculty.interests.length > 0 && (
          <div className="border-t pt-3" style={{ borderColor: `${color1}20` }}>
            <p className={`text-xs font-bold uppercase mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ color: color1 }}>
              Research Interests
            </p>
            <ul className={`space-y-1.5 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {faculty.interests.map((interest, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="flex-shrink-0 mt-1.5" style={{ color: color1 }}>•</span>
                  <span>{interest}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Contact Information */}
        <div className="border-t pt-3 mt-auto" style={{ borderColor: `${color1}20` }}>
          <p className={`text-xs font-bold uppercase mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ color: color1 }}>
            Contact
          </p>
          <div className="space-y-2">
            {faculty.phone && (
              <a href={`tel:${faculty.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group/phone">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
                <span className={`text-sm ${darkMode ? 'text-gray-400 group-hover/phone:text-gray-300' : 'text-gray-600 group-hover/phone:text-gray-900'}`}>
                  {faculty.phone}
                </span>
              </a>
            )}
            {faculty.email && (
              <a href={`mailto:${faculty.email}`} className="flex items-center gap-2.5 hover:opacity-80 transition-opacity group/email">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: color1 }} />
                <span className={`text-sm break-all ${darkMode ? 'text-gray-400 group-hover/email:text-gray-300' : 'text-gray-600 group-hover/email:text-gray-900'}`}>
                  {faculty.email}
                </span>
              </a>
            )}
            {faculty.website && faculty.website !== '#' && (
              <a
                href={faculty.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold hover:opacity-80 transition-opacity mt-2"
                style={{ color: color1 }}
              >
                Visit Profile
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
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
              bottomImageDetails: parseDetailList(item.bottomImageDetails),
              rightSideDetails: parseDetailList(item.rightSideDetails),
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
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

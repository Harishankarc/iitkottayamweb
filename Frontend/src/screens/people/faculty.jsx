import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap, ArrowRight } from 'lucide-react';
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

// Role hierarchy for sorting
const ROLE_HIERARCHY = {
  'Professor': 1,
  'Associate Professor': 2,
  'Assistant Professor': 3,
  'Lecturer': 4,
  'Faculty': 5
};

const getRoleOrder = (role) => {
  return ROLE_HIERARCHY[role] || 999;
};

// Normalize role: trim, lowercase for comparison, then find canonical form
const normalizeRoleForComparison = (role) => {
  if (!role) return 'faculty';
  return role.trim().toLowerCase().replace(/\s+/g, ' '); // Normalize spaces
};

// Get the canonical (display) role name from a raw role value
const getCanonicalRole = (role) => {
  if (!role) return 'Faculty';
  const normalized = role.trim().toLowerCase().replace(/\s+/g, ' '); // Remove extra spaces
  
  // Map common variations to canonical names
  const roleMap = {
    'professor': 'Professor',
    'associate professor': 'Associate Professor',
    'assoc. professor': 'Associate Professor',
    'assoc professor': 'Associate Professor',
    'asst. professor': 'Assistant Professor',
    'asst professor': 'Assistant Professor',
    'assistant professor': 'Assistant Professor',
    'lecturer': 'Lecturer',
    'faculty': 'Faculty'
  };
  
  const canonical = roleMap[normalized];
  console.log(`🏫 Role mapping: "${role}" → normalized: "${normalized}" → canonical: "${canonical || 'NOT FOUND'}"`);
  return canonical || role.trim();
};

const MAIN_SECTION_MAX_LINES = 7;
const MAIN_SECTION_MAX_LINE_LENGTH = 42;

const normalizeMainSection = (text) => {
  if (!text || typeof text !== 'string') return '';
  const normalized = text.replace(/\r\n/g, '\n').replace(/\\/g, '\n');
  return normalized
    .split('\n')
    .slice(0, MAIN_SECTION_MAX_LINES)
    .map((line) => line.slice(0, MAIN_SECTION_MAX_LINE_LENGTH))
    .join('\n');
};

const parseMainSection = (text) => {
  if (!text || typeof text !== 'string') return [];
  const normalized = text.replace(/\\/g, '\n');
  return normalized.split('\n').map(item => item.trim()).filter(Boolean).map((item) => {
    const boldMatch = item.match(/^\*{2}\s*(.+?)\s*\*{2}$/);
    if (boldMatch) {
      return { type: 'bold', text: boldMatch[1].trim() };
    }
    return { type: 'item', text: item };
  });
};

const slugifyFacultyName = (name, designation = '') => {
  const baseText = `${name || ''} ${designation || ''}`.trim().toLowerCase();
  return baseText
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'faculty';
};

// Faculty Card Component - Expanded horizontal layout with full details
const FacultyCard = ({ faculty, color1, darkMode }) => {
  const mainSectionText = (faculty.mainSection || '').trim();
  const mainSectionPreview = normalizeMainSection(mainSectionText);

  return (
    <div
      className={`overflow-hidden rounded-xl ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border flex flex-col sm:flex-row h-[322px]`}
    >
      {/* Left: Image Section with details below */}
      <div className="w-full sm:w-48 flex-shrink-0 flex flex-col bg-gradient-to-br from-gray-100 to-gray-200 h-full">
        {/* Image */}
        <div className="relative h-[122px] sm:h-[158px] overflow-hidden">
          <img
            src={faculty.image}
            alt={faculty.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&size=500&background=239244&color=ffffff&bold=true`;
            }}
          />
        </div>
        {/* Default contact details below image */}
        <div className="p-2 border-t sm:border-t-0 flex-1 flex flex-col overflow-hidden" style={{ borderColor: `${color1}30` }}>
          <div className="flex-1 flex flex-col justify-start overflow-hidden">
            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: color1 }}>Department</p>
              <p className="text-[11px] leading-snug break-words">{faculty.department || 'Not Available'}</p>

              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: color1 }}>Email</p>
              <p className="text-[11px] leading-snug break-all">{faculty.email || 'Not Available'}</p>

              <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wide" style={{ color: color1 }}>Phone</p>
              <p className="text-[11px] leading-snug break-words">{faculty.phone || 'Not Available'}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right: Full content section */}
      <div className="p-2 sm:p-2.5 flex-1 flex flex-col overflow-hidden h-full">
        {/* Name and Designation */}
        <div className="flex-shrink-0">
          <h3 className={`text-lg font-bold leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {faculty.name}
          </h3>
          {faculty.designation && (
            <p className={`text-xs font-semibold leading-tight ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
              {faculty.designation}
            </p>
          )}
        </div>

        <div className="border-t flex-1 overflow-hidden pt-2" style={{ borderColor: `${color1}20` }}>
          <div className="space-y-1.5">
            {faculty.mainSection ? (
              parseMainSection(mainSectionPreview).map((item, idx) => (
                item.type === 'bold' ? (
                  <p key={`bold-${idx}`} className="text-xs font-bold text-black">
                    {item.text}
                  </p>
                ) : (
                  <p key={`item-${idx}`} className={`text-xs leading-snug ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {item.text}
                  </p>
                )
              ))
            ) : (
              <p className={`text-sm leading-snug ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Details will be updated soon.
              </p>
            )}
          </div>
        </div>

        <div className="mt-2 flex-shrink-0">
          <Link
            to={`/people/faculty/${faculty.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold"
            style={{ color: color1 }}
          >
            View full details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
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
              slug: slugifyFacultyName(item.name, item.designation),
              name: item.name,
              designation: item.designation,
              role: getCanonicalRole(item.designation || 'Faculty'),
              department: item.department || '',
              email: item.email || '',
              phone: item.phone || '',
              mainSection: item.mainSection || '',
              fullDetails: parseDetailList(item.fullDetails),
              bottomImageDetails: parseDetailList(item.bottomImageDetails),
              rightSideDetails: parseDetailList(item.rightSideDetails),
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

  const roles = ['All', ...Array.from(
    new Map(
      facultyData
        .map(f => f.role || 'Faculty')
        .map(role => [normalizeRoleForComparison(role), getCanonicalRole(role)])
    ).values()
  )].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return getRoleOrder(a) - getRoleOrder(b);
  });
  
  console.log('📚 Final roles array:', roles);

  const filteredFaculty = facultyData.filter((faculty) => {
    const term = searchTerm.toLowerCase();
    const fullDetailsText = (faculty.fullDetails || []).join(' ').toLowerCase();
    const mainSectionText = (faculty.mainSection || '').toLowerCase();
    const matchesSearch = 
      faculty.name.toLowerCase().includes(term) ||
      faculty.designation.toLowerCase().includes(term) ||
      mainSectionText.includes(term) ||
      fullDetailsText.includes(term);
    
    const matchesRole = filterRole === 'All' || faculty.role === filterRole;
    
    return matchesSearch && matchesRole;
  }).sort((a, b) => {
    // Sort by role hierarchy first
    const roleComparison = getRoleOrder(a.role) - getRoleOrder(b.role);
    if (roleComparison !== 0) return roleComparison;
    
    // Then sort by name alphabetically
    return a.name.localeCompare(b.name);
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
    

      {/* Main Content */}
      <div className="w-full py-4 sm:py-6 md:py-8 px-4 sm:px-6 md:px-8 lg:px-10">
        {/* Combined Search and Filter Box */}
        <div className={`mb-8 sm:mb-10 md:mb-12 top-4 z-40 w-full rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
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
          <div className={`text-center p-12 sm:p-14 md:p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
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

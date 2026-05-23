import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Search, GraduationCap, Award, BookOpen } from 'lucide-react';



// Research Scholar Card Component - Simple & Clean
const ScholarCard = ({ scholar, color1, darkMode }) => {
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
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {scholar.name}
          </h3>
          <div 
            className="inline-block px-3 py-1.5 rounded-lg text-xs font-semibold"
            style={{
              backgroundColor: `${color1}20`,
              color: color1
            }}
          >
            {scholar.type}
          </div>
        </div>
        
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300"
          style={{ 
            backgroundColor: `${color1}15`,
            transform: isHovered ? 'rotate(10deg) scale(1.1)' : 'rotate(0deg) scale(1)'
          }}
        >
          <Award className="w-5 h-5" style={{ color: color1 }} />
        </div>
      </div>
    </div>
  );
};

export default function ResearchScholars() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [scholarsData, setScholarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerSettings, setHeaderSettings] = useState({
    badge: 'Academic Research',
    title: 'Research Scholars',
    description: 'Dedicated researchers pursuing advanced studies and innovation.'
  });

  useEffect(() => {
    const fetchScholars = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/research-scholars`);
        const data = await response.json();
        console.log('Research Scholars API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const transformedData = data.data
            .filter(scholar => scholar.isActive !== false)
            .map(scholar => ({
              id: scholar.id,
              name: scholar.name || 'Unknown',
              type: scholar.designation || scholar.specialization || '',
              year: scholar.department || '2025',
              email: scholar.email || '',
              phone: scholar.phone || '',
              image: API.getImageUrl(scholar.photo) || `https://placehold.co/100x100/22a05e/ffffff?text=${scholar.name?.charAt(0) || 'R'}`
            }));
          setScholarsData(transformedData);
        } else {
          console.error('Invalid response format:', data);
          setScholarsData([]);
        }
      } catch (error) {
        console.error('Error fetching research scholars:', error);
        setScholarsData([]);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchSettings = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API.baseURL}/api/site-settings/research_badge`),
          fetch(`${API.baseURL}/api/site-settings/research_title`),
          fetch(`${API.baseURL}/api/site-settings/research_description`)
        ]);
        
        // Check if all responses are ok
        for (let i = 0; i < responses.length; i++) {
          if (!responses[i].ok) {
            console.warn(`Settings response ${i} not OK:`, responses[i].status);
          }
        }
        
        const [badgeRes, titleRes, descRes] = await Promise.all(
          responses.map(r => r.json())
        );
        
        console.log('Badge Response:', badgeRes);
        console.log('Title Response:', titleRes);
        console.log('Desc Response:', descRes);
        
        setHeaderSettings({
          badge: badgeRes.data?.settingValue || 'Academic Research',
          title: titleRes.data?.settingValue || 'Research Scholars',
          description: descRes.data?.settingValue || 'Dedicated researchers pursuing advanced studies and innovation.'
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    
    fetchScholars();
    fetchSettings();
    
    // Poll for settings updates every 5 seconds
    const settingsInterval = setInterval(fetchSettings, 5000);
    
    // Refetch settings when window regains focus
    const handleFocus = () => fetchSettings();
    window.addEventListener('focus', handleFocus);
    
    // Cleanup
    return () => {
      clearInterval(settingsInterval);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Generate available years (2026 to 2016)
  const years = Array.from({ length: 11 }, (_, i) => String(2026 - i));
  
  // Get all unique years from scholars data (for dynamic year creation)
  const allYears = new Set([...years, ...scholarsData.map(s => s.year)]);
  const sortedYears = Array.from(allYears).sort((a, b) => parseInt(b) - parseInt(a));

  // Filtered scholars based on search term and selected year
  const filteredScholars = scholarsData.filter((scholar) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      scholar.name.toLowerCase().includes(term) ||
      scholar.type.toLowerCase().includes(term);
    
    const matchesYear = scholar.year === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <BookOpen className="w-4 h-4" style={{ color: color1 }} />
            {headerSettings.badge}
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {headerSettings.title}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {headerSettings.description}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Search and Year Filter Section */}
        <div className="mb-12 top-20 z-40">
          <div className={`max-w-6xl mx-auto rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden`}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Year Filter Dropdown */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all ${
                      darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    style={{ borderColor: color1 }}
                  >
                    {sortedYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Search Bar */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Search Scholar</label>
                  <div className="relative">
                    <input
                      type="search"
                      placeholder="Search by name or research type..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`w-full p-2 pl-10 rounded-lg border-2 transition-all duration-300 ${
                        darkMode
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                          : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                      } focus:ring-0 focus:outline-none`}
                      style={{
                        borderColor: searchTerm ? color1 : undefined
                      }}
                    />
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300"
                      style={{ color: searchTerm ? color1 : (darkMode ? '#9CA3AF' : '#6B7280') }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scholars Cards Grid */}
        {filteredScholars.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholars.map((scholar) => (
              <ScholarCard key={scholar.id} scholar={scholar} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm 
                ? `No research scholars match your search for "${searchTerm}" in ${selectedYear}`
                : `No research scholars found in ${selectedYear}`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('2025');
              }}
              className="mt-6 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: color1 }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

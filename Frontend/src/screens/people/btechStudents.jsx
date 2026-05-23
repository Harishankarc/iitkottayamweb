import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Search, GraduationCap, Users } from 'lucide-react';



// Student Card Component - Simple & Clean
const StudentCard = ({ student, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 text-center ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <h3 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {student.name}
      </h3>
    </div>
  );
};

export default function BTechStudents() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('2015');
  const [studentsData, setStudentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerSettings, setHeaderSettings] = useState({
    badge: 'Undergraduate Students',
    title: 'Students',
    description: 'Talented students pursuing excellence in technology and innovation.'
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/btech-students`);
        const data = await response.json();
        console.log('B.Tech API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const transformedData = data.data
            .filter(student => student.isActive !== false)
            .map(student => ({
              id: student.id,
              name: student.name || 'Unknown',
              year: student.department || '2015'
            }));
          setStudentsData(transformedData);
        } else {
          console.error('Invalid response format:', data);
          setStudentsData([]);
        }
      } catch (error) {
        console.error('Error fetching B.Tech students:', error);
        setStudentsData([]);
      } finally {
        setLoading(false);
      }
    };
    
    const fetchSettings = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API.baseURL}/api/site-settings/btech_badge`),
          fetch(`${API.baseURL}/api/site-settings/btech_title`),
          fetch(`${API.baseURL}/api/site-settings/btech_description`)
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
          badge: badgeRes.data?.settingValue || 'Undergraduate Students',
          title: titleRes.data?.settingValue || 'Students',
          description: descRes.data?.settingValue || 'Talented students pursuing excellence in technology and innovation.'
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    
    fetchStudents();
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

  // Generate sorted years list (from data + predefined years)
  const predefinedYears = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  const yearsFromData = [...new Set(studentsData.map(s => s.year))];
  const allYears = [...new Set([...predefinedYears, ...yearsFromData])];
  const sortedYears = allYears.sort((a, b) => b - a);

  // Filtered students based on search term and selected year
  const filteredStudents = studentsData.filter((student) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = student.name.toLowerCase().includes(term);
    const matchesYear = student.year === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
        <div className="mx-auto py-2">
          <div className="w-full mx-auto text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Users className="w-4 h-4" style={{ color: color1 }} />
              {headerSettings.badge}
            </div>
            <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {headerSettings.title}
            </h1>
            <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {headerSettings.description}
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Search and Batch Filter Section -  */}
        <div className="mb-12  top-20 z-40">
          <div className={`max-w-6xl mx-auto rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden`}>
            {/* Search Bar */}
            <div className="p-6 pb-4">
              <h2 
                className="text-xl font-bold mb-4 text-center"
                style={{ color: color1 }}
              >
                Search Students by Year
              </h2>
              
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search by student name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-xl border-2 shadow-sm transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-0 focus:outline-none`}
                  style={{
                    borderColor: searchTerm ? color1 : undefined
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = searchTerm ? color1 : (darkMode ? '#4B5563' : '#D1D5DB')}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300"
                  style={{ color: searchTerm ? color1 : (darkMode ? '#9CA3AF' : '#6B7280') }}
                />
              </div>
            </div>

            {/* Batch Filter - Year Dropdown */}
            <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select Year</label>
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
          </div>
        </div>

        {/* Students Cards Grid */}
        {filteredStudents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchTerm 
                ? `No students match your search for "${searchTerm}" in ${selectedYear} year`
                : `No students found in ${selectedYear} year`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('2015');
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

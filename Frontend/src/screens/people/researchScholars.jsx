import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Search, GraduationCap, ChevronLeft, ChevronRight, Award, BookOpen } from 'lucide-react';



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
  const [selectedBatch, setSelectedBatch] = useState('2025');
  const [scholarsData, setScholarsData] = useState([]);
  const [loading, setLoading] = useState(true);

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
              batch: scholar.department || '2025',
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
    fetchScholars();
  }, []);

  // Available batches
  const batches = ['2025', '2024', '2023', '2022', '2021'];
  const currentBatchIndex = batches.indexOf(selectedBatch);

  // Filtered scholars based on search term and selected batch
  const filteredScholars = scholarsData.filter((scholar) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      scholar.name.toLowerCase().includes(term) ||
      scholar.type.toLowerCase().includes(term);
    
    const matchesBatch = scholar.batch === selectedBatch;
    
    return matchesSearch && matchesBatch;
  });

  const handlePreviousBatch = () => {
    if (currentBatchIndex < batches.length - 1) {
      setSelectedBatch(batches[currentBatchIndex + 1]);
    }
  };

  const handleNextBatch = () => {
    if (currentBatchIndex > 0) {
      setSelectedBatch(batches[currentBatchIndex - 1]);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <BookOpen className="w-4 h-4" style={{ color: color1 }} />
            Academic Research
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Research Scholars
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Dedicated researchers pursuing advanced studies and innovation.
          </p>
        </div>
      </div>

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
                Search Research Scholar Across Batch
              </h2>
              
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search by name or registration type..."
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

            {/* Batch Filter - Horizontal Scroll */}
            <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-4 mt-4">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousBatch}
                  disabled={currentBatchIndex >= batches.length - 1}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    currentBatchIndex >= batches.length - 1
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-gray-700 cursor-pointer'
                  }`}
                  style={{
                    backgroundColor: darkMode ? '#374151' : '#F3F4F6'
                  }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Batch Buttons */}
                <div className="flex-1 flex gap-3 overflow-x-auto scrollbar-hide">
                  {batches.map((batch) => (
                    <button
                      key={batch}
                      onClick={() => setSelectedBatch(batch)}
                      className={`px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                        selectedBatch === batch
                          ? 'text-white shadow-lg'
                          : darkMode
                            ? 'text-gray-400 hover:bg-gray-700'
                            : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      style={{
                        backgroundColor: selectedBatch === batch ? color1 : 'transparent'
                      }}
                    >
                      {batch} BATCH
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={handleNextBatch}
                  disabled={currentBatchIndex <= 0}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    currentBatchIndex <= 0
                      ? 'opacity-30 cursor-not-allowed'
                      : 'hover:bg-gray-700 cursor-pointer'
                  }`}
                  style={{
                    backgroundColor: darkMode ? '#374151' : '#F3F4F6'
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
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
                ? `No research scholars match your search for "${searchTerm}" in ${selectedBatch} batch`
                : `No research scholars found in ${selectedBatch} batch`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBatch('2025');
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

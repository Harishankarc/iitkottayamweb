import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Search, GraduationCap, ChevronLeft, ChevronRight, Award } from 'lucide-react';

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

export default function MTechStudents() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('2019');

  // M.Tech Students Data
  const studentsData = [
    // 2019 Batch
    { id: 1, name: 'ABHILASH K', batch: '2019' },
    { id: 2, name: 'ADARSH KRISHNAN', batch: '2019' },
    { id: 3, name: 'ANJANA MOL K K', batch: '2019' },
    { id: 4, name: 'ANJU AUGUSTINE', batch: '2019' },
    { id: 5, name: 'ANUPAMA SAJI', batch: '2019' },
    { id: 6, name: 'ARAVIND RAJ M', batch: '2019' },
    { id: 7, name: 'ARYA KRISHNAN', batch: '2019' },
    { id: 8, name: 'ATHIRA P', batch: '2019' },
    { id: 9, name: 'DEVIKA MENON', batch: '2019' },
    { id: 10, name: 'GEETHU JOSEPH', batch: '2019' },
    { id: 11, name: 'HAREESH KUMAR', batch: '2019' },
    { id: 12, name: 'JITHIN JOSE', batch: '2019' },
    { id: 13, name: 'KAVYA KRISHNA', batch: '2019' },
    { id: 14, name: 'LAKSHMI PRIYA', batch: '2019' },
    { id: 15, name: 'MANU KRISHNA', batch: '2019' },
    { id: 16, name: 'NAVEEN KUMAR', batch: '2019' },
    { id: 17, name: 'PREETHI PAUL', batch: '2019' },
    { id: 18, name: 'RAHUL RAJ', batch: '2019' },
    { id: 19, name: 'SANDEEP KUMAR', batch: '2019' },
    { id: 20, name: 'SREELAKSHMI S', batch: '2019' },

    // 2020 Batch
    { id: 21, name: 'ADITHYA NAIR', batch: '2020' },
    { id: 22, name: 'ANITHA KUMARI', batch: '2020' },
    { id: 23, name: 'ASHWIN KUMAR', batch: '2020' },
    { id: 24, name: 'DEEPAK MENON', batch: '2020' },
    { id: 25, name: 'GAYATRI SURESH', batch: '2020' },
    { id: 26, name: 'HARITHA MENON', batch: '2020' },
    { id: 27, name: 'KIRAN KUMAR', batch: '2020' },
    { id: 28, name: 'MEERA KRISHNAN', batch: '2020' },
    { id: 29, name: 'NIKHIL VARMA', batch: '2020' },
    { id: 30, name: 'POOJA SHARMA', batch: '2020' },
    { id: 31, name: 'RAJESH MENON', batch: '2020' },
    { id: 32, name: 'SANJAY KUMAR', batch: '2020' },

    // 2021 Batch
    { id: 33, name: 'ARUN KUMAR R', batch: '2021' },
    { id: 34, name: 'DIVYA NAIR', batch: '2021' },
    { id: 35, name: 'GOPAL KRISHNAN', batch: '2021' },
    { id: 36, name: 'INDIRA MENON', batch: '2021' },
    { id: 37, name: 'KRISHNA KUMAR', batch: '2021' },
    { id: 38, name: 'MADHAVI SHARMA', batch: '2021' },
    { id: 39, name: 'NITHIN RAJ', batch: '2021' },
    { id: 40, name: 'PRANAV MENON', batch: '2021' },
    { id: 41, name: 'RADHIKA NAIR', batch: '2021' },
    { id: 42, name: 'SURESH KUMAR', batch: '2021' },

    // 2022 Batch
    { id: 43, name: 'AKSHAY KUMAR', batch: '2022' },
    { id: 44, name: 'BHAVANA MENON', batch: '2022' },
    { id: 45, name: 'CHETAN KUMAR', batch: '2022' },
    { id: 46, name: 'DHANYA NAIR', batch: '2022' },
    { id: 47, name: 'HARI KRISHNAN', batch: '2022' },
    { id: 48, name: 'KAVITHA SHARMA', batch: '2022' },
    { id: 49, name: 'LAKSHMAN KUMAR', batch: '2022' },
    { id: 50, name: 'MAYA MENON', batch: '2022' },

    // 2023 Batch
    { id: 51, name: 'ARJUN MENON', batch: '2023' },
    { id: 52, name: 'BINDU KRISHNAN', batch: '2023' },
    { id: 53, name: 'DEEPA NAIR', batch: '2023' },
    { id: 54, name: 'GANESH KUMAR', batch: '2023' },
    { id: 55, name: 'HARINI SHARMA', batch: '2023' },
    { id: 56, name: 'KARTHIK MENON', batch: '2023' },
  ];

  // Available batches
  const batches = ['2019', '2020', '2021', '2022', '2023', '2024'];
  const currentBatchIndex = batches.indexOf(selectedBatch);

  // Filtered students based on search term and selected batch
  const filteredStudents = studentsData.filter((student) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = student.name.toLowerCase().includes(term);
    const matchesBatch = student.batch === selectedBatch;
    
    return matchesSearch && matchesBatch;
  });

  const handlePreviousBatch = () => {
    if (currentBatchIndex > 0) {
      setSelectedBatch(batches[currentBatchIndex - 1]);
    }
  };

  const handleNextBatch = () => {
    if (currentBatchIndex < batches.length - 1) {
      setSelectedBatch(batches[currentBatchIndex + 1]);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Full Width, 70% Height */}
      <div className={`relative overflow-hidden w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '70vh' }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f293780' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        
        {/* Centered Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Award className="w-4 h-4" style={{ color: color1 }} />
              Postgraduate Students
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              M.Tech Students
            </h1>
            <p className={`text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Advanced learners pursuing specialized knowledge in technology.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Batch Filter Section - STICKY */}
        <div className="mb-12 sticky top-0 z-50">
          <div className={`max-w-6xl mx-auto rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl overflow-hidden`}>
            {/* Search Bar */}
            <div className="p-6 pb-4">
              <h2 
                className="text-xl font-bold mb-4 text-center"
                style={{ color: color1 }}
              >
                Search M.Tech Students Across Batch
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

            {/* Batch Filter - Horizontal Scroll */}
            <div className={`px-6 pb-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-4 mt-4">
                {/* Previous Button */}
                <button
                  onClick={handlePreviousBatch}
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
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
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
                ? `No M.Tech students match your search for "${searchTerm}" in ${selectedBatch} batch`
                : `No M.Tech students found in ${selectedBatch} batch`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBatch('2019');
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
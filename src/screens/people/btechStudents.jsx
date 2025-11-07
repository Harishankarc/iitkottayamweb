import React, { useState } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Search, GraduationCap, ChevronLeft, ChevronRight, Users } from 'lucide-react';

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
  const color1 = api.color1;
  const color2 = api.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('2015');

  // B.Tech Students Data
  const studentsData = [
    // 2015 Batch
    { id: 1, name: 'A. ADDEPALLI VENKATA MANIKYALA RAO', batch: '2015' },
    { id: 2, name: 'AKASH TIMMAPURAM', batch: '2015' },
    { id: 3, name: 'ANIL KUMAR YADAV', batch: '2015' },
    { id: 4, name: 'ANJU MARY PETER', batch: '2015' },
    { id: 5, name: 'ANUJ BHATLA', batch: '2015' },
    { id: 6, name: 'BANAVATH SHIVA SHANTHA MANI', batch: '2015' },
    { id: 7, name: 'BEVARA RAVI VARMA KUMAR', batch: '2015' },
    { id: 8, name: 'DARLA PRASHANTH', batch: '2015' },
    { id: 9, name: 'ESLAVATH RAMYA', batch: '2015' },
    { id: 10, name: 'ETHAKOTA PAVANSAI', batch: '2015' },
    { id: 11, name: 'HARSH KUMAR SINGH', batch: '2015' },
    { id: 12, name: 'JALIBILI PUSHPAK', batch: '2015' },
    { id: 13, name: 'KALIDINDI ALEKHYA', batch: '2015' },
    { id: 14, name: 'KODURU JASWANTH KUMAR', batch: '2015' },
    { id: 15, name: 'KOTLAPUDI JASWANTH', batch: '2015' },
    { id: 16, name: 'KOVYANA YASHWANT SRIVATSAV', batch: '2015' },
    { id: 17, name: 'MAROTU RAJESH KUMAR', batch: '2015' },
    { id: 18, name: 'MEDA RAVALI', batch: '2015' },
    { id: 19, name: 'MOOD DINESH', batch: '2015' },
    { id: 20, name: 'MUNJULURI SRIJA ASRITHA', batch: '2015' },
    { id: 21, name: 'POSIPOGU ANANDA BHARATH', batch: '2015' },
    { id: 22, name: 'RAJAT KUMAR', batch: '2015' },
    { id: 23, name: 'SAVIO JOSE', batch: '2015' },
    { id: 24, name: 'SHIVENDRA SINGH', batch: '2015' },

    // 2016 Batch
    { id: 25, name: 'ABHISHEK SHARMA', batch: '2016' },
    { id: 26, name: 'ADITI VERMA', batch: '2016' },
    { id: 27, name: 'ARAVIND KRISHNAN', batch: '2016' },
    { id: 28, name: 'DEEPAK KUMAR', batch: '2016' },
    { id: 29, name: 'KAVYA MENON', batch: '2016' },
    { id: 30, name: 'PRANAV REDDY', batch: '2016' },
    { id: 31, name: 'SANJAY PATEL', batch: '2016' },
    { id: 32, name: 'SNEHA GUPTA', batch: '2016' },

    // 2017 Batch
    { id: 33, name: 'AMIT SINGH', batch: '2017' },
    { id: 34, name: 'DIVYA NAIR', batch: '2017' },
    { id: 35, name: 'KARTHIK IYER', batch: '2017' },
    { id: 36, name: 'NEHA SHARMA', batch: '2017' },
    { id: 37, name: 'RAVI KUMAR', batch: '2017' },
    { id: 38, name: 'SWATI PANDEY', batch: '2017' },

    // 2018 Batch
    { id: 39, name: 'ARJUN MENON', batch: '2018' },
    { id: 40, name: 'PRIYA KRISHNAN', batch: '2018' },
    { id: 41, name: 'ROHIT SHARMA', batch: '2018' },
    { id: 42, name: 'SAKSHI PATEL', batch: '2018' },

    // 2019 Batch
    { id: 43, name: 'ANKIT VERMA', batch: '2019' },
    { id: 44, name: 'MEGHA REDDY', batch: '2019' },
    { id: 45, name: 'NIKHIL GUPTA', batch: '2019' },
    { id: 46, name: 'POOJA SINGH', batch: '2019' },
  ];

  // Available batches
  const batches = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
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
              <Users className="w-4 h-4" style={{ color: color1 }} />
              Undergraduate Students
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Students
            </h1>
            <p className={`text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Talented students pursuing excellence in technology and innovation.
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
                Search Students Across Batch
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
                ? `No students match your search for "${searchTerm}" in ${selectedBatch} batch`
                : `No students found in ${selectedBatch} batch`
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedBatch('2015');
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
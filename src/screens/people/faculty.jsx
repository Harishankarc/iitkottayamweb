import React, { useState } from 'react';
import { Mail, Phone, MapPin, Search, GraduationCap, Globe, BookOpen, ChevronRight } from 'lucide-react';

// Mock API and Theme
const api = {
  color1: '#239244',
  color2: '#e8f5f0'
};

const useTheme = () => ({ darkMode: false });

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
      <div className="flex items-center gap-4 p-4" style={{
        background: `linear-gradient(135deg, ${color1}10, ${color1}05)`
      }}>
        {/* Profile Image */}
        <div className="relative flex-shrink-0">
          <div 
            className="rounded-full overflow-hidden transition-transform duration-300"
            style={{
              width: '70px',
              height: '70px',
              border: `3px solid ${color1}`,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <img
              src={faculty.image}
              alt={faculty.name}
              className="w-full h-full object-cover"
              onError={(e) => e.currentTarget.src = `https://placehold.co/70x70/e8f5f0/239244?text=${faculty.name.charAt(0)}`}
            />
          </div>
          {/* Role Badge */}
          <div 
            className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ backgroundColor: color1 }}
          >
            <BookOpen className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Name and Title */}
        <div className="flex-1 min-w-0">
          <h3 className={`text-base font-bold mb-1 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {faculty.name}
          </h3>
          <p 
            className="text-xs font-semibold mb-1 px-2 py-0.5 rounded inline-block"
            style={{
              backgroundColor: `${color1}20`,
              color: color1
            }}
          >
            {faculty.role}
          </p>
          <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
      <div className="px-4 pb-4 space-y-3">
        {/* Research Interests - Compact Tags */}
        {faculty.interests && faculty.interests.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-1.5">
              {faculty.interests.slice(0, 4).map((interest, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded text-xs ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {interest}
                </span>
              ))}
              {faculty.interests.length > 4 && (
                <span className={`px-2 py-1 rounded text-xs font-bold ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  +{faculty.interests.length - 4}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Divider */}
        <div className={`h-px ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Contact Info - Inline */}
        <div className="space-y-2 text-xs">
          {faculty.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
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
              <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: color1 }} />
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
  const color1 = api.color1;
  const color2 = api.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  // Faculty Data
  const facultyData = [
    {
      id: 1,
      name: 'Prof Ashok S',
      designation: 'Professor (Scalable Academics)',
      affiliation: 'Former professor, NIT Calicut',
      role: 'Adjunct Professor',
      interests: [
        'Risk-Cost Management',
        'Energy Management',
        'Power System Planning',
        'Renewable Energy System',
        'Operations and Power Quality',
        'Regulatory Economics',
        'Electricity Market',
        'Project Management',
        'Industrial Automation'
      ],
      education: 'PhD from Indian Institute of Technology Bombay/Indian Institute of Technology-Kanpur',
      phone: '+91-482-2202132',
      email: 'pic.academics at iiitkottayam dot ac.in',
      room: 'Room No: AC 307',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=AS'
    },
    {
      id: 2,
      name: 'Dr. Shajulin Benedict',
      designation: 'Faculty In-Charge (Data and Information ethics)',
      affiliation: 'Associate Professor',
      role: 'Associate Professor',
      interests: [
        'Cloud Computing',
        'IoT',
        'Neuromorphic',
        'Energy Computer'
      ],
      education: 'Post-Doctoral (Post Doctoral), Writing Professor at TheComputer Sc',
      phone: '+91-482-2202150',
      email: 'shajulin at iiitkottayam dot ac.in',
      room: 'Room No: AC 315',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=SB'
    },
    {
      id: 3,
      name: 'Dr. Ebin Deni Raj',
      designation: 'Associate Dean (Academic Affairs)',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Biomedical AI',
        'Pattern Recognition and Learning',
        'AI for Social Good',
        'Precision, Accountability and Transparency in AI',
        'Model Compression',
        'Social Computing'
      ],
      education: 'PhD from IIT BHU Institute of Sciences',
      phone: '+91-482-2202195',
      email: 'ebindeniraj at iiitkottayam dot ac.in',
      room: 'Room No: AA 117 / AA 116',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=ED'
    },
    {
      id: 4,
      name: 'Dr. Bakkyaraj T',
      designation: 'Associate Dean (Hostel Affairs & Student Events)',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Lab Group Analysis of Nonlinear Differential Equations',
        'Solitons',
        'Conservation Theory and Important Numbers'
      ],
      education: 'Post-Doc from IIT - University of Santiago, Germany',
      phone: '+91-482-2202160',
      email: 'bakkyaraj at iiitkottayam dot ac.in',
      room: 'Room No: AB 212 / AA 118',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=BT'
    },
    {
      id: 5,
      name: 'Dr. Jayakrushna Sahoo',
      designation: 'HOD (Computer Science & Engineering-I)',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Peer-to-peer',
        'Machine Learning',
        'Smartphone (Digital and Social Sensing)'
      ],
      education: 'PhD from IIT Kharagpur',
      phone: '+91-482-2202164',
      email: 'jsahoo at iiitkottayam dot ac.in',
      room: 'Room No: AA 123',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=JS'
    },
    {
      id: 6,
      name: 'Dr. Bala S',
      designation: 'Assistant Professor',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Memristive-based Architectures',
        'Emerging Technologies',
        'FPGA and SoC',
        'IoT and Embedded systems',
        'VLSI Circuit and System Design',
        'Machine Learning'
      ],
      education: 'PhD from CUSAT, IISc Bangalore',
      phone: '+91-482-2202161',
      email: 'bala at iiitkottayam dot ac.in',
      room: 'Room No: BC 314',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=BS'
    },
    {
      id: 7,
      name: 'Dr. Panchami V',
      designation: 'HOD (CSE-Cyber Security)',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Bioinformatics and Data Management',
        'Blockchain Technology',
        'IoT Security',
        'Network Security',
        'Machine Learning'
      ],
      education: 'PhD from Anna University IIITDM',
      phone: '+91-482-2202151',
      email: 'panchami036 at iiitkottayam dot ac.in',
      room: 'Room No: AB 213 / AB 218',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=PV'
    },
    {
      id: 8,
      name: 'Dr. P. Victor Paul',
      designation: 'Faculty In-Charge',
      affiliation: 'Assistant Professor',
      role: 'Assistant Professor',
      interests: [
        'Data analytics',
        'Web Science',
        'Social Networks',
        'Cloud Computing and Optimization'
      ],
      education: 'Ph.D. from Bharathiyar Central University',
      phone: '+91-482-2202162',
      email: 'victor at iiitkottayam dot ac.in',
      room: 'Room No: AC 310',
      website: '#',
      image: 'https://placehold.co/70x70/e8f5f0/239244?text=VP'
    },
  ];

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
      {/* Hero Section */}
      <div className={`relative overflow-hidden w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '60vh' }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f293780' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <GraduationCap className="w-4 h-4" style={{ color: color1 }} />
              Our Educators
            </div>
            <h1 className={`text-3xl md:text-4xl lg:text-6xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Faculty
            </h1>
            <p className={`text-l md:text-2xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Dedicated educators and researchers shaping the future of technology.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Combined Search and Filter Box */}
        <div className={`mb-12 sticky top-4 z-40 max-w-4xl mx-auto rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="p-4 md:p-6">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
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
                className={`w-full p-4 pl-12 rounded-xl border-2 shadow-sm transition-all duration-300 ${
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
        {filteredFaculty.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((faculty) => (
              <FacultyCard key={faculty.id} faculty={faculty} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg max-w-4xl mx-auto`}>
            <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No faculty members match your search criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterRole('All');
              }}
              className="mt-6 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
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
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Mail, Phone, MapPin, Search, GraduationCap, Building2 } from 'lucide-react';
import RotatingDetails from '../../components/RotatingDetails.jsx';

// HOD Card Component - Vertical Layout Only
const HODCard = ({ hod, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`group relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Colored Top Bar */}
      <div 
        className="h-1 w-full"
        style={{
          background: `linear-gradient(90deg, ${color1}, ${color1}cc)`
        }}
      />

      {/* Content Container */}
      <div className="p-3">
        {/* Profile Image with Border */}
        <div className="flex justify-center mb-2">
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-30 transition-opacity duration-300"
              style={{ 
                backgroundColor: color1,
                opacity: isHovered ? 0.4 : 0.2,
                width: '96px',
                height: '96px'
              }}
            />
            <div 
              className="relative rounded-full overflow-hidden border-4 transition-all duration-300 flex items-center justify-center"
              style={{
                borderColor: isHovered ? color1 : (darkMode ? '#374151' : '#E5E7EB'),
                width: '96px',
                height: '96px',
                backgroundColor: color1
              }}
            >
              <img
                src={hod.image}
                alt={hod.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.warn(`⚠️ Image failed to load for ${hod.name}: ${hod.image}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span 
                className="absolute text-white text-3xl font-bold"
                style={{
                  display: hod.image && !hod.image.includes('placehold') ? 'none' : 'block'
                }}
              >
                {hod.name.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div className="text-center mb-2">
          <h3 
            className={`text-base font-bold mb-1 ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
          >
            {hod.name}
          </h3>
          <div 
            className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2"
            style={{
              backgroundColor: `${color1}15`,
              color: color1
            }}
          >
            Head of Department
          </div>
          <p className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {hod.department}
          </p>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Contact Information - Rotating */}
        <RotatingDetails 
          person={{
            email: hod.email,
            phone: hod.phones?.[0] || 'N/A',
            qualification: hod.qualification,
            experience: hod.experience,
            department: hod.department,
            specialization: hod.specialization,
            room: hod.room,
            roles: hod.phones?.slice(1) || []
          }}
          color1={color1}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
};

export default function HeadofDepartment() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [hodData, setHodData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHODs = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/hod`);
        const data = await response.json();
        console.log('HOD API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const transformedData = data.data
            .filter(person => person.isActive !== false)
            .map(person => {
              const imageUrl = person.photo 
                ? API.getImageUrl(person.photo)
                : null;
              console.log(`📸 HOD "${person.name}" - Photo field: ${person.photo}, Formatted URL: ${imageUrl}`);
              
              return {
                id: person.id,
                name: person.name || 'Unknown',
                department: person.designation || person.department || 'Department',
                phones: person.phone ? [person.phone] : [],
                email: person.email || '',
                qualification: person.qualification || person.room || 'N/A',
                specialization: person.specialization || 'N/A',
                experience: person.experience || 'N/A',
                room: person.qualification || person.room || 'N/A',
                image: imageUrl || `https://placehold.co/128x128/22a05e/ffffff?text=${person.name?.charAt(0) || 'H'}`
              };
            });
          setHodData(transformedData);
        } else {
          console.error('Invalid response format:', data);
          setHodData([]);
        }
      } catch (error) {
        console.error('Error fetching HOD data:', error);
        setHodData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHODs();

    return () => {
      // cleanup if needed
    };
  }, []);

  // Filtered results based on search term
  const filteredHODs = hodData.filter((hod) => {
    const term = searchTerm.toLowerCase();
    return (
      hod.name.toLowerCase().includes(term) ||
      hod.department.toLowerCase().includes(term) ||
      hod.email.toLowerCase().includes(term) ||
      hod.room.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Search Bar Section */}
        <div className="mb-12">
          <div className={`max-w-2xl mx-auto p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <h2 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: color1 }}
            >
              Search Head of Department
            </h2>
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name, department, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full p-4 pl-12 rounded-xl border-2 shadow-sm transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                } focus:ring-0 focus:outline-none`}
                style={{
                  borderColor: searchTerm ? color1 : undefined
                }}
              />
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300"
                style={{ color: searchTerm ? color1 : (darkMode ? '#9CA3AF' : '#6B7280') }}
              />
            </div>
          </div>
        </div>

        {/* HOD Cards Grid - Vertical Layout Only */}
        {filteredHODs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHODs.map((hod) => (
              <HODCard key={hod.id} hod={hod} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <GraduationCap className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No department heads match your search for "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition-all duration-300"
              style={{ backgroundColor: color1 }}
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

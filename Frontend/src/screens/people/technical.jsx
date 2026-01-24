import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Mail, Phone, MapPin, Search, Wrench, Users, Code, Settings } from 'lucide-react';

// Technical Staff Card Component - Simple & Stylish
const TechnicalCard = ({ staff, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      {/* Gradient Header */}
      <div 
        className="p-6 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20" style={{ backgroundColor: 'white', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10" style={{ backgroundColor: 'white', transform: 'translate(-30%, 30%)' }} />
        
        <div className="relative z-10">
          <h3 className="text-xl font-bold text-white mb-2">
            {staff.name}
          </h3>
          <p className="text-sm text-white/90">
            {staff.designation}
          </p>
        </div>
      </div>

      {/* Profile Image - Overlapping */}
      <div className="flex justify-center" style={{ marginTop: '-50px' }}>
        <div className="relative">
          <div 
            className="rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300"
            style={{
              width: '100px',
              height: '100px',
              border: `4px solid ${darkMode ? '#1F2937' : '#FFFFFF'}`,
              transform: isHovered ? 'scale(1.05) rotate(3deg)' : 'scale(1) rotate(0deg)'
            }}
          >
            <img
              src={staff.image}
              alt={staff.name}
              className="w-full h-full object-cover"
              onError={(e) => e.currentTarget.src = `https://placehold.co/100x100/e8f5f0/239244?text=${staff.name.charAt(0)}`}
            />
          </div>
          
          {/* Status Indicator */}
          <div 
            className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            <Wrench className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 pt-4">
        {/* Contact Information - Clean Layout */}
        <div className="space-y-3">
          {/* Email */}
          {staff.email && (
            <div className="flex items-center gap-3">
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Mail className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Email
                </p>
                <a 
                  href={`mailto:${staff.email}`}
                  className={`text-sm hover:underline truncate block ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  {staff.email}
                </a>
              </div>
            </div>
          )}

          {/* Phone */}
          {staff.phone && (
            <div className="flex items-center gap-3">
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: `${color1}15` }}
              >
                <Phone className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Phone
                </p>
                <a 
                  href={`tel:${staff.phone.replace(/[^0-9+]/g, '')}`}
                  className={`text-sm hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}
                >
                  {staff.phone}
                </a>
              </div>
            </div>
          )}

          {/* Room */}
          {staff.room && (
            <div className="flex items-center gap-3">
              <div 
                className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: `${color1}15` }}
              >
                <MapPin className="w-4 h-4" style={{ color: color1 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold mb-0.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  Room
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  {staff.room}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div 
        className="h-1.5 w-full transition-all duration-300"
        style={{
          background: isHovered ? `linear-gradient(90deg, ${color1}, ${color1}80)` : `${color1}40`
        }}
      />
    </div>
  );
};

export default function Technical() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [technicalData, setTechnicalData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicalStaff = async () => {
      try {
        const response = await API.get('/api/people/type/technical-staff');
        const transformedData = (response.data || []).map(person => ({
          id: person.id,
          name: person.name,
          designation: person.designation || '',
          email: person.email || '',
          phone: person.phone || '',
          room: person.room || '',
          image: person.photo || `https://placehold.co/100x100/e8f5f0/239244?text=${person.name.charAt(0)}`
        }));
        setTechnicalData(transformedData);
      } catch (error) {
        console.error('Error fetching technical staff:', error);
        setTechnicalData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTechnicalStaff();
  }, []);

  // Filtered results based on search term
  const filteredStaff = technicalData.filter((staff) => {
    const term = searchTerm.toLowerCase();
    return (
      staff.name.toLowerCase().includes(term) ||
      staff.designation.toLowerCase().includes(term) ||
      staff.email.toLowerCase().includes(term)
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
      {/* Hero Section */}
      <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
        <div className="mx-auto py-2">
          <div className="w-full mx-auto text-center px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Wrench className="w-4 h-4" style={{ color: color1 }} />
              Technical Support Team
            </div>
            <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Technical Staff
            </h1>
            <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Skilled professionals ensuring smooth technical operations and support.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Search Section -  */}
        <div className="mb-12  top-0 z-50">
          <div className={`max-w-4xl mx-auto p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: color1 }}
            >
              Search Technical Staff
            </h2>
            
            {/* Search Bar */}
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name, designation, or email..."
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
        </div>

        {/* Technical Staff Cards Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((staff) => (
              <TechnicalCard key={staff.id} staff={staff} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Wrench className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No technical staff members match your search for "{searchTerm}"
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
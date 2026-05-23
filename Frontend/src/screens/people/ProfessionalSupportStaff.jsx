import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Mail, Phone, MapPin, Search, Heart, Stethoscope, UserCheck, Shield, Award } from 'lucide-react';
import RotatingDetails from '../../components/RotatingDetails.jsx';



// Professional Support Staff Card Component - Simple & Stylish
const StaffCard = ({ staff, color1, darkMode }) => {
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
      {/* Top Colored Bar */}
      <div 
        className="h-3 w-full"
        style={{
          background: `linear-gradient(90deg, ${color1}, ${color1}cc)`
        }}
      />

      {/* Card Content */}
      <div className="p-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-6">
          {/* Profile Image */}
          <div className="relative mb-4">
            <div 
              className="rounded-full overflow-hidden shadow-xl transition-all duration-300"
              style={{
                width: '110px',
                height: '110px',
                border: `4px solid ${color1}`,
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            >
              <img
                src={staff.image}
                alt={staff.name}
                className="w-full h-full object-cover"
                onError={(e) => e.currentTarget.src = `https://placehold.co/110x110/e8f5f0/239244?text=${staff.name.charAt(0)}`}
              />
            </div>
            
            {/* Role Icon Badge */}
            <div 
              className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
              style={{ backgroundColor: color1 }}
            >
              {staff.designation.toLowerCase().includes('medical') && <Stethoscope className="w-5 h-5 text-white" />}
              {staff.designation.toLowerCase().includes('psychologist') && <Heart className="w-5 h-5 text-white" />}
              {staff.designation.toLowerCase().includes('nurse') && <Shield className="w-5 h-5 text-white" />}
              {!staff.designation.toLowerCase().includes('medical') && 
               !staff.designation.toLowerCase().includes('psychologist') && 
               !staff.designation.toLowerCase().includes('nurse') && <UserCheck className="w-5 h-5 text-white" />}
            </div>
          </div>

          {/* Name */}
          <h3 className={`text-xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {staff.name}
          </h3>

          {/* Designation Badge */}
          <div 
            className="px-4 py-2 rounded-lg text-sm font-semibold text-center"
            style={{
              backgroundColor: `${color1}20`,
              color: color1
            }}
          >
            {staff.designation}
          </div>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        {/* Rotating Details with Fade Effect */}
        <RotatingDetails person={staff} color1={color1} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default function ProfessionalSupportStaff() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [searchTerm, setSearchTerm] = useState('');
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [headerSettings, setHeaderSettings] = useState({
    badge: 'Student Welfare & Support',
    title: 'Professional Support Staff',
    description: 'Dedicated professionals ensuring student health, wellness, and overall well-being.'
  });

  useEffect(() => {
    const fetchSupportStaff = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/support-staff`);
        const data = await response.json();
        console.log('Support Staff API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          const transformedData = data.data
            .filter(person => person.isActive !== false)
            .map(person => ({
              id: person.id,
              name: person.name || 'Unknown',
              designation: person.designation || '',
              email: person.email || '',
              phone: person.phone || '',
              room: person.room || person.qualification || '',
              qualification: person.qualification || 'N/A',
              department: person.department || 'N/A',
              specialization: person.specialization || 'N/A',
              experience: person.experience || 'N/A',
              image: API.getImageUrl(person.photo) || `https://placehold.co/110x110/22a05e/ffffff?text=${person.name?.charAt(0) || 'S'}`
            }));
          setStaffData(transformedData);
        } else {
          console.error('Invalid response format:', data);
          setStaffData([]);
        }
      } catch (error) {
        console.error('Error fetching support staff:', error);
        setStaffData([]);
      } finally {
        setLoading(false);
      }
    };

    const fetchSettings = async () => {
      try {
        const responses = await Promise.all([
          fetch(`${API.baseURL}/api/site-settings/support_staff_badge`),
          fetch(`${API.baseURL}/api/site-settings/support_staff_title`),
          fetch(`${API.baseURL}/api/site-settings/support_staff_description`)
        ]);
        
        for (let i = 0; i < responses.length; i++) {
          if (!responses[i].ok) {
            console.warn(`Settings response ${i} not OK:`, responses[i].status);
          }
        }
        
        const [badgeRes, titleRes, descRes] = await Promise.all(
          responses.map(r => r.json())
        );
        
        setHeaderSettings({
          badge: badgeRes.data?.settingValue || 'Student Welfare & Support',
          title: titleRes.data?.settingValue || 'Professional Support Staff',
          description: descRes.data?.settingValue || 'Dedicated professionals ensuring student health, wellness, and overall well-being.'
        });
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    
    fetchSupportStaff();
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
  // Filtered results based on search term
  const filteredStaff = staffData.filter((staff) => {
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
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Heart className="w-4 h-4" style={{ color: color1 }} />
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
        {/* Search Section -  */}
        <div className="mb-12  top-20 z-40">
          <div className={`max-w-4xl mx-auto p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 
              className="text-2xl font-bold mb-4 text-center"
              style={{ color: color1 }}
            >
              Search Professional Support Staff
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

        {/* Staff Cards Grid */}
        {filteredStaff.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStaff.map((staff) => (
              <StaffCard key={staff.id} staff={staff} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className={`text-center p-16 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
            <Heart className="w-20 h-20 mx-auto mb-6 opacity-50" style={{ color: color1 }} />
            <h3 className="text-3xl font-bold mb-3">No Results Found</h3>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No support staff members match your search for "{searchTerm}"
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

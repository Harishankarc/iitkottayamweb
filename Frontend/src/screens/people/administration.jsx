import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Users, Mail, Phone, Search } from 'lucide-react';

// Sub-component for the profile card - matching reference design
const ProfileCard = ({ person, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-2xl transform -translate-y-1' : 'shadow-lg'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${darkMode ? '#374151' : '#E5E7EB'}`
      }}
    >
      {/* Top cover image/gradient */}
      <div 
        className="h-28 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
        }}
      >
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white opacity-10 transform translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white opacity-10 transform -translate-x-8 translate-y-8" />
      </div>

      {/* Large Profile Image */}
      <div className="flex justify-center" style={{ marginTop: '-64px' }}>
        <div className="relative">
          <div 
            className={`rounded-full p-1 transition-all duration-300 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }`}
            style={{
              boxShadow: isHovered ? '0 10px 30px rgba(0,0,0,0.25)' : '0 4px 15px rgba(0,0,0,0.15)'
            }}
          >
            <img
              src={person.image}
              alt={person.name}
              className={`w-32 h-32 rounded-full object-cover transition-transform duration-300 ${
                isHovered ? 'scale-105' : 'scale-100'
              }`}
              onError={(e) => e.currentTarget.src = `https://placehold.co/128x128/22a05e/ffffff?text=${person.name.charAt(0)}`}
            />
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6 pt-4">
        {/* Name and Designation */}
        <div className="text-center mb-4">
          <h3 className={`text-xl font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {person.name}
          </h3>
          <h4 className={`text-sm font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {person.title}
          </h4>
        </div>
        
        {/* Divider */}
        <div className={`h-px w-full mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
        
        {/* Contact Information */}
        <div className="space-y-3 text-sm leading-relaxed text-gray-700">
          <div>
            <p className="font-semibold text-green-600 text-xs uppercase tracking-wider">Email</p>
            {person.email ? (
              person.email.split(',').map((email, eIdx) => (
                <p key={eIdx} className={`break-all ${darkMode ? 'text-gray-300' : 'text-gray-750'}`}>
                  {email.trim()}
                </p>
              ))
            ) : (
              <p className={darkMode ? 'text-gray-300' : 'text-gray-750'}>N/A</p>
            )}
          </div>
          <div>
            <p className="font-semibold text-green-600 text-xs uppercase tracking-wider">Phone</p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-750'}>{person.phone || 'N/A'}</p>
          </div>
          {person.phone2 && person.phone2 !== 'N/A' && person.phone2.trim() !== '' && (
            <div>
              <p className="font-semibold text-green-600 text-xs uppercase tracking-wider">Phone 2</p>
              <p className={darkMode ? 'text-gray-300' : 'text-gray-750'}>{person.phone2}</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-green-600 text-xs uppercase tracking-wider">Room No</p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-750'}>{person.room || 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Administration() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [activeTab, setActiveTab] = useState('General');
  const [searchTerm, setSearchTerm] = useState('');
  const [administrationData, setAdministrationData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch administration data from API
  useEffect(() => {
    const fetchAdministration = async () => {
      try {
        console.log('👨‍💼 Fetching administration data...');
        const response = await fetch(`${API.baseURL}/api/people/type/administration`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('👨‍💼 API Response:', data);
        
        if (data.success && data.data && Array.isArray(data.data)) {
          console.log(`✅ Loaded ${data.data.length} administration records`);
          // Log first record to see what fields are available
          if (data.data.length > 0) {
            console.log('First record fields:', Object.keys(data.data[0]));
            console.log('First record phone2:', data.data[0].phone2);
          }
          // Transform API data to match component structure
          const transformedData = data.data
            .filter(person => person.isActive !== false)
            .map(person => {
              // Normalize specialization field
              const spec = person.specialization ? String(person.specialization).trim() : '';
              
              // Only recognize specific category values
              let category = 'general';
              if (spec === 'fac-in-charge' || spec === 'FAC-IN-CHARGE') {
                category = 'fac-in-charge';
              } else if (spec === 'support' || spec === 'Support' || spec === 'SUPPORT') {
                category = 'support';
              }
              
              console.log(`👤 ${person.name}: specialization="${spec}" → category="${category}"`);
              
              return {
                name: person.name || 'Unknown',
                title: person.designation || 'Administrator',
                email: person.email || 'N/A',
                phone: person.phone || 'N/A',
                phone2: person.phone2 || 'N/A',
                room: person.room || person.experience || person.qualification || 'N/A',
                category: category,
                image: API.getImageUrl(person.photo) || `https://placehold.co/128x128/22a05e/ffffff?text=${person.name?.charAt(0) || 'A'}`
                // department: person.department || 'N/A',
                // qualification: person.qualification || 'N/A',
                // specialization: person.specialization || 'N/A',
                // experience: person.experience || 'N/A',
              };

            });
          console.log('✅ Transformed data sample:', transformedData[0]);
          console.log('✅ Transformed data:', transformedData.length, 'records');
          console.log('General:', transformedData.filter(p => p.category === 'general').length);
          console.log('FAC-IN-CHARGE:', transformedData.filter(p => p.category === 'fac-in-charge').length);
          console.log('Support:', transformedData.filter(p => p.category === 'support').length);
          setAdministrationData(transformedData);
        } else {
          console.error('❌ Invalid response format:', data);
          console.warn('Expected: { success: true, data: [...] }');
          setAdministrationData([]);
        }
      } catch (error) {
        console.error('❌ Error fetching administration data:', error);
        console.error('Check if /api/people/type/administration endpoint exists');
        setAdministrationData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdministration();

    return () => {
      // cleanup if needed in future
    };
  }, []);

  // Filtered results based on search term
  const filteredResults = administrationData.filter((person) => {
    const term = searchTerm.toLowerCase();
    return (
      person.name.toLowerCase().includes(term) ||
      person.title.toLowerCase().includes(term) ||
      person.email.toLowerCase().includes(term)
    );
  });

  // Filter data by category
  const facInChargeData = administrationData.filter(person => person.category === 'fac-in-charge');
  const supportData = administrationData.filter(person => person.category === 'support');

  const tabs = [
    { name: 'General Administration', key: 'General' },
    { name: 'Search Administrator', key: 'Search' },
    { name: 'FAC-IN-CHARGE', key: 'FacInCharge' },
    { name: 'Support', key: 'Support' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* Tab Navigation */}
        <div className="mb-12  top-20 z-40 w-full"> 
          <div className={`flex flex-wrap justify-center gap-2 rounded-lg p-2 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            {tabs.map((tab) => (
              <button 
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-semibold rounded-md transition-all duration-300
                  ${activeTab === tab.key
                    ? `text-white shadow-md`
                    : `${darkMode ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`
                  }
                `}
                style={{
                  color: activeTab === tab.key ? '#FFFFFF' : color1,
                  backgroundColor: activeTab === tab.key ? color1 : `${color1}1A`,
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content for the active tab */}
        <div className="space-y-12">
          {loading ? (
            <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading administration data...</p>
            </div>
          ) : (
            <>
          {activeTab === 'General' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {administrationData.filter(person => person.category === 'general').map((person, index) => (
                  <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'Search' && (
            <div className="space-y-8">
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="search"
                  placeholder="Search by name, title, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full p-4 pl-12 rounded-lg border-2 shadow-inner transition-all duration-300 ${
                    darkMode
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  } focus:ring-0 focus:outline-none`}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                />
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: darkMode ? `${color1}99` : color1 }}
                />
              </div>

              {/* Search Results Grid */}
              {searchTerm && filteredResults.length > 0 && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((person, index) => (
                    <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                  ))}
                </div>
              )}

              {/* No Results Message */}
              {searchTerm && filteredResults.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">No results found for "{searchTerm}"</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Try searching for a different name, title, or email.
                  </p>
                </div>
              )}

              {/* Initial Prompt Message */}
              {!searchTerm && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">Search Administrators</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Type in the box above to find an administrator.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'FacInCharge' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {facInChargeData.map((person, index) => (
                  <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                ))}
              </div>

              {facInChargeData.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">No Faculty In-Charge Listed</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Information will be updated soon.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'Support' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {supportData.map((person, index) => (
                  <ProfileCard key={index} person={person} color1={color1} darkMode={darkMode} />
                ))}
              </div>

              {supportData.length === 0 && (
                <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h3 className="text-2xl font-semibold">No Support Services Listed</h3>
                  <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Information will be updated soon.
                  </p>
                </div>
              )}
            </div>
          )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
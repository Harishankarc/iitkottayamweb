import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Home, Mail, Phone, MapPin, Users, Shield, Wifi, Utensils, Bed, FileText, CheckCircle } from 'lucide-react';

// Warden Card Component
const WardenCard = ({ warden, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Profile Image */}
        <div 
          className="flex-shrink-0 w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-lg overflow-hidden"
          style={{
            border: `3px solid ${color1}`
          }}
        >
          <img
            src={warden.image}
            alt={warden.name}
            className="w-full h-full object-cover"
            onError={(e) => e.currentTarget.src = `https://placehold.co/80x80/e8f5f0/239244?text=${warden.name.charAt(0)}`}
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className={`text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {warden.name}
          </h3>
          <p 
            className="text-sm sm:text-base md:text-lg font-semibold mb-2"
            style={{ color: color1 }}
          >
            {warden.role}
          </p>
          
          {warden.designation && (
            <p className={`text-xs sm:text-sm md:text-base mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {warden.designation}
            </p>
          )}

          <div className="space-y-1">
            {warden.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" style={{ color: color1 }} />
                <a 
                  href={`tel:${warden.phone}`}
                  className={`text-xs sm:text-sm md:text-base hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {warden.phone}
                </a>
              </div>
            )}
            
            {warden.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" style={{ color: color1 }} />
                <a 
                  href={`mailto:${warden.email}`}
                  className={`text-xs hover:underline truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {warden.email}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hostel Hall Card Component
const HallCard = ({ hall, color1, darkMode }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-300 ${
        isHovered ? 'shadow-xl' : 'shadow-md'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        border: `2px solid ${isHovered ? color1 : (darkMode ? '#374151' : `${color1}33`)}`
      }}
    >
      {/* Hall Name Header */}
      <div 
        className="p-3 sm:p-4 md:p-5 text-center"
        style={{
          background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
        }}
      >
        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white">{hall.name}</h3>
      </div>

      {/* Hall Details */}
      <div className="p-4 sm:p-5 md:p-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4">
          <div className="text-center">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: color1 }} />
            </div>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Type</p>
            <p className={`text-sm sm:text-base md:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {hall.gender}
            </p>
          </div>
          
          <div className="text-center">
            <div 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-auto rounded-lg flex items-center justify-center mb-2"
              style={{ backgroundColor: `${color1}20` }}
            >
              <Bed className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" style={{ color: color1 }} />
            </div>
            <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Warden</p>
            <p className={`text-sm sm:text-base md:text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {hall.wardenType}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-xs sm:text-sm md:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {hall.contact}
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" style={{ color: color1 }} />
            <span className={`text-xs sm:text-sm md:text-base truncate ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {hall.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Hostel() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;
  const [contentBlocks, setContentBlocks] = useState([]);
  const [hostelData, setHostelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHostelData = async () => {
      try {
        setError(null);
        // Fetch both content blocks and facility data
        const [blocksResponse, facilityResponse] = await Promise.all([
          API.get('/api/content-blocks/page/hostel'),
          API.get('/api/facilities/slug/hostel')
        ]);
        
        const blocks = blocksResponse.data.data || blocksResponse.data || [];
        setContentBlocks(blocks.filter(block => block.isVisible));
        
        // Parse facility data
        const facilityData = facilityResponse.data.data || facilityResponse.data;
        
        // Parse JSON fields if they are strings
        if (facilityData) {
          if (typeof facilityData.wardens === 'string') {
            facilityData.wardens = JSON.parse(facilityData.wardens);
          }
          if (typeof facilityData.halls === 'string') {
            facilityData.halls = JSON.parse(facilityData.halls);
          }
        }
        
        setHostelData(facilityData);
      } catch (error) {
        console.error('Error fetching hostel data:', error);
        setError('Failed to load hostel information. Please try again later.');
        setContentBlocks([]);
        setHostelData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchHostelData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    Promise.all([
      API.get('/api/content-blocks/page/hostel'),
      API.get('/api/facilities/slug/hostel')
    ])
      .then(([blocksResponse, facilityResponse]) => {
        const blocks = blocksResponse.data.data || blocksResponse.data || [];
        setContentBlocks(blocks.filter(block => block.isVisible));
        
        // Parse facility data
        const facilityData = facilityResponse.data.data || facilityResponse.data;
        
        // Parse JSON fields if they are strings
        if (facilityData) {
          if (typeof facilityData.wardens === 'string') {
            facilityData.wardens = JSON.parse(facilityData.wardens);
          }
          if (typeof facilityData.halls === 'string') {
            facilityData.halls = JSON.parse(facilityData.halls);
          }
        }
        
        setHostelData(facilityData);
      })
      .catch((error) => {
        console.error('Error fetching hostel data:', error);
        setError('Failed to load hostel information. Please try again later.');
        setContentBlocks([]);
        setHostelData(null);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Get blocks by type
  const heroBlock = contentBlocks.find(block => block.blockType === 'hero');
  const paragraphBlocks = contentBlocks.filter(block => block.blockType === 'paragraph');
  const listBlocks = contentBlocks.filter(block => block.blockType === 'list');
  const imageBlocks = contentBlocks.filter(block => block.blockType === 'image');
  
  // Debug: Log image blocks
  console.log('Image blocks:', imageBlocks);
  console.log('All content blocks:', contentBlocks);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      {heroBlock && (
        <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Home className="w-4 h-4" style={{ color: color1 }} />
              Campus Living
            </div>
            <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              {heroBlock.content.title}
            </h1>
            {heroBlock.content.subtitle && (
              <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {heroBlock.content.subtitle}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About Hostel Section */}
        {paragraphBlocks.find(block => block.blockId === 'about-hostel') && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              About Our Hostels
            </h2>
            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {paragraphBlocks.find(block => block.blockId === 'about-hostel').content.text}
            </p>

            {/* Facilities List */}
            {listBlocks.find(block => block.blockId === 'hostel-facilities') && (
              <div className="mt-8">
                <h3 className={`text-xl font-bold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  Hostel Facilities
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {listBlocks.find(block => block.blockId === 'hostel-facilities').content.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: color1 }} />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Boys Hostel Info */}
        {paragraphBlocks.find(block => block.blockId === 'boys-hostel-info') && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8" style={{ color: color1 }} />
              <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                Boys Hostel
              </h2>
            </div>
            <div className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {paragraphBlocks.find(block => block.blockId === 'boys-hostel-info').content.text}
            </div>
          </div>
        )}

        {/* Girls Hostel Info */}
        {paragraphBlocks.find(block => block.blockId === 'girls-hostel-info') && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8" style={{ color: color1 }} />
              <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                Girls Hostel
              </h2>
            </div>
            <div className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {paragraphBlocks.find(block => block.blockId === 'girls-hostel-info').content.text}
            </div>
          </div>
        )}

        {/* Hostel Rules */}
        {paragraphBlocks.find(block => block.blockId === 'hostel-rules') && (
          <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} style={{ borderColor: `${color1}20` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-8 h-8" style={{ color: color1 }} />
              <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                Hostel Rules & Guidelines
              </h2>
            </div>
            <div className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {paragraphBlocks.find(block => block.blockId === 'hostel-rules').content.text}
            </div>
          </div>
        )}

        {/* Display all other paragraph blocks that don't have specific IDs */}
        {paragraphBlocks
          .filter(block => !['about-hostel', 'boys-hostel-info', 'girls-hostel-info', 'hostel-rules'].includes(block.blockId))
          .map((block, index) => (
            <div 
              key={block.blockId || index}
              className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
              style={{ borderColor: `${color1}20` }} 
              onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
              onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}
            >
              {block.content.title && (
                <h2 className="text-2xl font-bold mb-4" style={{ color: color1 }}>
                  {block.content.title}
                </h2>
              )}
              <div className={`text-base leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {block.content.text}
              </div>
            </div>
          ))}

        {/* Hostel Images Gallery */}
        {imageBlocks.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Hostel Facilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {imageBlocks.map((block, index) => (
                <div
                  key={index}
                  className={`rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <img
                    src={API.getImageUrl(block.content.src || block.content.url)}
                    alt={block.content.alt || `Hostel facility ${index + 1}`}
                    className="w-full h-64 object-cover"
                    onError={(e) => e.currentTarget.src = `https://placehold.co/600x400/${color1.replace('#', '')}/ffffff?text=Hostel+Facility`}
                  />
                  {block.content.caption && (
                    <div className="p-4">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {block.content.caption}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Available */}
        {hostelData?.customFields?.services && hostelData.customFields.services.length > 0 && (
          <div className={`mb-12 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              Services Available
            </h2>
            <ul className="space-y-2">
              {hostelData.customFields.services.map((service, index) => (
                <li key={index} className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {service}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Hostel Administration - Dynamic from facilities API */}
        {hostelData?.wardens && hostelData.wardens.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Hostel Administration
            </h2>
            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              {hostelData.wardens.map((warden, index) => (
                <WardenCard key={index} warden={warden} color1={color1} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}

        {/* Halls of Residence - Girls - Table Format */}
        {hostelData?.halls && hostelData.halls.filter(h => h.gender === 'Girls').length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Halls of Residence (Girls) - {hostelData.halls.find(h => h.hostelName)?.hostelName || 'Anamudi Hostel, Chittar Hostel, Manimala Hostel Block A'}
            </h2>
            
            {/* Hostel Images if available */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={`https://placehold.co/300x200/${color1.replace('#', '')}/ffffff?text=Hostel+${num}`}
                    alt={`Girls Hostel ${num}`}
                    className="w-full h-32 object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Wardens Table */}
            <div className="overflow-x-auto">
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg rounded-lg overflow-hidden`}>
                <thead style={{ backgroundColor: color1 }}>
                  <tr>
                    <th className="px-4 py-3 text-left text-white font-semibold">#</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Name & Photo</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Role</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Contact</th>
                    <th className="px-4 py-3 text-left text-white font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {hostelData.halls.filter(h => h.gender === 'Girls').map((hall, index) => (
                    <tr key={index} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <td className={`px-4 py-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{index + 1}</td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={hall.image || `https://placehold.co/100x100/${color1.replace('#', '')}/ffffff?text=${hall.name.charAt(0)}`}
                            alt={hall.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{hall.name}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{hall.wardenType}</td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{hall.contact}</td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{hall.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hostel Care Taker Info */}
            {hostelData?.customFields?.hostelCareTaker && (
              <div className={`mt-4 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Hostel Care Taker: {hostelData.customFields.hostelCareTaker}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Halls of Residence - Boys */}
        {hostelData?.halls && hostelData.halls.filter(h => h.gender === 'Boys').length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: color1 }}>
              Halls of Residence (Boys)
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostelData.halls.filter(h => h.gender === 'Boys').map((hall, index) => (
                <HallCard key={index} hall={hall} color1={color1} darkMode={darkMode} />
              ))}
            </div>
          </div>
        )}

        {/* Mess Committee */}
        {hostelData?.customFields?.messCommittee && hostelData.customFields.messCommittee.length > 0 && (
          <div className={`mb-12 p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
              Mess Committee
            </h2>
            <div className="space-y-4">
              {hostelData.customFields.messCommittee.map((member, index) => (
                <div key={index} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {member.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {member.role}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email: {member.email}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone: {member.phone}
                  </p>
                </div>
              ))}
              <p className={`text-sm italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                (Kindly contact/write to the FIC/Associate FICs for all mess-related inquiries/grievances)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
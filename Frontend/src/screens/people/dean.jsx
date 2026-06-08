import React, { useEffect, useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import RotatingDetails from '../../components/RotatingDetails.jsx';

const ProfileCard = ({ person, color1, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${isHovered ? 'shadow-2xl transform -translate-y-1' : 'shadow-lg'} ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ border: `2px solid ${darkMode ? '#374151' : '#E5E7EB'}` }}
    >
      <div className="relative p-3 pb-12" style={{ background: `linear-gradient(135deg, ${color1}, ${color1}ee)` }}>
        <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white opacity-10 transform translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white opacity-10 transform -translate-x-8 translate-y-8" />
        <h3 className="text-base font-bold text-white relative z-10 mb-1">{person.name}</h3>
      </div>

      <div className="flex justify-center" style={{ marginTop: '-45px' }}>
        <div className={`rounded-full p-1 transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.25)' : '0 4px 12px rgba(0,0,0,0.15)' }}>
          <img
            src={person.image}
            alt={person.name}
            className={`w-20 h-20 rounded-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
            onError={(e) => { e.currentTarget.src = `https://placehold.co/112x112/22a05e/ffffff?text=${person.name?.charAt(0) || 'D'}`; }}
          />
        </div>
      </div>

      <div className="px-3 pb-3 pt-2">
        <div className="text-center mb-2">
          <h4 className={`text-sm font-bold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>{person.title}</h4>
          {person.roles?.map((role, index) => (
            <p key={index} className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} leading-tight`}>{role}</p>
          ))}
        </div>

        <div className={`h-px w-full mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <RotatingDetails person={person} color1={color1} darkMode={darkMode} />
      </div>
    </div>
  );
};

export default function Deans() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [sortOrder, setSortOrder] = useState('newest');

  const getDeanImage = (person) => {
    const imageSource = person.photo || person.image || person.photoUrl || person.profileImage;
    return API.getImageUrl(imageSource) || `https://placehold.co/128x128/22a05e/ffffff?text=${person.name?.charAt(0) || 'D'}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deansRes, settingsRes] = await Promise.all([
          fetch(`${API.baseURL}/api/people/type/deans?t=${Date.now()}`),
          fetch(`${API.baseURL}/api/site-settings?category=deans&t=${Date.now()}`).catch(err => {
            console.error('Error fetching settings:', err);
            return null;
          })
        ]);

        const data = await deansRes.json();
        if (data?.success && Array.isArray(data.data)) {
          const transformed = data.data
            .filter((person) => person.isActive !== false)
            .map((person) => ({
              id: person.id,
              name: person.name || 'Unknown',
              title: person.designation || 'Dean',
              roles: [person.department, person.specialization].filter(Boolean),
              email: person.email || 'N/A',
              phone: person.phone || 'N/A',
              phone2: person.phone2 || '',
              qualification: person.qualification || 'N/A',
              department: person.department || 'N/A',
              specialization: person.specialization || 'N/A',
              experience: person.experience || 'N/A',
              room: person.qualification || 'N/A',
              image: getDeanImage(person),
              category: 'general'
            }));
          setDeans(transformed);
        } else {
          setDeans([]);
        }

        if (settingsRes && settingsRes.ok) {
          const settingsData = await settingsRes.json();
          if (settingsData.success && settingsData.settings) {
            setSortOrder(settingsData.settings['deans_sort']?.value || 'newest');
          }
        }
      } catch (error) {
        console.error('Error fetching deans:', error);
        setDeans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const filtered = deans.filter((person) => {
      const searchableText = [
        person.name,
        person.title,
        person.email,
        person.phone,
        person.phone2,
        person.room,
        ...(person.roles || [])
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return searchableText.includes(term);
    });

    return filtered.sort((a, b) => {
      return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
    });
  }, [deans, searchTerm, sortOrder]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="mx-auto py-8 px-6 max-w-full">
        <div className="mb-10 max-w-2xl mx-auto">
          <div className={`relative rounded-2xl p-4 shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: darkMode ? `${color1}99` : color1 }} />
            <input
              type="search"
              placeholder="Search by name, designation, department, email, phone, or qualification..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 transition-all duration-300 ${darkMode ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400 focus:border-green-500' : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-green-500'} focus:ring-0 focus:outline-none`}
            />
          </div>
        </div>

        <div className="space-y-12">
          {loading ? (
            <div className={`text-center p-12 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }} />
              <p className={`mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading dean data...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredResults.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredResults.map((person) => (
                    <ProfileCard key={person.id} person={person} color1={color1} darkMode={darkMode} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 rounded-2xl border border-dashed" style={{ borderColor: darkMode ? '#374151' : '#D1D5DB' }}>
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {searchTerm ? 'No results found' : 'No dean records found'}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

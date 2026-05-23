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
            onError={(e) => { e.currentTarget.src = `https://placehold.co/112x112/22a05e/ffffff?text=${person.name?.charAt(0) || 'A'}`; }}
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

export default function AssociateDeans() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [associates, setAssociates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAssociateDeans = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/people/type/associate-dean`);
        const data = await response.json();

        if (data?.success && Array.isArray(data.data)) {
          const transformed = data.data
            .filter((person) => person.isActive !== false)
            .map((person) => ({
              id: person.id,
              name: person.name || 'Unknown',
              title: person.designation || 'Associate Dean',
              roles: [person.department, person.specialization].filter(Boolean),
              email: person.email || 'N/A',
              phone: person.phone || 'N/A',
              qualification: person.qualification || 'N/A',
              department: person.department || 'N/A',
              specialization: person.specialization || 'N/A',
              experience: person.experience || 'N/A',
              room: person.qualification || 'N/A',
              image: API.getImageUrl(person.photo) || `https://placehold.co/128x128/22a05e/ffffff?text=${person.name?.charAt(0) || 'A'}`,
              category: 'general'
            }));
          setAssociates(transformed);
        } else {
          setAssociates([]);
        }
      } catch (error) {
        console.error('Error fetching associate deans:', error);
        setAssociates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociateDeans();
  }, []);

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return associates.filter((person) => (
      person.name.toLowerCase().includes(term) ||
      person.title.toLowerCase().includes(term) ||
      person.email.toLowerCase().includes(term) ||
      person.roles.some((role) => role.toLowerCase().includes(term))
    ));
  }, [associates, searchTerm]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="mx-auto py-8 px-6 max-w-full">
        <div className="mb-6 flex items-center gap-3">
          <Search className="w-5 h-5" style={{ color: color1 }} />
          <input
            type="search"
            placeholder="Search by name, title, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 px-4 py-2 rounded-lg border transition ${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-300 text-black'} focus:outline-none`}
            style={{ borderColor: color1, borderWidth: '2px' }}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((person) => (
              <ProfileCard key={person.id} person={person} color1={color1} darkMode={darkMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{searchTerm ? 'No results found' : 'No associate deans found'}</p>
          </div>
        )}
      </div>
    </div>
  );
}

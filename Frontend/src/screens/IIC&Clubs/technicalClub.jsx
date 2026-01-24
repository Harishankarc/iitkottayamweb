import { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import { Code2, Users, Mail, Trophy, Lightbulb, Camera, AlertCircle, Loader } from 'lucide-react';
import API from '../../api/api.jsx';

const MemberCard = ({ name, email, isCoordinator = false }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        darkMode
          ? `bg-gray-800 border-gray-700 hover:border-${API.color1} hover:shadow-lg`
          : `bg-white border-gray-200 hover:border-${API.color1} hover:shadow-lg`
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = API.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {name}
          </h4>
          {email && (
            <p className={`text-sm flex items-center gap-2 mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail size={16} />
              {email}
            </p>
          )}
        </div>
        {isCoordinator && (
          <span
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: API.color1 }}
          >
            FIC
          </span>
        )}
      </div>
    </div>
  );
};

const EventCard = ({ title, description, participants, achievement }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-5 rounded-lg border-2 transition-all duration-300 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = API.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h4 className={`font-semibold text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h4>
      <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
      {participants && (
        <p className={`text-sm font-medium flex items-center gap-2 mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <Users size={16} />
          {participants}
        </p>
      )}
      {achievement && (
        <p className={`text-sm flex items-center gap-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ color: API.color1 }}>
          <Trophy size={16} />
          {achievement}
        </p>
      )}
    </div>
  );
};

const ImageGallery = ({ count = 6 }) => {
  const { darkMode } = useTheme();
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`aspect-square rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'
          }`}
          style={{
            borderColor: darkMode ? '#374151' : '#d1d5db',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = API.color1;
            e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = darkMode ? '#374151' : '#d1d5db';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Camera className={darkMode ? 'text-gray-600' : 'text-gray-400'} size={32} />
        </div>
      ))}
    </div>
  );
};

export default function TechnicalClub() {
  const { darkMode } = useTheme();
  const [clubData, setClubData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API.baseURL}/api/clubs/slug/coding-club`);
        const data = await response.json();
        
        if (data.success) {
          setClubData(data.data);
        } else {
          setError(data.message || 'Failed to load club data');
        }
      } catch (err) {
        console.error('Error fetching club data:', err);
        setError('Failed to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const fetchClubData = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/clubs/slug/coding-club`);
        const data = await response.json();
        
        if (data.success) {
          setClubData(data.data);
        } else {
          setError(data.message || 'Failed to load club data');
        }
      } catch (err) {
        console.error('Error fetching club data:', err);
        setError('Failed to connect to server. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchClubData();
  };

  // Loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <Loader className={`w-12 h-12 animate-spin mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ color: API.color1 }} />
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Loading club information...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto px-6">
          <AlertCircle className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
          <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Oops! Something went wrong</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: API.color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Code2 className="w-4 h-4" style={{ color: API.color1 }} />
            Technical Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            {clubData?.name || 'Beta Labs'}
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {clubData?.description || 'Inspiring innovation through technical excellence and collaborative learning'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* Introduction */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = API.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Lightbulb size={28} style={{ color: API.color1 }} />
              About {clubData?.name || 'Beta Labs'}
            </h2>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              {clubData?.description || "Beta Labs is the students' technical club of IITT Kottayam, intended to increase the interaction of our students with the research world by creating a platform to inspire students and to familiarize them with the booming opportunities around them. Students are updated with the contemporary works of research and technology through group discussions, seminars, and other activities throughout the year. They experience hands-on sessions in the current hot domains of research by working on self-designed projects in small groups. Weekly gatherings are held to analyze and evaluate their progress."}
            </p>
            <p className={`text-base leading-relaxed mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <strong>Vision:</strong> The activities of the club motivate self-learning and sharing information amongst peers enabling students to widen the horizon of knowledge whilst sharpening their skills.
            </p>
            {clubData?.coordinator && (() => {
              try {
                const coordinator = typeof clubData.coordinator === 'string' ? JSON.parse(clubData.coordinator) : clubData.coordinator;
                return (
                  <p className={`text-base leading-relaxed mt-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                    <strong>Email:</strong> <a href={`mailto:${coordinator.email}`} style={{ color: API.color1 }} className="hover:underline">{coordinator.email}</a>
                  </p>
                );
              } catch (e) {
                return null;
              }
            })()}
          </div>

          {/* Faculty Coordinators */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Faculty Coordinators
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MemberCard name="Dr. Santhos Kumar" isCoordinator={true} />
              <MemberCard name="Dr. Sravah Bellankonda" isCoordinator={true} />
              <MemberCard name="Dr. Salei C" isCoordinator={true} />
              <MemberCard name="Dr. Chakradhar Padamutham" isCoordinator={true} />
              <MemberCard name="Dr. Priyadarshini S" isCoordinator={true} />
            </div>
          </div>

          {/* Student Mentors */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Code2 size={28} style={{ color: API.color1 }} />
              Student Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MemberCard 
                name="Anishumohan Acharya" 
                email="anishumohan25bcj19@iittkottayam.ac.in"
              />
              <MemberCard 
                name="Sriharsha Bodicherla" 
                email="sriharsha23bcd1@iittkottayam.ac.in"
              />
            </div>
          </div>

          {/* Coding Achievements */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Trophy size={28} style={{ color: API.color1 }} />
              IIIT Kottayam Students - Coding Performance
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${API.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Sl. No.
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Coding Event
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Student Participants
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Achievement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      1
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="font-semibold mb-1">Google Summer of Code (2018 & 2020)</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        A student qualified in Google Summer of Coding for two years with total cash award of ₹5400.
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mr. Rahul Badami
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold`} style={{ color: API.color1 }}>
                      ₹5400 cash award
                    </td>
                  </tr>
                  
                  <tr className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      2
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="font-semibold mb-1">GHOME Settings Platform Development</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Two students qualified in Google Summer of Coding to Create a New 'System' panel. Work on the GNOME Settings under the Mentorship of Felipe Borges and to make GNOME platform demos for Workspace has been accepted by Org GNOME Foundation with a stipend of ₹5000 each.
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mr. Gotam Gorash (20bcs173)<br />
                      Mr. Akshay Warrier (21bcs8)
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold`} style={{ color: API.color1 }}>
                      ₹5000 stipend each
                    </td>
                  </tr>

                  <tr className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      3
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="font-semibold mb-1">Smart India Hackathon 2022 - 1st Prize</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        A team of students bagged 1st prize in the prestigious Smart India Hackathon 2022 with a cash award of Rs. 1 Lakh.
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Team Lead: Aaditi (2021BEC006)
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold`} style={{ color: API.color1 }}>
                      ₹1 Lakh
                    </td>
                  </tr>

                  <tr className={`border-b transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      4
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="font-semibold mb-1">Vimarsh National 5G Hackathon</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        A PhD scholar participated in Vimarsh National 5G Hackathon PS2 organized by IMA, BPSRD and TCOE India and received 4 lakh support, including 1.5 lakh prize money from the Home Secretary of India at the event held at the Ministry of Home Affairs (MHA), New Delhi.
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Mr. Anurop K B
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold`} style={{ color: API.color1 }}>
                      ₹4 Lakh support<br />(₹1.5 Lakh prize)
                    </td>
                  </tr>

                  <tr className={`transition-colors ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'}`}>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      5
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="font-semibold mb-1">Smart India Hackathon - 1st Prize</div>
                      <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Two teams of students bagged 1st prize in the prestigious Smart India Hackathon.
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Team: Sons of Pitches<br />
                      Ms. Harini T (Lead)<br />
                      Mr. Shashank Kumar Srivastava<br />
                      Mr. Ishaan Mahesh<br />
                      Mr. Akarsh Pandey<br />
                      Mr. Divyansh Panwar
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold`} style={{ color: API.color1 }}>
                      1st Prize
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Camera size={28} style={{ color: API.color1 }} />
              Gallery
            </h2>
            <ImageGallery count={9} />
          </div>

        </div>
      </section>
    </div>
  );
}
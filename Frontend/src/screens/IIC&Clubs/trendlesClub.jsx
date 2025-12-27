import { useTheme } from '../../context/createContext.jsx';
import { BookOpen, Users, Mail, Sparkles, Camera, Calendar } from 'lucide-react';
import API from '../../api/api.jsx';

const MemberCard = ({ name, email }) => {
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
      </div>
    </div>
  );
};

const FICCard = ({ member }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
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
      <div className="text-center">
        <div 
          className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${API.color1}20` }}
        >
          <Users className="w-8 h-8" style={{ color: API.color1 }} />
        </div>
        <h4 className={`font-semibold text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {member.name}
        </h4>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {member.role}
        </p>
      </div>
    </div>
  );
};

const ImageGallery = ({ title, count = 9 }) => {
  const { darkMode } = useTheme();
  return (
    <div className="mb-8">
      {title && (
        <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
      )}
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
    </div>
  );
};

export default function TrendlesClub() {
  const { darkMode } = useTheme();

  const ficMembers = [
    { name: 'Dr. S.Mohakud', role: 'Trendles Club FIC' },
    { name: 'Dr. John Paul Martin', role: 'Trendles Club FIC' },
    { name: 'Dr. Sangeetha A.Shenoi', role: 'Trendles Club FIC' }
  ];

  const mentors = [
    { name: 'Mr. Pradeep Somalraju', email: 'pradeep21bcd1@iiittkottayam.ac.in' },
    { name: 'Mr. Avush Raj', email: 'avush22bcs17@iiittkottayam.ac.in' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <BookOpen className="w-4 h-4" style={{ color: API.color1 }} />
            Literary & Social Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Trendles Club
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            "When 'I' is replaced by 'We' even illness becomes Wellness"
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* About Section */}
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
              <Sparkles size={28} style={{ color: API.color1 }} />
              About Trendles Club
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                This is an official social club of IIIT Kottayam, that focuses on social impact of IIIT Kottayam by organizing various programs round the year. Some notable events include: Savitribai R.Phule, Children's Day, PEHCHAAN (the fashion show), World Literacy Day, Environment Day among others.
              </p>
              <p>
                This club is a union various sub-clubs like Obliteuse (for photography), Literary club (for quizzes and appreciating literary works), Manga club etc., The Trendles Club of IIIT Kottayam is a vibrant and learning community engagement and social responsibility among students. The club organizes a wide array of activities, including charity drives, community service projects, and events aimed at fostering a sense of social awareness and empathy. These initiatives aim to promote a sense of civic duty, intellectual curiosity, and creative expression, creating a well-rounded and socially aware student body.
              </p>
              <p>
                Beyond the social contributions, the Trendles Club also envisions a positive impact with events such as fashion shows, fun events, the Secret Grill service to make a positive impact both within the campus and in the broader community.
              </p>
              <p>
                Be it Ashoka a freshers' night to welcome freshers, or renaissance or lndla Pakistan Partition Day division, or Environmental Day celebrations or flash mobbing or conducting quizzes or December festivities, Trendles club Is here to help bring out the joy in you and has the deep root !
              </p>
              <p>
                Join hands with us, get refreshed, feel content and feel responsible with the wide-spread social activities of the Trendles club.
              </p>
            </div>
          </div>

          {/* Faculty In-Charge */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Trendles Club FIC
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ficMembers.map((member, index) => (
                <FICCard key={index} member={member} />
              ))}
            </div>
          </div>

          {/* Mentors */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              {mentors.map((mentor, index) => (
                <MemberCard key={index} name={mentor.name} email={mentor.email} />
              ))}
            </div>
            <p className={`text-sm mt-4 italic ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Some glimpses of the events conducted:
            </p>
          </div>

          {/* Gallery - Agony 2025 */}
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
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={28} style={{ color: API.color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Agony 2025
              </h2>
            </div>
            <ImageGallery count={9} />
          </div>

          {/* Gallery - Blood Donation Camp 2025 */}
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
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={28} style={{ color: API.color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Blood Donation Camp 2025
              </h2>
            </div>
            <ImageGallery count={6} />
          </div>

          {/* Additional Events Gallery */}
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
            <div className="flex items-center gap-3 mb-6">
              <Camera size={28} style={{ color: API.color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Events Gallery
              </h2>
            </div>
            <ImageGallery count={12} />
          </div>

        </div>
      </section>
    </div>
  );
}
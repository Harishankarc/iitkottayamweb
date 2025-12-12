import { useTheme } from '../../context/createContext.jsx';
import { Trophy, Users, Mail, Target, Dumbbell, Camera, Award } from 'lucide-react';
import API from '../../api/api.jsx';

const MemberCard = ({ name, email, role }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
        darkMode
          ? `bg-gray-800 border-gray-700 hover:border-${api.color1} hover:shadow-lg`
          : `bg-white border-gray-200 hover:border-${api.color1} hover:shadow-lg`
      }`}
      style={{
        borderColor: darkMode ? '#374151' : '#e5e7eb',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = api.color1;
        e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
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
          {role && (
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {role}
            </p>
          )}
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
            e.currentTarget.style.borderColor = api.color1;
            e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
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

export default function SportsClub() {
  const { darkMode } = useTheme();

  const sportsActivities = [
    'Cricket', 'Badminton', 'Football', 'Table Tennis', 'Throwball', 'Volleyball'
  ];

  const achievements = [
    {
      slNo: 1,
      achievement: 'Winners, Volleyball(Boys)',
      names: 'Vigneshwaran Murthy(2020Captain), Harish Kumar(2020Captain), Minhaj(2020), Y Karthik (2021), Medhe vipin (2021), Murali (2021), Krishnendhu(2021), Aniruddh Kumar (2021), Ram waksh nalyaiya(2021), Vishnu P(2022), Baladhreiya Sakthivadalam(2021), Brijesh dadve (2021)',
      event: 'INTER IIIT SPORTS MEET 2024, IIIT Allahabad'
    },
    {
      slNo: 2,
      achievement: 'Gold Medal, Powerlifting above 83 kg',
      names: 'Aneep',
      event: ''
    },
    {
      slNo: 3,
      achievement: 'Bronze Medal, Powerlifting under 83 kg',
      names: 'Aneep',
      event: ''
    },
    {
      slNo: 4,
      achievement: 'Silver Medal, Cricket(Boys)',
      names: 'Ajay Kashav',
      event: ''
    },
    {
      slNo: 5,
      achievement: 'Gold Medal, Powerlifting above 83',
      names: 'Aneep',
      event: ''
    },
    {
      slNo: 6,
      achievement: 'Fourth Position, Cricket',
      names: 'Cricket Team',
      event: ''
    },
    {
      slNo: 7,
      achievement: 'Bronze Medal, (Boys)',
      names: 'Sri Wast Captain, Sarikesh, Darsh',
      event: ''
    },
    {
      slNo: 8,
      achievement: 'Winner, Power Lifting above 83 kg',
      names: 'Aadeesh Singh',
      event: 'Inter IIIT Sports Meet 2023, IIITDM Kanchepuram'
    },
    {
      slNo: 9,
      achievement: 'Bronze, Power lifting (Girls)',
      names: 'Aadhiraa Jain, Anoushka Dalbale',
      event: ''
    },
    {
      slNo: 10,
      achievement: 'Bronze (Girls) Throw ball',
      names: 'Team',
      event: ''
    },
    {
      slNo: 11,
      achievement: 'Bronze Medal, Table Tennis (Boys)',
      names: 'Akhil (2016 Batch), Savmyak (2017 Batch) and Antony (2019 Batch)',
      event: 'Inter IIIT Sports meet 2020, IIIT Jabalpur'
    },
    {
      slNo: 12,
      achievement: 'Bronze Medal, Shotput (Boys)',
      names: 'Vishnu, M of 2018 Batch',
      event: ''
    },
    {
      slNo: 13,
      achievement: 'Silver Medal, Shotput (Girls)',
      names: 'Aadhiraa of 2018 batch',
      event: ''
    },
    {
      slNo: 14,
      achievement: 'Bronze Medal, Shotput (Girls)',
      names: 'Anoushka of 2018 batch',
      event: 'Inter IIIT Sports meet 2019, IIIT Allahabad'
    },
    {
      slNo: 15,
      achievement: 'Gold Medal, Carrom Doubles (Girls)',
      names: 'Ramya and Shamita of 2016 batch',
      event: ''
    },
    {
      slNo: 16,
      achievement: 'Bronze Medal, Carrom Doubles (Boys)',
      names: 'Prem Nayak of 2016 batch',
      event: 'Inter IIIT Sports meet 2018, IIIT Gwalior'
    },
    {
      slNo: 17,
      achievement: 'Gold Medal, Chess (Girls)',
      names: 'Sangeetha Swathi of 2017 batch',
      event: ''
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
            <Trophy className="w-4 h-4" style={{ color: api.color1 }} />
            Sports Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Sports Club
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            "Sports do not build Character, they Reveal it."
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
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Target size={28} style={{ color: api.color1 }} />
              About Sports Club
            </h2>
            <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Sports Club encourages students to develop their skills in all kinds of sports. The club mainly aims to develop the character of sportsmanship among students. We ensure support mentorship and facilities students need when it comes to sports. Play well and stay healthy because mental strength alone is not enough for an individual to be perfect. Sports and games make you feel excited and brings out the best in you.
            </p>
            <p className={`text-base leading-relaxed mt-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <strong>Faculty In-Charge:</strong> Dr. A. Anenth
            </p>
            <p className={`text-base leading-relaxed mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <strong>Physical Education Instructor:</strong> Mr. Priya Nair K
            </p>
          </div>

          {/* Tagline & Events */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
              style={{
                borderColor: darkMode ? '#374151' : '#e5e7eb',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = api.color1;
                e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Dumbbell size={24} style={{ color: api.color1 }} />
                Tagline
              </h3>
              <p className={`text-base italic ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                "Sports do not build Character, they Reveal it."
              </p>
            </div>

            <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}
              style={{
                borderColor: darkMode ? '#374151' : '#e5e7eb',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = api.color1;
                e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <h3 className={`text-xl font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <Trophy size={24} style={{ color: api.color1 }} />
                Sports Activities
              </h3>
              <div className="flex flex-wrap gap-2">
                {sportsActivities.map((sport, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: api.color1 }}
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className={`p-8 rounded-lg border-2 transition-all duration-300 ${
            darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
            style={{
              borderColor: darkMode ? '#374151' : '#e5e7eb',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = api.color1;
              e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              About Sports Events
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                Sports Club aims to support the students and facilitate in their participation in competitive physical activities or games which, through casual or organized participation, aim to use, maintain or improve physical ability and skills while providing engagement and entertainment to participants and, in some cases, spectators. Sports Club provides and participate in many sports such as Cricket, Badminton, Football, Table Tennis, Throwball, Volleyball and many other indoor games.
              </p>
              <p>
                Cricket ground is available in our institute to conduct all outdoor games, football and badminton. It is famished with cricket and football grounds. And on the weekends, students have access to 2 LNCPE indoor badminton courts. Sports in IIIT Kottayam are well developed at the institute. Inter College & Inter Institute competitions such as Inter IIIT are held every year. After classes end, each day, students can practice cricket, football and badminton at the ground. Sports Club hosts various sports events and coordinates intercollegiate and Inter Institute events.
              </p>
              <p>
                Sports Club provides equipment to the students for whatever sport they are interested in. Coming to our past events, Sports Club has hosted 3 sports meets till now. One in Anand College of Engineering Kaithacode which was held for the students participating with Anand College. The other two events organized by us are Inter IIIT which more importantly, IIIT Kottayam participated in the latest Inter IIT. The Participation for the inter IIIT has increased every year.
              </p>
              <p>
                The students made a name for themselves and brought fame to our college. Our players secured 1 Gold medal in chess, 1 gold medal in carrom& 1 silver medal in carrom& 2 bronze medals in shot put and in table tennis and power lifting associated with all the facilities. Sports Club is aiming to provide the students of IIIT Kottayam with all the facilities, good sports amenities and complete sports equipment. Students in IIIT Kottayam are well associated with all the facilities.
              </p>
              <p>
                Many Gold medals as possible in the sports meets which will be conducted in the future. Sports Club ensures the students of IIIT Kottayam all the support, motivation and facilities well past over and above the expectations with over 30 students playing. Play well and stay healthy, because mental strength alone is not enough for an individual to be perfect. Sports and games make you feel excited and brings out the best in you.
              </p>
            </div>
          </div>

          {/* Mentor */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: api.color1 }} />
              Mentor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <MemberCard 
                name="Sethilan Narathi Reddy" 
                email="sethilan22bcs195@iiittkottayam.ac.in"
              />
            </div>
          </div>

          {/* Achievements in Sports */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Award size={28} style={{ color: api.color1 }} />
              Achievements in Sports
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${api.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Sl. No.
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Achievement
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Name of Students
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Sport Event
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.map((item, index) => (
                    <tr 
                      key={item.slNo}
                      className={`${index !== achievements.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.slNo}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.achievement}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.names}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {item.event || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Gallery */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Camera size={28} style={{ color: api.color1 }} />
              Gallery
            </h2>
            <ImageGallery count={12} />
          </div>

        </div>
      </section>
    </div>
  );
}
import { useTheme } from '../../context/createContext.jsx';
import { Zap, Users, Mail, Award, Calendar, ExternalLink, FileText, Download } from 'lucide-react';
import API from '../../api/api.jsx';

const MemberCard = ({ name, role }) => {
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
      <h4 className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h4>
      {role && (
        <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {role}
        </p>
      )}
    </div>
  );
};

const EventCard = ({ title, date, description, isUpcoming = false }) => {
  const { darkMode } = useTheme();
  return (
    <div
      className={`p-6 rounded-lg border-2 transition-all duration-300 ${
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
      {isUpcoming && (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-3 inline-block">
          Upcoming
        </span>
      )}
      <h4 className={`font-semibold text-lg mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h4>
      <p className={`text-sm mb-3 flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <Calendar size={16} />
        {date}
      </p>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {description}
      </p>
    </div>
  );
};

export default function IEEEStudentBranch() {
  const { darkMode } = useTheme();

  const counselors = [
    { name: 'Dr. Nishaad Panackal', role: 'Professor', profile: 'Profile' },
    { name: 'Dr. Kala K.Asst.', role: 'Professor', profile: 'Profile' },
    { name: 'Dr. Nandini J. Warrier', role: 'Asst. Professor', profile: 'Profile' }
  ];

  const officeBoard = [
    { name: 'Mr. Dinakeshna Yeshwanth', role: 'Chair' },
    { name: 'Mr. Anirudha', role: 'Vice Chair' },
    { name: 'Mr. Piyush Garg', role: 'Secretary' },
    { name: 'Mr. Christopher', role: 'Treasurer' },
    { name: 'Mr. Aviz Aditya Kannan', role: 'Webmaster' },
    { name: 'Mr. Debasish Sahoo', role: 'Webmaster' },
    { name: 'Mr. Akash', role: 'Graphic Designer' }
  ];

  const events = [
    {
      title: 'IEEE SICEAM 2024 (6th Signal Processing, Informatics, Communication and Energy Systems)',
      date: '20th and 21st September, 2024',
      description: 'IEEE International Conference on Signal Processing, Informatics, Communication and Energy Systems (SICEAM), scheduled to take place in Kottayam district, Kerala, India during 20-22 September 2024. It is a platform for technical exchange amongst researchers from academia, research laboratories, and industries in various emerging fields of Signal Processing, Communication, Computer Science, Energy Systems, Infrastructure & Control Systems, Robotics and Smart Cities and so on. The technical program includes keynote speeches, plenary talks, regular technical sessions, and special sessions.',
      isUpcoming: true
    },
    {
      title: 'IEEE SENSE 2024 (International Conference on Smart Electronics and Communication Systems)',
      date: '6th and 7th December, 2024',
      description: 'The 2024 International Conference on Smart Electronics and Communication Systems (SENSE 2024) will take place in Kottayam Kerala, India on 6-7 December 2024. It brings together researchers from industry and government to come together to share and learn about state of the art developments in the field. Smart solutions are the need of the hour for sustainable development. SENSE 2024 is for true conference think werswank in the department of Electronic and Communication Engineering, IIIT Kottayam. SENSE 2024 encourages the young researchers to project their innovative ideas and involve in sharing research outputs on various cutting-edge technologies in Kottayam in association with IEEE Kerala section.',
      isUpcoming: true
    },
    {
      title: '1 Summer workshop on Hands-on Training in EDA and Electronic and Circuit Simulators (ESaCS)',
      date: 'Summer 2024',
      description: 'The one-week summer workshop aims to provide comprehensive understanding of fundamental simulators - circuit simulators, electronic system simulators and device model simulators. The workshop will feature the participation of leading amwork in the state of the art techniques of RF and Microwave circuit and system. It comprise hands on sessions with electromagnetic and circuit simulation such as AnyeKE Office tool, flowerlot in the circuit optimization and novel design methodology from circuit level to smart level with RF frequency equipment.',
      isUpcoming: false
    }
  ];

  const programs = [
    {
      title: '1 day webinar series titled "Exploring Research Career Paths in Computer Science and Electronics & Communication Engineering (ERCEP in CS & EC)',
      date: '27th May, 2024 to 29th May, 2024',
      description: 'Department of Computer Science and Engineering organized a 3 day webinar series from May 27th to 29th, 2024, on the topic "Exploring Research Career Paths in Computer Science and Electronics & Communication Engineering," in association with IEEE Kerala and IEEE SB IIIT Kottayam. The series aimed to provide insights into higher education and research opportunities abroad.'
    },
    {
      title: '1 Day Online FDP on "Recent Trends in VLSI and MEMS"',
      date: '3 June to 7 June 2024',
      description: 'CAS Society/This programme offers a fascinating opportunity to discuss the recent advances in recent years and reincarnation of VLSI in MEMS and Instittites curates resources in VLSI and MEMS are revuitualizathew electronics, as well as the internet of things.'
    },
    {
      title: 'One day seminar lecture on "Microwave to Terahertz: A Paradigm Shift" and IEEE Membership Awareness Drive',
      date: '24th February, 2024',
      description: 'Successfully conducted by IEEE membership drive in association with a one-day seminar lecture on "Microwave to Terahertz: A Paradigm Shift delivered by Dr.Duncan Chebbiyamthey Senior Scientist, at: Propulsion Lab, NASA and IEEE Microwave Theory & Technology Society Practical Event 2025.'
    },
    {
      title: '1 Day Hands-On Workshop on VLSI Frontside and Backvision Tools using with a one-day seminar lecture on Societyin',
      date: 'March 2024',
      description: 'This literature Workshop on Indigenous RISC V Processor Design using VLSI Tools, conducted by IEEE at IIIT Kottayam. The workshop focused on the comprehensive understanding of the processor, development boards SDK, and applications. Hands-on sessions will be conducted on AIES3 boards which are compatible with ARIANO.'
    },
    {
      title: '3-day workshop on Nuclear Computing Paradigms for Big Data Applications',
      date: 'June 5-7, 2024',
      description: 'JMC PMS workshop offers an exciting training experience where attendees will learn to leverage the AWS ecosystem to tackle real-world challenges in the programme and discuss latest computing paradigms including data generation to storage and analysis.'
    },
    {
      title: 'The 5th International Conference on Innovative Trends in Information Technology (ICTITT24)',
      date: '15th March, 2024 and 16th March, 2024',
      description: 'The 5th International Conference on Innovative Trends in Information Technology (ICTITT-24) aims to provide a platform for researchers and practitioners to exchange ideas of significant and recent computing systems. The conference is technically co-sponsored by IEEE Kerala Section. ICTITT-24 allows attendees to benefit from various topics that cover state-of-art information Technology research and development. ICTITT encompasses a wide range of topics covering Intelligent systems, big data processing, Internet of things and Blockchain, Secure information processing, Cloud Computing, Edge and Fog Computing, Robotics and automation, Scalable computing, Neuromorphic Engineering, Multimedia systems, Electronic Design Automation, Emerging technologies, Healthcare systems, Power and Energy Systems and many more.'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Zap className="w-4 h-4" style={{ color: API.color1 }} />
            IEEE Student Branch
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            IEEE Student Branch
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Advancing technology for the benefit of humanity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* About IEEE */}
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
              <Zap size={28} style={{ color: API.color1 }} />
              About IEEE
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                The Institute of Electrical and Electronic Engineers (IEEE) is the world\'s largest technical organization which fosters technological innovation for the benefit of humanity. IEEE inspires the global aerospace fraternal in science, Engineering and technology, which are formed in IIT Kottayam in 2020, with the goal of keeping the students and teachers resolving the motto of "Technology for Society". IEEE SB IIIT Kottayam belongs to IEEE Kerala Section, which comes under IEEE Asia Pacific. R10 Region. Our SB activities students with latest technology and research, to meet the requirements of current industry standards. In addition, our SB encourages participation in various international conferences, Initiatives and programmes to the student\'s life.
              </p>
            </div>
          </div>

          {/* Former IEEE SB Counselors */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Former IEEE SB Counselors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {counselors.map((counselor, index) => (
                <MemberCard key={index} name={counselor.name} role={counselor.role} />
              ))}
            </div>
          </div>

          {/* Current IEEE SB Counselor */}
          <div className={`p-6 rounded-lg border-2 transition-all duration-300 ${
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
            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Currently, IEEE SB Counselor is Dr. Debarati Ganguly
            </h3>
            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <strong>Asst. Professor</strong>
            </p>
            <p className={`text-sm mt-2 flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail size={16} />
              Contact: debarati@iiittkottayam.ac.in
            </p>
          </div>

          {/* Office Bearers */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Following are the office bearers of IEEE SB
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {officeBoard.map((member, index) => (
                <MemberCard key={index} name={member.name} role={member.role} />
              ))}
            </div>
          </div>

          {/* Newsletter Download */}
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
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <FileText size={28} style={{ color: API.color1 }} />
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    IEEE SB IIIT Kottayam 1st Year Anniversary Newsletter
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Download our annual newsletter
                  </p>
                </div>
              </div>
              <button 
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ backgroundColor: API.color1 }}
              >
                <Download size={20} />
                Download Newsletter
              </button>
            </div>
          </div>

          {/* Events Section */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: API.color1 }} />
              Events
            </h2>
            <div className="space-y-6">
              {events.map((event, index) => (
                <EventCard 
                  key={index}
                  title={event.title}
                  date={event.date}
                  description={event.description}
                  isUpcoming={event.isUpcoming}
                />
              ))}
            </div>
          </div>

          {/* IEEE Programs */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Award size={28} style={{ color: API.color1 }} />
              IEEE Programs
            </h2>
            <div className="space-y-6">
              {programs.map((program, index) => (
                <EventCard 
                  key={index}
                  title={program.title}
                  date={program.date}
                  description={program.description}
                  isUpcoming={false}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
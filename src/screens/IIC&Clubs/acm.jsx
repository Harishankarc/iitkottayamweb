import { useTheme } from '../../context/createContext';
import { Monitor, Users, Mail, Award, Calendar, Camera } from 'lucide-react';
import api from '../../api/api';

const MemberCard = ({ name, designation, batch }) => {
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
      <h4 className={`font-semibold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {name}
      </h4>
      {designation && (
        <p className={`text-sm mt-1 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {designation}
        </p>
      )}
      {batch && (
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {batch}
        </p>
      )}
    </div>
  );
};

const ImageGallery = ({ count = 4 }) => {
  const { darkMode } = useTheme();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`aspect-video rounded-lg border-2 flex items-center justify-center transition-all duration-300 ${
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

export default function ACM() {
  const { darkMode } = useTheme();

  const officeBearers = [
    { designation: 'Former Faculty Sponsor', name: 'Dr.Dhanya Mohan, Lecka' },
    { designation: 'Chair', name: 'Dr. Panchwat V' },
    { designation: 'Vice Chair', name: 'Mr. Raviraj Pramod Jadhav(batch unknown)' },
    { designation: 'Vice-Chair', name: 'Ms Shrivangi Prasthakbukendra Dhui (2022 batch)' },
    { designation: 'Secretary and Treasurer', name: 'Ms Salicki Sallu (2022 batch)' },
    { designation: 'Web Master', name: 'Mr Aditya Pitre (2022 batch)' }
  ];

  const pastEvents = [
    {
      date: '24th October 2018',
      title: 'Workshop on "Design Thinking"',
      resource: 'Mr John J Jackan',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '28th March 2018',
      title: 'ACM Student Chapter Launching',
      resource: 'ACM Student Chapter',
      affiliation: 'IIIT Kottayam'
    },
    {
      date: '28th March 2018',
      title: 'Workshop on Blockchain Technology',
      resource: 'Dr Dhanavat B Kumar 2017 and 2018 Batch',
      affiliation: 'IIIT Kottayam'
    },
    {
      date: '23rd October 2020',
      title: 'IEEE Career Guidance',
      resource: 'Dr. Dhanusht G Kurup',
      affiliation: 'Amrita Vishwa Vidyapeeetham'
    }
  ];

  const upcomingEvents = [
    {
      date: '9 November 2021',
      title: 'Introduction to Block Chain',
      resource: 'Adhiresh P',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '9 November 2021',
      title: 'Blockchain in Supply Chain',
      resource: 'Arun Nahar',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '11 November 2021',
      title: 'Fundamentals of Blockchain',
      resource: 'Adhiresh P',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '11 November 2021',
      title: 'Blockchain in Various Industries',
      resource: 'Social Gulati',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '12 November 2021',
      title: 'Ethereum Tools And Frameworks',
      resource: 'Adhiresh P',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '12 November 2021',
      title: 'Blockchain Gaming and NFTs',
      resource: 'Anantharamar Iyer',
      affiliation: 'Tata Consultancy Services'
    },
    {
      date: '12 November 2021',
      title: 'Cyber Security (Digital Forensics: Practitioners Perspectives)',
      resource: 'Nalsool Raya A',
      affiliation: 'Cyber Security Group, CDAC'
    },
    {
      date: '13 November 2021',
      title: 'Cyber Security (Better Foundations For Secure Software Using Trusted Hardware And Verification)',
      resource: 'Dr. Shweta Shinok',
      affiliation: 'ETH Zurich'
    },
    {
      date: '14 November 2021',
      title: 'Cyber Security (Getting to Know Your Everyday Industrial Cyber Security Perspective)',
      resource: 'Dr. Dittrin Andrene',
      affiliation: 'CDAC Thiruvananthapuram'
    },
    {
      date: '20 November 2021',
      title: 'Cyber Security (Cryptographic Accelerators)',
      resource: 'Dr. Sakthivel Ramachandran',
      affiliation: 'VIT University, Vellore'
    },
    {
      date: '20 November 2021',
      title: 'Cyber Security (Machine Learning for Cyber Security)',
      resource: 'Dr. Rousi P S',
      affiliation: 'Institute of Science and Technology'
    },
    {
      date: '21 November 2021',
      title: 'Cyber Security (Security Threats and Attacks)',
      resource: 'Dr. Mahdi Jagadbach',
      affiliation: 'Institute of Information Technology Allahabad'
    }
  ];

  const jointEvents = [
    {
      date: '17 October 2021',
      title: 'Cloud Computing',
      resource: 'Mohan Kumar',
      affiliation: 'Wipro Ltd'
    },
    {
      date: '26 October 2021',
      title: 'Business Analytics',
      resource: 'Mohan Kumar',
      affiliation: 'Wipro Ltd'
    }
  ];

  const webinarSeries = [
    { date: 'June 24, 2020', title: 'AI and Beyond Covid 19: Integrating Social Responsiveness and Technology' },
    { date: 'July 01, 2020', title: 'Ethics, Digital Security & Online Privacy Top 10' },
    { date: 'July 06, 2020', title: 'Industry 4.0 for Electric Manufacturing' },
    { date: 'July 08, 2020', title: 'New Frontiers in Cloud and Edge Computing for Big Data & Internet- of-Things Application' },
    { date: 'July 10, 2020', title: 'Data Privacy & Security' },
    { date: 'July 10, 2020', title: 'How to become a self-taught programmer?' },
    { date: 'July 13, 2020', title: 'FPGA - Public Networking for Zyne' },
    { date: 'July 15, 2020', title: 'Intelligent system controlled using Cognitive Cryptography' },
    { date: 'July 17, 2020', title: 'Revolutionizing of Real Estate on Blockchain' },
    { date: 'July 18, 2020', title: 'AI: The Key to Scaling Cyber Defense: Systematic Identification, Intelligent Automation, Ability to Action and Use Cases' },
    { date: 'July 20, 2020', title: 'Cryptocurrencies & Blockchain' },
    { date: 'July 22, 2020', title: 'Deep Learning' },
    { date: 'July 24, 2020', title: 'Introduction to Smart Home using Cisco Packet Tracer' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
            <Monitor className="w-4 h-4" style={{ color: api.color1 }} />
            ACM Student Chapter
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Association for Computing Machinery
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Student Chapter
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-12">

          {/* About ACM */}
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
              <Monitor size={28} style={{ color: api.color1 }} />
              About ACM
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                The ACM (Association for Computing Machinery), founded in 1947, is the largest and most prestigious international academic society for computing professionals. It serves many of the world\'s leading academic educational and research institutions that are involved in the field of computing science. ACM brings together computing educators, researchers, and professionals to inspire dialogue, share resources, and address the field\'s challenges. As the world\'s largest computing society, ACM strengthens the profession\'s collective voice through strong leadership, promotion of the highest standards, and recognition of technical excellence. ACM supports the professional growth of its members by providing opportunities for life-long learning, career development, and professional networking.
              </p>
              <p>
                Its growing membership has led to Councils in Europe, India, and China, fostering networking opportunities that strengthen ties within and across countries and technical communities. Their actions enhance ACM\'s ability to raise awareness of computing\'s important technical, educational, and social issues around the world.
              </p>
            </div>
          </div>

          {/* About Student Chapter */}
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
              <Users size={28} style={{ color: api.color1 }} />
              About Student Chapter
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                ACM\'s Student chapters worldwide serve as hubs of activity for ACM members and the computing community at large. They provide semi-formal educational and networking venues for both students and faculty members through invited lectures, talks from a diverse collection of speakers, networking sessions, regional conferences, and mentorship programs across both our common interests. They provide advice, support, and resources to develop a healthy and robust chapter community and offer a broad array of resources and services, including subscription to special-interest group (SIG) newsletters, enhanced web searching capabilities, and more than 800 professional and student chapters worldwide. Those chapters offer opportunities for members to gain study on critical research and cultivate collaborative networking systems.
              </p>
            </div>
          </div>

          {/* Office Bearers */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: api.color1 }} />
              Office Bearers of IIIT Kottayam ACM Student Chapter
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {officeBearers.map((member, index) => (
                <MemberCard key={index} designation={member.designation} name={member.name} batch={member.batch} />
              ))}
            </div>
          </div>

          {/* Event Report */}
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
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Award size={28} style={{ color: api.color1 }} />
              Event Report
            </h2>
            <div className={`text-base leading-relaxed space-y-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p>
                The ACM chapter of IIIT Kottayam hosted its inaugural event of the year with a special focus on Responsible AI, featuring a talk by Prof. Ponurangam Kumaraguru as part of a 2-workshop series on Critical Algorithm Studies and Fairness-Aware ML. The event was attended by faculty members, including Dr. Radhakrishnan, registrar, and Dr. Panchwat, head of the CSE Department. The speaker for the event was Prof. Ponurangam Kumaraguru, a professor at IIIT Hyderabad and a well-known alumnus of Carnegie Mellon University. Prof. Kumaraguru, a renowned figure in computer science and cybersecurity, shared valuable insights on Responsible AI, drawing on his extensive experience and research in the field of AI. The event was well-attended with an enthusiastic and responsive audience, comprised of ACM student members, and scholars from the college, creating a learning environment conducive to understanding and exploring AI and technology. He not only captivated students but also provided valuable perspectives for faculty members present, fostering a collaborative learning conference.
              </p>
              <p>
                The event concluded with appreciation for Prof. Kumaraguru\'s expertise and the active participation of both students and faculty, marking the event as a significant learning opportunity for all attendees.
              </p>
              <p>
                Here are some moments captured by the students of IIITK and Prof. PR himself from the session
              </p>
            </div>
          </div>

          {/* Event Photos */}
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
            <h3 className={`text-xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Camera size={24} style={{ color: api.color1 }} />
              Event Gallery
            </h3>
            <ImageGallery count={4} />
          </div>

          {/* Past Events Table */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: api.color1 }} />
              Events
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${api.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Title
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Resource Person
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Affiliation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pastEvents.map((event, index) => (
                    <tr 
                      key={index}
                      className={`${index !== pastEvents.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.date}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.title}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.resource}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.affiliation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: api.color1 }} />
              Upcoming Events
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${api.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Title
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Resource Person
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Affiliations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingEvents.map((event, index) => (
                    <tr 
                      key={index}
                      className={`${index !== upcomingEvents.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.date}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.title}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.resource}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.affiliation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Events Jointly With IEEE SB */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: api.color1 }} />
              Events Jointly With IEEE SB
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${api.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Title
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Resource Person
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Affiliations
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {jointEvents.map((event, index) => (
                    <tr 
                      key={index}
                      className={`${index !== jointEvents.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.date}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.title}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.resource}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.affiliation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Webinar Series 2020 */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: api.color1 }} />
              Webinar Series 2020 - Jointly with IEEE SB
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${api.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {webinarSeries.map((event, index) => (
                    <tr 
                      key={index}
                      className={`${index !== webinarSeries.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {event.date}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {event.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
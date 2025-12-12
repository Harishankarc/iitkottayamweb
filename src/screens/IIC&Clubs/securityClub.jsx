import { useTheme } from '../../context/createContext.jsx';
import { Shield, Users, Mail, Target, Lock, ExternalLink, Calendar, Award } from 'lucide-react';
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

const SocialMediaLinks = ({ darkMode }) => {
  const platforms = [
    { name: 'LinkedIn', color: '#0077B5' },
    { name: 'Instagram', color: '#E4405F' },
    { name: 'Facebook', color: '#1877F2' },
    { name: 'LinkedIn', color: '#25D366' },
    { name: 'WhatsApp', color: '#25D366' },
    { name: 'YouTube', color: '#FF0000' }
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {platforms.map((platform, index) => (
        <div
          key={index}
          className={`px-4 py-2 rounded-lg text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg cursor-pointer`}
          style={{ backgroundColor: platform.color }}
        >
          {platform.name}
        </div>
      ))}
    </div>
  );
};

export default function SecurityClub() {
  const { darkMode } = useTheme();

  const mentors = [
    { name: 'Suranvath Ghid', email: 'ghid22bcs220@iiittkottayam.ac.in' },
    { name: 'Basanth Aleti', email: 'basanth22bcs22@iiittkottayam.ac.in' },
    { name: 'Arjun Choudhary', email: 'chigurho.arjun@iiittkottayam.ac.in' }
  ];

  const activities = [
    {
      slNo: 1,
      date: '13th January 2023',
      title: 'Inauguration Ceremony',
      description: 'The inauguration ceremony was celebrated with great enthusiasm. The remarkable repertoire from attendees inspired us to fervently pursue our goals. We extended heartfelt thanks to our Director, Dr. Rajen Dhandar, Registrar, Dr. A. Lakshmanasamy, Associate Dean, Dr. Sinu Sam Njo, HOD of Cyber Security, Dr. Prachuen V, Faculty Incharge, Dr. Lavanya Settipalli, students, and faculty for their presence at the auspicious moment. We planned the foundation of what will become a strong pillar of our illustrious collegiate culture.'
    },
    {
      slNo: 2,
      date: '20th January 2023',
      title: 'Introduction to Cyber Security',
      description: 'This event was an introduction to the field of cybersecurity, tailored to both savvy students interested in learning how to protect their digital assets. It took place in CAG01 at 6 pm, offering participants the chance to enhance their skills and knowledge concerning cyber security.'
    },
    {
      slNo: 3,
      date: '4th March 2023',
      title: 'Envisioning the future of Cybersecurity',
      description: 'During the webinar, various topics posed by 4 minds were discussed, including the challenges faced by law enforcement agencies in detecting and examining those-based attacks. The latest technologies and techniques for detecting and preventing deep fake were also discussed.'
    },
    {
      slNo: 4,
      date: '6th-8th April 2023',
      title: "Agony's Capture-The-Flag 21",
      description: 'The Cyber Security Club at IIIT Kottayam hosted its first Capture the Flag (CTF) event for the Techno Cultural Fest, Agony+ in its second edition. The competition involved creative thinking, problem solving, teamwork, and gaming. The competition required players to work together and strategize to outsmart their opponents and claim victory. Team gathered, practiced, and competed, displaying their skills and forming memorable networks.'
    },
    {
      slNo: 5,
      date: '18th April 2023',
      title: 'Introduction to Web3 Security',
      description: 'During the webinar, participants learned about the fundamentals of Web 3.0, Blockchain, smart contracts, and careers in Web3. The guest speaker, Mr. Sachin Kuruvilla, who has worked with and consulted multiple Web3 startups, shared his expertise on blockchain security. Mr. Kuruvilla\'s insights covered the latest trends, challenges, and best practices in Web3 development and security projects. With experience teaching over 30,000 students about Web 3.0 and cybersecurity in Southeast Asia, Mr. Kuruvilla motivated students to discover an accessible opportunity and reminded students to stay attuned and stay Ahead to the ever-changing world of technology.'
    },
    {
      slNo: 6,
      date: '14th May 2023',
      title: 'Eco-Crypt',
      description: "Eco-Crypt was the prestigious event on Biodiversity Day with a Cybersecurity twist. Participants explored open-source tools, mastered GitHub, and unraveled the secrets of ciphers. They deciphered AES! Countless men calculating swaths and shared their discoveries with us. The event highlighted the intersection of values and cybersecurity."
    },
    {
      slNo: 7,
      date: '11th September 2023',
      title: 'Cyber Security Club Revival Week',
      description: 'In this session, the revived Cyber Security Club at IIIT Kottayam conducted a workshop focusing on the art of delivering and decoding secret messages in a array in room reminiscent of a movie scene. Held at Techbox on September 11th, this event aimed to introduce students to cryptographic techniques. Attendees learned to conceal and encrypt messages using methods like from bode form by Robot, exploring the stories of the dark web and the techniques of cyberdeventy.'
    },
    {
      slNo: 8,
      date: '8th October 2023',
      title: 'Hacktoberfest 23',
      description: "The Cyber Security Club at IIIT Kottayam hosted Hacktoberfest, DigitalOcean's annual event promoting contributions to open-source projects. Participants were guided through their first open-source contributions, from finding projects to navigate the complex project ecosystem and facilitated. The event aimed to provide valuable learning and skill-building opportunities for the participants to shape their careers."
    },
    {
      slNo: 9,
      date: '11th October 2023',
      title: 'Git and GitHub: Open Source Your Ideas',
      description: 'In continuation with the Git and GitHub workshop conducted Hacktoberfest, among participants an opportunity to delve into Git and GitHub, essential tools in version control systems. The session aimed to demystify VCS and explore its practical implications. Expert speakers, Bariham Day and Aniahutchalya Atishava, demonstrated how these tools revolutionize collaboration in software development. Participants learned to fork, edit, and merge in global collaborations. Attendees were urged to reserve their spots for the event, which promised an engaging exploration of collaboration.'
    }
  ];

  const projects = [
    {
      slNo: 1,
      status: 'Completed',
      name: 'EcoCrypt',
      description: 'The ECO-CRYPT Cyber Project 21 celebrated Environment Day with a cybersecurity twist. Participants explored open-source tools, mastered GitHub, and unraveled the secrets of ciphers. They encrypted AES characters into captivating emojis and shared them securely via WhatsApp. The event highlighted the intersection of values and cybersecurity.'
    },
    {
      slNo: 2,
      status: 'Ongoing Project',
      name: 'Malware Analysis',
      description: 'The Cyber Security Club is conducting an ongoing malware analysis project, focusing on identifying and dissecting various types of malware. This project involves reverse engineering malware samples to understand their behavior, origin, and impact. By analyzing code structures and execution patterns, the club members are learning to detect and mitigate threats. This practical, hands-on approach ensures that invaluable not only contributes to the club\'s research efforts but also provides valuable hands-on experience for members in advanced cybersecurity techniques.'
    },
    {
      slNo: 3,
      status: 'Ongoing',
      name: 'CTF Guide',
      description: 'The Cyber Security Club is developing a comprehensive Capture-The-Flag (CTF) guide. This guide will include detailed explanations of common CTF challenges, strategies for solving them, and practical tips for effective participation. Covering categories such as web exploitation, cryptography, binary exploitation, and reverse engineering, the guide is designed to help members improve their skills necessary to excel in CTF competitions. This resource will serve as both an educational tool and a reference for aspiring cybersecurity professionals.'
    }
  ];

  const collaborations = [
    {
      slNo: 1,
      name: 'Quill Audits',
      description: 'The Cyber Security Club at IIIT Kottayam collaborated with Quillaudits for a Web3 security workshop. This collaboration addressed the Web3-Q challenges were eligible for Web3 Security internship and the \'Racecourse Offer\' (PPO) opportunities at Quillaudits. This sponsorship provided an incentive for participants to excel in specific challenges and potentially secure valuable career prospects in the cybersecurity field.'
    },
    {
      slNo: 2,
      name: 'VFC',
      description: 'The Agony+ Capture-The-Flag (CTF) event, sponsored by VFC, offered an enticing incentive to the top 100 teams comprising 300 participants. Each winning team received a free domain for one year, providing an opportunity to host their portfolios or create websites. This sponsorship added value to the event, motivating participants with a practical and valuable resource to enhance their online presence.'
    },
    {
      slNo: 3,
      name: 'Crascon23',
      description: 'The Cyber Security Club IITT Kottayam collaborated with FALCON24 by CDAC Laerning for a significant cybersecurity event held on January 27-28, 2024, at the India International Center, Delhi. CRASC0N24 brought together industry experts and enthusiasts to explore the latest trends and technologies in cybersecurity. Through the club, participants scrunceed scattered accommodating travel airtels up to the discount on conference passes. The event provided a platform for networking, learning about cutting-edge security issues, and contributing to the cybersecurity community.'
    },
    {
      slNo: 4,
      name: 'IWCON23',
      description: 'The Cyber Security Club collaborated with IWCON as the community partner for IWCON23 by Isaque Wireless Publication. Dedicated to fostering a vibrant cybersecurity community, the club encouraged participation in the IWCON CTF 2023, held from December 14-16, 2023. The event, with challenges ranging from easy to medium, provided an opportunity for participants to sharpen their cybersecurity skills, engage with the minded individuals, win exciting prizes, and enhance their expertise with hands-on experience. This collaboration further strengthened the club\'s mission to promote cybersecurity awareness.'
    },
    {
      slNo: 5,
      name: 'Agony For Her',
      description: 'The Cyber Security Club IIIT Kottayam collaborated with Agony For Her to provide free lift month Linkedin Premium membership to over 30 IIIT Kottayam students. A special webinar guided new LinkedIn members through optimizing profiles for professional success. This initiative aimed to empower students with essential tools for their career journey. Special thanks were extended to Saurina S. for the opportunity and Darim Prasanthan for introducing the initiative. The club\'s mentorship support and dedication from these individuals were acknowledged for shaping students\' futures. New LinkedIn members enjoyed access to premium features, enriching their career opportunities.'
    },
    {
      slNo: 6,
      name: 'IEEE IIIIT Hackers Hideout',
      description: 'Collaborated for promotion of Cyber Week other Activities'
    },
    {
      slNo: 7,
      name: 'IEEE FCRIT',
      description: 'Collaborated for promotion of Cyber Week'
    },
    {
      slNo: 8,
      name: 'Opecite',
      description: 'Sponsored 20-year CTF during Cyber Week'
    },
    {
      slNo: 9,
      name: 'Devcomm NUST',
      description: 'Mutual collaboration for Agnya24 and Agony+ CTF24'
    },
    {
      slNo: 10,
      name: 'Hevoiis',
      description: 'Collaborated for promotion of Cyber Week'
    },
    {
      slNo: 11,
      name: '12uyet',
      description: 'Collaborated for a CTF during Cyber Week'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Shield className="w-4 h-4" style={{ color: API.color1 }} />
            Cyber Security Club
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Cyber Security Club
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto italic ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Securing the digital world. One byte at a time
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
              <Lock size={28} style={{ color: API.color1 }} />
              Introduction
            </h2>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              We here at the Cyber Security Club of IIIT Kottayam have one mission - to get all Cyber enthusiasts under one roof. We help students learn more about Cyber Security through workshops and classes. Even in data relating to real-world cyberattacks, we analyze vulnerabilities by having CTFs and other such competitions. Our goal is to create a safe and accessible environment where people with similar interests find each other and can learn up to work on real-life Cyber Security issues.
            </p>
          </div>

          {/* Vision */}
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
              <Target size={28} style={{ color: API.color1 }} />
              Vision
            </h2>
            <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              Our Cyber Security Club envisions a dynamic hub where students thrive in cybersecurity education. Through engaging Capture-The-Flag (CTF) challenges, enriching workshops, and enlightening webinars, we empower members to master cyber security skills. Together, we forge a community of skilled cybersecurity professionals sharing a secure digital future.
            </p>
          </div>

          {/* Faculty In-Charge */}
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
              Faculty In-Charge: Dr. Lavanya Settipalli
            </h3>
          </div>

          {/* Mentors */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Mentors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mentors.map((mentor, index) => (
                <MemberCard key={index} name={mentor.name} email={mentor.email} />
              ))}
            </div>
          </div>

          {/* More About the Club */}
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
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              More About the Club
            </h2>
            <div className={`space-y-3 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
              <p><strong>1. Club Formation Day:</strong> 13 Jan 2023</p>
              <p><strong>2. Club Vault:</strong> <a href="#" style={{ color: API.color1 }} className="hover:underline">GitHub</a></p>
              <p><strong>3. CYCLUB Official Website:</strong> <a href="#" style={{ color: API.color1 }} className="hover:underline">Visit Now</a></p>
              <p><strong>4. Socials:</strong> <a href="#" style={{ color: API.color1 }} className="hover:underline">LinkTree</a></p>
              <p><strong>5. Contact Email:</strong> <a href="mailto:cyclub@iiittkottayam.ac.in" style={{ color: API.color1 }} className="hover:underline">cyclub@iiittkottayam.ac.in</a></p>
            </div>
          </div>

          {/* Social Media Handles */}
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
            <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Social Media Handles
            </h2>
            <SocialMediaLinks darkMode={darkMode} />
          </div>

          {/* Activities/Events */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Calendar size={28} style={{ color: API.color1 }} />
              Cyber Security Club Activities/Events
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${API.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Event No.
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Date
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Title
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr 
                      key={activity.slNo}
                      className={`${index !== activities.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.slNo}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.date}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.title}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {activity.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Award size={28} style={{ color: API.color1 }} />
              Projects
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
                      Project Status
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Project Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr 
                      key={project.slNo}
                      className={`${index !== projects.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {project.slNo}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {project.name}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {project.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Collaborations */}
          <div>
            <h2 className={`text-2xl font-bold mb-6 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <Users size={28} style={{ color: API.color1 }} />
              Collaborations
            </h2>
            <div className={`overflow-x-auto rounded-lg border-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <table className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <thead>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                      style={{ backgroundColor: `${API.color1}15` }}>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Serial No.
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Project Name
                    </th>
                    <th className={`px-6 py-4 text-left text-sm font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {collaborations.map((collab, index) => (
                    <tr 
                      key={collab.slNo}
                      className={`${index !== collaborations.length - 1 ? 'border-b' : ''} transition-colors ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {collab.slNo}
                      </td>
                      <td className={`px-6 py-4 text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {collab.name}
                      </td>
                      <td className={`px-6 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {collab.description}
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
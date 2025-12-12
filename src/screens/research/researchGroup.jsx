import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { ExternalLink, Users, Target, Lightbulb, Globe } from 'lucide-react';

export default function ResearchGroup() {
  const { darkMode } = useTheme();

  const introBullets = [
    'Faculty members of IIIT Kottayam',
    'Ph.D. scholars',
    'MTech students',
    'BTech students',
    'Alumni of IIIT Kottayam',
    'Interns',
    'Industry experts',
    'Experts from R&D labs',
    'Renowned faculty members of premier institutes in India',
    'Foreign renowned faculty members',
    'Foreign industry experts',
    'Foreign research scholars',
    'Foreign R&D experts'
  ];

  const goals = [
    'To enhance the Research & Project Funding for IIIT Kottayam & to establish Research Lab for the respective Group',
    'To enhance the Consultancy work for faculty members',
    'To enhance Campus Placement'
  ];

  const researchGroups = [
    { id: 1, name: 'Data Science Research Group', url: 'https://dsrg.iiitkottayam.ac.in/' },
    { id: 2, name: 'Bigdata & ML Research Group', url: 'https://bigml.iiitkottayam.ac.in/' },
    { id: 3, name: 'Cyber Security Research Group', url: 'https://cyberlabs.iiitkottayam.ac.in/' },
    { id: 4, name: 'Network Science Research Group', url: 'https://netsci.iiitkottayam.ac.in/' },
    { id: 5, name: 'IoT Cloud Research Group', url: 'http://iotcloud.iiitkottayam.ac.in/' },
    { id: 6, name: 'Intelligent IoT Research Group', url: 'https://iiotrg.iiitkottayam.ac.in/' },
    { id: 7, name: 'Smart Wireless Inter-Networking Research Group', url: 'https://swing.iiitkottayam.ac.in/' },
    { id: 8, name: 'I2C5-Intelligent Integrated Circuits and Systems Research Group', url: 'https://i2c5.iiitkottayam.ac.in/index.php?people' },
    { id: 9, name: 'Computational Engineering and Data Modelling Research Group', url: 'https://cedm.iiitkottayam.ac.in/home.php' },
    { id: 10, name: 'Data Analytics and Business Decisions', url: 'https://dabd.iiitkottayam.ac.in/' },
    { id: 11, name: 'Bio-Medical Informatics and Genomics Research Group', url: 'https://biomirg.iiitkottayam.ac.in/' },
    { id: 12, name: 'FACTS-H Lab', url: 'https://facts.iiitkottayam.ac.in/home' },
    { id: 13, name: 'AI-powered Signal and Image Processing Research (ASPIRE) Group', url: 'https://aspire.iiitkottayam.ac.in/' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${API.color1}1A`, color: API.color1, borderColor: `${API.color1}66` }}>
            <Users className="w-3 h-3" style={{ color: API.color1 }} />
            Research Groups
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            RESEARCH GROUPS
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto space-y-6">

          {/* About Section */}
          <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
            <div className="flex items-start gap-3 mb-3">
              <Lightbulb className="w-5 h-5 mt-1" style={{ color: API.color1 }} />
              <div>
                <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: API.color1 }}>
                  About Research Groups
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The research groups at IIIT Kottayam foster a vibrant research and innovation culture by bringing together interdisciplinary teams. Each group focuses on domain-specific research agendas and encourages collaboration with industry and international partners.
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Left Column - Who & Goals */}
            <div className="space-y-6">
              
              {/* Who is Involved */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5" style={{ color: API.color1 }} />
                  <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: API.color1 }}>
                    Who is Involved?
                  </h2>
                </div>
                <ul className={`space-y-1 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {introBullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span style={{ color: API.color1 }}>•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Goals */}
              <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Target className="w-5 h-5" style={{ color: API.color1 }} />
                  <h2 className={`text-base font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: API.color1 }}>
                    Goals
                  </h2>
                </div>
                <ol className={`space-y-2 text-xs ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {goals.map((g, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold" style={{ color: API.color1 }}>{idx + 1}.</span>
                      <span>{g}</span>
                    </li>
                  ))}
                </ol>
              </div>

            </div>

            {/* Right Column - Research Groups Grid */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5" style={{ color: API.color1 }} />
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ color: API.color1 }}>
                  Active Research Groups
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-3">
                {researchGroups.map((rg) => (
                  <a
                    key={rg.id}
                    href={rg.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg border transition-all duration-300 group ${
                      darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      borderColor: darkMode ? '#374151' : '#e5e7eb',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = API.color1;
                      e.currentTarget.style.boxShadow = `0 0 20px ${API.color1}30`;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h3 className={`text-sm font-semibold mb-1 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                          {rg.name}
                        </h3>
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Visit official website
                        </p>
                      </div>
                      <ExternalLink 
                        className="w-4 h-4 flex-shrink-0 mt-1 transition-transform group-hover:translate-x-1" 
                        style={{ color: API.color1 }} 
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
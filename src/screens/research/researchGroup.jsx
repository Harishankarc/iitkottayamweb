import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { ExternalLink, Users, Sparkles } from 'lucide-react';

export default function ResearchGroup() {
  const { darkMode } = useTheme();
  const color1 = api.color1;

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
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className="pt-12 pb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1
            className="font-extrabold"
            style={{
              color: darkMode ? '#93c5fd' : '#3b82f6',
              fontSize: '2.6rem',
              lineHeight: 1.05
            }}
          >
            Research Groups
          </h1>
          <p className={`mt-4 max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We have multiple research groups composed of faculty, students, alumni and industry collaborators. These groups drive research, projects, and collaborations at IIIT Kottayam.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-8 px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column: bullets + goals */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-2xl mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border`} style={{ borderColor: `${color1}20` }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: color1 }}>Who is involved?</h2>
              <ul className="list-disc ml-5 text-sm space-y-1">
                {introBullets.map((b, i) => (
                  <li key={i} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{b}</li>
                ))}
              </ul>
            </div>

            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border`} style={{ borderColor: `${color1}20` }}>
              <h2 className="text-lg font-bold mb-3" style={{ color: color1 }}>Goals</h2>
              <ol className="list-decimal ml-5 text-sm space-y-2">
                {goals.map((g, idx) => (
                  <li key={idx} className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{g}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Middle column: description */}
          <div className="lg:col-span-2 space-y-6">
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border`} style={{ borderColor: `${color1}20` }}>
              <h3 className="text-xl font-semibold mb-3" style={{ color: color1 }}>About the Research Groups</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm`}>
                The research groups at IIIT Kottayam foster a vibrant research and innovation culture by bringing together interdisciplinary teams. Each group focuses on domain-specific research agendas and encourages collaboration with industry and international partners. Below is a curated list of active research groups with direct links to their web pages.
              </p>
            </div>

            {/* Grid of research groups */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md border`} style={{ borderColor: `${color1}20` }}>
              <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Research Groups</h3>

              <div className="space-y-3">
                {researchGroups.map((rg) => (
                  <div
                    key={rg.id}
                    className={`flex items-center justify-between p-3 rounded-lg transition-shadow duration-200 ${darkMode ? 'bg-gray-900/30 hover:shadow-xl' : 'bg-gray-50 hover:shadow-lg'}`}
                    style={{ borderLeft: `4px solid ${color1}22` }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: `${color1}10` }}>
                        <Users className="w-5 h-5" style={{ color: color1 }} />
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: color1 }}>{rg.name}</div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Official group page</div>
                      </div>
                    </div>

                    <a
                      href={rg.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm font-semibold"
                      style={{
                        color: darkMode ? '#e6f4ff' : '#064e3b',
                        background: darkMode ? `${color1}20` : '#ecfdf5',
                        border: `1px solid ${color1}20`
                      }}
                    >
                      Visit
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Small note */}
            <div className={`p-4 rounded-lg text-sm ${darkMode ? 'bg-gray-800/60 text-gray-300' : 'bg-white text-gray-600'} shadow-sm border`} style={{ borderColor: `${color1}10` }}>
              <Sparkles className="inline-block mr-2" style={{ color: color1 }} />
              <span>Want to add a new research group or update details? Reach out to the Research Office.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
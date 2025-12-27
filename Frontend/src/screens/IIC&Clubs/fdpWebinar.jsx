import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { ExternalLink, Calendar, Users, BookOpen } from 'lucide-react';

export default function FdpWebinar() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const targetUrl = 'https://iiitkottayam.ac.in/#!/fdp';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <BookOpen className="w-4 h-4" style={{ color: color1 }} />
            Professional Development
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Faculty Development Programmes
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Workshops, webinars, and professional development initiatives for faculty enhancement.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        {/* About FDP Section */}
        <div className={`mb-12 p-8 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-xl border-2 hover:border-opacity-100`} 
             style={{ borderColor: `${color1}20` }} 
             onMouseEnter={(e) => e.currentTarget.style.borderColor = color1} 
             onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}20`}>
          <h2 className="text-3xl font-bold mb-6" style={{ color: color1 }}>
            About Faculty Development Programmes
          </h2>
          <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            A curated list of faculty development programmes, workshops and webinars organised by the institute to enhance teaching methodologies, research capabilities, and professional growth of faculty members.
          </p>

          {/* FDP Features */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className={`flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${color1}20` }}
              >
                <Calendar className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Regular Workshops
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Scheduled development programmes throughout the academic year
              </p>
            </div>

            <div className={`flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${color1}20` }}
              >
                <Users className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Expert Sessions
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Interactive sessions with industry and academic experts
              </p>
            </div>

            <div className={`flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:shadow-md ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: `${color1}20` }}
              >
                <BookOpen className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h3 className={`text-sm font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Resource Access
              </h3>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Archived recordings and educational materials
              </p>
            </div>
          </div>

          {/* Access Button */}
          <div className="text-center">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              style={{ backgroundColor: color1 }}
            >
              <span>View FDP Details</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import {
  Trophy,
  Award,
  TrendingUp,
  GraduationCap,
  ArrowRight,
  BookOpenText,
  Microscope,
  Users,
  Eye,
  FileText,
  Building,
  Quote
} from 'lucide-react';

export default function Nirf() {
    const { darkMode } = useTheme();
  const color1 = API.color1; // (Dark Green)
  const color2 = API.color2; // (Light Mint)
  const color3 = API.color3; // (Light Gray)

  // Placeholder data for NIRF parameters
  const nirfParams = [
    { title: 'Teaching, Learning & Resources', score: '85.2', icon: <BookOpenText /> },
    {title: 'Research & Professional Practice', score: '82.1', icon: <Microscope /> },
    { title: 'Graduation Outcomes', score: '90.5', icon: <GraduationCap /> },
    { title: 'Outreach & Inclusivity', score: '78.9', icon: <Users /> },
    { title: 'Perception', score: '80.0', icon: <Eye /> },
    { title: 'Overall Score', score: '83.4', icon: <TrendingUp /> }
  ];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="max-w-5xl mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Trophy className="w-4 h-4" style={{ color: color1 }} />
                Our Latest Achievement
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                NIRF <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>Ranking 2025</span>
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                A Testament to Our Continued Excellence in Education and Research
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto py-8 px-6 max-w-full">
          
          {/* Main Ranking Cards Section */}
          <section className="mb-8 relative">
            <div className="grid md:grid-cols-2 gap-6 w-full mx-auto">
              {/* Engineering Ranking Card */}
              <div className={`group rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:-translate-y-2 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                    <Award className="w-8 h-8" style={{ color: color1 }} />
                  </div>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    Engineering
                  </h3>
                </div>
                <p className={`text-base mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rank Band</p>
                <div className="text-4xl font-extrabold mb-3" style={{ color: color1 }}>
                  101-150
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Consistently placed among the top engineering institutions, reflecting our strong focus on technical education and innovation.
                </p>
              </div>

              {/* Overall Ranking Card */}
              <div className={`group rounded-lg p-6 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 hover:-translate-y-2 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                    <Building className="w-8 h-8" style={{ color: color1 }} />
                  </div>
                  <h3 className={`text-xl font-bold transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    Overall
                  </h3>
                </div>
                <p className={`text-base mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rank Band</p>
                <div className="text-4xl font-extrabold mb-3" style={{ color: color1 }}>
                  151-200
                </div>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Recognized nationally for our comprehensive academic framework, research output, and holistic development of students.
                </p>
              </div>
            </div>
          </section>

          {/* Director's Message Section */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <div className={`rounded-lg p-8 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <Quote className="absolute top-8 left-8 w-20 h-20 opacity-10" style={{ color: color1 }} />
                <div className="relative z-10 text-center">
                  <p className={`text-base md:text-lg font-medium leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    "Our performance in the NIRF 2025 rankings is a direct result of the relentless dedication of our faculty, the innovative spirit of our students, and our collective commitment to academic and research excellence."
                  </p>
                  <div className="text-base font-bold" style={{ color: color1 }}>
                    — Director, IIIT Kottayam
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Parameter Breakdown Section */}
          <section className="mb-8">
            <div className="text-center mb-6">
              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Our Performance <span style={{ color: color1 }}>Snapshot</span>
              </h2>
              <p className={`text-sm md:text-base max-w-4xl mx-auto mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                NIRF evaluates institutions on several key parameters. Here's how we performed.
              </p>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}CC, ${color1})` }}></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mx-auto">
              {nirfParams.map((param, index) => (
                <div
                  key={index}
                  className={`group relative rounded-lg p-5 border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
                >
                  <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color1 }}></div>
                  <div className="relative flex items-center gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                      {React.cloneElement(param.icon, { className: "w-7 h-7", style: { color: color1 } })}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-sm font-bold transition-colors duration-300 leading-tight mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                        {param.title}
                      </h3>
                      <p className="text-xl font-bold" style={{ color: color1 }}>
                        {param.score}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Banner */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <Link to="#" className="block">
                <div className="rounded-lg p-8 md:p-10 shadow-xl transition-all duration-500 border relative overflow-hidden group" style={{ backgroundColor: color1, borderColor: `${color1}CC` }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300">
                        View the Full Report
                      </h3>
                      <p className="text-sm md:text-base text-gray-50 transition-colors duration-300">
                        Download the detailed NIRF 2025 report for IIIT Kottayam.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                      <span className="text-white group-hover:text-[#239244] font-bold text-sm transition-colors duration-300">Download PDF</span>
                      <FileText className="w-5 h-5 text-white group-hover:text-[#239244] transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
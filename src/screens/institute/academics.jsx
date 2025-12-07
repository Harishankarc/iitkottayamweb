import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenText, GraduationCap, Microscope, FileText, Link as LinkIcon, CalendarDays, BookCopy, ShieldCheck } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function Academics() {
  const { darkMode } = useTheme();
  const color1 = API.color1; // (Dark Green)
  const color2 = API.color2; // (Light Mint)
  const color3 = API.color3; // (Light Gray)

  const ugLinks = [
    {
      calendar: 'ODD 2025-26 - ACADEMIC CALENDAR FOR B.TECH (ADM 2024, 2023 & 2022) (Sem III,V,VII)',
      curriculum: 'B.Tech ECE Curriculum',
      regulations: 'UG Regulations for 2021 Batch Onwards'
    },
    {
      calendar: 'ODD 2025-26 - ACADEMIC CALENDAR FOR B.TECH (ADM 2025) (Sem I)',
      curriculum: 'B.Tech CSE Curriculum',
      regulations: null
    },
    {
      calendar: null,
      curriculum: 'B.Tech CY Curriculum',
      regulations: null
    },
    {
      calendar: null,
      curriculum: 'B.Tech AI and Data Science Curriculum',
      regulations: null
    }
  ];

  const pgLinks = [
    { name: 'e-M.Tech Programme', href: '#' },
    { name: 'M.Tech Programmes for Working Professionals', href: '#' }
  ];

  const phdLinks = [
    { name: 'PhD Regulations', href: '#' }
  ];

  const requestLinks = [
    { name: 'Request for Academic Transcript', href: '#' },
    { name: 'Educational Verification', href: '#' }
  ];

  // Helper component for styled links
  const StyledLink = ({ href, text, icon: Icon }) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${darkMode ? 'bg-gray-700 text-gray-100' : ''}`}
      style={{ 
        backgroundColor: darkMode ? '' : color2, 
        color: darkMode ? '' : color1, 
        borderColor: darkMode ? '#4b5563' : `${color1}66` 
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#4b5563' : `${color1}66`}
    >
      {Icon && <Icon className="w-4 h-4" style={{ color: darkMode ? '#10b981' : color1 }} />}
      {text}
    </a>
  );

  // Helper component for table links
  const TableLink = ({ href = '#', text }) => (
    <a 
      href={href} 
      className={`font-medium hover:underline ${darkMode ? 'text-gray-300' : 'text-gray-800'}`} 
      style={{ color: darkMode ? '' : color1 }}
    >
      {text}
    </a>
  );


  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="w-full mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
               <BookOpenText className="w-4 h-4" style={{ color: color1 }} />
                Education at IIITK
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Academics
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Innovative and dynamic curriculum focused on industry and research.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto py-8 px-6 max-w-full">
          <div className="w-full mx-auto space-y-8">
            
            {/* Introduction Section */}
            <section className="mb-8">
              <div 
                className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8 md:p-12">
                  <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The classes for the first batch of B.Tech in Computer Science & Engineering commenced in August 2015. Senior faculty members from other Institutions of National Importance like, IITs, IISERs, NITs etc. are mentoring the vibrant faculty team of IIIT Kottayam. Only people with a Ph.D degree from reputed National Institutions and having a flare for teaching and research are engaged by IIIT Kottayam as faculty. PhD programme started in the year 2019 & M.Tech for working professionals in 2020.
                  </p>
                  <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam follows an innovative and dynamic curriculum at par with other Institutions of National Importance with focus on the demands of industry and research. Most of the core courses are covered in the first half while the second half of the program largely comprises of need based courses focusing on the demands of the industry as well as thrust on research.
                  </p>
                </div>
              </div>
            </section>

            {/* UG Programme Section */}
            <section className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <GraduationCap className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  UG Programme
                </h2>
              </div>

              <div 
                className={`rounded-lg shadow-xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr style={{ backgroundColor: color1 }}>
                        <th className="p-3 text-left text-sm font-bold text-white"><CalendarDays className="w-4 h-4 inline-block -mt-1 mr-2" />Academic Calendar</th>
                        <th className="p-3 text-left text-sm font-bold text-white"><BookCopy className="w-4 h-4 inline-block -mt-1 mr-2" />Curriculum</th>
                        <th className="p-3 text-left text-sm font-bold text-white"><ShieldCheck className="w-4 h-4 inline-block -mt-1 mr-2" />Regulations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ divideColor: `${color1}33` }}>
                      {ugLinks.map((row, index) => (
                        <tr key={index} className={`transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#e8f5f0]'}`}>
                          <td className="p-3 align-top">
                            {row.calendar && <TableLink text={row.calendar} />}
                          </td>
                          <td className="p-3 align-top">
                            {row.curriculum && <TableLink text={row.curriculum} />}
                          </td>
                          <td className="p-3 align-top">
                            {row.regulations && <TableLink text={row.regulations} />}
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* PG Programme Section */}
            <section className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <BookOpenText className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  PG Programme
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {pgLinks.map((link, i) => (
                  <StyledLink key={i} href={link.href} text={link.name} icon={LinkIcon} />
                ))}
              </div>
            </section>

            {/* PhD Programme Section */}
            <section className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <Microscope className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  PhD Programme
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {phdLinks.map((link, i) => (
                  <StyledLink key={i} href={link.href} text={link.name} icon={LinkIcon} />
                ))}
              </div>
            </section>

           {/* Request Section */}
            <section className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
               <FileText className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Request for Academic Transcript/Educational Verification
                </h2>
              </div>
              <div className="flex flex-wrap gap-4">
                {requestLinks.map((link, i) => (
                  <StyledLink key={i} href={link.href} text={link.name} icon={LinkIcon} />
              ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </>
  );
}
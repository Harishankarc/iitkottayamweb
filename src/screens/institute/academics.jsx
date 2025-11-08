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
        <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} h-[60vh] flex items-center`}>
          <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f293780' : `${color2}E6` }}></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
       </div>
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
               <BookOpenText className="w-4 h-4" style={{ color: color1 }} />
                Education at IIITK
              </div>
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Academics
              </h1>
              <p className={`text-xl md:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Innovative and dynamic curriculum focused on industry and research.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto space-y-20">
            
            {/* Introduction Section */}
            <section>
              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8 md:p-12">
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The classes for the first batch of B.Tech in Computer Science & Engineering commenced in August 2015. Senior faculty members from other Institutions of National Importance like, IITs, IISERs, NITs etc. are mentoring the vibrant faculty team of IIIT Kottayam. Only people with a Ph.D degree from reputed National Institutions and having a flare for teaching and research are engaged by IIIT Kottayam as faculty. PhD programme started in the year 2019 & M.Tech for working professionals in 2020.
                  </p>
                  <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam follows an innovative and dynamic curriculum at par with other Institutions of National Importance with focus on the demands of industry and research. Most of the core courses are covered in the first half while the second half of the program largely comprises of need based courses focusing on the demands of the industry as well as thrust on research.
                  </p>
                </div>
              </div>
            </section>

            {/* UG Programme Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <GraduationCap className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  UG Programme
                </h2>
              </div>

              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr style={{ backgroundColor: color1 }}>
                        <th className="p-5 text-left text-lg font-bold text-white"><CalendarDays className="w-5 h-5 inline-block -mt-1 mr-2" />Academic Calendar</th>
                        <th className="p-5 text-left text-lg font-bold text-white"><BookCopy className="w-5 h-5 inline-block -mt-1 mr-2" />Curriculum</th>
                        <th className="p-5 text-left text-lg font-bold text-white"><ShieldCheck className="w-5 h-5 inline-block -mt-1 mr-2" />Regulations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y" style={{ divideColor: `${color1}33` }}>
                      {ugLinks.map((row, index) => (
                        <tr key={index} className={`transition-all duration-300 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-[#e8f5f0]'}`}>
                          <td className="p-5 align-top">
                            {row.calendar && <TableLink text={row.calendar} />}
                          </td>
                          <td className="p-5 align-top">
                            {row.curriculum && <TableLink text={row.curriculum} />}
                          </td>
                          <td className="p-5 align-top">
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
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <BookOpenText className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <Microscope className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
               <FileText className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
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
        </div>
      </div>
    </>
  );
}
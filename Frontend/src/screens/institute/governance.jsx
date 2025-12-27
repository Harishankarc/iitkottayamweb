import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; // Use RouterLink for internal links if any
import { Scale, BookCopy, FileText, Download, Archive } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function Governance() {
  const { darkMode } = useTheme();
  const color1 = API.color1; // (Dark Green)
  const color2 = API.color2; // (Light Mint)
  const color3 = API.color3; // (Light Gray)

  const governanceDocs = [
    { title: 'IIIT PPP Act (2017)', icon: <Scale />, href: '#' },
    { title: 'IIIT Bill', icon: <BookCopy />, href: '#' },
    { title: 'IIITK Statutes', icon: <FileText />, href: '#' }
  ];

  const annualReports = [
    { title: 'Annual Report 2015-16', href: '#' },
    { title: 'Annual Report 2016-17', href: '#' },
    { title: 'Annual Report 2017-18', href: '#' },
    { title: 'Annual Report 2018-19', href: '#' },
    { title: 'Annual Report 2019-20', href: '#' },
    { title: 'Annual Report 2020-21', href: '#' },
    { title: 'Annual Report 2021-22', href: '#' },
    { title: 'Annual Report 2022-23', href: '#' }
  ];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="w-full mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Scale className="w-4 h-4" style={{ color: color1 }} />
                Structure & Reports
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Governance
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore the foundational acts, statutes, and annual reports of the institute.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto py-8 px-6 max-w-full">

          {/* Governance Documents Section */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <div className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} style={{  borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <div className="p-8 md:p-12">
                  <h2 className={`text-2xl md:text-3xl font-bold mb-6 text-center ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Core <span style={{ color: color1 }}>Documents</span>
                  </h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {governanceDocs.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative rounded-lg p-5 border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#4b5563' : '#e5e7eb'}
                      >
                        <div className="absolute top-0 right-0 w-28 h-28 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color1 }}></div>
                        <div className="relative flex items-center gap-4">
                          <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                            {React.cloneElement(doc.icon, { className: "w-6 h-6", style: { color: color1 } })}
                          </div>
                          <div className="flex-1">
                            <h3 className={`text-base font-bold transition-colors duration-300 leading-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                              {doc.title}
                            </h3>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Annual Reports Section */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <div className={`rounded-lg p-8 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800' : ''}`} style={{  borderColor: darkMode ? '#374151' : `${color1}33`, backgroundColor: darkMode ? '' : color2 }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-60 h-60 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
                  <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
                </div>
                
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-4 border-2 shadow-md" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                    <Archive className="w-4 h-4" />
                    Institute Archives
                  </div>
                  <h2 className={`text-2xl md:text-3xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Annual Reports
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {annualReports.map((report, i) => (
                      <a
                        key={i}
                        href={report.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 backdrop-blur-sm px-3 py-2 rounded-lg border-2 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                        style={{ borderColor: `${color1}4D` }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}99`}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}44`}
                      >
                        <Download className="w-3 h-3 shrink-0" style={{ color: color1 }} />
                        <span className={`text-xs font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{report.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
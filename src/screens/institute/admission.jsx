import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpenText, Microscope, DollarSign, ChevronRight, FileText, Info } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function Admission() {
  const { darkMode } = useTheme();
  const color1 = API.color1; // (Dark Green)
  const color2 = API.color2; // (Light Mint)
  const color3 = API.color3; // (Light Gray)

    const initialSemesterFees = [
    { item: 'Tuition Fee', amount: '1,45,200/-' },
    { item: 'Hostel/Facility Maintenance Fee', amount: '34,000/-' },
    { item: 'Mess Advance', amount: '30,750/-' },
    { item: 'Medical Insurance', amount: '1300/-' },
    { item: 'Mess Equipment Maintenance', amount: '300/-' },
    { item: 'Sports Equipment Maintenance', amount: '300/-' },
    { item: 'Club Activities', amount: '300/-' },
    { item: 'Caution Deposit (One-time fee)', amount: '13,000/-' },
    { item: 'Sports (One-time fee)', amount: '1100/-' },
    { item: 'Mess (One-time fee)', amount: '1100/-' },
  ];

  const feeStructure = [
    {
      details: 'Tuition Fee',
      sem1: '1,45,200/-', sem2: '1,45,200/-', sem3: '1,45,200/-', sem4: '1,45,200/-',
      sem5: '1,45,200/-', sem6: '1,45,200/-', sem7: '1,45,200/-', sem8: '1,45,200/-',
    },
    {
      details: 'Hostel/Facility maintenance fee',
      sem1: '34,000/-', sem2: '34,000/-', sem3: '37,500/-', sem4: '37,500/-',
      sem5: '41,250/-', sem6: '41,250/-', sem7: '45,500/-', sem8: '45,500/-',
    },
    {
      details: 'Mess Advance',
      sem1: '30,750/-', sem2: '30,750/-', sem3: '33,825/-', sem4: '33,825/-',
      sem5: '37,250/-', sem6: '37,250/-', sem7: '40,975/-', sem8: '40,975/-',
    },
    {
      details: 'Medical Insurance',
      sem1: '1300/-', sem2: '-', sem3: '1300/-', sem4: '-',
      sem5: '1300/-', sem6: '-', sem7: '1300/-', sem8: '-',
    },
    {
      details: 'Mess Equipment Maintenance Fee',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Sports Equipment Maintenance Fee',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Club Activities',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Caution Deposit (One Time Fee)',
      sem1: '13,000/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
    {
      details: 'Convocation Fee (One-Time Fee)',
      sem1: '-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '5000/-', sem8: '-',
    },
    {
      details: 'Sports (One time Fee)',
      sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
    {
      details: 'Mess (One time Fee)',
      sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
  ];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="w-full mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <FileText className="w-4 h-4" style={{ color: color1 }} />
                Join IIIT Kottayam
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Admissions
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore our Undergraduate, Postgraduate, and Doctoral programmes.
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
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  IIIT Kottayam offers world-class education with cutting-edge programs in technology and research. Our admission process is designed to identify talented students who are passionate about innovation and academic excellence.
                </p>
              </div>
            </div>
          </section>

          {/* Under Graduate Programmes Section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <GraduationCap className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Under Graduate Programmes
              </h2>
            </div>
            <div className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} style={{ borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12">
                <div className="mb-6">
                  <a href="#" className={`inline-flex items-center text-lg font-semibold px-5 py-2 rounded-lg transition-all duration-300`} style={{ color: color1 }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#1f2937' : color2} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                    UG Admission 2025 <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">New!</span>
                  </a>
                </div>

                <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>B.Tech/B.Tech-MS Programmes:</h3>
                <ul className={`list-disc list-inside space-y-2 text-base mb-6 pl-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>Computer Science and Engineering (CSE)</li>
                  <li>Electronics and Communication Engineering (ECE)</li>
                  <li>Computer Science with specialisation in Cyber Security</li>
                  <li>Computer Science with specialisation in AI & Data Science</li>
                </ul>
                
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Admission to the B.Tech/B.Tech-MS programme will be based on performance in the Joint Entrance Examination (JEE - Main) conducted by National Testing Agency (NTA) (subject to change if any ordered by Ministry of Education, Govt. of India) through the counselling under JoSAA/CSAB.
                  <a href="#" className="font-semibold" style={{ color: color1 }}> Click here for details...</a>
                </p>
                
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  The number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.
                </p>
              </div>
            </div>
          </section>

          {/* Fee Structure Section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <DollarSign className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Fee Structure
              </h2>
            </div>
            <div className={`rounded-lg p-8 md:p-12 shadow-xl overflow-hidden relative border-2 transition-all duration-500 ${darkMode ? 'bg-gray-800' : ''}`} style={{ borderColor: darkMode ? '#374151' : `${color1}33`, backgroundColor: darkMode ? '' : '' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
              </div>
              
              <div className="relative">
                <h3 className={`text-xl md:text-2xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Fee Structure for the B.Tech program (Admission 2025)
                </h3>

                  <div className="mb-8 p-6 rounded-2xl border-2 border-dashed bg-white" style={{ borderColor: `${color1}66` , backgroundColor: darkMode ? '#1f2937' : 'white' }   }>
                  <h4 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    Initial First Semester Payment (Admission 2025)
                  </h4>
                  <div className="overflow-x-auto rounded-lg border" style={{ borderColor: `${color1}33` , backgroundColor: darkMode ? '#374151' : 'white' }}>
                    <table className="w-full text-left">
                      <thead style={{ backgroundColor: color2 }}>
                        <tr style={{ backgroundColor: darkMode ? '#374151' : color2 }}>
                          <th className="p-3 text-base font-bold" style={{ color: color1, borderBottom: `2px solid ${color1}66` }}>Fee Component</th>
                          <th className="p-3 text-base font-bold text-right" style={{ color: color1, borderBottom: `2px solid ${color1}66` }}>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialSemesterFees.map((row, index) => (
                          <tr key={index} className={`border-b ${darkMode ? 'text-gray-300' : ''}`} style={{ borderColor: `${color1}33` }}>
                            <td className={`p-3 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{row.item}</td>
                            <td className={`p-3 text-right font-mono ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                   The Fee Structure for B.Tech program - DASA Admission 2025
                </h3>
                
                <div className={`overflow-x-auto rounded-2xl shadow-md border-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                  <table className="w-full min-w-[1200px] text-left text-sm">
                    <thead className="border-b" style={{ backgroundColor: darkMode ? '#1f2937' : color2, borderColor: `${color1}66` }}>
                      <tr>
                        <th rowSpan="2" className="p-4 align-middle text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Details</th>
                        <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>First Year</th>
                        <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Second Year</th>
                        <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Third Year</th>
                        <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1 }}>Fourth Year</th>
                      </tr>
                      <tr className="border-b" style={{ borderColor: `${color1}66` }}>
                        <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>First Semester</th>
                        <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Second Semester</th>
                        <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Third Semester</th>
                        <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Fourth Semester</th>
                        <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Fifth Semester</th>
                        <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Sixth Semester</th>
                        <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Seventh Semester</th>
                        <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Eighth Semester</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feeStructure.map((row, index) => (
                        <tr key={index} className="border-b" style={{ borderColor: `${color1}33` }}>
                          <td className={`p-3 font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.details}</td>
                          <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem1}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem2}</td>
                          <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem3}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem4}</td>
                          <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem5}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem6}</td>
                          <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem7}</td>
                          <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.sem8}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-8 space-y-4">
                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      (b) Non SAARC & SAARC : As per DASA fee structure -&gt; 
                      <a href="#" className="font-semibold" style={{ color: color1 }}> DASA Admission-2025</a>.
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Mode of reporting at the institute:</strong> Offline
                    </p>
                  </div>
                   <div className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                    <p className={`text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <strong>Date of commencement of classes:</strong> Will be finalized according to the JoSAA/CSAB schedule and will be declared later.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Post Graduate Programmes Section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <BookOpenText className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Post Graduate Programmes
              </h2>
            </div>
            <div className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} style={{ borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12">
                <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <a href="#" className="font-semibold text-lg" style={{ color: color1 }}>e-M.Tech Admission - Click here to view details</a>
                </p>

                <ul className={`list-disc list-inside space-y-2 text-base mb-6 pl-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>(i). AI, ML and Data Science</li>
                  <li>(ii). Cyber Security and Digital Forensics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Doctoral Programmes Section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <Microscope className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Doctoral Programmes
              </h2>
            </div>
            <div className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} style={{ borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12">
                <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <a href="#" className="font-semibold text-lg" style={{ color: color1 }}>PhD Admission - Click here view details</a>
                </p>

                <ul className={`list-disc list-inside space-y-2 text-base mb-6 pl-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <li>(i). Computer Science and Engineering(CSE)</li>
                  <li>(ii). Electronics and Communication Engineering(ECE)</li>
                  <li>(iii). Mathematics</li>
                </ul>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
    </>
  );
}
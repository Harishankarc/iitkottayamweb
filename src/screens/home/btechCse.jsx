import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx'; // Fixed import path
import api from '../../api/api.jsx'; // Fixed import path
import {
  Cpu,
  Image,
  GraduationCap,
  DollarSign,
  Calendar,
  BookOpenText,
  Scale
} from 'lucide-react';

// Mock theme hook and api object to resolve imports - REMOVED
// const useTheme = () => ({ darkMode: false });
// const api = {
//   color1: '#239244', // (Dark Green)
//   color2: '#e8f5f0', // (Light Mint)
//   color3: '#F1F3F3', // (Light Gray)
// };

export default function BTechCSE() {
  const { darkMode } = useTheme();
  const color1 = api.color1; // #239244 (Dark Green)
  const color2 = api.color2; // #e8f5f0 (Light Mint)
  const color3 = api.color3; // #F1F3F3 (Light Gray)

  // --- Reusable Data for Fee Tables ---
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
  
  // DASA Fee structure (based on screenshot, it's identical to the first table)
  const dasaFeeStructure = [...feeStructure];

  // --- Reusable Helper Components ---

  // Helper component for image placeholders
  const ImagePlaceholder = ({ text }) => (
    <div
      className="rounded-2xl p-8 border-2 border-dashed h-full flex items-center justify-center"
      style={{
        backgroundColor: darkMode ? '#1f2937' : color3,
        borderColor: `${color1}66`
      }}
    >
      <div className="text-center">
        <Image className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
        <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
      </div>
    </div>
  );

  // Helper component for styled links
  const StyledLink = ({ href, text, icon: Icon }) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
        darkMode ? 'hover:bg-gray-700' : 'hover:shadow-lg'
      }`}
      style={{
        backgroundColor: darkMode ? '#374151' : color2,
        color: color1,
        borderColor: darkMode ? `${color1}99` : `${color1}66`
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </a>
  );
  
  // Helper component for Fee Table
  const FeeTable = ({ data }) => (
    <div className={`overflow-x-auto rounded-2xl shadow-md border-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
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
          {data.map((row, index) => (
            <tr key={index} className="border-b" style={{ borderColor: darkMode ? `${color1}66` : `${color1}33` }}>
              <td className={`p-3 font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.details}</td>
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
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f2937E6' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        <div className="relative container mx-auto px-4 py-28 md:py-36">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Cpu className="w-4 h-4" style={{ color: color1 }} />
              B.Tech Programme
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Computer Science <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>& Engineering</span>
            </h1>
            <p className={`text-xl md:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Building a strong foundation in core computer science, engineering, and simulation.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg className={`w-full h-20 ${darkMode ? 'fill-gray-900' : 'fill-white'}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16 -mt-24 md:-mt-32">
        <div className="max-w-7xl mx-auto space-y-12">

          {/* Introduction Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The programme is designed to build a strong foundation in Computer Science and Engineering that includes hardware, simulation and emulation. The programme has a blend of core courses, department electives, open electives, and management electives. The BTech CSE programme starts with computation oriented courses and the initial four semesters are focused on creating a strong Computer Science Foundation which enables the student to harness the required engineering skills for problem solving using computer science.
              </p>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <ImagePlaceholder text="Campus / Lab Image 1" />
                <ImagePlaceholder text="Campus / Lab Image 2" />
                <ImagePlaceholder text="Campus / Lab Image 3" />
              </div>
            </div>
          </section>

          {/* Admission Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                  <GraduationCap className="w-8 h-8" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Admission
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Admission to the B.Tech/B.Tech-MS programme will be based on performance in the Joint Entrance Examination (JEE - Main) conducted by National Testing Agency(NTA) (subject to change if any ordered by Ministry of Education, Govt. of India) through the counselling under JoSAA/CSAB. 
                <a href="#" className="font-semibold" style={{ color: color1 }}> Click here for details...</a>
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.
              </p>
            </div>
          </section>
          
          {/* Fee Structure Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">

                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Fee Structure for the B.Tech program (Admission 2025)
                </h2>
              </div>
              
              <FeeTable data={feeStructure} />

              <p className={`text-lg leading-relaxed mt-6 p-6 rounded-2xl border-2 border-dashed ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-white'}`} style={{ borderColor: `${color1}66`, backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}>
                In view of the above, the initial first semester payment on joining for the admission-2025 shall be 1,45,200/- towards tuition fee, 34,000/- towards hostel/facility maintenance fee, 30,750/- towards mess advance, Rs. 1300/- towards medical insurance, 300/- towards mess equipment maintenance, 300/- towards sports equipment maintenance, 300/- towards club activities, Rs. 13,000/- towards caution deposit, Rs. 1100/- towards sports (one-time fee) & Rs. 1100/- towards mess (one-time fee).
              </p>
            </div>
          </section>

          {/* DASA Fee Structure Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                 The Fee Structure for B.Tech program - DASA Admission 2025
              </h2>

              <FeeTable data={dasaFeeStructure} />

              <div className="mt-8 space-y-4">
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  (a) CIWG Category: As per DASA fee structure.
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  (b) Non SAARC & SAARC : As per DASA fee structure -&gt; 
                  <a href="#" className="font-semibold" style={{ color: color1 }}> DASA Admission-2025</a>.
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  <strong>Mode of reporting at the institute:</strong> Offline
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  <strong>Date of commencement of classes:</strong> Will be finalized according to the JoSAA/CSAB schedule and will be declared later.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Links Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                The detailed curriculum and regulations can be found here:
              </h3>
              <div className="flex flex-wrap gap-4">
                <StyledLink 
                  href="#" 
                  text="UG Academic Calendar" 
                  icon={Calendar} 
                />
                <StyledLink 
                  href="#" 
                  text="B.Tech CSE Curriculum" 
                  icon={BookOpenText} 
                />
                <StyledLink 
                  href="#" 
                  text="UG Course Regulations" 
                  icon={Scale} 
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}




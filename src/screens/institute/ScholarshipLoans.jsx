import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Scale, Landmark, FileText, Link as LinkIcon } from 'lucide-react';

export default function ScholarshipLoan() {
  const { darkMode } = useTheme();
  const color1 = api.color1; // #239244 (Dark Green)
  const color2 = api.color2; // #e8f5f0 (Light Mint)
  const color3 = api.color3; // #F1F3F3 (Light Gray)

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

  // Helper component for Bank Sections
  const BankSection = ({ title, linkText, linkHref = "#" }) => (
    <div 
      className="pb-8 border-b" 
      style={{ borderColor: darkMode ? `${color1}66` : `${color1}33` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Landmark className="w-7 h-7" style={{ color: color1 }} />
        <h3 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
      <a href={linkHref} className="font-semibold text-lg inline-block ml-10 hover:underline" style={{ color: color1 }}>
        {linkText}
      </a>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '70vh' }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f2937E6' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Scale className="w-4 h-4" style={{ color: color1 }} />
              Financial Support
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Scholarship & <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>Educational Loans</span>
            </h1>
            <p className={`text-xl md:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Explore financial aid options, scholarships, and bank loan schemes available to students.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto space-y-16">

          {/* Introduction Section */}
          <section>
            <div className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-2xl '
            }`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12">
                <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} >
                  Students are free to approach any banks for the educational loan. Institute will issue the needed documents upon receipt of a written request from the students.
                </p>
              </div>
            </div>
          </section>

          {/* Bank Loans Section */}
          <section>
            <div className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-2xl'
            }`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12 space-y-10">
                
                <BankSection 
                  title="State Bank of India"
                  linkText="Scholar Loan Scheme..Click here.."
                />

                <BankSection 
                  title="Punjab National Bank"
                  linkText="Click here.."
                />

                <BankSection 
                  title="Indian Bank"
                  linkText="Loan Scheme..Click here.."
                />

                <BankSection 
                  title="Union Bank"
                  linkText="Loan Scheme..Click here.."
                />

                <BankSection 
                  title="Canara Bank"
                  linkText="MoU between Canara Bank and Ministry of Education... Click here.."
                />

              </div>
            </div>
          </section>

          {/* Other Resources Section */}
          <section>
            <div className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
                : 'bg-white border-gray-200 hover:shadow-2xl '
            }`}onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
              <div className="p-8 md:p-12">
                <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Other Resources
                </h2>
                <div className="flex flex-wrap gap-4">
                  <StyledLink 
                    href="#" 
                    text="Ministry of Finance (Office Memorandum) - Education Loan for IIIT Students" 
                    icon={LinkIcon} 
                  />
                  <StyledLink 
                    href="#" 
                    text="National Scholarship Portal... For Details..Click here.." 
                    icon={LinkIcon} 
                  />
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
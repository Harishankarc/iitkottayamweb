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
      className="pb-6 border-b last:border-b-0" 
      style={{ borderColor: darkMode ? `${color1}66` : `${color1}33` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
          <Landmark className="w-4 h-4" style={{ color: color1 }} />
        </div>
        <h3 className={`text-lg md:text-xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {title}
        </h3>
      </div>
      <a href={linkHref} className="text-sm font-semibold inline-block ml-11 hover:underline transition-colors duration-300" style={{ color: color1 }}>
        {linkText}
      </a>
    </div>
  );

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="w-full mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Scale className="w-4 h-4" style={{ color: color1 }} />
                Financial Support
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Scholarship & Educational Loans
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Explore financial aid options, scholarships, and bank loan schemes available to students.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="mx-auto py-8 px-6 max-w-full">
          <div className="w-full mx-auto space-y-8">


          {/* Bank Loans Section */}
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <Landmark className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Bank Loan Schemes
              </h2>
            </div>
            <div 
              className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
            >
              <div className="p-8 md:p-12 space-y-6">
                
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
          <section className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                <FileText className="w-6 h-6" style={{ color: color1 }} />
              </div>
              <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Other Resources
              </h2>
            </div>
            <div 
              className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
            >
              <div className="p-8 md:p-12">
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
      </main>
    </div>
    </>
  );
}
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx'; // Added dark mode import
import api from '../../api/api.jsx'; // Added api import
import { Scale, Landmark, FileText, Link as LinkIcon } from 'lucide-react';

export default function ScholarshipLoan() {
  const { darkMode } = useTheme(); // Added dark mode state
  const color1 = api.color1; // #239244 (Dark Green)
  const color2 = api.color2; // #e8f5f0 (Light Mint)
  const color3 = api.color3; // #F1F3F3 (Light Gray)

  // Helper component for styled links (now with dark mode)
  const StyledLink = ({ href, text, icon: Icon }) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
        darkMode ? 'hover:bg-gray-700' : 'hover:shadow-lg'
      }`}
      style={{
        backgroundColor: darkMode ? '#374151' : color2, // dark:bg-gray-700, light: color2
        color: color1, // text-color1
        borderColor: darkMode ? `${color1}99` : `${color1}66` // border-color1
      }}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </a>
  );

  // Helper component for image placeholders (now with dark mode)
  const ImagePlaceholder = ({ text, subtext }) => (
    <div 
      className="mt-6 rounded-2xl p-8 border-2 border-dashed" 
      style={{ 
        backgroundColor: darkMode ? '#1f2937' : color3, 
        borderColor: `${color1}66` 
      }}
    >
      <div className="text-center">
        <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
        <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
        <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{subtext}</p>
      </div>
    </div>
  );

  // Helper component for Bank Sections (now with dark mode)
  const BankSection = ({ title, linkText, linkHref = "#", showImage = false, imgText, imgSubtext }) => (
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
      {showImage && (
        <ImagePlaceholder text={imgText} subtext={imgSubtext} />
      )}
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
        <div className="absolute bottom-0 left-0 right-0">
          <svg className={`w-full h-20 ${darkMode ? 'fill-gray-900' : 'fill-white'}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
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
                  showImage={true}
                  imgText="State Bank of India Loan Schemes"
                  imgSubtext="Visual content for SBI YONO Cash, PM Vidyalakshmi, etc."
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
                  showImage={true}
                  imgText="Union Bank Education Loan"
                  imgSubtext="Visual content for Union Bank loan scheme."
                />

                <BankSection 
                  title="Canara Bank"
                  linkText="MoU between Canara Bank and Ministry of Education... Click here.."
                  showImage={true}
                  imgText="Canara Bank PM-VIDYALAKSHMI Scheme"
                  imgSubtext="Visual content for Canara Bank loan scheme."
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



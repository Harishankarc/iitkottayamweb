import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/api.jsx';
import { useTheme } from '../../context/createContext.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';
import {
  Sparkles,
  GraduationCap,
  ArrowRight,
  Edit2,
} from 'lucide-react';


export default function WhyIIIT() {
  // Fetch dynamic content from database
  const { content: pageContent, blocks: contentBlocks, loading: contentLoading } = usePageContent('why-iiitk');

  const { darkMode } = useTheme();

  const color1 = API.color1; // #239244 (Dark Green)
  const color2 = API.color2; // #e8f5f0 (Light Mint)
  const color3 = API.color3; // #F1F3F3 (Light Gray)

  // Check if admin is logged in
  const isAdmin = localStorage.getItem('token');

  // Check if we have dynamic content
  const hasDynamicContent = contentBlocks && contentBlocks.length > 0;
  const visibleBlocks = hasDynamicContent ? getVisibleBlocks(contentBlocks) : [];
  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <header className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
          <div className="mx-auto py-2">
            <div className="max-w-5xl mx-auto text-center px-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-full text-xs font-bold mb-3 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Sparkles className="w-4 h-4" style={{ color: color1 }} />
                {pageContent?.pageTitle || 'Established 2015 • Institution of National Importance'}
              </div>
              <h1 className={`text-2xl md:text-3xl font-extrabold mb-3 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Why <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>IIIT Kottayam</span>
              </h1>
              <p className={`text-xs md:text-sm leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {pageContent?.metaDescription || 'Pioneering excellence in Information Technology education and research'}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto py-8 px-6 max-w-full">
          {/* Show dynamic content if available */}
          {hasDynamicContent ? (
            <div className="space-y-6 max-w-6xl mx-auto">
              {visibleBlocks.map((block, index) => (
                <div key={block.blockId || index}>
                  {renderContentBlock(block, { darkMode, color1, color2 })}
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Static fallback content (original content) */}
              
          {/* Introduction Card */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <div className={`rounded-lg shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <div className="p-8 md:p-12">
                  <div className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold mb-4 border-2 shadow-md text-white rounded-lg" style={{ backgroundColor: color1, borderColor: color1 }} >
                    <GraduationCap className="w-4 h-4" />
                    About Our Institute
                  </div>
                  <p className={`text-sm md:text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The Indian Institute of Information Technology (IIIT) Kottayam is an <span className="font-bold" style={{ color: color1 }}>"Institution of National Importance"</span> established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.
                  </p>
                  <p className={`text-sm md:text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-5">
                    {['🤝 PPP Model', '🌳 53 Acre Campus', '🚀 AIC Certified', '🏆 National Importance'].map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-xl text-xs font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Page Referral Banner */}
          <section className="mb-8">
            <div className="w-full mx-auto">
              <Link to="/admissions" className="block">
                <div className="rounded-lg p-8 md:p-10 shadow-xl border relative overflow-hidden group" style={{ backgroundColor: color1, borderColor: color1 }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 transition-colors duration-300">
                        Interested in Joining IIIT Kottayam?
                      </h3>
                      <p className="text-sm md:text-base text-gray-50 transition-colors duration-300">
                        Explore our admission process, eligibility criteria, and application deadlines
                      </p>
                    </div>
                    <div className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                      <span className="text-white group-hover:text-[#239244] font-bold text-sm transition-colors duration-300">Learn More</span>
                      <ArrowRight className="w-5 h-5 text-white group-hover:text-[#239244] group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}
import { Moon, Sun, Menu, X } from "lucide-react";
import API from "../api/api";
import logo from '../assets/images/iiitlogo.jpg';
import DesktopNavigation from "./desktopnav";
import MobileNavigation from "./mobnav";
import { useTheme } from "../context/createContext";
import React, { useState, useEffect } from "react";
import ImageSlider from "./imageslider";
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import AnnouncementBanner from "./announcementbanner";

export default function NavBar() {
  const {
    darkMode,
    toggleDarkMode,
    fontSize,
    setFontSize,
    increaseFontSize,
    decreaseFontSize,
    language,
    setLanguage
  } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full">
      {/* Top Utility Bar - Green background - Not sticky, all items aligned right */}
      <div className="w-full py-1.5 px-4 md:px-12" style={{ backgroundColor: API.color1 }}>
        <div className="max-w-[1400px] mx-auto flex justify-end items-center">
          {/* All items on right side */}
          <div className="flex items-center gap-3 md:gap-4">
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors">
              HOME
            </a>
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors">
              WEBMAIL
            </a>
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors">
              INTRANET
            </a>
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors hidden md:block">
              TELEPHONE DIRECTORY
            </a>
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors hidden lg:block">
              NIWAHIKA
            </a>
            <a href="/rti" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors hidden lg:block">
              RTI
            </a>
            <a href="#" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors hidden lg:block">
              IMS
            </a>
            <a href="/login" className="text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors hidden xl:block">
              LOGIN
            </a>

            {/* Separator */}
            <span className="text-white text-xs hidden md:block">|</span>

            {/* Font Size Controls */}
            <button
              onClick={decreaseFontSize}
              className="flex items-center justify-center w-6 h-6 text-white text-[10px] font-semibold hover:bg-green-700 rounded transition-all"
                 style={{
                color: darkMode ? '#facc15' : '#000000'
              }}
              aria-label="Decrease font size"
            >
              A-
            </button>

            <button
              onClick={increaseFontSize}
              className="flex items-center justify-center w-6 h-6 text-white text-xs font-semibold hover:bg-green-700 rounded transition-all"
                            style={{
                color: darkMode ? '#facc15' : '#000000'
              }}
              aria-label="Increase font size"
            >
              A+
            </button>

            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center w-6 h-6 text-white hover:bg-green-700 rounded transition-all"
                  style={{
                color: darkMode ? '#facc15' : '#000000'
              }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <div className="flex gap-1 items-center">
              {['മലയാളം', 'हिं', 'ENG'].map((lang, index) => (
                <React.Fragment key={`${lang}-${darkMode}`}>
                  <button
                    onClick={() => setLanguage(lang)}
                    style={{
                      color: darkMode 
                        ? (language === lang ? '#facc15' : '#fef08a') 
                        : '#ffffff'
                    }}
                    className={`px-1 py-0.5 text-[10px] font-medium cursor-pointer ${
                      language === lang ? 'underline font-bold' : 'hover:underline'
                    }`}
                  >
                    {lang}
                  </button>
                  {index < 2 && <span className="text-white text-[10px]">|</span>}
                </React.Fragment>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search..."
              className="hidden xl:block ml-2 px-2 py-0.5 text-[10px] rounded border border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-white w-28"
              style={{
                color: darkMode ? '#facc15' : '#000000'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Header with Logo and Title - White Background - Becomes sticky when scrolled */}
      <div 
        className={`w-full px-4 md:px-12 transition-all duration-300 ${
          isScrolled ? 'py-1 sticky top-0 z-50 shadow-md' : 'py-2'
        } ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
      >
        <div className="max-w-[1400px] mx-auto flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-1.5 rounded transition-colors ${
              darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-100'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <img 
            src={logo} 
            alt="IIIT Kottayam Logo" 
            className={`transition-all duration-300 object-contain ${
              isScrolled ? 'w-[60px] h-[60px] md:w-[90px] md:h-[90px]' : 'w-[80px] h-[80px] md:w-[115px] md:h-[115px] lg:w-[145px] lg:h-[145px]'
            }`}
          />

          {/* Institute Name - Right aligned with blue-green gradient effect */}
          <div className={`flex flex-col flex-1 items-end transition-all duration-300 ${
            isScrolled ? 'hidden lg:block' : ''
          }`}>
            {!isScrolled && (
              <>
                <h1 
                  className={`${
                    fontSize === 'small' ? 'text-[9px] sm:text-[10px] md:text-[12px] lg:text-[15px]' :
                    fontSize === 'large' ? 'text-[11px] sm:text-[12px] md:text-[15px] lg:text-[18px]' : 'text-[10px] sm:text-[11px] md:text-[13px] lg:text-[15px]'
                  } font-normal leading-tight text-right animate-gradient`}
                  style={{
                    background: 'linear-gradient(90deg, #00a896, #00d4ff, #239244, #00a896)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-flow 3s linear infinite'
                  }}
                >
                  ഇന്ത്യൻ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഇൻഫർമേഷൻ ടെക്നോളജി കോട്ടയം
                </h1>
                <h1 
                  className={`${
                    fontSize === 'small' ? 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px]' :
                    fontSize === 'large' ? 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px]' : 'text-[12px] sm:text-[14px] md:text-[18px] lg:text-[20px]'
                  } font-semibold leading-tight text-right animate-gradient`}
                  style={{
                    background: 'linear-gradient(90deg, #00a896, #00d4ff, #239244, #00a896)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    animation: 'gradient-flow 3s linear infinite'
                  }}
                >
                  भारतीय सूचना प्रौद्योगिकी संस्थान कोट्टायम
                </h1>
              </>
            )}
            <h1 
              className={`${
                isScrolled 
                  ? 'text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px]' 
                  : fontSize === 'small' ? 'text-[14px] sm:text-[16px] md:text-[18px] lg:text-[22px]' :
                    fontSize === 'large' ? 'text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]' : 'text-[14px] sm:text-[16px] md:text-[20px] lg:text-[22px]'
              } font-semibold leading-tight text-right transition-all duration-300 animate-gradient`}
              style={{
                background: 'linear-gradient(90deg, #00a896, #00d4ff, #239244, #00a896)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-flow 3s linear infinite'
              }}
            >
              Indian Institute of Information Technology Kottayam
            </h1>
          </div>
        </div>
        {!isScrolled && <hr className="mt-1.5" style={{ borderColor: API.color1 }} />}
      </div>

      {/* Add CSS for gradient animation */}
      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      {/* Desktop Navigation - STICKY */}
      <div className={`hidden lg:block sticky top-0 z-50 transition-all duration-300`}>
        <DesktopNavigation isScrolled={isScrolled} />
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        darkMode={darkMode}
        fontSize={fontSize}
      />
    </div>
  );
}
import { Moon, Sun, Menu, X, Search } from "lucide-react";
import API from "../api/api";
import logo from '../assets/images/iiitlogo.jpg';
import DesktopNavigation from "./desktopnav";
import MobileNavigation from "./mobnav";
import { useTheme } from "../context/createContext";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ImageSlider from "./imageslider";
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import AnnouncementBanner from "./announcementbanner";

// Translation helper
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') return;
      try {
        const response = await API.post('/api/translate-bulk', {
          texts: ['HOME', 'WEBMAIL', 'INTRANET', 'TELEPHONE DIRECTORY', 'NIWAHIKA', 'RTI', 'IMS', 'LOGIN'],
          targetLang: language
        });
        if (response.success && response.data?.data?.translations) {
          const translationMap = {};
          response.data.data.translations.forEach(t => {
            translationMap[t.originalText] = t.translatedText;
          });
          setTranslations(translationMap);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };
    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  return { t };
};

export default function NavBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
  const [isGoogleTranslateReady, setIsGoogleTranslateReady] = useState(false);
  const [navbarLinks, setNavbarLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isClosingModal, setIsClosingModal] = useState(false);
  const [allPages, setAllPages] = useState([]);

  useEffect(() => {
    // Fetch navbar links from API
    const fetchNavbarLinks = async () => {
      try {
        // Add timestamp to prevent caching
        const response = await API.get(`/api/navbar-links?_t=${Date.now()}`);
        console.log('Navbar API Response:', response);
        
        if (response.success && response.data) {
          // Handle both nested and direct data structures
          const navbarData = response.data.data || response.data;
          console.log('Navbar data received:', navbarData);
          
          if (Array.isArray(navbarData)) {
            setNavbarLinks(navbarData);
          } else {
            console.warn('Navbar data is not an array:', navbarData);
            setNavbarLinks([]);
          }
        }
      } catch (error) {
        console.error('Error fetching navbar links:', error);
        setNavbarLinks([]);
      }
    };
    fetchNavbarLinks();

    // Fetch all navigation pages for search
    const fetchAllPages = async () => {
      try {
        const response = await API.get(`/api/navigation?_t=${Date.now()}`);
        if (response.success && response.data) {
          const navData = response.data.data || response.data;
          
          // Flatten navigation structure (including submenus)
          const flattenPages = (items) => {
            let pages = [];
            items.forEach(item => {
              pages.push({
                label: item.label,
                path: item.path,
                isExternal: item.isExternal
              });
              
              if (item.children && Array.isArray(item.children)) {
                item.children.forEach(child => {
                  pages.push({
                    label: `${item.label} > ${child.label}`,
                    path: child.path,
                    isExternal: child.isExternal
                  });
                });
              }
            });
            return pages;
          };
          
          if (Array.isArray(navData)) {
            setAllPages(flattenPages(navData));
          }
        }
      } catch (error) {
        console.error('Error fetching navigation pages:', error);
      }
    };
    fetchAllPages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check if Google Translate is ready
  useEffect(() => {
    const checkGoogleTranslate = () => {
      // Check both the DOM element and window flag
      const selectElement = document.querySelector('.goog-te-combo');
      const scriptLoaded = window.googleTranslateScriptLoaded;
      const isReady = window.googleTranslateReady;
      
      if (selectElement || isReady) {
        setIsGoogleTranslateReady(true);
        console.log('Google Translate is ready');
        return true;
      }
      
      // Log script loading status
      if (scriptLoaded === false) {
        console.error('Google Translate script failed to load - may be blocked by firewall/network');
      }
      
      return false;
    };

    // Check immediately
    if (checkGoogleTranslate()) return;

    // Check periodically
    const interval = setInterval(() => {
      if (checkGoogleTranslate()) {
        clearInterval(interval);
      }
    }, 500);

    // Clear after 15 seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (!isGoogleTranslateReady) {
        console.warn('Google Translate did not load - translation features disabled');
        console.warn('This may be due to: network issues, firewall blocking Google domains, or browser extensions');
      }
    }, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Filter pages based on search query
      const filtered = allPages.filter(page =>
        page.label.toLowerCase().includes(query.toLowerCase()) ||
        page.path.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10); // Limit to 10 results
      
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (page) => {
    if (page.isExternal) {
      window.open(page.path, '_blank');
    } else {
      navigate(page.path);
    }
    setIsClosingModal(true);
    setTimeout(() => {
      setSearchQuery('');
      setShowSearchModal(false);
      setSearchResults([]);
      setIsClosingModal(false);
    }, 300);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      // Navigate to first result
      handleSearchSelect(searchResults[0]);
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  };

  const openSearchModal = () => {
    setShowSearchModal(true);
    setIsClosingModal(false);
  };

  const closeSearchModal = () => {
    setIsClosingModal(true);
    setTimeout(() => {
      setShowSearchModal(false);
      setSearchQuery('');
      setSearchResults([]);
      setIsClosingModal(false);
    }, 300);
  };

  return (
    <div className="w-full">
      {/* Top Utility Bar - Green background - Not sticky, all items aligned right */}
      <div className="w-full py-1.5 px-4 md:px-12" style={{ backgroundColor: API.color1 }}>
        <div className="max-w-[1400px] mx-auto flex justify-end items-center">
          {/* All items on right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Dynamic Navbar Links */}
            {navbarLinks.map((link) => {
              // Build visibility classes based on device settings
              let visibilityClasses = '';
              
              if (!link.showOnMobile && link.showOnTablet && link.showOnDesktop) {
                visibilityClasses = 'hidden md:block';
              } else if (!link.showOnMobile && !link.showOnTablet && link.showOnDesktop) {
                visibilityClasses = 'hidden lg:block';
              } else if (!link.showOnMobile && link.showOnTablet && !link.showOnDesktop) {
                visibilityClasses = 'hidden md:block lg:hidden';
              } else if (link.showOnMobile && !link.showOnTablet && link.showOnDesktop) {
                visibilityClasses = 'md:hidden lg:block';
              } else if (link.showOnMobile && link.showOnTablet && !link.showOnDesktop) {
                visibilityClasses = 'lg:hidden';
              } else if (link.showOnMobile && !link.showOnTablet && !link.showOnDesktop) {
                visibilityClasses = 'md:hidden';
              } else if (!link.showOnMobile && !link.showOnTablet && !link.showOnDesktop) {
                visibilityClasses = 'hidden';
              }
              // If all true, no visibility class needed (shows on all devices)

              return (
                <a 
                  key={link.id}
                  href={link.url} 
                  target={link.openInNewTab ? '_blank' : '_self'}
                  rel={link.openInNewTab ? 'noopener noreferrer' : ''}
                  className={`text-white text-[10px] md:text-xs hover:text-gray-200 transition-colors ${visibilityClasses}`}
                >
                  {t(link.label)}
                </a>
              );
            })}

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

            {/* Search Button */}
            <button
              onClick={openSearchModal}
              className="hidden xl:flex items-center gap-1.5 px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded transition-all duration-300 active:scale-95 hover:scale-105 hover:shadow-lg hover:shadow-white/20 animate-pulse-subtle"
              aria-label="Search pages"
              title="Search pages (Ctrl+K)"
            >
              <Search size={16} className="transition-transform duration-300 hover:rotate-12" />
              <span className="text-xs font-medium">Search</span>
            </button>
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
        
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
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

      {/* Search Modal */}
      {showSearchModal && (
        <div 
          className={`fixed inset-0 backdrop-blur-md z-[100] flex items-start justify-center pt-20 px-4 transition-all duration-300 ${
            darkMode ? 'bg-black/20' : 'bg-white/30'
          } ${isClosingModal ? 'opacity-0 backdrop-blur-none' : 'opacity-100'}`}
          onClick={closeSearchModal}
        >
          <div 
            className={`w-full max-w-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-2xl overflow-hidden transition-all duration-300 ${
              isClosingModal ? 'scale-95 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="Search pages..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyPress={handleSearchKeyPress}
                  autoFocus
                  className={`flex-1 text-lg outline-none ${
                    darkMode ? 'bg-gray-800 text-white placeholder-gray-400' : 'bg-white text-gray-900 placeholder-gray-500'
                  }`}
                />
                <button
                  onClick={closeSearchModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <Search size={48} className="mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Start typing to search pages...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  {searchResults.map((page, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchSelect(page)}
                      className={`w-full text-left px-6 py-4 border-b transition-colors ${
                        darkMode 
                          ? 'border-gray-700 hover:bg-gray-700' 
                          : 'border-gray-100 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {page.label}
                          </div>
                          <div className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {page.path}
                          </div>
                        </div>
                        {page.isExternal && (
                          <span className={`text-xs px-2 py-1 rounded ${
                            darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                          }`}>
                            External
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className={`p-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <p>No pages found for "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Footer Hint */}
            <div className={`px-6 py-3 border-t flex items-center justify-between text-xs ${
              darkMode ? 'bg-gray-900 border-gray-700 text-gray-400' : 'bg-gray-50 border-gray-200 text-gray-500'
            }`}>
              <div className="flex items-center gap-4">
                <span>Press <kbd className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} border`}>↵</kbd> to navigate</span>
                <span>Press <kbd className={`px-1.5 py-0.5 rounded ${darkMode ? 'bg-gray-700' : 'bg-white'} border`}>Esc</kbd> to close</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
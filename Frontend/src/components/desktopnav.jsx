import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useTheme } from '../context/createContext';
import { navigationConfig } from '../config/navigationConfig';
import campusImage from '../assets/images/img1.jpg';

const DropdownMenu = ({ items, isOpen, onClose }) => {
  const { darkMode, fontSize } = useTheme();

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs';
    if (fontSize === 'large') return 'text-sm';
    return 'text-[13px]';
  };

  if (!isOpen) return null;

  // Determine grid columns based on number of items
  const getGridColumns = () => {
    if (items.length <= 5) return 'grid-cols-1';
    if (items.length <= 10) return 'grid-cols-2';
    if (items.length <= 15) return 'grid-cols-3';
    return 'grid-cols-4';
  };

  return (
    <div
      className={`absolute left-0 right-0 shadow-2xl z-50 ${
        darkMode 
          ? 'bg-gray-800 border-t border-gray-700' 
          : 'bg-white border-t border-gray-200'
      }`}
    >
      
      <div className="max-w-[1400px] mx-auto px-12 py-8 flex gap-8">
        {/* Left side - Image */}
        <div className="w-80 flex-shrink-0">
          <img 
            src={campusImage} 
            alt="IIIT Kottayam Campus" 
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right side - Menu Items */}
        <div className="flex-1">
          <div className={`grid ${getGridColumns()} gap-x-12 gap-y-1`} role="menu">
            {items.map((item) => (
              <div key={item.id}>
                {item.link.startsWith('http') ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block px-0 py-2 transition-colors duration-100 ${getFontSizeClass()} ${
                      darkMode
                        ? 'text-gray-300 hover:text-green-400'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.link}
                    className={`block px-0 py-2 transition-colors duration-100 ${getFontSizeClass()} ${
                      darkMode
                        ? 'text-gray-300 hover:text-green-400'
                        : 'text-gray-700 hover:text-green-600'
                    }`}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DesktopNavigation({ isScrolled = false }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { darkMode, fontSize } = useTheme();
  const timeoutRef = useRef(null);

  const getNavFontSizeClass = () => {
    if (isScrolled) return 'text-m';
    if (fontSize === 'small') return 'text-sm';
    if (fontSize === 'large') return 'text-lg';
    return 'text-[15px]';
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <nav className={`hidden lg:flex w-full items-center justify-center gap-8 px-6 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-3'
      } ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        {navigationConfig.map((navItem) => (
          <div
            key={navItem.id}
            className="relative"
            onMouseEnter={() => navItem.hasDropdown && handleMouseEnter(navItem.id)}
          >
            <Link
              to={navItem.link || '#'}
              className={`flex items-center gap-1 font-semibold transition-all duration-200 ${getNavFontSizeClass()} ${
                isScrolled 
                  ? `pb-1 border-b-2 border-transparent hover:border-green-600 ${
                      darkMode ? 'text-yellow-400 hover:text-green-400' : 'text-gray-800 hover:text-green-600'
                    }`
                  : darkMode
                    ? 'text-yellow-400 hover:text-green-400'
                    : 'text-gray-800 hover:text-green-600'
              }`}
            >
              {navItem.label}
              {navItem.hasDropdown && (
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${openDropdown === navItem.id ? 'rotate-180' : ''}`}
                />
              )}
            </Link>
          </div>
        ))}
      </nav>

      {/* Render dropdown outside nav but inside relative container */}
      {navigationConfig.map((navItem) => 
        navItem.hasDropdown && openDropdown === navItem.id && (
          <DropdownMenu
            key={navItem.id}
            items={navItem.submenu}
            isOpen={true}
            onClose={() => setOpenDropdown(null)}
            menuId={navItem.id}
          />
        )
      )}
    </div>
  );
};



import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/createContext';
import ImageSlider from './imageslider';
import img1 from '../assets/images/img1.jpg';
import img2 from '../assets/images/img2.jpg';
import img3 from '../assets/images/img3.jpg';
import { MyDiv } from './input_output_utils';
import { navigationConfig } from '../config/navigationConfig';

const NestedMenuItem = ({ item, onClose, darkMode, fontSize }) => {
  const [showNested, setShowNested] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowNested(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShowNested(false), 180);
  };

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  if (item.hasNested) {
    return (
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`flex items-center justify-between px-4 py-2.5 cursor-pointer ${getFontSizeClass()} ${darkMode
            ? 'text-gray-200 hover:bg-green-600 hover:text-white'
            : 'text-gray-700 hover:bg-green-600 hover:text-white'
            }`}
        >
          <span>{item.label}</span>
          <ChevronRight size={16} />
        </div>

        {showNested && (
          <div
            className={`absolute left-full top-0 min-w-[280px] shadow-xl z-50 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border-l-2 border-green-500`}
            style={{ animation: 'fadeIn 0.2s ease-out forwards', pointerEvents: 'auto' }}
          >
            {item.nested.map((nestedItem) => (
              <NestedMenuItem
                key={nestedItem.id}
                item={nestedItem}
                onClose={onClose}
                darkMode={darkMode}
                fontSize={fontSize}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.link}
      className={`block px-4 py-2.5 transition-all duration-300 ${getFontSizeClass()} ${darkMode
        ? 'text-gray-300 hover:bg-green-600 hover:text-white'
        : 'text-gray-600 hover:bg-green-600 hover:text-white'
        }`}
      onClick={onClose}
    >
      {item.label}
    </a>
  );
};

const DropdownMenu = ({ items, isOpen, onClose }) => {
  const { darkMode, fontSize } = useTheme();
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => onClose(), 180);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`absolute left-0 mt-2 shadow-2xl z-50 min-w-[300px] ${darkMode ? 'bg-gray-800' : 'bg-white'
        } overflow-hidden transition-all duration-300 ease-out opacity-0 animate-fadeIn`}
      style={{ animation: 'fadeIn 0.3s ease-out forwards', pointerEvents: 'auto' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="py-2" role="menu">
        {items.map((item) => (
          <NestedMenuItem
            key={item.id}
            item={item}
            onClose={onClose}
            darkMode={darkMode}
            fontSize={fontSize}
          />
        ))}
      </div>
    </div>
  );
};

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const { darkMode, fontSize } = useTheme();
  const timeoutRef = useRef(null);

  const getNavFontSizeClass = () => {
    if (fontSize === 'small') return 'text-sm';
    if (fontSize === 'large') return 'text-lg';
    return 'text-base';
  };

  const handleMouseEnter = (id) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 180);
  };

  return (
    <nav className={`flex gap-6 px-10 pb-2 ${darkMode ? 'bg-[#111827]' : 'bg-white'}`}>
      {navigationConfig.map((navItem) => (
        <div
          key={navItem.id}
          className="relative"
          onMouseEnter={() => navItem.hasDropdown && handleMouseEnter(navItem.id)}
          onMouseLeave={navItem.hasDropdown ? handleMouseLeave : undefined}
        >
          <a
            href={navItem.link || '#'}
            className={`flex items-center gap-1 font-medium transition-colors duration-300 ${getNavFontSizeClass()} ${darkMode
              ? 'text-white hover:text-blue-400'
              : 'text-gray-900 hover:text-blue-600'
              }`}
          >
            {navItem.label}
            {navItem.hasDropdown && (
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${openDropdown === navItem.id ? 'rotate-180' : ''}`}
              />
            )}
          </a>

          {navItem.hasDropdown && (
            <DropdownMenu
              items={navItem.submenu}
              isOpen={openDropdown === navItem.id}
              onClose={() => setOpenDropdown(null)}
            />
          )}
        </div>
      ))}
    </nav>
  );
};

export default function NavigationWithSlider() {
  const sliderImages = [
    { src: img1, alt: 'Campus View 1', title: 'THE BEST OF THE BEST', description: 'Excellence in Education and Research' },
    { src: img2, alt: 'Campus View 2', title: 'Innovation Hub', description: 'Leading the Future of Technology' },
    { src: img3, alt: 'Campus View 3', title: 'World-Class Facilities', description: 'State-of-the-art Infrastructure' }
  ];

  return (
    <div className="relative">
      <MyDiv className="relative z-30" padding={false}>
        <Navigation />
      </MyDiv>
      <ImageSlider images={sliderImages} />
    </div>
  );
}

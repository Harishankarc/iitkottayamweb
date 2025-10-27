import React, { useState, useRef } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/createContext';
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
          className={`flex items-center justify-between px-4 py-2.5 cursor-pointer transition-all duration-200 ${getFontSizeClass()} ${darkMode
            ? 'text-gray-200 hover:bg-green-600 hover:text-white'
            : 'text-gray-700 hover:bg-green-600 hover:text-white'
            }`}
        >
          <span>{item.label}</span>
          <ChevronRight
            size={16}
            className={`transition-transform duration-300 ${showNested ? 'translate-x-1' : ''}`}
          />
        </div>

        {showNested && (
          <div
            className={`absolute left-full top-0 min-w-[280px] shadow-xl z-50 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'
              } border-l-2 border-green-500 overflow-hidden`}
            style={{
              animation: 'slideExpandIn 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
              transformOrigin: 'left center'
            }}
          >
            {item.nested.map((nestedItem, index) => (
              <div
                key={nestedItem.id}
                style={{
                  animation: `fadeInItem 0.3s ease-out forwards`,
                  animationDelay: `${index * 0.05}s`,
                  opacity: 0
                }}
              >
                <NestedMenuItem
                  item={nestedItem}
                  onClose={onClose}
                  darkMode={darkMode}
                  fontSize={fontSize}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <a
      href={item.link}
      className={`block px-4 py-2.5 transition-all duration-200 ${getFontSizeClass()} ${darkMode
        ? 'text-gray-300 hover:bg-green-600 hover:text-white hover:pl-5'
        : 'text-gray-600 hover:bg-green-600 hover:text-white hover:pl-5'
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
        } overflow-hidden`}
      style={{
        animation: 'dropdownSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        transformOrigin: 'top center'
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes slideExpandIn {
          from {
            opacity: 0;
            transform: scaleX(0) translateX(-10px);
          }
          to {
            opacity: 1;
            transform: scaleX(1) translateX(0);
          }
        }

        @keyframes dropdownSlideDown {
          from {
            opacity: 0;
            transform: scaleY(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scaleY(1) translateY(0);
          }
        }

        @keyframes fadeInItem {
          from {
            opacity: 0;
            transform: translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
      <div className="py-2" role="menu">
        {items.map((item, index) => (
          <div
            key={item.id}
            style={{
              animation: `fadeInItem 0.3s ease-out forwards`,
              animationDelay: `${index * 0.05}s`,
              opacity: 0
            }}
          >
            <NestedMenuItem
              item={item}
              onClose={onClose}
              darkMode={darkMode}
              fontSize={fontSize}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function DesktopNavigation() {
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
    <nav className={`hidden lg:flex w-full gap-6 px-10 pb-2 justify-center ${darkMode ? 'bg-[#111827]' : 'bg-white'}`}>
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
              ? 'text-white hover:text-[#111827]'
              : 'text-gray-900 hover:text-[#00aaf0]'
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
}
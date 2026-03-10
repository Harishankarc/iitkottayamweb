import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { navigationConfig } from '../config/navigationConfig';
import API from '../api/api';

const MobileMenuItem = ({ item, onClose, darkMode, fontSize }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  if (item.hasDropdown || item.hasNested) {
    return (
      <div className="border-b border-green-900/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between px-5 py-4 text-left font-medium transition-colors ${getFontSizeClass()} text-white hover:bg-red-900/30`}
        >
          <span className={darkMode ? 'yellow' : 'black'}>
            {item.label}</span>
          <ChevronDown
            size={20}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="bg-green-950/50">
            {(item.submenu || item.nested || []).map((subItem) => (
              <MobileMenuItem
                key={subItem.id}
                item={subItem}
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
      href={item.link || '#'}
      onClick={onClose}
      className={`block px-5 py-4 border-b border-green-900/30 transition-colors ${getFontSizeClass()} text-white hover:bg-green-900/30`}
    >
      {item.label}
    </a>
  );
};

export default function MobileNavigation({ isOpen, onClose, darkMode, fontSize }) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      <div className="fixed left-0 top-0 bottom-0 w-full max-w-sm  z-50 overflow-y-auto lg:hidden shadow-2xl animate-slideIn"
        style={{
          backgroundColor: API.color1
        }}
      >
        <style>{`
          @keyframes slideIn {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
          .animate-slideIn {
            animation: slideIn 0.3s ease-out forwards;
          }
        `}</style>

        <div className="flex items-center justify-end px-4 py-4 border-b border-green-900/30">
          <button
            onClick={onClose}
            className="p-2 text-white hover:bg-red-900/30 rounded transition-colors"
          >
            <X size={24} color='white' />
          </button>
        </div>

        <nav className="py-2">
          {navigationConfig.map((item) => (
            <MobileMenuItem
              key={item.id}
              item={item}
              onClose={onClose}
              darkMode={darkMode}
              fontSize={fontSize}
            />
          ))}
        </nav>
      </div>
    </>
  );
}

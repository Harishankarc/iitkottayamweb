import React, { useState } from 'react';
import { useTheme } from '../context/createContext';

export default function AnnouncementBanner() {
  const [isPaused, setIsPaused] = useState(false);
  const { darkMode, fontSize } = useTheme();

  const announcements = [
    "Online Admissions 2025",
    "AskIITM.com for JoSAA 2023 doubts & queries",
    "Admissions to 4 year Medical Science and Engineering Programs",
    "New Research Facilities Now Open",
    "International Student Applications Open",
    "Campus Placement Drive 2025"
  ];

  const getFontSizeClass = () => {
    if (fontSize === 'small') return 'text-xs';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  return (
    <div
      className={`relative w-full overflow-hidden border-b-2 ${darkMode
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-yellow-500 text-white'
          : 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 border-yellow-400 text-black'
        }`}
    >
      <style>{`
        @keyframes scrollLeft {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .animate-scroll {
          animation: scrollLeft 20s linear infinite;
        }

        .animate-scroll.paused {
          animation-play-state: paused;
        }

        .announcement-item {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }
      `}</style>

      <div className="flex items-center h-12">
        {/* ANNOUNCEMENTS Label */}
        <div
          className={`absolute left-0 z-10 px-6 h-full flex items-center ${darkMode ? 'bg-black text-white' : 'bg-gray-300 text-black'
            }`}
        >
          <span className={`font-bold tracking-wider ${getFontSizeClass()}`}>ANNOUNCEMENTS</span>
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 ${darkMode
                ? 'bg-gradient-to-r from-transparent to-gray-900'
                : 'bg-gradient-to-r from-transparent to-gray-200'
              }`}
          ></div>
        </div>

        {/* Scrolling Content Container */}
        <div
          className="ml-48 flex-1 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex ${isPaused ? 'paused' : ''} animate-scroll`}>
            {[...announcements, ...announcements].map((announcement, index) => (
              <div key={index} className="announcement-item">
                <span className={`font-medium px-8 ${getFontSizeClass()}`}>{announcement}</span>
                <span
                  className={`text-xl px-4 ${darkMode ? 'text-yellow-500' : 'text-yellow-600'
                    }`}
                >
                  |
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 ${darkMode
            ? 'bg-gradient-to-r from-transparent via-yellow-500 to-transparent'
            : 'bg-gradient-to-r from-transparent via-yellow-400 to-transparent'
          }`}
      ></div>
    </div>
  );
}

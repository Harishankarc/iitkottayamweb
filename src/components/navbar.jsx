import { Moon, Sun } from "lucide-react";
import API from "../api/api";
import logo from '../assets/images/iiitlogo.jpg'
import Navigation from "./navigation";
import { useTheme } from "../context/createContext";
import React from "react";

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

  return (
    <div>
      {/* Top accessibility bar */}
      <div className="w-full h-8 flex justify-end items-center px-10 gap-1" style={{
        backgroundColor: API.color1
      }}>
        <button
          onClick={toggleDarkMode}
          className="flex items-center justify-center w-6 h-5 !text-white cursor-pointer hover:opacity-80 transition-opacity mr-2"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={decreaseFontSize}
          className="flex items-center justify-center w-6 h-5 !text-white !text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Decrease font size"
        >
          A-
        </button>

        <button
          onClick={() => setFontSize('medium')}
          className="flex items-center justify-center w-5 h-5 bg-white !text-black !text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity rounded-sm"
          aria-label="Default font size"
        >
          A
        </button>

        <button
          onClick={increaseFontSize}
          className="flex items-center justify-center w-6 h-5 !text-white !text-[12px] font-semibold cursor-pointer hover:opacity-80 transition-opacity"
          aria-label="Increase font size"
        >
          A+
        </button>

        <div className="flex gap-0.5 ml-3 items-center">
          {['മലയാളം', 'हिन्दी', 'ENG'].map((lang, index) => (
            <React.Fragment key={lang}>
              <button
                onClick={() => setLanguage(lang)}
                className={`px-1 py-0.5 font-medium cursor-pointer transition-colors !text-white !text-[12px] ${language === lang ? 'underline' : 'hover:underline'
                  }`}
              >
                {lang}
              </button>
              {index < 2 && <span className="text-white text-[9px]">|</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className={`px-10 py-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="flex justify-between gap-5 mb-2">
          <img src={logo} alt="Logo" className="h-[80px]" />
          <div className="flex flex-col items-end">
            <h1 className={`${fontSize === 'small' ? 'text-[14px]' :
              fontSize === 'large' ? 'text-[18px]' : 'text-[16px]'
              } font-bold gradient-text leading-[1.2] dark:text-white`}>
              ഇന്ത്യൻ ഇൻസ്റ്റിറ്റ്യൂട്ട് ഓഫ് ഇൻഫർമേഷൻ ടെക്നോളജി കോട്ടയം
            </h1>
            <h1 className={`${fontSize === 'small' ? 'text-[24px]' :
              fontSize === 'large' ? 'text-[32px]' : 'text-[28px]'
              } font-bold gradient-text leading-[1.35] mb-0 dark:text-white`}>
              भारतीय सूचना प्रौद्योगिकी संस्थान कोट्टायम
            </h1>
            <h1 className={`${fontSize === 'small' ? 'text-[18px]' :
              fontSize === 'large' ? 'text-[24px]' : 'text-[21.5px]'
              } font-bold gradient-text leading-none dark:text-white`}>
              Indian Institute of Information Technology Kottayam
            </h1>
          </div>
        </div>
        <hr className="border-green-700 dark:border-green-500" />
      </div>

      {/* Dynamic Navigation */}
      <Navigation />
    </div>
  );
}
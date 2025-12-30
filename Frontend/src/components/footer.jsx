import React from 'react';
import { Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';
import API from "../api/api";
import { useTheme } from "../context/createContext";
import { navigationConfig, footerLinks, footerReports, footerLegal } from "../config/navigationConfig";


const AppFooter = () => {
  const { darkMode } = useTheme();

  // Extract course paths from navigationConfig
  const courseMenu = navigationConfig.find(item => item.id === 'course')?.submenu || [];
  
  const departments = courseMenu.map(course => ({
    name: course.label,
    path: course.link
  }));

  const bgMain = darkMode ? 'bg-gray-900/80' : 'bg-gray-50/90';
  const bgCard = darkMode ? 'bg-gray-800/70' : 'bg-white/80';
  const textPrimary = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <footer className={`${bgMain} backdrop-blur-sm ${textPrimary}`}>
      {/* Departments */}
      <div className={`${bgCard} backdrop-blur-md border-t-4 border-green-600`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-lg font-bold mb-4">Departments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            {departments.map((d, i) => (
              <a 
                key={i} 
                href={d.path} 
                className={`${textSecondary} hover:text-green-600 transition`}
                target={d.path.startsWith('http') ? '_blank' : '_self'}
                rel={d.path.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {d.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className={`${bgCard} backdrop-blur-md border-t ${borderColor} mt-px`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 justify-center text-xs font-medium">
            {footerReports.map((r, i) => (
              <a key={i} href={r.path} className={`${textSecondary} hover:text-green-600 transition`}>{r.name}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className={`${bgMain} backdrop-blur-sm py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Social Icons */}
          <div className="flex justify-center gap-3 mb-8">
            {[Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className={`w-10 h-10 ${bgCard} backdrop-blur-md rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition shadow`}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {Object.values(footerLinks).map((col, i) => (
              <div key={i}>
                {col.map((link, j) => (
                  <a 
                    key={j} 
                    href={link.path} 
                    className={`block py-1 ${textSecondary} hover:text-green-600 transition`}
                    target={link.path.startsWith('http') || link.path.startsWith('mailto') ? '_blank' : '_self'}
                    rel={link.path.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gradient-to-r from-green-700/90 to-green-800/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-100">
            <div className="flex flex-wrap gap-3 justify-center">
              {footerLegal.map((item, i) => (
                <React.Fragment key={i}>
                  <a href={item.path} className="hover:text-white transition font-medium">{item.name}</a>
                  {i < footerLegal.length - 1 && <span className="text-gray-300">|</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center">
              <p className="font-medium">GST: 32AAAAI9154L1ZJ | © 2025 IIIT Kottayam</p>
            </div>
          </div>
          <p className="text-center text-gray-200 text-xs mt-2">
            Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString('en-US', {hour12: false})}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
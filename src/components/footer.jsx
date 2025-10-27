import React from 'react';
import { Twitter, Facebook, Linkedin, Youtube } from 'lucide-react';
import API from "../api/api";
import { useTheme } from "../context/createContext";


const AppFooter = () => {
  const {
    darkMode
  } = useTheme();

  const departments = [
    'Computer Science and Engineering',
    'Electronics and Communication Engineering',
    'Data Science and Artificial Intelligence',
    'Mathematics',
    'Humanities and Social Sciences'
  ];

  const links = {
    col1: ['LMS', 'IDY-2022', 'Placement', 'Site Map', 'Events', 'Gallery'],
    col2: ['Matlab Portal', 'Tenders', 'Career', 'ACM', 'Contact', 'Institute Email'],
    col3: ['Pay Fees', 'Gymnasium', 'IEEE', 'Hostel', 'Internet', 'Sports & Yoga'],
    col4: ['RTI', 'Scholarships', 'ICC', 'Grievance', 'Anti-Ragging', 'Reach Us']
  };

  const reports = ['Annual Reports', 'Accounts', 'Budget', 'Act & Statutes', 'Quality Policy', 'ISO 9001:2015'];
  const legal = ['Accessibility', 'Privacy Policy', 'Terms of Use', 'Sitemap'];

  const bgMain = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const bgCard = darkMode ? 'bg-gray-800' : 'bg-white';
  const textPrimary = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondary = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderColor = darkMode ? 'border-gray-700' : 'border-gray-200';

  return (
    <footer className={`${bgMain} ${textPrimary}`}>
      {/* Departments */}
      <div className={`${bgCard} border-t-4 border-green-600`}>
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h3 className="text-lg font-bold mb-4">Departments</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {departments.map((d, i) => (
              <a key={i} href="#" className={`${textSecondary} hover:text-green-600 transition`}>{d}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Reports */}
      <div className={`${bgCard} border-t ${borderColor} mt-px`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-4 justify-center text-xs font-medium">
            {reports.map((r, i) => (
              <a key={i} href="#" className={`${textSecondary} hover:text-green-600 transition`}>{r}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className={`${bgMain} py-8`}>
        <div className="max-w-7xl mx-auto px-4">
          {/* Social Icons */}
          <div className="flex justify-center gap-3 mb-8">
            {[Twitter, Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a key={i} href="#" className={`w-10 h-10 ${bgCard} rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition shadow`}>
                <Icon size={18} />
              </a>
            ))}
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            {Object.values(links).map((col, i) => (
              <div key={i}>
                {col.map((link, j) => (
                  <a key={j} href="#" className={`block py-1 ${textSecondary} hover:text-green-600 transition`}>
                    {link}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className={darkMode ? 'bg-gray-950' : 'bg-gray-800'} style={{ backgroundColor: API.color1 }}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-300">
            <div className="flex flex-wrap gap-3 justify-center">
              {legal.map((item, i) => (
                <React.Fragment key={i}>
                  <a href="#" className="hover:text-white transition">{item}</a>
                  {i < legal.length - 1 && <span className="text-gray-500">|</span>}
                </React.Fragment>
              ))}
            </div>
            <div className="text-center">
              <p>GST: 32AAAAI9154L1ZJ | © 2025 IIIT Kottayam</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-xs mt-2">
            Updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString('en-US', {hour12: false})}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
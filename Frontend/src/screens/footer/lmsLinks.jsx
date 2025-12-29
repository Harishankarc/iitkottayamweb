import React from 'react';
import API from '../../api/api';
import { useTheme } from '../../context/createContext';

export default function LMSLinks() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  const lmsLinks = [
    {
      label: 'For Batch 2025',
      url: 'https://lmsug25.iiitkottayam.ac.in/'
    },
    {
      label: 'For Batch 2024',
      url: 'https://lmsug24.iiitkottayam.ac.in/'
    },
    {
      label: 'For Batch 2023',
      url: 'https://lmsug23.iiitkottayam.ac.in/'
    },
    {
      label: 'Batch 2022, Batch 2021 & Batch 2020',
      url: 'https://lms.iiitkottayam.ac.in/'
    },
    {
      label: 'All M.Tech batches',
      url: 'https://lmspg24.iiitkottayam.ac.in/'
    },
    {
      label: 'iM.Tech Batch 2024',
      url: 'https://lmsimtech.iiitkottayam.ac.in/'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`py-12 px-4 sm:px-6 md:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-screen-2xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="text-green-600 font-semibold text-sm">Learning Management System</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            LMS Links
          </h1>
          
          {/* Description */}
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Access your Learning Management System portal based on your batch and program
          </p>
        </div>
      </div>

      {/* Links Section */}
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lmsLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full block p-6 rounded-xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              style={{ border: `2px solid ${color1}40` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: color1 }}>
                    {link.label}
                  </h3>
                  <span className="inline-block text-sm font-semibold px-4 py-2 rounded-lg text-white" style={{ backgroundColor: color1 }}>
                    Click Here →
                  </span>
                </div>
                <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full" style={{ backgroundColor: `${color1}20` }}>
                  <svg className="w-8 h-8" style={{ color: color1 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>
        </div>
   </div>
  );
}
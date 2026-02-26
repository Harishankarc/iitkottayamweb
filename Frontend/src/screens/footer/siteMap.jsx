import React from 'react';
import { Link } from 'react-router-dom';
import API from '../../api/api';
import { useTheme } from '../../context/createContext';
import { navigationConfig } from '../../config/navigationConfig';

export default function SiteMap() {
  const { darkMode } = useTheme();
  const color1 = API.color1;

  // Organize all links by sections
  const sections = [
    {
      title: 'Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Latest News', path: '/news' },
        { name: 'Why IIIT Kottayam?', path: '/why-iiitk' },
        { name: 'Academics', path: '/institute/academics' },
        { name: 'People', path: '/people' },
        { name: 'Administration', path: '/people/administration' },
        { name: 'Campus', path: '/campus' },
        { name: 'Career', path: '/career' },
        { name: 'Placement', path: '/placement' },
        { name: 'Contact', path: '/contact' },
        { name: 'Research Publications', path: '/research/faculty-research-papers' },
        { name: 'Recruiters Corner', path: 'https://iiitkottayam.ac.in/data/pdf/recruiterscorner.pdf' }
      ]
    },
    {
      title: 'Institute',
      links: navigationConfig.find(item => item.id === 'institute')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    },
    {
      title: 'Courses',
      links: navigationConfig.find(item => item.id === 'course')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    },
    {
      title: 'People',
      links: navigationConfig.find(item => item.id === 'people')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    },
    {
      title: 'Facilities',
      links: navigationConfig.find(item => item.id === 'facilities')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    },
    {
      title: 'Research',
      links: navigationConfig.find(item => item.id === 'research')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    },
    {
      title: 'Placement',
      links: [
        { name: 'Placement', path: '/placement' }
      ]
    },
    {
      title: 'Recruiters Corner',
      links: [
        { name: 'Recruiters Corner', path: 'https://iiitkottayam.ac.in/data/pdf/recruiterscorner.pdf' }
      ]
    },
    {
      title: 'Tenders',
      links: [
        { name: 'Live Tenders', path: '/tenders' },
        { name: 'Closed Tenders', path: '/tenders/closed' },
        { name: 'Cancelled Tenders', path: '/tenders/cancelled' }
      ]
    },
    {
      title: 'Clubs & Events',
      links: navigationConfig.find(item => item.id === 'iic-clubs')?.submenu?.map(item => ({
        name: item.label,
        path: item.link
      })) || []
    }
  ];

  const renderLink = (link, index) => {
    const isExternal = link.path.startsWith('http');
    
    if (isExternal) {
      return (
        <a
          key={index}
          href={link.path}
          target="_blank"
          rel="noopener noreferrer"
          className={`block py-1.5 text-sm transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-blue-400' 
              : 'text-blue-600 hover:text-blue-800'
          }`}
        >
          {link.name}
        </a>
      );
    }

    return (
      <Link
        key={index}
        to={link.path}
        className={`block py-1.5 text-sm transition-colors ${
          darkMode 
            ? 'text-gray-400 hover:text-blue-400' 
            : 'text-blue-600 hover:text-blue-800'
        }`}
      >
        {link.name}
      </Link>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header Section */}
      <div className={`py-12 px-4 sm:px-6 md:px-8 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-screen-2xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span className="text-green-600 font-semibold text-sm">Navigation</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Site Map
          </h1>
          
          {/* Description */}
          <p className={`text-base md:text-lg max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Complete overview of all pages and sections on the IIIT Kottayam website
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-screen-2xl mx-auto py-8 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sections.map((section, index) => (
            <div 
              key={index}
              className={`rounded-xl p-6 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 
                className="text-lg font-bold mb-4 pb-2 border-b"
                style={{ 
                  color: color1,
                  borderColor: `${color1}40`
                }}
              >
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.links.map((link, linkIndex) => renderLink(link, linkIndex))}
              </div>
            </div>
          ))}
     \
        </div>
      </div>
    </div>
  );
}
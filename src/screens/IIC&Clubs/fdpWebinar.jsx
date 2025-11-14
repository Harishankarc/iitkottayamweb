import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { ExternalLink } from 'lucide-react';

export default function FdpWebinar() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const targetUrl = 'https://iiitkottayam.ac.in/#!/fdp';

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero */}
      <div
        className={`w-full flex items-center justify-center`}
        style={{ minHeight: '30vh', backgroundColor: darkMode ? '#0b1220' : 'transparent' }}
      >
        <div className="max-w-6xl w-full px-6 py-12 text-center">
          <h1
            className="font-extrabold leading-tight"
            style={{
              fontSize: '2.5rem',
              color: darkMode ? '#93c5fd' : '#3b82f6' /* similar blue in reference image */
            }}
          >
            Faculty Development Programmes/Workshops/Webinars
          </h1>

          <p className={`mt-6 max-w-2xl mx-auto text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            A curated list of faculty development programmes, workshops and webinars organised by the institute.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href={targetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded shadow-lg font-semibold transition-transform transform hover:-translate-y-0.5"
              style={{
                backgroundColor: '#2f9e44', // green like reference
                color: '#fff',
                boxShadow: `0 6px 18px ${color1}20`
              }}
              aria-label="Open FDP page"
            >
              <span>Faculty Development Programmes/Workshops/Webinars</span>
              <span className="underline text-sm" style={{ color: '#dbeafe', textDecorationColor: 'rgba(255,255,255,0.5)' }}>
                Click Here
              </span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Small explanatory section */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/60' : 'bg-white'} shadow-md border`} style={{ borderColor: darkMode ? '#1f2937' : `${color1}10` }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: color1 }}>
            Quick access
          </h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Click the green button above to open the official FDP page on the IIIT Kottayam website. That page contains detailed schedules, registration links and archived webinar recordings.
          </p>
        </div>
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Download, Calendar, Users } from 'lucide-react';

export default function Fdp() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const [programs, setPrograms] = useState([]);
  const [contentBlocks, setContentBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPrograms();
    fetchContent();
  }, []);

  const fetchContent = () => {
    API.get('/api/content-blocks/page/fdp')
      .then((response) => {
        const blocks = response.data.data || response.data || [];
        console.log('FDP Content Blocks:', blocks);
        const visibleBlocks = blocks.filter(block => block.isVisible);
        console.log('Visible Blocks:', visibleBlocks);
        setContentBlocks(visibleBlocks);
      })
      .catch((error) => {
        console.error('Error fetching FDP page content:', error);
      });
  };

  const fetchPrograms = () => {
    setLoading(true);
    setError(null);
    API.get('/api/fdp-programs')
      .then((response) => {
        const data = response.data.data || response.data || [];
        setPrograms(data);
      })
      .catch((error) => {
        console.error('Error fetching FDP programs:', error);
        setError('Failed to load FDP programs. Please try again later.');
        setPrograms([]);
      })
      .finally(() => setLoading(false));
  };

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const startStr = start.toLocaleDateString('en-US', options);
    
    if (end) {
      const endStr = end.toLocaleDateString('en-US', options);
      return `${startStr} - ${endStr}`;
    }
    return startStr;
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={fetchPrograms}
            className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: color1 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {(() => {
            const heroBlock = contentBlocks.find(block => block.blockType === 'hero');
            console.log('Hero Block:', heroBlock);
            if (heroBlock) {
              return (
                <>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: color1 }}>
                    {heroBlock.content?.title || 'IIIT Kottayam Faculty Development Programmes'}
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {heroBlock.content?.description || 'Professional development initiatives'}
                  </p>
                </>
              );
            }
            return (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: color1 }}>
                  IIIT Kottayam Faculty Development Programmes/Workshops/Webinar
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Professional development initiatives to enhance teaching methodologies and research capabilities
                </p>
              </>
            );
          })()}
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <tr>
                  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ width: '60px' }}>
                    SL.No.
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Topic
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ width: '150px' }}>
                    Programme
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ width: '200px' }}>
                    Coordinator
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ width: '180px' }}>
                    Date
                  </th>
                  <th className={`px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ width: '120px' }}>
                    Brochure
                  </th>
                </tr>
              </thead>
              <tbody className={`${darkMode ? 'divide-y divide-gray-700' : 'divide-y divide-gray-200'}`}>
                {programs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className={`px-4 py-8 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      No FDP programs available at the moment.
                    </td>
                  </tr>
                ) : (
                  programs.map((program) => (
                    <tr 
                      key={program.id}
                      className={`${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} transition-colors`}
                    >
                      <td className={`px-4 py-4 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                        {program.slNo}
                      </td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {program.topic}
                      </td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'}`}>
                          {program.programme}
                        </span>
                      </td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-start gap-2">
                          <Users className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: color1 }} />
                          <span>{program.coordinator}</span>
                        </div>
                      </td>
                      <td className={`px-4 py-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: color1 }} />
                          <span>{formatDateRange(program.startDate, program.endDate)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-center">
                        {program.brochureUrl && program.brochureUrl !== '#' ? (
                          <a
                            href={program.brochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium text-white transition-all duration-300 hover:shadow-md"
                            style={{ backgroundColor: color1 }}
                          >
                            <Download className="w-3.5 h-3.5" />
                            Download
                          </a>
                        ) : (
                          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>-</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-1`} style={{ color: color1 }}>
                {programs.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Programs
              </p>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-1`} style={{ color: color1 }}>
                {new Set(programs.map(p => p.programme)).size}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Programme Types
              </p>
            </div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <div className="text-center">
              <p className={`text-3xl font-bold mb-1`} style={{ color: color1 }}>
                {new Date().getFullYear()}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Current Year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { FileText, Calendar, ExternalLink, Download } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function Tenders() {
  const { darkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('live');
  const [tenders, setTenders] = useState([]);
  const [loading, setLoading] = useState(false);

  const color1 = API.color1;

  // Default sample tenders data
  const defaultTenders = {
    live: [
      {
        id: 1,
        title: "Quotation Notice for Purchase of Library Books",
        lastDate: "2025-08-13",
        extendedDate: null,
        link: "/tenders/library-books-2025.pdf",
        status: 'live'
      },
      {
        id: 2,
        title: "Tender for Supply and Installation of Laboratory Equipment",
        lastDate: "2025-07-20",
        extendedDate: "2025-08-05",
        link: "/tenders/lab-equipment-2025.pdf",
        status: 'live'
      }
    ],
    closed: [
      {
        id: 3,
        title: "Annual Maintenance Contract for HVAC Systems",
        lastDate: "2024-12-15",
        extendedDate: null,
        link: "/tenders/hvac-maintenance-2024.pdf",
        status: 'closed'
      },
      {
        id: 4,
        title: "Construction of New Academic Block",
        lastDate: "2024-11-30",
        extendedDate: "2024-12-10",
        link: "/tenders/academic-block-construction.pdf",
        status: 'closed'
      }
    ],
    cancelled: [
      {
        id: 5,
        title: "Procurement of Sports Equipment",
        lastDate: "2024-10-15",
        extendedDate: null,
        link: "/tenders/sports-equipment-cancelled.pdf",
        status: 'cancelled'
      }
    ]
  };

  useEffect(() => {
    fetchTenders();
  }, []);

  const fetchTenders = async () => {
    try {
      setLoading(true);
      // Uncomment when API is ready
      // const response = await fetch(`${API.baseURL}/api/tenders`);
      // if (!response.ok) throw new Error('Failed to fetch tenders');
      // const data = await response.json();
      // setTenders(data.data);
      
      // Using default data for now
      setTenders(defaultTenders);
    } catch (err) {
      console.log('Using default tenders data');
      setTenders(defaultTenders);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const currentTenders = tenders[activeTab] || [];

  const tabs = [
    { id: 'live', label: 'LIVE TENDERS', color: '#4CAF50' },
    { id: 'closed', label: 'CLOSED TENDERS', color: '#9E9E9E' },
    { id: 'cancelled', label: 'CANCELLED TENDERS', color: '#F44336' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <FileText className="w-3 h-3" style={{ color: color1 }} />
            Procurement
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            TENDERS
          </h1>
        </div>
      </div>

      {/* Tabs Navigation - Full Width */}
      <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
        <div className="max-w-full mx-auto">
          <div className="flex flex-col sm:flex-row">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 px-6 py-5 font-bold text-sm sm:text-base uppercase tracking-wide transition-all ${
                  activeTab === tab.id
                    ? 'text-white'
                    : darkMode
                    ? 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } ${index > 0 ? 'border-t sm:border-t-0 sm:border-l' : ''} ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                }`}
                style={{
                  backgroundColor: activeTab === tab.id ? tab.color : 'transparent'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-6 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          {/* Tenders Table */}
          <div className={`overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
              </div>
            ) : currentTenders.length === 0 ? (
              <div className="text-center py-20">
                <FileText size={64} className="mx-auto mb-4 opacity-20" />
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No {activeTab} tenders available at the moment.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-full">
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'} border-b-2`} style={{ borderColor: color1 }}>
                      <th className={`px-6 py-5 text-left text-sm font-bold uppercase tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Title
                      </th>
                      <th className={`px-6 py-5 text-left text-sm font-bold uppercase tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Last Date
                      </th>
                      <th className={`px-6 py-5 text-left text-sm font-bold uppercase tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Extended Date
                      </th>
                      <th className={`px-6 py-5 text-left text-sm font-bold uppercase tracking-wide ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Link/s
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTenders.map((tender, index) => (
                      <tr 
                        key={tender.id}
                        className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                        } transition-all duration-200`}
                      >
                        <td className={`px-6 py-5 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {tender.title}
                        </td>
                        <td className={`px-6 py-5 text-sm font-semibold`} style={{ color: '#F44336' }}>
                          {formatDate(tender.lastDate)}
                        </td>
                        <td className={`px-6 py-5 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {formatDate(tender.extendedDate)}
                        </td>
                        <td className="px-6 py-5">
                          <a
                            href={tender.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white transition-all hover:shadow-lg hover:scale-105"
                            style={{ backgroundColor: '#4285F4' }}
                          >
                            Notice Inviting Tender
                            <ExternalLink size={16} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Info Note */}
        <div className={`max-w-full mx-auto mt-6 p-6 ${darkMode ? 'bg-gray-800 border-t-2 border-gray-700' : 'bg-blue-50 border-t-2 border-blue-100'}`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong style={{ color: color1 }}>Note:</strong> All tender documents are in PDF format. Please ensure you have a PDF reader installed. 
            For any queries regarding tenders, contact the procurement office at <a href="mailto:procurement@iiitkottayam.ac.in" className="font-semibold hover:underline" style={{ color: color1 }}>procurement@iiitkottayam.ac.in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
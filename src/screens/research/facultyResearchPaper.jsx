 import { useTheme } from '../../context/createContext';
import { BookOpen, FileText, Award, ExternalLink, X, User } from 'lucide-react';
import api from '../../api/api';
import { useState } from 'react';

export default function FacultyResearchPaper() {
  const { darkMode } = useTheme();
  const [selectedResearcher, setSelectedResearcher] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedResearcher(null);
      setIsClosing(false);
    }, 300);
  };

  const researchers = [
    {
      id: 1,
      name: 'Dr. Shajulin Benedict',
      designation: 'Professor',
      department: 'Computer Science & Engineering',
      books: [
        {
          title: 'Big City Bold Ideas',
          author: 'Shajulin Benedict',
          publisher: 'Self-pub',
          edition: 'Edition 1',
          isbn: '978-93-5408-352-5',
          pages: '1-94',
          year: 'Jan 2021'
        },
        {
          title: 'Deep Learning Techniques for Social Impact',
          author: 'Shajulin Benedict',
          publisher: 'IOPPublishers, UK (London)',
          pages: '1 - 264',
          year: 'July 2022',
          status: 'accepted'
        }
      ],
      sciJournals: [
        {
          sl: 1,
          title: 'IoT-Enabled Remote Monitoring Techniques for Healthcare Applications -- An Overview',
          journal: 'Informatica Journal',
          volume: 'Vol. 46',
          pages: '131--149',
          doi: 'https://doi.org/10.31449/inf.v46i2.3912',
          year: '2022'
        },
        {
          sl: 2,
          title: 'EA-POT: An Explainable AI Assisted Blockchain Framework for HoneyPot IP Predictions',
          journal: 'Acta-Cybernetica Journal',
          status: 'accepted',
          year: '2022'
        },
        {
          sl: 3,
          title: 'Shared Mobility Intelligence using Permissioned Blockchains for Smart Cities',
          journal: 'New Generation and Computing',
          doi: '10.1007/s00354-021-00147-x',
          publisher: 'Springer',
          year: '2022',
          status: '(Online-First version)'
        },
        {
          sl: 4,
          authors: 'Markus Steinbach, Anshul Jindal, Mohak Chadha, Michael Gerndt, and Shajulin Benedict',
          title: 'TppFaaS: Modeling Serverless Functions Invocations via Temporal Point Processes',
          journal: 'IEEE ACCESS journal',
          volume: 'Vol. 10',
          pages: '9059-9084',
          doi: '10.1109/ACCESS.2022.3144078',
          year: '2022'
        },
        {
          sl: 5,
          title: 'Serverless Blockchain Enabled Architecture for IoT Social Data Applications',
          journal: 'IEEE Transactions on Computational Social Systems',
          volume: 'Vol. 7, No. 5',
          pages: '1146-1158',
          doi: '10.1109/TCSS.2020.3008995',
          year: '2020'
        }
      ]
    },
    {
      id: 2,
      name: 'Dr. Anoop Jacob',
      designation: 'Associate Professor',
      department: 'Computer Science & Engineering',
      books: [],
      sciJournals: [
        {
          sl: 1,
          title: 'Machine Learning Approaches for Network Security in IoT Environments',
          journal: 'IEEE Transactions on Network and Service Management',
          volume: 'Vol. 18, No. 3',
          pages: '2845-2860',
          doi: '10.1109/TNSM.2021.3089456',
          year: '2021'
        },
        {
          sl: 2,
          title: 'Deep Learning Models for Intrusion Detection Systems: A Comprehensive Survey',
          journal: 'Computer Networks',
          volume: 'Vol. 201',
          doi: 'https://doi.org/10.1016/j.comnet.2021.108550',
          publisher: 'Elsevier',
          year: '2021'
        },
        {
          sl: 3,
          title: 'Federated Learning for Privacy-Preserving Healthcare Analytics',
          journal: 'Journal of Biomedical Informatics',
          volume: 'Vol. 125',
          pages: '103965',
          doi: 'https://doi.org/10.1016/j.jbi.2021.103965',
          year: '2022'
        }
      ]
    },
    {
      id: 3,
      name: 'Dr. Priya Chandran',
      designation: 'Assistant Professor',
      department: 'Electronics & Communication Engineering',
      books: [
        {
          title: 'VLSI Design Fundamentals and Applications',
          author: 'Priya Chandran',
          publisher: 'Springer Nature',
          pages: '1 - 340',
          isbn: '978-3-030-12345-67',
          year: 'March 2023'
        }
      ],
      sciJournals: [
        {
          sl: 1,
          title: 'Low-Power VLSI Design Techniques for Wearable Devices',
          journal: 'IEEE Transactions on Very Large Scale Integration (VLSI) Systems',
          volume: 'Vol. 29, No. 8',
          pages: '1523-1536',
          doi: '10.1109/TVLSI.2021.3078945',
          year: '2021'
        },
        {
          sl: 2,
          title: 'Energy-Efficient Hardware Accelerators for Edge AI Applications',
          journal: 'ACM Transactions on Embedded Computing Systems',
          volume: 'Vol. 21, No. 4',
          doi: 'https://doi.org/10.1145/3486178',
          year: '2022'
        }
      ]
    },
    {
      id: 4,
      name: 'Dr. Rajesh Kumar',
      designation: 'Assistant Professor',
      department: 'Computer Science & Engineering',
      books: [],
      sciJournals: [
        {
          sl: 1,
          title: 'Quantum Computing Applications in Cryptography: A Survey',
          journal: 'ACM Computing Surveys',
          volume: 'Vol. 54, No. 9',
          pages: '1-35',
          doi: 'https://doi.org/10.1145/3474556',
          year: '2022'
        },
        {
          sl: 2,
          title: 'Blockchain-based Secure Data Sharing Framework for Healthcare Systems',
          journal: 'Future Generation Computer Systems',
          volume: 'Vol. 137',
          pages: '87-101',
          doi: 'https://doi.org/10.1016/j.future.2022.107156',
          publisher: 'Elsevier',
          year: '2022'
        },
        {
          sl: 3,
          title: 'Post-Quantum Cryptographic Algorithms: Implementation and Analysis',
          journal: 'IEEE Security & Privacy',
          volume: 'Vol. 20, No. 2',
          pages: '45-53',
          year: '2023'
        }
      ]
    }
  ];

  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
      
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" style={{ backgroundColor: `${api.color1}1A`, color: api.color1, borderColor: `${api.color1}66` }}>
            <FileText className="w-3 h-3" style={{ color: api.color1 }} />
            Research Publications
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            FACULTY RESEARCH PUBLICATIONS
          </h1>
        </div>
      </div>

      {/* Main Content - Researcher Cards */}
      <section className={`py-4 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {researchers.map((researcher) => (
                <div
                key={researcher.id}
                onClick={() => setSelectedResearcher(researcher)}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                }`}
                style={{
                    borderColor: darkMode ? '#374151' : '#e5e7eb',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = api.color1;
                  e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${api.color1}20` }}
                  >
                    <User size={32} style={{ color: api.color1 }} />
                  </div>
                  <h3 className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {researcher.name}
                  </h3>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {researcher.designation}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    {researcher.department}
                  </p>
                  <div className="flex gap-2 text-xs pt-2">
                    <span 
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: `${api.color1}20`, color: api.color1 }}
                      >
                      {researcher.books.length} Books
                    </span>
                    <span 
                      className="px-2 py-1 rounded"
                      style={{ backgroundColor: `${api.color1}20`, color: api.color1 }}
                      >
                      {researcher.sciJournals.length} Journals
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedResearcher && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/30 ${
            isClosing ? 'animate-fadeOut' : 'animate-fadeIn'
          }`}
          onClick={handleClose}
        >
          <div 
            className={`relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-lg transform transition-all duration-300 ${
              isClosing ? 'animate-slideDown' : 'animate-slideUp'
            } ${
              darkMode ? 'bg-gray-900' : 'bg-white'
            }`}
            style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className={`sticky top-4 right-4 float-right p-2 rounded-full transition-colors ${
                darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              style={{ zIndex: 10 }}
            >
              <X size={20} className={darkMode ? 'text-white' : 'text-gray-900'} />
            </button>            {/* Modal Content */}
            <div className="p-6 space-y-6">

          {/* Faculty Name */}
          <div className="text-center">
            <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                style={{ color: '#8B0000' }}>
              {selectedResearcher.name.toUpperCase()}
            </h2>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {selectedResearcher.designation} • {selectedResearcher.department}
            </p>
          </div>

          {/* Books Section */}
          {/* Books Section */}
          {selectedResearcher.books.length > 0 && (
                <div>
                  <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                      style={{ color: api.color1 }}>
                    <BookOpen size={20} style={{ color: api.color1 }} />
                    BOOKS
                  </h2>
                  <div className="space-y-2">
                    {selectedResearcher.books.map((book, index) => (
                      <div
                      key={index}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}
                        style={{
                          borderColor: darkMode ? '#374151' : '#e5e7eb',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = api.color1;
                          e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              <strong>{book.author}</strong>, <em>{book.title}</em>, {book.publisher}
                              {book.edition && `, ${book.edition}`}
                              {book.isbn && `, ISBN: ${book.isbn}`}
                              {book.pages && `, pp. ${book.pages}`}
                              {book.status && `, ${book.status}`}, {book.year}.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

          {/* SCI Journals Section */}
          {selectedResearcher.sciJournals.length > 0 && (
                <div>
                  <h2 className={`text-lg font-bold mb-3 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                      style={{ color: api.color1 }}>
                    <Award size={20} style={{ color: api.color1 }} />
                    SCI JOURNALS
                  </h2>
                  <div className="space-y-2">
                    {selectedResearcher.sciJournals.map((journal) => (
                      <div
                        key={journal.sl}
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                        }`}
                        style={{
                            borderColor: darkMode ? '#374151' : '#e5e7eb',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = api.color1;
                          e.currentTarget.style.boxShadow = `0 0 20px ${api.color1}30`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`font-bold text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {journal.sl}.
                          </span>
                          <div className="flex-1">
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                              {journal.authors && <span><strong>{journal.authors}</strong>, </span>}
                              {!journal.authors && <span><strong>{selectedResearcher.name}</strong>, </span>}
                              <em>{journal.title}</em>
                              {journal.status && `, ${journal.status}`}
                              {journal.journal && `, in ${journal.journal}`}
                              {journal.volume && `, ${journal.volume}`}
                              {journal.pages && `, pp. ${journal.pages}`}
                              {journal.doi && journal.doi.startsWith('http') && (
                                <span>
                                  , DOI: <a 
                                    href={journal.doi} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    style={{ color: api.color1 }}
                                    className="hover:underline inline-flex items-center gap-1"
                                  >
                                    {journal.doi}
                                    <ExternalLink size={14} />
                                  </a>
                                </span>
                              )}
                              {journal.doi && !journal.doi.startsWith('http') && (
                                <span>, DOI: {journal.doi}</span>
                              )}
                              {journal.publisher && `, ${journal.publisher}`}
                              , {journal.year}.
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

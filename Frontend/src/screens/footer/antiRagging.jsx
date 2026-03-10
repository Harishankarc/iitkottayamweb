import React from 'react';
import { Shield, FileText, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function AntiRagging() {
  const { darkMode } = useTheme();
    const color1 = API.color1;

  const antiRaggingLinks = [
    {
      id: 1,
      title: 'Student Affidavit',
      link: '/anti-ragging/student-affidavit.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Parent Affidavit',
      link: '/anti-ragging/parent-affidavit.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Undertaking form for Students',
      link: '/anti-ragging/undertaking-form.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Supreme Court Verdict',
      link: '/anti-ragging/supreme-court-verdict.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 5,
      title: 'UGC Regulations on Anti-Ragging',
      link: '/anti-ragging/ugc-regulations.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 6,
      title: 'UGC Letter Regarding Anti-Ragging',
      link: '/anti-ragging/ugc-letter.pdf',
      icon: <FileText className="w-5 h-5" />
    },
    {
      id: 7,
      title: 'OFFICE MEMORANDUM',
      link: '/anti-ragging/office-memorandum.pdf',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Shield className="w-3 h-3" style={{ color: color1 }} />
            Campus Safety
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            ANTI RAGGING
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          <div className={`rounded-xl p-6 md:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            
            {/* Important Notice */}
            <div className={`mb-8 p-6 rounded-lg border-l-4 ${darkMode ? 'bg-red-900/20 border-red-500' : 'bg-red-50 border-red-500'}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2 text-red-600">Zero Tolerance Policy</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam has a strict zero-tolerance policy towards ragging. Any act of ragging is a punishable offense and will be dealt with severely as per UGC regulations and Supreme Court directives. 
                    Students are required to submit affidavits and undertakings as part of the admission process.
                  </p>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {antiRaggingLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-5 rounded-lg border-2 transition-all hover:shadow-lg hover:scale-105 ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div 
                    className="p-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${color1}20`, color: color1 }}
                  >
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            {/* Additional Information */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <h3 className="font-bold text-lg mb-4" style={{ color: color1 }}>
                What is Ragging?
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Ragging constitutes any act that causes or is likely to cause physical or psychological harm or apprehension or fear to a student, 
                or subjects them to ridicule, intimidation, wrongful confinement, or indecent conduct, whether written, verbal, or through electronic means.
              </p>
              
              <h3 className="font-bold text-lg mb-4" style={{ color: color1 }}>
                How to Report?
              </h3>
              <div className="space-y-2 text-sm">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>National Anti-Ragging Helpline:</strong> <a href="tel:1800-180-5522" className="hover:underline" style={{ color: color1 }}>1800-180-5522</a> (24x7 Toll Free)
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Email:</strong> <a href="mailto:helpline@antiragging.in" className="hover:underline" style={{ color: color1 }}>helpline@antiragging.in</a>
                </p>
                <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                  <strong>Website:</strong> <a href="https://www.antiragging.in" target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: color1 }}>www.antiragging.in</a>
                </p>
              </div>
            </div>

            {/* Helpline Section */}
            <div className={`mt-8 p-6 rounded-lg text-center ${darkMode ? 'bg-gray-700' : 'bg-green-50'}`}>
              <Shield className="w-12 h-12 mx-auto mb-3" style={{ color: color1 }} />
              <h3 className="font-bold text-xl mb-2" style={{ color: color1 }}>
                Need Help?
              </h3>
              <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                If you are a victim or witness to ragging, please report immediately. Your identity will be kept confidential.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:1800-180-5522"
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: color1 }}
                >
                  Call Helpline: 1800-180-5522
                </a>
                <a
                  href="https://www.antiragging.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  Visit Anti-Ragging Portal
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

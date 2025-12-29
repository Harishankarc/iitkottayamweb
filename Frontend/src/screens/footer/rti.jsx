import React from 'react';
import { FileText, ExternalLink, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function RTI() {
  const { darkMode } = useTheme();
  const color1 = API.color1;

  const rtiLinks = [
    {
      title: 'Public Information Officer-IIIT Kottayam',
      link: '/rti/public-information-officer',
      type: 'internal'
    },
    {
      title: 'Transparency Officer',
      link: '/rti/transparency-officer',
      type: 'internal'
    }
  ];

  const suoMotoDisclosure = [
    {
      id: 1,
      title: 'Organisation and Function',
      link: 'https://iiitkottayam.ac.in/data/pdf/1.%20Organisation%20and%20Function.pdf'
    },
    {
      id: 2,
      title: 'Budget and Programme',
      link: 'https://iiitkottayam.ac.in/data/pdf/2.%20Budget%20and%20Programme.pdf'
    },
    {
      id: 3,
      title: 'Publicity Band Public interface',
      link: 'https://iiitkottayam.ac.in/data/pdf/3.%20Publicity%20Band%20Public%20interface.pdf'
    },
    {
      id: 4,
      title: 'E.Governance',
      link: 'https://iiitkottayam.ac.in/data/pdf/4.%20E.Governance.pdf'
    },
    {
      id: 5,
      title: 'Information as may be prescribed',
      link: 'https://iiitkottayam.ac.in/data/pdf/5.%20Information%20as%20may%20be%20prescribed.pdf'
    },
    {
      id: 6,
      title: 'Information Disclosed on own Initiative',
      link: 'https://iiitkottayam.ac.in/data/pdf/6.%20Information%20Disclosed%20on%20own%20Initiative.pdf'
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`py-1 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-2 border" 
               style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <FileText className="w-3 h-3" style={{ color: color1 }} />
            Transparency & Accountability
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            RTI
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          <div className={`rounded-xl p-6 md:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            
            {/* RTI Links */}
            <div className="space-y-4 mb-8">
              {rtiLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:border-gray-500' 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-base font-medium" style={{ color: color1 }}>
                    {item.title}
                  </span>
                  <ChevronRight className="w-5 h-5" style={{ color: color1 }} />
                </a>
              ))}
            </div>

            {/* Suo Moto Disclosure Section */}
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-bold mb-6" style={{ color: color1 }}>
                Suo moto disclosure - IIIT KOTTAYAM
              </h2>
              
              <ol className="space-y-3">
                {suoMotoDisclosure.map((item) => (
                  <li key={item.id} className="flex items-start">
                    <span className={`font-semibold mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {item.id}.
                    </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:underline transition-all group"
                      style={{ color: color1 }}
                    >
                      <span className="font-medium">{item.title}</span>
                      <ExternalLink 
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                      />
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Additional Info */}
            <div className={`mt-8 p-4 rounded-lg border-l-4 ${darkMode ? 'bg-gray-700 border-gray-500' : 'bg-blue-50 border-blue-400'}`} style={{ borderLeftColor: color1 }}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <strong>Note:</strong> The Right to Information Act, 2005 (RTI Act) mandates timely response to citizen requests for government information. 
                For more information or to file an RTI request, please contact the Public Information Officer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Shield, FileText, ExternalLink, Mail } from 'lucide-react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';

export default function ICC() {
  const { darkMode } = useTheme();
  const color1 = API.color1;

  const committeeMembers = [
    {
      slNo: 1,
      name: 'Dr. Suchithra M S',
      position: 'Presiding Officer',
      phone: '0482-2202169',
      email: 'suchithra@iiitkottayam.ac.in',
      clause: '4(2)(a)'
    },
    {
      slNo: 2,
      name: 'Dr. Panchami V',
      position: 'Member',
      phone: '0482-2202151',
      email: 'panchamam036@iiitkottayam.ac.in',
      clause: '4(2)(b)'
    },
    {
      slNo: 3,
      name: 'Dr. Amit Kumar Roy',
      position: 'Member',
      phone: '0482-2202201',
      email: 'amit@iiitkottayam.ac.in',
      clause: '4(2)(b)'
    },
    {
      slNo: 4,
      name: 'Dr. Minu A Pillai',
      position: 'Member',
      phone: '0482-2202218',
      email: 'minupillai@iiitkottayam.ac.in',
      clause: '4(2)(b)'
    },
    {
      slNo: 5,
      name: 'Dr. Susheel Kumar Joshi',
      position: 'Member',
      phone: '0482-2202185',
      email: 'joshi@iiitkottayam.ac.in',
      clause: '4(2)(b)'
    },
    {
      slNo: 6,
      name: 'Mrs. Aneetha P Joseph',
      position: 'Member Secretary',
      phone: '',
      email: '',
      clause: '4(2)(b)'
    },
    {
      slNo: 7,
      name: 'Adv. Udaya K Sankar',
      position: 'External Member',
      phone: '',
      email: '',
      clause: '4(2)(c)'
    }
  ];

  const actDetails = [
    {
      slNo: 1,
      title: 'Sexual Harassment of Women at Workplace(Prevention, Prohibition and Redressal) Act and Rule 2013',
      link: '/icc/posh-act-2013.pdf'
    },
    {
      slNo: 2,
      title: 'Handbook on Sexual Harassment of Women at Workplace',
      link: '/icc/handbook-sexual-harassment.pdf'
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
            Women Safety & Rights
          </div>
          <h1 className={`text-xl md:text-2xl font-bold mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            INTERNAL COMPLAINTS COMMITTEE
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className={`py-8 px-6 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-full mx-auto">
          <div className={`rounded-xl p-6 md:p-8 shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            
            {/* Introduction Text */}
            <div className="space-y-4 mb-8">
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The landmark judgement promulgated by the Hon'ble Supreme Court of India on August 13, 1997 in Vishaka and Others Vs. State of Rajasthan and Others1("Vishaka Judgement") 
                widely known as the Vishaka Judgement, emphasised on the enforcement of the fundamental rights of the working women. The legally binding Vishaka guidelines commissioned 
                organizations to prohibit, prevent and effectively redress complaints citing incidents that violate the fundamental rights of 'Gender Equality' and the 'Right of Life and Liberty'.
              </p>
              
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                On December 09 2013, the legislation on Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 ("POSH Act") was enacted by the Ministry 
                of Women and Child Development. The POSH Act further elucidated the Vishaka Judgement and mandated all workplaces in India to ensure a safe and secure working 
                environment with a policy of zero tolerance of sexual harassment for all women.
              </p>

              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                In compliance with the statutes of the Supreme Court of India, the Competent Authority of the Indian Institute of Information Technology Kottayam (IIITK) has constituted the 
                Internal Complaints Committee. The Composition of the Internal Complaint Committee as per the recent reconstitution is as follows:
              </p>
            </div>

            {/* Committee Members Table */}
            <div className="mb-8 overflow-x-auto">
              <table className="w-full min-w-full border-collapse">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      SI No.
                    </th>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      Name
                    </th>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      Position
                    </th>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      Phone No
                    </th>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      Email
                    </th>
                    <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                      Clause No. & Section of 4 of Act
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {committeeMembers.map((member) => (
                    <tr key={member.slNo} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors`}>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.slNo}
                      </td>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.name}
                      </td>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.position}
                      </td>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="hover:underline" style={{ color: color1 }}>
                            {member.phone}
                          </a>
                        )}
                      </td>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="hover:underline" style={{ color: color1 }}>
                            {member.email}
                          </a>
                        )}
                      </td>
                      <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                        {member.clause}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Act Details Section */}
            <div className="mb-8">
              <p className={`text-sm md:text-base mb-4 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The details regarding the Act are as follows:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full min-w-full border-collapse">
                  <thead>
                    <tr className={`${darkMode ? 'bg-gray-700' : 'bg-blue-100'}`}>
                      <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                        SI No.
                      </th>
                      <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                        Title
                      </th>
                      <th className={`border px-4 py-3 text-left text-sm font-bold ${darkMode ? 'border-gray-600 text-gray-200' : 'border-blue-200 text-blue-900'}`}>
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {actDetails.map((detail) => (
                      <tr key={detail.slNo} className={`${darkMode ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} transition-colors`}>
                        <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                          {detail.slNo}
                        </td>
                        <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-700'}`}>
                          {detail.title}
                        </td>
                        <td className={`border px-4 py-3 text-sm ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                          <a
                            href={detail.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 hover:underline"
                            style={{ color: color1 }}
                          >
                            Click Here...
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Complaint Information */}
            <div className="space-y-4 mb-8">
              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Any complaints regarding sexual harassment of women at workplace can be mailed to: <a href="mailto:icc@iiitkottayam.ac.in" className="font-semibold hover:underline" style={{ color: color1 }}>icc@iiitkottayam.ac.in</a>. 
                Inquiry regarding the complaints will be conducted by the Internal Complaints Committee as per the provisions of Section 11 of the Act, 2013. Based on the recommendations of the Committee during the pendency of the inquiry actions 
                deemed appropriate shall be taken by the Competent Authority of the Institute.
              </p>

              <p className={`text-sm md:text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The confidentiality of the complainant's identity will be maintained and sensitive information will not be disclosed to any individual except for those possessing a specific need to know.
              </p>

              <p className={`text-sm md:text-base leading-relaxed font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The Institute strongly disapproves any demeanour that constitutes sexual discrimination and/or harassment. It is advised that all students and employees report any cases 
                related to sexual harassment to the Committee.
              </p>
            </div>

            {/* Office Memorandum Button */}
            <div className="flex justify-start">
              <a
                href="/icc/office-memorandum.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 ${
                  darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200 text-gray-800'
                }`}
              >
                <FileText className="w-5 h-5" />
                OFFICE MEMORANDUM
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
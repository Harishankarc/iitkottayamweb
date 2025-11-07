import React from 'react';
import { useTheme } from '../../context/createContext.jsx';
import api from '../../api/api.jsx';
import { Users, TrendingUp, BarChart3, PieChart } from 'lucide-react';

export default function GenderIndex() {
  const { darkMode } = useTheme();
  const color1 = api.color1;
  const color2 = api.color2;

  // Gender Index Data
  const genderData = {
    enrolment: {
      male: 753,
      female: 144,
      total: 897
    },
    professional: {
      male: 36,
      female: 27,
      total: 63
    }
  };

  // Calculate percentages
  const enrolmentMalePercent = ((genderData.enrolment.male / genderData.enrolment.total) * 100).toFixed(1);
  const enrolmentFemalePercent = ((genderData.enrolment.female / genderData.enrolment.total) * 100).toFixed(1);
  const professionalMalePercent = ((genderData.professional.male / genderData.professional.total) * 100).toFixed(1);
  const professionalFemalePercent = ((genderData.professional.female / genderData.professional.total) * 100).toFixed(1);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Full Width, 70% Height */}
      <div className={`relative overflow-hidden w-full ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ height: '70vh' }}>
        <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f293780' : `${color2}E6` }}></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
        </div>
        
        {/* Centered Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-5xl mx-auto text-center px-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <BarChart3 className="w-4 h-4" style={{ color: color1 }} />
              Diversity & Inclusion
            </div>
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Gender Index
            </h1>
            <p className={`text-xl md:text-2xl lg:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Statistical overview of gender distribution at IIIT Kottayam.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Enrolment Card */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color1}20` }}
                >
                  <Users className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Total Enrolment
                  </h3>
                  <p className={`text-3xl font-extrabold`} style={{ color: color1 }}>
                    {genderData.enrolment.total}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Male</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {genderData.enrolment.male} ({enrolmentMalePercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${enrolmentMalePercent}%`,
                      background: `linear-gradient(90deg, ${color1}, ${color1}cc)`
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Female</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {genderData.enrolment.female} ({enrolmentFemalePercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${enrolmentFemalePercent}%`,
                      background: `linear-gradient(90deg, ${color1}80, ${color1}60)`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Professional Workers Card */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${color1}20` }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: color1 }} />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Professional & Technical
                  </h3>
                  <p className={`text-3xl font-extrabold`} style={{ color: color1 }}>
                    {genderData.professional.total}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Male</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {genderData.professional.male} ({professionalMalePercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${professionalMalePercent}%`,
                      background: `linear-gradient(90deg, ${color1}, ${color1}cc)`
                    }}
                  />
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Female</span>
                  <span className={`text-sm font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {genderData.professional.female} ({professionalFemalePercent}%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ backgroundColor: darkMode ? '#374151' : '#E5E7EB' }}>
                  <div 
                    className="h-full rounded-full transition-all duration-500"
                    style={{ 
                      width: `${professionalFemalePercent}%`,
                      background: `linear-gradient(90deg, ${color1}80, ${color1}60)`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div 
              className="p-6 text-center"
              style={{
                background: `linear-gradient(135deg, ${color1}, ${color1}dd)`
              }}
            >
              <h2 className="text-2xl font-bold text-white">
                IIIT Kottayam - Gender Statistics
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <th className={`p-4 text-left font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Category
                    </th>
                    <th className={`p-4 text-left font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Gender
                    </th>
                    <th className={`p-4 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Enrolment Section */}
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td 
                      rowSpan={4} 
                      className={`p-4 font-bold align-top ${darkMode ? 'text-white' : 'text-gray-900'} ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}
                    >
                      IIIT Kottayam
                    </td>
                    <td 
                      colSpan={2} 
                      className={`p-4 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ backgroundColor: `${color1}10` }}
                    >
                      Enrolment in Tertiary Education
                    </td>
                  </tr>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Male</td>
                    <td className={`p-4 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {genderData.enrolment.male}
                    </td>
                  </tr>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Female</td>
                    <td className={`p-4 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {genderData.enrolment.female}
                    </td>
                  </tr>
                  <tr className={`border-b-2 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                    <td className={`p-4 font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Total</td>
                    <td className={`p-4 text-right font-bold`} style={{ color: color1 }}>
                      {genderData.enrolment.total}
                    </td>
                  </tr>

                  {/* Professional Section */}
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td 
                      rowSpan={4} 
                      className={`p-4 font-bold align-top ${darkMode ? 'text-white' : 'text-gray-900'} ${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}
                    >
                      
                    </td>
                    <td 
                      colSpan={2} 
                      className={`p-4 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      style={{ backgroundColor: `${color1}10` }}
                    >
                      Professional & Technical Workers
                    </td>
                  </tr>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Male</td>
                    <td className={`p-4 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {genderData.professional.male}
                    </td>
                  </tr>
                  <tr className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                    <td className={`p-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Female</td>
                    <td className={`p-4 text-right font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {genderData.professional.female}
                    </td>
                  </tr>
                  <tr>
                    <td className={`p-4 font-bold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>Total</td>
                    <td className={`p-4 text-right font-bold`} style={{ color: color1 }}>
                      {genderData.professional.total}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
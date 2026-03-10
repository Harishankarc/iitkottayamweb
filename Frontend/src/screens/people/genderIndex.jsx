import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Users, TrendingUp, BarChart3, PieChart } from 'lucide-react';



export default function GenderIndex() {
  const { darkMode } = useTheme();
    const color1 = API.color1;
  const color2 = API.color2;
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genderData, setGenderData] = useState({
    enrolment: { male: 0, female: 0, total: 0 },
    professional: { male: 0, female: 0, total: 0 }
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`${API.baseURL}/api/content-blocks/page/gender-index`);
        const data = await response.json();
        
        if (data.success && data.data) {
          setContent(data.data);
          
          // Extract data from content blocks
          const tableBlock = data.data.find(block => block.blockType === 'table');
          if (tableBlock && tableBlock.content) {
            const tableData = typeof tableBlock.content === 'string' 
              ? JSON.parse(tableBlock.content) 
              : tableBlock.content;
            
            if (tableData.rows && Array.isArray(tableData.rows)) {
              // Parse the table data
              const enrolmentMale = parseInt(tableData.rows.find(r => r[0] === 'Male' && r[1] === 'IIIT Kottayam')?.[2] || 0);
              const enrolmentFemale = parseInt(tableData.rows.find(r => r[0] === 'Female' && r[1] === 'IIIT Kottayam')?.[2] || 0);
              const professionalMale = parseInt(tableData.rows.find(r => r[0] === 'Male' && r[1] === 'Professional & Technical')?.[2] || 0);
              const professionalFemale = parseInt(tableData.rows.find(r => r[0] === 'Female' && r[1] === 'Professional & Technical')?.[2] || 0);
              
              setGenderData({
                enrolment: {
                  male: enrolmentMale,
                  female: enrolmentFemale,
                  total: enrolmentMale + enrolmentFemale
                },
                professional: {
                  male: professionalMale,
                  female: professionalFemale,
                  total: professionalMale + professionalFemale
                }
              });
            }
          }
        }
      } catch (err) {
        console.error('Error fetching gender index data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Calculate percentages
  const enrolmentMalePercent = genderData.enrolment.total > 0 ? ((genderData.enrolment.male / genderData.enrolment.total) * 100).toFixed(1) : '0.0';
  const enrolmentFemalePercent = genderData.enrolment.total > 0 ? ((genderData.enrolment.female / genderData.enrolment.total) * 100).toFixed(1) : '0.0';
  const professionalMalePercent = genderData.professional.total > 0 ? ((genderData.professional.male / genderData.professional.total) * 100).toFixed(1) : '0.0';
  const professionalFemalePercent = genderData.professional.total > 0 ? ((genderData.professional.female / genderData.professional.total) * 100).toFixed(1) : '0.0';

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: color1 }}></div>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - Minimal Design */}
      <div className={`py-2 px-6 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium mb-3 border" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
            <Users className="w-4 h-4" style={{ color: color1 }} />
            Diversity & Inclusion
          </div>
          <h1 className={`text-2xl md:text-3xl font-bold mb-3 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            Gender Index
          </h1>
          <p className={`text-xs md:text-sm max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Statistical overview of gender distribution at IIIT Kottayam.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto py-8 px-6 max-w-full">
        <div>
          {/* Statistics Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Enrolment Card */}
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
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
            <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
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
              className="p-8 text-center"
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

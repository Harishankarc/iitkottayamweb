import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import {
  Radio, // Icon for ECE
  Image,
  GraduationCap,
  DollarSign,
  Calendar,
  BookOpenText,
  Scale
} from 'lucide-react';

// Import images
import eceImage1 from '../../assets/images/eclab1.jpg';
import eceImage2 from '../../assets/images/eclab2.jpg';

export default function BTechECE() {
  const { darkMode } = useTheme();
  const color1 = API.color1; // #239244 (Dark Green)
  const color2 = API.color2; // #e8f5f0 (Light Mint)
  const color3 = API.color3; // #F1F3F3 (Light Gray)
  const [feeStructure, setFeeStructure] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setError(null);
        const response = await API.get('/api/courses/slug/btech-ece');
        setFeeStructure(response.data?.feeStructure || []);
      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Failed to load course information. Please try again later.');
        setFeeStructure([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, []);

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    API.get('/api/courses/slug/btech-ece')
      .then((response) => {
        setFeeStructure(response.data?.feeStructure || []);
      })
      .catch((error) => {
        console.error('Error fetching course data:', error);
        setError('Failed to load course information. Please try again later.');
        setFeeStructure([]);
      })
      .finally(() => setLoading(false));
  };

  const defaultFeeStructure = [
    {
      details: 'Tuition Fee',
      sem1: '1,45,200/-', sem2: '1,45,200/-', sem3: '1,45,200/-', sem4: '1,45,200/-',
      sem5: '1,45,200/-', sem6: '1,45,200/-', sem7: '1,45,200/-', sem8: '1,45,200/-',
    },
    {
      details: 'Hostel/Facility maintenance fee',
      sem1: '34,000/-', sem2: '34,000/-', sem3: '37,500/-', sem4: '37,500/-',
      sem5: '41,250/-', sem6: '41,250/-', sem7: '45,500/-', sem8: '45,500/-',
    },
    {
      details: 'Mess Advance',
      sem1: '30,750/-', sem2: '30,750/-', sem3: '33,825/-', sem4: '33,825/-',
      sem5: '37,250/-', sem6: '37,250/-', sem7: '40,975/-', sem8: '40,975/-',
    },
    {
      details: 'Medical Insurance',
      sem1: '1300/-', sem2: '-', sem3: '1300/-', sem4: '-',
      sem5: '1300/-', sem6: '-', sem7: '1300/-', sem8: '-',
    },
    {
      details: 'Mess Equipment Maintenance Fee',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Sports Equipment Maintenance Fee',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Club Activities',
      sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
      sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
    },
    {
      details: 'Caution Deposit (One Time Fee)',
      sem1: '13,000/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
    {
      details: 'Convocation Fee (One-Time Fee)',
      sem1: '-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '5000/-', sem8: '-',
    },
    {
      details: 'Sports (One time Fee)',
      sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
    {
      details: 'Mess (One time Fee)',
      sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
      sem5: '-', sem6: '-', sem7: '-', sem8: '-',
    },
  ];

  
  const displayFeeStructure = feeStructure.length > 0 ? feeStructure : defaultFeeStructure;
  const dasaFeeStructure = [...displayFeeStructure];

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center p-8">
          <p className={`text-lg mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <button
            onClick={handleRetry}
            className="px-6 py-2 rounded-lg text-white font-medium transition-colors"
            style={{ backgroundColor: color1 }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // --- Reusable Helper Components ---

  // Helper component for image placeholders
  const ImagePlaceholder = ({ text }) => (
    <div
      className="rounded-2xl p-8 border-2 border-dashed h-full flex items-center justify-center"
      style={{
        backgroundColor: darkMode ? '#1f2937' : color3,
        borderColor: `${color1}66`
      }}
    >
      <div className="text-center">
        <Image className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
        <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{text}</p>
      </div>
    </div>
  );

  // Helper component for styled links
  const StyledLink = ({ href, text, icon: Icon }) => (
    <a
      href={href}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer ${
        darkMode ? 'hover:bg-gray-700' : 'hover:shadow-lg'
      }`}
      style={{
        backgroundColor: darkMode ? '#374151' : color2,
        color: color1,
        borderColor: darkMode ? `${color1}99` : `${color1}66`
      }}
      onMouseEnter={(e) => e.currentTarget.style.borderColor = color1}
      onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? `${color1}99` : `${color1}66`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {text}
    </a>
  );
  
  // Helper component for Fee Table
  const FeeTable = ({ data }) => (
    <div className={`overflow-x-auto rounded-2xl shadow-md border-2 ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
      <table className="w-full min-w-[600px] md:min-w-[800px] lg:min-w-[1200px] text-left text-sm">
        <thead className="border-b" style={{ backgroundColor: darkMode ? '#1f2937' : color2, borderColor: `${color1}66` }}>
          <tr>
            <th rowSpan="2" className="p-4 align-middle text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Details</th>
            <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>First Year</th>
            <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Second Year</th>
            <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1, borderRight: `2px solid ${color1}66` }}>Third Year</th>
            <th colSpan="2" className="p-4 text-center text-base font-bold" style={{ color: color1 }}>Fourth Year</th>
          </tr>
          <tr className="border-b" style={{ borderColor: `${color1}66` }}>
            <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>First Semester</th>
            <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Second Semester</th>
            <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Third Semester</th>
            <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Fourth Semester</th>
            <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Fifth Semester</th>
            <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>Sixth Semester</th>
            <th className={`p-3 font-semibold text-center border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>Seventh Semester</th>
            <th className={`p-3 font-semibold text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Eighth Semester</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b" style={{ borderColor: darkMode ? `${color1}66` : `${color1}33` }}>
              <td className={`p-3 font-semibold ${darkMode ? 'text-gray-100' : 'text-gray-800'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.details}</td>
              <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem1}</td>
              <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem2}</td>
              <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem3}</td>
              <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem4}</td>
              <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem5}</td>
              <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderRight: `2px solid ${color1}66` }}>{row.sem6}</td>
              <td className={`p-3 text-right border-r ${darkMode ? 'text-gray-300' : 'text-gray-700'}`} style={{ borderColor: `${color1}33` }}>{row.sem7}</td>
              <td className={`p-3 text-right ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{row.sem8}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      {/* Hero Section */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} border-b`} style={{ borderColor: darkMode ? '#374151' : color1 + '30' }}>
        <div className="mx-auto py-6 sm:py-8 md:py-10 lg:py-12">
          <div className="w-full mx-auto text-center px-4 sm:px-6 md:px-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md rounded-full text-xs sm:text-sm font-bold mb-3 sm:mb-4 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
              <Radio className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: color1 }} />
              B.Tech Programme
            </div>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
              Electronics & Communication <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>Engineering</span>
            </h1>
            <p className={`text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Fostering excellence in electronics, communication, and modern technologies.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 max-w-screen-2xl">
        <div className="w-full mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">

          {/* Introduction Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <p className={`text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-5 md:mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Electronics and Communication Engineering Department aims at fostering foremost teaching and learning practices for the students to excel in theoretical and experimental learning activities. The department paves a way to create highly motivated and technically competent human resource in various domain through effective partnership with industries and research organizations. The B.Tech-MS programme provides exposure to state-of-the-art technologies and moulds the students with fundamental competencies, problem solving abilities and entrepreneurship skills to excel in their career.
              </p>
              <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Our curriculum imparts strong foundation in Electronics and Communication Engineering with a blend of Computer Science, extending to elective courses in emerging fields. This includes core courses such as Semiconductor Devices, Digital Circuits and Systems, Analog and Digital Communication, VLSI Design, Computer Network, Integrated Circuits, Robotics and Automation, High Performance Computing, Artificial Intelligence, Machine Learning, Deep Learning and so on. This prepares students for diverse career paths in both core ECE and IT sectors.
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The department also offers various extracurricular activities to enhance the inter-personal skills of students.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={eceImage1} 
                    alt="ECE Department Lab" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={eceImage2} 
                    alt="ECE Campus View" 
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Admission Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                  <GraduationCap className="w-8 h-8" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Admission
                </h2>
              </div>
              <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Admission to the B.Tech/B.Tech-MS programme will be based on performance in the Joint Entrance Examination (JEE - Main) conducted by National Testing Agency(NTA) (subject to change if any ordered by Ministry of Education, Govt. of India) through the counselling under JoSAA/CSAB. 
                <a href="#" className="font-semibold" style={{ color: color1 }}> Click here for details...</a>
              </p>
              <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.
              </p>
            </div>
          </section>
          
          {/* Fee Structure Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                   Fee Structure for the B.Tech program (Admission 2025)
                </h2>
              </div>
              
              <FeeTable data={feeStructure} />

              <p className={`text-lg leading-relaxed mt-6 p-6 rounded-2xl border-2 border-dashed ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-white'}`} style={{ borderColor: `${color1}66`, backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(255, 255, 255, 0.5)' }}>
                In view of the above, the initial first semester payment on joining for the admission-2025 shall be 1,45,200/- towards tuition fee, 34,000/- towards hostel/facility maintenance fee, 30,750/- towards mess advance, Rs. 1300/- towards medical insurance, 300/- towards mess equipment maintenance, 300/- towards sports equipment maintenance, 300/- towards club activities, Rs. 13,000/- towards caution deposit, Rs. 1100/- towards sports (one-time fee) & Rs. 1100/- towards mess (one-time fee).
              </p>
            </div>
          </section>

          {/* DASA Fee Structure Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                 The Fee Structure for B.Tech program - DASA Admission 2025
              </h2>

              <FeeTable data={dasaFeeStructure} />

              <div className="mt-8 space-y-4">
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  (a) CIWG Category: As per DASA fee structure.
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  (b) Non SAARC & SAARC : As per DASA fee structure -&gt; 
                  <a href="#" className="font-semibold" style={{ color: color1 }}> DASA Admission-2025</a>.
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  <strong>Mode of reporting at the institute:</strong> Offline
                </p>
                <p className={`text-lg p-4 rounded-lg ${darkMode ? 'text-gray-300 bg-gray-900' : 'text-gray-700 bg-gray-50'}`} style={{ backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.5)' : color3 }}>
                  <strong>Date of commencement of classes:</strong> Will be finalized according to the JoSAA/CSAB schedule and will be declared later.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom Links Section */}
          <section
            className={`relative rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
          >
            <div className="p-8 md:p-12">
              <h3 className={`text-2xl font-semibold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                The detailed curriculum and regulations can be found here:
              </h3>
              <div className="flex flex-wrap gap-4">
                <StyledLink 
                  href="#" 
                  text="UG Academic Calendar" 
                  icon={Calendar} 
                />
                <StyledLink 
                  href="#" 
                  text="B.Tech ECE Curriculum" 
                  icon={BookOpenText} 
                />
                <StyledLink 
                  href="#" 
                  text="UG Course Regulations" 
                  icon={Scale} 
                />
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
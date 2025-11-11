import React from "react";
import API from "../../api/api.jsx";
import placementdetailimg from '../../assets/images/placementstatisticsiiit.jpeg'
import aiclogo from '../../assets/images/aiclogo.png'
import gyanlogo from '../../assets/images/gyanlogo.png'
import msmelogo from '../../assets/images/msmelogo.jpg'
import cyberlogo from '../../assets/images/cyberlogo.png'
import i2cslogo from '../../assets/images/12cslogo.png'
import dadblogo from '../../assets/images/dadblogo.jpeg'
import factlogo from '../../assets/images/factlogo.jpeg'
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import event1 from '../../assets/images/event1.jpg';
import event2 from '../../assets/images/event2.jpg';
import event3 from '../../assets/images/event3.jpg';
import event4 from '../../assets/images/event4.jpg';
import facultyimg1 from '../../assets/images/facultyimg1.jpg';
import facultyimg2 from '../../assets/images/facultyimg2.jpg';
import facultyimg3 from '../../assets/images/facultyimg3.jpg';
import facultyimg4 from '../../assets/images/facultyimg4.jpg';
import facultyimg5 from '../../assets/images/facultyimg5.jpg';
import facultyimg6 from '../../assets/images/facultyimg6.jpg';
import facultyimg7 from '../../assets/images/facultyimg7.jpg';
import facultyimg8 from '../../assets/images/facultyimg8.jpg';


import { useTheme } from "../../context/createContext.jsx";
import ImageSlider from "../../components/imageslider.jsx";
import AnnouncementBanner from "../../components/announcementbanner.jsx";
import { Building2, Target, Eye, TrendingUp, Award, ExternalLink, ArrowRight, Sparkles, BookOpen, Calendar, Users } from "lucide-react";

const HomePage = () => {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  const color2 = API.color2;

  const newsList = [
    {
      title: "Admission to Ph.D. Programme - January 2026",
      date: "2025-10-15",
      isNew: true,
      link: "#"
    },
    {
      title: "Recruitment of Contract Faculty - CSE dated 17.10.2025",
      date: "2025-10-17",
      isNew: true,
      link: "#"
    },
    {
      title: "Result of Mess Manager (On Contract) dated 29.09.2025",
      date: "2025-09-29",
      isNew: true,
      link: "#"
    },
    {
      title: "Result of Technician (On Contract) dated 08.09.2025",
      date: "2025-09-08",
      isNew: false,
      link: "#"
    },
    {
      title: "Result of Psychologist (On Contract) dated 08.09.2025",
      date: "2025-09-08",
      isNew: false,
      link: "#"
    }
  ];

  const eventsList = [
    {
      image: event1,
      title: "Faculty Development Programme 2024(CSE)",
      link: "#"
    },
    {
      image: event2,
      title: "Tech Symposium 2024",
      link: "#"
    },
    {
      image: event3,
      title: "Research Conference",
      link: "#"
    },
    {
      image: event4,
      title: "Cultural Fest",
      link: "#"
    }
  ];

  const companyList = [
    {
      logo: aiclogo,
      name: "Incubation Centre (AIC)",
      link: "https://icentre.iiitkottayam.ac.in/"
    },
    {
      logo: gyanlogo,
      name: "Gyaan Lab",
      link: "https://gyaan.iiitkottayam.ac.in/"
    },
    {
      logo: i2cslogo,
      name: "I2CS",
      link: "https://i2cs.iiitkottayam.ac.in/"
    },
    {
      logo: msmelogo,
      name: "MSME Business Incubation Centre",
      link: "https://msme.iiitkottayam.ac.in/"
    },
    {
      logo: cyberlogo,
      name: "CyberLabs",
      link: "https://cyberlabs.iiitkottayam.ac.in/"
    },
    {
      logo: dadblogo,
      name: "DADB",
      link: "https://dadb.com/in/?lang=en"
    },
    {
      logo: factlogo,
      name: "FACTS-H Lab",
      link: "https://factsh.iiitkottayam.ac.in/home"
    }
  ];

  const facultyList = [
    {
      image: facultyimg1,
      name: "Dr. Shajulin Benedict",
      designation: "Associate Professor",
      department: "Computer Science & Engineering",
      specialization: "Cloud Computing, IoT",
      link: "#"
    },
    {
      image: facultyimg2,
      name: "Dr. Ebin Deni Raj",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      specialization: "Biomedical AI, Pattern Recognition",
      link: "#"
    },
    {
      image: facultyimg3,
      name: "Dr. Jayakrushna Sahoo",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      specialization: "Machine Learning, Networks",
      link: "#"
    },
    {
      image: facultyimg4,
      name: "Dr. Panchami V",
      designation: "Assistant Professor",
      department: "Cyber Security",
      specialization: "Network Security, Blockchain",
      link: "#"
    },
    {
      image: facultyimg5,
      name: "Dr. Bala S",
      designation: "Assistant Professor",
      department: "Electronics & Communication",
      specialization: "VLSI Design, IoT Systems",
      link: "#"
    },
    {
      image: facultyimg6,
      name: "Dr. Victor Paul",
      designation: "Assistant Professor",
      department: "Computer Science & Engineering",
      specialization: "Data Analytics, Web Science",
      link: "#"
    },
    {
      image: facultyimg7,
      name: "Dr. Bakkyaraj T",
      designation: "Assistant Professor",
      department: "Mathematics",
      specialization: "Nonlinear Analysis, Solitons",
      link: "#"
    },
    {
      image: facultyimg8,
      name: "Prof. Ashok S",
      designation: "Adjunct Professor",
      department: "Computer Science & Engineering",
      specialization: "Energy Management, AI",
      link: "#"
    }
  ];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        <AnnouncementBanner />


        <ImageSlider images={[img1, img2, img3]} />

        {/* Main Content Area */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-7xl mx-auto space-y-20">
            
            {/* About IIIT Kottayam Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <Building2 className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  About IIIT Kottayam
                </h2>
              </div>

              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Content */}
                    <div>
                      <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        IIIT Kottayam was established in 2015 and declared an <span className="font-bold" style={{ color: color1 }}>"Institution of National Importance"</span> by Parliament in 2017. Located on a 53-acre campus in Pala, Kottayam, Kerala.
                      </p>
                      <p className={`text-lg leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        We provide world-class education in Computer Science and allied fields at UG, PG, and doctoral levels, fostering technically proficient and socially conscious graduates.
                      </p>
                      <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Our mission is to cultivate innovation and creativity while addressing societal challenges through cutting-edge technology and research collaboration.
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {['🎓 UG Programs', '🔬 PG Programs', '📚 PhD Programs', '🏆 Research Focus'].map((tag, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 rounded-lg text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                            style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: YouTube Video */}
                    <div className="flex items-center justify-center">
                      <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/UREZ8Nn_rBc"
                          title="IIIT Kottayam Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Latest News & Events Section */}
            <section>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Latest News */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                      <BookOpen className="w-7 h-7" style={{ color: color1 }} />
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'} flex-1`}>
                      Latest News
                    </h2>
                    <a href="#" className="flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: color1 }}>
                      View All <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div 
                    className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                  >
                    <div className="divide-y" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
                      {newsList.map((news, index) => (
                        <a
                          key={index}
                          href={news.link}
                          className={`block px-6 py-4 transition-all duration-300 hover:scale-[1.02] ${
                            darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-3">
                            <h3 
                              className={`text-sm font-medium flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'} hover:underline`}
                              style={{ color: darkMode ? '' : color1 }}
                            >
                              {news.title}
                            </h3>
                            {news.isNew && (
                              <span
                                className="text-xs text-white px-2.5 py-1 rounded-full font-bold shadow-md"
                                style={{
                                  backgroundColor: '#EF4444',
                                  animation: "glowPulse 1.5s ease-in-out infinite"
                                }}
                              >
                                New
                              </span>
                            )}
                          </div>
                          <p className={`text-xs mt-1.5 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{news.date}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Events */}
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                      <Calendar className="w-7 h-7" style={{ color: color1 }} />
                    </div>
                    <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      Events
                    </h2>
                  </div>

                  <div 
                    className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                    style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                  >
                    <EventSlider events={eventsList} darkMode={darkMode} color1={color1} />
                  </div>
                </div>
              </div>
            </section>

            {/* Meet Our Faculty Section */}
            <section>
              <div className="flex items-center gap-4 mb-8 justify-between flex-wrap">
                <div className="flex items-center gap-4">
                  <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                    <Users className="w-7 h-7" style={{ color: color1 }} />
                  </div>
                  <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Meet Our Faculty
                  </h2>
                </div>
                <a href="#" className="flex items-center gap-2 text-sm font-semibold hover:underline" style={{ color: color1 }}>
                  View All Faculty <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <FacultyCarousel faculty={facultyList} darkMode={darkMode} color1={color1} color2={color2} />
              </div>
            </section>

            {/* Vision & Mission Section */}
            <section>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Vision Card */}
                <div 
                  className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                        <Eye className="w-6 h-6" style={{ color: color1 }} />
                      </div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Vision</h3>
                    </div>
                    <p className={`text-base leading-relaxed mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      "Generating knowledge for the future" is IIIT Kottayam's motto in the fields of IT and IT-enabled research. In a short period of time, the institute has transformed into a hub for knowledge development, emphasizing ideas that address both local and global concerns.
                    </p>
                    <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>Become a top-tier, research-driven organization in a variety of development and research domains.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>Converting bright young academics and researchers into Technoprenuers.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>Excelling in information technology, conducting cutting-edge research, and providing important resources to the business and societal sectors.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Mission Card */}
                <div 
                  className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
                >
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                        <Target className="w-6 h-6" style={{ color: color1 }} />
                      </div>
                      <h3 className={`text-2xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>Mission</h3>
                    </div>
                    <ul className={`space-y-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>To produce graduates who are competent in their profession, creative in solving real-world problems, and exhibit professional ethics with a caring attitude towards the society.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>To solve local problems using global technologies and solve global problems using local technologies across disciplines.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>To promote the significance of ethics and integrity in technical education further fostering the learning with respect for individual human rights.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>To provide academic excellence in Engineering and Technology by imparting quality as well as value-based education.</span>
                      </li>
                      <li className="flex gap-3">
                        <span style={{ color: color1 }}>•</span>
                        <span>To project the nation to the forefront of information technology research and development.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Placement Details Section */}
{/*             
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <TrendingUp className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Placement Statistics
                </h2>
              </div>

              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8">
                  <img 
                    src={placementdetailimg} 
                    alt="Placement Details" 
                    className="rounded-xl shadow-md w-full max-w-3xl mx-auto"
                  />
                  <p className={`mt-4 text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    * Source of Information: As informed by IIIT Kottayam students placement committee
                  </p>
                </div>
              </div>
            </section> */}

            {/* Innovative Initiatives Section */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className={`shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2 }}>
                  <Award className="w-7 h-7" style={{ color: color1 }} />
                </div>
                <h2 className={`text-3xl md:text-4xl font-bold ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                  Innovative Initiatives of IIITK
                </h2>
              </div>

              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8 md:p-12">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {companyList.map((item, index) => (
                      <a
                        key={index}
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-white'}`}
                      >
                        <div className={`h-20 w-20 flex items-center justify-center p-2 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
                          <img
                            src={item.logo}
                            className="h-full w-full object-contain"
                            alt={item.name}
                          />
                        </div>
                        <p className={`text-sm font-semibold text-center group-hover:underline ${darkMode ? 'text-gray-200' : 'text-gray-800'}`} style={{ color: darkMode ? '' : color1 }}>
                          {item.name}
                        </p>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: color1 }} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* MOU Section */}
            <section>
              <div 
                className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                style={{ borderColor: darkMode ? '#374151' : `${color1}33` }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}
              >
                <div className="p-8 md:p-12">
                  <h3 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Memorandum of Understanding (MOU)
                  </h3>
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam has signed MOU with various organizations for incubation centers, T&P activities, Coding Clubs and Research Collaborations.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
                    style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                  >
                    Know More <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

const FacultyCarousel = ({ faculty, darkMode, color1, color2 }) => {
  const scrollRef = React.useRef(null);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || isPaused) return;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += 1;
      }
    };

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, [isPaused]);

  // Duplicate faculty list for infinite scroll effect
  const duplicatedFaculty = [...faculty, ...faculty];

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex gap-6 p-8 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedFaculty.map((member, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-72 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              
              {/* Faculty Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gray-200 text-sm font-medium mb-2">{member.designation}</p>
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="text-xs px-3 py-1 rounded-full font-semibold"
                    style={{ backgroundColor: color1, color: 'white' }}
                  >
                    {member.department}
                  </span>
                </div>
                <p className="text-gray-300 text-xs italic">{member.specialization}</p>
              </div>
            </div>

            {/* View Profile Button */}
            <div className={`p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <a
                href={member.link}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: darkMode ? color1 : color2, color: color1, borderWidth: '2px', borderColor: color1 }}
              >
                View Profile <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient Overlays for smooth edge fade */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ 
          background: darkMode 
            ? 'linear-gradient(to right, #1F2937, transparent)' 
            : 'linear-gradient(to right, white, transparent)' 
        }}
      ></div>
      <div 
        className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
        style={{ 
          background: darkMode 
            ? 'linear-gradient(to left, #1F2937, transparent)' 
            : 'linear-gradient(to left, white, transparent)' 
        }}
      ></div>

      {/* Pause Indicator */}
      {isPaused && (
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/70 text-white text-xs rounded-full z-20">
          Hover to pause
        </div>
      )}
    </div>
  );
};

const EventSlider = ({ events, darkMode, color1 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [events.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length);
  };

  return (
    <div className="relative group">
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ height: '400px' }}>
        {events.map((event, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            
            {/* Event Title */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <a 
                href={event.link}
                className="text-white text-xl font-bold hover:underline transition-all duration-300 hover:text-green-400 inline-block"
              >
                {event.title}
              </a>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Hidden on mobile, shown on hover on desktop */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          style={{ backgroundColor: `${color1}E6` }}
        >
          <ArrowRight className="w-5 h-5 text-white rotate-180" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          style={{ backgroundColor: `${color1}E6` }}
        >
          <ArrowRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Gallery Button & Dots Navigation */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex gap-2">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8' : 'w-2'
              }`}
              style={{
                backgroundColor: index === currentIndex ? color1 : (darkMode ? '#4B5563' : '#D1D5DB')
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 transition-all duration-300"
          style={{ backgroundColor: darkMode ? '#1f2937' : color1, color: 'white', borderColor: color1 }}
        >
          View Gallery <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

const NewsCard = ({ title, date, isNew, link, darkMode, color1 }) => {
  return (
    <>
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
        `}
      </style>

      <a
        href={link}
        className={`block transition-all shadow-sm hover:shadow-md rounded-lg px-4 py-3 border border-gray-200 ${
          darkMode ? "bg-gray-800! border-gray-700! hover:bg-gray-700!" : 'bg-white hover:bg-gray-50'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className={`text-[15px] md:text-base font-medium ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
            {title}
          </h3>

          {isNew && (
            <span
              className="text-[13px] bg-red-500 text-white px-2 py-0.5 rounded-md"
              style={{
                animation: "glowPulse 1.2s ease-in-out infinite"
              }}
            >
              New
            </span>
          )}
        </div>
        <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{date}</p>
      </a>
    </>
  );
};

export default HomePage;

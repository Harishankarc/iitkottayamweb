import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/api.jsx';
import { useTheme } from '../../context/createContext.jsx';
import {
  Sparkles,
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  BookOpenText,
  Lightbulb,
  CheckCircle2,
  BarChart3,
  BrainCircuit,
  Lock,
  Network,
  Cloud,
  TowerControl,
  Microscope,
  Settings,
  TrendingUp,
  Dna,
  Monitor,
  Camera,
  Rocket,
  Building,
  Trophy,
  Image,
  Video,
  FileText,
  Globe,
  Briefcase,
  Smile,
  PersonStanding,
  Dumbbell,
  Volleyball,
  Drama,
  Palette
} from 'lucide-react';


export default function WhyIIIT() {


  const { darkMode } = useTheme();

  const color1 = api.color1; // #239244 (Dark Green)
  const color2 = api.color2; // #e8f5f0 (Light Mint)
  const color3 = api.color3; // #F1F3F3 (Light Gray)

  // Data for Research Groups
  const researchGroups = [
    { name: 'Data Science Research Group', desc: 'Advanced data analytics and modelling', icon: <BarChart3 /> },
    { name: 'Big data & ML Research Group', desc: 'Machine learning algorithms and big data', icon: <BrainCircuit /> },
    { name: 'Cyber Security Research Group', desc: 'Cutting-edge techniques for securing systems', icon: <Lock /> },
    { name: 'Network Science Research Group', desc: 'Study of complex networks and applications', icon: <Network /> },
    { name: 'IoT Cloud Research Group', desc: 'Integrating IoT with cloud computing', icon: <Cloud /> },
    { name: 'Intelligent IoT Research Group', desc: 'Developing intelligent IoT systems', icon: <Lightbulb /> },
    { name: 'Smart Wireless Inter-Networking', desc: 'Advanced wireless communication', icon: <TowerControl /> },
    { name: 'I2CS - Intelligent Integrated Circuits', desc: 'Development of smart integrated circuits', icon: <Microscope /> },
    { name: 'Computational Engineering', desc: 'Computational methods and data modelling', icon: <Settings /> },
    { name: 'Data Analytics and Business Decisions', desc: 'Data analytics for business strategies', icon: <TrendingUp /> },
    { name: 'Bio-Medical Informatics & Genomics', desc: 'Informatics in biomedical research', icon: <Dna /> },
    { name: 'FACTS-H Lab', desc: 'Human-computer interaction & smart systems', icon: <Monitor /> },
    { name: 'ASPIRE Group', desc: 'AI-powered signal and image processing', icon: <Camera /> }
  ];

  // Data for Incubation Centers
  const incubationCenters = [
    {
      title: 'Atal Incubation Centre (AIC)',
      subtitle: 'Atal Innovation Mission',
      desc: 'A flagship initiative under the Atal Innovation Mission, supported by the Government of India, offering state-of-the-art infrastructure and a vast network of industry experts.',
      icon: <Rocket className="w-10 h-10" style={{ color: color1 }} />
    },
    {
      title: 'MSME Business Incubation Centre',
      subtitle: 'Ministry of MSME',
      desc: 'Supported by the Ministry of MSME, this center is dedicated to promoting and assisting small and medium enterprises with tailored incubation services and financial resources.',
      icon: <Building className="w-10 h-10" style={{ color: color1 }} />
    },
    {
      title: 'Gyaan Innovation Lab',
      subtitle: 'Innovation Hub',
      desc: 'Focuses on promoting creativity and innovation among students and faculty by providing access to cutting-edge technologies and supporting interdisciplinary projects.',
      icon: <Lightbulb className="w-10 h-10" style={{ color: color1 }} />
    }
  ];

  // Data for Holistic Development
  const activities = [
    { label: 'Yoga', icon: <PersonStanding className="w-4 h-4" /> },
    { label: 'Gymnasium', icon: <Dumbbell className="w-4 h-4" /> },
    { label: 'Sports', icon: <Volleyball className="w-4 h-4" /> },
    { label: 'Competitions', icon: <Trophy className="w-4 h-4" /> },
    { label: 'Cultural', icon: <Drama className="w-4 h-4" /> },
    { label: 'Creative Arts', icon: <Palette className="w-4 h-4" /> }
  ];

  return (
    <>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
        {/* Hero Section */}
        <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="absolute inset-0" style={{ backgroundColor: darkMode ? '#1f2937E6' : `${color2}E6` }}></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute top-40 right-10 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
          </div>
          <div className="relative container mx-auto px-4 py-28 md:py-36">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 backdrop-blur-md rounded-full text-sm font-bold mb-8 border hover:scale-105 transition-all duration-500 shadow-lg cursor-pointer" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                <Sparkles className="w-4 h-4" style={{ color: color1 }} />
                Established 2015 • Institution of National Importance
              </div>
              <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight tracking-tight ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Why <span className="block md:inline text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${color1}, ${color1}B3)` }}>IIIT Kottayam</span>
              </h1>
              <p className={`text-xl md:text-3xl leading-relaxed font-light max-w-4xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Pioneering excellence in Information Technology education and research
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg className={`w-full h-20 ${darkMode ? 'fill-gray-900' : 'fill-white'}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          {/* Introduction Card */}
          <section className="mb-24" >
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl overflow-hidden border transition-all duration-300 hover:shadow-2xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold mb-6 border-2 shadow-md text-white rounded-lg" style={{ backgroundColor: color1, borderColor: color1 }} >
                    <GraduationCap className="w-5 h-5" />
                    About Our Institute
                  </div>
                  <p className={`text-lg md:text-xl leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The Indian Institute of Information Technology (IIIT) Kottayam is an <span className="font-bold" style={{ color: color1 }}>"Institution of National Importance"</span> established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.
                  </p>
                  <p className={`text-lg md:text-xl leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.
                  </p>
                  <div className={`my-8 rounded-2xl p-8 border-2 border-dashed ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: `${color1}66` }}>
                    <div className="text-center">
                      <Image className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Campus Image/Video Placeholder</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>IIIT Kottayam Campus Visual Content</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-8">
                    {['🤝 PPP Model', '🌳 53 Acre Campus', '🚀 AIC Certified', '🏆 National Importance'].map((tag, i) => (
                      <span
                        key={i}
                        className="px-6 py-3 rounded-xl text-sm font-semibold border-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        style={{ backgroundColor: darkMode ? '#1f2937' : color2, color: color1, borderColor: `${color1}66` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Page Referral Banner */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <Link to="/admissions" className="block">
                <div className="rounded-3xl p-10 shadow-xl border relative overflow-hidden group" style={{ backgroundColor: color1, borderColor: color1 }}>
                  <div className="absolute inset-0 opacity-0  transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to right, ${color1}1A, ${color1}0D)` }}></div>
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 transition-colors duration-300">
                        Interested in Joining IIIT Kottayam?
                      </h3>
                      <p className="text-lg text-gray-50 transition-colors duration-300">
                        Explore our admission process, eligibility criteria, and application deadlines
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                      <span className="text-white group-hover:text-[#239244] font-bold text-lg transition-colors duration-300">Learn More</span>
                      <ArrowRight className="w-6 h-6 text-white group-hover:text-[#239244] group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
          {/* Academic Excellence Section */}
          {/* <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Academic <span style={{ color: color1 }}>Excellence</span>
              </h2>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}CC, ${color1})` }}></div>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              <div className={`group relative rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 overflow-hidden cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ backgroundColor: color2 }}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" style={{ backgroundColor: color1 }}></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md" style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color1}CC)` }}>
                    <ShieldCheck className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-5 transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} style={{ color: 'inherit' }} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    Topmost IIIT in India
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam is recognized as one of the premier IIITs in India, known for its unwavering commitment to promoting a culture of innovation and academic excellence. With a distinguished faculty and a forward-thinking curriculum, the institute ensures students receive a top-tier education, equipping them with the skills required to excel in today's fast-evolving technological landscape.
                  </p>
                </div>
              </div>
              <div className={`group relative rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border hover:-translate-y-2 overflow-hidden cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ backgroundColor: color2 }}></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" style={{ backgroundColor: color1 }}></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md" style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}CC, ${color1})` }}>
                    <BookOpenText className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`text-2xl md:text-3xl font-bold mb-5 transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                    High-Quality Education
                  </h3>
                  <p className={`text-base md:text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Our curriculum is meticulously designed to develop innovative thinkers and future leaders. A robust academic community of experienced professors, Ph.D. scholars, and diverse students fosters collaborative learning and intellectual curiosity, ensuring students are well-prepared to tackle real-world challenges with cutting-edge research and practical applications.
                  </p>
                </div>
              </div>
            </div>
          </section> */}

          {/* Default Re-useable Section */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl p-10 md:p-16 shadow-xl overflow-hidden relative border hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: darkMode ? '#374151' : `${color1}33` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}33`}>
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
                  <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full blur-3xl" style={{ backgroundColor: `${color1}33` }}></div>
                </div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 backdrop-blur-md rounded-full text-sm font-bold mb-6 border-2 shadow-md" style={{ backgroundColor: `${color1}1A`, color: color1, borderColor: `${color1}66` }}>
                    <Lightbulb className="w-5 h-5" />
                    Innovative Research
                  </div>
                  <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Funded Research Projects
                  </h2>
                  <p className={`text-lg md:text-xl leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    <span className="font-semibold" style={{ color: color1 }}>IIIT Kottayam</span> fosters a strong research culture, securing numerous funded projects in fields like IoT, 6G communications, AI, and cybersecurity. Collaborations with agencies like the British Council, Volkswagen Foundation, MeitY, and DST, along with participation in National Missions (NMICPS), highlight our commitment to converting research into practical, innovative solutions.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['British Council', 'UKIERI', 'Volkswagen Foundation', 'Toyota Foundation', 'Mozilla Foundation', 'MeitY', 'DST', 'DAAD & IGSTC'].map((org, i) => (
                      <div key={i} className={`flex items-center gap-3 backdrop-blur-sm px-4 py-3 rounded-xl border hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}4D` }}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: color1 }} />
                        <span className={`text-sm font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{org}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Research Groups Section */}
          {/* <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Research <span style={{ color: color1 }}>Groups</span>
              </h2>
              <p className={`text-lg md:text-xl max-w-4xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                The institute hosts specialized research groups including faculty, Ph.D. scholars, students, alumni, and international collaborators to drive innovation.
              </p>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}CC, ${color1})` }}></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {researchGroups.map((group, index) => (
                <div
                  key={index}
                  className={`group relative rounded-2xl p-6 border-2 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500" style={{ backgroundColor: color1 }}></div>
                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                      {React.cloneElement(group.icon, { className: "w-7 h-7", style: { color: color1 } })}
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold transition-colors duration-300 leading-tight mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                        {group.name}
                      </h3>
                      <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {group.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className={`text-base md:text-lg mt-12 text-center max-w-5xl mx-auto leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              These groups are at the forefront of technological research, providing students with unparalleled opportunities to engage in high-impact projects.
            </p>
          </section> */}

          {/* Incubation and Start-ups Section */}
          {/* <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                Incubation & <span style={{ color: color1 }}>Start-ups</span>
              </h2>
              <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundImage: `linear-gradient(to right, ${color1}CC, ${color1})` }}></div>
            </div>
            <div className="max-w-7xl mx-auto">
              <p className={`text-lg md:text-xl leading-relaxed mb-12 text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <span className="font-bold" style={{ color: color1 }}>Incubation Centres:</span> IIIT Kottayam has dedicated centers that support start-ups by providing resources, mentorship, and funding.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {incubationCenters.map((center, index) => (
                  <div key={index} className={`group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}1A, ${color1}0D, ${color1}1A)` }}></div>
                    <div className="relative p-8">
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500" style={{ backgroundColor: darkMode ? '#1f2937' : color2 }}>
                        {center.icon}
                      </div>
                      <div className="text-sm font-bold mb-2 uppercase tracking-wide" style={{ color: color1 }}>{center.subtitle}</div>
                      <h3 className={`text-2xl font-bold mb-4 transition-colors duration-300 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`} onMouseEnter={(e) => e.currentTarget.style.color = color1} onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}>
                        {center.title}
                      </h3>
                      <p className={`text-base leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {center.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`mt-12 rounded-2xl p-8 border-l-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${darkMode ? 'bg-gray-800' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: color1 }}>
                <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Together, these centers create a robust support system for aspiring entrepreneurs, ensuring innovative ideas receive the guidance and resources needed to flourish.
                </p>
              </div>
            </div>
          </section> */}

          {/* Coding and Programming Culture */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} style={{ backgroundImage: darkMode ? 'none' : `linear-gradient(to bottom right, ${color3}, ${color2}, ${color2})`, backgroundColor: darkMode ? '#1f2937' : '' }}>
                <div className="grid lg:grid-cols-2 gap-0">
                  <div className={`p-10 md:p-12 relative overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-50" style={{ backgroundColor: color2 }}></div>
                    <div className="relative">
                      <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        Coding & Programming Culture
                      </h2>
                      <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>
                        Student Clubs and Chapters
                      </h3>
                      <p className={`leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        The institute supports clubs like GeeksForGeeks, Code Chef, and Google DSC, which organize events, workshops, and training to enhance students' coding skills and foster a community of passionate developers.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {['GeeksForGeeks', 'CodeChef', 'Google DSC', 'ACM Chapter', 'IEEE Student Branch'].map((club, i) => (
                          <span
                            key={i}
                            className="px-5 py-2.5 border-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                            style={{ backgroundColor: darkMode ? '#1f2937' : color2, borderColor: `${color1}66`, color: color1 }}
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-10 md:p-12 relative overflow-hidden" style={{ backgroundImage: `linear-gradient(to bottom right, ${color1}, ${color1}CC)` }}>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Trophy className="w-8 h-8" />
                        Key Achievements
                      </h3>
                      <div className="space-y-4">
                        {[
                          { title: 'GATE AIR 21', desc: 'Outstanding academic performance' },
                          { title: 'Smart India Hackathon', desc: 'Winners every year - Innovation champions' },
                          { title: 'DAAD-WISE Scholarship', desc: 'International recognition & opportunities' },
                          { title: 'EPFL Switzerland', desc: 'Prestigious summer internships' },
                          { title: 'Purdue University', desc: 'Overseas Visiting Doctoral Fellowship' },
                          { title: 'Google Summer of Code', desc: 'Multiple selections annually' }
                        ].map((achievement, i) => (
                          <div key={i} className="group flex items-start gap-4 cursor-pointer hover:translate-x-2 transition-transform duration-300">
                            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg border-2 border-white/30">
                              <CheckCircle2 className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-bold text-lg mb-1 group-hover:text-gray-100 transition-colors duration-300">{achievement.title}</div>
                              <div className="text-gray-100 text-sm group-hover:text-white transition-colors duration-300">{achievement.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className={`text-base md:text-lg mt-8 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Students from IIIT Kottayam have consistently excelled in global and national competitions like GSoC and Smart India Hackathon. Notable achievements include GATE AIR 21, DAAD-WISE scholarships, and internships at prestigious institutions like EPFL, Switzerland, and Purdue University, USA, reflecting the high caliber of our students.
              </p>
            </div>
          </section> */}

          {/*  Custom For Admin*/}
{/*           
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Technical Events & <span style={{ color: color1 }}>Workshops</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Advanced Technologies</h3>
                  <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam regularly hosts events on AI, ML, blockchain, and cybersecurity through forums like the IEEE Student Branch and ACM Chapter. These provide students with hands-on experience and insights into emerging trends beyond the standard curriculum.
                  </p>
                  <div className={`mt-8 rounded-2xl p-8 border-2 border-dashed ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: `${color1}66` }}>
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Workshop/Event Media Placeholder</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Technical Events and Workshops Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Real-World Problem Solving */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Real-World <span style={{ color: color1 }}>Problem Solving</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Student Projects</h3>
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Students are encouraged to tackle real-world problems through projects, summer internships, and participation in funded research. These opportunities allow them to apply knowledge practically and develop innovative solutions.
                  </p>
                  <p className={`text-lg leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    A key initiative includes providing cybersecurity training for Kerala Police officers of Cyberdome, equipping them to combat cybercrime. This not only enhances stakeholder capabilities but also gives students a unique opportunity to contribute to societal safety.
                  </p>
                  <div className={`mt-8 rounded-2xl p-8 border-2 border-dashed ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: `${color1}66` }}>
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Student Projects Media Placeholder</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Real-World Problem Solving Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* International Collaborations */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: darkMode ? '#374151' : `${color1}4D` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}99`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}4D`}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    International <span style={{ color: color1 }}>Collaborations</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Global Exposure</h3>
                  <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    IIIT Kottayam collaborates with international universities for global conferences, exchange programs, and joint research. Partnerships include the <span className="font-semibold" style={{ color: color1 }}>University of Agder (Norway), TU Munich (Germany), University of North Dakota (USA), University of Glasgow (UK),</span> and many others worldwide, reinforcing our commitment to a global education.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['U. of Agder', 'TU Munich', 'U. North Dakota', 'Offenburg Univ.', 'U. Glasgow', 'U. Klagenfurt', 'Nat. Chung Cheng', 'Many More'].map((univ, i) => (
                      <div key={i} className={`rounded-xl px-4 py-3 text-center border-2 hover:shadow-md transition-all duration-300 cursor-pointer ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}4D` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}99`} onMouseLeave={(e) => e.currentTarget.style.borderColor = `${color1}4D`}>
                        <span className="text-sm font-semibold flex items-center justify-center gap-2" style={{ color: color1 }}>
                          <Globe className="w-4 h-4" /> {univ}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/*  Custom For Admin*/}
{/*           
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Industry <span style={{ color: color1 }}>Interface</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Industry-Supported Education</h3>
                  <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Strong industry connections bridge the gap between academics and industry requirements. Partnerships with giants like <span className="font-semibold" style={{ color: color1 }}>IBM, TCS, Unisys, HP, Palo Alto Networks, Nvidia, and NeST digital</span> provide students with opportunities for internships, industry-relevant projects, and exposure to cutting-edge technologies.
                  </p>
                  <div className={`mt-8 rounded-2xl p-8 border-2 border-dashed ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: `${color1}66` }}>
                    <div className="text-center">
                      <Briefcase className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Industry Partnership Media Placeholder</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Industry Interface Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Career Development */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: darkMode ? '#374151' : `${color1}4D` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}99`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : `${color1}4D`}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Career <span style={{ color: color1 }}>Development</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Placement Support</h3>
                  <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Our dedicated placement cell provides comprehensive training and support, achieving remarkable success. Strong industry connections with companies like <span className="font-semibold" style={{ color: color1 }}>Amazon, IBM, Bosch, Nissan, TCS, Infosys, Nvidia, Goldman Sachs, and ZOHO</span> ensure students gain practical experience.
                  </p>
                  <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Despite a challenging environment, the 2024 batch has achieved an 85% placement rate, with four international placements and numerous foreign internships. <span className="font-bold" style={{ color: color1 }}>The highest domestic CTC is 45 LPA, and the highest international CTC is 23 LPA</span>. Efforts continue to achieve 100% placement.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className={`rounded-2xl p-6 text-center border-2 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: color1 }}>45 LPA</div>
                      <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Highest Domestic CTC</div>
                    </div>
                    <div className={`rounded-2xl p-6 text-center border-2 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: color1 }}>23 LPA</div>
                      <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Highest International CTC</div>
                    </div>
                    <div className={`rounded-2xl p-6 text-center border-2 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ borderColor: `${color1}66` }}>
                      <div className="text-4xl font-bold mb-2" style={{ color: color1 }}>85%</div>
                      <div className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Placement Rate 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          {/* Custom For Admin */}
          {/* <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className={`rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:bg-[#e8f5f0]'}`} onMouseEnter={(e) => e.currentTarget.style.borderColor = `${color1}66`} onMouseLeave={(e) => e.currentTarget.style.borderColor = darkMode ? '#374151' : '#e5e7eb'}>
                <div className="p-10 md:p-12">
                  <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                    Holistic <span style={{ color: color1 }}>Development</span>
                  </h2>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: color1 }}>Extracurricular Activities</h3>
                  <p className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    The institute promotes a balanced student life with a wide range of extracurricular activities, clubs, and societies. Facilities for yoga, a fully equipped gymnasium, and various sports encourage physical and mental well-being, with students actively winning prizes in inter-IIIT competitions.
                  </p>
                  <div className={`mt-8 rounded-2xl p-8 border-2 border-dashed ${darkMode ? 'bg-gray-700' : ''}`} style={{ backgroundColor: darkMode ? '' : color2, borderColor: `${color1}66` }}>
                    <div className="text-center">
                      <Smile className="w-16 h-16 mx-auto mb-4" style={{ color: `${color1}B3` }} />
                      <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sports & Activities Media Placeholder</p>
                      <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Holistic Development Visual Content</p>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    {activities.map((activity, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 rounded-xl text-sm font-semibold hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                        style={{ backgroundColor: darkMode ? '#1f2937' : color2, borderColor: `${color1}66`, color: color1 }}
                      >
                        {React.cloneElement(activity.icon, { style: { color: color1 } })}
                        {activity.label}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section> */}


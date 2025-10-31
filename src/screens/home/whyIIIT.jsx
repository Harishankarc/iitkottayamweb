import React from 'react';
import { Link } from 'react-router-dom';

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

  // Data for Research Groups
  const researchGroups = [
    { name: 'Data Science Research Group', desc: 'Advanced data analytics and modelling', icon: <BarChart3 />, color: 'text-green-600' },
    { name: 'Big data & ML Research Group', desc: 'Machine learning algorithms and big data', icon: <BrainCircuit />, color: 'text-emerald-600' },
    { name: 'Cyber Security Research Group', desc: 'Cutting-edge techniques for securing systems', icon: <Lock />, color: 'text-teal-600' },
    { name: 'Network Science Research Group', desc: 'Study of complex networks and applications', icon: <Network />, color: 'text-green-600' },
    { name: 'IoT Cloud Research Group', desc: 'Integrating IoT with cloud computing', icon: <Cloud />, color: 'text-emerald-600' },
    { name: 'Intelligent IoT Research Group', desc: 'Developing intelligent IoT systems', icon: <Lightbulb />, color: 'text-lime-600' },
    { name: 'Smart Wireless Inter-Networking', desc: 'Advanced wireless communication', icon: <TowerControl />, color: 'text-teal-600' },
    { name: 'I2CS - Intelligent Integrated Circuits', desc: 'Development of smart integrated circuits', icon: <Microscope />, color: 'text-green-600' },
    { name: 'Computational Engineering', desc: 'Computational methods and data modelling', icon: <Settings />, color: 'text-emerald-600' },
    { name: 'Data Analytics and Business Decisions', desc: 'Data analytics for business strategies', icon: <TrendingUp />, color: 'text-teal-600' },
    { name: 'Bio-Medical Informatics & Genomics', desc: 'Informatics in biomedical research', icon: <Dna />, color: 'text-green-600' },
    { name: 'FACTS-H Lab', desc: 'Human-computer interaction & smart systems', icon: <Monitor />, color: 'text-emerald-600' },
    { name: 'ASPIRE Group', desc: 'AI-powered signal and image processing', icon: <Camera />, color: 'text-teal-600' }
  ];

  // Data for Incubation Centers
  const incubationCenters = [
    {
      title: 'Atal Incubation Centre (AIC)',
      subtitle: 'Atal Innovation Mission',
      desc: 'A flagship initiative under the Atal Innovation Mission, supported by the Government of India, offering state-of-the-art infrastructure and a vast network of industry experts.',
      icon: <Rocket className="w-10 h-10 text-green-600" />,
      gradient: 'from-green-400 via-emerald-400 to-teal-400'
    },
    {
      title: 'MSME Business Incubation Centre',
      subtitle: 'Ministry of MSME',
      desc: 'Supported by the Ministry of MSME, this center is dedicated to promoting and assisting small and medium enterprises with tailored incubation services and financial resources.',
      icon: <Building className="w-10 h-10 text-emerald-600" />,
      gradient: 'from-emerald-400 via-teal-400 to-cyan-400'
    },
    {
      title: 'Gyaan Innovation Lab',
      subtitle: 'Innovation Hub',
      desc: 'Focuses on promoting creativity and innovation among students and faculty by providing access to cutting-edge technologies and supporting interdisciplinary projects.',
      icon: <Lightbulb className="w-10 h-10 text-teal-600" />,
      gradient: 'from-teal-400 via-green-400 to-emerald-400'
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
      <div className="min-h-screen bg-white">

        {/* Hero Section - Removed expensive animations */}
        <div className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50/90 via-emerald-50/85 to-teal-50/90"></div>

          {/* Static background blobs - NO ANIMATION = NO LAG */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute top-40 right-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>

          <div className="relative container mx-auto px-4 py-28 md:py-36">
            <div className="max-w-5xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600/10 backdrop-blur-md rounded-full text-green-800 text-sm font-bold mb-8 border border-green-300 hover:bg-green-600/20 hover:border-green-400 transition-all duration-500 hover:scale-105 shadow-lg cursor-pointer">
                <Sparkles className="w-4 h-4 text-green-700" /> {/* Lucide Icon */}
                Established 2015 • Institution of National Importance
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
                About <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">IIIT Kottayam</span> {/* Removed pulse */}
              </h1>
              <p className="text-xl md:text-3xl text-gray-700 leading-relaxed font-light max-w-4xl mx-auto">
                Pioneering excellence in Information Technology education and research
              </p>
            </div>
          </div>

          {/* Decorative wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg className="w-full h-20 fill-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
            </svg>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">

          {/* Introduction Card */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200 transition-shadow duration-300 hover:shadow-2xl">
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-full text-green-800 text-sm font-bold mb-6 border-2 border-green-300 shadow-md">
                    <GraduationCap className="w-5 h-5" /> {/* Lucide Icon */}
                    About Our Institute
                  </div>

                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    The Indian Institute of Information Technology (IIIT) Kottayam is an <span className="font-bold text-green-700">"Institution of National Importance"</span> established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                    The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.
                  </p>

                  {/* Photo/Video Placeholder */}
                  <div className="my-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Image className="w-16 h-16 mx-auto text-green-400 mb-4" /> {/* Lucide Icon */}
                      <p className="text-gray-600 font-medium">Campus Image/Video Placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">IIIT Kottayam Campus Visual Content</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-8">
                    {['🤝 PPP Model', '🌳 53 Acre Campus', '🚀 AIC Certified', '🏆 National Importance'].map((tag, i) => (
                      <span
                        key={i}
                        className="px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 rounded-xl text-sm font-semibold border-2 border-green-300 hover:border-green-500 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
              <Link to="/admissions" className="block group">
                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-green-500 hover:border-emerald-400 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-green-100 transition-colors duration-300">
                        Interested in Joining IIIT Kottayam?
                      </h3>
                      <p className="text-lg text-green-50 group-hover:text-white transition-colors duration-300">
                        Explore our admission process, eligibility criteria, and application deadlines
                      </p>
                    </div>
                    <div className="flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/40 group-hover:bg-white group-hover:border-white transition-all duration-300 group-hover:scale-110">
                      <span className="text-white group-hover:text-green-700 font-bold text-lg transition-colors duration-300">Learn More</span>
                      <ArrowRight className="w-6 h-6 text-white group-hover:text-green-700 group-hover:translate-x-2 transition-all duration-300" /> {/* Lucide Icon */}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Academic Excellence Section */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Academic <span className="text-green-600">Excellence</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {/* Card 1 */}
              <div className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-300 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full blur-3xl opacity-30"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <ShieldCheck className="w-8 h-8 text-white" /> {/* Lucide Icon */}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 group-hover:text-green-700 transition-colors duration-300">
                    Topmost IIIT in India
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    IIIT Kottayam is recognized as one of the premier IIITs in India, known for its unwavering commitment to promoting a culture of innovation and academic excellence. With a distinguished faculty and a forward-thinking curriculum, the institute ensures students receive a top-tier education, equipping them with the skills required to excel in today's fast-evolving technological landscape.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-green-300 hover:-translate-y-2 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-3xl opacity-30"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                    <BookOpenText className="w-8 h-8 text-white" /> {/* Lucide Icon */}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 group-hover:text-green-700 transition-colors duration-300">
                    High-Quality Education
                  </h3>
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    Our curriculum is meticulously designed to develop innovative thinkers and future leaders. A robust academic community of experienced professors, Ph.D. scholars, and diverse students fosters collaborative learning and intellectual curiosity, ensuring students are well-prepared to tackle real-world challenges with cutting-edge research and practical applications.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Innovative Research Section */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl p-10 md:p-16 shadow-xl overflow-hidden relative border border-green-100">
                {/* Static background blobs */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-10 right-10 w-72 h-72 bg-green-200 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-10 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl"></div>
                </div>

                <div className="relative">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600/10 backdrop-blur-md rounded-full text-green-800 text-sm font-bold mb-6 border-2 border-green-300 shadow-md">
                    <Lightbulb className="w-5 h-5" /> {/* Lucide Icon, removed spin */}
                    Innovative Research
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                    Funded Research Projects
                  </h2>
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-8">
                    <span className="font-semibold text-green-700">IIIT Kottayam</span> fosters a strong research culture, securing numerous funded projects in fields like IoT, 6G communications, AI, and cybersecurity. Collaborations with agencies like the British Council, Volkswagen Foundation, MeitY, and DST, along with participation in National Missions (NMICPS), highlight our commitment to converting research into practical, innovative solutions.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {['British Council', 'UKIERI', 'Volkswagen Foundation', 'Toyota Foundation', 'Mozilla Foundation', 'MeitY', 'DST', 'DAAD & IGSTC'].map((org, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white backdrop-blur-sm px-4 py-3 rounded-xl border border-green-200 hover:bg-green-50 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" /> {/* Lucide Icon */}
                        <span className="text-gray-800 text-sm font-semibold">{org}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Research Groups Section - Refactored with Lucide Icons */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Research <span className="text-green-600">Groups</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto mb-8">
                The institute hosts specialized research groups including faculty, Ph.D. scholars, students, alumni, and international collaborators to drive innovation.
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {researchGroups.map((group, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
                  <div className="relative flex items-start gap-4">
                    <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${group.color}`}>
                      {React.cloneElement(group.icon, { className: "w-7 h-7" })}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-tight mb-2">
                        {group.name}
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {group.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-base md:text-lg text-gray-700 mt-12 text-center max-w-5xl mx-auto leading-relaxed">
              These groups are at the forefront of technological research, providing students with unparalleled opportunities to engage in high-impact projects.
            </p>
          </section>

          {/* Incubation and Start-ups Section - Refactored with Lucide Icons */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Incubation & <span className="text-green-600">Start-ups</span>
              </h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12 text-center">
                <span className="font-bold text-green-700">Incubation Centres:</span> IIIT Kottayam has dedicated centers that support start-ups by providing resources, mentorship, and funding.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                {incubationCenters.map((center, index) => (
                  <div key={index} className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-2 border-gray-200 hover:border-green-300">
                    <div className={`absolute inset-0 bg-gradient-to-br ${center.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="relative p-8">
                      <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        {center.icon}
                      </div>
                      <div className="text-sm font-bold text-green-600 mb-2 uppercase tracking-wide">{center.subtitle}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors duration-300">
                        {center.title}
                      </h3>
                      <p className="text-base text-gray-700 leading-relaxed">
                        {center.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-l-4 border-green-600 hover:shadow-lg transition-all duration-300">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Together, these centers create a robust support system for aspiring entrepreneurs, ensuring innovative ideas receive the guidance and resources needed to flourish.
                </p>
              </div>
            </div>
          </section>

          {/* Coding and Programming Culture */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Left Panel */}
                  <div className="p-10 md:p-12 bg-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50"></div>
                    <div className="relative">
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        Coding & Programming Culture
                      </h2>
                      <h3 className="text-xl font-semibold text-green-700 mb-4">
                        Student Clubs and Chapters
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-8">
                        The institute supports clubs like GeeksForGeeks, Code Chef, and Google DSC, which organize events, workshops, and training to enhance students' coding skills and foster a community of passionate developers.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {['GeeksForGeeks', 'CodeChef', 'Google DSC', 'ACM Chapter', 'IEEE Student Branch'].map((club, i) => (
                          <span
                            key={i}
                            className="px-5 py-2.5 bg-green-50 border-2 border-green-300 text-green-800 rounded-xl text-sm font-semibold hover:bg-green-100 hover:border-green-500 hover:text-green-900 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                          >
                            {club}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Panel - Achievements */}
                  <div className="p-10 md:p-12 bg-gradient-to-br from-green-600 to-emerald-700 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="relative">
                      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Trophy className="w-8 h-8" /> {/* Lucide Icon, removed bounce */}
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
                              <CheckCircle2 className="w-6 h-6 text-white" /> {/* Lucide Icon */}
                            </div>
                            <div className="flex-1">
                              <div className="text-white font-bold text-lg mb-1 group-hover:text-green-100 transition-colors duration-300">{achievement.title}</div>
                              <div className="text-green-100 text-sm group-hover:text-white transition-colors duration-300">{achievement.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-base md:text-lg text-gray-700 mt-8 leading-relaxed">
                Students from IIIT Kottayam have consistently excelled in global and national competitions like GSoC and Smart India Hackathon. Notable achievements include GATE AIR 21, DAAD-WISE scholarships, and internships at prestigious institutions like EPFL, Switzerland, and Purdue University, USA, reflecting the high caliber of our students.
              </p>
            </div>
          </section>

          {/* Technical Events and Workshops */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Technical Events & <span className="text-green-600">Workshops</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Advanced Technologies</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    IIIT Kottayam regularly hosts events on AI, ML, blockchain, and cybersecurity through forums like the IEEE Student Branch and ACM Chapter. These provide students with hands-on experience and insights into emerging trends beyond the standard curriculum.
                  </p>

                  {/* Photo/Video Placeholder */}
                  <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto text-green-400 mb-4" /> {/* Lucide Icon */}
                      <p className="text-gray-600 font-medium">Workshop/Event Media Placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">Technical Events and Workshops Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real-World Problem Solving */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Real-World <span className="text-green-600">Problem Solving</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Student Projects</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Students are encouraged to tackle real-world problems through projects, summer internships, and participation in funded research. These opportunities allow them to apply knowledge practically and develop innovative solutions.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    A key initiative includes providing cybersecurity training for Kerala Police officers of Cyberdome, equipping them to combat cybercrime. This not only enhances stakeholder capabilities but also gives students a unique opportunity to contribute to societal safety.
                  </p>

                  {/* Photo/Video Placeholder */}
                  <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto text-green-400 mb-4" /> {/* Lucide Icon */}
                      <p className="text-gray-600 font-medium">Student Projects Media Placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">Real-World Problem Solving Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* International Collaborations */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    International <span className="text-green-600">Collaborations</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Global Exposure</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    IIIT Kottayam collaborates with international universities for global conferences, exchange programs, and joint research. Partnerships include the <span className="font-semibold text-green-700">University of Agder (Norway), TU Munich (Germany), University of North Dakota (USA), University of Glasgow (UK),</span> and many others worldwide, reinforcing our commitment to a global education.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['U. of Agder', 'TU Munich', 'U. North Dakota', 'Offenburg Univ.', 'U. Glasgow', 'U. Klagenfurt', 'Nat. Chung Cheng', 'Many More'].map((univ, i) => (
                      <div key={i} className="bg-white rounded-xl px-4 py-3 text-center border-2 border-green-200 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-pointer">
                        <span className="text-green-800 text-sm font-semibold flex items-center justify-center gap-2">
                          <Globe className="w-4 h-4" /> {univ} {/* Lucide Icon */}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Industry Interface */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Industry <span className="text-green-600">Interface</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Industry-Supported Education</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Strong industry connections bridge the gap between academics and industry requirements. Partnerships with giants like <span className="font-semibold text-green-700">IBM, TCS, Unisys, HP, Palo Alto Networks, Nvidia, and NeST digital</span> provide students with opportunities for internships, industry-relevant projects, and exposure to cutting-edge technologies.
                  </p>

                  {/* Photo/Video Placeholder */}
                  <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Briefcase className="w-16 h-16 mx-auto text-green-400 mb-4" /> {/* Lucide Icon */}
                      <p className="text-gray-600 font-medium">Industry Partnership Media Placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">Industry Interface Visual Content</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Career Development */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Career <span className="text-green-600">Development</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Placement Support</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Our dedicated placement cell provides comprehensive training and support, achieving remarkable success. Strong industry connections with companies like <span className="font-semibold text-green-700">Amazon, IBM, Bosch, Nissan, TCS, Infosys, Nvidia, Goldman Sachs, and ZOHO</span> ensure students gain practical experience.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    Despite a challenging environment, the 2024 batch has achieved an 85% placement rate, with four international placements and numerous foreign internships. <span className="font-bold text-green-700">The highest domestic CTC is 45 LPA, and the highest international CTC is 23 LPA</span>. Efforts continue to achieve 100% placement.
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-6 text-center border-2 border-green-300 shadow-md">
                      <div className="text-4xl font-bold text-green-600 mb-2">45 LPA</div>
                      <div className="text-sm text-gray-600 font-semibold">Highest Domestic CTC</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center border-2 border-green-300 shadow-md">
                      <div className="text-4xl font-bold text-green-600 mb-2">23 LPA</div>
                      <div className="text-sm text-gray-600 font-semibold">Highest International CTC</div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 text-center border-2 border-green-300 shadow-md">
                      <div className="text-4xl font-bold text-green-600 mb-2">85%</div>
                      <div className="text-sm text-gray-600 font-semibold">Placement Rate 2024</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Holistic Development */}
          <section className="mb-24">
            <div className="max-w-7xl mx-auto">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="p-10 md:p-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                    Holistic <span className="text-green-600">Development</span>
                  </h2>
                  <h3 className="text-xl font-semibold text-green-700 mb-4">Extracurricular Activities</h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    The institute promotes a balanced student life with a wide range of extracurricular activities, clubs, and societies. Facilities for yoga, a fully equipped gymnasium, and various sports encourage physical and mental well-being, with students actively winning prizes in inter-IIIT competitions.
                  </p>

                  {/* Photo/Video Placeholder */}
                  <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-dashed border-green-300">
                    <div className="text-center">
                      <Smile className="w-16 h-16 mx-auto text-green-400 mb-4" /> {/* Lucide Icon */}
                      <p className="text-gray-600 font-medium">Sports & Activities Media Placeholder</p>
                      <p className="text-sm text-gray-500 mt-2">Holistic Development Visual Content</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-4 justify-center">
                    {activities.map((activity, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 border-2 border-green-300 text-green-800 rounded-xl text-sm font-semibold hover:bg-green-100 hover:border-green-500 hover:text-green-900 hover:scale-105 transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        {activity.icon}
                        {activity.label}
                      </span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </section>

        </div> {/* End of main content container */}
      </div>
    </>
  );
}
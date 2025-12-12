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
import AnnouncementBanner from "../../components/announcementbanner.jsx";

// =================================================================
//                    HOMEPAGE COMPONENT
// =================================================================

const HomePage = () => {
  const { darkMode } = useTheme();
  const color1 = API.color1; // Primary Accent Color
  const color2 = API.color2; // Secondary Accent Color

  // --- Data Definitions ---
  const newsList = [
    { title: "Admission to Ph.D. Programme - January 2026", date: "2025-10-15", isNew: true, link: "#" },
    { title: "Recruitment of Contract Faculty - CSE dated 17.10.2025", date: "2025-10-17", isNew: true, link: "#" },
    { title: "Result of Mess Manager (On Contract) dated 29.09.2025", date: "2025-09-29", isNew: true, link: "#" },
    { title: "Result of Technician (On Contract) dated 08.09.2025", date: "2025-09-08", isNew: false, link: "#" },
    { title: "Result of Psychologist (On Contract) dated 08.09.2025", date: "2025-09-08", isNew: false, link: "#" }
  ];

  const eventsList = [
    { image: event1, title: "Faculty Development Programme 2024 (CSE)", link: "#" },
    { image: event2, title: "Tech Symposium 2024", link: "#" },
    { image: event3, title: "Research Conference", link: "#" },
    { image: event4, title: "Cultural Fest", link: "#" }
  ];

  const companyList = [
    { logo: aiclogo, name: "Incubation Centre (AIC)", link: "https://icentre.iiitkottayam.ac.in/" },
    { logo: gyanlogo, name: "Gyaan Lab", link: "https://gyaan.iiitkottayam.ac.in/" },
    { logo: i2cslogo, name: "I2CS", link: "https://i2cs.iiitkottayam.ac.in/" },
    { logo: msmelogo, name: "MSME Business Incubation Centre", link: "https://msme.iiitkottayam.ac.in/" },
    { logo: cyberlogo, name: "CyberLabs", link: "https://cyberlabs.iiitkottayam.ac.in/" },
    { logo: dadblogo, name: "DADB", link: "https://dadb.com/in/?lang=en" },
    { logo: factlogo, name: "FACTS-H Lab", link: "https://factsh.iiitkottayam.ac.in/home" }
  ];

  const facultyList = [
    { image: facultyimg1, name: "Dr. Shajulin Benedict", designation: "Associate Professor", department: "CSE", specialization: "Cloud Computing, IoT", link: "#" },
    { image: facultyimg2, name: "Dr. Ebin Deni Raj", designation: "Assistant Professor", department: "CSE", specialization: "Biomedical AI", link: "#" },
    { image: facultyimg3, name: "Dr. Jayakrushna Sahoo", designation: "Assistant Professor", department: "CSE", specialization: "Machine Learning", link: "#" },
    { image: facultyimg4, name: "Dr. Panchami V", designation: "Assistant Professor", department: "Cyber Security", specialization: "Blockchain", link: "#" },
    { image: facultyimg5, name: "Dr. Bala S", designation: "Assistant Professor", department: "ECE", specialization: "VLSI Design", link: "#" },
    { image: facultyimg6, name: "Dr. Victor Paul", designation: "Assistant Professor", department: "CSE", specialization: "Data Analytics", link: "#" },
    { image: facultyimg7, name: "Dr. Bakkyaraj T", designation: "Assistant Professor", department: "Maths", specialization: "Nonlinear Analysis", link: "#" },
    { image: facultyimg8, name: "Prof. Ashok S", designation: "Adjunct Professor", department: "CSE", specialization: "Energy Management", link: "#" }
  ];

  const NIRF_Ranking = [
    { rank: 25, category: "Engineering", change: "up" },
    { rank: 18, category: "Architecture & Planning", change: "up" },
    { rank: 45, category: "Overall", change: "down" },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* CSS for custom animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
      `}</style>

      <AnnouncementBanner />

      {/* ------------------------------------------------------------- */}
      {/* HERO SECTION (UPDATED)                      */}
      {/* ------------------------------------------------------------- */}
      <header className="relative overflow-hidden">
        <HeroSlider events={eventsList} darkMode={darkMode} color1={color1} />
        {/* Yellow strip removed as requested */}
      </header>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT (2/3 & 1/3 GRID)                   */}
      {/* ------------------------------------------------------------- */}
      <main className="mx-auto py-8 px-6 max-w-full">
        <div className="grid lg:grid-cols-3 gap-3">
          
          {/* LEFT: Main Content Sections (spans 2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            
            {/* NIRF Ranking Snapshot */}
            <section>
              <h3 className="text-base md:text-lg font-bold mb-2 px-1" style={{ color: color1 }}>NIRF Rankings (2025)</h3>
              <div className={`grid grid-cols-3 gap-3 p-4 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {NIRF_Ranking.map((item, idx) => (
                  <div key={idx} className="text-center p-3 border-r last:border-r-0" style={{ borderColor: darkMode ? '#374151' : '#E5E7EB' }}>
                    <div className="text-2xl md:text-3xl font-extrabold" style={{ color: color1 }}>#{item.rank}</div>
                    <p className="text-xs mt-1 text-gray-500">{item.category}</p>
                    <span className={`text-xs mt-1 inline-block ${item.change === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      ({item.change === 'up' ? '▲' : '▼'})
                    </span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Vision & Mission */}
            <section>
              <h3 className="text-base md:text-lg font-bold mb-2 px-1" style={{ color: color1 }}>Our Core Values</h3>
              <div className={`grid md:grid-cols-2 shadow-xl overflow-hidden rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`p-4 border-r-2 md:border-r-0 lg:border-r-2 border-b-2 lg:border-b-0`} style={{ borderColor: color1 + '30' }}>
                  <h4 className="text-lg md:text-xl font-bold mb-2"> Vision</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed mb-3 text-xs md:text-sm`}>
                    "Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.
                  </p>
                  <a href="#" className="text-xs font-semibold" style={{ color: color1 }}>Read Strategic Plan →</a>
                </div>

                <div className="p-4">
                  <h4 className="text-lg md:text-xl font-bold mb-2"> Mission</h4>
                  <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1.5 text-xs md:text-sm`}>
                    <li>Produce competent and ethical graduates.</li>
                    <li>Solve local & global problems through technology.</li>
                    <li>Promote significance of ethics and integrity.</li>
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Innovative Initiatives */}
            <section>
              <h3 className="text-base md:text-lg font-bold mb-2 px-1" style={{ color: color1 }}>Incubation & Research Hubs</h3>
              <div className={`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-3 p-4 rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}> 
                {companyList.map((c, idx) => (
                  <a 
                    key={idx} 
                    href={c.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`p-3 rounded-lg flex flex-col items-center gap-2 text-center transition-transform hover:scale-105 hover:shadow-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`} 
                    style={{ border: `1px solid ${darkMode ? '#374151' : `${color1}22`}` }}
                  >
                    <div className="h-14 w-14 flex items-center justify-center p-2 rounded-lg border" style={{ borderColor: color1 + '80' }}>
                      <img src={c.logo} alt={c.name} className="max-h-12 object-contain" />
                    </div>
                    <div className="text-xs font-semibold leading-tight" style={{ color: darkMode ? '#E5E7EB' : '#111827' }}>{c.name}</div>
                  </a>
                ))}
              </div>
            </section>
            
            {/* Faculty Carousel */}
            <section>
              <div className="flex items-center justify-between mb-2 px-1">
                <h3 className="text-base md:text-lg font-bold" style={{ color: color1 }}>Distinguished Faculty</h3>
                <a href="#" style={{ color: color1 }} className="text-xs font-semibold">View all faculty →</a>
              </div>

              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg border`} style={{ borderColor: color1 + '30' }}>
                <FacultyCarousel faculty={facultyList} darkMode={darkMode} color1={color1} color2={color2} />
              </div>
            </section>

            {/* Placement */}
            <section className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 grid md:grid-cols-5 gap-4 items-center">
                <div className="md:col-span-3">
                  <h4 className="text-lg md:text-xl font-bold mb-3" style={{ color: color1 }}>Placement Highlights</h4>
                  <img src={placementdetailimg} alt="Placements" className="rounded-lg shadow-md w-full max-h-48 object-contain" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-3 items-start">
                  <div className="text-sm font-bold">Highest Package</div>
                  <div className="text-2xl md:text-3xl font-extrabold" style={{ color: color1 }}>45 LPA</div>
                  
                  <div className="text-sm font-bold">Avg. Package</div>
                  <div className="text-xl md:text-2xl font-extrabold" style={{ color: color1 }}>14 LPA</div>

                  <a href="#" className="mt-2 px-4 py-2 text-sm rounded-full font-semibold shadow-md transition-all hover:scale-105" style={{ backgroundColor: color1, color: 'white' }}>
                    View Full Report →
                  </a>
                </div>
              </div>
            </section>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* RIGHT: Sticky Sidebar (1/3 COL)                 */}
          {/* ------------------------------------------------------------- */}
          <aside className="lg:sticky lg:top-3 h-fit space-y-3">
            {/* Latest News Card */}
            <div className={`rounded-lg p-4 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ border: `1px solid ${color1}50` }}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-sm md:text-base" style={{ color: color1 }}>Latest News</h4>
                <a href="#" style={{ color: color1 }} className="text-xs font-semibold hover:underline">View All</a>
              </div>
              
              <div className="p-4 space-y-3 h-[500px] overflow-y-auto">
                {newsList.slice(0, 10).map((n, i) => (
                  <a 
                    key={i} 
                    href={n.link} 
                    className="block p-3 bg-white/10 hover:bg-white/20 rounded-md transition-all border-l-3" 
                    style={{ borderLeftColor: n.isNew ? '#fbbf24' : 'transparent', borderLeftWidth: '3px' }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h5 className={`text-xs md:text-sm font-medium leading-snug mb-1.5 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                        <p className={`text-[10px] md:text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                      </div>
                      {n.isNew && (
                        <div className="text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap animate-pulse" style={{ backgroundColor: '#fbbf24', color: '#1e3a5f' }}>
                          NEW
                        </div>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Upcoming Events Slider (Small) */}
            <div className={`rounded-lg overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <EventSlider events={eventsList} darkMode={darkMode} color1={color1} />
            </div>

            {/* Quick Links */}
            <div className={`rounded-lg p-4 shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h5 className="font-bold text-sm md:text-base mb-3" style={{ color: color1 }}>Quick Links</h5>
              <div className="grid grid-cols-2 gap-2">
                {['Admissions', 'Academics', 'Departments', 'Research', 'Placements', 'Alumni'].map((link, idx) => (
                  <a 
                    key={idx} 
                    href="#" 
                    className={`text-xs font-medium p-2.5 rounded-md transition hover:scale-[1.05] text-center`} 
                    style={{ backgroundColor: color2 + '30', color: color1 }}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* FOOTER CTA                              */}
      {/* ------------------------------------------------------------- */}
      <footer className={`mt-3 py-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t`} style={{ borderTopColor: color1 }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-base md:text-lg font-bold" style={{ color: color1 }}>Stay Connected</div>
            <div className="text-xs text-gray-400">Subscribe for the latest news and updates from IIIT Kottayam.</div>
          </div>
          <div className="flex gap-0 w-full md:w-auto md:min-w-[350px]">
            <input 
              type="email" 
              placeholder="Enter email address" 
              className="px-3 py-2 text-xs rounded-l-md flex-1 border focus:ring-2" 
              style={{ 
                borderColor: darkMode ? '#374151' : '#E5E7EB', 
                backgroundColor: darkMode ? '#111827' : '#fff', 
                color: darkMode ? '#fff' : '#000', 
                outlineColor: color1 
              }} 
            />
            <button 
              className="px-4 py-2 text-xs rounded-r-md font-semibold transition-transform hover:scale-[1.02] hover:opacity-90" 
              style={{ backgroundColor: color1, color: '#fff' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

// =================================================================
//                    HELPER COMPONENTS
// =================================================================

const HeroSlider = ({ events, color1 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  // Auto-slide logic
  React.useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((p) => (p + 1) % events.length), 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const goToSlide = (i) => setCurrentIndex(i);
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % events.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + events.length) % events.length);

  return (
    // 1. TALLER HEIGHT: h-[600px] on mobile, h-[80vh] on desktop (approx 80% of screen height)
    <div className="relative w-full h-[600px] lg:h-[80vh] overflow-hidden group">
      
      {events.map((event, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          
          {/* 2. FULL HEIGHT OVERLAY: 
              Gradient covers entire height from Left (Black) to Right (Transparent). 
              This creates the "Full Height Notification Bar" effect. 
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        </div>
      ))}

      {/* Content Container - Centered Vertically, Aligned Left */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-3xl space-y-4">
            
            {/* Title with Animation */}
            <h2 
              key={currentIndex} 
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg animate-fade-in-up"
            >
              {events[currentIndex].title}
            </h2>

            {/* Subtitle / Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light">
              Generating knowledge for the future through research and innovation.
            </p>

            {/* Read More Button */}
            <div className="pt-4">
              <a
                href={events[currentIndex].link}
                className="inline-block px-8 py-3 text-sm md:text-base font-bold text-white uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
                style={{ borderColor: color1 }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = color1; e.currentTarget.style.borderColor = color1; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'white'; }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-0 bottom-0 w-20 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/10 transition-all z-30"
      >
        <span className="text-4xl">‹</span>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-0 bottom-0 w-20 flex items-center justify-center text-white/50 hover:text-white hover:bg-black/10 transition-all z-30"
      >
        <span className="text-4xl">›</span>
      </button>

      {/* Indicators (Dots) */}
      <div className="absolute bottom-10 left-12 flex gap-3 z-30">
        {events.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            className={`h-1 transition-all duration-300 ${
              idx === currentIndex ? 'w-12 bg-white' : 'w-6 bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
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

  const duplicatedFaculty = [...faculty, ...faculty];

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="relative">
      <div ref={scrollRef} className="flex gap-3 p-4 overflow-x-hidden" style={{ scrollBehavior: 'auto' }}>
        {duplicatedFaculty.map((member, index) => (
          <div key={index} className={`flex-shrink-0 w-52 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="relative h-60 overflow-hidden">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-sm font-bold mb-1 leading-tight">{member.name}</h3>
                <p className="text-gray-200 text-xs mb-1">{member.designation}</p>
                <span className="text-[10px] px-2 py-1 rounded-md inline-block" style={{ backgroundColor: color1, color: '#fff' }}>{member.department}</span>
                <p className="text-gray-300 text-xs italic mt-1.5">{member.specialization}</p>
              </div>
            </div>
            <div className={`p-2.5 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <a href={member.link} className="w-full block text-center text-xs font-semibold rounded-md py-1.5" style={{ backgroundColor: darkMode ? color1 : color2, color: darkMode ? '#fff' : color1, border: `2px solid ${color1}` }}>
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const EventSlider = ({ events, darkMode, color1 }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentIndex((p) => (p + 1) % events.length), 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const goToSlide = (i) => setCurrentIndex(i);
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % events.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + events.length) % events.length);

  return (
    <div className="relative group">
      <div className="relative overflow-hidden" style={{ height: 160 }}> 
        {events.map((ev, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 text-xs">
              <a href={ev.link} className="text-white font-semibold block">{ev.title}</a>
            </div>
          </div>
        ))}

        <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 text-white text-lg" style={{ backgroundColor: `${color1}E6` }}>
          ‹
        </button>
        <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full opacity-0 group-hover:opacity-100 text-white text-lg" style={{ backgroundColor: `${color1}E6` }}>
          ›
        </button>
      </div>

      <div className={`p-3 flex items-center justify-between ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="flex gap-1.5">
          {events.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => goToSlide(idx)} 
              aria-label={`go-to-${idx}`} 
              className={`h-1.5 transition-all duration-200 rounded ${idx === currentIndex ? 'w-6' : 'w-1.5'}`} 
              style={{ backgroundColor: idx === currentIndex ? color1 : (darkMode ? '#374151' : '#E5E7EB') }} 
            />
          ))}
        </div>
        <a href="#" className="text-xs font-semibold" style={{ color: color1 }}>Gallery</a>
      </div>
    </div>
  );
};

export default HomePage;
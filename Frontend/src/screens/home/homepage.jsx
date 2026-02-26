import React, { useState, useEffect } from "react";
import API from "../../api/api.jsx";
import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';

import { useTheme } from "../../context/createContext.jsx";
import AnnouncementBanner from "../../components/announcementbanner.jsx";

// Translation helper - fetches translations from backend
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    // Fetch translations for static text
    const fetchTranslations = async () => {
      if (language === 'en') {
        // No translation needed for English
        setTranslations({});
        return;
      }

      try {
        console.log('Fetching translations for language:', language);
        const response = await API.post('/api/translate-bulk', {
          texts: [
            'Latest News & Updates',
            'Announcements',
            'Campus Updates',
            'Quick Updates',
            'Our Core Values',
            'Vision',
            'Mission',
            'Placement Highlights',
            'Upcoming Events',
            'Recruitment Partners',
            'Distinguished Faculty',
            'View all faculty →',
            'NIRF Rankings (2025)',
            'All Rankings',
            'Loading...',
            'items',
            'Highest Package',
            'Avg. Package',
            'Companies Visited'
          ],
          targetLang: language
        });

        console.log('Translation API Response:', response);

        if (response.success && response.data?.data?.translations) {
          const translationMap = {};
          response.data.data.translations.forEach((item) => {
            translationMap[item.originalText] = item.translatedText;
          });
          console.log('Translation Map:', translationMap);
          setTranslations(translationMap);
        }
      } catch (error) {
        console.error('Translation fetch error:', error);
        setTranslations({});
      }
    };

    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  
  return { t, language };
};

// =================================================================
//                    HOMEPAGE COMPONENT
// =================================================================

const HomePage = () => {
  const { darkMode } = useTheme();
  const color1 = API.color1; // Primary Accent Color
  const color2 = API.color2; // Secondary Accent Color
  const { t } = useTranslation(); // Translation function

  // --- State for Dynamic Data ---
  const [newsList, setNewsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [NIRF_Ranking, setNIRF_Ranking] = useState([]);
  const [heroSliders, setHeroSliders] = useState([])
  const [pageContent, setPageContent] = useState(null);
  const [contentBlocks, setContentBlocks] = useState([]);


  // --- Fetch Data from API ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch News
        const newsRes = await API.get('/api/news');
        const newsData = newsRes;
        if (newsData.success) {
          console.log('Fetched News:', newsData.data);
          // Handle both nested data.data and direct data arrays
          const newsArray = Array.isArray(newsData.data?.data) ? newsData.data.data : 
                           Array.isArray(newsData.data) ? newsData.data : [];
          const formattedNews = newsArray
            .slice(0, 5)
            .map(item => ({
              title: item.title,
              date: item.publishedDate || item.createdAt,
              isNew: new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
              link: `/news/${item.id}`
            }));
            console.log('Fetched News:', formattedNews);
          setNewsList(formattedNews);
        }

        // Fetch Events
        const eventsRes = await API.get('/api/events');
        const eventsData = eventsRes;
        console.log('Events Raw Response:', eventsData);
        if (eventsData.success) {
          const eventsArray = eventsData.data.data || eventsData.data || [];
          console.log('Events Array:', eventsArray);
          const formattedEvents = eventsArray
            .filter(item => {
              console.log(`Event "${item.title}" - Published: ${item.isPublished}`);
              return item.isPublished;
            })
            .slice(0, 4)
            .map(item => ({
              image: API.getImageUrl(item.image) || img1,
              title: item.title,
              link: `/events/${item.id}`
            }));
          console.log('Formatted Events:', formattedEvents);
          setEventsList(formattedEvents);
        }

        // Fetch Company Logos
        const companiesRes = await API.get('/api/company-logos');
        const companiesData = companiesRes;
        if (companiesData.success) {
          setCompanyList(companiesData.data.data.filter(item => item.isActive));
        }

        // Fetch Faculty
        const facultyRes = await API.get('/api/faculty');
        const facultyData = facultyRes;
        if (facultyData.success) {
          const formattedFaculty = facultyData.data.data
            .filter(item => item.isActive)
            .slice(0, 8)
            .map(item => ({
              image: API.getImageUrl(item.photo) || `https://placehold.co/200x200/e8f5f0/239244?text=${item.name.charAt(0)}`,
              name: item.name,
              designation: item.designation,
              department: item.department,
              specialization: item.specialization || '',
              link: `/people/faculty/${item.id}`
            }));
          setFacultyList(formattedFaculty);
        }

        // Fetch NIRF Rankings
        const nirfRes = await API.get('/api/nirf?year=2025');
        const nirfData = nirfRes;
        if (nirfData.success) {
          setNIRF_Ranking(nirfData.data.data.filter(item => item.isPublished));
        }

        // Fetch Hero Sliders
        const slidersRes = await API.get('/api/hero-sliders');
        const slidersData = slidersRes;
        console.log('Hero Sliders Raw Response:', slidersData);
        if (slidersData.success) {
          const slidersArray = slidersData.data.data || slidersData.data || [];
          console.log('Hero Sliders Array:', slidersArray);
          const formattedSliders = slidersArray
            .filter(item => item.isActive)
            .map(item => {
              const imageUrl = API.getImageUrl(item.image);
              console.log(`Slider "${item.title}" - Original: ${item.image}, Formatted: ${imageUrl}`);
              return {
                image: imageUrl || img1,
                title: item.title,
                link: item.buttonLink || '#'
              };
            });
          console.log('Formatted Hero Sliders:', formattedSliders);
          setHeroSliders(formattedSliders.length > 0 ? formattedSliders : [
            { image: img1, title: "Default Slider 1", link: "#" },
            { image: img2, title: "Default Slider 2", link: "#" },
            { image: img3, title: "Default Slider 3", link: "#" }
          ]);
        }

        // Fetch Page Content (optional - just for metadata)
        try {
          const pageRes = await API.get('/api/pages/homepage');
          if (pageRes?.success && pageRes?.data) {
            setPageContent(pageRes.data);
          }
        } catch { /* page metadata not found, using defaults */
        }

        // Fetch Content Blocks (MAIN CONTENT SOURCE)
        const blocksRes = await API.get('/api/content-blocks/page/homepage');
        console.log('Content Blocks Response:', blocksRes);
        if (blocksRes?.success && blocksRes?.data) {
          const blocks = blocksRes.data.data || blocksRes.data || [];
          console.log('Content Blocks Loaded:', blocks);
          console.log('Vision Block:', blocks.find(b => b.blockId === 'homepage-vision'));
          console.log('Mission Block:', blocks.find(b => b.blockId === 'homepage-mission'));
          setContentBlocks(blocks);
        }


      } catch (error) {
        // Fallback to default data if API fails
        // setNewsList([
        //   { title: 'IIIT Kottayam achieves 95% placements!', date: '2025-06-01', isNew: true, link: '#' },
        //   { title: 'Admissions Open for 2025 Batch', date: '2025-05-15', isNew: false, link: '#' },
        //   { title: 'New Research Center Inaugurated', date: '2025-04-20', isNew: false, link: '#' },
        //   { title: 'IIITK signs MoU with Tech Giant', date: '2025-03-10', isNew: false, link: '#' },
        //   { title: 'Convocation 2025 Announced', date: '2025-02-28', isNew: false, link: '#' }
        // ]);
        // setEventsList([
        //   { image: img1, title: 'Tech Fest 2025', link: '#' },
        //   { image: img2, title: 'Alumni Meet', link: '#' },
        //   { image: img3, title: 'Research Symposium', link: '#' },
        //   { image: img1, title: 'Sports Day', link: '#' }
        // ]);
        // setCompanyList([
        //   { name: 'Google', logo: img1 },
        //   { name: 'Microsoft', logo: img2 },
        //   { name: 'Amazon', logo: img3 }
        // ]);
        // setFacultyList([
        //   { name: 'Dr. A. Kumar', designation: 'Professor', department: 'CSE', specialization: 'AI', image: img1, link: '#' },
        //   { name: 'Dr. B. Singh', designation: 'Associate Prof.', department: 'ECE', specialization: 'VLSI', image: img2, link: '#' },
        //   { name: 'Dr. C. Rao', designation: 'Assistant Prof.', department: 'Maths', specialization: 'Statistics', image: img3, link: '#' }
        // ]);
        // setHeroSliders([
        //   { image: img1, title: 'Default Slider 1', link: '#' },
        //   { image: img2, title: 'Default Slider 2', link: '#' },
        //   { image: img3, title: 'Default Slider 3', link: '#' }
        // ]);
        // setPageContent(null);
        // setContentBlocks([]);
        console.error('Error fetching data:', error);
      } finally { /* cleanup */ }
    };

    fetchData();
  }, []);

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
        <HeroSlider events={heroSliders} darkMode={darkMode} color1={color1} />
        {/* Yellow strip removed as requested */}
      </header>

      {/* ------------------------------------------------------------- */}
      {/* LATEST NEWS SECTION - FULL WIDTH WITH 3 DIFFERENT DESIGNS     */}
      {/* ------------------------------------------------------------- */}
      <section className="mx-auto py-4 px-4 sm:px-6 md:px-8 max-w-screen-2xl">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 px-1" style={{ color: color1 }}>{t('Latest News & Updates')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* News Box 1 - Left Accent Bar Design */}
          <div className={`rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: color1 }}>
                  <span className="text-xl">📢</span>
                </div>
                <h4 className="font-bold text-lg" style={{ color: color1 }}>{t('Announcements')}</h4>
              </div>
              <div className="space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {newsList.slice(0, 5).map((n, i) => (
                  <a 
                    key={i} 
                    href="/" 
                    className={`block p-4 rounded-lg transition-all hover:shadow-lg relative border-l-4 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                    style={{ borderLeftColor: n.isNew ? '#fbbf24' : color1 }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h5 className={`text-sm font-semibold leading-tight flex-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                      {n.isNew && (
                        <span className="inline-block text-[9px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#fbbf24', color: '#1e3a5f' }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <div className={`text-xs flex items-center gap-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span>📅</span>
                      <span>{new Date(n.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* News Box 2 - Glass Morphism Design */}
          <div className={`rounded-xl p-5 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 relative overflow-hidden ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'}`} style={{ backdropFilter: 'blur(10px)', border: `1px solid ${color1}30` }}>
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-30" style={{ backgroundColor: color1 }}></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-20" style={{ backgroundColor: color2 }}></div>
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border-2" style={{ borderColor: color1, backgroundColor: `${color1}20` }}>
                  <span className="text-xl">📰</span>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-lg" style={{ color: color1 }}>{t('Campus Updates')}</h4>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                </div>
              </div>
              <div className="space-y-3 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {newsList.slice(0, 5).map((n, i) => (
                  <a 
                    key={i} 
                    href="/" 
                    className={`block p-4 rounded-xl transition-all hover:shadow-xl group ${darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-white/50 hover:bg-white'}`}
                    style={{ border: `1px solid ${darkMode ? '#374151' : '#E5E7EB'}` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
                          {new Date(n.date).getDate()}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className={`text-sm font-semibold leading-tight mb-2 group-hover:translate-x-1 transition-transform ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                        <div className="flex items-center justify-between">
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            {new Date(n.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </p>
                          {n.isNew && (
                            <span className="text-[9px] font-bold px-2 py-1 rounded-full" style={{ backgroundColor: '#8b5cf6', color: '#fff' }}>
                               LATEST
                            </span>
                            
                          )}
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* News Box 3 - Compact List with Numbered Cards */}
          <div className={`rounded-xl p-5 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'}`} style={{ border: `2px solid ${color1}20` }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}>
                  <span className="text-xl">⚡</span>
                </div>
                <h4 className="font-bold text-lg" style={{ color: color1 }}>{t('Quick Updates')}</h4>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} style={{ color: color1 }}>
                {newsList.length} {t('items')}
              </span>
            </div>
            <div className="space-y-2 h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {newsList.slice(0, 5).map((n, i) => (
                <a 
                  key={i} 
                  href="/" 
                  className={`block rounded-lg transition-all hover:shadow-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-white'}`}
                >
                  <div className="flex gap-3 p-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: color1 }}>
                        {i + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className={`text-sm font-semibold leading-tight mb-1.5 line-clamp-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>{n.title}</h5>
                      <div className="flex items-center gap-3">
                        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {new Date(n.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </p>
                        {n.isNew && (
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: color1, color: '#fff' }}>
                            NEW
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${color1}40;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${color1};
        }
      `}</style>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTENT - FULL WIDTH SECTIONS                          */}
      {/* ------------------------------------------------------------- */}
      <main className="mx-auto py-4 px-4 sm:px-6 md:px-8 max-w-screen-2xl space-y-4">
          
            {/* NIRF Ranking Snapshot - FULL WIDTH */}
            {/* <section>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 px-1" style={{ color: color1 }}>NIRF Rankings (2025)</h3>
              <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 rounded-lg shadow-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {NIRF_Ranking.map((item, idx) => (
                  <div key={idx} className="text-center p-2 sm:p-3 md:p-4 border-r last:border-r-0" style={{ borderColor: darkMode ? '#374151' : '#E5E7EB' }}>
                    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold" style={{ color: color1 }}>#{item.rank}</div>
                    <p className="text-xs sm:text-sm md:text-base lg:text-lg mt-1 text-gray-500">{item.category}</p>
                    <span className={`text-xs mt-1 inline-block ${item.change === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      ({item.change === 'up' ? '▲' : '▼'})
                    </span>
                  </div>
                ))}
              </div>
            </section> */}
            
            {/* Vision & Mission - FULL WIDTH */}
            <section>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 px-1" style={{ color: color1 }}>{t('Our Core Values')}</h3>
              <div className={`grid grid-cols-1 md:grid-cols-2 shadow-xl overflow-hidden rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className={`p-6 md:p-8 border-r-0 md:border-r-2`} style={{ borderColor: color1 + '30' }}>
                  <h4 className="text-2xl font-bold mb-3">🎯 {t('Vision')}</h4>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed text-base`}>
                    {contentBlocks.find(b => b.blockId === 'homepage-vision')?.content?.description || 
                     contentBlocks.find(b => b.blockId === 'homepage-vision')?.content?.text || 
                     '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.'}
                  </p>
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="text-2xl font-bold mb-3">🎯 {t('Mission')}</h4>
                  <ul className={`list-disc pl-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2 text-base`}>
                    {(contentBlocks.find(b => b.blockId === 'homepage-mission')?.content?.items || 
                      pageContent?.sections?.find(s => s.id === 'mission')?.items || [
                        'Produce competent and ethical graduates.',
                        'Solve local & global problems through technology.',
                        'Promote significance of ethics and integrity.'
                      ]).map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            
            {/* Placement Highlights & Upcoming Events - 2 COLUMN GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Placement Highlights - LEFT 50% */}
              <div className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-3 border-b" style={{ borderColor: `${color1}30` }}>
                  <h3 className="text-lg font-bold" style={{ color: color1 }}>{t('Placement Highlights')}</h3>
                </div>
                <div className="p-4">
                  {/* Vertical Bar Chart Styled Like the Provided Image */}
                  {/* Vertical Bar Chart - Full Height */}
                  {/* Vertical Bar Chart - Full Height */}
                  <div className="h-56 flex flex-col justify-end">
                    {(() => {
                      let stats = [];
                      try {
                        const statsBlock = contentBlocks.find(b => b.blockId === 'homepage-placement-stats');
                        // Use stats array from content (correct field name)
                        stats = statsBlock?.content?.stats || statsBlock?.content?.statistics || [];
                      } catch { stats = []; }
                      if (!stats || stats.length === 0) {
                        stats = [
                          { label: 'Highest Package', value: '45 LPA' },
                          { label: 'Avg. Package', value: '14 LPA' },
                          { label: 'Companies Visited', value: '100+' },
                          { label: 'Placement Rate', value: '95%' }
                        ];
                      }
                      const getBarValue = (val) => {
                        if (typeof val === 'string') {
                          const num = parseFloat(val.replace(/[^\d.]/g, ''));
                          return isNaN(num) ? 0 : num;
                        }
                        return typeof val === 'number' ? val : 0;
                      };
                      const max = Math.max(...stats.map(s => getBarValue(s.value)));
                      const barColors = [
                        '#1e88e5', // blue
                        '#fbc02d', // yellow (highlight)
                        '#1e88e5', // blue
                        '#1e88e5'  // blue
                      ];
                      const yTicks = [];
                      const yMax = Math.max(100, Math.ceil(max / 10) * 10);
                      for (let i = 0; i <= yMax; i += 10) yTicks.push(i);
                      return (
                        <div className="flex w-full items-end h-full relative">
                          {/* Y-axis ticks */}
                          <div className="flex flex-col justify-between h-full mr-2 text-xs text-gray-400 absolute left-0 top-0 z-10" style={{height:'100%',width:'2.5rem'}}>
                            {yTicks.slice().reverse().map((tick, i) => (
                              <div key={i} style={{height:`calc(100%/${yTicks.length})`}} className="flex items-center justify-end pr-1" >{tick}%</div>
                            ))}
                          </div>
                          {/* Bars */}
                          <div className="flex-1 flex justify-around items-end w-full ml-10 h-full">
                            {stats.map((stat, i) => {
                              const val = getBarValue(stat.value);
                              const percent = stat.label.toLowerCase().includes('rate')
                                ? parseFloat(val) || 0
                                : yMax > 0 ? (val / yMax) * 100 : 0;
                              return (
                                <div key={i} className="flex flex-col items-center w-20 h-full justify-end">
                                  {/* Value on top */}
                                  <span className="mb-1 text-sm font-bold" style={{ color: barColors[i] }}>{stat.value}</span>
                                  {/* Bar */}
                                  <div className="w-10 rounded-t-md rounded-b-sm flex items-end justify-center transition-all duration-700" style={{ height: `calc(${percent}% - 2rem)`, background: barColors[i], minHeight: '10px', maxHeight: '100%' }}></div>
                                  {/* Label below */}
                                  <span className="mt-2 text-xs text-center font-medium" style={{ color: darkMode ? '#E5E7EB' : '#222' }}>{stat.label}</span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>

              {/* Upcoming Events - RIGHT 50% */}
              <div className={`rounded-xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b" style={{ borderColor: `${color1}30` }}>
                  <h3 className="text-xl font-bold" style={{ color: color1 }}>{t('Upcoming Events')}</h3>
                </div>
                <EventSlider events={eventsList} darkMode={darkMode} color1={color1} />
              </div>
            </div>

            {/* Recruitment Partners - FULL WIDTH */}
            <section>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 px-1" style={{ color: color1 }}>{t('Recruitment Partners')}</h3>
              <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 p-8 rounded-xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}> 
                {companyList
                  .filter(c => {
                    const featuredCompanies = ['samsung', 'google', 'tcs', 'cognizant', 'amazon', 'lg', 'oracle', 'accenture', 'flipkart', 'uber', 'ibm', 'nvidia'];
                    return c.category === 'recruitment' && featuredCompanies.includes(c.name.toLowerCase());
                  })
                  .map((c, idx) => (
                  <a 
                    key={idx} 
                    href={c.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={`p-5 rounded-lg flex flex-col items-center gap-3 text-center transition-all hover:scale-110 hover:shadow-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`} 
                    style={{ border: `1px solid ${darkMode ? '#374151' : `${color1}22`}` }}
                  >
                    <div className="h-28 w-28 flex items-center justify-center p-3 rounded-lg" style={{ backgroundColor: `${color1}10` }}>
                      <img 
                        src={API.getImageUrl(c.logo)} 
                        alt={c.name} 
                        className="max-h-24 max-w-24 object-contain"
                      />
                    </div>
                    <div className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: darkMode ? '#E5E7EB' : '#111827' }}>{c.name}</div>
                  </a>
                ))}
              </div>
            </section>

            {/* Distinguished Faculty - FULL WIDTH */}
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold" style={{ color: color1 }}>{t('Distinguished Faculty')}</h3>
                <a href="/people/faculty" style={{ color: color1 }} className="text-sm font-semibold hover:underline">{t('View all faculty →')}</a>
              </div>
              <div className={`rounded-xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl border`} style={{ borderColor: color1 + '30' }}>
                <FacultyCarousel faculty={facultyList} darkMode={darkMode} color1={color1} color2={color2} />
              </div>
            </section>
      </main>
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
    if (events.length === 0) return;
    const timer = setInterval(() => setCurrentIndex((p) => (p + 1) % events.length), 5000);
    return () => clearInterval(timer);
  }, [events.length]);

  const goToSlide = (i) => setCurrentIndex(i);
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % events.length);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + events.length) % events.length);

  // Return loading state if no events
  if (!events || events.length === 0) {
    return (
      <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[70vh] xl:h-[80vh] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300" style={{ borderTopColor: color1 }}></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    // 1. TALLER HEIGHT: h-[600px] on mobile, h-[80vh] on desktop (approx 80% of screen height)
    <div className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[70vh] xl:h-[80vh] overflow-hidden group">
      
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
              {events[currentIndex]?.title || 'Welcome to IIIT Kottayam'}
            </h2>

            {/* Subtitle / Description */}
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl font-light">
              Generating knowledge for the future through research and innovation.
            </p>
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

const FacultyCarousel = ({ faculty, darkMode, color1 }) => {
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

  const duplicatedFaculty = (faculty && faculty.length > 0 ? [...faculty, ...faculty] : [
    { name: 'Dr. A. Kumar', designation: 'Professor', department: 'CSE', specialization: 'AI', image: img1, link: '#' },
    { name: 'Dr. B. Singh', designation: 'Associate Prof.', department: 'ECE', specialization: 'VLSI', image: img2, link: '#' },
    { name: 'Dr. C. Rao', designation: 'Assistant Prof.', department: 'Maths', specialization: 'Statistics', image: img3, link: '#' }
  ]);

  return (
    <div onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} className="relative">
      <div ref={scrollRef} className="flex gap-3 p-4 overflow-x-hidden" style={{ scrollBehavior: 'auto' }}>
        {duplicatedFaculty.map((member, index) => (
          <div key={index} className={`flex-shrink-0 w-52 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 shadow-md ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <div className="relative flex flex-col items-center justify-center p-3 py-4">
              <img src={member.image} alt={member.name} className="w-36 h-36 object-cover rounded-md border-2 mb-1" style={{ borderColor: color1 }} />
              <h3 className="text-base font-bold mb-0 leading-tight text-center" style={{ color: color1 }}>{member.name}</h3>
              <p className="text-xs mb-0" style={{ color: darkMode ? '#E5E7EB' : '#111827' }}>{member.designation}</p>
              <span className="text-[10px] px-2 py-0.5 rounded-md inline-block mb-0" style={{ backgroundColor: color1, color: '#fff' }}>{member.department}</span>
              <p className="text-[10px] italic" style={{ color: darkMode ? '#A0AEC0' : '#4B5563' }}>{member.specialization}</p>
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
      <div className="relative overflow-hidden" style={{ height: 280 }}>
        {events.map((ev, i) => (
          <div key={i} className={`absolute inset-0 transition-all duration-700 ease-in-out ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}>
            <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" style={{height: '100%', maxHeight: 280}} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-sm">
              <a href="/" className="text-white font-semibold block">{ev.title}</a>
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
        <a href="/" className="text-xs font-semibold" style={{ color: color1 }}>Gallery</a>
      </div>
    </div>
  );
};

export default HomePage;
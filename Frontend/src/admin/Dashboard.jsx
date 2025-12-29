import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Users, 
  Calendar, 
  TrendingUp,
  GraduationCap,
  Briefcase,
  Eye,
  Plus,
  ChevronRight,
  Megaphone,
  ImageIcon,
  Monitor,
  BookOpen,
  FileText,
  LayoutGrid,
  Award,
  Building2,
  Presentation
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalFaculty: 0,
    totalStudents: 0,
    totalPlacements: 0,
    totalAnnouncements: 0,
    totalGallery: 0,
    totalMedia: 0,
    totalCourses: 0,
    totalResearch: 0,
    totalFooter: 0,
    totalNIRF: 0,
    totalCompanyLogos: 0,
    totalHeroSliders: 0,
    recentNews: [],
    recentEvents: [],
    recentAnnouncements: [],
    recentPlacements: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel using the improved API utility
      const [
        newsRes, 
        eventsRes, 
        facultyRes, 
        studentsRes, 
        placementsRes,
        announcementsRes,
        galleryRes,
        mediaRes,
        coursesRes,
        researchRes,
        footerRes,
        nirfRes,
        companyLogosRes,
        heroSlidersRes
      ] = await Promise.all([
        API.get('/api/news'),
        API.get('/api/events'),
        API.get('/api/faculty'),
        API.get('/api/students'),
        API.get('/api/placements'),
        API.get('/api/announcements'),
        API.get('/api/gallery'),
        API.get('/api/media'),
        API.get('/api/courses'),
        API.get('/api/research-publications'),
        API.get('/api/footer'),
        API.get('/api/nirf'),
        API.get('/api/company-logos'),
        API.get('/api/hero-sliders')
      ]);

      // Extract data from responses
      const newsData = newsRes.success ? newsRes.data : { count: 0, data: [] };
      const eventsData = eventsRes.success ? eventsRes.data : { count: 0, data: [] };
      const facultyData = facultyRes.success ? facultyRes.data : { count: 0, data: [] };
      const studentsData = studentsRes.success ? studentsRes.data : { count: 0, data: [] };
      const placementsData = placementsRes.success ? placementsRes.data : { count: 0, data: [] };
      const announcementsData = announcementsRes.success ? announcementsRes.data : { count: 0, data: [] };
      const galleryData = galleryRes.success ? galleryRes.data : { count: 0, data: [] };
      const mediaData = mediaRes.success ? mediaRes.data : { count: 0, data: [] };
      const coursesData = coursesRes.success ? coursesRes.data : { count: 0, data: [] };
      const researchData = researchRes.success ? researchRes.data : { count: 0, data: [] };
      const footerData = footerRes.success ? footerRes.data : { count: 0, data: [] };
      const nirfData = nirfRes.success ? nirfRes.data : { count: 0, data: [] };
      const companyLogosData = companyLogosRes.success ? companyLogosRes.data : { count: 0, data: [] };
      const heroSlidersData = heroSlidersRes.success ? heroSlidersRes.data : { count: 0, data: [] };

      console.log('Dashboard Data:', {
        news: newsData,
        events: eventsData,
        faculty: facultyData,
        students: studentsData,
        placements: placementsData,
        announcements: announcementsData,
        gallery: galleryData,
        media: mediaData,
        courses: coursesData,
        research: researchData,
        footer: footerData,
        nirf: nirfData,
        companyLogos: companyLogosData,
        heroSliders: heroSlidersData
      });

      setStats({
        totalNews: newsData.count || newsData.data?.length || newsData.length || 0,
        totalEvents: eventsData.count || eventsData.data?.length || eventsData.length || 0,
        totalFaculty: facultyData.count || facultyData.data?.length || facultyData.length || 0,
        totalStudents: studentsData.count || studentsData.data?.length || studentsData.length || 0,
        totalPlacements: placementsData.count || placementsData.data?.length || placementsData.length || 0,
        totalAnnouncements: announcementsData.count || announcementsData.data?.length || announcementsData.length || 0,
        totalGallery: galleryData.count || galleryData.data?.length || galleryData.length || 0,
        totalMedia: mediaData.count || mediaData.data?.length || mediaData.length || 0,
        totalCourses: coursesData.count || coursesData.data?.length || coursesData.length || 0,
        totalResearch: researchData.count || researchData.data?.length || researchData.length || 0,
        totalFooter: footerData.count || footerData.data?.length || footerData.length || 0,
        totalNIRF: nirfData.count || nirfData.data?.length || nirfData.length || 0,
        totalCompanyLogos: companyLogosData.count || companyLogosData.data?.length || companyLogosData.length || 0,
        totalHeroSliders: heroSlidersData.count || heroSlidersData.data?.length || heroSlidersData.length || 0,
        recentNews: newsData.data?.slice(0, 5) || newsData.slice?.(0, 5) || [],
        recentEvents: eventsData.data?.slice(0, 5) || eventsData.slice?.(0, 5) || [],
        recentAnnouncements: announcementsData.data?.slice(0, 5) || announcementsData.slice?.(0, 5) || [],
        recentPlacements: placementsData.data?.slice(0, 5) || placementsData.slice?.(0, 5) || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total News',
      value: stats.totalNews,
      icon: Newspaper,
      color: API.color1,
      link: '/admin/news'
    },
    {
      title: 'Total Events',
      value: stats.totalEvents,
      icon: Calendar,
      color: '#3B82F6',
      link: '/admin/events'
    },
    {
      title: 'Faculty Members',
      value: stats.totalFaculty,
      icon: Users,
      color: '#8B5CF6',
      link: '/admin/faculty'
    },
    {
      title: 'Students',
      value: stats.totalStudents,
      icon: GraduationCap,
      color: '#F59E0B',
      link: '/admin/students'
    },
    {
      title: 'Placements',
      value: stats.totalPlacements,
      icon: Briefcase,
      color: '#EF4444',
      link: '/admin/placements'
    },
    {
      title: 'Announcements',
      value: stats.totalAnnouncements,
      icon: Megaphone,
      color: '#EC4899',
      link: '/admin/announcements'
    },
    {
      title: 'Gallery Items',
      value: stats.totalGallery,
      icon: ImageIcon,
      color: '#06B6D4',
      link: '/admin/gallery'
    },
    {
      title: 'Media Coverage',
      value: stats.totalMedia,
      icon: Monitor,
      color: '#6366F1',
      link: '/admin/media'
    },
    {
      title: 'Courses',
      value: stats.totalCourses,
      icon: BookOpen,
      color: '#10B981',
      link: '/admin/courses'
    },
    {
      title: 'Research Papers',
      value: stats.totalResearch,
      icon: FileText,
      color: '#F97316',
      link: '/admin/research-publications'
    },
    {
      title: 'Footer Links',
      value: stats.totalFooter,
      icon: LayoutGrid,
      color: '#6B7280',
      link: '/admin/footer'
    },
    {
      title: 'NIRF Rankings',
      value: stats.totalNIRF,
      icon: Award,
      color: '#FBBF24',
      link: '/admin/nirf'
    },
    {
      title: 'Company Logos',
      value: stats.totalCompanyLogos,
      icon: Building2,
      color: '#8B5CF6',
      link: '/admin/company-logos'
    },
    {
      title: 'Hero Sliders',
      value: stats.totalHeroSliders,
      icon: Presentation,
      color: '#14B8A6',
      link: '/admin/hero-sliders'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 mx-auto mb-4" 
               style={{ borderTopColor: API.color1 }}></div>
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Welcome Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-3 flex items-center">
            👋 Welcome to Admin Dashboard
          </h1>
          <p className="text-green-50 text-lg">
            Manage your website content, view analytics, and update information from here.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/admin/news"
              className="px-5 py-2.5 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="h-4 w-4 inline mr-2" />
              Add News
            </Link>
            <Link
              to="/admin/events"
              className="px-5 py-2.5 bg-white/20 backdrop-blur text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30"
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Add Event
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="group relative bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                 style={{ backgroundColor: card.color }}></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform" 
                     style={{ backgroundColor: `${card.color}15` }}>
                  <card.icon className="h-7 w-7" style={{ color: card.color }} />
                </div>
                <div className="flex items-center space-x-1 text-green-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-semibold">Active</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-xs font-semibold mb-2 uppercase tracking-wide">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <div className="mt-3 text-xs text-gray-500 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Updated today
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent News */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-green-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${API.color1}20` }}>
                <Newspaper className="h-5 w-5" style={{ color: API.color1 }} />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Recent News</h2>
            </div>
            <Link 
              to="/admin/news"
              className="text-sm font-semibold hover:underline flex items-center group"
              style={{ color: API.color1 }}
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {stats.recentNews.length > 0 ? (
              <div className="space-y-3">
                {stats.recentNews.map((news) => (
                  <div key={news.id} className="flex items-start space-x-3 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100 group">
                    <div className="flex-shrink-0 p-3 rounded-lg group-hover:scale-110 transition-transform" 
                         style={{ backgroundColor: `${API.color1}15` }}>
                      <Newspaper className="h-5 w-5" style={{ color: API.color1 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {news.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(news.publishedDate || news.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                      news.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {news.isPublished ? '✓ Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Newspaper className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">No news articles yet</p>
                <Link to="/admin/news" className="text-sm mt-2 inline-block" style={{ color: API.color1 }}>
                  Create your first article →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-blue-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Recent Events</h2>
            </div>
            <Link 
              to="/admin/events"
              className="text-sm font-semibold text-blue-600 hover:underline flex items-center group"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {stats.recentEvents.length > 0 ? (
              <div className="space-y-3">
                {stats.recentEvents.map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-4 rounded-xl hover:bg-blue-50 transition-colors border border-gray-100 group">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-blue-100 group-hover:scale-110 transition-transform">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(event.startDate).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-700 whitespace-nowrap">
                      {event.category || 'Event'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">No events yet</p>
                <Link to="/admin/events" className="text-sm text-blue-600 mt-2 inline-block">
                  Create your first event →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Announcements */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-pink-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-pink-100">
                <Megaphone className="h-5 w-5 text-pink-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Recent Announcements</h2>
            </div>
            <Link 
              to="/admin/announcements"
              className="text-sm font-semibold text-pink-600 hover:underline flex items-center group"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {stats.recentAnnouncements.length > 0 ? (
              <div className="space-y-3">
                {stats.recentAnnouncements.map((announcement) => (
                  <div key={announcement.id} className="flex items-start space-x-3 p-4 rounded-xl hover:bg-pink-50 transition-colors border border-gray-100 group">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-pink-100 group-hover:scale-110 transition-transform">
                      <Megaphone className="h-5 w-5 text-pink-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                        {announcement.title}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(announcement.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', day: 'numeric', year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-bold rounded-full whitespace-nowrap ${
                      announcement.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {announcement.isActive ? '✓ Active' : 'Inactive'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Megaphone className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">No announcements yet</p>
                <Link to="/admin/announcements" className="text-sm text-pink-600 mt-2 inline-block">
                  Create your first announcement →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Placements */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-red-50 to-transparent">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-100">
                <Briefcase className="h-5 w-5 text-red-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Recent Placements</h2>
            </div>
            <Link 
              to="/admin/placements"
              className="text-sm font-semibold text-red-600 hover:underline flex items-center group"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {stats.recentPlacements.length > 0 ? (
              <div className="space-y-3">
                {stats.recentPlacements.map((placement) => (
                  <div key={placement.id} className="flex items-start space-x-3 p-4 rounded-xl hover:bg-red-50 transition-colors border border-gray-100 group">
                    <div className="flex-shrink-0 p-3 rounded-lg bg-red-100 group-hover:scale-110 transition-transform">
                      <Briefcase className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 mb-1">
                        {placement.academicYear || placement.year}
                      </p>
                      <p className="text-xs text-gray-500">
                        Highest: {placement.highestPackage} | Avg: {placement.averagePackage}
                      </p>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 whitespace-nowrap">
                      {placement.totalPlacements || 0} Placed
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Briefcase className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">No placement records yet</p>
                <Link to="/admin/placements" className="text-sm text-red-600 mt-2 inline-block">
                  Add placement data →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-1.5 h-8 rounded-full mr-3" style={{ backgroundColor: API.color1 }}></span>
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/news"
            className="flex items-center justify-center px-6 py-4 rounded-xl font-semibold text-white transition-all hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
            style={{ background: `linear-gradient(135deg, ${API.color1}, #059669)` }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add News
          </Link>
          <Link
            to="/admin/events"
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl font-semibold text-white transition-all hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event
          </Link>
          <Link
            to="/admin/faculty"
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl font-semibold text-white transition-all hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Faculty
          </Link>
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl font-semibold text-white transition-all hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
          >
            <Eye className="h-5 w-5 mr-2" />
            View Website
          </Link>
        </div>
      </div>
    </div>
  );
}

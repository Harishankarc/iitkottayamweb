import React, { useState, useEffect } from 'react';
import { 
  Newspaper, 
  Users, 
  Calendar, 
  TrendingUp,
  GraduationCap,
  Briefcase,
  Eye,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../api/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalNews: 0,
    totalEvents: 0,
    totalFaculty: 0,
    totalStudents: 0,
    recentNews: [],
    recentEvents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all data in parallel
      const [newsRes, eventsRes, facultyRes, studentsRes] = await Promise.all([
        fetch('http://localhost:5000/api/news', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/events', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/faculty', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/students', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      const newsData = await newsRes.json();
      const eventsData = await eventsRes.json();
      const facultyData = await facultyRes.json();
      const studentsData = await studentsRes.json();

      setStats({
        totalNews: newsData.count || newsData.data?.length || 0,
        totalEvents: eventsData.count || eventsData.data?.length || 0,
        totalFaculty: facultyData.count || facultyData.data?.length || 0,
        totalStudents: studentsData.count || studentsData.data?.length || 0,
        recentNews: newsData.data?.slice(0, 5) || [],
        recentEvents: eventsData.data?.slice(0, 5) || []
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
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your website content, view analytics, and update information from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 rounded-lg" style={{ backgroundColor: `${card.color}20` }}>
                <card.icon className="h-6 w-6" style={{ color: card.color }} />
              </div>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Recent Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent News</h2>
            <Link 
              to="/admin/news"
              className="text-sm font-medium hover:underline"
              style={{ color: API.color1 }}
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {stats.recentNews.length > 0 ? (
              <div className="space-y-4">
                {stats.recentNews.map((news) => (
                  <div key={news.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 p-2 rounded" style={{ backgroundColor: `${API.color1}20` }}>
                      <Newspaper className="h-4 w-4" style={{ color: API.color1 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {news.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(news.publishedDate || news.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      news.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {news.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No news articles yet</p>
            )}
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Events</h2>
            <Link 
              to="/admin/events"
              className="text-sm font-medium hover:underline"
              style={{ color: API.color1 }}
            >
              View All
            </Link>
          </div>
          <div className="p-6">
            {stats.recentEvents.length > 0 ? (
              <div className="space-y-4">
                {stats.recentEvents.slice(0, 5).map((event) => (
                  <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <div className="flex-shrink-0 p-2 rounded bg-blue-50">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {event.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800">
                      {event.category}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No events yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/admin/news"
            className="flex items-center justify-center px-4 py-3 rounded-lg font-medium text-white transition-all hover:shadow-lg"
            style={{ backgroundColor: API.color1 }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add News
          </Link>
          <Link
            to="/admin/events"
            className="flex items-center justify-center px-4 py-3 bg-blue-600 rounded-lg font-medium text-white transition-all hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Event
          </Link>
          <Link
            to="/admin/faculty"
            className="flex items-center justify-center px-4 py-3 bg-purple-600 rounded-lg font-medium text-white transition-all hover:shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Faculty
          </Link>
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center px-4 py-3 bg-gray-700 rounded-lg font-medium text-white transition-all hover:shadow-lg"
          >
            <Eye className="h-5 w-5 mr-2" />
            View Website
          </Link>
        </div>
      </div>
    </div>
  );
}

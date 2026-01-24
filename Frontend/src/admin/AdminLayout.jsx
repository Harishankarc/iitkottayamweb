import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Newspaper, 
  Calendar, 
  Users, 
  GraduationCap,
  Briefcase,
  Megaphone,
  Image as ImageIcon,
  Settings,
  LogOut,
  Menu,
  X,
  BookOpen,
  FileText,
  Monitor,
  Building2,
  Award,
  Layout,
  Link,
  Wrench,
  ChevronDown,
  ChevronRight,
  UserCog,
  UserCheck,
  UsersRound,
  School,
  UserSquare2,
  Presentation,
  Palette
} from 'lucide-react';
import API from '../api/api';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [expandedSections, setExpandedSections] = React.useState(['content', 'institute', 'course', 'people', 'facilities', 'iic-clubs', 'research', 'placement', 'media']);

  React.useEffect(() => {
    // Get user from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // If no user, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const menuSections = [
    {
      id: 'home',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/admin',
      hasDropdown: false
    },
    {
      id: 'nirf',
      label: 'NIRF',
      icon: Award,
      hasDropdown: true,
      submenu: [
        { icon: Award, label: 'NIRF Rankings', path: '/admin/nirf' }
      ]
    },
    {
      id: 'content',
      label: 'Content Management',
      icon: FileText,
      path: '/admin/content-editor',
      hasDropdown: false
    },
    {
      id: 'institute',
      label: 'Institute',
      icon: Building2,
      hasDropdown: true,
      submenu: [
        { icon: Presentation, label: 'Hero Sliders', path: '/admin/hero-sliders' },
        { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
        { icon: Layout, label: 'Footer', path: '/admin/footer' },
        { icon: Link, label: 'Navigation', path: '/admin/navigation' }
      ]
    },
    {
      id: 'course',
      label: 'Course',
      icon: School,
      hasDropdown: true,
      submenu: [
        { icon: BookOpen, label: 'Courses', path: '/admin/courses' }
      ]
    },
    {
      id: 'people',
      label: 'People',
      icon: Users,
      hasDropdown: true,
      submenu: [
        { icon: UserCog, label: 'Administration', path: '/admin/administration' },
        { icon: UserCog, label: 'Head of Department', path: '/admin/hod' },
        { icon: UserCog, label: 'Faculty', path: '/admin/faculty' },
        { icon: UserCog, label: 'Technical Staff', path: '/admin/technical-staff' },
        { icon: UserCog, label: 'Support Staff', path: '/admin/support-staff' },
        { icon: GraduationCap, label: 'Research Scholars', path: '/admin/research-scholars' },
        { icon: GraduationCap, label: 'B.Tech Students', path: '/admin/btech-students' },
        { icon: GraduationCap, label: 'M.Tech Students', path: '/admin/mtech-students' },
        { icon: Users, label: 'Gender Index', path: '/admin/gender-index' }
      ]
    },
    {
      id: 'facilities',
      label: 'Facilities',
      icon: Building2,
      hasDropdown: true,
      submenu: [
        { icon: Building2, label: 'Manage Facilities', path: '/admin/facilities' },
        { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' }
      ]
    },
    {
      id: 'iic-clubs',
      label: 'IIC & Clubs',
      icon: UsersRound,
      hasDropdown: true,
      submenu: [
        { icon: UsersRound, label: 'Manage Clubs', path: '/admin/clubs' },
        { icon: Calendar, label: 'Events', path: '/admin/events' }
      ]
    },
    {
      id: 'research',
      label: 'Research',
      icon: FileText,
      hasDropdown: true,
      submenu: [
        { icon: FileText, label: 'Research Activities', path: '/admin/research-activities' },
        { icon: FileText, label: 'Research Publications', path: '/admin/research-publications' }
      ]
    },
    {
      id: 'placement',
      label: 'Placement',
      icon: Briefcase,
      hasDropdown: true,
      submenu: [
        { icon: Briefcase, label: 'Placement Records', path: '/admin/placements' },
        { icon: Building2, label: 'Company Logos', path: '/admin/company-logos' }
      ]
    },
    {
      id: 'media',
      label: '@Media',
      icon: Monitor,
      hasDropdown: true,
      submenu: [
        { icon: Newspaper, label: 'News', path: '/admin/news' },
        { icon: Monitor, label: 'Media Coverage', path: '/admin/media' }
      ]
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      path: '/admin/settings',
      hasDropdown: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72 bg-gradient-to-b from-white to-gray-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        
        {/* Logo */}
        <div className="h-24 flex items-center justify-between px-6 border-b-2 bg-white" style={{ borderColor: API.color1 }}>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              IIIT Kottayam
            </h1>
            <p className="text-xs text-gray-600 font-medium">Admin Dashboard</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white shadow-sm">
            <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                 style={{ background: `linear-gradient(135deg, ${API.color1}, #059669)` }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                {user?.role || 'Administrator'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu - Scrollable */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <div className="space-y-2">
            {menuSections.map((section) => (
              <div key={section.id}>
                {!section.hasDropdown ? (
                  // Single item without dropdown
                  <NavLink
                    to={section.path}
                    end
                    className={({ isActive }) => `
                      group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                      ${isActive 
                        ? 'text-white shadow-lg transform scale-[1.02]' 
                        : 'text-gray-700 hover:bg-white hover:shadow-md'
                      }
                    `}
                    style={({ isActive }) => isActive ? { 
                      background: `linear-gradient(135deg, ${API.color1}, #059669)` 
                    } : {}}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white rounded-r-full"></div>
                        )}
                        <section.icon className={`h-5 w-5 mr-3 transition-transform group-hover:scale-110 ${
                          isActive ? '' : 'text-gray-600'
                        }`} />
                        <span className="flex-1">{section.label}</span>
                      </>
                    )}
                  </NavLink>
                ) : (
                  // Section with dropdown
                  <div>
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="w-full group flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 text-gray-700 hover:bg-white hover:shadow-md"
                    >
                      <section.icon className="h-5 w-5 mr-3 text-gray-600 group-hover:scale-110 transition-transform" />
                      <span className="flex-1 text-left">{section.label}</span>
                      {expandedSections.includes(section.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-500 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-500 transition-transform" />
                      )}
                    </button>
                    
                    {/* Dropdown Items */}
                    {expandedSections.includes(section.id) && (
                      <div className="mt-1 ml-4 space-y-1 border-l-2 border-gray-200 pl-2">
                        {section.submenu.map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                              group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                              ${isActive 
                                ? 'text-white shadow-md' 
                                : 'text-gray-600 hover:bg-white hover:shadow-sm'
                              }
                            `}
                            style={({ isActive }) => isActive ? { 
                              background: `linear-gradient(135deg, ${API.color1}, #059669)` 
                            } : {}}
                          >
                            {({ isActive }) => (
                              <>
                                <item.icon className={`h-4 w-4 mr-2.5 transition-transform group-hover:scale-110 ${
                                  isActive ? '' : 'text-gray-500'
                                }`} />
                                <span className="text-xs">{item.label}</span>
                                {isActive && (
                                  <div className="ml-auto">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                                  </div>
                                )}
                              </>
                            )}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t bg-white">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 group hover:shadow-md"
          >
            <LogOut className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
            <span className="flex-1 text-left">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 transition-all duration-300">
        
        {/* Top Header */}
        <header className="h-20 bg-white shadow-md sticky top-0 z-30 border-b-2" style={{ borderColor: `${API.color1}20` }}>
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm border border-gray-200"
            >
              <Menu className="h-6 w-6 text-gray-700" />
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:flex-initial">
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Manage your website content</p>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => navigate('/')}
                className="px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${API.color1}, #059669)` }}
              >
                <span className="hidden sm:inline">View Website</span>
                <span className="sm:hidden">Website</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="bg-white border-t py-4 px-6 text-center text-sm text-gray-600">
          <p>© 2025 IIIT Kottayam. All rights reserved.</p>
        </footer>
      </div>

      {/* Add custom scrollbar styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </div>
  );
}

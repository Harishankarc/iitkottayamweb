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
  X
} from 'lucide-react';
import API from '../api/api';

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

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
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Newspaper, label: 'News', path: '/admin/news' },
    { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
    { icon: Calendar, label: 'Events', path: '/admin/events' },
    { icon: Users, label: 'Faculty', path: '/admin/faculty' },
    { icon: GraduationCap, label: 'Students', path: '/admin/students' },
    { icon: Briefcase, label: 'Placements', path: '/admin/placements' },
    { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery' },
    { icon: ImageIcon, label: 'Media', path: '/admin/media' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b" style={{ borderColor: API.color1 }}>
          <div>
            <h1 className="text-xl font-bold" style={{ color: API.color1 }}>IIIT Kottayam</h1>
            <p className="text-xs text-gray-600">Admin Panel</p>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                 style={{ backgroundColor: API.color1 }}>
              {user?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name || 'Admin'}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.role || 'Administrator'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              className={({ isActive }) => `
                flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                ${isActive 
                  ? 'text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
              style={({ isActive }) => isActive ? { backgroundColor: API.color1 } : {}}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        
        {/* Top Header */}
        <header className="h-20 bg-white shadow-sm sticky top-0 z-30">
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Page Title - Will be dynamic based on route */}
            <div className="flex-1 lg:flex-initial">
              <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border rounded-lg hover:bg-gray-50"
              >
                View Website
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

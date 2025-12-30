import React, { useState, useEffect } from 'react';
import { Plus, Edit, Eye, Search, FileText, Layout, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/api';

export default function ManagePages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({
    pageName: '',
    pageTitle: '',
    pageSlug: '',
    metaDescription: '',
    metaKeywords: '',
    isPublished: true
  });

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/pages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPages(data.data || []);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingPage 
        ? `http://localhost:5000/api/pages/${editingPage.id}`
        : 'http://localhost:5000/api/pages';
      
      const response = await fetch(url, {
        method: editingPage ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPages();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving page:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      pageName: '',
      pageTitle: '',
      pageSlug: '',
      metaDescription: '',
      metaKeywords: '',
      isPublished: true
    });
    setEditingPage(null);
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({
      pageName: page.pageName || '',
      pageTitle: page.pageTitle || '',
      pageSlug: page.pageSlug || '',
      metaDescription: page.metaDescription || '',
      metaKeywords: page.metaKeywords || '',
      isPublished: page.isPublished ?? true
    });
    setShowModal(true);
  };

  const filteredPages = pages.filter(page =>
    page.pageTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageSlug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Predefined pages that should exist
  const suggestedPages = [
    // Institute & General
    { name: 'homepage', title: 'Homepage', slug: '/' },
    { name: 'why-iiitk', title: 'Why IIIT Kottayam', slug: '/why-iiitk' },
    { name: 'about', title: 'About Us', slug: '/about' },
    { name: 'admissions', title: 'Admissions', slug: '/admissions' },
    { name: 'academics', title: 'Academics', slug: '/academics' },
    { name: 'research-groups', title: 'Research Groups', slug: '/research-groups' },
    { name: 'placements', title: 'Placements', slug: '/placements' },
    { name: 'nirf', title: 'NIRF', slug: '/nirf' },
    { name: 'governance', title: 'Governance', slug: '/governance' },
    { name: 'scholarships', title: 'Scholarships', slug: '/scholarships' },
    // Courses
    { name: 'btech-cse', title: 'B.Tech CSE', slug: '/course/btech-cse' },
    { name: 'btech-ece', title: 'B.Tech ECE', slug: '/course/btech-ece' },
    { name: 'btech-cybersecurity', title: 'B.Tech Cybersecurity', slug: '/course/btech-cybersecurity' },
    { name: 'btech-ai-ds', title: 'B.Tech AI & Data Science', slug: '/course/btech-ai-ds' },
    // Facilities
    { name: 'hostel', title: 'Hostel', slug: '/facilities/hostel' },
    { name: 'gym', title: 'Gymnasium', slug: '/facilities/gym' },
    { name: 'internet', title: 'Internet', slug: '/facilities/internet' },
    { name: 'campus-network', title: 'Campus Network', slug: '/facilities/campus-network' },
    { name: 'medical-centre', title: 'Medical Centre', slug: '/facilities/medical-centre' },
    { name: 'student-mess', title: 'Student Mess', slug: '/facilities/student-mess' },
    { name: 'security', title: 'Security', slug: '/facilities/security' },
    { name: 'sports', title: 'Sports', slug: '/facilities/sports' },
    { name: 'bank-atm', title: 'Bank/ATM', slug: '/facilities/bank-atm' },
    // IIC & Clubs
    { name: 'innovation-cell', title: 'Innovation Cell', slug: '/iic-clubs/innovation-cell' },
    { name: 'cultural-club', title: 'Cultural Club', slug: '/iic-clubs/cultural-club' },
    { name: 'technical-club', title: 'Technical Club', slug: '/iic-clubs/technical-club' },
    { name: 'sports-club', title: 'Sports Club', slug: '/iic-clubs/sports-club' },
    { name: 'fdp-webinars', title: 'FDP & Webinars', slug: '/iic-clubs/fdp-webinars' },
    { name: 'trendles-club', title: 'Trendles Club', slug: '/iic-clubs/trendles-club' },
    { name: 'cyber-security-club', title: 'Cyber Security Club', slug: '/iic-clubs/cyber-security-club' },
    { name: 'mind-quest', title: 'Mind Quest', slug: '/iic-clubs/mind-quest' },
    { name: 'ieee-student-branch', title: 'IEEE Student Branch', slug: '/iic-clubs/ieee-student-branch' },
    { name: 'acm', title: 'ACM Student Chapter', slug: '/iic-clubs/acm' },
    // Others
    { name: 'gallery', title: 'Gallery', slug: '/gallery' },
    { name: 'campus-life', title: 'Campus Life', slug: '/campus-life' },
    { name: 'contact', title: 'Contact Us', slug: '/contact' }
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Pages</h1>
          <p className="text-gray-600 mt-1">Control content for all website pages</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Page
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-opacity-50"
            style={{ focusRingColor: API.color1 }}
          />
        </div>
      </div>

      {/* Quick Setup - Suggested Pages */}
      {pages.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Setup</h3>
          <p className="text-blue-700 mb-4">Get started by creating these common pages:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedPages.map((page) => (
              <button
                key={page.name}
                onClick={() => {
                  setFormData({
                    pageName: page.name,
                    pageTitle: page.title,
                    pageSlug: page.slug,
                    metaDescription: '',
                    metaKeywords: '',
                    isPublished: true
                  });
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 transition-colors text-left"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">{page.title}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page) => (
          <div
            key={page.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-opacity-50"
            style={{ '--hover-border-color': API.color1 }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${API.color1}66`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}
          >
            {/* Page Header */}
            <div className="p-6 border-b" style={{ backgroundColor: `${API.color1}10` }}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5" style={{ color: API.color1 }} />
                  <h3 className="font-bold text-gray-900 text-lg">{page.pageTitle}</h3>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    page.isPublished 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {page.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-sm text-gray-600">{page.pageSlug}</p>
            </div>

            {/* Page Info */}
            <div className="p-6">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-500">Page Name:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{page.pageName}</span>
                </div>
                {page.metaDescription && (
                  <p className="text-sm text-gray-600 line-clamp-2">{page.metaDescription}</p>
                )}
                {page.contentBlocks && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Layout className="w-4 h-4" />
                    <span>{Array.isArray(page.contentBlocks) ? page.contentBlocks.length : 0} content blocks</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(page)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  <Edit className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit Info</span>
                </button>
                <Link
                  to={`/admin/content-blocks?page=${page.pageName}`}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: API.color1 }}
                >
                  <Layout className="h-4 w-4" />
                  <span className="text-sm font-medium">Edit Content</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPages.length === 0 && searchTerm && (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No pages found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingPage ? 'Edit Page' : 'Add Page'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Page Name (ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pageName}
                    onChange={(e) => setFormData({...formData, pageName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                    placeholder="e.g., why-iiitk, about, contact"
                    disabled={editingPage}
                  />
                  <p className="text-xs text-gray-500 mt-1">Unique identifier (cannot be changed after creation)</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.pageTitle}
                    onChange={(e) => setFormData({...formData, pageTitle: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Why IIIT Kottayam"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Slug (URL) *</label>
                <input
                  type="text"
                  required
                  value={formData.pageSlug}
                  onChange={(e) => setFormData({...formData, pageSlug: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
                  placeholder="e.g., /why-iiitk, /about, /contact"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                <textarea
                  rows="3"
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Brief description for SEO (150-160 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                <input
                  type="text"
                  value={formData.metaKeywords}
                  onChange={(e) => setFormData({...formData, metaKeywords: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPublished"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData({...formData, isPublished: e.target.checked})}
                  className="h-4 w-4 rounded"
                  style={{ accentColor: API.color1 }}
                />
                <label htmlFor="isPublished" className="ml-2 text-sm text-gray-700">
                  Publish page (make visible on website)
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Next Step:</strong> After creating the page, click "Edit Content" to add content blocks (hero sections, text, images, etc.)
                </p>
              </div>

              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: API.color1 }}
                >
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

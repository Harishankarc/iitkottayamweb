import React, { useState, useEffect } from 'react';
import { FileText, Plus, Edit2, Trash2, Eye, EyeOff, Search, Filter } from 'lucide-react';
import API from '../../api/api';

export default function ManagePageContent() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [formData, setFormData] = useState({
    pageName: '',
    pageTitle: '',
    pageSlug: '',
    category: 'main',
    metaDescription: '',
    metaKeywords: '',
    heroTitle: '',
    heroSubtitle: '',
    content: '',
    sections: [],
    customFields: {},
    isPublished: true,
    sortOrder: 0
  });

  const categories = ['main', 'institute', 'course', 'people', 'facilities', 'iic-clubs', 'research', 'footer', 'other'];

  useEffect(() => {
    fetchPages();
  }, [filterCategory]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const endpoint = filterCategory === 'all' 
        ? '/api/pages?isPublished=all' 
        : `/api/pages?category=${filterCategory}&isPublished=all`;
      
      const response = await API.get(endpoint);
      if (response.success) {
        setPages(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (page) => {
    setEditingPage(page);
    setFormData({
      pageName: page.pageName || '',
      pageTitle: page.pageTitle || '',
      pageSlug: page.pageSlug || '',
      category: page.category || 'main',
      metaDescription: page.metaDescription || '',
      metaKeywords: page.metaKeywords || '',
      heroTitle: page.heroTitle || '',
      heroSubtitle: page.heroSubtitle || '',
      content: page.content || '',
      sections: page.sections || [],
      customFields: page.customFields || {},
      isPublished: page.isPublished,
      sortOrder: page.sortOrder || 0
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingPage(null);
    setFormData({
      pageName: '',
      pageTitle: '',
      pageSlug: '',
      category: 'main',
      metaDescription: '',
      metaKeywords: '',
      heroTitle: '',
      heroSubtitle: '',
      content: '',
      sections: [],
      customFields: {},
      isPublished: true,
      sortOrder: 0
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPage) {
        await API.put(`/api/pages/${editingPage.id}`, formData);
      } else {
        await API.post('/api/pages', formData);
      }
      setShowModal(false);
      fetchPages();
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      try {
        await API.delete(`/api/pages/${id}`);
        fetchPages();
      } catch (error) {
        console.error('Error deleting page:', error);
      }
    }
  };

  const handleTogglePublish = async (page) => {
    try {
      await API.put(`/api/pages/${page.id}`, {
        ...page,
        isPublished: !page.isPublished
      });
      fetchPages();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          id: `section-${Date.now()}`,
          type: 'text',
          title: '',
          content: ''
        }
      ]
    });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index] = {
      ...newSections[index],
      [field]: value
    };
    setFormData({ ...formData, sections: newSections });
  };

  const removeSection = (index) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index)
    });
  };

  const filteredPages = pages.filter(page =>
    page.pageTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group pages by category
  const groupedPages = filteredPages.reduce((acc, page) => {
    const cat = page.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(page);
    return acc;
  }, {});

  const getCategoryIcon = (category) => {
    const icons = {
      main: '🏠',
      institute: '🏛️',
      course: '📚',
      people: '👥',
      facilities: '🏢',
      'iic-clubs': '🎯',
      research: '🔬',
      footer: '📄',
      other: '📋'
    };
    return icons[category] || '📄';
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Content Management</h1>
          <p className="text-gray-600 text-sm mt-1">
            {pages.length} pages • Manage all website content by category
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-md"
        >
          <Plus className="w-5 h-5" />
          Create New Page
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Pages List - Grouped by Category */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
          <p className="mt-4 text-gray-600">Loading pages...</p>
        </div>
      ) : filteredPages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No pages found</p>
          <p className="text-gray-400 text-sm mt-2">Create your first page to get started</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
          {Object.entries(groupedPages).map(([category, categoryPages]) => (
            <div key={category} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Category Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-3 flex items-center gap-3">
                <span className="text-2xl">{getCategoryIcon(category)}</span>
                <div>
                  <h3 className="text-white font-semibold text-lg capitalize">
                    {category === 'iic-clubs' ? 'IIC & Clubs' : category}
                  </h3>
                  <p className="text-green-100 text-xs">{categoryPages.length} page(s)</p>
                </div>
              </div>

              {/* Pages in Category */}
              <div className="divide-y divide-gray-100">
                {categoryPages.map((page) => (
                  <div key={page.id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      {/* Page Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{page.pageTitle}</h4>
                          {page.isPublished ? (
                            <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                              Published
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">/{page.pageSlug}</span>
                          <span>ID: {page.pageName}</span>
                          {page.sections && page.sections.length > 0 && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {page.sections.length} section(s)
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleTogglePublish(page)}
                          className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                          title={page.isPublished ? 'Unpublish' : 'Publish'}
                        >
                          {page.isPublished ? (
                            <Eye className="w-5 h-5" />
                          ) : (
                            <EyeOff className="w-5 h-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(page)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingPage ? 'Edit Page' : 'Create New Page'}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Name (ID)</label>
                  <input
                    type="text"
                    value={formData.pageName}
                    onChange={(e) => setFormData({ ...formData, pageName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                    disabled={editingPage}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                  <input
                    type="text"
                    value={formData.pageTitle}
                    onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Slug</label>
                  <input
                    type="text"
                    value={formData.pageSlug}
                    onChange={(e) => setFormData({ ...formData, pageSlug: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hero Section */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">Hero Section</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Title</label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle</label>
                  <textarea
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="2"
                  />
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">Main Content</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="6"
                  />
                </div>
              </div>

              {/* SEO */}
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-semibold text-lg">SEO</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Keywords</label>
                  <input
                    type="text"
                    value={formData.metaKeywords}
                    onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>
              </div>

              {/* Dynamic Sections */}
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Content Sections</h3>
                  <button
                    type="button"
                    onClick={addSection}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Section
                  </button>
                </div>
                {formData.sections.map((section, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Section {index + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Section ID</label>
                        <input
                          type="text"
                          value={section.id || ''}
                          onChange={(e) => updateSection(index, 'id', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={section.type || 'text'}
                          onChange={(e) => updateSection(index, 'type', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="list">List</option>
                          <option value="statistics">Statistics</option>
                          <option value="links">Links</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={section.title || ''}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">Content (JSON for list/statistics/links)</label>
                        <textarea
                          value={typeof section.content === 'string' ? section.content : JSON.stringify(section.content, null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              updateSection(index, 'content', parsed);
                            } catch {
                              updateSection(index, 'content', e.target.value);
                            }
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                          rows="3"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Settings */}
              <div className="flex items-center gap-6 border-t pt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isPublished}
                    onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
                    className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
                  <input
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) })}
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  {editingPage ? 'Update Page' : 'Create Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

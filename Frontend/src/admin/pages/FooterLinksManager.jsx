import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, ExternalLink } from 'lucide-react';
import API from '../../api/api';

const SECTIONS = [
  { value: 'departments', label: 'Departments' },
  { value: 'reports', label: 'Reports' },
  { value: 'social', label: 'Social Media' },
  { value: 'links', label: 'Main Links' },
  { value: 'legal', label: 'Legal' }
];

const SOCIAL_ICONS = ['Twitter', 'Facebook', 'Linkedin', 'Youtube', 'Instagram', 'Github'];

export default function FooterLinksManager() {
  const [links, setLinks] = useState([]);
  const [filteredLinks, setFilteredLinks] = useState([]);
  const [selectedSection, setSelectedSection] = useState('all');
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingLink, setEditingLink] = useState(null);
  const [formData, setFormData] = useState({
    section: 'links',
    column_index: 0,
    label: '',
    url: '',
    icon: '',
    displayOrder: 0,
    isVisible: true,
    openInNewTab: false
  });

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (selectedSection === 'all') {
      setFilteredLinks(links);
    } else {
      setFilteredLinks(links.filter(link => link.section === selectedSection));
    }
  }, [selectedSection, links]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/footer-links/all');
      if (response.success) {
        setLinks(response.flat || []);
      }
    } catch (error) {
      console.error('Error fetching footer links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      if (editingLink) {
        const response = await API.put(`/api/footer-links/${editingLink.id}`, formData);
        if (response.success) {
          await fetchLinks();
          resetForm();
        }
      } else {
        const response = await API.post('/api/footer-links', formData);
        if (response.success) {
          await fetchLinks();
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving footer link:', error);
      alert(error.response?.data?.error || 'Failed to save footer link');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link) => {
    setEditingLink(link);
    setFormData({
      section: link.section,
      column_index: link.column_index || 0,
      label: link.label,
      url: link.url,
      icon: link.icon || '',
      displayOrder: link.displayOrder,
      isVisible: link.isVisible,
      openInNewTab: link.openInNewTab
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this footer link?')) return;

    try {
      setLoading(true);
      const response = await API.delete(`/api/footer-links/${id}`);
      if (response.success) {
        await fetchLinks();
      }
    } catch (error) {
      console.error('Error deleting footer link:', error);
      alert('Failed to delete footer link');
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id) => {
    try {
      const response = await API.patch(`/api/footer-links/${id}/toggle-visibility`);
      if (response.success) {
        await fetchLinks();
      }
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      section: 'links',
      column_index: 0,
      label: '',
      url: '',
      icon: '',
      displayOrder: 0,
      isVisible: true,
      openInNewTab: false
    });
    setEditingLink(null);
    setShowForm(false);
  };

  const getSectionBadgeColor = (section) => {
    const colors = {
      departments: 'bg-blue-100 text-blue-700',
      reports: 'bg-purple-100 text-purple-700',
      social: 'bg-pink-100 text-pink-700',
      links: 'bg-green-100 text-green-700',
      legal: 'bg-gray-100 text-gray-700'
    };
    return colors[section] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Footer Links Manager</h1>
              <p className="text-gray-600">Manage footer links across all sections</p>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg"
              style={{ backgroundColor: API.color1 }}
            >
              <Plus className="h-5 w-5" />
              Add Link
            </button>
          </div>

          {/* Section Filter */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSection('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedSection === 'all'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({links.length})
            </button>
            {SECTIONS.map(section => {
              const count = links.filter(l => l.section === section.value).length;
              return (
                <button
                  key={section.value}
                  onClick={() => setSelectedSection(section.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedSection === section.value
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.label} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingLink ? 'Edit Footer Link' : 'Add New Footer Link'}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  >
                    {SECTIONS.map(section => (
                      <option key={section.value} value={section.value}>
                        {section.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Label */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Label *
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL *
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="/path or https://example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Icon (for social) */}
                {formData.section === 'social' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Icon (for Social Media)
                    </label>
                    <select
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Select Icon</option>
                      {SOCIAL_ICONS.map(icon => (
                        <option key={icon} value={icon}>{icon}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Column Index (for links section) */}
                {formData.section === 'links' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Column (1-4)
                    </label>
                    <input
                      type="number"
                      value={formData.column_index}
                      onChange={(e) => setFormData({ ...formData, column_index: parseInt(e.target.value) })}
                      min="1"
                      max="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                )}

                {/* Display Order */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isVisible}
                      onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Visible</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.openInNewTab}
                      onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.checked })}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Open in New Tab</span>
                  </label>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold text-white transition-all"
                    style={{ backgroundColor: API.color1 }}
                  >
                    <Save className="h-5 w-5" />
                    {loading ? 'Saving...' : editingLink ? 'Update Link' : 'Create Link'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Links Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Section</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Label</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Column</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      Loading footer links...
                    </td>
                  </tr>
                ) : filteredLinks.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No footer links found. Create one to get started!
                    </td>
                  </tr>
                ) : (
                  filteredLinks.map((link) => (
                    <tr key={link.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSectionBadgeColor(link.section)}`}>
                          {SECTIONS.find(s => s.value === link.section)?.label || link.section}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900">{link.label}</span>
                          {link.openInNewTab && (
                            <ExternalLink className="h-3 w-3 text-gray-400" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 truncate max-w-xs block">
                          {link.url}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {link.section === 'links' ? link.column_index : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{link.displayOrder}</span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleVisibility(link.id)}
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            link.isVisible
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {link.isVisible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => toggleVisibility(link.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            title={link.isVisible ? 'Hide' : 'Show'}
                          >
                            {link.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                          </button>
                          <button
                            onClick={() => handleEdit(link)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, Eye, EyeOff, GripVertical, Save, X, Monitor, Tablet, Smartphone } from 'lucide-react';
import API from '../../api/api';

export default function NavbarManager() {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    label: '',
    url: '',
    displayOrder: 0,
    isVisible: true,
    openInNewTab: false,
    showOnMobile: true,
    showOnTablet: true,
    showOnDesktop: true
  });

  const color1 = API.color1 || '#239244';

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const response = await API.get('/api/navbar-links/all');
      if (response.success) {
        setLinks(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching navbar links:', error);
      alert('Failed to fetch navbar links');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link) => {
    setEditingLink(link.id);
    setFormData({
      label: link.label,
      url: link.url,
      displayOrder: link.displayOrder,
      isVisible: link.isVisible,
      openInNewTab: link.openInNewTab,
      showOnMobile: link.showOnMobile,
      showOnTablet: link.showOnTablet,
      showOnDesktop: link.showOnDesktop
    });
    setIsAdding(false);
  };

  const handleSave = async () => {
    try {
      if (editingLink) {
        // Update existing link
        await API.put(`/api/navbar-links/${editingLink}`, formData);
      } else {
        // Create new link
        await API.post('/api/navbar-links', formData);
      }
      
      await fetchLinks();
      handleCancel();
      alert(editingLink ? 'Link updated successfully!' : 'Link created successfully!');
    } catch (error) {
      console.error('Error saving link:', error);
      alert('Failed to save link');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this link?')) return;

    try {
      await API.delete(`/api/navbar-links/${id}`);
      await fetchLinks();
      alert('Link deleted successfully!');
    } catch (error) {
      console.error('Error deleting link:', error);
      alert('Failed to delete link');
    }
  };

  const handleToggleVisibility = async (link) => {
    try {
      await API.put(`/api/navbar-links/${link.id}`, {
        ...link,
        isVisible: !link.isVisible
      });
      await fetchLinks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
      alert('Failed to toggle visibility');
    }
  };

  const handleCancel = () => {
    setEditingLink(null);
    setIsAdding(false);
    setFormData({
      label: '',
      url: '',
      displayOrder: 0,
      isVisible: true,
      openInNewTab: false,
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    });
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingLink(null);
    setFormData({
      label: '',
      url: '',
      displayOrder: links.length + 1,
      isVisible: true,
      openInNewTab: false,
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: color1 }}></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Navbar Links Manager</h1>
              <p className="text-sm text-gray-600 mt-1">Manage the top navigation bar links</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color1 }}
              >
                <Plus size={20} />
                Add New Link
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Back to Admin
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Add/Edit Form */}
        {(isAdding || editingLink) && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-2" style={{ borderColor: color1 }}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRing: color1 }}
                  placeholder="e.g., HOME, WEBMAIL"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="e.g., /, /page, https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder}
                  onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                />
              </div>

              <div className="flex items-center gap-6 pt-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isVisible}
                    onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Visible</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.openInNewTab}
                    onChange={(e) => setFormData({ ...formData, openInNewTab: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">Open in new tab</span>
                </label>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Show On:</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showOnMobile}
                    onChange={(e) => setFormData({ ...formData, showOnMobile: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Smartphone size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Mobile</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showOnTablet}
                    onChange={(e) => setFormData({ ...formData, showOnTablet: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Tablet size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Tablet</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.showOnDesktop}
                    onChange={(e) => setFormData({ ...formData, showOnDesktop: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <Monitor size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">Desktop</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-2 text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ backgroundColor: color1 }}
              >
                <Save size={18} />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Links List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Display</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {links.map((link) => (
                  <tr key={link.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center gap-2">
                        <GripVertical size={16} className="text-gray-400" />
                        {link.displayOrder}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{link.label}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 truncate max-w-xs">{link.url}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleVisibility(link)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          link.isVisible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {link.isVisible ? <Eye size={14} className="mr-1" /> : <EyeOff size={14} className="mr-1" />}
                        {link.isVisible ? 'Visible' : 'Hidden'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {link.showOnMobile && <Smartphone size={16} className="text-gray-400" title="Mobile" />}
                        {link.showOnTablet && <Tablet size={16} className="text-gray-400" title="Tablet" />}
                        {link.showOnDesktop && <Monitor size={16} className="text-gray-400" title="Desktop" />}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(link)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {links.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No navbar links found. Add your first link!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

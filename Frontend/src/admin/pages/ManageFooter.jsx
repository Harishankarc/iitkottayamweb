import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import API from '../../api/api';

export default function ManageFooter() {
  const [footerItems, setFooterItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    section: 'about',
    title: '',
    content: '',
    links: '',
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    fetchFooterItems();
  }, []);

  const fetchFooterItems = async () => {
    try {
      const result = await API.get('/api/footer');
      if (result.success) {
        setFooterItems(result.data.data || []);
      } else {
        console.error('Error fetching footer:', result.error);
        alert('Failed to load footer items. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load footer items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to convert line-based format to JSON
  const convertLinksToJSON = (linksText) => {
    if (!linksText || linksText.trim() === '') return '';
    
    // Check if already JSON format
    if (linksText.trim().startsWith('[')) {
      return linksText; // Already JSON, return as is
    }
    
    // Convert line-based format to JSON
    const lines = linksText.split('\n').filter(line => line.trim());
    const linksArray = lines.map(line => {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 2) {
        return { label: parts[0], url: parts[1] };
      }
      return null;
    }).filter(Boolean);
    
    return JSON.stringify(linksArray);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Convert links to JSON format if needed
      const dataToSend = {
        ...formData,
        links: convertLinksToJSON(formData.links)
      };
      
      const result = editingItem 
        ? await API.put(`/api/footer/${editingItem.id}`, dataToSend)
        : await API.post('/api/footer', dataToSend);
      
      if (result.success) {
        fetchFooterItems();
        setShowModal(false);
        resetForm();
        alert(editingItem ? 'Footer item updated successfully!' : 'Footer item created successfully!');
      } else {
        alert('Failed to save footer item: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save footer item. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const result = await API.delete(`/api/footer/${id}`);
      if (result.success) {
        fetchFooterItems();
        alert('Footer item deleted successfully!');
      } else {
        alert('Failed to delete footer item: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete footer item. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      section: 'about',
      title: '',
      content: '',
      links: '',
      displayOrder: 0,
      isActive: true
    });
    setEditingItem(null);
  };

  // Helper function to convert JSON to line-based format for editing
  const convertJSONToLines = (jsonText) => {
    if (!jsonText || jsonText.trim() === '') return '';
    
    try {
      const links = JSON.parse(jsonText);
      if (Array.isArray(links)) {
        return links.map(link => `${link.label} | ${link.url}`).join('\n');
      }
    } catch (e) {
      // If parsing fails, return as is (might already be line format)
      return jsonText;
    }
    return jsonText;
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      ...item,
      links: convertJSONToLines(item.links)
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      {/* Migration Notice */}
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              💡 Recommended: Use Footer Links Manager
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                For better footer management, please use <strong>Footer Links Manager</strong> instead. 
                It provides a cleaner interface and is what the frontend website uses.
              </p>
              <a 
                href="/admin/footer-links" 
                className="inline-flex items-center mt-2 text-blue-800 hover:text-blue-900 font-semibold"
              >
                Go to Footer Links Manager →
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage Footer (Legacy)</h1>
          <p className="text-gray-600 text-sm mt-1">Manage footer sections and content</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-4 w-4" />
          Add Footer Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: API.color2 }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Section</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Content</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {footerItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{item.section}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate max-w-xs">{item.content}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.displayOrder}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(item)} className="text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: API.color1 }}>
                {editingItem ? 'Edit Footer Item' : 'Add Footer Item'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
                    <select value={formData.section} onChange={(e) => setFormData({ ...formData, section: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500">
                      <option value="about">About</option>
                      <option value="quickLinks">Quick Links</option>
                      <option value="contact">Contact</option>
                      <option value="social">Social</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" rows="4" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Links <span className="text-gray-500 text-xs">(Optional - Use Footer Links Manager for better control)</span>
                    </label>
                    <textarea 
                      value={formData.links} 
                      onChange={(e) => setFormData({ ...formData, links: e.target.value })} 
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-green-500" 
                      rows="3" 
                      placeholder='One link per line, format: Label | URL&#10;Example:&#10;Home | /&#10;About Us | /about'
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      💡 Tip: For better link management, use the "Footer Links" section in the admin menu
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div className="flex items-center">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 rounded" />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button type="submit" className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium" style={{ backgroundColor: API.color1 }}>
                    {editingItem ? 'Update Footer Item' : 'Create Footer Item'}
                  </button>
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

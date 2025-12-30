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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = editingItem 
        ? await API.put(`/api/footer/${editingItem.id}`, formData)
        : await API.post('/api/footer', formData);
      
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

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage Footer</h1>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Links (JSON format)</label>
                    <textarea value={formData.links} onChange={(e) => setFormData({ ...formData, links: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500" rows="3" placeholder='[{"label":"Home","url":"/"}]' />
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

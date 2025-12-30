import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import API from '../../api/api';

export default function ManageNavigation() {
  const [navItems, setNavItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label: '',
    path: '',
    parentId: null,
    displayOrder: 0,
    icon: '',
    isExternal: false,
    isActive: true,
    children: ''
  });

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    try {
      const result = await API.get('/api/navigation');
      if (result.success) {
        setNavItems(result.data.data || []);
      } else {
        console.error('Error fetching navigation:', result.error);
        alert('Failed to load navigation items. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load navigation items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = editingItem 
        ? await API.put(`/api/navigation/${editingItem.id}`, formData)
        : await API.post('/api/navigation', formData);
      
      if (result.success) {
        fetchNavItems();
        setShowModal(false);
        resetForm();
        alert(editingItem ? 'Navigation item updated successfully!' : 'Navigation item created successfully!');
      } else {
        alert('Failed to save navigation item: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save navigation item. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this navigation item?')) return;
    try {
      const result = await API.delete(`/api/navigation/${id}`);
      if (result.success) {
        fetchNavItems();
        alert('Navigation item deleted successfully!');
      } else {
        alert('Failed to delete navigation item: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete navigation item. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      label: '',
      path: '',
      parentId: null,
      displayOrder: 0,
      icon: '',
      isExternal: false,
      isActive: true,
      children: ''
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
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage Navigation</h1>
          <p className="text-gray-600 text-sm mt-1">Manage website navigation menu</p>
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
          Add Menu Item
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Label</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Path</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {navItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{item.label}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.path}</td>
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
                {editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input type="text" value={formData.label} onChange={(e) => setFormData({ ...formData, label: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Path</label>
                    <input type="text" value={formData.path} onChange={(e) => setFormData({ ...formData, path: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="/about" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input type="number" value={formData.displayOrder} onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                    <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500" placeholder="icon-name" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Children (JSON) - Optional submenu items</label>
                    <textarea value={formData.children} onChange={(e) => setFormData({ ...formData, children: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-green-500" rows="4" placeholder='[{"label":"Sub Item","path":"/path"}]' />
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 rounded" />
                      <span className="text-sm font-medium">Active</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input type="checkbox" checked={formData.isExternal} onChange={(e) => setFormData({ ...formData, isExternal: e.target.checked })} className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 rounded" />
                      <span className="text-sm font-medium">External Link</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button type="submit" className="px-6 py-2.5 text-white rounded-lg hover:opacity-90 transition-opacity font-medium" style={{ backgroundColor: API.color1 }}>
                    {editingItem ? 'Update Menu Item' : 'Create Menu Item'}
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

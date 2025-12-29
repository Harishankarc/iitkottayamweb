import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save } from 'lucide-react';
import API from '../../api/api';

export default function ManageSiteSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    settingKey: '',
    settingValue: '',
    settingType: 'text',
    category: 'general',
    description: ''
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/site-settings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setSettings(data.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `http://localhost:5000/api/site-settings/id/${editingItem.id}`
        : 'http://localhost:5000/api/site-settings';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchSettings();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/site-settings/id/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchSettings();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      settingKey: '',
      settingValue: '',
      settingType: 'text',
      category: 'general',
      description: ''
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) acc[setting.category] = [];
    acc[setting.category].push(setting);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Site Settings</h1>
          <p className="text-gray-600 text-sm mt-1">Manage global site settings and configurations</p>
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
          Add Setting
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedSettings).map(([category, categorySettings]) => (
            <div key={category} className="bg-white rounded-lg shadow">
              <div className="px-6 py-3 border-b" style={{ backgroundColor: API.color2 }}>
                <h3 className="text-lg font-bold capitalize">{category}</h3>
              </div>
              <div className="p-6">
                <div className="grid gap-4">
                  {categorySettings.map((setting) => (
                    <div key={setting.id} className="flex items-center justify-between border-b pb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold">{setting.settingKey}</span>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded">{setting.settingType}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                        <p className="text-sm text-gray-800 mt-1 font-medium">{setting.settingValue}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(setting)} className="text-blue-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(setting.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: API.color1 }}>
                {editingItem ? 'Edit Setting' : 'Add Setting'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Setting Key</label>
                    <input type="text" value={formData.settingKey} onChange={(e) => setFormData({ ...formData, settingKey: e.target.value })} className="w-full px-3 py-2 border rounded-lg font-mono" placeholder="site_title" required disabled={editingItem} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Setting Value</label>
                    <textarea value={formData.settingValue} onChange={(e) => setFormData({ ...formData, settingValue: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows="3" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select value={formData.settingType} onChange={(e) => setFormData({ ...formData, settingType: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                        <option value="text">Text</option>
                        <option value="image">Image</option>
                        <option value="json">JSON</option>
                        <option value="boolean">Boolean</option>
                        <option value="number">Number</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                        <option value="general">General</option>
                        <option value="contact">Contact</option>
                        <option value="social">Social</option>
                        <option value="appearance">Appearance</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2 border rounded-lg" rows="2" />
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className="px-4 py-2 text-white rounded-lg" style={{ backgroundColor: API.color1 }}>
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
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

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

export default function ManageHeroSliders() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '',
    displayOrder: 0,
    isActive: true
  });

  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const result = await API.get('/api/hero-sliders');
      if (result.success) {
        setSliders(result.data.data || []);
      } else {
        console.error('Error fetching sliders:', result.error);
        alert('Failed to load hero sliders. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching sliders:', error);
      alert('Failed to load hero sliders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = editingItem 
        ? await API.put(`/api/hero-sliders/${editingItem.id}`, formData)
        : await API.post('/api/hero-sliders', formData);
      
      if (result.success) {
        fetchSliders();
        setShowModal(false);
        resetForm();
        alert(editingItem ? 'Hero slider updated successfully!' : 'Hero slider created successfully!');
      } else {
        alert('Failed to save hero slider: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving slider:', error);
      alert('Failed to save hero slider. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slider?')) return;
    
    try {
      const result = await API.delete(`/api/hero-sliders/${id}`);
      if (result.success) {
        fetchSliders();
        alert('Hero slider deleted successfully!');
      } else {
        alert('Failed to delete hero slider: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting slider:', error);
      alert('Failed to delete hero slider. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      displayOrder: 0,
      isActive: true
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      subtitle: item.subtitle || '',
      description: item.description || '',
      image: item.image,
      buttonText: item.buttonText || '',
      buttonLink: item.buttonLink || '',
      displayOrder: item.displayOrder,
      isActive: item.isActive
    });
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage Hero Sliders</h1>
          <p className="text-gray-600 text-sm mt-1">Manage homepage carousel images</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-4 w-4" />
          Add Slider
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {sliders.map((slider) => (
            <div key={slider.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
              <img src={API.getImageUrl(slider.image)} alt={slider.title} className="w-32 h-20 object-cover rounded" />
              <div className="flex-1">
                <h3 className="font-bold text-lg">{slider.title}</h3>
                <p className="text-sm text-gray-600">{slider.subtitle}</p>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">Order: {slider.displayOrder}</span>
                  <span className={`text-xs px-2 py-1 rounded ${slider.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {slider.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditModal(slider)} className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(slider.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: API.color1 }}>
                {editingItem ? 'Edit Slider' : 'Add New Slider'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      rows="3"
                    />
                  </div>
                  <ImageUploader
                    value={formData.image || ''}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    label="Hero Slider Image"
                    folder="sliders"
                    aspectRatio="21/9"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={formData.buttonText}
                        onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Button Link</label>
                      <input
                        type="text"
                        value={formData.buttonLink}
                        onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                        className="mr-2"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className="px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: API.color1 }}>
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
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

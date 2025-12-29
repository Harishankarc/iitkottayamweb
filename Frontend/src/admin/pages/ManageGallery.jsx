import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Image as ImageIcon } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import MultiImageUploader from '../components/MultiImageUploader';

export default function ManageGallery() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    eventTitle: '',
    eventDate: '',
    description: '',
    category: 'academic',
    thumbnail: '',
    images: [],
    isPublished: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/gallery', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setGallery(data.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `http://localhost:5000/api/gallery/${editingItem.id}`
        : 'http://localhost:5000/api/gallery';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchGallery();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving gallery:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchGallery();
    } catch (error) {
      console.error('Error deleting gallery:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      eventTitle: '',
      eventDate: '',
      description: '',
      category: 'academic',
      isPublished: true,
      isFeatured: false
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      eventTitle: item.eventTitle,
      eventDate: item.eventDate?.split('T')[0] || '',
      description: item.description || '',
      category: item.category,
      isPublished: item.isPublished,
      isFeatured: item.isFeatured
    });
    setShowModal(true);
  };

  const filteredGallery = gallery.filter(item =>
    item.eventTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }}></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Gallery</h1>
          <p className="text-gray-600 mt-1">Manage event photo galleries</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Gallery
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search galleries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGallery.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <ImageIcon className="h-16 w-16 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                  {item.category}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.eventTitle}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {new Date(item.eventDate).toLocaleDateString()}
                </span>
                {item.isFeatured && (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Gallery' : 'Add Gallery'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({...formData, eventTitle: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <ImageUploader
                value={formData.thumbnail || ''}
                onChange={(url) => setFormData({...formData, thumbnail: url})}
                label="Cover/Thumbnail Image"
                folder="gallery"
                aspectRatio="16/9"
              />
              <MultiImageUploader
                value={formData.images || []}
                onChange={(images) => setFormData({...formData, images})}
                label="Gallery Images"
                folder="gallery"
                maxImages={30}
                aspectRatio="4/3"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.eventDate}
                    onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="academic">Academic</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="technical">Technical</option>
                    <option value="seminar">Seminar</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-6">
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
                    Published
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                    className="h-4 w-4 rounded"
                    style={{ accentColor: API.color1 }}
                  />
                  <label htmlFor="isFeatured" className="ml-2 text-sm text-gray-700">
                    Featured
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: API.color1 }}
                >
                  {editingItem ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

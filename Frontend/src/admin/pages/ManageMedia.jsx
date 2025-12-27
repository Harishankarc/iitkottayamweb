import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Tv } from 'lucide-react';
import API from '../../api/api';

export default function ManageMedia() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    source: '',
    type: 'news',
    link: '',
    publishDate: '',
    excerpt: '',
    isPublished: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/media', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setMedia(data.data || []);
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `http://localhost:5000/api/media/${editingItem.id}`
        : 'http://localhost:5000/api/media';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchMedia();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving media:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this media?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/media/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchMedia();
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      source: '',
      type: 'news',
      link: '',
      publishDate: '',
      excerpt: '',
      isPublished: true,
      isFeatured: false
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      source: item.source,
      type: item.type,
      link: item.link || '',
      publishDate: item.publishDate?.split('T')[0] || '',
      excerpt: item.excerpt || '',
      isPublished: item.isPublished,
      isFeatured: item.isFeatured
    });
    setShowModal(true);
  };

  const filteredMedia = media.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Media</h1>
          <p className="text-gray-600 mt-1">Manage media coverage and press releases</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Media
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Tv className="h-5 w-5" style={{ color: API.color1 }} />
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                    {item.type}
                  </span>
                  {item.isFeatured && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{item.excerpt}</p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Source: {item.source}</span>
                  <span>Published: {new Date(item.publishDate).toLocaleDateString()}</span>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Link →
                    </a>
                  )}
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => openEditModal(item)} className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredMedia.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            No media found
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Media' : 'Add Media'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source *</label>
                  <input
                    type="text"
                    required
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="news">News</option>
                    <option value="video">Video</option>
                    <option value="article">Article</option>
                    <option value="press-release">Press Release</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
                <textarea
                  rows="3"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.publishDate}
                    onChange={(e) => setFormData({...formData, publishDate: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                  <input
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({...formData, link: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
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

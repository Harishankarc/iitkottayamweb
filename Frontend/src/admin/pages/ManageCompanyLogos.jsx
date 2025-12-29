import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

export default function ManageCompanyLogos() {
  const [logos, setLogos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    link: '',
    category: 'partner',
    displayOrder: 0,
    isActive: true,
    isFeatured: false
  });

  useEffect(() => {
    fetchLogos();
  }, []);

  const fetchLogos = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/company-logos', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setLogos(data.data || []);
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
        ? `http://localhost:5000/api/company-logos/${editingItem.id}`
        : 'http://localhost:5000/api/company-logos';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchLogos();
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
      await fetch(`http://localhost:5000/api/company-logos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchLogos();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      logo: '',
      link: '',
      category: 'partner',
      displayOrder: 0,
      isActive: true,
      isFeatured: false
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const filteredLogos = logos.filter(logo =>
    logo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage Company Logos</h1>
          <p className="text-gray-600 text-sm mt-1">Manage partner and company logos</p>
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
          Add Logo
        </button>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredLogos.map((logo) => (
            <div key={logo.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-center mb-3">
                <img src={API.getImageUrl(logo.logo)} alt={logo.name} className="h-20 object-contain" />
              </div>
              <h3 className="font-bold text-center">{logo.name}</h3>
              <p className="text-sm text-gray-600 text-center capitalize">{logo.category}</p>
              <div className="flex gap-2 mt-3 justify-center">
                <button onClick={() => openEditModal(logo)} className="text-blue-600">
                  <Edit className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(logo.id)} className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: API.color1 }}>
                {editingItem ? 'Edit Logo' : 'Add Logo'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                  </div>
                  <ImageUploader
                    value={formData.logo}
                    onChange={(url) => setFormData({ ...formData, logo: url })}
                    label="Company Logo"
                    folder="companies"
                    required
                    aspectRatio="16/9"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Website Link</label>
                    <input type="text" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                      <option value="incubation">Incubation</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="placement">Placement</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="mr-2" />
                      <span className="text-sm">Active</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="mr-2" />
                      <span className="text-sm">Featured</span>
                    </label>
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

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Briefcase } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

export default function ManagePlacements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    academicYear: '2024-25',
    companyName: '',
    companyLogo: '',
    sector: '',
    role: '',
    package: '',
    studentsPlaced: '',
    visitDate: '',
    description: '',
    isPublished: true
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/placements', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setPlacements(data.data || []);
    } catch (error) {
      console.error('Error fetching placements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `http://localhost:5000/api/placements/${editingItem.id}`
        : 'http://localhost:5000/api/placements';
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPlacements();
        setShowModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving placement:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this placement record?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost:5000/api/placements/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchPlacements();
    } catch (error) {
      console.error('Error deleting placement:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      academicYear: '2024-25',
      companyName: '',
      sector: '',
      role: '',
      package: '',
      studentsPlaced: '',
      visitDate: '',
      description: '',
      isPublished: true
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      academicYear: item.academicYear,
      companyName: item.companyName,
      sector: item.sector || '',
      role: item.role,
      package: item.package,
      studentsPlaced: item.studentsPlaced,
      visitDate: item.visitDate?.split('T')[0] || '',
      description: item.description || '',
      isPublished: item.isPublished
    });
    setShowModal(true);
  };

  const filteredPlacements = placements.filter(item =>
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Placements</h1>
          <p className="text-gray-600 mt-1">Track company placements and recruitments</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Placement
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlacements.map((placement) => (
          <div key={placement.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <Briefcase className="h-6 w-6 text-green-600" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(placement)} className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(placement.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{placement.companyName}</h3>
              <p className="text-sm text-gray-600 mb-1">{placement.role}</p>
              <p className="text-xs text-gray-500 mb-4">{placement.sector}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Package:</span>
                  <span className="font-bold" style={{ color: API.color1 }}>
                    ₹{placement.package} LPA
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Students Placed:</span>
                  <span className="font-semibold text-gray-900">{placement.studentsPlaced}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Academic Year:</span>
                  <span className="text-gray-900">{placement.academicYear}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Placement' : 'Add Placement'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sector</label>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <ImageUploader
                value={formData.companyLogo || ''}
                onChange={(url) => setFormData({...formData, companyLogo: url})}
                label="Company Logo"
                folder="placements"
                aspectRatio="16/9"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role *</label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Package (LPA) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.package}
                    onChange={(e) => setFormData({...formData, package: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Students Placed *</label>
                  <input
                    type="number"
                    required
                    value={formData.studentsPlaced}
                    onChange={(e) => setFormData({...formData, studentsPlaced: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                  <input
                    type="text"
                    required
                    placeholder="2024-25"
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
                <input
                  type="date"
                  value={formData.visitDate}
                  onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
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
                  Publish
                </label>
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

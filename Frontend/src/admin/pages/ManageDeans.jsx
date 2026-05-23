import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Mail, Phone } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RotatingDetails from '../../components/RotatingDetails';

export default function ManageDeans() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    email: '',
    phone: '',
    photo: '',
    qualification: '',
    specialization: '',
    experience: '',
    userType: 'deans',
    isActive: true
  });

  useEffect(() => {
    fetchPeople();
  }, []);

  // Temporary: capture unhandled promise rejections to aid debugging
  useEffect(() => {
    const handler = (event) => {
      console.error('Unhandled promise rejection (captured in ManageDeans):', event.reason);
    };
    window.addEventListener('unhandledrejection', handler);
    return () => window.removeEventListener('unhandledrejection', handler);
  }, []);

  const fetchPeople = async () => {
    try {
      const res = await API.get('/api/people/type/deans');
      console.log('fetchPeople result:', res);
      if (res && res.success) setPeople(Array.isArray(res.data) ? res.data : []);
      else setPeople([]);
    } catch (error) {
      console.error('Error fetching deans:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, userType: 'deans' };
      const result = editingItem ? await API.put(`/api/people/${editingItem.id}`, payload) : await API.post('/api/people', payload);
      console.log('ManageDeans save result:', result);
      if (!result || result.success === false) {
        const errMsg = (result && result.error) || 'Unknown error while saving dean';
        throw new Error(errMsg);
      }
      await fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving dean:', error);
      // Show a simple user alert so it's visible in the UI during debugging
      try { alert(`Failed to save dean: ${error.message || error}`); } catch (e) { /* ignore */ }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dean?')) return;

    try {
      await API.delete(`/api/people/${id}`);
      fetchPeople();
    } catch (error) {
      console.error('Error deleting dean:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      department: '',
      email: '',
      phone: '',
      photo: '',
      qualification: '',
      specialization: '',
      experience: '',
      userType: 'deans',
      isActive: true
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      designation: item.designation || '',
      department: item.department || '',
      email: item.email || '',
      phone: item.phone || '',
      photo: item.photo || '',
      qualification: item.qualification || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      userType: 'deans',
      isActive: item.isActive !== false
    });
    setShowModal(true);
  };

  const filteredPeople = people.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Deans</h1>
          <p className="text-gray-600 mt-1">Manage dean profiles and details</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Dean
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 bg-slate-100" style={{ borderColor: `${API.color1}33` }}>
                  <img
                    src={member.photo ? API.getImageUrl(member.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`; }}
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(member)} className="text-blue-600 hover:text-blue-900">
                    <Edit className="h-5 w-5" />
                  </button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.designation}</p>
              {member.department && <p className="text-sm font-medium" style={{ color: API.color1 }}>{member.department}</p>}
              <div className="mt-4 space-y-2">
                </div>
              <div className="mt-4">
                <RotatingDetails person={member} color1={API.color1} darkMode={false} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Dean' : 'Add Dean'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <input type="text" required value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input type="text" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <input type="text" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                <input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <ImageUploader value={formData.photo || ''} onChange={(url) => setFormData({ ...formData, photo: url })} label="Dean Photo" folder="people" />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} />
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" className="px-4 py-2 text-white rounded-lg" style={{ backgroundColor: API.color1 }}>{editingItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
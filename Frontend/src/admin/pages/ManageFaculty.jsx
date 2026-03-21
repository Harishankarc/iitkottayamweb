import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

const normalizeEmail = (value) => {
  if (typeof value !== 'string') return value;

  const email = value
    .trim()
    .replace(/\s*(?:\(|\[)?at(?:\)|\])?\s*/gi, '@')
    .replace(/\s*(?:\(|\[)?dot(?:\)|\])?\s*/gi, '.')
    .replace(/\s+/g, '')
    .toLowerCase();

  return email;
};

const textToList = (value) => {
  if (!value || typeof value !== 'string') return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  if (trimmed.includes('\n')) {
    return trimmed.split('\n').map(item => item.trim()).filter(Boolean);
  }
  return trimmed.split(',').map(item => item.trim()).filter(Boolean);
};

const toDetailArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // Fall back to comma-separated values.
    }
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export default function ManageFaculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: 'General',
    email: '',
    phone: '',
    photo: '',
    qualification: '',
    specialization: '',
    experience: '',
    researchInterests: '',
    publications: '',
    googleScholar: '',
    linkedIn: '',
    researchGate: '',
    bottomImageDetails: '',
    rightSideDetails: '',
    isActive: true
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setFetchError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/faculty`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to load faculty data');
      }
      const data = await response.json();
      setFaculty(data.data || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setFaculty([]);
      setFetchError(error.message || 'Unable to load faculty data. Check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem 
        ? `${API.baseURL}/api/faculty/${editingItem.id}`
        : `${API.baseURL}/api/faculty`;

      // Only send fields that are editable in the current admin form.
      const payload = {
        name: formData.name,
        designation: formData.designation,
        department: formData.department?.trim() || 'General',
        photo: formData.photo || '',
        bottomImageDetails: textToList(formData.bottomImageDetails),
        rightSideDetails: textToList(formData.rightSideDetails),
        isActive: !!formData.isActive
      };
      
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save faculty details');
      }

      fetchFaculty();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert(error.message || 'Unable to save faculty details');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API.baseURL}/api/faculty/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchFaculty();
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      department: 'General',
      email: '',
      phone: '',
      photo: '',
      qualification: '',
      specialization: '',
      experience: '',
      researchInterests: '',
      publications: '',
      googleScholar: '',
      linkedIn: '',
      researchGate: '',
      bottomImageDetails: '',
      rightSideDetails: '',
      isActive: true
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    const fallbackBottomDetails = [
      item.department ? `${item.department} Department` : '',
      item.phone || '',
      item.email || ''
    ].filter(Boolean);

    const interests = Array.isArray(item.researchInterests)
      ? item.researchInterests
      : toDetailArray(item.specialization || '');
    const fallbackRightDetails = [
      item.qualification || '',
      ...interests
    ].filter(Boolean);

    const resolvedBottomDetails = Array.isArray(item.bottomImageDetails)
      ? item.bottomImageDetails
      : toDetailArray(item.bottomImageDetails || '');
    const resolvedRightDetails = Array.isArray(item.rightSideDetails)
      ? item.rightSideDetails
      : toDetailArray(item.rightSideDetails || '');

    setEditingItem(item);
    setFormData({
      name: item.name,
      designation: item.designation,
      department: item.department || 'General',
      email: item.email || '',
      phone: item.phone || '',
      photo: item.photo || '',
      qualification: item.qualification || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      researchInterests: Array.isArray(item.researchInterests)
        ? item.researchInterests.join(', ')
        : (item.researchInterests || ''),
      publications: Array.isArray(item.publications)
        ? item.publications.join(', ')
        : (item.publications || ''),
      googleScholar: item.googleScholar || '',
      linkedIn: item.linkedIn || '',
      researchGate: item.researchGate || '',
      bottomImageDetails: (resolvedBottomDetails.length > 0 ? resolvedBottomDetails : fallbackBottomDetails).join('\n'),
      rightSideDetails: (resolvedRightDetails.length > 0 ? resolvedRightDetails : fallbackRightDetails).join('\n'),
      isActive: item.isActive
    });
    setShowModal(true);
  };

  const filteredFaculty = faculty.filter(item => {
    const term = searchTerm.toLowerCase();
    const name = (item?.name || '').toLowerCase();
    const department = (item?.department || '').toLowerCase();
    return name.includes(term) || department.includes(term);
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Manage Faculty</h1>
          <p className="text-gray-600 mt-1">Manage faculty members and profiles</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Faculty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      {fetchError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">
          {fetchError}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => {
          return (
            <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden border-2" style={{ borderColor: `${API.color1}33` }}>
                    <img
                      src={member.photo ? API.getImageUrl(member.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`;
                      }}
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
                <p className="text-sm font-medium" style={{ color: API.color1 }}>{member.department}</p>

                <div className="mt-4 border-t pt-3">
                  <p className="text-xs text-gray-500">Full profile details are available in Edit.</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Faculty' : 'Add Faculty'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <ImageUploader
                value={formData.photo || ''}
                onChange={(url) => { 
                  console.log('Selected Image URL:', url);
                  setFormData({...formData, photo: url})}}
                label="Faculty Photo"
                folder="faculty"
                aspectRatio="1/1"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Left Side Bottom Details</label>
                <p className="text-xs text-gray-500 mb-1">Use *Heading* on a line to create a heading.</p>
                <textarea
                  rows={4}
                  value={formData.bottomImageDetails}
                  onChange={(e) => setFormData({...formData, bottomImageDetails: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="*Contact*\nMathematics Department\n0123456789"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Right Side Full Details</label>
                <p className="text-xs text-gray-500 mb-1">Use *Heading* on a line to create a heading.</p>
                <textarea
                  rows={6}
                  value={formData.rightSideDetails}
                  onChange={(e) => setFormData({...formData, rightSideDetails: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="*Education*\nPh.D. in Mathematics\n*Research*\nApplied Mathematics\nOptimization"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="h-4 w-4 rounded"
                  style={{ accentColor: API.color1 }}
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
                  Active
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

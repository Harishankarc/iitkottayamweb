import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Mail, Phone } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RotatingDetails from '../../components/RotatingDetails';

export default function ManageAssociateDean() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showEmail2, setShowEmail2] = useState(false);
  const [showPhone2, setShowPhone2] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    email: '',
    email2: '',
    phone: '',
    phone2: '',
    photo: '',
    qualification: '',
    specialization: '',
    experience: '',
    userType: 'associate-dean',
    isActive: true
  });

  const [sortOrder, setSortOrder] = useState('newest');

  useEffect(() => {
    fetchPeople();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API.baseURL}/api/site-settings?category=associatedeans`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          setSortOrder(data.settings['associatedeans_sort']?.value || 'newest');
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSortOrderChange = async (value) => {
    setSortOrder(value);
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API.baseURL}/api/site-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          settingKey: 'associatedeans_sort',
          settingValue: value,
          settingType: 'text',
          category: 'associatedeans',
          description: 'Sort order for Associate Deans'
        })
      });
    } catch (err) {
      console.error('Error saving setting:', err);
    }
  };

  // Temporary: capture unhandled promise rejections to aid debugging
  useEffect(() => {
    const handler = (event) => {
      console.error('Unhandled promise rejection (captured in ManageAssociateDean):', event.reason);
    };
    window.addEventListener('unhandledrejection', handler);
    return () => window.removeEventListener('unhandledrejection', handler);
  }, []);

  const fetchPeople = async () => {
    try {
      const res = await API.get('/api/people/type/associate-dean');
      console.log('fetchPeople result:', res);
      if (res && res.success) setPeople(Array.isArray(res.data) ? res.data : []);
      else setPeople([]);
    } catch (error) {
      console.error('Error fetching associate deans:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const finalEmail = (showEmail2 && formData.email2)
        ? `${formData.email.trim()}, ${formData.email2.trim()}`
        : formData.email.trim();

      const finalPhone2 = showPhone2 ? formData.phone2 : '';

      const payload = {
        ...formData,
        email: finalEmail,
        phone2: finalPhone2,
        userType: 'associate-dean'
      };
      delete payload.email2;

      const result = editingItem ? await API.put(`/api/people/${editingItem.id}`, payload) : await API.post('/api/people', payload);
      console.log('ManageAssociateDean save result:', result);
      if (!result || result.success === false) {
        const errMsg = (result && result.error) || 'Unknown error while saving associate dean';
        throw new Error(errMsg);
      }
      await fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving associate dean:', error);
      try { alert(`Failed to save associate dean: ${error.message || error}`); } catch (e) { /* ignore */ }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this associate dean?')) return;

    try {
      await API.delete(`/api/people/${id}`);
      fetchPeople();
    } catch (error) {
      console.error('Error deleting associate dean:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      department: '',
      email: '',
      email2: '',
      phone: '',
      phone2: '',
      photo: '',
      qualification: '',
      specialization: '',
      experience: '',
      userType: 'associate-dean',
      isActive: true
    });
    setEditingItem(null);
    setShowEmail2(false);
    setShowPhone2(false);
  };

  const openEditModal = (item) => {
    setEditingItem(item);

    const emails = (item.email || '').split(',').map(e => e.trim());
    const email1 = emails[0] || '';
    const email2 = emails[1] || '';

    setFormData({
      name: item.name || '',
      designation: item.designation || '',
      department: item.department || '',
      email: email1,
      email2: email2,
      phone: item.phone || '',
      phone2: item.phone2 || '',
      photo: item.photo || '',
      qualification: item.qualification || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      userType: 'associate-dean',
      isActive: item.isActive !== false
    });
    setShowEmail2(!!email2);
    setShowPhone2(!!item.phone2);
    setShowModal(true);
  };

  const filteredPeople = people.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    return sortOrder === 'newest' ? b.id - a.id : a.id - b.id;
  });

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
          <h1 className="text-2xl font-bold text-gray-900">Manage Associate Deans</h1>
          <p className="text-gray-600 mt-1">Manage associate dean profiles and details</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Associate Dean
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search associate deans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Default Sort:</label>
          <select
            value={sortOrder}
            onChange={(e) => handleSortOrderChange(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-700 cursor-pointer shadow-sm"
          >
            <option value="newest">Last Added</option>
            <option value="oldest">First Added</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPeople.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative flex flex-col h-[300px]">
            <div className="p-6 flex flex-col flex-1 min-h-0 justify-between">
              <div>
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
                <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{member.name}</h3>
                <p className="text-sm text-gray-600 mb-2 truncate">{member.designation}</p>
                {member.department && <p className="text-sm font-medium truncate" style={{ color: API.color1 }}>{member.department}</p>}
              </div>
              <div className="mt-auto h-[120px] overflow-hidden pt-3 border-t border-gray-100">
                <RotatingDetails person={member} color1={API.color1} darkMode={false} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Associate Dean' : 'Add Associate Dean'}</h2>
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
                  {!showEmail2 && (
                    <button
                      type="button"
                      onClick={() => setShowEmail2(true)}
                      className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      + Add more email
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  {!showPhone2 && (
                    <button
                      type="button"
                      onClick={() => setShowPhone2(true)}
                      className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
                    >
                      + Add more phone
                    </button>
                  )}
                </div>
              </div>

              {(showEmail2 || showPhone2) && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    {showEmail2 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">Email 2</label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowEmail2(false);
                              setFormData(prev => ({ ...prev, email2: '' }));
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="email"
                          value={formData.email2}
                          onChange={(e) => setFormData(prev => ({ ...prev, email2: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {showPhone2 && (
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="block text-sm font-medium text-gray-700">Phone 2</label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowPhone2(false);
                              setFormData(prev => ({ ...prev, phone2: '' }));
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={formData.phone2}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone2: e.target.value }))}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <textarea
                    rows="3"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    onPaste={(e) => {
                      setTimeout(() => {
                        setFormData(prev => ({ ...prev, qualification: e.target.value }));
                      }, 0);
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                  <textarea
                    rows="3"
                    value={formData.specialization}
                    onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                    onPaste={(e) => {
                      setTimeout(() => {
                        setFormData(prev => ({ ...prev, specialization: e.target.value }));
                      }, 0);
                    }}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
                <input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <ImageUploader value={formData.photo || ''} onChange={(url) => setFormData({ ...formData, photo: url })} label="Associate Dean Photo" folder="people" />
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

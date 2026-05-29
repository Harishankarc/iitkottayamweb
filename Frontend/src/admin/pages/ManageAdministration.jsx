import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Mail, Phone, Settings } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

export default function ManageAdministration() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsData, setSettingsData] = useState({
    badge: 'Administration Team',
    title: 'Administration',
    description: 'Our dedicated administrative team ensures smooth operations and institutional excellence.'
  });
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    phone2: '',
    photo: '',
    experience: '', // Room No
    category: '',
    userType: 'administration',
    isActive: true,
    // department: '',
    // qualification: '',
    // specialization: ''
  });

  useEffect(() => {
    fetchPeople();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const responses = await Promise.all([
        fetch(`${API.baseURL}/api/site-settings/admin_badge`),
        fetch(`${API.baseURL}/api/site-settings/admin_title`),
        fetch(`${API.baseURL}/api/site-settings/admin_description`)
      ]);
      
      const [badgeRes, titleRes, descRes] = await Promise.all(
        responses.map(r => r.json())
      );
      
      setSettingsData({
        badge: badgeRes.data?.settingValue || 'Administration Team',
        title: titleRes.data?.settingValue || 'Administration',
        description: descRes.data?.settingValue || 'Our dedicated administrative team ensures smooth operations and institutional excellence.'
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const results = await Promise.all([
        API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: 'admin_badge',
            settingValue: settingsData.badge,
            settingType: 'text',
            category: 'administration'
          })
        }),
        API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: 'admin_title',
            settingValue: settingsData.title,
            settingType: 'text',
            category: 'administration'
          })
        }),
        API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: 'admin_description',
            settingValue: settingsData.description,
            settingType: 'text',
            category: 'administration'
          })
        })
      ]);
      
      for (const result of results) {
        if (!result.success) {
          throw new Error(result.error || 'Failed to save setting');
        }
      }
      
      setShowSettingsModal(false);
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings: ' + error.message);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${API.baseURL}/api/people/type/administration`);
      const data = await response.json();
      console.log('Admin API Response:', data);
      
      if (data.success && data.data && Array.isArray(data.data)) {
        setPeople(data.data);
      } else {
        console.error('Invalid response format:', data);
        setPeople([]);
      }
    } catch (error) {
      console.error('Error fetching administration:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to send - category is stored in specialization for this model
      const submitData = {
        ...formData,
        specialization: formData.category // category is mapped to specialization in the backend
        // department: formData.department,
        // qualification: formData.qualification,
      };
      delete submitData.category;
      
      if (editingItem) {
        await API.put(`/api/people/${editingItem.id}`, submitData);
      } else {
        await API.post('/api/people', submitData);
      }
      fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving administration:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    
    try {
      await API.delete(`/api/people/${id}`);
      fetchPeople();
    } catch (error) {
      console.error('Error deleting administration:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      email: '',
      phone: '',
      phone2: '',
      photo: '',
      experience: '', // Room No
      category: '',
      userType: 'administration',
      isActive: true,
      // department: '',
      // qualification: '',
      // specialization: ''
    });
    setEditingItem(null);
  };

  // Helper function to get category
  const getCategory = (person) => {
    const spec = person.specialization ? String(person.specialization).trim() : '';
    if (spec === 'fac-in-charge' || spec === 'FAC-IN-CHARGE') {
      return 'fac-in-charge';
    } else if (spec === 'support' || spec === 'Support' || spec === 'SUPPORT') {
      return 'support';
    }
    return 'general';
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    // Determine category from specialization if it matches known values
    let category = '';
    if (item.specialization === 'fac-in-charge' || item.specialization === 'FAC-IN-CHARGE') {
      category = 'fac-in-charge';
    } else if (item.specialization === 'support' || item.specialization === 'Support' || item.specialization === 'SUPPORT') {
      category = 'support';
    }
    
    setFormData({
      name: item.name,
      designation: item.designation,
      email: item.email || '',
      phone: item.phone || '',
      phone2: item.phone2 || '',
      photo: item.photo || '',
      experience: item.experience || item.room || item.qualification || '',
      category,
      userType: 'administration',
      isActive: item.isActive,
      // department: item.department || '',
      // qualification: item.qualification || '',
      // specialization: item.specialization || ''
    });
    setShowModal(true);
  };

  const filteredPeople = people.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || getCategory(item) === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Administration</h1>
          <p className="text-gray-600 mt-1">Manage administration members and profiles</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettingsModal(true)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="h-5 w-5 mr-2" />
            Settings
          </button>
          <button
            onClick={() => { resetForm(); setShowModal(true); }}
            className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
            style={{ backgroundColor: API.color1 }}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Member
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Filter Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none transition-all"
              style={{ focusRingColor: API.color1 }}
            >
              <option value="all">All Categories</option>
              <option value="general">General Administration</option>
              <option value="fac-in-charge">FAC-IN-CHARGE</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search administration..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-600">
        Showing <span className="font-semibold">{filteredPeople.length}</span> of <span className="font-semibold">{people.length}</span> members
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative">
            {member.isHardcoded && (
              <div className="absolute top-2 right-2 z-10">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  System Data
                </span>
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                     style={{ backgroundColor: API.color1 }}>
                  {member.name.charAt(0)}
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => openEditModal(member)} 
                    className={`${member.isHardcoded ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-900'}`}
                    title={member.isHardcoded ? 'Cannot edit system data' : 'Edit'}
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleDelete(member.id)} 
                    className={`${member.isHardcoded ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                    title={member.isHardcoded ? 'Cannot delete system data' : 'Delete'}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.designation}</p>
              {member.category && (
                <p className="text-sm font-medium mb-3" style={{ color: API.color1 }}>{member.category}</p>
              )}
              <div className="mt-4 space-y-3 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-green-600">Email</p>
                  <p className="break-all">{member.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">Phone</p>
                  <p>{member.phone || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">Phone 2</p>
                  <p>{member.phone2 || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-semibold text-green-600">Room No</p>
                  <p>{member.experience || member.room || 'N/A'}</p>
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Administration Member' : 'Add Administration Member'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              {/*
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone 2</label>
                  <input
                    type="tel"
                    value={formData.phone2}
                    onChange={(e) => setFormData({...formData, phone2: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <ImageUploader
                value={formData.photo || ''}
                onChange={(url) => setFormData({...formData, photo: url})}
                label="Photo"
                folder="people"
                aspectRatio="1/1"
              />
              {/*
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room No:</label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              {/*
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Finance, HR, IT Infrastructure"
                />
              </div>
              */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:outline-none"
                >
                  <option value="">General Administration</option>
                  <option value="fac-in-charge">FAC-IN-CHARGE</option>
                  <option value="support">Support</option>
                </select>
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

      {showSettingsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Badge</label>
                <input
                  type="text"
                  value={settingsData.badge}
                  onChange={(e) => setSettingsData({...settingsData, badge: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={settingsData.title}
                  onChange={(e) => setSettingsData({...settingsData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={settingsData.description}
                  onChange={(e) => setSettingsData({...settingsData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90"
                  style={{ backgroundColor: API.color1 }}
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

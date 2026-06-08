import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Mail, Phone, Settings } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RotatingDetails from '../../components/RotatingDetails';

export default function ManageHOD() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showEmail2, setShowEmail2] = useState(false);
  const [showPhone2, setShowPhone2] = useState(false);
  const [settingsData, setSettingsData] = useState({
    badge: 'Leadership & Faculty',
    title: 'Head of Departments',
    description: 'Visionary leaders guiding their departments towards academic excellence and innovation.'
  });
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    email: '',
    email2: '',
    phone: '',
    phone2: '',
    photo: '',
    experience: '',
    userType: 'hod',
    isActive: true
  });
  // Separate state for qualification and specialization to avoid stale-closure resets
  const [qualification, setQualification] = useState('');
  const [specialization, setSpecialization] = useState('');

  useEffect(() => {
    fetchPeople();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const responses = await Promise.all([
        fetch(`${API.baseURL}/api/site-settings/hod_badge`),
        fetch(`${API.baseURL}/api/site-settings/hod_title`),
        fetch(`${API.baseURL}/api/site-settings/hod_description`)
      ]);
      
      const [badgeRes, titleRes, descRes] = await Promise.all(
        responses.map(r => r.json())
      );
      
      setSettingsData({
        badge: badgeRes.data?.settingValue || 'Leadership & Faculty',
        title: titleRes.data?.settingValue || 'Head of Departments',
        description: descRes.data?.settingValue || 'Visionary leaders guiding their departments towards academic excellence and innovation.'
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
            settingKey: 'hod_badge',
            settingValue: settingsData.badge,
            settingType: 'text',
            category: 'hod'
          })
        }),
        API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: 'hod_title',
            settingValue: settingsData.title,
            settingType: 'text',
            category: 'hod'
          })
        }),
        API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: 'hod_description',
            settingValue: settingsData.description,
            settingType: 'text',
            category: 'hod'
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
      const response = await fetch(`${API.baseURL}/api/people/type/hod?t=${Date.now()}`);
      const data = await response.json();
      console.log('👥 Admin HOD API Response:', data);
      
      if (data.success && data.data && Array.isArray(data.data)) {
        console.log(`📋 Loaded ${data.data.length} HOD records`);
        data.data.forEach(hod => {
          console.log(`  - ${hod.name}: photo="${hod.photo || 'NOT SET'}"`);
        });
        setPeople(data.data);
      } else {
        console.error('❌ Invalid response format:', data);
        setPeople([]);
      }
    } catch (error) {
      console.error('❌ Error fetching HOD:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Combine email and email2
      const finalEmail = (showEmail2 && formData.email2) 
        ? `${formData.email.trim()}, ${formData.email2.trim()}`
        : formData.email.trim();

      const finalPhone2 = showPhone2 ? formData.phone2 : '';

      const submitData = {
        ...formData,
        email: finalEmail,
        phone2: finalPhone2,
        qualification: qualification,
        specialization: specialization
      };
      delete submitData.email2;

      let result;
      if (editingItem) {
        result = await API.put(`/api/people/${editingItem.id}`, submitData);
      } else {
        result = await API.post('/api/people', submitData);
      }

      if (!result || !result.success) {
        const errMsg = result?.error || result?.message || 'Unknown error';
        console.error('❌ Save failed:', errMsg);
        // If authentication failed, prompt user to log in again
        if (errMsg.includes('401') || errMsg.includes('Authentication') || errMsg.includes('authorized') || errMsg.includes('expired')) {
          alert('Your session has expired. Please log out and log in again to save changes.');
        } else {
          alert(`Failed to save HOD: ${errMsg}`);
        }
        return;
      }

      console.log('✅ HOD saved successfully');
      await fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('❌ Error saving HOD:', error);
      alert(`Error saving HOD: ${error.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this HOD?')) return;
    
    try {
      const result = await API.delete(`/api/people/${id}`);
      if (!result || !result.success) {
        const errMsg = result?.error || result?.message || 'Unknown error';
        if (errMsg.includes('Authentication') || errMsg.includes('401') || errMsg.includes('authorized') || errMsg.includes('expired')) {
          alert('Your session has expired. Please log out and log in again.');
        } else {
          alert(`Failed to delete HOD: ${errMsg}`);
        }
        return;
      }
      await fetchPeople();
    } catch (error) {
      console.error('Error deleting HOD:', error);
      alert(`Error deleting HOD: ${error.message}`);
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
      experience: '',
      userType: 'hod',
      isActive: true
    });
    setQualification('');
    setSpecialization('');
    setEditingItem(null);
    setShowEmail2(false);
    setShowPhone2(false);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    
    // Split email if it contains a comma
    const emails = (item.email || '').split(',').map(e => e.trim());
    const email1 = emails[0] || '';
    const email2 = emails[1] || '';

    setFormData({
      name: item.name,
      designation: item.designation,
      department: item.department || '',
      email: email1,
      email2: email2,
      phone: item.phone || '',
      phone2: item.phone2 || '',
      photo: item.photo || '',
      experience: item.experience || '',
      userType: 'hod',
      isActive: item.isActive
    });
    setQualification(item.qualification || '');
    setSpecialization(item.specialization || '');
    
    setShowEmail2(!!email2);
    setShowPhone2(!!item.phone2);
    setShowModal(true);
  };

  const filteredPeople = people.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.department && item.department.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <h1 className="text-2xl font-bold text-gray-900">Manage Head of Department</h1>
          <p className="text-gray-600 mt-1">Manage department heads and profiles</p>
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
            Add HOD
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search HOD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {filteredPeople.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow h-[280px] flex flex-col">
            <div className="p-6 flex flex-col flex-1 overflow-hidden">
              <div className="flex justify-between items-start mb-4 flex-shrink-0">
                <div className="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                     style={{ backgroundColor: API.color1 }}>
                  {member.name.charAt(0)}
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
              <h3 className="text-lg font-bold text-gray-900 mb-1 truncate flex-shrink-0">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-1 truncate flex-shrink-0">{member.designation}</p>
              {member.department && (
                <p className="text-sm font-medium mb-2 truncate flex-shrink-0" style={{ color: API.color1 }}>{member.department}</p>
              )}
              <div className="mt-auto overflow-hidden">
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
              <h2 className="text-xl font-bold">{editingItem ? 'Edit HOD' : 'Add HOD'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData(prev => ({...prev, designation: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({...prev, department: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone 1</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
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
                              setFormData(prev => ({...prev, email2: ''}));
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="email"
                          value={formData.email2}
                          onChange={(e) => setFormData(prev => ({...prev, email2: e.target.value}))}
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
                              setFormData(prev => ({...prev, phone2: ''}));
                            }}
                            className="text-xs text-red-600 hover:text-red-800 font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="tel"
                          value={formData.phone2}
                          onChange={(e) => setFormData(prev => ({...prev, phone2: e.target.value}))}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <ImageUploader
                value={formData.photo || ''}
                onChange={(url) => setFormData(prev => ({...prev, photo: url}))}
                label="Photo"
                folder="people"
                aspectRatio="1/1"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData(prev => ({...prev, experience: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Room No: AB 208"
                />
              </div>
              {/* Qualification field - commented out
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                <textarea
                  required
                  rows="4"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  onPaste={(e) => {
                    const target = e.target;
                    setTimeout(() => setQualification(target.value), 0);
                  }}
                  className="w-full px-3 py-2 border rounded-lg resize-y"
                  placeholder="Enter qualifications (use Enter for newlines)"
                />
              </div>
              */}
              {/* Specialization field - commented out
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <textarea
                  rows="4"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  onPaste={(e) => {
                    const target = e.target;
                    setTimeout(() => setSpecialization(target.value), 0);
                  }}
                  className="w-full px-3 py-2 border rounded-lg resize-y"
                  placeholder="Enter specializations (use Enter for newlines)"
                />
              </div>
              */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData(prev => ({...prev, isActive: e.target.checked}))}
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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

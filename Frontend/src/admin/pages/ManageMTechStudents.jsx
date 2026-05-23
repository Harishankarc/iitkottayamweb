import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Settings } from 'lucide-react';
import API from '../../api/api';

export default function ManageMTechStudents() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [createCustomYear, setCreateCustomYear] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [settingsData, setSettingsData] = useState({
    badge: 'Postgraduate Studies',
    title: 'M.Tech Students',
    description: 'Advanced learners pursuing specialized knowledge in technology.'
  });
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    userType: 'mtech-students',
    isActive: true
  });

  useEffect(() => {
    fetchPeople();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const responses = await Promise.all([
        fetch(`${API.baseURL}/api/site-settings/mtech_badge`),
        fetch(`${API.baseURL}/api/site-settings/mtech_title`),
        fetch(`${API.baseURL}/api/site-settings/mtech_description`)
      ]);
      
      const [badgeRes, titleRes, descRes] = await Promise.all(
        responses.map(r => r.json())
      );
      
      setSettingsData({
        badge: badgeRes.data?.settingValue || 'Postgraduate Studies',
        title: titleRes.data?.settingValue || 'M.Tech Students',
        description: descRes.data?.settingValue || 'Advanced learners pursuing specialized knowledge in technology.'
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${API.baseURL}/api/people/type/mtech-students`);
      const data = await response.json();
      console.log('M.Tech Students API Response:', data);
      if (data.success && data.data && Array.isArray(data.data)) {
        setPeople(data.data);
      } else {
        console.error('Invalid response format:', data);
        setPeople([]);
      }
    } catch (error) {
      console.error('Error fetching M.Tech students:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        designation: 'M.Tech Student'
      };
      if (editingItem) {
        await API.put(`/api/people/${editingItem.id}`, submitData);
      } else {
        await API.post('/api/people', submitData);
      }
      fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving M.Tech student:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    
    try {
      await API.delete(`/api/people/${id}`);
      fetchPeople();
    } catch (error) {
      console.error('Error deleting M.Tech student:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      const settingsToSave = [
        { key: 'mtech_badge', value: settingsData.badge },
        { key: 'mtech_title', value: settingsData.title },
        { key: 'mtech_description', value: settingsData.description }
      ];

      for (const setting of settingsToSave) {
        const result = await API.fetchWithRetry(`${API.baseURL}/api/site-settings`, {
          method: 'POST',
          headers: API.getAuthHeaders(),
          body: JSON.stringify({
            settingKey: setting.key,
            settingValue: setting.value,
            settingType: 'text',
            category: 'mtech-students'
          })
        });
        
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

  const resetForm = () => {
    setFormData({
      name: '',
      department: '',
      userType: 'mtech-students',
      isActive: true
    });
    setEditingItem(null);
    setCreateCustomYear(false);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    const predefinedYears = Array.from({ length: 6 }, (_, i) => String(2019 + i));
    const isCustomYear = item.department && !predefinedYears.includes(String(item.department));
    setFormData({
      name: item.name,
      department: item.department || '',
      userType: 'mtech-students',
      isActive: item.isActive
    });
    setCreateCustomYear(isCustomYear);
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
          <h1 className="text-2xl font-bold text-gray-900">Manage M.Tech Students</h1>
          <p className="text-gray-600 mt-1">Manage M.Tech students and profiles</p>
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
            Add Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search M.Tech students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPeople.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
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
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              {member.department && (
                <p className="text-sm font-semibold" style={{ color: API.color1 }}>Year: {member.department}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit M.Tech Student' : 'Add M.Tech Student'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-3">Year *</label>
                
                {/* Toggle between dropdown and custom year */}
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={!createCustomYear}
                      onChange={() => {
                        setCreateCustomYear(false);
                        setFormData({...formData, department: ''});
                      }}
                      className="h-4 w-4"
                      style={{ accentColor: API.color1 }}
                    />
                    <span className="ml-2 text-sm text-gray-700">Select from list</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={createCustomYear}
                      onChange={() => setCreateCustomYear(true)}
                      className="h-4 w-4"
                      style={{ accentColor: API.color1 }}
                    />
                    <span className="ml-2 text-sm text-gray-700">Create new year</span>
                  </label>
                </div>

                {/* Dropdown or Custom Input */}
                {!createCustomYear ? (
                  <select
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Year</option>
                    {Array.from({ length: 6 }, (_, i) => String(2019 + i)).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    required
                    placeholder="Enter year (e.g., 2024)"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    min="1900"
                    max="2100"
                  />
                )}
              </div>

              <div className="flex items-center mt-6">
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
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">M.Tech Page Settings</h2>
              <p className="text-gray-600 text-sm mt-1">Edit the header text displayed on the M.Tech Students page</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Text</label>
                <input
                  type="text"
                  value={settingsData.badge}
                  onChange={(e) => setSettingsData({...settingsData, badge: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Postgraduate Studies"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                <input
                  type="text"
                  value={settingsData.title}
                  onChange={(e) => setSettingsData({...settingsData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. M.Tech Students"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Description</label>
                <textarea
                  value={settingsData.description}
                  onChange={(e) => setSettingsData({...settingsData, description: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. Advanced learners pursuing specialized knowledge in technology."
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

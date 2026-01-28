import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { Plus, Edit2, Trash2, Save, X, Users, Home, Upload, Image as ImageIcon, Shield, Utensils } from 'lucide-react';
import ImageUploader from '../../admin/components/ImageUploader.jsx';

export default function HostelManagement() {
  const { darkMode } = useTheme();
  const color1 = API.color1;
  
  const [hostelData, setHostelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Wardens state
  const [wardens, setWardens] = useState([]);
  const [editingWarden, setEditingWarden] = useState(null);
  const [isAddingWarden, setIsAddingWarden] = useState(false);
  
  // Halls state
  const [halls, setHalls] = useState([]);
  const [editingHall, setEditingHall] = useState(null);
  const [isAddingHall, setIsAddingHall] = useState(false);

  // Mess Committee state
  const [messCommittee, setMessCommittee] = useState([]);
  const [editingMess, setEditingMess] = useState(null);
  const [isAddingMess, setIsAddingMess] = useState(false);

  // Services state
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState('');
  const [hostelCareTaker, setHostelCareTaker] = useState('');

  useEffect(() => {
    fetchHostelData();
  }, []);

  const fetchHostelData = async () => {
    try {
      const response = await API.get('/api/facilities/slug/hostel');
      const data = response.data.data || response.data;
      setHostelData(data);
      
      // Parse JSON fields
      setWardens(typeof data.wardens === 'string' ? JSON.parse(data.wardens) : data.wardens || []);
      setHalls(typeof data.halls === 'string' ? JSON.parse(data.halls) : data.halls || []);
      
      const customFields = typeof data.customFields === 'string' ? JSON.parse(data.customFields) : data.customFields || {};
      setMessCommittee(customFields.messCommittee || []);
      setServices(customFields.services || []);
      setHostelCareTaker(customFields.hostelCareTaker || '');
    } catch (error) {
      console.error('Error fetching hostel data:', error);
      alert('Failed to load hostel data');
    } finally {
      setLoading(false);
    }
  };

  const saveHostelData = async () => {
    try {
      setSaving(true);
      await API.put(`/api/facilities/${hostelData.id}`, {
        ...hostelData,
        wardens: JSON.stringify(wardens),
        halls: JSON.stringify(halls),
        customFields: JSON.stringify({
          messCommittee: messCommittee,
          services: services,
          hostelCareTaker: hostelCareTaker
        })
      });
      alert('Hostel data saved successfully!');
      fetchHostelData();
    } catch (error) {
      console.error('Error saving hostel data:', error);
      alert('Failed to save hostel data');
    } finally {
      setSaving(false);
    }
  };

  // Warden Management
  const addWarden = () => {
    const newWarden = {
      id: Date.now(),
      name: '',
      role: '',
      designation: '',
      gender: 'Male',
      phone: '',
      email: '',
      image: ''
    };
    setEditingWarden(newWarden);
    setIsAddingWarden(true);
  };

  const saveWarden = () => {
    console.log('Saving warden:', editingWarden);
    console.log('Is adding:', isAddingWarden);
    if (!editingWarden.name || !editingWarden.role) {
      alert('Please fill in all required fields (Name and Role)');
      return;
    }
    if (isAddingWarden) {
      const updatedWardens = [...wardens, editingWarden];
      console.log('Updated wardens:', updatedWardens);
      setWardens(updatedWardens);
    } else {
      setWardens(wardens.map(w => w.id === editingWarden.id ? editingWarden : w));
    }
    setEditingWarden(null);
    setIsAddingWarden(false);
  };

  const deleteWarden = (id) => {
    if (confirm('Are you sure you want to delete this warden?')) {
      setWardens(wardens.filter(w => w.id !== id));
    }
  };

  const cancelWardenEdit = () => {
    setEditingWarden(null);
    setIsAddingWarden(false);
  };

  // Hall Management
  const addHall = () => {
    const newHall = {
      id: Date.now(),
      name: '',
      gender: 'Boys',
      wardenType: '',
      contact: '',
      email: ''
    };
    setEditingHall(newHall);
    setIsAddingHall(true);
  };

  const saveHall = () => {
    if (!editingHall.name) {
      alert('Please fill in the Hall Warden Name');
      return;
    }
    if (isAddingHall) {
      setHalls([...halls, editingHall]);
    } else {
      setHalls(halls.map(h => h.id === editingHall.id ? editingHall : h));
    }
    setEditingHall(null);
    setIsAddingHall(false);
  };

  const deleteHall = (id) => {
    if (confirm('Are you sure you want to delete this hall?')) {
      setHalls(halls.filter(h => h.id !== id));
    }
  };

  const cancelHallEdit = () => {
    setEditingHall(null);
    setIsAddingHall(false);
  };

  // Mess Committee Management
  const addMessMember = () => {
    const newMember = {
      id: Date.now(),
      name: '',
      role: '',
      phone: '',
      email: ''
    };
    setEditingMess(newMember);
    setIsAddingMess(true);
  };

  const saveMessMember = () => {
    if (!editingMess.name || !editingMess.role) {
      alert('Please fill in all required fields (Name and Role)');
      return;
    }
    if (isAddingMess) {
      setMessCommittee([...messCommittee, editingMess]);
    } else {
      setMessCommittee(messCommittee.map(m => m.id === editingMess.id ? editingMess : m));
    }
    setEditingMess(null);
    setIsAddingMess(false);
  };

  const deleteMessMember = (id) => {
    if (confirm('Are you sure you want to delete this member?')) {
      setMessCommittee(messCommittee.filter(m => m.id !== id));
    }
  };

  const cancelMessEdit = () => {
    setEditingMess(null);
    setIsAddingMess(false);
  };

  // Services Management
  const addService = () => {
    if (newService.trim()) {
      setServices([...services, newService]);
      setNewService('');
    }
  };

  const deleteService = (index) => {
    setServices(services.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: color1 }}></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Hostel Management
          </h1>
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            Manage hostel wardens, halls, and information
          </p>
        </div>

        {/* Save Button */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={saveHostelData}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg disabled:opacity-50"
            style={{ backgroundColor: color1 }}
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {/* Hostel Administration Section */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6" style={{ color: color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Hostel Administration
              </h2>
            </div>
            <button
              onClick={addWarden}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: color1 }}
            >
              <Plus className="w-4 h-4" />
              Add Warden
            </button>
          </div>

          {/* Wardens List */}
          <div className="space-y-4">
            {wardens.map((warden) => (
              <div
                key={warden.id}
                className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                {editingWarden?.id === warden.id ? (
                  <WardenForm
                    warden={editingWarden}
                    setWarden={setEditingWarden}
                    onSave={saveWarden}
                    onCancel={cancelWardenEdit}
                    darkMode={darkMode}
                    color1={color1}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex gap-4">
                      <img
                        src={warden.image || `https://placehold.co/80x80/e8f5f0/239244?text=${warden.name?.charAt(0) || 'W'}`}
                        alt={warden.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {warden.name}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {warden.role}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {warden.email} | {warden.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingWarden(warden)}
                        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteWarden(warden.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Warden Form */}
            {isAddingWarden && editingWarden && (
              <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <WardenForm
                  warden={editingWarden}
                  setWarden={setEditingWarden}
                  onSave={saveWarden}
                  onCancel={cancelWardenEdit}
                  darkMode={darkMode}
                  color1={color1}
                />
              </div>
            )}
          </div>
        </div>

        {/* Halls of Residence Section */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Home className="w-6 h-6" style={{ color: color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Halls of Residence
              </h2>
            </div>
            <button
              onClick={addHall}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: color1 }}
            >
              <Plus className="w-4 h-4" />
              Add Hall
            </button>
          </div>

          {/* Halls List */}
          <div className="space-y-4">
            {halls.map((hall) => (
              <div
                key={hall.id}
                className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                {editingHall?.id === hall.id ? (
                  <HallForm
                    hall={editingHall}
                    setHall={setEditingHall}
                    onSave={saveHall}
                    onCancel={cancelHallEdit}
                    darkMode={darkMode}
                    color1={color1}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {hall.name}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {hall.gender} | {hall.wardenType}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {hall.email} | {hall.contact}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingHall(hall)}
                        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteHall(hall.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Add New Hall Form */}
            {isAddingHall && editingHall && (
              <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <HallForm
                  hall={editingHall}
                  setHall={setEditingHall}
                  onSave={saveHall}
                  onCancel={cancelHallEdit}
                  darkMode={darkMode}
                  color1={color1}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mess Committee Section */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Utensils className="w-6 h-6" style={{ color: color1 }} />
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Mess Committee
              </h2>
            </div>
            <button
              onClick={addMessMember}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: color1 }}
            >
              <Plus className="w-4 h-4" />
              Add Member
            </button>
          </div>

          <div className="space-y-4">
            {messCommittee.map((member) => (
              <div
                key={member.id}
                className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              >
                {editingMess?.id === member.id ? (
                  <MessForm
                    member={editingMess}
                    setMember={setEditingMess}
                    onSave={saveMessMember}
                    onCancel={cancelMessEdit}
                    darkMode={darkMode}
                    color1={color1}
                  />
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {member.name}
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.role}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.email}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{member.phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setEditingMess(member)}
                        className="p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => deleteMessMember(member.id)}
                        className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isAddingMess && editingMess && (
              <div className={`p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <MessForm
                  member={editingMess}
                  setMember={setEditingMess}
                  onSave={saveMessMember}
                  onCancel={cancelMessEdit}
                  darkMode={darkMode}
                  color1={color1}
                />
              </div>
            )}
          </div>
        </div>

        {/* Services Available Section */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6" style={{ color: color1 }} />
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Services Available
            </h2>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} flex items-center justify-between`}
              >
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{service}</span>
                <button
                  onClick={() => deleteService(index)}
                  className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            ))}

            <div className="flex gap-2">
              <input
                type="text"
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addService()}
                placeholder="Add new service..."
                className={`flex-1 px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              />
              <button
                onClick={addService}
                className="px-4 py-2 rounded-lg text-white font-medium transition-all duration-300"
                style={{ backgroundColor: color1 }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Hostel Care Taker Info */}
        <div className={`mb-8 p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Hostel Care Taker Information
          </h2>
          <textarea
            value={hostelCareTaker}
            onChange={(e) => setHostelCareTaker(e.target.value)}
            placeholder="e.g., Anamudi Hostel (0482220 2126), Chittar Hostel (0482220 2296), Manimala Hostel Block A (0482220 2297)"
            rows={3}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>

        {/* Info Box */}
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-blue-900/20 border-blue-800' : 'bg-blue-50 border-blue-200'} border`}>
          <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-blue-800'}`}>
            <strong>Note:</strong> For managing hostel text content, facilities list, and images, please use the{' '}
            <a href="/admin/content" className="underline hover:no-underline">
              Unified Content Manager
            </a>{' '}
            and select "Hostel" page.
          </p>
        </div>
      </div>
    </div>
  );
}

// Warden Form Component
function WardenForm({ warden, setWarden, onSave, onCancel, darkMode, color1 }) {
  const handleImageUpload = (imageUrl) => {
    setWarden({ ...warden, image: imageUrl });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Name *
          </label>
          <input
            type="text"
            value={warden.name || ''}
            onChange={(e) => setWarden({ ...warden, name: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Role *
          </label>
          <input
            type="text"
            value={warden.role || ''}
            onChange={(e) => setWarden({ ...warden, role: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Designation
          </label>
          <input
            type="text"
            value={warden.designation || ''}
            onChange={(e) => setWarden({ ...warden, designation: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Gender
          </label>
          <select
            value={warden.gender || 'Male'}
            onChange={(e) => setWarden({ ...warden, gender: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone
          </label>
          <input
            type="text"
            value={warden.phone || ''}
            onChange={(e) => setWarden({ ...warden, phone: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            value={warden.email || ''}
            onChange={(e) => setWarden({ ...warden, email: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>
      
      <div>
        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Profile Image
        </label>
        <ImageUploader
          value={warden.image}
          onChange={handleImageUpload}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={() => {
            console.log('Cancel clicked');
            onCancel();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            console.log('Save clicked - calling onSave');
            onSave();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: color1 }}
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}

// Hall Form Component
function HallForm({ hall, setHall, onSave, onCancel, darkMode, color1 }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Hall Name *
          </label>
          <input
            type="text"
            value={hall.name}
            onChange={(e) => setHall({ ...hall, name: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            required
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Gender
          </label>
          <select
            value={hall.gender}
            onChange={(e) => setHall({ ...hall, gender: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          >
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Warden Type
          </label>
          <input
            type="text"
            value={hall.wardenType}
            onChange={(e) => setHall({ ...hall, wardenType: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            placeholder="e.g., Resident Warden, Assistant Warden"
          />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Contact
          </label>
          <input
            type="text"
            value={hall.contact}
            onChange={(e) => setHall({ ...hall, contact: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            placeholder="Phone number(s)"
          />
        </div>
        <div className="md:col-span-2">
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input
            type="email"
            value={hall.email}
            onChange={(e) => setHall({ ...hall, email: e.target.value })}
            className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <X className="w-4 h-4" />
          Cancel
        </button>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: color1 }}
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </div>
  );
}


// Mess Committee Form Component
function MessForm({ member, setMember, onSave, onCancel, darkMode, color1 }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Name *
          </label>
          <input type="text" value={member.name} onChange={(e) => setMember({ ...member, name: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} required />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Role *
          </label>
          <input type="text" value={member.role} onChange={(e) => setMember({ ...member, role: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} placeholder="e.g., Faculty In Charge(FIC) Mess Committee" required />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Phone
          </label>
          <input type="text" value={member.phone} onChange={(e) => setMember({ ...member, phone: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Email
          </label>
          <input type="email" value={member.email} onChange={(e) => setMember({ ...member, email: e.target.value })} className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`} />
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"><X className="w-4 h-4" /> Cancel</button>
        <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: color1 }}><Save className="w-4 h-4" /> Save</button>
      </div>
    </div>
  );
}

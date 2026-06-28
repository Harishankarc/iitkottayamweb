import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Megaphone } from 'lucide-react';
import API from '../../api/api';

export default function ManageAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    link: ''
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/announcements?limit=100');
      console.log('📡 Fetch Announcements Response:', response);
      if (response.success && Array.isArray(response.data)) {
        setAnnouncements(response.data);
      } else if (response.success && response.data?.data) {
        setAnnouncements(response.data.data);
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setAnnouncements([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('📝 Saving announcement:', formData);
      let response;
      
      const payload = {
        title: formData.title,
        message: formData.title, // map message to title to satisfy backend validation
        link: formData.link,
        type: editingItem?.type || 'info',
        priority: editingItem?.priority || 'medium',
        startDate: editingItem?.startDate || new Date().toISOString(),
        isActive: editingItem?.isActive !== undefined ? editingItem.isActive : true
      };

      if (editingItem) {
        response = await API.put(`/api/announcements/${editingItem.id}`, payload);
      } else {
        response = await API.post('/api/announcements', payload);
      }
      
      console.log('📤 Save Response:', response);
      
      if (response.success) {
        console.log('✅ Announcement saved successfully');
        await fetchAnnouncements();
        setShowModal(false);
        resetForm();
        alert('Announcement saved successfully!');
      } else {
        console.error('❌ Save failed:', response.error);
        alert('Failed to save announcement: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Error saving announcement: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      console.log('🗑️ Deleting announcement:', id);
      const response = await API.delete(`/api/announcements/${id}`);
      console.log('Delete Response:', response);
      
      if (response.success) {
        console.log('✅ Announcement deleted successfully');
        await fetchAnnouncements();
        alert('Announcement deleted successfully!');
      } else {
        console.error('❌ Delete failed:', response.error);
        alert('Failed to delete announcement');
      }
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Error deleting announcement');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      link: ''
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      link: item.link || ''
    });
    setShowModal(true);
  };

  const filteredAnnouncements = announcements.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeColor = (type) => {
    switch(type) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Manage Announcements</h1>
          <p className="text-gray-600 mt-1">Create and manage announcements</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Announcement
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map((announcement) => (
          <div key={announcement.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="h-5 w-5" style={{ color: API.color1 }} />
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(announcement.type)}`}>
                    {announcement.type}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    announcement.priority === 'high' ? 'bg-red-100 text-red-800' :
                    announcement.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.priority} priority
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    announcement.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {announcement.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{announcement.title}</h3>
                <p className="text-gray-600 mb-2">{announcement.message}</p>
                {announcement.link && (
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-gray-500 mr-2">Link:</span>
                    <a
                      href={announcement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline font-mono bg-blue-50/50 px-2 py-1 rounded border border-blue-100 inline-block"
                    >
                      🔗 {announcement.link}
                    </a>
                  </div>
                )}
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Start: {new Date(announcement.startDate).toLocaleDateString()}</span>
                  <span>End: {new Date(announcement.endDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex gap-2 ml-4">
                <button onClick={() => openEditModal(announcement)} className="text-blue-600 hover:text-blue-900">
                  <Edit className="h-5 w-5" />
                </button>
                <button onClick={() => handleDelete(announcement.id)} className="text-red-600 hover:text-red-900">
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {filteredAnnouncements.length === 0 && (
          <div className="text-center py-12 text-gray-500 bg-white rounded-lg">
            No announcements found
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Announcement' : 'Add Announcement'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Announcement *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter announcement text..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Redirection Link</label>
                <input
                  type="url"
                  placeholder="https://example.com/page"
                  value={formData.link}
                  onChange={(e) => setFormData({...formData, link: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                <p className="text-[10px] text-gray-500 mt-0.5">
                  💡 If set, clicking this announcement on the home page banner will open this link in a new tab.
                </p>
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

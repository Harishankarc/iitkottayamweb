import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Calendar, Image as ImageIcon } from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

export default function ManageUpcomingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    image: ''
  });

  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      setLoading(true);
      // Fetch events with category 'upcoming'
      const response = await API.get('/api/events?category=upcoming&limit=100');
      console.log('📡 Fetch Upcoming Events Response:', response);
      if (response.success && Array.isArray(response.data)) {
        setEvents(response.data);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Please upload an image for the event!');
      return;
    }
    
    try {
      console.log('📝 Saving upcoming event:', formData);
      let response;
      
      const payload = {
        title: formData.title,
        image: formData.image,
        category: 'upcoming',
        description: 'Upcoming Event at IIIT Kottayam', // satisfies backend non-null validation
        venue: 'Campus',
        startDate: editingItem?.startDate || new Date().toISOString(),
        isPublished: true
      };

      if (editingItem) {
        response = await API.put(`/api/events/${editingItem.id}`, payload);
      } else {
        response = await API.post('/api/events', payload);
      }
      
      console.log('📤 Save Response:', response);
      
      if (response.success) {
        alert('Event saved successfully!');
        await fetchUpcomingEvents();
        setShowModal(false);
        resetForm();
      } else {
        console.error('❌ Save failed:', response.error);
        alert('Failed to save event: ' + (response.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this upcoming event?')) return;
    
    try {
      console.log('🗑️ Deleting event:', id);
      const response = await API.delete(`/api/events/${id}`);
      console.log('Delete Response:', response);
      
      if (response.success) {
        alert('Event deleted successfully!');
        await fetchUpcomingEvents();
      } else {
        console.error('❌ Delete failed:', response.error);
        alert('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: ''
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      image: item.image || ''
    });
    setShowModal(true);
  };

  const filteredEvents = events.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Upcoming Events</h1>
          <p className="text-gray-600 mt-1">Create and manage homepage upcoming events carousel cards</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Upcoming Event
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2"
            style={{ focusRingColor: API.color1 }}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col group hover:shadow-md transition-shadow">
              <div className="h-44 bg-gray-100 relative overflow-hidden shrink-0">
                {event.image ? (
                  <img
                    src={API.getImageUrl(event.image)}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button 
                    onClick={() => openEditModal(event)} 
                    className="p-2 bg-white/90 hover:bg-white text-blue-600 rounded-lg shadow-sm hover:scale-105 transition-all"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(event.id)} 
                    className="p-2 bg-white/90 hover:bg-white text-red-600 rounded-lg shadow-sm hover:scale-105 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <h3 className="font-bold text-gray-800 line-clamp-2 text-sm h-10 mb-2 leading-tight">
                  {event.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{new Date(event.startDate || event.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
          {filteredEvents.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border">
              No upcoming events found. Click "Add Upcoming Event" to create one.
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-xl max-w-lg w-full shadow-xl overflow-hidden border">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-800">{editingItem ? 'Edit Upcoming Event' : 'Add Upcoming Event'}</h2>
              <button 
                onClick={() => { setShowModal(false); resetForm(); }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter upcoming event title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
                  style={{ focusRingColor: API.color1 }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Cover Photo *</label>
                <ImageUploader
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                  label="Upload Event Image"
                  folder="events"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Recommended size: <strong>600x280 pixels</strong> (Aspect Ratio <strong>approx. 2:1</strong>) for ideal fit in homepage slider.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => { setShowModal(false); resetForm(); }}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-700 font-medium text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-white rounded-lg hover:opacity-90 font-semibold text-sm transition-opacity"
                  style={{ backgroundColor: API.color1 }}
                >
                  {editingItem ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

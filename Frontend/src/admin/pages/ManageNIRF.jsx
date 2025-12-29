import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import API from '../../api/api';

export default function ManageNIRF() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    category: '',
    rank: '',
    change: 'same',
    previousRank: '',
    score: '',
    isPublished: true
  });

  useEffect(() => {
    fetchRankings();
  }, []);

  const fetchRankings = async () => {
    try {
      const result = await API.get('/api/nirf');
      if (result.success) {
        setRankings(result.data.data || []);
      } else {
        console.error('Error fetching rankings:', result.error);
        alert('Failed to load NIRF rankings. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load NIRF rankings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = editingItem 
        ? await API.put(`/api/nirf/${editingItem.id}`, formData)
        : await API.post('/api/nirf', formData);
      
      if (result.success) {
        fetchRankings();
        setShowModal(false);
        resetForm();
        alert(editingItem ? 'NIRF ranking updated successfully!' : 'NIRF ranking created successfully!');
      } else {
        alert('Failed to save NIRF ranking: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to save NIRF ranking. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const result = await API.delete(`/api/nirf/${id}`);
      if (result.success) {
        fetchRankings();
        alert('NIRF ranking deleted successfully!');
      } else {
        alert('Failed to delete NIRF ranking: ' + result.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to delete NIRF ranking. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      year: new Date().getFullYear(),
      category: '',
      rank: '',
      change: 'same',
      previousRank: '',
      score: '',
      isPublished: true
    });
    setEditingItem(null);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: API.color1 }}>Manage NIRF Rankings</h1>
          <p className="text-gray-600 text-sm mt-1">Manage NIRF ranking data</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2 text-white rounded-lg"
          style={{ backgroundColor: API.color1 }}
        >
          <Plus className="h-4 w-4" />
          Add Ranking
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: API.color1 }}></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead style={{ backgroundColor: API.color2 }}>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rankings.map((ranking) => (
                <tr key={ranking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ranking.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ranking.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{ranking.rank}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{ranking.change}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{ranking.score}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      ranking.isPublished ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {ranking.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(ranking)} className="text-blue-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(ranking.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4" style={{ color: API.color1 }}>
                {editingItem ? 'Edit Ranking' : 'Add Ranking'}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rank</label>
                      <input type="number" value={formData.rank} onChange={(e) => setFormData({ ...formData, rank: e.target.value })} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg" placeholder="e.g., Engineering, Overall" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Change</label>
                      <select value={formData.change} onChange={(e) => setFormData({ ...formData, change: e.target.value })} className="w-full px-3 py-2 border rounded-lg">
                        <option value="up">Up</option>
                        <option value="down">Down</option>
                        <option value="same">Same</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Previous Rank</label>
                      <input type="number" value={formData.previousRank} onChange={(e) => setFormData({ ...formData, previousRank: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Score</label>
                    <input type="number" step="0.01" value={formData.score} onChange={(e) => setFormData({ ...formData, score: e.target.value })} className="w-full px-3 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" checked={formData.isPublished} onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })} className="mr-2" />
                      <span className="text-sm">Published</span>
                    </label>
                  </div>
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className="px-4 py-2 text-white rounded-lg" style={{ backgroundColor: API.color1 }}>
                    {editingItem ? 'Update' : 'Create'}
                  </button>
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import API from '../../api/api';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

export default function ManageFdpPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [formData, setFormData] = useState({
    slNo: '',
    topic: '',
    programme: '',
    coordinator: '',
    startDate: '',
    endDate: '',
    brochureUrl: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/fdp-programs');
      setPrograms(response.data.data || []);
    } catch (error) {
      console.error('Error fetching FDP programs:', error);
      alert('Failed to fetch FDP programs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentProgram) {
        // Update existing
        await API.put(`/api/fdp-programs/${currentProgram.id}`, formData);
        alert('FDP program updated successfully');
      } else {
        // Create new
        await API.post('/api/fdp-programs', formData);
        alert('FDP program created successfully');
      }
      fetchPrograms();
      resetForm();
    } catch (error) {
      console.error('Error saving FDP program:', error);
      alert('Failed to save FDP program');
    }
  };

  const handleEdit = (program) => {
    setCurrentProgram(program);
    setFormData({
      slNo: program.slNo,
      topic: program.topic,
      programme: program.programme,
      coordinator: program.coordinator,
      startDate: program.startDate,
      endDate: program.endDate || '',
      brochureUrl: program.brochureUrl || ''
    });
    setEditMode(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this FDP program?')) return;
    
    try {
      await API.delete(`/api/fdp-programs/${id}`);
      alert('FDP program deleted successfully');
      fetchPrograms();
    } catch (error) {
      console.error('Error deleting FDP program:', error);
      alert('Failed to delete FDP program');
    }
  };

  const resetForm = () => {
    setCurrentProgram(null);
    setEditMode(false);
    setFormData({
      slNo: '',
      topic: '',
      programme: '',
      coordinator: '',
      startDate: '',
      endDate: '',
      brochureUrl: ''
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage FDP Programs</h1>
        <button
          onClick={() => setEditMode(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Program
        </button>
      </div>

      {/* Form Modal */}
      {editMode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {currentProgram ? 'Edit Program' : 'Add New Program'}
              </h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Serial Number *
                </label>
                <input
                  type="number"
                  name="slNo"
                  value={formData.slNo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Topic *
                </label>
                <textarea
                  name="topic"
                  value={formData.topic}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Programme Type *
                </label>
                <input
                  type="text"
                  name="programme"
                  value={formData.programme}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Workshop, FDP, International Conference"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coordinator *
                </label>
                <textarea
                  name="coordinator"
                  value={formData.coordinator}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brochure URL
                </label>
                <input
                  type="url"
                  name="brochureUrl"
                  value={formData.brochureUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/brochure.pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {currentProgram ? 'Update' : 'Create'} Program
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Programs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">SL.No</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Topic</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Programme</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {programs.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                  No FDP programs found. Click "Add New Program" to create one.
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">{program.slNo}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{program.topic}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{program.programme}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {new Date(program.startDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-4 text-sm text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEdit(program)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Total Programs: <span className="font-semibold">{programs.length}</span>
      </div>
    </div>
  );
}

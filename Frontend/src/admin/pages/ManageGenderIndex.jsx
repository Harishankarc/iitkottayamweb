import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Users } from 'lucide-react';
import API from '../../api/api';

export default function ManageGenderIndex() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    email: '',
    phone: '',
    photo: '',
    qualification: '',
    specialization: '',
    experience: '',
    userType: 'gender-index',
    isActive: true
  });

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${API.baseURL}/api/content-blocks/page/gender-index`);
      const data = await response.json();
      if (data.success && data.data) {
        // Convert ContentBlocks to a format compatible with the existing UI
        const tableBlock = data.data.find(block => block.blockType === 'table');
        if (tableBlock && tableBlock.content) {
          const tableData = typeof tableBlock.content === 'string' 
            ? JSON.parse(tableBlock.content) 
            : tableBlock.content;
          
          // Convert table rows to people-like format
          const convertedData = tableData.rows.map((row, index) => ({
            id: `row-${index}`,
            name: row[1] || 'Unknown', // Category column
            designation: row[0] || 'Unknown', // Gender column
            department: row[2] || '0', // Count column
            specialization: '',
            isActive: true
          }));
          setPeople(convertedData);
        }
      }
    } catch (error) {
      console.error('Error fetching gender index:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await API.put(`/people/${editingItem.id}`, formData);
      } else {
        await API.post('/people', formData);
      }
      fetchPeople();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving gender index entry:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      department: '',
      email: '',
      phone: '',
      photo: '',
      qualification: '',
      specialization: '',
      experience: '',
      userType: 'gender-index',
      isActive: true
    });
    setEditingItem(null);
  };

  const filteredPeople = people.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.designation && item.designation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate statistics
  const stats = {
    total: people.length,
    byCategory: people.reduce((acc, person) => {
      const cat = person.designation || 'Other';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
    }, {})
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
      {/* Notice Box */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Content Management Notice</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>
                Gender Index is now managed through <strong>Content Management &gt; Manage Pages</strong>. 
                To edit the gender statistics table, please go to Content Management section and select the "gender-index" page.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Gender Index</h1>
          <p className="text-gray-600 mt-1">Manage gender diversity statistics and data</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center px-4 py-2 text-white rounded-lg opacity-50 cursor-not-allowed"
          style={{ backgroundColor: API.color1 }}
          disabled
          title="Please use Content Management > Manage Pages to edit Gender Index"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Entry (Disabled)
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Entries</p>
              <h3 className="text-3xl font-bold mt-2" style={{ color: API.color1 }}>{stats.total}</h3>
            </div>
            <Users className="h-12 w-12 opacity-20" style={{ color: API.color1 }} />
          </div>
        </div>
        {Object.entries(stats.byCategory).slice(0, 2).map(([category, count]) => (
          <div key={category} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{category}</p>
                <h3 className="text-3xl font-bold mt-2" style={{ color: API.color1 }}>{count}</h3>
              </div>
              <Users className="h-12 w-12 opacity-20" style={{ color: API.color1 }} />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search gender index..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Count/Data
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPeople.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{item.designation}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold" style={{ color: API.color1 }}>{item.department || '-'}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">{item.specialization || '-'}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    disabled
                    className="text-gray-400 cursor-not-allowed mr-4"
                    title="Please use Content Management > Manage Pages"
                  >
                    <Edit className="h-5 w-5 inline" />
                  </button>
                  <button
                    disabled
                    className="text-gray-400 cursor-not-allowed"
                    title="Please use Content Management > Manage Pages"
                  >
                    <Trash2 className="h-5 w-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold">{editingItem ? 'Edit Gender Index Entry' : 'Add Gender Index Entry'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. Faculty, Students, Staff"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    required
                    value={formData.designation}
                    onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="">Select Type</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                    <option value="Total">Total</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Count/Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. 45, 120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Percentage (optional)</label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. 37.5%"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Details</label>
                <textarea
                  value={formData.specialization}
                  onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="3"
                  placeholder="Any additional information or notes"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g. 2024-2025"
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

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Users, TrendingUp } from 'lucide-react';
import API from '../../api/api';

export default function ManageGenderIndex() {
  const [contentBlocks, setContentBlocks] = useState([]);
  const [tableData, setTableData] = useState({ headers: [], rows: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    gender: 'Male',
    category: '',
    count: 0
  });

  useEffect(() => {
    fetchGenderIndex();
  }, []);

  const fetchGenderIndex = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API.baseURL}/api/content-blocks/page/gender-index`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setContentBlocks(data.data);
        
        // Find the table block
        const tableBlock = data.data.find(block => block.blockType === 'table');
        if (tableBlock && tableBlock.content) {
          const content = typeof tableBlock.content === 'string' 
            ? JSON.parse(tableBlock.content) 
            : tableBlock.content;
          setTableData(content);
        } else {
          // Initialize with default structure
          setTableData({
            headers: ['Gender', 'Category', 'Count'],
            rows: [
              ['Male', 'IIIT Kottayam', '0'],
              ['Female', 'IIIT Kottayam', '0'],
              ['Male', 'Professional & Technical', '0'],
              ['Female', 'Professional & Technical', '0']
            ]
          });
        }
      }
    } catch (error) {
      console.error('Error fetching gender index:', error);
      alert('Failed to load gender index data');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      // Find existing table block or create new one
      const tableBlock = contentBlocks.find(block => block.blockType === 'table');
      
      if (tableBlock) {
        // Update existing table block
        const response = await fetch(`${API.baseURL}/api/content-blocks/${tableBlock.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            blockId: tableBlock.blockId || 'gender-index-table',
            content: tableData
          })
        });
        
        const result = await response.json();
        if (result.success) {
          alert('Gender index updated successfully!');
          fetchGenderIndex();
        } else {
          throw new Error(result.error);
        }
      } else {
        // Create new table block
        const response = await fetch(`${API.baseURL}/api/content-blocks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            blockId: 'gender-index-table',
            pageName: 'gender-index',
            blockType: 'table',
            content: tableData,
            blockOrder: 1,
            isVisible: true
          })
        });
        
        const result = await response.json();
        if (result.success) {
          alert('Gender index created successfully!');
          fetchGenderIndex();
        } else {
          throw new Error(result.error);
        }
      }
    } catch (error) {
      console.error('Error saving gender index:', error);
      alert('Failed to save gender index: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddRow = () => {
    setFormData({
      gender: 'Male',
      category: '',
      count: 0
    });
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleEditRow = (index) => {
    const row = tableData.rows[index];
    setFormData({
      gender: row[0],
      category: row[1],
      count: parseInt(row[2]) || 0
    });
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDeleteRow = (index) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const newRows = tableData.rows.filter((_, i) => i !== index);
      setTableData({ ...tableData, rows: newRows });
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    
    const newRow = [formData.gender, formData.category, formData.count.toString()];
    
    if (editingIndex !== null) {
      // Edit existing row
      const newRows = [...tableData.rows];
      newRows[editingIndex] = newRow;
      setTableData({ ...tableData, rows: newRows });
    } else {
      // Add new row
      setTableData({ ...tableData, rows: [...tableData.rows, newRow] });
    }
    
    setShowForm(false);
    setFormData({ gender: 'Male', category: '', count: 0 });
    setEditingIndex(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gender index data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-green-600" />
            Manage Gender Index
          </h1>
          <p className="text-gray-600 mt-1">Update gender statistics for IIIT Kottayam</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleAddRow}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} />
            Add Entry
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingIndex !== null ? 'Edit Entry' : 'Add New Entry'}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., IIIT Kottayam, Professional & Technical"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
                <input
                  type="number"
                  value={formData.count}
                  onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  min="0"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  {editingIndex !== null ? 'Update' : 'Add'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" size={20} />
            <h3 className="font-semibold text-blue-900">IIIT Kottayam Students</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-blue-700">Male: {tableData.rows.find(r => r[0] === 'Male' && r[1] === 'IIIT Kottayam')?.[2] || '0'}</p>
            </div>
            <div>
              <p className="text-blue-700">Female: {tableData.rows.find(r => r[0] === 'Female' && r[1] === 'IIIT Kottayam')?.[2] || '0'}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="text-green-600" size={20} />
            <h3 className="font-semibold text-green-900">Professional & Technical</h3>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-green-700">Male: {tableData.rows.find(r => r[0] === 'Male' && r[1] === 'Professional & Technical')?.[2] || '0'}</p>
            </div>
            <div>
              <p className="text-green-700">Female: {tableData.rows.find(r => r[0] === 'Female' && r[1] === 'Professional & Technical')?.[2] || '0'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {tableData.headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tableData.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditRow(rowIndex)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteRow(rowIndex)}
                      className="text-red-600 hover:text-red-900"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {tableData.rows.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No data available. Click "Add Entry" to start.
          </div>
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="text-sm font-semibold text-yellow-900 mb-2">💡 Note</h3>
        <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
          <li>Common categories: "IIIT Kottayam" (students), "Professional & Technical" (staff)</li>
          <li>Make sure to click "Save Changes" after editing the table</li>
          <li>You can also manage this page through: Admin → Site Content → Content Manager → Gender Index</li>
        </ul>
      </div>
    </div>
  );
}

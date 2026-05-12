import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import API from '../../api/api';

const EMOJI_OPTIONS = ['📢', '🎓', '⚡', '📰', '📝', '🔔', '🎯', '💡', '📌', '🌟'];

export default function ManageContentSections() {
  const { sectionName, subsection } = useParams();
  const location = useLocation();
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [editingSubsectionIndex, setEditingSubsectionIndex] = useState(null);
  const [formData, setFormData] = useState({
    sectionTitle: '',
    sectionName: '',
    subsections: [],
    displayOrder: 0,
    isActive: true,
    metadata: {}
  });
  const [subsectionForm, setSubsectionForm] = useState({
    title: '',
    icon: '📢',
    content: '',
    order: 0
  });
  const [subsectionItems, setSubsectionItems] = useState([]); // for list-style content editing (array of {id,title,date,pdfLink,isNew})
  const [newItemDraft, setNewItemDraft] = useState({ title: '', date: '', pdfLink: '', isNew: false });
  const [openedRouteKey, setOpenedRouteKey] = useState('');

  useEffect(() => {
    fetchSections();
  }, []);

  useEffect(() => {
    if (loading || !sectionName || sections.length === 0) return;

    // Build a route key that includes the optional subsection param (either URL param or query string)
    const routeSubKey = subsection || new URLSearchParams(location.search).get('subsection') || '';
    const routeKey = `${sectionName}::${routeSubKey}`;
    if (openedRouteKey === routeKey) return;

    const selectedSection = sections.find(
      (section) => section.sectionName === sectionName || section.id?.toString() === sectionName
    );

    if (!selectedSection) return;

    const subsectionKey = subsection || new URLSearchParams(location.search).get('subsection');
    openEditModal(selectedSection, subsectionKey);
    setOpenedRouteKey(routeKey);
  }, [loading, sectionName, subsection, sections, location.search, openedRouteKey]);

  const fetchSections = async () => {
    try {
      const result = await API.get('/api/content-sections');
      if (result.success) {
        setSections(result.data.data || []);
      } else {
        console.error('Error fetching sections:', result.error);
      }
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        subsections: formData.subsections.map((sub, idx) => ({
          ...sub,
          id: sub.id || `subsection-${idx}-${Date.now()}`
        }))
      };

      const result = editingSection
        ? await API.put(`/api/content-sections/${editingSection.id}`, payload)
        : await API.post('/api/content-sections', payload);

      if (result.success) {
        fetchSections();
        setShowModal(false);
        resetForm();
        alert(editingSection ? 'Section updated successfully!' : 'Section created successfully!');
      } else {
        alert('Failed to save section: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving section:', error);
      alert('Failed to save section. Please try again.');
    }
  };

  const handleAddSubsection = () => {
    if (!subsectionForm.title.trim()) {
      alert('Please enter subsection title');
      return;
    }

    const newSubsection = {
      ...subsectionForm,
      id: `subsection-${formData.subsections.length}-${Date.now()}`,
      order: formData.subsections.length
    };

    setFormData(prev => ({
      ...prev,
      subsections: [...prev.subsections, newSubsection]
    }));
    resetSubsectionForm();
  };

  const handleUpdateSubsection = () => {
    if (!subsectionForm.title.trim()) {
      alert('Please enter subsection title');
      return;
    }

    const updated = [...formData.subsections];
    updated[editingSubsectionIndex] = {
      ...subsectionForm,
      id: updated[editingSubsectionIndex].id,
      order: editingSubsectionIndex
    };

    setFormData(prev => ({
      ...prev,
      subsections: updated
    }));
    setEditingSubsectionIndex(null);
    resetSubsectionForm();
  };

  const handleDeleteSubsection = (index) => {
    setFormData(prev => ({
      ...prev,
      subsections: prev.subsections.filter((_, i) => i !== index)
    }));
  };

  const handleDeleteSection = async (id) => {
    if (!window.confirm('Are you sure you want to delete this section?')) return;

    try {
      const result = await API.delete(`/api/content-sections/${id}`);
      if (result.success) {
        fetchSections();
        alert('Section deleted successfully!');
      } else {
        alert('Failed to delete section: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
      alert('Failed to delete section. Please try again.');
    }
  };

  const openEditModal = (section, subsectionKey = null) => {
    const subsectionIndex = subsectionKey
      ? (section.subsections || []).findIndex((subsection) => {
          const normalizedId = (subsection.id || subsection.title || '').toString().toLowerCase().replace(/\s+/g, '-');
          const normalizedTitle = (subsection.title || '').toString().toLowerCase().replace(/\s+/g, '-');
          return normalizedId === subsectionKey || normalizedTitle === subsectionKey;
        })
      : -1;

    setEditingSection(section);
    setFormData({
      sectionTitle: section.sectionTitle,
      sectionName: section.sectionName,
      subsections: section.subsections || [],
      displayOrder: section.displayOrder,
      isActive: section.isActive,
      metadata: section.metadata || {}
    });
    setShowModal(true);

    if (subsectionIndex >= 0) {
      const subsection = section.subsections[subsectionIndex];
      setEditingSubsectionIndex(subsectionIndex);
      setSubsectionForm({
        title: subsection.title || '',
        icon: subsection.icon || '📢',
        content: subsection.content || '',
        order: subsection.order ?? subsectionIndex
      });
    }
  };

  const resetForm = () => {
    setFormData({
      sectionTitle: '',
      sectionName: '',
      subsections: [],
      displayOrder: 0,
      isActive: true,
      metadata: {}
    });
    setEditingSection(null);
    resetSubsectionForm();
  };

  const resetSubsectionForm = () => {
    setSubsectionForm({
      title: '',
      icon: '📢',
      content: '',
      order: 0
    });
    setEditingSubsectionIndex(null);
  };

  const openSubsectionEdit = (index) => {
    const subsection = formData.subsections[index];
    setSubsectionForm({
      title: subsection.title,
      icon: subsection.icon,
      content: subsection.content,
      order: subsection.order
    });
    setEditingSubsectionIndex(index);
    // prepare items if content is an array
    setSubsectionItems(Array.isArray(subsection.content) ? subsection.content.slice() : []);
  };

  const handleAddSubsectionItem = (item) => {
    if (!item || !item.title?.trim()) return;
    setSubsectionItems(prev => [...prev, { id: `item-${Date.now()}`, ...item }]);
  };

  const handleUpdateSubsectionItem = (idx, item) => {
    setSubsectionItems(prev => {
      const copy = prev.slice();
      copy[idx] = { ...copy[idx], ...item };
      return copy;
    });
  };

  const handleDeleteSubsectionItem = (idx) => {
    setSubsectionItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSaveSubsectionOnly = async () => {
    if (!editingSection) return;
    try {
      const updated = [...formData.subsections];
      const contentToSave = Array.isArray(subsectionItems) && subsectionItems.length > 0 ? subsectionItems : subsectionForm.content;
      updated[editingSubsectionIndex] = {
        ...updated[editingSubsectionIndex],
        title: subsectionForm.title,
        icon: subsectionForm.icon,
        content: contentToSave,
        order: subsectionForm.order
      };

      const payload = { ...formData, subsections: updated };
      const result = await API.put(`/api/content-sections/${editingSection.id}`, payload);
      if (result.success) {
        // refresh sections list and local state
        await fetchSections();
        setFormData(prev => ({ ...prev, subsections: updated }));
        alert('Subsection saved successfully');
      } else {
        alert('Failed to save subsection: ' + result.error);
      }
    } catch (err) {
      console.error('Error saving subsection:', err);
      alert('Failed to save subsection.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Manage Content Sections</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus size={20} /> Add Section
          </button>
        </div>

        {/* Sections List */}
        <div className="grid gap-4">
          {sections.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center text-gray-400">
              No content sections yet. Create one to get started!
            </div>
          ) : (
            sections.map(section => (
              <div key={section.id} className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{section.sectionTitle}</h2>
                    <p className="text-sm text-gray-400">ID: {section.sectionName}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(section)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded flex items-center gap-1"
                    >
                      <Edit size={18} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSection(section.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded flex items-center gap-1"
                    >
                      <Trash2 size={18} /> Delete
                    </button>
                  </div>
                </div>

                {/* Subsections Preview */}
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-300 font-semibold">Subsections:</p>
                  {section.subsections && section.subsections.length > 0 ? (
                    <div className="space-y-1">
                      {section.subsections.map((sub, idx) => (
                        <div key={idx} className="bg-gray-700 rounded p-2 text-sm text-gray-200">
                          <span className="mr-2">{sub.icon}</span>
                          {sub.title}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No subsections</p>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                {editingSection ? 'Edit Section' : 'Create Section'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSectionSubmit} className="p-6 space-y-6 max-h-96 overflow-y-auto">
              {/* Section Basic Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Section Information</h3>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Section Title</label>
                  <input
                    type="text"
                    required
                    value={formData.sectionTitle}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      sectionTitle: e.target.value
                    }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., Latest News & Updates"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Section Name (unique ID)</label>
                  <input
                    type="text"
                    required
                    value={formData.sectionName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      sectionName: e.target.value.toLowerCase().replace(/\s+/g, '-')
                    }))}
                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g., latest-news-updates"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-300 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        displayOrder: parseInt(e.target.value)
                      }))}
                      className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({
                          ...prev,
                          isActive: e.target.checked
                        }))}
                        className="rounded"
                      />
                      <span>Active</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Subsections Management */}
              <div className="border-t border-gray-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Subsections</h3>

                  {editingSubsectionIndex !== null ? (
                    // Focused subsection editor: show only the selected subsection with item-management
                    <div className="bg-gray-700 rounded-lg p-4 mb-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-semibold">Editing: {subsectionForm.title || 'Subsection'}</h4>
                          <p className="text-sm text-gray-400">Edit the content or manage items for this subsection.</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => { setEditingSubsectionIndex(null); resetSubsectionForm(); }}
                            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded"
                          >
                            Close
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveSubsectionOnly}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Title</label>
                          <input value={subsectionForm.title} onChange={(e) => setSubsectionForm(prev => ({ ...prev, title: e.target.value }))} className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Order</label>
                          <input type="number" value={subsectionForm.order} onChange={(e) => setSubsectionForm(prev => ({ ...prev, order: parseInt(e.target.value) }))} className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-gray-300 mb-2">Icon</label>
                        <select value={subsectionForm.icon} onChange={(e) => setSubsectionForm(prev => ({ ...prev, icon: e.target.value }))} className="w-32 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white">
                          {EMOJI_OPTIONS.map(e => <option key={e} value={e}>{e}</option>)}
                        </select>
                      </div>

                      {/* If items are present (array), show list editor, else show textarea */}
                      {Array.isArray(subsectionItems) && subsectionItems.length > 0 ? (
                        <div>
                          <h5 className="text-white font-medium mb-2">Items</h5>
                          <div className="space-y-2">
                            {subsectionItems.map((it, i) => (
                              <div key={it.id || i} className="bg-gray-800 rounded p-3">
                                <div className="flex gap-2 mb-2">
                                  <input value={it.title} onChange={(e) => handleUpdateSubsectionItem(i, { title: e.target.value })} className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" placeholder="Title" />
                                  <input type="date" value={it.date ? it.date.split('T')[0] : ''} onChange={(e) => handleUpdateSubsectionItem(i, { date: e.target.value })} className="w-40 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                                </div>
                                <div className="flex gap-2 items-center mb-2">
                                  <input value={it.pdfLink || ''} onChange={(e) => handleUpdateSubsectionItem(i, { pdfLink: e.target.value })} placeholder="PDF URL (optional)" className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                                  <label className="flex items-center gap-2 text-sm text-gray-300">
                                    <input type="checkbox" checked={!!it.isNew} onChange={(e) => handleUpdateSubsectionItem(i, { isNew: e.target.checked })} /> <span>Mark New</span>
                                  </label>
                                  <button type="button" onClick={() => handleDeleteSubsectionItem(i)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded">Delete</button>
                                </div>
                                <div>
                                  <textarea value={it.description || it.text || ''} onChange={(e) => handleUpdateSubsectionItem(i, { description: e.target.value })} placeholder="Description / body" className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 bg-gray-800 rounded p-3">
                            <h6 className="text-sm text-gray-200 mb-2">Add new item</h6>
                            <div className="flex gap-2 mb-2">
                              <input value={newItemDraft.title} onChange={(e) => setNewItemDraft(prev => ({ ...prev, title: e.target.value }))} placeholder="Title" className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                              <input type="date" value={newItemDraft.date} onChange={(e) => setNewItemDraft(prev => ({ ...prev, date: e.target.value }))} className="w-40 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                              <input value={newItemDraft.pdfLink} onChange={(e) => setNewItemDraft(prev => ({ ...prev, pdfLink: e.target.value }))} placeholder="PDF URL (optional)" className="flex-1 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white" />
                              <label className="flex items-center gap-2 text-sm text-gray-300">
                                <input type="checkbox" checked={newItemDraft.isNew} onChange={(e) => setNewItemDraft(prev => ({ ...prev, isNew: e.target.checked }))} /> <span>Mark New</span>
                              </label>
                            </div>
                            <div className="flex gap-2">
                              <button type="button" onClick={() => { handleAddSubsectionItem(newItemDraft); setNewItemDraft({ title: '', date: '', pdfLink: '', isNew: false }); }} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded">Add Item</button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Content</label>
                          <textarea value={subsectionForm.content} onChange={(e) => setSubsectionForm(prev => ({ ...prev, content: e.target.value }))} className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white h-40" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Subsection Form */}
                      <div className="bg-gray-700 rounded-lg p-4 mb-4 space-y-3">
                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Subsection Title</label>
                          <input
                            type="text"
                            value={subsectionForm.title}
                            onChange={(e) => setSubsectionForm(prev => ({
                              ...prev,
                              title: e.target.value
                            }))}
                            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            placeholder="e.g., Announcement"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Icon Emoji</label>
                            <select
                              value={subsectionForm.icon}
                              onChange={(e) => setSubsectionForm(prev => ({
                                ...prev,
                                icon: e.target.value
                              }))}
                              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            >
                              {EMOJI_OPTIONS.map(emoji => (
                                <option key={emoji} value={emoji}>{emoji}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm text-gray-300 mb-2">Order</label>
                            <input
                              type="number"
                              value={subsectionForm.order}
                              onChange={(e) => setSubsectionForm(prev => ({
                                ...prev,
                                order: parseInt(e.target.value)
                              }))}
                              className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm text-gray-300 mb-2">Content</label>
                          <textarea
                            value={subsectionForm.content}
                            onChange={(e) => setSubsectionForm(prev => ({
                              ...prev,
                              content: e.target.value
                            }))}
                            className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-24 resize-none"
                            placeholder="Enter subsection content..."
                          />
                        </div>

                        <div className="flex gap-2">
                          {editingSubsectionIndex !== null ? (
                            <>
                              <button
                                type="button"
                                onClick={handleUpdateSubsection}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
                              >
                                Update Subsection
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingSubsectionIndex(null);
                                  resetSubsectionForm();
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-2 rounded font-medium"
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              type="button"
                              onClick={handleAddSubsection}
                              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-medium flex items-center justify-center gap-2"
                            >
                              <Plus size={18} /> Add Subsection
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Subsections List */}
                      <div className="space-y-2">
                        {formData.subsections.map((sub, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-700 rounded-lg p-3 flex justify-between items-start"
                          >
                            <div className="flex-1">
                              <p className="text-white font-medium">
                                <span className="mr-2">{sub.icon}</span>
                                {sub.title}
                              </p>
                              <p className="text-sm text-gray-400 line-clamp-1">{Array.isArray(sub.content) ? `${sub.content.length} items` : sub.content}</p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                type="button"
                                onClick={() => openSubsectionEdit(idx)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                              >
                                <Edit size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteSubsection(idx)}
                                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
              </div>
            </form>

            {/* Modal Footer */}
            <div className="bg-gray-700 border-t border-gray-600 p-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSectionSubmit}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium"
              >
                {editingSection ? 'Update Section' : 'Create Section'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, FileText, Layout, 
  Type, Image, List, Settings, ChevronRight, ChevronDown, Search,
  Palette, BarChart3, Copy, Move, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

const BLOCK_TYPES = [
  { value: 'hero', label: '🎯 Hero Banner', color: '#8b5cf6' },
  { value: 'heading', label: '📝 Heading', color: '#3b82f6' },
  { value: 'paragraph', label: '📄 Paragraph', color: '#10b981' },
  { value: 'image', label: '🖼️ Image', color: '#f59e0b' },
  { value: 'gallery', label: '🎨 Gallery', color: '#ec4899' },
  { value: 'list', label: '📋 List', color: '#6366f1' },
  { value: 'card', label: '🃏 Card', color: '#14b8a6' },
  { value: 'table', label: '📊 Table', color: '#06b6d4' },
  { value: 'statistics', label: '📈 Statistics', color: '#239244' },
  { value: 'button', label: '🔘 Button', color: '#ef4444' }
];

export default function UnifiedContentEditor() {
  // States
  const [step, setStep] = useState(1); // 1: Select Page, 2: Edit Metadata, 3: Edit Content
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [pageBlockCounts, setPageBlockCounts] = useState({}); // Store block counts for each page

  // Page metadata form
  const [pageMetadata, setPageMetadata] = useState({
    pageTitle: '',
    pageSlug: '',
    metaDescription: '',
    metaKeywords: '',
    isPublished: true
  });

  const color1 = API.color1 || '#239244';
  const color2 = API.color2 || '#e8f5f0';

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchBlocks();
      loadPageMetadata();
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    try {
      setLoading(true);
      const response = await API.get('/api/pages');
      if (response.success) {
        const pagesData = response.data.data || [];
        setPages(pagesData);
        
        // Fetch block counts for all pages
        const counts = {};
        for (const page of pagesData) {
          try {
            const blocksResponse = await API.get(`/api/content-blocks/page/${page.pageName}`);
            if (blocksResponse.success) {
              counts[page.pageName] = (blocksResponse.data.data || blocksResponse.data || []).length;
            }
          } catch (err) {
            counts[page.pageName] = 0;
          }
        }
        setPageBlockCounts(counts);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/content-blocks/page/${selectedPage.pageName}`);
      if (response.success) {
        setBlocks(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
      setBlocks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadPageMetadata = () => {
    if (selectedPage) {
      setPageMetadata({
        pageTitle: selectedPage.pageTitle || '',
        pageSlug: selectedPage.pageSlug || '',
        metaDescription: selectedPage.metaDescription || '',
        metaKeywords: selectedPage.metaKeywords || '',
        isPublished: selectedPage.isPublished !== undefined ? selectedPage.isPublished : true
      });
    }
  };

  const savePageMetadata = async () => {
    try {
      await API.put(`/api/pages/${selectedPage.id}`, pageMetadata);
      alert('✅ Page metadata saved successfully!');
      fetchPages();
      setStep(3);
    } catch (error) {
      console.error('Error saving page metadata:', error);
      alert('❌ Error saving page metadata');
    }
  };

  const createBlock = () => {
    setEditingBlock({
      blockId: `block-${Date.now()}`,
      pageName: selectedPage.pageName,
      sectionName: '',
      blockType: 'paragraph',
      blockLabel: 'New Content Block',
      content: {},
      blockOrder: blocks.length,
      isVisible: true
    });
    setShowBlockEditor(true);
  };

  const editBlock = (block) => {
    const parseField = (field) => {
      if (!field) return {};
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch (e) {
          return {};
        }
      }
      return field;
    };

    setEditingBlock({
      id: block.id,
      blockId: block.blockId || `block-${Date.now()}`,
      pageName: block.pageName || selectedPage.pageName,
      sectionName: block.sectionName || '',
      blockType: block.blockType || 'paragraph',
      blockLabel: block.blockLabel || 'Untitled Block',
      content: parseField(block.content),
      blockOrder: block.blockOrder || 0,
      isVisible: block.isVisible !== undefined ? block.isVisible : true
    });
    setShowBlockEditor(true);
  };

  const saveBlock = async () => {
    try {
      console.log('Saving block:', editingBlock);
      if (editingBlock.id) {
        const response = await API.put(`/api/content-blocks/${editingBlock.id}`, editingBlock);
        console.log('Update response:', response);
        alert('✅ Block updated successfully! Refresh the homepage to see changes.');
      } else {
        const response = await API.post('/api/content-blocks', editingBlock);
        console.log('Create response:', response);
        alert('✅ Block created successfully! Refresh the homepage to see changes.');
      }
      setShowBlockEditor(false);
      setEditingBlock(null);
      fetchBlocks();
    } catch (error) {
      console.error('Error saving block:', error);
      alert('❌ Error saving block');
    }
  };

  const deleteBlock = async (id) => {
    if (window.confirm('Delete this content block?')) {
      try {
        await API.delete(`/api/content-blocks/${id}`);
        fetchBlocks();
      } catch (error) {
        console.error('Error deleting block:', error);
      }
    }
  };

  const toggleBlockVisibility = async (block) => {
    try {
      await API.put(`/api/content-blocks/${block.id}`, {
        ...block,
        content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content,
        isVisible: !block.isVisible
      });
      fetchBlocks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const duplicateBlock = async (block) => {
    try {
      const newBlock = {
        ...block,
        id: undefined,
        blockId: `block-${Date.now()}`,
        blockLabel: `${block.blockLabel} (Copy)`,
        blockOrder: blocks.length,
        content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content
      };
      await API.post('/api/content-blocks', newBlock);
      fetchBlocks();
    } catch (error) {
      console.error('Error duplicating block:', error);
    }
  };

  const updateContent = (field, value) => {
    setEditingBlock({
      ...editingBlock,
      content: { ...editingBlock.content, [field]: value }
    });
  };

  const updateArrayContent = (field, index, value) => {
    const arr = editingBlock.content[field] || [];
    const newArr = [...arr];
    newArr[index] = value;
    updateContent(field, newArr);
  };

  const addArrayItem = (field, defaultValue = '') => {
    const arr = editingBlock.content[field] || [];
    updateContent(field, [...arr, defaultValue]);
  };

  const removeArrayItem = (field, index) => {
    const arr = editingBlock.content[field] || [];
    updateContent(field, arr.filter((_, i) => i !== index));
  };

  const renderContentEditor = () => {
    if (!editingBlock) return null;
    const content = editingBlock.content || {};

    switch (editingBlock.blockType) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Hero Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Welcome to IIIT Kottayam"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Pioneering Excellence in Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="Additional description..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Badge Text (Optional)</label>
              <input
                type="text"
                value={content.badge || ''}
                onChange={(e) => updateContent('badge', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Established 2015"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Button Text</label>
                <input
                  type="text"
                  value={content.buttonText || ''}
                  onChange={(e) => updateContent('buttonText', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Learn More"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Button Link</label>
                <input
                  type="text"
                  value={content.buttonLink || ''}
                  onChange={(e) => updateContent('buttonLink', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="/about"
                />
              </div>
            </div>
            <ImageUploader
              value={content.backgroundImage || ''}
              onChange={(url) => updateContent('backgroundImage', url)}
              label="Background Image"
              folder="images"
            />
          </div>
        );

      case 'heading':
      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Icon (emoji or text)</label>
              <input
                type="text"
                value={content.icon || ''}
                onChange={(e) => updateContent('icon', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="🎯"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                {editingBlock.blockType === 'heading' ? 'Heading Text' : 'Title'}
              </label>
              <input
                type="text"
                value={content.title || content.text || ''}
                onChange={(e) => updateContent(editingBlock.blockType === 'heading' ? 'text' : 'title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder={editingBlock.blockType === 'heading' ? 'Section Heading' : 'Title'}
              />
            </div>
            {editingBlock.blockType === 'heading' && (
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Heading Level</label>
                <select
                  value={content.level || 2}
                  onChange={(e) => updateContent('level', parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="1">H1 - Largest</option>
                  <option value="2">H2 - Large</option>
                  <option value="3">H3 - Medium</option>
                  <option value="4">H4 - Small</option>
                </select>
              </div>
            )}
            {editingBlock.blockType === 'paragraph' && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Content</label>
                  <textarea
                    value={content.text || ''}
                    onChange={(e) => updateContent('text', e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="6"
                    placeholder="Write your content here..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Link Text (optional)</label>
                    <input
                      type="text"
                      value={content.linkText || ''}
                      onChange={(e) => updateContent('linkText', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Read more →"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Link URL (optional)</label>
                    <input
                      type="text"
                      value={content.link || ''}
                      onChange={(e) => updateContent('link', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="/page"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">List Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Key Features"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Icon (optional)</label>
              <input
                type="text"
                value={content.icon || ''}
                onChange={(e) => updateContent('icon', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="✓"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">List Items</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('items', '')}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Item
                </button>
              </div>
              <div className="space-y-2">
                {(content.items || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayContent('items', index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Item ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('items', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Image Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Image Title"
              />
            </div>
            <ImageUploader
              value={content.url || ''}
              onChange={(url) => updateContent('url', url)}
              label="Upload Image"
              folder="images"
            />
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Caption (optional)</label>
              <input
                type="text"
                value={content.caption || ''}
                onChange={(e) => updateContent('caption', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Image caption"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Alt Text</label>
              <input
                type="text"
                value={content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Descriptive alt text"
              />
            </div>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Section Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Our Achievements"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Statistics</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('stats', { value: '', label: '' })}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {(content.stats || []).map((stat, index) => (
                  <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-3 mb-2">
                      <input
                        type="text"
                        value={stat.value || ''}
                        onChange={(e) => {
                          const newStats = [...(content.stats || [])];
                          newStats[index] = { ...stat, value: e.target.value };
                          updateContent('stats', newStats);
                        }}
                        className="px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                        placeholder="100+"
                      />
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => {
                          const newStats = [...(content.stats || [])];
                          newStats[index] = { ...stat, label: e.target.value };
                          updateContent('stats', newStats);
                        }}
                        className="px-3 py-2 border rounded focus:ring-2 focus:ring-green-500"
                        placeholder="Students"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeArrayItem('stats', index)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Title</label>
              <input
                type="text"
                value={content.title || content.text || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Interested in Joining?"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Description (Optional)</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="2"
                placeholder="Additional description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Button Text</label>
                <input
                  type="text"
                  value={content.buttonText || content.text || ''}
                  onChange={(e) => updateContent('buttonText', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Learn More"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Link URL</label>
                <input
                  type="text"
                  value={content.link || ''}
                  onChange={(e) => updateContent('link', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="/page"
                />
              </div>
            </div>
          </div>
        );

      case 'text': // HTML content editor
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Content Text</label>
              <textarea
                value={content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                rows="10"
                placeholder="Enter text content (HTML supported)"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can use HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;br&gt;
              </p>
            </div>
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Card Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Card title"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Description</label>
              <textarea
                value={content.description || content.text || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="4"
                placeholder="Card description"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Icon/Emoji</label>
              <input
                type="text"
                value={content.icon || ''}
                onChange={(e) => updateContent('icon', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="🎯"
              />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Table Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Fee Structure"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Subtitle (Optional)</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Admission 2025"
              />
            </div>
            
            {/* Table Headers */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Table Headers</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('headers', '')}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Header
                </button>
              </div>
              <div className="space-y-2">
                {(content.headers || []).map((header, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateArrayContent('headers', index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={`Header ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('headers', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Table Rows */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Table Rows</label>
                <button
                  type="button"
                  onClick={() => {
                    const headerCount = (content.headers || []).length;
                    const newRow = Array(headerCount).fill('');
                    addArrayItem('rows', newRow);
                  }}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Row
                </button>
              </div>
              <div className="space-y-3">
                {(content.rows || []).map((row, rowIndex) => (
                  <div key={rowIndex} className="border-2 border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-600">Row {rowIndex + 1}</span>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('rows', rowIndex)}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${(content.headers || []).length}, 1fr)` }}>
                      {row.map((cell, cellIndex) => (
                        <input
                          key={cellIndex}
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const newRows = [...(content.rows || [])];
                            newRows[rowIndex][cellIndex] = e.target.value;
                            updateContent('rows', newRows);
                          }}
                          className="px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 text-sm"
                          placeholder={(content.headers || [])[cellIndex] || `Col ${cellIndex + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes/Footer */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Notes (Optional)</label>
                <button
                  type="button"
                  onClick={() => addArrayItem('notes', '')}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Note
                </button>
              </div>
              <div className="space-y-2">
                {(content.notes || []).map((note, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => updateArrayContent('notes', index, e.target.value)}
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Note text (use | for links, e.g., Link text|#url)"
                    />
                    <button
                      type="button"
                      onClick={() => removeArrayItem('notes', index)}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              This block type doesn't have a custom editor yet. You can still save basic content.
            </p>
          </div>
        );
    }
  };

  const filteredPages = pages.filter(page =>
    page.pageTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.pageName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-0 z-40">
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
          <p className="text-gray-600 mt-1">Unified content editing system - Simple, text-based, and powerful</p>
        </div>

        {/* Progress Steps */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-4">
            <div
              onClick={() => step > 1 && setStep(1)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                step === 1 ? 'bg-green-600 text-white' : step > 1 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold">
                1
              </div>
              <span className="font-semibold">Select Page</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div
              onClick={() => step > 2 && selectedPage && setStep(2)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                step === 2 ? 'bg-green-600 text-white' : step > 2 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold">
                2
              </div>
              <span className="font-semibold">Page Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
            <div
              onClick={() => selectedPage && setStep(3)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition-all ${
                step === 3 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-white bg-opacity-30 flex items-center justify-center font-bold">
                3
              </div>
              <span className="font-semibold">Edit Content</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Step 1: Select Page */}
        {step === 1 && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Select a Page to Edit</h2>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search pages..."
                      className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPages.map((page) => {
                  const blockCount = pageBlockCounts[page.pageName] || 0;
                  return (
                    <div
                      key={page.id}
                      onClick={() => {
                        setSelectedPage(page);
                        setStep(2);
                      }}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-green-500 hover:shadow-lg cursor-pointer transition-all group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <FileText className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
                        <div className="flex items-center gap-2">
                          {blockCount > 0 ? (
                            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded font-semibold">
                              {blockCount} blocks
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded font-semibold">
                              No content
                            </span>
                          )}
                          {!page.isPublished && (
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">Draft</span>
                          )}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{page.pageTitle}</h3>
                      <p className="text-sm text-gray-500 mb-2 font-mono">{page.pageName}</p>
                      {page.metaDescription && (
                        <p className="text-xs text-gray-600 line-clamp-2">{page.metaDescription}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredPages.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No pages found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Edit Page Metadata */}
        {step === 2 && selectedPage && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Page Settings</h2>
                <p className="text-gray-600">Configure SEO and page properties for: <span className="font-semibold">{selectedPage.pageTitle}</span></p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Page Title</label>
                  <input
                    type="text"
                    value={pageMetadata.pageTitle}
                    onChange={(e) => setPageMetadata({ ...pageMetadata, pageTitle: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="About IIIT Kottayam"
                  />
                  <p className="text-xs text-gray-500 mt-1">This appears in browser tabs and search results</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Page URL Slug</label>
                  <input
                    type="text"
                    value={pageMetadata.pageSlug}
                    onChange={(e) => setPageMetadata({ ...pageMetadata, pageSlug: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono"
                    placeholder="/about"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL path for this page (e.g., /about, /admissions)</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Meta Description (SEO)</label>
                  <textarea
                    value={pageMetadata.metaDescription}
                    onChange={(e) => setPageMetadata({ ...pageMetadata, metaDescription: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    rows="3"
                    placeholder="Brief description for search engines..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Shown in search results - Keep under 160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Meta Keywords (SEO)</label>
                  <input
                    type="text"
                    value={pageMetadata.metaKeywords}
                    onChange={(e) => setPageMetadata({ ...pageMetadata, metaKeywords: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="IIIT, Kottayam, Technology, Education"
                  />
                  <p className="text-xs text-gray-500 mt-1">Comma-separated keywords</p>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPublished"
                    checked={pageMetadata.isPublished}
                    onChange={(e) => setPageMetadata({ ...pageMetadata, isPublished: e.target.checked })}
                    className="w-5 h-5 text-green-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-green-500"
                  />
                  <label htmlFor="isPublished" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    Publish this page (make it visible to visitors)
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t-2 border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                >
                  ← Back
                </button>
                <button
                  onClick={savePageMetadata}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save & Continue to Content →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Edit Content Blocks */}
        {step === 3 && selectedPage && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Content Blocks</h2>
                  <p className="text-gray-600 mt-1">Editing: <span className="font-semibold">{selectedPage.pageTitle}</span></p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
                  >
                    ← Page Settings
                  </button>
                </div>
              </div>

              {/* Homepage Quick Access Panel */}
              {selectedPage.pageName === 'homepage' && (
                <div className="mb-6 p-5 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border-2 border-green-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    Quick Access: Homepage Components
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Manage all content that appears on the homepage</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Link
                      to="/admin/announcements"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📢</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Announcements</div>
                        <div className="text-xs text-gray-500">Banner alerts</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/hero-sliders"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🎬</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Hero Sliders</div>
                        <div className="text-xs text-gray-500">Main banner</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/news"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📰</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">News & Updates</div>
                        <div className="text-xs text-gray-500">Latest news</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/events"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">📅</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Events</div>
                        <div className="text-xs text-gray-500">Upcoming events</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/company-logos"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🏢</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Company Logos</div>
                        <div className="text-xs text-gray-500">Recruiters</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/faculty"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">👨‍🏫</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Faculty</div>
                        <div className="text-xs text-gray-500">Professors</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/nirf"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🏆</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">NIRF Rankings</div>
                        <div className="text-xs text-gray-500">Rankings data</div>
                      </div>
                    </Link>
                    
                    <Link
                      to="/admin/gallery"
                      className="flex items-center gap-2 p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">🖼️</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-gray-900">Gallery</div>
                        <div className="text-xs text-gray-500">Image gallery</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}

              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                </div>
              ) : blocks.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <Layout className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Content Yet</h3>
                  <p className="text-gray-600">This page has no content blocks</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {blocks.map((block, index) => {
                    const blockType = BLOCK_TYPES.find(t => t.value === block.blockType);
                    const isExpanded = expandedBlock === block.id;

                    return (
                      <div
                        key={block.id}
                        className={`border-2 rounded-lg overflow-hidden transition-all ${
                          block.isVisible ? 'border-gray-200 bg-white' : 'border-gray-300 bg-gray-50 opacity-60'
                        }`}
                      >
                        <div className="flex items-center gap-4 p-4">
                          <div className="flex items-center gap-3 flex-1">
                            <div
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                              style={{ backgroundColor: blockType?.color || '#6b7280' }}
                            >
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-900">{block.blockLabel}</span>
                                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                                  {blockType?.label || block.blockType}
                                </span>
                              </div>
                              {block.sectionName && (
                                <p className="text-sm text-gray-500 mt-1">Section: {block.sectionName}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title={isExpanded ? 'Collapse' : 'Expand'}
                            >
                              {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                            </button>
                            <button
                              onClick={() => editBlock(block)}
                              className="p-2 hover:bg-blue-50 text-blue-600 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => duplicateBlock(block)}
                              className="p-2 hover:bg-green-50 text-green-600 rounded"
                              title="Duplicate"
                            >
                              <Copy className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => toggleBlockVisibility(block)}
                              className="p-2 hover:bg-gray-100 rounded"
                              title={block.isVisible ? 'Hide' : 'Show'}
                            >
                              {block.isVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
                            </button>
                            <button
                              onClick={() => deleteBlock(block.id)}
                              className="p-2 hover:bg-red-50 text-red-600 rounded"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="border-t-2 border-gray-100 p-4 bg-gray-50">
                            <pre className="text-xs text-gray-600 overflow-x-auto">
                              {JSON.stringify(typeof block.content === 'string' ? JSON.parse(block.content) : block.content, null, 2)}
                            </pre>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Block Editor Modal */}
      {showBlockEditor && editingBlock && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b-2 border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingBlock.id ? '✏️ Edit Content Block' : '➕ Create Content Block'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{editingBlock.blockLabel}</p>
                </div>
                <button
                  onClick={() => {
                    setShowBlockEditor(false);
                    setEditingBlock(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 text-3xl font-bold"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Block Type & Label */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Block Type</label>
                    <select
                      value={editingBlock.blockType}
                      onChange={(e) => setEditingBlock({ ...editingBlock, blockType: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {BLOCK_TYPES.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Block Name</label>
                    <input
                      type="text"
                      value={editingBlock.blockLabel}
                      onChange={(e) => setEditingBlock({ ...editingBlock, blockLabel: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Welcome Message"
                    />
                  </div>
                </div>

                {/* Section Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Section Name (Optional)</label>
                  <input
                    type="text"
                    value={editingBlock.sectionName || ''}
                    onChange={(e) => setEditingBlock({ ...editingBlock, sectionName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., hero, about, features"
                  />
                </div>

                {/* Dynamic Content Editor */}
                <div className="border-t-2 border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Content</h3>
                  {renderContentEditor()}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t-2 border-gray-200 flex justify-end gap-3 bg-gray-50">
              <button
                onClick={() => {
                  setShowBlockEditor(false);
                  setEditingBlock(null);
                }}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-white font-semibold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={saveBlock}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Save className="w-5 h-5" />
                {editingBlock.id ? 'Update Block' : 'Create Block'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

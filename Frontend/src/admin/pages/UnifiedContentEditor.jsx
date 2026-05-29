import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, FileText, Layout, 
  Type, Image, List, Settings, ChevronRight, ChevronDown, Search,
  Palette, BarChart3, Copy, Move, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RichEditor from '../components/RichEditor';

const BLOCK_TYPES = [
  { value: 'hero', label: '🎯 Hero Banner', color: '#8b5cf6' },
  { value: 'heading', label: '📝 Heading', color: '#3b82f6' },
  { value: 'paragraph', label: '📄 Paragraph', color: '#10b981' },
  { value: 'image', label: '🖼️ Image', color: '#f59e0b' },
  { value: 'gallery', label: '🎨 Gallery', color: '#ec4899' },
  { value: 'table', label: '📊 Table', color: '#06b6d4' },
  { value: 'statistics', label: '📈 Statistics', color: '#239244' }
];

const sanitizeParagraphHtml = (html) => {
  if (!html) return '';
  
  // Remove empty tags
  let cleaned = html.replace(/<(\w+)>[<\s]*<\/\1>/g, '');
  
  // Fix unclosed tags by removing orphaned closing tags
  cleaned = cleaned.replace(/<\/b>(?![\s\S]*<b>)/g, '');
  cleaned = cleaned.replace(/<\/i>(?![\s\S]*<i>)/g, '');
  cleaned = cleaned.replace(/<\/u>(?![\s\S]*<u>)/g, '');
  
  // Normalize links without protocol
  cleaned = cleaned.replace(/href="([^"]*)"/g, (match, url) => {
    const trimmedUrl = url.trim();
    if (!trimmedUrl) return match;
    if (trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://') || trimmedUrl.startsWith('mailto:')) {
      return match;
    }
    return `href="https://${trimmedUrl}"`;
  });
  
  // Ensure common inline tags are balanced
  try {
    const inlineTags = ['b', 'i', 'u', 'strong', 'em', 'a', 'span'];
    inlineTags.forEach((tag) => {
      const openRegex = new RegExp(`<${tag}(\\s|>)`, 'gi');
      const closeRegex = new RegExp(`</${tag}>`, 'gi');
      const opens = (cleaned.match(openRegex) || []).length;
      const closes = (cleaned.match(closeRegex) || []).length;
      for (let k = 0; k < Math.max(0, opens - closes); k++) {
        cleaned += `</${tag}>`;
      }
    });
  } catch (e) {
    // ignore balancing errors
  }

  return cleaned.trim();
};

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
  const [pendingListType, setPendingListType] = useState(null);
  const [pendingListItemCount, setPendingListItemCount] = useState(0);

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

  // Refs
  const paragraphEditorRef = useRef(null);

  const appendPendingListItem = () => {
    if (!pendingListType) return;
    const tag = pendingListType;
    const liContent = tag === 'ol' ? `${pendingListItemCount + 1}.&nbsp;` : '&nbsp;';
    const liHtml = `<li>${liContent}</li>`;
    
    paragraphEditorRef.current?.insertHtml(liHtml);
    setPendingListItemCount(pendingListItemCount + 1);
  };

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

  // Get default content structure based on block type
  const getDefaultContent = (blockType) => {
    const defaultStructures = {
      hero: { title: '', subtitle: '', backgroundImage: '', cta: '', ctaLink: '' },
      heading: { text: '', level: 'h2' },
      paragraph: { text: '' },
      image: { url: '', alt: '', caption: '' },
      gallery: { images: [], title: '' },
      list: { items: [], title: '' },
      card: { title: '', description: '', image: '', link: '' },
      table: { title: '', subtitle: '', headers: [], rows: [], notes: [] },
      statistics: { items: [], title: '' },
      button: { text: '', link: '', style: 'primary' }
    };
    return defaultStructures[blockType] || {};
  };

  const createBlock = () => {
    const defaultContent = getDefaultContent('paragraph');
    setEditingBlock({
      blockId: `block-${Date.now()}`,
      pageName: selectedPage.pageName,
      sectionName: '',
      blockType: 'paragraph',
      blockLabel: 'New Content Block',
      content: defaultContent,
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
      if (editingBlock.blockType === 'table') {
        const headers = editingBlock.content?.headers || [];
        const rows = editingBlock.content?.rows || [];
        
        if (headers.length === 0) {
          alert('Please add at least one table header!');
          return;
        }
        if (rows.length === 0) {
          alert('Please add at least one table row!');
          return;
        }
      }
      
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

  const updateTableCell = (rowIndex, cellIndex, value) => {
    const rows = (editingBlock.content.rows || []).map((row, idx) => {
      if (idx === rowIndex) {
        return row.map((cell, cidx) => cidx === cellIndex ? value : cell);
      }
      return row;
    });
    updateContent('rows', rows);
  };

  const handleMultipleImageUpload = async (files) => {
    try {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise(async (resolve, reject) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('folder', 'gallery');
          try {
            const response = await API.post('/api/upload', formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.success) {
              resolve({
                url: response.data.url,
                alt: 'Gallery Image',
                caption: ''
              });
            } else {
              reject(new Error('Upload failed'));
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const currentImages = content.images || [];
      updateContent('images', [...currentImages, ...uploadedImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('❌ Error uploading some images. Please try again.');
    }
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
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Text Formatting Options</label>
                  <div className="p-3 bg-gray-50 border-2 border-gray-300 rounded-lg flex flex-wrap gap-2">
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('strong'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">B</button>
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('em'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">I</button>
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('u'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">U</button>
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.insertLink(); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">Link</button>
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType('ul'); setPendingListItemCount(0); paragraphEditorRef.current?.insertHtml('<ul style="margin:12px 0;padding-left:28px;list-style-position:outside;list-style-type:disc;"><li>&nbsp;</li></ul>'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">UL</button>
                    <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType('ol'); setPendingListItemCount(0); paragraphEditorRef.current?.insertHtml('<ol style="margin:12px 0;padding-left:28px;list-style-position:outside;list-style-type:none;"><li>1.&nbsp;</li></ol>'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">OL</button>
                  </div>
                </div>
                {pendingListType && (
                  <div className="p-3 bg-blue-50 border-2 border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-700 font-medium mb-2">
                      {pendingListType === 'ul' ? 'Unordered List' : 'Ordered List'} mode active ({pendingListItemCount} items)
                    </p>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); appendPendingListItem(); }}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                    >
                      Add Item
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); setPendingListItemCount(0); }}
                      className="px-3 py-1 ml-2 bg-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-400"
                    >
                      Done
                    </button>
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Content</label>
                  <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                    <RichEditor 
                      ref={paragraphEditorRef}
                      value={content.text || ''} 
                      onChange={(html) => updateContent('text', sanitizeParagraphHtml(html))}
                      showToolbar={false}
                    />
                  </div>
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

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Gallery Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Gallery title (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Add Multiple Images (Upload all at once)</label>
              <div 
                className="w-full border-2 border-dashed border-green-400 rounded-lg p-8 text-center bg-green-50 cursor-pointer hover:bg-green-100 transition"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.add('bg-green-200');
                }}
                onDragLeave={(e) => {
                  e.currentTarget.classList.remove('bg-green-200');
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('bg-green-200');
                  const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
                  if (files.length > 0) {
                    handleMultipleImageUpload(files);
                  }
                }}
                onClick={() => {
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.multiple = true;
                  fileInput.accept = 'image/*';
                  fileInput.onchange = (e) => {
                    const files = Array.from(e.target.files);
                    if (files.length > 0) {
                      handleMultipleImageUpload(files);
                    }
                  };
                  fileInput.click();
                }}
              >
                <div className="text-green-700">
                  <p className="font-semibold text-lg mb-2">📤 Click to upload or drag images</p>
                  <p className="text-sm text-green-600">Select multiple images at once to upload them all together</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Or enter URLs manually (one per line)</label>
              <textarea
                value={(content.images || []).map(img => 
                  typeof img === 'string' ? img : img.url
                ).join('\n')}
                onChange={(e) => {
                  const urls = e.target.value.split('\n').filter(url => url.trim());
                  const images = urls.map(url => ({
                    url: url.trim(),
                    alt: 'Gallery Image',
                    caption: ''
                  }));
                  updateContent('images', images);
                }}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                rows={8}
                placeholder="/uploads/image1.jpg\n/uploads/image2.jpg\n/uploads/image3.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Display: 3 images per row on user side</p>
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
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">Statistic #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeArrayItem('stats', index)}
                        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Value</label>
                        <input
                          type="text"
                          value={stat.value || ''}
                          onChange={(e) => {
                            const newStats = [...(content.stats || [])];
                            newStats[index] = { ...stat, value: e.target.value };
                            updateContent('stats', newStats);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
                          placeholder="100+"
                        />
                        <p className="text-xs text-gray-500 mt-1">e.g., 100+, 500K, 1000</p>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700">Label</label>
                        <input
                          type="text"
                          value={stat.label || ''}
                          onChange={(e) => {
                            const newStats = [...(content.stats || [])];
                            newStats[index] = { ...stat, label: e.target.value };
                            updateContent('stats', newStats);
                          }}
                          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Students"
                        />
                        <p className="text-xs text-gray-500 mt-1">e.g., Students, Faculty, Courses</p>
                      </div>
                    </div>
                  </div>
                ))}
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

      case 'table':
        return (
          <div className="space-y-6">
            {/* Table Title */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">1️⃣ Table Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Fee Structure, Faculty List"
              />
            </div>

            {/* Column Management */}
            <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-semibold text-green-900">2️⃣ Column Headers</label>
                  <p className="text-xs text-green-700 mt-1">Total Columns: <span className="font-bold">{(content.headers || []).length}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      addArrayItem('headers', '');
                      console.log('➕ Column added');
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm"
                  >
                    + Add Column
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if ((content.headers || []).length > 0) {
                        removeArrayItem('headers', (content.headers || []).length - 1);
                        console.log('➖ Last column removed');
                      } else {
                        alert('❌ No columns to remove');
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
                  >
                    - Remove Last
                  </button>
                </div>
              </div>

              {(content.headers || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-green-700 mb-3">👈 Click "+ Add Column" to start adding column headers</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(content.headers || []).map((header, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                      <span className="inline-block w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => updateArrayContent('headers', index, e.target.value)}
                        className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder={`Column ${index + 1} name`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row Management */}
            {(content.headers || []).length > 0 && (
              <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-blue-900">3️⃣ Table Data (Rows)</label>
                    <p className="text-xs text-blue-700 mt-1">Total Rows: <span className="font-bold">{(content.rows || []).length}</span> | Columns per row: <span className="font-bold">{(content.headers || []).length}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newRow = Array((content.headers || []).length).fill('');
                        addArrayItem('rows', newRow);
                        console.log('➕ Row added');
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm"
                    >
                      + Add Row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if ((content.rows || []).length > 0) {
                          removeArrayItem('rows', (content.rows || []).length - 1);
                          console.log('➖ Last row removed');
                        } else {
                          alert('❌ No rows to remove');
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
                    >
                      - Remove Last
                    </button>
                  </div>
                </div>

                {(content.rows || []).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-blue-700">👈 Click "+ Add Row" to start adding data</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(content.rows || []).map((row, rowIndex) => (
                      <div key={rowIndex} className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-xs font-semibold text-blue-700 mb-3">Row {rowIndex + 1}:</div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${(content.headers || []).length}, 1fr)` }}>
                          {row.map((cell, cellIndex) => (
                            <div key={cellIndex} className="space-y-1">
                              <label className="text-xs font-semibold text-gray-600 block">
                                {(content.headers || [])[cellIndex] || `Col ${cellIndex + 1}`}
                              </label>
                              <input
                                type="text"
                                value={cell || ''}
                                onChange={(e) => updateTableCell(rowIndex, cellIndex, e.target.value)}
                                className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="Enter data"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Table Preview */}
            {(content.headers || []).length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📊 Preview</label>
                <div className="border-2 border-gray-300 rounded-lg overflow-x-auto bg-gray-50 p-3">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        {(content.headers || []).map((header, idx) => (
                          <th key={idx} className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {header || `Col ${idx + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(content.rows || []).length === 0 ? (
                        <tr>
                          <td colSpan={(content.headers || []).length} className="border border-gray-300 px-3 py-2 text-center text-gray-400">
                            No data rows yet
                          </td>
                        </tr>
                      ) : (
                        (content.rows || []).map((row, rowIdx) => (
                          <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            {row.map((cell, cellIdx) => (
                              <td key={cellIdx} className="border border-gray-300 px-3 py-2">
                                {cell || '—'}
                              </td>
                            ))}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
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
                      onChange={(e) => {
                        const newBlockType = e.target.value;
                        const newContent = getDefaultContent(newBlockType);
                        setEditingBlock({
                          ...editingBlock,
                          blockType: newBlockType,
                          content: newBlockType === editingBlock.blockType ? editingBlock.content : newContent
                        });
                        console.log('📦 Block type changed to', newBlockType, 'with content:', newContent);
                      }}
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

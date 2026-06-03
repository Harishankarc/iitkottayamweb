import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, FileText, Layout, 
  Type, Image, List, Settings, ChevronRight, ChevronDown, Search,
  Palette, BarChart3, Copy, Move, AlertCircle, X, Check
} from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RichEditor from '../components/RichEditor';

const BLOCK_TYPES = [
  { value: 'hero', label: '🎯 Hero Banner', color: '#8b5cf6' },
  { value: 'heading', label: '📝 Heading', color: '#3b82f6' },
  { value: 'paragraph', label: '📄 Paragraph', color: '#10b981' },
  { value: 'image', label: '🖼️ Single Image', color: '#f59e0b' },
  { value: 'gallery', label: '🎨 Image Gallery', color: '#ec4899' },
  { value: 'table', label: '📊 Table', color: '#06b6d4' },
  { value: 'statistics', label: '📈 Statistics', color: '#239244' }
];

// All available pages
const AVAILABLE_PAGES = [
  { pageName: 'homepage', pageTitle: 'Homepage', category: 'Main' },
  { pageName: 'why-iiitk', pageTitle: 'Why IIIT Kottayam', category: 'Main' },
  { pageName: 'about', pageTitle: 'About', category: 'Main' },
  { pageName: 'admission', pageTitle: 'Admission', category: 'Main' },
  { pageName: 'academics', pageTitle: 'Academics', category: 'Main' },
  { pageName: 'research-groups', pageTitle: 'Research Groups', category: 'Research' },
  { pageName: 'faculty-research-papers', pageTitle: 'Faculty Research Papers', category: 'Research' },
  { pageName: 'ug-research-students', pageTitle: 'UG Research Students', category: 'Research' },
  { pageName: 'research-funding', pageTitle: 'Research Funding', category: 'Research' },
  { pageName: 'awards-recognition', pageTitle: 'Awards & Recognition', category: 'Research' },
  { pageName: 'international-collaboration', pageTitle: 'International Collaboration', category: 'Research' },
  { pageName: 'research-activities', pageTitle: 'Research Activities', category: 'Research' },
  { pageName: 'placements', pageTitle: 'Placements & Career', category: 'Placements' },
  { pageName: 'nirf', pageTitle: 'NIRF', category: 'Main' },
  // Courses
  { pageName: 'btech-cse', pageTitle: 'B.Tech CSE', category: 'Courses' },
  { pageName: 'btech-ece', pageTitle: 'B.Tech ECE', category: 'Courses' },
  { pageName: 'btech-cybersecurity', pageTitle: 'B.Tech Cybersecurity', category: 'Courses' },
  { pageName: 'btech-ai-ds', pageTitle: 'B.Tech AI & Data Science', category: 'Courses' },
  // Facilities
  { pageName: 'hostel', pageTitle: 'Hostel', category: 'Facilities' },
  { pageName: 'gym', pageTitle: 'Gymnasium', category: 'Facilities' },
  { pageName: 'internet', pageTitle: 'Campus Network', category: 'Facilities' },
  { pageName: 'medical-centre', pageTitle: 'Medical Centre', category: 'Facilities' },
  { pageName: 'student-mess', pageTitle: 'Student Mess', category: 'Facilities' },
  { pageName: 'security', pageTitle: 'Security', category: 'Facilities' },
  { pageName: 'bank-atm', pageTitle: 'Bank/ATM', category: 'Facilities' },
  // IIC & Clubs
  { pageName: 'innovation-cell', pageTitle: 'Innovation Cell', category: 'Clubs' },
  { pageName: 'cultural-club', pageTitle: 'Cultural Club', category: 'Clubs' },
  { pageName: 'technical-club', pageTitle: 'Technical Club', category: 'Clubs' },
  { pageName: 'sports-club', pageTitle: 'Sports Club', category: 'Clubs' },
  { pageName: 'mind-quest', pageTitle: 'Mind Quest', category: 'Clubs' },
  { pageName: 'fdp-webinar', pageTitle: 'FDP & Webinars', category: 'Clubs' },
  { pageName: 'fdp', pageTitle: 'FDP Programs List', category: 'Clubs' },
  { pageName: 'trendles-club', pageTitle: 'Trendles Club', category: 'Clubs' },
  { pageName: 'cyber-security-club', pageTitle: 'Cyber Security Club', category: 'Clubs' },
  { pageName: 'ieee-student-branch', pageTitle: 'IEEE Student Branch', category: 'Clubs' },
  { pageName: 'acm', pageTitle: 'ACM Student Chapter', category: 'Clubs' },
  // People
  { pageName: 'gender-index', pageTitle: 'Gender Index', category: 'People' },
  // Others
  { pageName: 'media', pageTitle: 'Media', category: 'Others' },
  { pageName: 'gallery', pageTitle: 'Gallery', category: 'Others' },
  { pageName: 'campus-life', pageTitle: 'Campus Life', category: 'Others' },
  { pageName: 'contact', pageTitle: 'Contact', category: 'Others' },
  { pageName: 'governance', pageTitle: 'Governance', category: 'Others' },
  { pageName: 'scholarships', pageTitle: 'Scholarships', category: 'Others' }
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

export default function UnifiedContentManager() {
  const navigate = useNavigate();
  const [view, setView] = useState('pages'); // 'pages' or 'editor'
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [editingBlock, _setEditingBlock] = useState(null);
  const editingBlockRef = useRef(null); // always holds latest editingBlock to avoid stale closures
  // Wrapper: always keeps ref in sync so handleSaveBlock reads fresh data (fixes stale closure bug)
  const setEditingBlock = (val) => {
    editingBlockRef.current = val;
    _setEditingBlock(val);
  };
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  // Refs
  const paragraphEditorRef = useRef(null);

  const color1 = API.color1 || '#239244';
  const color2 = API.color2 || '#e8f5f0';

  const categories = ['All', 'Main', 'Research', 'Placements', 'Courses', 'Facilities', 'Clubs', 'Others'];

  const appendPendingListItem = () => {
    if (!pendingListType) return;
    const existingHtml = editingBlock?.content?.text || '';
    const nextItemNumber = pendingListItemCount + 1;
    const itemLabel = `List item ${nextItemNumber}`;
    const tag = pendingListType;
    const listRegex = new RegExp(`(<${tag}[^>]*>)([\\s\\S]*?)(</${tag}>)`, 'gi');
    let updatedHtml = '';
    let lastIndex = -1;
    let lastMatch = null;
    let match;
    while ((match = listRegex.exec(existingHtml)) !== null) {
      lastIndex = match.index;
      lastMatch = match;
    }

    if (lastMatch) {
      const [fullMatch, openTag, body, closeTag] = lastMatch;
      // Ensure the list element has explicit inline styles so markers are not removed by global CSS
      const styleAttr = `style="margin:12px 0;padding-left:28px;list-style-position:outside;${tag === 'ol' ? 'list-style-type:none;' : 'list-style-type:disc;' }"`;
      const hasStyle = /style=/.test(openTag);
      const finalOpenTag = hasStyle ? openTag : openTag.replace(new RegExp(`^<${tag}`), `<${tag} ${styleAttr}`);
      const liContent = tag === 'ol' ? `${nextItemNumber}.&nbsp;` : '&nbsp;';
      const replacement = `${finalOpenTag}${body}<li>${liContent}</li>${closeTag}`;
      updatedHtml = `${existingHtml.slice(0, lastIndex)}${replacement}${existingHtml.slice(lastIndex + fullMatch.length)}`;
    } else {
      const styleAttr = `style="margin:12px 0;padding-left:28px;list-style-position:outside;${tag === 'ol' ? 'list-style-type:none;' : 'list-style-type:disc;' }"`;
      const liContent = tag === 'ol' ? `${nextItemNumber}.&nbsp;` : '&nbsp;';
      updatedHtml = `${existingHtml}${existingHtml ? '' : ''}<${tag} ${styleAttr}><li>${liContent}</li></${tag}>`;
    }

    setEditingBlock({
      ...editingBlock,
      content: { ...editingBlock.content, text: sanitizeParagraphHtml(updatedHtml) }
    });
    setPendingListItemCount(nextItemNumber);
  };

  useEffect(() => {
    fetchPagesAndBlocks();
  }, []);

  useEffect(() => {
    if (selectedPage && view === 'editor') {
      fetchBlocks();
      loadPageMetadata();
    }
  }, [selectedPage, view]);

  const fetchPagesAndBlocks = async () => {
    try {
      setLoading(true);
      
      // Fetch existing pages from database
      const response = await API.get('/api/pages');
      const dbPages = response.success ? (response.data.data || []) : [];
      
      // Merge with AVAILABLE_PAGES, prioritizing DB data
      const mergedPages = AVAILABLE_PAGES.map(availPage => {
        const dbPage = dbPages.find(p => p.pageName === availPage.pageName);
        return dbPage || { ...availPage, isNew: true };
      });
      
      setPages(mergedPages);
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
        const blocksData = response.data.data || response.data || [];
        setBlocks(Array.isArray(blocksData) ? blocksData : []);
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
        pageSlug: selectedPage.pageSlug || selectedPage.pageName || '',
        metaDescription: selectedPage.metaDescription || '',
        metaKeywords: selectedPage.metaKeywords || '',
        isPublished: selectedPage.isPublished ?? true
      });
    }
  };

  const handleSavePageMetadata = async () => {
    try {
      const url = selectedPage.id 
        ? `/api/pages/${selectedPage.id}`
        : `/api/pages`;
      
      const method = selectedPage.id ? 'PUT' : 'POST';
      
      await API[method.toLowerCase()](url, {
        ...pageMetadata,
        pageName: selectedPage.pageName
      });
      
      alert('Page metadata saved successfully!');
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('Error saving page metadata:', error);
      alert('Error saving page metadata');
    }
  };

  const handleEditBlock = (block) => {
    let parsedContent = block.content;
    if (typeof parsedContent === 'string') {
      try {
        parsedContent = JSON.parse(parsedContent);
      } catch (e) {
        parsedContent = {};
      }
    }
    setPendingListType(null);
    setPendingListItemCount(0);
    setEditingBlock({ ...block, content: parsedContent });
  };

  const handleSaveBlock = async () => {
    // Always read from ref to get the absolute latest editingBlock value,
    // avoiding the stale closure problem where the state captured at render time
    // may not reflect the user's latest edits.
    const editingBlock = editingBlockRef.current;
    try {
      // Validate required fields
      if (!editingBlock?.blockId) {
        alert('❌ Block ID is required');
        return;
      }
      if (!editingBlock?.pageName) {
        alert('❌ Page name is required');
        return;
      }
      if (!editingBlock?.blockType) {
        alert('❌ Block type is required');
        return;
      }

      const blockData = {
        blockId: editingBlock.blockId,
        pageName: editingBlock.pageName,
        blockType: editingBlock.blockType,
        sectionName: editingBlock.sectionName || '',
        blockLabel: editingBlock.blockLabel || editingBlock.blockType,
        content: JSON.stringify(editingBlock.content),
        styling: editingBlock.styling ? JSON.stringify(editingBlock.styling) : '{}',
        layout: editingBlock.layout ? JSON.stringify(editingBlock.layout) : '{}',
        responsive: editingBlock.responsive ? JSON.stringify(editingBlock.responsive) : '{}',
        animation: editingBlock.animation ? JSON.stringify(editingBlock.animation) : '{}',
        blockOrder: editingBlock.blockOrder || 0,
        isVisible: editingBlock.isVisible !== undefined ? editingBlock.isVisible : true
      };

      console.log('📤 Sending block data:', blockData);
      console.log('📋 Complete block data:', { ...blockData, content: editingBlock.content });

      if (editingBlock.id) {
        await API.put(`/api/content-blocks/${editingBlock.id}`, blockData);
      } else {
        const response = await API.post('/api/content-blocks', blockData);
        console.log('✅ Backend response:', response);
      }

      alert('Block saved successfully!');
      setPendingListType(null);
      setPendingListItemCount(0);
      fetchBlocks();
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('❌ Error saving block:', error);
      console.error('Error response data:', error.response?.data);
      
      const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
      const errorDetail = error.response?.data?.error || '';
      
      alert(`❌ Error saving block:\n\n${errorMsg}${errorDetail ? '\nDetails: ' + errorDetail : ''}`);
    }
  };

  const handleDeleteBlock = async (blockId) => {
    if (!confirm('Are you sure you want to delete this block?')) return;

    try {
      await API.delete(`/api/content-blocks/${blockId}`);
      alert('Block deleted successfully!');
      fetchBlocks();
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Error deleting block');
    }
  };

  const handleToggleVisibility = async (block) => {
    try {
      await API.put(`/api/content-blocks/${block.id}`, {
        ...block,
        isVisible: !block.isVisible
      });
      fetchBlocks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    }
  };

  const handleMultipleImageUpload = async (files, block) => {
    try {
      const uploadPromises = Array.from(files).map(file => {
        return new Promise(async (resolve, reject) => {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('folder', 'gallery');
          try {
            const response = await API.post('/api/upload', formData);
            if (response.success) {
              resolve(response.data.url);
            } else {
              reject(new Error('Upload failed'));
            }
          } catch (error) {
            reject(error);
          }
        });
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const currentImages = block.content.images || [];
      setEditingBlock({
        ...block,
        content: { ...block.content, images: [...currentImages, ...uploadedUrls] }
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('❌ Error uploading some images. Please try again.');
    }
  };

  const getPageBlockCount = async (pageName) => {
    try {
      const blocksResponse = await API.get(`/api/content-blocks/page/${pageName}`);
      return (blocksResponse.data?.data || blocksResponse.data || []).length;
    } catch (err) {
      return 0;
    }
  };

  const handleSelectPage = (page) => {
    setPendingListType(null);
    setPendingListItemCount(0);
    setSelectedPage(page);
    setView('editor');
    setEditingBlock(null);
  };

  const handleBackToPages = () => {
    setPendingListType(null);
    setPendingListItemCount(0);
    setView('pages');
    setSelectedPage(null);
    setBlocks([]);
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = 
      page.pageTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.pageName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      selectedCategory === 'All' || page.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderContentEditor = (block) => {
    const blockType = BLOCK_TYPES.find(t => t.value === block.blockType);
    
    switch (block.blockType) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Badge Text</label>
              <input
                type="text"
                value={block.content.badge || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, badge: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="e.g., Technology Infrastructure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Main heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={block.content.description || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, description: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={3}
                placeholder="Brief description"
              />
            </div>
          </div>
        );

      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Heading Text</label>
              <input
                type="text"
                value={block.content.text || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Your heading text"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Heading Level</label>
              <select
                value={block.content.level || 'h2'}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, level: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="h1">H1 - Largest</option>
                <option value="h2">H2 - Large</option>
                <option value="h3">H3 - Medium</option>
                <option value="h4">H4 - Small</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alignment</label>
              <select
                value={block.content.align || 'left'}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, align: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Text Formatting Options</label>
              <div className="p-2 bg-gray-50 border rounded-lg flex flex-wrap gap-2">
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('strong'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">B</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('em'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">I</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('u'); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">U</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.insertLink(); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">Link</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType('ul'); setPendingListItemCount(0); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">UL</button>
                <button type="button" onMouseDown={(e) => { e.preventDefault(); setPendingListType('ol'); setPendingListItemCount(0); }} className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition">OL</button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <div className="border rounded-lg overflow-hidden">
                <RichEditor
                  ref={paragraphEditorRef}
                  value={block.content.text || ''}
                  onChange={(html) => setEditingBlock({
                    ...block,
                    content: { ...block.content, text: sanitizeParagraphHtml(html) }
                  })}
                  showToolbar={false}
                />
              </div>
            </div>
            {pendingListType && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 font-medium mb-2">
                  {pendingListType === 'ul' ? 'Unordered List' : 'Ordered List'} mode active ({pendingListItemCount} items)
                </p>
                <button
                  type="button"
                  onClick={() => appendPendingListItem()}
                  className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-medium hover:bg-blue-700"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => { setPendingListType(null); setPendingListItemCount(0); }}
                  className="px-3 py-1 ml-2 bg-gray-300 text-gray-700 rounded text-xs font-medium hover:bg-gray-400"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Image Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <ImageUploader
                value={block.content.url || ''}
                onChange={(url) => setEditingBlock({
                  ...editingBlock,
                  content: { ...editingBlock.content, url }
                })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alt Text</label>
              <input
                type="text"
                value={block.content.alt || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, alt: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Caption</label>
              <input
                type="text"
                value={block.content.caption || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, caption: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Gallery Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Gallery title (optional)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Add Multiple Images (Upload all at once)</label>
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
                    handleMultipleImageUpload(files, block);
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
                      handleMultipleImageUpload(files, block);
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
              <label className="block text-sm font-medium mb-2">Or enter URLs manually (one per line)</label>
              <textarea
                value={(block.content.images || []).map(img => 
                  typeof img === 'string' ? img : img.url
                ).join('\n')}
                onChange={(e) => {
                  const urls = e.target.value.split('\n').filter(url => url.trim());
                  const images = urls.map(url => ({
                    url: url.trim(),
                    alt: 'Gallery Image',
                    caption: ''
                  }));
                  setEditingBlock({
                    ...block,
                    content: { ...block.content, images }
                  });
                }}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                rows={6}
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
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Our Achievements"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">Statistics</label>
                <button
                  type="button"
                  onClick={() => setEditingBlock({
                    ...block,
                    content: {
                      ...block.content,
                      stats: [...(block.content.stats || []), { value: '', label: '' }]
                    }
                  })}
                  className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Add Stat
                </button>
              </div>
              <div className="space-y-3">
                {(block.content.stats || []).map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-50 border-2 border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-gray-800">Statistic #{index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => {
                          const newStats = block.content.stats.filter((_, i) => i !== index);
                          setEditingBlock({
                            ...block,
                            content: { ...block.content, stats: newStats }
                          });
                        }}
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
                            const newStats = [...block.content.stats];
                            newStats[index] = { ...stat, value: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, stats: newStats }
                            });
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
                            const newStats = [...block.content.stats];
                            newStats[index] = { ...stat, label: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, stats: newStats }
                            });
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

      case 'table':
        return (
          <div className="space-y-6">
            {/* Table Title */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">1️⃣ Table Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Fee Structure, Faculty List"
              />
            </div>

            {/* Column Management */}
            <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-sm font-semibold text-green-900">2️⃣ Column Headers</label>
                  <p className="text-xs text-green-700 mt-1">Total Columns: <span className="font-bold">{(block.content.headers || []).length}</span></p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingBlock({
                      ...block,
                      content: { 
                        ...block.content, 
                        headers: [...(block.content.headers || []), '']
                      }
                    })}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-sm"
                  >
                    + Add Column
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if ((block.content.headers || []).length > 0) {
                        const headers = block.content.headers.slice(0, -1);
                        const rows = (block.content.rows || []).map(row => row.slice(0, -1));
                        setEditingBlock({
                          ...block,
                          content: { ...block.content, headers, rows }
                        });
                      }
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
                  >
                    - Remove Last
                  </button>
                </div>
              </div>

              {(block.content.headers || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-green-700 mb-3">👈 Click "+ Add Column" to start adding column headers</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(block.content.headers || []).map((header, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-lg border border-green-200">
                      <span className="inline-block w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <input
                        type="text"
                        value={header}
                        onChange={(e) => {
                          const headers = [...block.content.headers];
                          headers[index] = e.target.value;
                          setEditingBlock({
                            ...block,
                            content: { ...block.content, headers }
                          });
                        }}
                        className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder={`Column ${index + 1} name`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Row Management */}
            {(block.content.headers || []).length > 0 && (
              <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-blue-900">3️⃣ Table Data (Rows)</label>
                    <p className="text-xs text-blue-700 mt-1">Total Rows: <span className="font-bold">{(block.content.rows || []).length}</span> | Columns per row: <span className="font-bold">{(block.content.headers || []).length}</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const newRow = Array((block.content.headers || []).length).fill('');
                        setEditingBlock({
                          ...block,
                          content: { 
                            ...block.content, 
                            rows: [...(block.content.rows || []), newRow]
                          }
                        });
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm"
                    >
                      + Add Row
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if ((block.content.rows || []).length > 0) {
                          const rows = block.content.rows.slice(0, -1);
                          setEditingBlock({
                            ...block,
                            content: { ...block.content, rows }
                          });
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm"
                    >
                      - Remove Last
                    </button>
                  </div>
                </div>

                {(block.content.rows || []).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-sm text-blue-700">👈 Click "+ Add Row" to start adding data</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(block.content.rows || []).map((row, rowIndex) => (
                      <div key={rowIndex} className="bg-white p-4 rounded-lg border-2 border-blue-200">
                        <div className="text-xs font-semibold text-blue-700 mb-3">Row {rowIndex + 1}:</div>
                        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${(block.content.headers || []).length}, 1fr)` }}>
                          {row.map((cell, cellIndex) => (
                            <div key={cellIndex} className="space-y-1">
                              <label className="text-xs font-semibold text-gray-600 block">
                                {(block.content.headers || [])[cellIndex] || `Col ${cellIndex + 1}`}
                              </label>
                              <input
                                type="text"
                                value={cell || ''}
                                onChange={(e) => {
                                  const rows = [...block.content.rows];
                                  rows[rowIndex] = [...rows[rowIndex]];
                                  rows[rowIndex][cellIndex] = e.target.value;
                                  setEditingBlock({
                                    ...block,
                                    content: { ...block.content, rows }
                                  });
                                }}
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
            {(block.content.headers || []).length > 0 && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">📊 Preview</label>
                <div className="border-2 border-gray-300 rounded-lg overflow-x-auto bg-gray-50 p-3">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-green-600 text-white">
                        {(block.content.headers || []).map((header, idx) => (
                          <th key={idx} className="border border-gray-300 px-3 py-2 text-left font-semibold">
                            {header || `Col ${idx + 1}`}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {(block.content.rows || []).length === 0 ? (
                        <tr>
                          <td colSpan={(block.content.headers || []).length} className="border border-gray-300 px-3 py-2 text-center text-gray-400">
                            No data rows yet
                          </td>
                        </tr>
                      ) : (
                        (block.content.rows || []).map((row, rowIdx) => (
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
          <div className="text-center text-gray-500 py-8">
            <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Content editor for {block.blockType} type coming soon...</p>
          </div>
        );
    }
  };

  // Pages List View
  if (view === 'pages') {
    return (
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: color1 }}>
            Content Management
          </h1>
          <p className="text-gray-600">
            Manage all website pages and their content blocks in one place
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                style={selectedCategory === cat ? { backgroundColor: color1 } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPages.map(page => (
            <div
              key={page.pageName}
              className="border rounded-xl p-5 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => handleSelectPage(page)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors">
                    {page.pageTitle}
                  </h3>
                  <p className="text-sm text-gray-500">/{page.pageName}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Layout className="w-4 h-4" style={{ color: color1 }} />
                  <span className="text-gray-600">
                    Content blocks
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    page.isPublished !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {page.isPublished !== false ? 'Published' : 'Draft'}
                </span>
              </div>

              {page.category && (
                <div className="mt-3 pt-3 border-t">
                  <span className="text-xs text-gray-500">{page.category}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No pages found</p>
          </div>
        )}
      </div>
    );
  }

  // Content Editor View - Two Column Block Editor Layout
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Bar */}
      <div className="border-b px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-full">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToPages}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span className="font-medium">Back</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h2 className="text-2xl font-bold" style={{ color: color1 }}>
                {selectedPage?.pageTitle}
              </h2>
              <p className="text-xs text-gray-500">/{selectedPage?.pageName}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSavePageMetadata}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors font-medium"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Two-Column Editor Layout */}
      <div className="flex-1 overflow-hidden flex gap-0">
        {/* LEFT SIDEBAR - Block Type Selector, Options & Block List */}
        <div className="w-72 border-r bg-gray-50 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Block Type Selector */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <label className="block text-sm font-bold text-slate-900 mb-3">Block Type</label>
              <select 
                value={editingBlock?.blockType || 'paragraph'} 
                onChange={(e) => {
                  const newType = e.target.value;
                  
                  setPendingListType(null);
                  setPendingListItemCount(0);
                  // Initialize proper default content for each block type
                  let newContent = {};
                  switch(newType) {
                    case 'hero': 
                      newContent = { 
                        title: '', 
                        subtitle: '',
                        description: '',
                        badge: '',
                        backgroundImage: '',
                        cta: '',
                        ctaLink: ''
                      }; 
                      break;
                    case 'heading': 
                      newContent = { 
                        text: 'Your heading text',
                        level: 'h2'
                      }; 
                      break;
                    case 'paragraph': 
                      newContent = { 
                        text: 'Your paragraph text'
                      }; 
                      break;
                    case 'image': 
                      newContent = { 
                        url: '',
                        alt: '',
                        caption: ''
                      }; 
                      break;
                    case 'table': 
                      newContent = { 
                        title: '',
                        subtitle: '',
                        headers: ['Header 1', 'Header 2', 'Header 3'],
                        rows: [['Cell 1', 'Cell 2', 'Cell 3']],
                        notes: []
                      }; 
                      break;
                    case 'gallery': 
                      newContent = { 
                        title: '',
                        images: []
                      }; 
                      break;
                    case 'statistics': 
                      newContent = { 
                        title: '',
                        stats: [{label: 'Stat 1', value: '100+'}, {label: 'Stat 2', value: '50+'}]
                      }; 
                      break;
                    default: 
                      newContent = { text: '' };
                  }
                  
                  // Preserve blockId, pageName, and other metadata while updating blockType and content
                  setEditingBlock({ 
                    ...editingBlock, 
                    blockType: newType, 
                    content: newContent 
                  });
                }} 
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {BLOCK_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            {/* Block ID Input */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <label className="block text-sm font-bold text-slate-900 mb-3">Block ID</label>
              <input
                type="text"
                value={editingBlock?.blockId || ''}
                onChange={(e) => setEditingBlock({ ...editingBlock, blockId: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="unique-block-id"
              />
            </div>

            {/* Visibility Toggle */}
            <div className="bg-white rounded-lg border p-4 shadow-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={editingBlock?.isVisible !== false}
                  onChange={(e) => setEditingBlock({ ...editingBlock, isVisible: e.target.checked })}
                  className="h-5 w-5 rounded"
                />
                <span className="text-sm font-semibold text-slate-700">Visible</span>
              </label>
            </div>

            {/* Added Blocks List */}
            <div className="bg-white rounded-lg border p-4 shadow-sm flex-1 min-h-0 flex flex-col overflow-hidden">
              <h4 className="text-sm font-bold text-slate-900 mb-3">Blocks ({blocks.length})</h4>
              <div className="flex-1 min-h-0 overflow-y-auto space-y-1">
                {blocks.length === 0 ? (
                  <p className="text-xs text-gray-400">No blocks yet</p>
                ) : (
                  blocks.map((block, index) => {
                    const blockType = BLOCK_TYPES.find(t => t.value === block.blockType);
                    const isSelected = editingBlock?.id === block.id;
                    return (
                      <button
                        key={block.id}
                        onClick={() => handleEditBlock(block)}
                        className={`w-full flex items-center gap-2 p-2 rounded-lg text-left text-xs transition-colors ${
                          isSelected 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span className={`flex-shrink-0 h-5 w-5 flex items-center justify-center rounded text-xs font-bold ${isSelected ? 'bg-white text-green-500' : 'bg-gray-300 text-gray-700'}`}>
                          {index + 1}
                        </span>
                        <span className="flex-1 truncate">{blockType?.label || block.blockType}</span>
                        {block.isVisible === false && <EyeOff size={12} />}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Add Block Button */}
          <div className="p-4 border-t bg-white">
            <button
              onClick={() => {
                setPendingListType(null);
                setPendingListItemCount(0);
                const newBlock = {
                  blockId: `block-${Date.now()}`,
                  pageName: selectedPage.pageName,
                  sectionName: '',
                  blockType: 'paragraph',
                  blockLabel: 'New Block',
                  content: { text: '' },
                  styling: {},
                  layout: {},
                  responsive: {},
                  animation: {},
                  blockOrder: blocks.length + 1,
                  isVisible: true
                };
                setEditingBlock(newBlock);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium transition-all"
              style={{ backgroundColor: color1 }}
            >
              <Plus className="w-4 h-4" />
              Add Block
            </button>
          </div>
        </div>

        {/* RIGHT PANEL - Block Content Editor */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {!editingBlock ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Layout className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-500 mb-4">Select a block to edit or create a new one</p>
                <button
                  onClick={() => {
                    setPendingListType(null);
                    setPendingListItemCount(0);
                    const newBlock = {
                      blockId: `block-${Date.now()}`,
                      pageName: selectedPage.pageName,
                      sectionName: '',
                      blockType: 'paragraph',
                      blockLabel: 'New Block',
                      content: { text: '' },
                      styling: {},
                      layout: {},
                      responsive: {},
                      animation: {},
                      blockOrder: blocks.length + 1,
                      isVisible: true
                    };
                    setEditingBlock(newBlock);
                  }}
                  className="px-6 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: color1 }}
                >
                  Create First Block
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-w-2xl">
              <div>
                <h3 className="text-lg font-bold mb-4">Block Content</h3>
                {renderContentEditor(editingBlock)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setPendingListType(null);
                    setPendingListItemCount(0);
                    setEditingBlock(null);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancel
                </button>
                {editingBlock.id && (
                  <button
                    onClick={() => {
                      handleDeleteBlock(editingBlock.id);
                      setPendingListType(null);
                      setPendingListItemCount(0);
                      setEditingBlock(null);
                    }}
                    className="flex-1 px-4 py-2 rounded-lg text-red-600 border border-red-200 hover:bg-red-50 font-medium transition-colors"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={async () => {
                    await handleSaveBlock();
                    setPendingListType(null);
                    setPendingListItemCount(0);
                    setEditingBlock(null);
                  }}
                  className="flex-1 px-4 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition-all"
                  style={{ backgroundColor: color1 }}
                >
                  <Save className="w-4 h-4" />
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import {
  Plus, Edit2, Trash2, Eye, EyeOff, Save, FileText, Layout,
  Type, Image, List, Settings, ChevronRight, ChevronDown, Search,
  Palette, BarChart3, Copy, Move, AlertCircle, X, Check, Briefcase, Building2, Upload
} from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RichEditor from '../components/RichEditor';

const BLOCK_TYPES = [
  { value: 'hero', label: '🎯 Hero Banner', color: '#8b5cf6' },
  { value: 'heading', label: '📝 Heading', color: '#3b82f6' },
  { value: 'paragraph', label: '📄 Paragraph', color: '#10b981' },
  { value: 'pdf', label: '📄 PDF Document', color: '#ef4444' },
  { value: 'image', label: '🖼️ Single Image', color: '#f59e0b' },
  { value: 'gallery', label: '🎨 Image Gallery', color: '#ec4899' },
  { value: 'table', label: '📊 Table', color: '#06b6d4' },
  { value: 'statistics', label: '📈 Statistics', color: '#239244' },
  { value: 'logo', label: '🏢 Company Logo', color: '#64748b' },
  { value: 'map', label: '🗺️ Map Embeds', color: '#f43f5e' },
  { value: 'button', label: '🔘 Button Link', color: '#d97706' }
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
  { pageName: 'sports', pageTitle: 'Sports', category: 'Facilities' },
  { pageName: 'bank-atm', pageTitle: 'Bank/ATM', category: 'Facilities' },
  // IIC & Clubs
  { pageName: 'innovation-cell', pageTitle: 'Innovation Cell', category: 'Clubs' },
  { pageName: 'cultural-club', pageTitle: 'Cultural Club', category: 'Clubs' },
  { pageName: 'technical-club', pageTitle: 'Technical Club', category: 'Clubs' },
  { pageName: 'sports-club', pageTitle: 'Sports Club', category: 'Clubs' },
  { pageName: 'mind-quest', pageTitle: 'Mind Quest', category: 'Clubs' },
  { pageName: 'fdp-webinar', pageTitle: 'FDP & Webinars', category: 'Clubs' },
  { pageName: 'trendles-club', pageTitle: 'Trendles Club', category: 'Clubs' },
  { pageName: 'cyber-security-club', pageTitle: 'Cyber Security Club', category: 'Clubs' },
  { pageName: 'ieee-student-branch', pageTitle: 'IEEE Student Branch', category: 'Clubs' },
  { pageName: 'acm', pageTitle: 'ACM Student Chapter', category: 'Clubs' },
  // People
  { pageName: 'gender-index', pageTitle: 'Gender Index', category: 'People' },
  // Others
  { pageName: 'idy-2022', pageTitle: 'IDY-2022', category: 'Others' },
  { pageName: 'media', pageTitle: 'Media', category: 'Others' },
  { pageName: 'gallery', pageTitle: 'Gallery', category: 'Others' },
  { pageName: 'campus-life', pageTitle: 'Campus Life', category: 'Others' },
  { pageName: 'contact', pageTitle: 'Contact', category: 'Others' },
  { pageName: 'rti', pageTitle: 'RTI', category: 'Others' },
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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageQuery = searchParams.get('page');
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

  const [activeFormats, setActiveFormats] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    const checkActiveFormats = () => {
      try {
        const hasParentTag = (tagName) => {
          try {
            const sel = window.getSelection();
            if (!sel || !sel.rangeCount) return false;
            let node = sel.getRangeAt(0).startContainer;
            while (node && node !== document.body) {
              if (node && node.nodeName && node.nodeName.toLowerCase() === tagName.toLowerCase()) {
                return true;
              }
              node = node.parentNode;
            }
          } catch (e) {}
          return false;
        };

        const boldActive = document.queryCommandState('bold') || hasParentTag('strong') || hasParentTag('b');
        const italicActive = document.queryCommandState('italic') || hasParentTag('em') || hasParentTag('i');
        const underlineActive = document.queryCommandState('underline') || hasParentTag('u');
        
        setActiveFormats({
          bold: boldActive,
          italic: italicActive,
          underline: underlineActive
        });
      } catch (e) {}
    };

    document.addEventListener('selectionchange', checkActiveFormats);
    return () => {
      document.removeEventListener('selectionchange', checkActiveFormats);
    };
  }, []);

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
      const styleAttr = `style="margin:12px 0;padding-left:28px;list-style-position:outside;list-style-type:${tag === 'ol' ? 'none' : 'disc'};"`;
      const hasStyle = /style=/.test(openTag);
      const finalOpenTag = hasStyle ? openTag : openTag.replace(new RegExp(`^<${tag}`), `<${tag} ${styleAttr}`);
      const liContent = tag === 'ol' ? `${nextItemNumber}.&nbsp;` : '&nbsp;';
      const replacement = `${finalOpenTag}${body}<li>${liContent}</li>${closeTag}`;
      updatedHtml = `${existingHtml.slice(0, lastIndex)}${replacement}${existingHtml.slice(lastIndex + fullMatch.length)}`;
    } else {
      const styleAttr = `style="margin:12px 0;padding-left:28px;list-style-position:outside;list-style-type:${tag === 'ol' ? 'none' : 'disc'};"`;
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
    if (pages.length > 0) {
      if (pageQuery) {
        const matchedPage = pages.find(p => p.pageName === pageQuery);
        if (matchedPage) {
          if (!selectedPage || selectedPage.pageName !== matchedPage.pageName || view !== 'editor') {
            setSelectedPage(matchedPage);
            setView('editor');
            setEditingBlock(null);
          }
        }
      } else {
        navigate('/admin');
      }
    }
  }, [pages, pageQuery]);

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
        const rawBlocks = Array.isArray(blocksData) ? blocksData : [];

        const blockTypeFilter = searchParams.get('blockType');
        const filteredBlocks = blockTypeFilter
          ? rawBlocks.filter(b => b.blockType === blockTypeFilter)
          : rawBlocks;

        setBlocks(filteredBlocks);

        if (blockTypeFilter && filteredBlocks.length > 0) {
          const matchingBlock = filteredBlocks.find(b => b.blockType === blockTypeFilter);
          if (matchingBlock) {
            let parsedContent = matchingBlock.content;
            if (typeof parsedContent === 'string') {
              try {
                parsedContent = JSON.parse(parsedContent);
              } catch (e) {
                parsedContent = {};
              }
            }
            setEditingBlock({ ...matchingBlock, content: parsedContent });
          }
        }
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
      setLoading(true);

      // Save editing block if any active edits are present
      if (editingBlockRef.current) {
        const blockSaved = await handleSaveBlock({ silent: true });
        if (!blockSaved) {
          // If block save failed, don't continue to save metadata
          return;
        }
      }

      const url = selectedPage.id
        ? `/api/pages/${selectedPage.id}`
        : `/api/pages`;

      const method = selectedPage.id ? 'PUT' : 'POST';

      await API[method.toLowerCase()](url, {
        ...pageMetadata,
        pageName: selectedPage.pageName
      });

      alert('Page saved successfully!');
      setEditingBlock(null);
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('Error saving page metadata:', error);
      alert('Error saving page metadata');
    } finally {
      setLoading(false);
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

  const handleSwapBlocks = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const newBlocks = [...blocks];
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIndex];
    newBlocks[targetIndex] = temp;

    // Assign blockOrder to reflect their 1-based position in array
    const orderedBlocks = newBlocks.map((b, idx) => ({
      ...b,
      blockOrder: idx + 1
    }));

    setBlocks(orderedBlocks);

    if (editingBlockRef.current) {
      const updatedEditingBlock = orderedBlocks.find(b => b.id === editingBlockRef.current.id);
      if (updatedEditingBlock) {
        setEditingBlock(updatedEditingBlock);
      }
    }

    try {
      setLoading(true);
      const response = await API.post('/api/content-blocks/reorder', {
        blocks: orderedBlocks.map(b => ({
          id: b.id,
          blockOrder: b.blockOrder
        }))
      });
      if (!response.success) {
        throw new Error(response.message || 'Failed to update block order');
      }
      console.log('✅ Block orders saved successfully on swap');
    } catch (err) {
      console.error('❌ Error saving block order:', err);
      alert('❌ Failed to save block order to server. Reverting order.');
      fetchBlocks();
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBlock = async (options = {}) => {
    const silent = options.silent || false;
    // Always read from ref to get the absolute latest editingBlock value,
    // avoiding the stale closure problem where the state captured at render time
    // may not reflect the user's latest edits.
    const editingBlock = editingBlockRef.current;

    // Validate required fields
    if (!editingBlock?.blockId) {
      if (!silent) alert('❌ Block ID is required');
      return false;
    }
    if (!editingBlock?.pageName) {
      if (!silent) alert('❌ Page name is required');
      return false;
    }
    if (!editingBlock?.blockType) {
      if (!silent) alert('❌ Block type is required');
      return false;
    }

    try {
      if (!silent) setLoading(true);
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

      let response;
      if (editingBlock.id) {
        response = await API.put(`/api/content-blocks/${editingBlock.id}`, blockData);
      } else {
        response = await API.post('/api/content-blocks', blockData);
        console.log('✅ Backend response:', response);
      }

      if (response && response.success === false) {
        if (!silent) {
          alert(`❌ Failed to save block:\n\n${response.error || response.message || 'Unknown error'}`);
        }
        return false;
      }

      if (!silent) {
        alert('Block saved successfully!');
      }
      setPendingListType(null);
      setPendingListItemCount(0);

      if (!silent) {
        fetchBlocks();
        fetchPagesAndBlocks();
      }
      return true;
    } catch (error) {
      console.error('❌ Error saving block:', error);
      console.error('Error response data:', error.response?.data);

      if (!silent) {
        const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
        const errorDetail = error.response?.data?.error || '';
        alert(`❌ Error saving block:\n\n${errorMsg}${errorDetail ? '\nDetails: ' + errorDetail : ''}`);
      }
      return false;
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleDeleteBlock = async (blockId) => {
    if (!confirm('Are you sure you want to delete this block?')) return;

    try {
      setLoading(true);
      await API.delete(`/api/content-blocks/${blockId}`);
      alert('Block deleted successfully!');
      fetchBlocks();
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('Error deleting block:', error);
      alert('Error deleting block');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleVisibility = async (block) => {
    try {
      setLoading(true);
      const updatedVisible = block.isVisible !== false ? false : true;
      await API.put(`/api/content-blocks/${block.id}`, {
        ...block,
        content: typeof block.content === 'string' ? JSON.parse(block.content) : block.content,
        isVisible: updatedVisible
      });

      if (editingBlockRef.current && editingBlockRef.current.id === block.id) {
        setEditingBlock({
          ...editingBlockRef.current,
          isVisible: updatedVisible
        });
      }

      fetchBlocks();
    } catch (error) {
      console.error('Error toggling visibility:', error);
    } finally {
      setLoading(false);
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
    setSearchParams({ page: page.pageName });
  };

  const handleBackToPages = () => {
    setPendingListType(null);
    setPendingListItemCount(0);
    navigate('/admin');
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
        if (block.blockId === 'contact-reach') {
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={block.content.title || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, title: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Kottayam Distance</label>
                  <input
                    type="text"
                    value={block.content.distanceKottayam || ''}
                    onChange={(e) => setEditingBlock({
                      ...block,
                      content: { ...block.content, distanceKottayam: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 30 km"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Valavoor/Valla Distance</label>
                  <input
                    type="text"
                    value={block.content.distanceValavoor || ''}
                    onChange={(e) => setEditingBlock({
                      ...block,
                      content: { ...block.content, distanceValavoor: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="e.g. 18 km"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">From the Bus Station</label>
                <textarea
                  value={block.content.busRoute || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, busRoute: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">From the Airport</label>
                <textarea
                  value={block.content.airportRoute || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, airportRoute: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">From the Railway Station</label>
                <textarea
                  value={block.content.railwayRoute || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, railwayRoute: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  rows={3}
                />
              </div>
            </div>
          );
        }

        if (block.blockId === 'contact-address') {
          return (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  value={block.content.title || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, title: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  value={block.content.addressLine1 || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, addressLine1: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Indian Institute of Information Technology Kottayam"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  value={block.content.addressLine2 || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, addressLine2: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Valavoor PO"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 3</label>
                <input
                  type="text"
                  value={block.content.addressLine3 || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, addressLine3: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Kottayam, Kerala"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address Line 4</label>
                <input
                  type="text"
                  value={block.content.addressLine4 || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, addressLine4: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Kerala, India"
                />
              </div>
              <div className="border-t pt-4 mt-4 space-y-4">
                <h4 className="text-sm font-bold text-gray-900">Social Media Links</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Facebook URL</label>
                    <input
                      type="text"
                      value={block.content.facebook || ''}
                      onChange={(e) => setEditingBlock({
                        ...block,
                        content: { ...block.content, facebook: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Twitter URL</label>
                    <input
                      type="text"
                      value={block.content.twitter || ''}
                      onChange={(e) => setEditingBlock({
                        ...block,
                        content: { ...block.content, twitter: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">LinkedIn URL</label>
                    <input
                      type="text"
                      value={block.content.linkedin || ''}
                      onChange={(e) => setEditingBlock({
                        ...block,
                        content: { ...block.content, linkedin: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">YouTube URL</label>
                    <input
                      type="text"
                      value={block.content.youtube || ''}
                      onChange={(e) => setEditingBlock({
                        ...block,
                        content: { ...block.content, youtube: e.target.value }
                      })}
                      className="w-full px-3 py-2 border rounded-lg text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="space-y-4">
            {block.blockId !== 'homepage-vision' && block.blockId !== 'homepage-mission' && (
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
            )}
            <div>
              <style>{`
                @keyframes format-pop {
                  0% { transform: scale(1); }
                  50% { transform: scale(1.15); }
                  100% { transform: scale(1); }
                }
                .format-btn-active {
                  animation: format-pop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
              `}</style>
              <label className="block text-sm font-medium mb-2">Text Formatting Options</label>
              <div className="p-2 bg-gray-50 border rounded-lg flex flex-wrap gap-2">
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('strong'); }}
                  className={`px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition-all duration-200 ${activeFormats.bold ? 'format-btn-active font-semibold' : ''}`}
                  style={activeFormats.bold ? { backgroundColor: color1, color: '#fff', borderColor: color1 } : {}}
                >
                  B
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('em'); }}
                  className={`px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition-all duration-200 ${activeFormats.italic ? 'format-btn-active' : ''}`}
                  style={activeFormats.italic ? { backgroundColor: color1, color: '#fff', borderColor: color1 } : {}}
                >
                  I
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.applyInlineFormat('u'); }}
                  className={`px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition-all duration-200 ${activeFormats.underline ? 'format-btn-active' : ''}`}
                  style={activeFormats.underline ? { backgroundColor: color1, color: '#fff', borderColor: color1 } : {}}
                >
                  U
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.insertLink(); }}
                  className="px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition"
                >
                  Link
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType('ul'); setPendingListItemCount(0); }}
                  className={`px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition-all duration-200 ${pendingListType === 'ul' ? 'format-btn-active' : ''}`}
                  style={pendingListType === 'ul' ? { backgroundColor: color1, color: '#fff', borderColor: color1 } : {}}
                >
                  UL
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType('ol'); setPendingListItemCount(0); }}
                  className={`px-3 py-1 bg-white border border-gray-300 hover:bg-gray-100 rounded text-sm font-medium cursor-pointer transition-all duration-200 ${pendingListType === 'ol' ? 'format-btn-active' : ''}`}
                  style={pendingListType === 'ol' ? { backgroundColor: color1, color: '#fff', borderColor: color1 } : {}}
                >
                  OL
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); setPendingListType(null); paragraphEditorRef.current?.exec('removeFormat'); }}
                  className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded text-sm font-medium cursor-pointer transition"
                >
                  Clear
                </button>
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
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800">💡 Gallery Image Guidelines:</span>
              <p>• Recommended Size: Square aspect ratio (1:1), e.g., <strong className="text-slate-800">800 &times; 800 px</strong> or higher.</p>
              <p>• Display format: 4 columns per row, centered, with individual image dimensions rendering as <strong className="text-slate-800">187.5px &times; 187.5px</strong>.</p>
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
              <label className="block text-sm font-semibold mb-2 text-gray-700">Display Layout</label>
              <select
                value={block.content.layout || 'chart'}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, layout: e.target.value }
                })}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
              >
                <option value="chart">📊 Bar Chart (Homepage Style)</option>
                <option value="cards">🎴 Card Grid</option>
              </select>
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
                      <div className="grid grid-cols-2 gap-3">
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'table': {
        const parseCellVal = (val = '') => {
          if (typeof val !== 'string') return { text: val || '', colspan: 1, rowspan: 1, isImage: false, imageUrl: '' };
          const colMatch = val.match(/\[col=(\d+)\]/);
          const rowMatch = val.match(/\[row=(\d+)\]/);
          let text = val.replace(/\s*\[col=\d+\]|\s*\[row=\d+\]/g, '');
          const isImage = text.includes('[img]');
          let imageUrl = '';
          if (isImage) {
            imageUrl = text.replace('[img]', '').trim();
            text = '';
          }
          return {
            text,
            colspan: colMatch ? parseInt(colMatch[1], 10) : 1,
            rowspan: rowMatch ? parseInt(rowMatch[1], 10) : 1,
            isImage,
            imageUrl
          };
        };

        const formatCellVal = (textOrUrl, colspan, rowspan, isImage = false) => {
          let suffix = '';
          if (colspan > 1) suffix += ` [col=${colspan}]`;
          if (rowspan > 1) suffix += ` [row=${rowspan}]`;
          const mainVal = isImage ? `[img]${textOrUrl}` : textOrUrl;
          return `${mainVal}${suffix}`;
        };

        const getMergedCoverage = (headers, rows) => {
          const colCount = (headers || []).length;
          const rowCount = (rows || []).length;
          const coverage = Array(rowCount).fill(null).map(() => Array(colCount).fill(null));
          for (let r = 0; r < rowCount; r++) {
            for (let c = 0; c < colCount; c++) {
              const cellVal = rows[r]?.[c] || '';
              const parsed = parseCellVal(cellVal);
              const colspan = parsed.colspan;
              const rowspan = parsed.rowspan;
              if (colspan > 1 || rowspan > 1) {
                for (let dr = 0; dr < rowspan; dr++) {
                  for (let dc = 0; dc < colspan; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    const targetR = r + dr;
                    const targetC = c + dc;
                    if (targetR < rowCount && targetC < colCount) {
                      coverage[targetR][targetC] = {
                        sourceRow: r,
                        sourceCol: c,
                        sourceLabel: `Row ${r + 1}, Col ${c + 1}`
                      };
                    }
                  }
                }
              }
            }
          }
          return coverage;
        };

        const getHeaderMergedCoverage = (headers) => {
          const colCount = (headers || []).length;
          const coverage = Array(colCount).fill(null);
          for (let c = 0; c < colCount; c++) {
            const headerVal = headers[c] || '';
            const parsed = parseCellVal(headerVal);
            const colspan = parsed.colspan;
            if (colspan > 1) {
              for (let dc = 1; dc < colspan; dc++) {
                const targetC = c + dc;
                if (targetC < colCount) {
                  coverage[targetC] = {
                    sourceCol: c,
                    sourceLabel: `Col ${c + 1}`
                  };
                }
              }
            }
          }
          return coverage;
        };

        const headerCoverage = getHeaderMergedCoverage(block.content.headers);
        const rowsCoverage = getMergedCoverage(block.content.headers, block.content.rows);

        return (
          <div className="space-y-6">
            {block.blockId === 'contact-phones' && (
              <div className="p-4 bg-gray-50 rounded-lg border">
                <label className="block text-sm font-bold text-slate-900 mb-2">Reach Us Email</label>
                <input
                  type="email"
                  value={block.content.email || ''}
                  onChange={(e) => setEditingBlock({
                    ...block,
                    content: { ...block.content, email: e.target.value }
                  })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 bg-white text-sm"
                  placeholder="office@iiitkottayam.ac.in"
                />
              </div>
            )}
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
                    className="px-3.5 py-2 rounded-xl text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 active:bg-emerald-200 border border-emerald-200 hover:border-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Column
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if ((block.content.headers || []).length > 0) {
                        const headers = block.content.headers.slice(0, -1);
                        const rows = (block.content.rows || []).map(row => row.slice(0, -1));
                        const widths = (block.content.widths || []).slice(0, -1);
                        setEditingBlock({
                          ...block,
                          content: { ...block.content, headers, rows, widths }
                        });
                      }
                    }}
                    className="px-3.5 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100/80 active:bg-rose-200 border border-rose-200 hover:border-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    Remove Last
                  </button>
                </div>
              </div>

              {(block.content.headers || []).length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-sm text-green-700 mb-3">👈 Click "+ Add Column" to start adding column headers</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {(block.content.headers || []).map((header, index) => {
                    const parsedHeader = parseCellVal(header);
                    const isCovered = headerCoverage[index];
                    const hasNextColumn = index + parsedHeader.colspan < (block.content.headers || []).length;
                    const isMerged = parsedHeader.colspan > 1;

                    if (isCovered) {
                      return (
                        <div key={index} className="px-4 py-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-[10px] font-bold shrink-0">{index + 1}</span>
                            <span>Col {index + 1} — merged into Col {isCovered.sourceCol + 1}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const srcIndex = isCovered.sourceCol;
                              const parsedSrc = parseCellVal(block.content.headers[srcIndex]);
                              const headers = [...block.content.headers];
                              headers[srcIndex] = formatCellVal(parsedSrc.text, Math.max(1, parsedSrc.colspan - 1), parsedSrc.rowspan);
                              setEditingBlock({ ...block, content: { ...block.content, headers } });
                            }}
                            className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-2.5 py-1 rounded-lg hover:bg-rose-100 cursor-pointer transition-all"
                          >
                            ✕ Unmerge
                          </button>
                        </div>
                      );
                    }

                    return (
                      <div key={index} className="bg-white rounded-xl border border-green-200 overflow-hidden">
                        {/* Header: column label + merge badge */}
                        <div className="flex items-center gap-2 px-3 pt-3 pb-2">
                          <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-[10px] font-bold shrink-0">{index + 1}</span>
                          {isMerged && (
                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                              ↔ Spans {parsedHeader.colspan} columns
                            </span>
                          )}
                        </div>

                        {/* Name input + width */}
                        <div className="flex items-center gap-2 px-3 pb-2">
                          <input
                            type="text"
                            value={parsedHeader.text}
                            onChange={(e) => {
                              const headers = [...block.content.headers];
                              headers[index] = formatCellVal(e.target.value, parsedHeader.colspan, parsedHeader.rowspan);
                              setEditingBlock({ ...block, content: { ...block.content, headers } });
                            }}
                            className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                            placeholder={`Column ${index + 1} name`}
                          />
                          <input
                            type="number" min="1" max="100"
                            value={(block.content.widths || [])[index] || ''}
                            onChange={(e) => {
                              const widths = [...(block.content.widths || [])];
                              while (widths.length < index) widths.push('');
                              widths[index] = e.target.value;
                              setEditingBlock({ ...block, content: { ...block.content, widths } });
                            }}
                            className="w-16 px-2 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm text-center"
                            placeholder="W%"
                          />
                        </div>

                        {/* Merge action bar */}
                        <div className="border-t border-green-100 px-3 py-2 flex items-center gap-2 bg-green-50/40">
                          {hasNextColumn && !isMerged && (
                            <button
                              type="button"
                              onClick={() => {
                                const headers = [...block.content.headers];
                                headers[index] = formatCellVal(parsedHeader.text, parsedHeader.colspan + 1, parsedHeader.rowspan);
                                setEditingBlock({ ...block, content: { ...block.content, headers } });
                              }}
                              className="text-[11px] font-bold text-emerald-700 bg-white border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all flex items-center gap-1"
                            >
                              <span>↔</span> Merge with next column
                            </button>
                          )}
                          {hasNextColumn && isMerged && (
                            <button
                              type="button"
                              onClick={() => {
                                const headers = [...block.content.headers];
                                headers[index] = formatCellVal(parsedHeader.text, parsedHeader.colspan + 1, parsedHeader.rowspan);
                                setEditingBlock({ ...block, content: { ...block.content, headers } });
                              }}
                              className="text-[11px] font-bold text-emerald-700 bg-white border border-emerald-300 px-3 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all flex items-center gap-1"
                            >
                              <span>↔</span> Extend merge
                            </button>
                          )}
                          {isMerged && (
                            <button
                              type="button"
                              onClick={() => {
                                const headers = [...block.content.headers];
                                headers[index] = formatCellVal(parsedHeader.text, Math.max(1, parsedHeader.colspan - 1), parsedHeader.rowspan);
                                setEditingBlock({ ...block, content: { ...block.content, headers } });
                              }}
                              className="text-[11px] font-bold text-rose-600 bg-white border border-rose-200 px-3 py-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-all flex items-center gap-1"
                            >
                              ✕ Unmerge last
                            </button>
                          )}
                          {!hasNextColumn && !isMerged && (
                            <span className="text-[10px] text-slate-400 italic">Last column — no next column to merge</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                      className="px-3.5 py-2 rounded-xl text-blue-700 bg-blue-50 hover:bg-blue-100/80 active:bg-blue-200 border border-blue-200 hover:border-blue-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Row
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
                      className="px-3.5 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100/80 active:bg-rose-200 border border-rose-200 hover:border-rose-300 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-[0.97] cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      Remove Last
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
                        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${(block.content.headers || []).length}, 1fr)` }}>
                          {row.map((cell, cellIndex) => {
                            const parsedCell = parseCellVal(cell);
                            const isCovered = rowsCoverage[rowIndex]?.[cellIndex];
                            const totalCols = (block.content.headers || []).length;
                            const totalRows = (block.content.rows || []).length;
                            const hasNextRow = rowIndex + parsedCell.rowspan < totalRows;
                            const hasNextCol = cellIndex + parsedCell.colspan < totalCols;
                            const isMergedDown = parsedCell.rowspan > 1;
                            const isMergedRight = parsedCell.colspan > 1;
                            const headerLabel = parseCellVal((block.content.headers || [])[cellIndex] || '').text || `Col ${cellIndex + 1}`;

                            if (isCovered) {
                              // Determine if covered by col-span or row-span
                              const srcRow = isCovered.sourceRow;
                              const srcCol = isCovered.sourceCol;
                              const isCoveredByCol = srcRow === rowIndex; // same row → col-span coverage
                              const isCoveredByRow = srcCol === cellIndex; // same col → row-span coverage

                              return (
                                <div key={cellIndex} className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-center min-h-[100px] p-3 gap-1.5">
                                  <span className="text-lg">{isCoveredByCol ? '↔' : '↕'}</span>
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                    {isCoveredByCol ? 'Col-merged' : 'Row-merged'}
                                  </span>
                                  <span className="text-[9px] text-slate-400">
                                    {isCoveredByCol ? `from Col ${srcCol + 1}` : `from Row ${srcRow + 1}`}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const parsedSrc = parseCellVal(block.content.rows[srcRow][srcCol]);
                                      const rows = [...block.content.rows];
                                      rows[srcRow] = [...rows[srcRow]];
                                      if (isCoveredByCol) {
                                        rows[srcRow][srcCol] = formatCellVal(parsedSrc.text, Math.max(1, parsedSrc.colspan - 1), parsedSrc.rowspan);
                                      } else {
                                        rows[srcRow][srcCol] = formatCellVal(parsedSrc.text, parsedSrc.colspan, Math.max(1, parsedSrc.rowspan - 1));
                                      }
                                      setEditingBlock({ ...block, content: { ...block.content, rows } });
                                    }}
                                    className="mt-1 text-[9px] font-bold text-rose-600 bg-white border border-rose-200 px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-all"
                                  >
                                    ✕ Unmerge
                                  </button>
                                </div>
                              );
                            }

                            return (
                              <div key={cellIndex} className="bg-white rounded-xl border border-blue-200 overflow-hidden">
                                {/* Cell header label + merge badges */}
                                <div className="flex items-center gap-1.5 px-2 pt-2 pb-1 flex-wrap">
                                  <span className="text-[10px] font-bold text-blue-600 truncate">{headerLabel}</span>
                                  {isMergedDown && (
                                    <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                      ↕ {parsedCell.rowspan} rows
                                    </span>
                                  )}
                                  {isMergedRight && (
                                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                                      ↔ {parsedCell.colspan} cols
                                    </span>
                                  )}
                                </div>

                                {/* Cell Type Selector & Input */}
                                <div className="px-2 pb-1 space-y-1.5">
                                  <div className="flex justify-between items-center bg-slate-50 border border-slate-100 rounded-md p-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider pl-1">Type</span>
                                    <div className="flex gap-1">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const rows = [...block.content.rows];
                                          rows[rowIndex] = [...rows[rowIndex]];
                                          rows[rowIndex][cellIndex] = formatCellVal('', parsedCell.colspan, parsedCell.rowspan, false);
                                          setEditingBlock({ ...block, content: { ...block.content, rows } });
                                        }}
                                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all cursor-pointer ${!parsedCell.isImage ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                                      >
                                        Text
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const rows = [...block.content.rows];
                                          rows[rowIndex] = [...rows[rowIndex]];
                                          rows[rowIndex][cellIndex] = formatCellVal('', parsedCell.colspan, parsedCell.rowspan, true);
                                          setEditingBlock({ ...block, content: { ...block.content, rows } });
                                        }}
                                        className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded transition-all cursor-pointer ${parsedCell.isImage ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-200/50'}`}
                                      >
                                        Image
                                      </button>
                                    </div>
                                  </div>

                                  {parsedCell.isImage ? (
                                    <div className="space-y-1.5">
                                      {parsedCell.imageUrl ? (
                                        <div className="relative group rounded-lg overflow-hidden border border-slate-200 bg-slate-50 flex items-center justify-center h-12 p-1">
                                          <img
                                            src={API.getImageUrl(parsedCell.imageUrl) || parsedCell.imageUrl}
                                            alt="Cell Preview"
                                            className="max-h-full max-w-full object-contain"
                                            onError={(e) => { e.target.style.display = 'none'; }}
                                          />
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const rows = [...block.content.rows];
                                              rows[rowIndex] = [...rows[rowIndex]];
                                              rows[rowIndex][cellIndex] = formatCellVal('', parsedCell.colspan, parsedCell.rowspan, true);
                                              setEditingBlock({ ...block, content: { ...block.content, rows } });
                                            }}
                                            className="absolute top-0 right-0 p-0.5 bg-rose-600 hover:bg-rose-700 text-white rounded-bl cursor-pointer transition-colors shadow-sm"
                                            title="Delete Image"
                                          >
                                            <X className="w-2.5 h-2.5" />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="space-y-1">
                                          <label className="flex items-center justify-center gap-1 border border-dashed border-emerald-300 bg-emerald-50/50 hover:bg-emerald-50/80 px-2 py-1 rounded-lg text-emerald-800 font-extrabold text-[10px] cursor-pointer transition-all select-none">
                                            <Upload className="w-3 h-3" />
                                            Upload
                                            <input
                                              type="file"
                                              accept="image/*"
                                              className="hidden"
                                              onChange={async (e) => {
                                                const file = e.target.files[0];
                                                if (!file) return;
                                                const formData = new FormData();
                                                formData.append('image', file);
                                                formData.append('folder', 'images');
                                                try {
                                                  const res = await API.post('/api/upload', formData);
                                                  if (res.success && res.data?.url) {
                                                    const rows = [...block.content.rows];
                                                    rows[rowIndex] = [...rows[rowIndex]];
                                                    rows[rowIndex][cellIndex] = formatCellVal(res.data.url, parsedCell.colspan, parsedCell.rowspan, true);
                                                    setEditingBlock({ ...block, content: { ...block.content, rows } });
                                                  } else {
                                                    alert('Upload failed: ' + (res.error || 'Unknown error'));
                                                  }
                                                } catch (err) {
                                                  alert('Upload error: ' + err.message);
                                                }
                                              }}
                                            />
                                          </label>
                                          <input
                                            type="text"
                                            value={parsedCell.imageUrl || ''}
                                            onChange={(e) => {
                                              const rows = [...block.content.rows];
                                              rows[rowIndex] = [...rows[rowIndex]];
                                              rows[rowIndex][cellIndex] = formatCellVal(e.target.value, parsedCell.colspan, parsedCell.rowspan, true);
                                              setEditingBlock({ ...block, content: { ...block.content, rows } });
                                            }}
                                            className="w-full px-1.5 py-0.5 border border-slate-200 rounded text-[9px] bg-white font-mono placeholder:text-slate-300"
                                            placeholder="Paste URL"
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <input
                                      type="text"
                                      value={parsedCell.text}
                                      onChange={(e) => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        rows[rowIndex][cellIndex] = formatCellVal(e.target.value, parsedCell.colspan, parsedCell.rowspan, false);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="w-full px-2 py-1 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 text-xs bg-white"
                                      placeholder="Enter data"
                                    />
                                  )}
                                </div>

                                {/* Merge action bar */}
                                <div className="border-t border-blue-100 px-2 py-1.5 flex items-center gap-1.5 bg-blue-50/40 flex-wrap">
                                  {/* ↔ Column merge */}
                                  {hasNextCol && !isMergedRight && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        const nextCellText = parseCellVal(rows[rowIndex][cellIndex + parsedCell.colspan] || '').text;
                                        const combined = [parsedCell.text, nextCellText].filter(Boolean).join(' / ');
                                        rows[rowIndex][cellIndex] = formatCellVal(combined, parsedCell.colspan + 1, parsedCell.rowspan);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      <span>↔</span> Merge col →
                                    </button>
                                  )}
                                  {hasNextCol && isMergedRight && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        const nextCellText = parseCellVal(rows[rowIndex][cellIndex + parsedCell.colspan] || '').text;
                                        const combined = [parsedCell.text, nextCellText].filter(Boolean).join(' / ');
                                        rows[rowIndex][cellIndex] = formatCellVal(combined, parsedCell.colspan + 1, parsedCell.rowspan);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-emerald-700 bg-white border border-emerald-300 px-2.5 py-1 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      <span>↔</span> Extend col
                                    </button>
                                  )}
                                  {isMergedRight && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        rows[rowIndex][cellIndex] = formatCellVal(parsedCell.text, Math.max(1, parsedCell.colspan - 1), parsedCell.rowspan);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-rose-600 bg-white border border-rose-200 px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      ✕ Uncol
                                    </button>
                                  )}

                                  {/* Divider */}
                                  {(hasNextCol || isMergedRight) && (hasNextRow || isMergedDown) && (
                                    <span className="text-slate-300 font-bold text-xs">|</span>
                                  )}

                                  {/* ↕ Row merge */}
                                  {hasNextRow && !isMergedDown && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        const nextRowText = parseCellVal((rows[rowIndex + parsedCell.rowspan] || [])[cellIndex] || '').text;
                                        const combined = [parsedCell.text, nextRowText].filter(Boolean).join(' / ');
                                        rows[rowIndex][cellIndex] = formatCellVal(combined, parsedCell.colspan, parsedCell.rowspan + 1);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-indigo-700 bg-white border border-indigo-300 px-2.5 py-1 rounded-lg hover:bg-indigo-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      <span>↕</span> Merge row ↓
                                    </button>
                                  )}
                                  {hasNextRow && isMergedDown && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        const nextRowText = parseCellVal((rows[rowIndex + parsedCell.rowspan] || [])[cellIndex] || '').text;
                                        const combined = [parsedCell.text, nextRowText].filter(Boolean).join(' / ');
                                        rows[rowIndex][cellIndex] = formatCellVal(combined, parsedCell.colspan, parsedCell.rowspan + 1);
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-indigo-700 bg-white border border-indigo-300 px-2.5 py-1 rounded-lg hover:bg-indigo-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      <span>↕</span> Extend row
                                    </button>
                                  )}
                                  {isMergedDown && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const rows = [...block.content.rows];
                                        rows[rowIndex] = [...rows[rowIndex]];
                                        rows[rowIndex][cellIndex] = formatCellVal(parsedCell.text, parsedCell.colspan, Math.max(1, parsedCell.rowspan - 1));
                                        setEditingBlock({ ...block, content: { ...block.content, rows } });
                                      }}
                                      className="text-[10px] font-bold text-rose-600 bg-white border border-rose-200 px-2.5 py-1 rounded-lg hover:bg-rose-50 cursor-pointer transition-all flex items-center gap-1"
                                    >
                                      ✕ Unrow
                                    </button>
                                  )}

                                  {!hasNextCol && !isMergedRight && !hasNextRow && !isMergedDown && (
                                    <span className="text-[9px] text-slate-400 italic">Last cell</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
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
                        {(() => {
                          let skip = 0;
                          return (block.content.headers || []).map((header, idx) => {
                            if (skip > 0) { skip--; return null; }
                            const parsed = parseCellVal(header);
                            if (parsed.colspan > 1) skip = parsed.colspan - 1;
                            return (
                              <th key={idx} colSpan={parsed.colspan} className="border border-white/30 px-3 py-2 text-left font-semibold">
                                {parsed.text || `Col ${idx + 1}`}
                              </th>
                            );
                          }).filter(Boolean);
                        })()}
                      </tr>
                    </thead>
                    <tbody>
                      {(block.content.rows || []).length === 0 ? (
                        <tr>
                          <td colSpan={(block.content.headers || []).length} className="border border-gray-300 px-3 py-2 text-center text-gray-400">
                            No data rows yet
                          </td>
                        </tr>
                      ) : (() => {
                        const colCount = (block.content.headers || []).length;
                        const rowspanTracker = Array(colCount).fill(0);
                        return (block.content.rows || []).map((row, rowIdx) => {
                          const cells = [];
                          for (let colIdx = 0; colIdx < colCount; colIdx++) {
                            if (rowspanTracker[colIdx] > 0) {
                              rowspanTracker[colIdx]--;
                              continue;
                            }
                            const cellVal = row[colIdx];
                            if (cellVal === undefined) continue;
                            const parsed = parseCellVal(cellVal);
                            if (parsed.rowspan > 1) rowspanTracker[colIdx] = parsed.rowspan - 1;
                            if (parsed.colspan > 1) {
                              for (let c = 1; c < parsed.colspan; c++) {
                                if (colIdx + c < colCount) {
                                  if (parsed.rowspan > 1) rowspanTracker[colIdx + c] = parsed.rowspan - 1;
                                  colIdx++;
                                }
                              }
                            }
                            cells.push({ parsed, key: colIdx });
                          }
                          return (
                            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              {cells.map((c, i) => (
                                <td key={i} colSpan={c.parsed.colspan} rowSpan={c.parsed.rowspan} className="border border-gray-300 px-3 py-2 text-left">
                                  {c.parsed.isImage ? (
                                    <img
                                      src={API.getImageUrl(c.parsed.imageUrl) || c.parsed.imageUrl}
                                      alt="Cell Preview"
                                      className="max-h-16 max-w-full mx-auto object-contain"
                                      onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                  ) : (
                                    c.parsed.text || '—'
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        });
                      })()}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      }

      case 'logo':
        const logosList = Array.isArray(block.content.logos) ? block.content.logos : [];
        return (
          <div className="space-y-6">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                This is the Company Logo block. Add multiple company logos and descriptions.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Section Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Recruitment Partners"
              />
            </div>

            <div className="border-2 border-blue-200 rounded-lg p-4 bg-blue-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-blue-900">Company Logos ({logosList.length})</h4>
                  <p className="text-xs text-blue-700">Add logos of placement partners with descriptions</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBlock({
                    ...block,
                    content: {
                      ...block.content,
                      logos: [...logosList, { url: '', alt: '', description: '' }]
                    }
                  })}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Logo
                </button>
              </div>

              {logosList.length === 0 ? (
                <div className="text-center py-6 bg-white border border-dashed rounded-lg text-gray-400 text-sm">
                  No logos added yet. Click "+ Add Logo" to start.
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                  {logosList.map((logoItem, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg border border-blue-100 shadow-sm space-y-3 relative">
                      <div className="flex justify-between items-center border-b pb-2">
                        <span className="text-xs font-bold text-gray-600">Logo #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newLogos = logosList.filter((_, i) => i !== idx);
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, logos: newLogos }
                            });
                          }}
                          className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Company / Alt Name</label>
                          <input
                            type="text"
                            value={logoItem.alt || ''}
                            onChange={(e) => {
                              const newLogos = [...logosList];
                              newLogos[idx] = { ...logoItem, alt: e.target.value };
                              setEditingBlock({
                                ...block,
                                content: { ...block.content, logos: newLogos }
                              });
                            }}
                            className="w-full px-3 py-1.5 border rounded-lg text-sm font-semibold"
                            placeholder="e.g., Google"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                          <textarea
                            value={logoItem.description || ''}
                            onChange={(e) => {
                              const newLogos = [...logosList];
                              newLogos[idx] = { ...logoItem, description: e.target.value };
                              setEditingBlock({
                                ...block,
                                content: { ...block.content, logos: newLogos }
                              });
                            }}
                            className="w-full px-3 py-1.5 border rounded-lg text-sm"
                            rows={2}
                            placeholder="Optional short description"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            id={`show-home-${idx}`}
                            checked={!!logoItem.showOnHomepage}
                            onChange={(e) => {
                              const newLogos = [...logosList];
                              newLogos[idx] = { ...logoItem, showOnHomepage: e.target.checked };
                              setEditingBlock({
                                ...block,
                                content: { ...block.content, logos: newLogos }
                              });
                            }}
                            className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                          />
                          <label htmlFor={`show-home-${idx}`} className="text-xs font-semibold text-slate-700 cursor-pointer">
                            Show on Homepage
                          </label>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-gray-100">
                          <label className="block text-xs font-bold text-gray-700">Logo Image</label>
                          <ImageUploader
                            value={logoItem.url || ''}
                            onChange={(url) => {
                              const newLogos = [...logosList];
                              newLogos[idx] = { ...logoItem, url };
                              setEditingBlock({
                                ...block,
                                content: { ...block.content, logos: newLogos }
                              });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'map':
        const mapsList = Array.isArray(block.content.maps) ? block.content.maps : [];
        return (
          <div className="space-y-6">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                This is the Map Embeds block. It cannot be deleted — only hidden or shown. You can add or modify multiple embedded map routes here.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Section Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., How to Reach Us / Maps"
              />
            </div>

            <div className="border-2 border-rose-200 rounded-lg p-4 bg-rose-50/20 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-rose-900">Map Locations ({mapsList.length})</h4>
                  <p className="text-xs text-rose-700">Add Google Maps embed URLs and titles</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingBlock({
                    ...block,
                    content: {
                      ...block.content,
                      maps: [...mapsList, { heading: '', iframeSrc: '', description: '' }]
                    }
                  })}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded text-xs font-semibold shadow transition-colors"
                >
                  Add Map
                </button>
              </div>

              {mapsList.length === 0 ? (
                <div className="text-center py-6 text-xs text-gray-400 border border-dashed rounded-lg">
                  No map routes added yet. Click "+ Add Map" to start.
                </div>
              ) : (
                <div className="space-y-4">
                  {mapsList.map((mapItem, idx) => (
                    <div key={idx} className="p-4 bg-white border rounded-lg space-y-3 relative shadow-sm">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <span className="text-xs font-bold text-gray-600">Map #{idx + 1}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newMaps = mapsList.filter((_, i) => i !== idx);
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, maps: newMaps }
                            });
                          }}
                          className="text-red-500 hover:text-red-700 text-xs font-semibold"
                        >
                          Remove
                        </button>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Heading / Title</label>
                        <input
                          type="text"
                          className="w-full px-3 py-2 border rounded-lg text-xs"
                          placeholder="e.g., Railway Station to IIIT Kottayam"
                          value={mapItem.heading || ''}
                          onChange={(e) => {
                            const newMaps = [...mapsList];
                            newMaps[idx] = { ...mapItem, heading: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, maps: newMaps }
                            });
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Google Maps Embed URL (iframe src)</label>
                        <textarea
                          className="w-full px-3 py-2 border rounded-lg text-xs font-mono"
                          rows={3}
                          placeholder="Paste the embed iframe source link (starts with https://www.google.com/maps/embed...)"
                          value={mapItem.iframeSrc || ''}
                          onChange={(e) => {
                            const newMaps = [...mapsList];
                            let value = e.target.value.trim();
                            if (value.toLowerCase().includes('<iframe') || value.toLowerCase().includes('src=')) {
                              const match = value.match(/src=["']([^"']+)["']/i);
                              if (match && match[1]) {
                                value = match[1];
                              }
                            }
                            newMaps[idx] = { ...mapItem, iframeSrc: value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, maps: newMaps }
                            });
                          }}
                        />
                        {mapItem.iframeSrc && !mapItem.iframeSrc.startsWith('https://www.google.com/maps/embed') && (
                          <p className="text-red-500 text-[10px] mt-1 font-semibold">
                            ⚠️ Warning: This URL does not look like a Google Maps Embed URL. Please use the "Embed a map" share option from Google Maps.
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Description / Instructions</label>
                        <textarea
                          className="w-full px-3 py-2 border rounded-lg text-xs"
                          rows={3}
                          placeholder="e.g., From the Bus Station... Distance 18 km"
                          value={mapItem.description || ''}
                          onChange={(e) => {
                            const newMaps = [...mapsList];
                            newMaps[idx] = { ...mapItem, description: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, maps: newMaps }
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'pdf':
        const pdfsList = Array.isArray(block.content.pdfs) ? block.content.pdfs : [];
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">Block Title (Optional)</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Important Documents"
              />
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-slate-900">PDF Files ({pdfsList.length})</h4>
                <button
                  type="button"
                  onClick={() => {
                    const newPdfs = [...pdfsList, { id: `pdf-${Date.now()}`, title: '', description: '', pdfUrl: '' }];
                    setEditingBlock({
                      ...block,
                      content: { ...block.content, pdfs: newPdfs }
                    });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 hover:bg-green-100 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add PDF File
                </button>
              </div>

              {pdfsList.length === 0 ? (
                <div className="p-8 text-center border-2 border-dashed rounded-xl bg-slate-50/50 text-slate-400 text-sm">
                  No PDF files added. Click the button above to add files.
                </div>
              ) : (
                <div className="space-y-4">
                  {pdfsList.map((pdfItem, idx) => (
                    <div key={pdfItem.id || idx} className="p-4 border rounded-xl bg-white shadow-sm space-y-3 relative group">
                      <button
                        type="button"
                        onClick={() => {
                          const newPdfs = pdfsList.filter((_, i) => i !== idx);
                          setEditingBlock({
                            ...block,
                            content: { ...block.content, pdfs: newPdfs }
                          });
                        }}
                        className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-slate-50 transition cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="font-semibold text-xs text-slate-500 uppercase tracking-wide">
                        PDF #{idx + 1}
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Document Title / Caption</label>
                        <input
                          type="text"
                          value={pdfItem.title || ''}
                          onChange={(e) => {
                            const newPdfs = [...pdfsList];
                            newPdfs[idx] = { ...pdfItem, title: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, pdfs: newPdfs }
                            });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          placeholder="e.g. Admission Guidelines 2026"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Description (Optional)</label>
                        <textarea
                          value={pdfItem.description || ''}
                          onChange={(e) => {
                            const newPdfs = [...pdfsList];
                            newPdfs[idx] = { ...pdfItem, description: e.target.value };
                            setEditingBlock({
                              ...block,
                              content: { ...block.content, pdfs: newPdfs }
                            });
                          }}
                          className="w-full px-3 py-2 border rounded-lg text-sm"
                          rows={1}
                          placeholder="Short description"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">Upload PDF</label>
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer">
                            <div className="px-3.5 py-2 rounded-lg border-2 border-dashed border-red-300 bg-red-50/20 hover:bg-red-50 text-xs font-bold text-red-600 transition flex items-center gap-1.5">
                              📁 Select file
                            </div>
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={async (e) => {
                                if (e.target.files?.[0]) {
                                  const file = e.target.files[0];
                                  const formData = new FormData();
                                  formData.append('image', file);
                                  formData.append('folder', 'pdfs');
                                  try {
                                    setLoading(true);
                                    const response = await API.post('/api/upload', formData);
                                    if (response.success) {
                                      const pdfPath = response.data.url;
                                      const newPdfs = [...pdfsList];
                                      newPdfs[idx] = { ...pdfItem, pdfUrl: pdfPath };
                                      setEditingBlock({
                                        ...block,
                                        content: { ...block.content, pdfs: newPdfs }
                                      });
                                    } else {
                                      alert('❌ PDF upload failed: ' + (response.error || 'Unknown error'));
                                    }
                                  } catch (error) {
                                    alert('❌ PDF upload failed: ' + (error.message || 'Unknown error'));
                                  } finally {
                                    setLoading(false);
                                  }
                                }
                              }}
                              className="hidden"
                            />
                          </label>

                          {pdfItem.pdfUrl ? (
                            <div className="flex-1 flex items-center gap-2 rounded-lg bg-green-50 border border-green-200 px-3 py-1.5 min-w-0">
                              <span className="text-xs">📄</span>
                              <span className="text-xs font-semibold text-green-700 truncate flex-1">{pdfItem.pdfUrl.split('/').pop()}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  const newPdfs = [...pdfsList];
                                  newPdfs[idx] = { ...pdfItem, pdfUrl: '' };
                                  setEditingBlock({
                                    ...block,
                                    content: { ...block.content, pdfs: newPdfs }
                                  });
                                }}
                                className="text-red-500 hover:text-red-700 font-bold text-xs"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-400">No PDF uploaded</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-700 font-medium">
                This is the Button block. It cannot be deleted — only hidden or shown.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={block.content.title || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, title: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Hotels Nearby IIIT Kottayam"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
              <textarea
                value={block.content.description || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, description: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                rows={2}
                placeholder="Brief description (optional)"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Button Text</label>
              <input
                type="text"
                value={block.content.buttonText || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, buttonText: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="e.g. Download List of Hotels"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Link URL</label>
              <input
                type="text"
                value={block.content.link || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, link: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="https://..."
              />
            </div>
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
      <div className="p-6 relative min-h-[500px]">
        {loading && (
          <div className="absolute inset-0 bg-gray-50/70 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-green-600 border-r-green-600 mx-auto mb-3" style={{ borderTopColor: color1, borderRightColor: color1 }}></div>
              <p className="text-sm font-semibold text-gray-600">Loading pages...</p>
            </div>
          </div>
        )}
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
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${selectedCategory === cat
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
                  className={`px-2 py-1 rounded-full text-xs ${page.isPublished !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
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
    <div className="flex flex-col h-screen bg-white relative">
      {loading && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-green-600 border-r-green-600 mx-auto mb-3" style={{ borderTopColor: color1, borderRightColor: color1 }}></div>
            <p className="text-sm font-semibold text-gray-600">Loading block content...</p>
          </div>
        </div>
      )}
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
                {searchParams.get('blockType') === 'logo' ? 'Recruitment Partners' : selectedPage?.pageTitle}
              </h2>
              <p className="text-xs text-gray-500">
                {searchParams.get('blockType') === 'logo' ? 'Select company logos to showcase on the homepage' : `/${selectedPage?.pageName}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedPage?.pageName === 'placements' && !searchParams.get('blockType') && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate('/admin/company-logos')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-lg border text-sm font-semibold hover:bg-gray-50 transition-colors text-slate-700 bg-white"
                >
                  <Building2 className="w-4 h-4 text-slate-500" />
                  Company Logos
                </button>
              </div>
            )}
            {!searchParams.get('blockType') && (
              <button
                onClick={handleSavePageMetadata}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors font-medium"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Two-Column Editor Layout */}
      <div className="flex-1 overflow-hidden flex gap-0">
        {/* LEFT SIDEBAR - Block Type Selector, Options & Block List */}
        {!searchParams.get('blockType') && (
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
                    switch (newType) {
                      case 'hero':
                        newContent = {
                          title: '',
                          subtitle: '',
                          description: '',
                          badge: '',
                          backgroundImage: '',
                          buttonText: '',
                          buttonLink: ''
                        };
                        break;
                      case 'heading':
                        newContent = {
                          text: '',
                          level: 'h2'
                        };
                        break;
                      case 'paragraph':
                        newContent = {
                          text: 'Your paragraph text'
                        };
                        break;
                      case 'pdf':
                        newContent = {
                          title: '',
                          pdfs: []
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
                          stats: [{ label: 'Stat 1', value: '100+' }, { label: 'Stat 2', value: '50+' }]
                        };
                        break;
                      case 'logo':
                        newContent = {
                          title: 'Recruitment Partners',
                          logos: []
                        };
                        break;
                      case 'map':
                        newContent = {
                          title: 'Maps & Directions',
                          maps: []
                        };
                        break;
                      case 'button':
                        newContent = {
                          title: '',
                          description: '',
                          buttonText: 'Click Here',
                          link: '#'
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
                  {BLOCK_TYPES.filter(t => {
                    if (t.value === 'logo') {
                      return selectedPage?.pageName === 'placements';
                    }
                    if (t.value === 'map') {
                      return selectedPage?.pageName === 'contact';
                    }
                    return true;
                  }).map((type) => (
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
                        <div
                          key={block.id}
                          className={`w-full flex items-center justify-between gap-1 p-1 rounded-lg text-xs transition-colors ${isSelected
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                          <button
                            onClick={() => handleEditBlock(block)}
                            className="flex-1 flex items-center gap-2 p-1 text-left min-w-0"
                          >
                            <span className={`flex-shrink-0 h-5 w-5 flex items-center justify-center rounded text-xs font-bold ${isSelected ? 'bg-white text-green-500' : 'bg-gray-300 text-gray-700'}`}>
                              {index + 1}
                            </span>
                            <span className="flex-1 truncate font-semibold">
                              {block.blockId === 'homepage-vision' ? '👁️ Vision' :
                                block.blockId === 'homepage-mission' ? '🚀 Mission' :
                                  (blockType?.label || block.blockType)}
                            </span>
                            {block.isVisible === false && <EyeOff size={12} />}
                          </button>

                          {/* Up / Down Reordering Buttons */}
                          <div className="flex gap-0.5 shrink-0 pr-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleVisibility(block);
                              }}
                              className={`p-1 rounded hover:bg-black/10 transition-colors ${isSelected ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              title={block.isVisible !== false ? 'Hide Block' : 'Show Block'}
                            >
                              {block.isVisible !== false ? (
                                <Eye className="w-3.5 h-3.5" />
                              ) : (
                                <EyeOff className={`w-3.5 h-3.5 ${isSelected ? 'text-red-200' : 'text-red-500'}`} />
                              )}
                            </button>
                            <button
                              disabled={index === 0}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSwapBlocks(index, 'up');
                              }}
                              className={`p-1 rounded hover:bg-black/10 transition-colors disabled:opacity-30 ${isSelected ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              title="Move Up"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
                              </svg>
                            </button>
                            <button
                              disabled={index === blocks.length - 1}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSwapBlocks(index, 'down');
                              }}
                              className={`p-1 rounded hover:bg-black/10 transition-colors disabled:opacity-30 ${isSelected ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                                }`}
                              title="Move Down"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </div>
                        </div>
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
        )}

        {/* RIGHT PANEL - Block Content Editor */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col bg-slate-50/50">
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
                  Create  Block
                </button>
              </div>
            </div>
          ) : (
            <div className={`space-y-4 ${searchParams.get('blockType') ? 'max-w-4xl mx-auto w-full bg-white p-8 rounded-2xl border border-slate-200 shadow-sm' : 'max-w-2xl'}`}>
              <div>
                <h3 className="text-lg font-bold mb-4">Block Content</h3>
                {renderContentEditor(editingBlock)}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                {!searchParams.get('blockType') && (
                  <>
                    <button
                      onClick={() => {
                        setPendingListType(null);
                        setPendingListItemCount(0);
                        setEditingBlock(null);
                      }}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 active:bg-slate-100/80 font-bold flex items-center justify-center gap-1.5 transition-all text-sm shadow-sm active:scale-[0.98] cursor-pointer"
                    >
                      <X className="w-4 h-4 text-slate-500" />
                      Cancel
                    </button>
                    {editingBlock.id &&
                      editingBlock.blockType !== 'map' &&
                      editingBlock.blockType !== 'button' &&
                      editingBlock.blockId !== 'homepage-vision' &&
                      editingBlock.blockId !== 'homepage-mission' && (
                        <button
                          onClick={() => {
                            handleDeleteBlock(editingBlock.id);
                            setPendingListType(null);
                            setPendingListItemCount(0);
                            setEditingBlock(null);
                          }}
                          className="flex-1 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 bg-red-50/40 hover:bg-red-50 active:bg-red-100/80 font-bold flex items-center justify-center gap-1.5 transition-all text-sm shadow-sm active:scale-[0.98] cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                          Delete
                        </button>
                      )}
                  </>
                )}
                <button
                  onClick={async () => {
                    const saved = await handleSaveBlock();
                    if (saved) {
                      if (searchParams.get('blockType')) {
                        alert('Recruitment partners selection saved successfully!');
                      } else {
                        setPendingListType(null);
                        setPendingListItemCount(0);
                        setEditingBlock(null);
                      }
                    }
                  }}
                  className={`${searchParams.get('blockType') ? 'w-full py-3.5 text-base shadow-md hover:scale-[1.01]' : 'flex-1 py-2.5'} rounded-xl text-white font-bold flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/40 cursor-pointer`}
                  style={{ backgroundColor: color1 }}
                >
                  <Save className="w-4.5 h-4.5" />
                  {searchParams.get('blockType') ? 'Save Recruitment Partners Selection' : 'Save'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, Eye, EyeOff, Save, FileText, Layout, 
  Type, Image, List, Settings, ChevronRight, ChevronDown, Search,
  Palette, BarChart3, Copy, Move, AlertCircle, X, Check
} from 'lucide-react';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

const BLOCK_TYPES = [
  { value: 'hero', label: '🎯 Hero Banner', color: '#8b5cf6' },
  { value: 'heading', label: '📝 Heading', color: '#3b82f6' },
  { value: 'paragraph', label: '📄 Paragraph', color: '#10b981' },
  { value: 'image', label: '🖼️ Single Image', color: '#f59e0b' },
  { value: 'gallery', label: '🎨 Image Gallery', color: '#ec4899' },
  { value: 'list', label: '📋 List', color: '#6366f1' },
  { value: 'card', label: '🃏 Card', color: '#14b8a6' },
  { value: 'table', label: '📊 Table', color: '#06b6d4' },
  { value: 'statistics', label: '📈 Statistics', color: '#239244' },
  { value: 'button', label: '🔘 Button', color: '#ef4444' }
];

// All available pages
const AVAILABLE_PAGES = [
  { pageName: 'homepage', pageTitle: 'Homepage', category: 'Main' },
  { pageName: 'why-iiitk', pageTitle: 'Why IIIT Kottayam', category: 'Main' },
  { pageName: 'about', pageTitle: 'About', category: 'Main' },
  { pageName: 'admissions', pageTitle: 'Admissions', category: 'Main' },
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
  { pageName: 'internet', pageTitle: 'Internet', category: 'Facilities' },
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

export default function UnifiedContentManager() {
  const navigate = useNavigate();
  const [view, setView] = useState('pages'); // 'pages' or 'editor'
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedBlock, setExpandedBlock] = useState(null);
  const [pageBlockCounts, setPageBlockCounts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  
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

  const categories = ['All', 'Main', 'Research', 'Placements', 'Courses', 'Facilities', 'Clubs', 'Others'];

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
      
      // Fetch block counts for all pages
      const counts = {};
      for (const page of AVAILABLE_PAGES) {
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

  const handleAddBlock = () => {
    setEditingBlock({
      blockId: `block-${Date.now()}`,
      pageName: selectedPage.pageName,
      blockType: 'paragraph',
      content: {},
      blockOrder: blocks.length + 1,
      isVisible: true
    });
    setShowBlockEditor(true);
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
    setEditingBlock({
      ...block,
      content: parsedContent
    });
    setShowBlockEditor(true);
  };

  const handleSaveBlock = async () => {
    try {
      const blockData = {
        ...editingBlock,
        content: JSON.stringify(editingBlock.content)
      };

      console.log('=== SAVING BLOCK ===');
      console.log('Has ID:', !!editingBlock.id);
      console.log('Block Data:', blockData);

      if (editingBlock.id) {
        console.log('Updating block:', editingBlock.id);
        const response = await API.put(`/api/content-blocks/${editingBlock.id}`, blockData);
        console.log('Update response:', response);
      } else {
        console.log('Creating new block');
        const response = await API.post('/api/content-blocks', blockData);
        console.log('Create response:', response);
      }

      alert('Block saved successfully!');
      setShowBlockEditor(false);
      setEditingBlock(null);
      fetchBlocks();
      fetchPagesAndBlocks();
    } catch (error) {
      console.error('Error saving block:', error);
      console.error('Error details:', error.response?.data || error.message);
      alert('Error saving block: ' + (error.response?.data?.message || error.message));
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

  const handleSelectPage = (page) => {
    // Special handling for FDP - redirect to FDP Programs management page
    if (page.pageName === 'fdp') {
      navigate('/admin/fdp-programs');
      return;
    }
    
    setSelectedPage(page);
    setView('editor');
  };

  const handleBackToPages = () => {
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
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={block.content.text || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={6}
                placeholder="Paragraph text..."
              />
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">List Title</label>
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
              <label className="block text-sm font-medium mb-2">List Items (one per line)</label>
              <textarea
                value={(block.content.items || []).join('\n')}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, items: e.target.value.split('\n').filter(i => i.trim()) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={8}
                placeholder="Item 1 - Description&#10;Item 2 - Description&#10;..."
              />
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={block.content.url || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, url: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="/uploads/image.jpg"
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
            {block.content.url && (
              <div className="mt-4">
                <img src={block.content.url} alt="Preview" className="max-w-xs rounded-lg border" />
              </div>
            )}
          </div>
        );

      case 'card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Card Title</label>
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
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={block.content.description || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, description: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Icon (emoji or icon name)</label>
              <input
                type="text"
                value={block.content.icon || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, icon: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="📚 or icon-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link URL (optional)</label>
              <input
                type="text"
                value={block.content.link || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, link: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="/path/to/page"
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
              <label className="block text-sm font-medium mb-2">Images (one URL per line)</label>
              <textarea
                value={(block.content.images || []).map(img => 
                  typeof img === 'string' ? img : img.url
                ).join('\n')}
                onChange={(e) => {
                  const urls = e.target.value.split('\n').filter(url => url.trim());
                  const images = urls.map(url => ({
                    url: url.trim(),
                    alt: `Gallery Image`,
                    caption: ''
                  }));
                  setEditingBlock({
                    ...block,
                    content: { ...block.content, images }
                  });
                }}
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                rows={8}
                placeholder="/uploads/image1.jpg\n/uploads/image2.jpg\n/uploads/image3.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">Enter image URLs, one per line. Use ImageUploader below to upload new images.</p>
            </div>
            <ImageUploader
              onChange={(url) => {
                const newImage = { url, alt: 'Gallery Image', caption: '' };
                const images = [...(block.content.images || []), newImage];
                setEditingBlock({
                  ...block,
                  content: { ...block.content, images }
                });
              }}
            />
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={block.content.text || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, text: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Click Here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Link URL</label>
              <input
                type="text"
                value={block.content.url || ''}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, url: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="/path/to/page"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Button Style</label>
              <select
                value={block.content.style || 'primary'}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, style: e.target.value }
                })}
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
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
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Image URLs (one per line)</label>
              <textarea
                value={(block.content.images || []).join('\n')}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, images: e.target.value.split('\n').filter(i => i.trim()) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={6}
                placeholder="/uploads/image1.jpg&#10;/uploads/image2.jpg"
              />
            </div>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Statistics (format: value|label, one per line)</label>
              <textarea
                value={(block.content.stats || []).map(s => `${s.value}|${s.label}`).join('\n')}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { 
                    ...block.content, 
                    stats: e.target.value.split('\n')
                      .filter(i => i.trim())
                      .map(line => {
                        const [value, label] = line.split('|');
                        return { value: value?.trim() || '', label: label?.trim() || '' };
                      })
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={6}
                placeholder="100+|Students&#10;50+|Faculty&#10;10+|Programs"
              />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Table Title</label>
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
              <label className="block text-sm font-medium mb-2">Headers (comma separated)</label>
              <input
                type="text"
                value={(block.content.headers || []).join(', ')}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { ...block.content, headers: e.target.value.split(',').map(h => h.trim()).filter(h => h) }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Column 1, Column 2, Column 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rows (one row per line, cells separated by |)</label>
              <textarea
                value={(block.content.rows || []).map(r => r.join(' | ')).join('\n')}
                onChange={(e) => setEditingBlock({
                  ...block,
                  content: { 
                    ...block.content, 
                    rows: e.target.value.split('\n')
                      .filter(line => line.trim())
                      .map(line => line.split('|').map(cell => cell.trim()))
                  }
                })}
                className="w-full px-4 py-2 border rounded-lg"
                rows={8}
                placeholder="Cell 1 | Cell 2 | Cell 3&#10;Cell 4 | Cell 5 | Cell 6"
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
                    {pageBlockCounts[page.pageName] || 0} blocks
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

  // Content Editor View
  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBackToPages}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
              <span>Back to Pages</span>
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h2 className="text-xl font-bold" style={{ color: color1 }}>
                {selectedPage?.pageTitle}
              </h2>
              <p className="text-sm text-gray-500">/{selectedPage?.pageName}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={handleSavePageMetadata}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-gray-50"
            >
              <Save className="w-4 h-4" />
              Save Metadata
            </button>
            <button
              onClick={handleAddBlock}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white"
              style={{ backgroundColor: color1 }}
            >
              <Plus className="w-4 h-4" />
              Add Block
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex">
        {/* Left Panel - Page Settings */}
        <div className="w-80 border-r bg-gray-50 p-6 overflow-y-auto">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Page Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={pageMetadata.pageTitle}
                onChange={(e) => setPageMetadata({ ...pageMetadata, pageTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Page Slug</label>
              <input
                type="text"
                value={pageMetadata.pageSlug}
                onChange={(e) => setPageMetadata({ ...pageMetadata, pageSlug: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                value={pageMetadata.metaDescription}
                onChange={(e) => setPageMetadata({ ...pageMetadata, metaDescription: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                rows={3}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Meta Keywords</label>
              <input
                type="text"
                value={pageMetadata.metaKeywords}
                onChange={(e) => setPageMetadata({ ...pageMetadata, metaKeywords: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="keyword1, keyword2"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Published</label>
              <button
                onClick={() => setPageMetadata({ ...pageMetadata, isPublished: !pageMetadata.isPublished })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  pageMetadata.isPublished ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    pageMetadata.isPublished ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Center Panel - Content Blocks */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Content Blocks ({blocks.length})
            </h3>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: color1 }} />
              </div>
            ) : blocks.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed">
                <Layout className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p className="text-gray-600 mb-4">No content blocks yet</p>
                <button
                  onClick={handleAddBlock}
                  className="px-4 py-2 rounded-lg text-white"
                  style={{ backgroundColor: color1 }}
                >
                  Create First Block
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {blocks.map((block, index) => {
                  const blockType = BLOCK_TYPES.find(t => t.value === block.blockType);
                  const isExpanded = expandedBlock === block.id;
                  
                  return (
                    <div
                      key={block.id}
                      className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
                    >
                      <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: blockType?.color || '#94a3b8' }}
                          >
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold">{blockType?.label || block.blockType}</h4>
                              {!block.isVisible && (
                                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                  Hidden
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">ID: {block.blockId}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleVisibility(block)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title={block.isVisible ? 'Hide' : 'Show'}
                          >
                            {block.isVisible ? (
                              <Eye className="w-4 h-4 text-gray-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <button
                            onClick={() => handleEditBlock(block)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4 text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                          <button
                            onClick={() => setExpandedBlock(isExpanded ? null : block.id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            {isExpanded ? (
                              <ChevronDown className="w-4 h-4" />
                            ) : (
                              <ChevronRight className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                          <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
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
      </div>

      {/* Block Editor Modal */}
      {showBlockEditor && editingBlock && (
        <div className="fixed inset-0 bg-white/10 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">
                {editingBlock.id ? 'Edit Block' : 'Create Block'}
              </h3>
              <button
                onClick={() => setShowBlockEditor(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Block ID</label>
                  <input
                    type="text"
                    value={editingBlock.blockId}
                    onChange={(e) => setEditingBlock({ ...editingBlock, blockId: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="unique-block-id"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Block Type</label>
                  <select
                    value={editingBlock.blockType}
                    onChange={(e) => setEditingBlock({ ...editingBlock, blockType: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    {BLOCK_TYPES.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Block Order</label>
                  <input
                    type="number"
                    value={editingBlock.blockOrder}
                    onChange={(e) => setEditingBlock({ ...editingBlock, blockOrder: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="border-t pt-6">
                  <h4 className="font-bold mb-4">Content</h4>
                  {renderContentEditor(editingBlock)}
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3 justify-end">
              <button
                onClick={() => setShowBlockEditor(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlock}
                className="px-6 py-2 rounded-lg text-white flex items-center gap-2"
                style={{ backgroundColor: color1 }}
              >
                <Save className="w-4 h-4" />
                Save Block
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

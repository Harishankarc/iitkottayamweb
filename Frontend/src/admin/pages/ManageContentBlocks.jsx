import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Eye, EyeOff, Copy, Move, ChevronDown, ChevronUp, Save, Palette, Layout as LayoutIcon, Settings, Image, Type, List, BarChart3 } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';

const BLOCK_TYPES = [
  { value: 'hero', label: 'Hero Banner', icon: Image, color: '#8b5cf6' },
  { value: 'heading', label: 'Heading', icon: Type, color: '#3b82f6' },
  { value: 'paragraph', label: 'Paragraph', icon: Type, color: '#10b981' },
  { value: 'image', label: 'Image', icon: Image, color: '#f59e0b' },
  { value: 'gallery', label: 'Gallery', icon: Image, color: '#ec4899' },
  { value: 'list', label: 'List', icon: List, color: '#6366f1' },
  { value: 'card', label: 'Card', icon: LayoutIcon, color: '#14b8a6' },
  { value: 'statistics', label: 'Statistics', icon: BarChart3, color: '#239244' },
  { value: 'button', label: 'Button', icon: Settings, color: '#ef4444' },
  { value: 'accordion', label: 'Accordion', icon: List, color: '#a855f7' },
  { value: 'divider', label: 'Divider', icon: Settings, color: '#94a3b8' }
];

export default function ManageContentBlocks() {
  const [searchParams] = useSearchParams();
  const pageFromUrl = searchParams.get('page');
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(pageFromUrl || 'homepage');
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBlock, setEditingBlock] = useState(null);
  const [showBlockEditor, setShowBlockEditor] = useState(false);
  const [activeTab, setActiveTab] = useState('content'); // content, styling, layout, responsive
  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    fetchPages();
  }, []);

  useEffect(() => {
    if (selectedPage) {
      fetchBlocks();
    }
  }, [selectedPage]);

  const fetchPages = async () => {
    try {
      const response = await API.get('/api/pages');
      if (response.success) {
        setPages(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/api/content-blocks/page/${selectedPage}`);
      if (response.success) {
        const fetchedBlocks = response.data.data || [];
        setBlocks(fetchedBlocks);
        
        // Auto-import default content if no blocks exist for this page
        if (fetchedBlocks.length === 0) {
          console.log(`No blocks found for ${selectedPage}, auto-importing default content...`);
          await autoImportDefaultContent();
        }
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const autoImportDefaultContent = async () => {
    try {
      const pageContentTemplates = getPageContentTemplates();
      const blocksTemplate = pageContentTemplates[selectedPage] || getGenericTemplate(selectedPage);

      // Create blocks silently in background
      for (const template of blocksTemplate) {
        const block = {
          ...template,
          pageName: selectedPage,
          isVisible: true
        };
        await API.post('/api/content-blocks', block);
      }

      console.log(`✅ Auto-imported ${blocksTemplate.length} blocks for ${selectedPage}`);
      
      // Refresh blocks to show imported content
      const response = await API.get(`/api/content-blocks/page/${selectedPage}`);
      if (response.success) {
        setBlocks(response.data.data || []);
      }
    } catch (error) {
      console.error('Error auto-importing content:', error);
    }
  };

  const handleCreateBlock = () => {
    setEditingBlock({
      blockId: `block-${Date.now()}`,
      pageName: selectedPage,
      sectionName: '',
      blockType: 'paragraph',
      blockLabel: 'New Block',
      content: {},
      styling: {},
      layout: {},
      responsive: {},
      animation: {},
      blockOrder: blocks.length,
      isVisible: true
    });
    setShowBlockEditor(true);
  };

  const handleEditBlock = (block) => {
    // Parse JSON fields if they're strings
    const parseField = (field) => {
      if (!field) return {};
      if (typeof field === 'string') {
        try {
          return JSON.parse(field);
        } catch (e) {
          console.error('Error parsing field:', e);
          return {};
        }
      }
      return field;
    };

    // Create a properly formatted editing block
    const editBlock = {
      id: block.id,
      blockId: block.blockId || `block-${Date.now()}`,
      pageName: block.pageName || selectedPage,
      sectionName: block.sectionName || '',
      blockType: block.blockType || 'paragraph',
      blockLabel: block.blockLabel || 'Untitled Block',
      content: parseField(block.content),
      styling: parseField(block.styling),
      layout: parseField(block.layout),
      responsive: parseField(block.responsive),
      animation: parseField(block.animation),
      blockOrder: block.blockOrder || 0,
      isVisible: block.isVisible !== undefined ? block.isVisible : true
    };

    console.log('Editing block:', editBlock); // Debug log
    setEditingBlock(editBlock);
    setShowBlockEditor(true);
  };

  const handleSaveBlock = async () => {
    try {
      console.log('Saving block:', editingBlock); // Debug log
      
      if (editingBlock.id) {
        const response = await API.put(`/api/content-blocks/${editingBlock.id}`, editingBlock);
        console.log('Update response:', response); // Debug log
        alert('✅ Block updated successfully!');
      } else {
        const response = await API.post('/api/content-blocks', editingBlock);
        console.log('Create response:', response); // Debug log
        alert('✅ Block created successfully!');
      }
      
      await fetchBlocks();
      setShowBlockEditor(false);
      setEditingBlock(null);
    } catch (error) {
      console.error('Error saving block:', error);
      alert('❌ Error saving block: ' + (error.message || 'Unknown error'));
    }
  };

  const handleDeleteBlock = async (id) => {
    if (window.confirm('Delete this block?')) {
      try {
        await API.delete(`/api/content-blocks/${id}`);
        fetchBlocks();
      } catch (error) {
        console.error('Error deleting block:', error);
      }
    }
  };

  const handleCloneBlock = async (id) => {
    try {
      await API.post(`/api/content-blocks/${id}/clone`);
      fetchBlocks();
    } catch (error) {
      console.error('Error cloning block:', error);
    }
  };

  const handleImportWhyIIITContent = async () => {
    if (!window.confirm('This will import all existing content from Why IIIT page as editable blocks. Continue?')) {
      return;
    }

    try {
      const blocksToCreate = [
        {
          blockId: 'hero-section',
          pageName: selectedPage,
          sectionName: 'hero',
          blockType: 'hero',
          blockLabel: 'Hero Section',
          content: { title: 'Why Choose IIIT Kottayam?', subtitle: 'Excellence in Technology Education' },
          blockOrder: 0,
          isVisible: true
        },
        {
          blockId: 'introduction',
          pageName: selectedPage,
          sectionName: 'intro',
          blockType: 'paragraph',
          blockLabel: 'Introduction Text',
          content: { text: 'IIIT Kottayam stands as a beacon of technological excellence and innovation in higher education. Established to nurture future-ready tech professionals, we combine cutting-edge research with world-class teaching methodologies.' },
          blockOrder: 1,
          isVisible: true
        },
        {
          blockId: 'research-groups-heading',
          pageName: selectedPage,
          sectionName: 'research',
          blockType: 'heading',
          blockLabel: 'Research Groups Section',
          content: { text: 'Research Groups', level: 2 },
          blockOrder: 2,
          isVisible: true
        }
      ];

      for (const block of blocksToCreate) {
        await API.post('/api/content-blocks', block);
      }

      alert('✅ Content imported successfully! You can now edit these blocks.');
      fetchBlocks();
    } catch (error) {
      console.error('Error importing content:', error);
      alert('❌ Error importing content');
    }
  };

  const getPageContentTemplates = () => {
    return {
      'homepage': [
        { blockId: 'home-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Homepage Hero Banner', 
          content: { title: 'Welcome to IIIT Kottayam', subtitle: 'Pioneering Excellence in Technology and Innovation', description: 'A premier institute fostering cutting-edge research and world-class education in Information Technology' }, blockOrder: 0 },
        { blockId: 'home-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About IIIT Kottayam',
          content: { text: 'Indian Institute of Information Technology Kottayam (IIIT Kottayam) is an Institute of National Importance established by the Ministry of Education, Government of India. We are committed to academic excellence and innovation in Information Technology, fostering world-class education and cutting-edge research.' }, blockOrder: 1 },
        { blockId: 'home-vision', sectionName: 'vision', blockType: 'paragraph', blockLabel: 'Our Vision',
          content: { text: 'To be a globally recognized center of excellence in Information Technology education, research, and innovation, contributing to societal transformation through technology.' }, blockOrder: 2 },
        { blockId: 'home-stats', sectionName: 'stats', blockType: 'statistics', blockLabel: 'Key Statistics',
          content: { stats: [{ label: 'Students', value: '500+' }, { label: 'Faculty Members', value: '50+' }, { label: 'Research Projects', value: '100+' }, { label: 'Industry Partners', value: '30+' }] }, blockOrder: 3 }
      ],
      'why-iiitk': [
        // Hero Section
        { blockId: 'why-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
          content: { text: 'Established 2015 • Institution of National Importance' }, blockOrder: 0 },
        { blockId: 'why-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
          content: { text: 'Why IIIT Kottayam', level: 1 }, blockOrder: 1 },
        { blockId: 'why-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
          content: { text: 'Pioneering excellence in Information Technology education and research' }, blockOrder: 2 },
        
        // About Section
        { blockId: 'why-about-badge', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Badge',
          content: { text: 'About Our Institute' }, blockOrder: 3 },
        { blockId: 'why-about-para1', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Paragraph 1',
          content: { text: 'The Indian Institute of Information Technology (IIIT) Kottayam is an "Institution of National Importance" established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.' }, blockOrder: 4 },
        { blockId: 'why-about-para2', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Paragraph 2',
          content: { text: 'The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.' }, blockOrder: 5 },
        { blockId: 'why-tags', sectionName: 'about', blockType: 'list', blockLabel: 'Institute Tags',
          content: { items: ['🤝 PPP Model', '🌳 53 Acre Campus', '🚀 AIC Certified', '🏆 National Importance'] }, blockOrder: 6 },
        
        // Research Groups
        { blockId: 'why-research-heading', sectionName: 'research', blockType: 'heading', blockLabel: 'Research Groups Heading',
          content: { text: 'World-Class Research Groups', level: 2 }, blockOrder: 7 },
        { blockId: 'why-research-group-1', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Data Science Research Group',
          content: { text: 'Data Science Research Group - Advanced data analytics and modelling' }, blockOrder: 8 },
        { blockId: 'why-research-group-2', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Big Data & ML',
          content: { text: 'Big data & ML Research Group - Machine learning algorithms and big data' }, blockOrder: 9 },
        { blockId: 'why-research-group-3', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Cyber Security',
          content: { text: 'Cyber Security Research Group - Cutting-edge techniques for securing systems' }, blockOrder: 10 },
        { blockId: 'why-research-group-4', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Network Science',
          content: { text: 'Network Science Research Group - Study of complex networks and applications' }, blockOrder: 11 },
        { blockId: 'why-research-group-5', sectionName: 'research', blockType: 'paragraph', blockLabel: 'IoT Cloud',
          content: { text: 'IoT Cloud Research Group - Integrating IoT with cloud computing' }, blockOrder: 12 },
        { blockId: 'why-research-group-6', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Intelligent IoT',
          content: { text: 'Intelligent IoT Research Group - Developing intelligent IoT systems' }, blockOrder: 13 },
        { blockId: 'why-research-group-7', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Smart Wireless',
          content: { text: 'Smart Wireless Inter-Networking - Advanced wireless communication' }, blockOrder: 14 },
        { blockId: 'why-research-group-8', sectionName: 'research', blockType: 'paragraph', blockLabel: 'I2CS',
          content: { text: 'I2CS - Intelligent Integrated Circuits - Development of smart integrated circuits' }, blockOrder: 15 },
        { blockId: 'why-research-group-9', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Computational Engineering',
          content: { text: 'Computational Engineering - Computational methods and data modelling' }, blockOrder: 16 },
        { blockId: 'why-research-group-10', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Data Analytics Business',
          content: { text: 'Data Analytics and Business Decisions - Data analytics for business strategies' }, blockOrder: 17 },
        { blockId: 'why-research-group-11', sectionName: 'research', blockType: 'paragraph', blockLabel: 'Bio-Medical Informatics',
          content: { text: 'Bio-Medical Informatics & Genomics - Informatics in biomedical research' }, blockOrder: 18 },
        { blockId: 'why-research-group-12', sectionName: 'research', blockType: 'paragraph', blockLabel: 'FACTS-H Lab',
          content: { text: 'FACTS-H Lab - Human-computer interaction & smart systems' }, blockOrder: 19 },
        { blockId: 'why-research-group-13', sectionName: 'research', blockType: 'paragraph', blockLabel: 'ASPIRE Group',
          content: { text: 'ASPIRE Group - AI-powered signal and image processing' }, blockOrder: 20 },
        
        // Incubation Centers
        { blockId: 'why-incubation-heading', sectionName: 'incubation', blockType: 'heading', blockLabel: 'Incubation Centers Heading',
          content: { text: 'Innovation & Incubation Centers', level: 2 }, blockOrder: 21 },
        { blockId: 'why-aic-title', sectionName: 'incubation', blockType: 'heading', blockLabel: 'AIC Title',
          content: { text: 'Atal Incubation Centre (AIC)', level: 3 }, blockOrder: 22 },
        { blockId: 'why-aic-subtitle', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'AIC Subtitle',
          content: { text: 'Atal Innovation Mission' }, blockOrder: 23 },
        { blockId: 'why-aic-desc', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'AIC Description',
          content: { text: 'A flagship initiative under the Atal Innovation Mission, supported by the Government of India, offering state-of-the-art infrastructure and a vast network of industry experts.' }, blockOrder: 24 },
        { blockId: 'why-msme-title', sectionName: 'incubation', blockType: 'heading', blockLabel: 'MSME Title',
          content: { text: 'MSME Business Incubation Centre', level: 3 }, blockOrder: 25 },
        { blockId: 'why-msme-subtitle', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'MSME Subtitle',
          content: { text: 'Ministry of MSME' }, blockOrder: 26 },
        { blockId: 'why-msme-desc', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'MSME Description',
          content: { text: 'Supported by the Ministry of MSME, this center is dedicated to promoting and assisting small and medium enterprises with tailored incubation services and financial resources.' }, blockOrder: 27 },
        { blockId: 'why-gyaan-title', sectionName: 'incubation', blockType: 'heading', blockLabel: 'Gyaan Lab Title',
          content: { text: 'Gyaan Innovation Lab', level: 3 }, blockOrder: 28 },
        { blockId: 'why-gyaan-subtitle', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'Gyaan Subtitle',
          content: { text: 'Innovation Hub' }, blockOrder: 29 },
        { blockId: 'why-gyaan-desc', sectionName: 'incubation', blockType: 'paragraph', blockLabel: 'Gyaan Description',
          content: { text: 'Focuses on promoting creativity and innovation among students and faculty by providing access to cutting-edge technologies and supporting interdisciplinary projects.' }, blockOrder: 30 },
        
        // Holistic Development
        { blockId: 'why-holistic-heading', sectionName: 'holistic', blockType: 'heading', blockLabel: 'Holistic Development Heading',
          content: { text: 'Holistic Student Development', level: 2 }, blockOrder: 31 },
        { blockId: 'why-activities', sectionName: 'holistic', blockType: 'list', blockLabel: 'Activities',
          content: { items: ['Yoga', 'Gymnasium', 'Sports', 'Competitions', 'Cultural', 'Creative Arts'] }, blockOrder: 32 },
        
        // CTA Banner
        { blockId: 'why-cta-heading', sectionName: 'cta', blockType: 'heading', blockLabel: 'CTA Heading',
          content: { text: 'Interested in Joining IIIT Kottayam?', level: 3 }, blockOrder: 33 },
        { blockId: 'why-cta-text', sectionName: 'cta', blockType: 'paragraph', blockLabel: 'CTA Description',
          content: { text: 'Explore our admission process, eligibility criteria, and application deadlines' }, blockOrder: 34 },
        { blockId: 'why-cta-button', sectionName: 'cta', blockType: 'button', blockLabel: 'CTA Button',
          content: { text: 'Learn More', url: '/admissions' }, blockOrder: 35 }
      ],
      'about': [
        { blockId: 'about-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'About Hero',
          content: { title: 'About IIIT Kottayam', subtitle: 'Our Vision, Mission & Values' }, blockOrder: 0 },
        { blockId: 'about-vision', sectionName: 'vision', blockType: 'paragraph', blockLabel: 'Vision Statement',
          content: { text: 'To be a world-class institution in technology education and research, fostering innovation and excellence.' }, blockOrder: 1 },
        { blockId: 'about-mission', sectionName: 'mission', blockType: 'paragraph', blockLabel: 'Mission Statement',
          content: { text: 'To provide quality education, promote research, and develop skilled professionals for the technology sector.' }, blockOrder: 2 }
      ],
      'admissions': [
        { blockId: 'admissions-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Admissions Hero',
          content: { title: 'Admissions', subtitle: 'Join IIIT Kottayam' }, blockOrder: 0 },
        { blockId: 'admissions-process', sectionName: 'process', blockType: 'paragraph', blockLabel: 'Admission Process',
          content: { text: 'Admissions are conducted through JEE Main and other national-level entrance examinations.' }, blockOrder: 1 }
      ],
      'academics': [
        { blockId: 'academics-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Academics Hero',
          content: { title: 'Academics', subtitle: 'Programs & Curriculum' }, blockOrder: 0 },
        { blockId: 'academics-programs', sectionName: 'programs', blockType: 'heading', blockLabel: 'Programs Offered',
          content: { text: 'Programs Offered', level: 2 }, blockOrder: 1 }
      ],
      'research': [
        { blockId: 'research-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Research Hero',
          content: { title: 'Research', subtitle: 'Innovation & Discovery' }, blockOrder: 0 },
        { blockId: 'research-areas', sectionName: 'areas', blockType: 'heading', blockLabel: 'Research Areas',
          content: { text: 'Research Areas', level: 2 }, blockOrder: 1 }
      ],
      'placements': [
        { blockId: 'placements-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Placements Hero',
          content: { title: 'Placements', subtitle: 'Career Opportunities' }, blockOrder: 0 },
        { blockId: 'placements-stats', sectionName: 'stats', blockType: 'statistics', blockLabel: 'Placement Statistics',
          content: { stats: [{ label: 'Highest Package', value: '₹40 LPA' }, { label: 'Average Package', value: '₹12 LPA' }] }, blockOrder: 1 }
      ],
      'campus-life': [
        { blockId: 'campus-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Campus Life Hero',
          content: { title: 'Campus Life', subtitle: 'Vibrant Community & Activities' }, blockOrder: 0 },
        { blockId: 'campus-facilities', sectionName: 'facilities', blockType: 'heading', blockLabel: 'Facilities',
          content: { text: 'Campus Facilities', level: 2 }, blockOrder: 1 }
      ],
      'contact': [
        { blockId: 'contact-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Contact Hero',
          content: { title: 'Contact Us', subtitle: 'Get in Touch' }, blockOrder: 0 },
        { blockId: 'contact-info', sectionName: 'info', blockType: 'paragraph', blockLabel: 'Contact Information',
          content: { text: 'IIIT Kottayam, Valavoor, Kottayam, Kerala - 686635' }, blockOrder: 1 }
      ]
    };
  };

  const getGenericTemplate = (pageName) => {
    return [
      { blockId: `${pageName}-hero`, sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero Section',
        content: { title: pageName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), subtitle: 'Welcome' }, blockOrder: 0 },
      { blockId: `${pageName}-content`, sectionName: 'main', blockType: 'paragraph', blockLabel: 'Main Content',
        content: { text: 'Add your content here.' }, blockOrder: 1 }
    ];
  };

  const handleImportDefaultContent = async () => {
    if (!window.confirm(`This will import ALL existing website content for "${selectedPage}" as editable blocks. This includes all text, headings, and sections currently on the page. Continue?`)) {
      return;
    }

    try {
      const pageContentTemplates = getPageContentTemplates();
      const blocksTemplate = pageContentTemplates[selectedPage] || getGenericTemplate(selectedPage);

      // Create blocks
      for (const template of blocksTemplate) {
        const block = {
          ...template,
          pageName: selectedPage,
          isVisible: true
        };
        await API.post('/api/content-blocks', block);
      }

      alert('✅ Default content imported successfully! You can now edit these blocks.');
      fetchBlocks();
    } catch (error) {
      console.error('Error importing content:', error);
      alert('❌ Error importing content: ' + (error.message || 'Unknown error'));
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

  const getBlockIcon = (blockType) => {
    const type = BLOCK_TYPES.find(t => t.value === blockType);
    return type ? type.icon : Type;
  };

  const getBlockColor = (blockType) => {
    const type = BLOCK_TYPES.find(t => t.value === blockType);
    return type ? type.color : '#6b7280';
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

  const renderContentFields = () => {
    const content = editingBlock.content || {};

    switch (editingBlock.blockType) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Hero title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Hero subtitle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Hero description"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Button Text</label>
                <input
                  type="text"
                  value={content.buttonText || ''}
                  onChange={(e) => updateContent('buttonText', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Learn More"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Button Link</label>
                <input
                  type="text"
                  value={content.buttonLink || ''}
                  onChange={(e) => updateContent('buttonLink', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
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
              <label className="block text-sm font-medium mb-1">Icon (emoji or text)</label>
              <input
                type="text"
                value={content.icon || ''}
                onChange={(e) => updateContent('icon', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="🎯"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Section title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text</label>
              <textarea
                value={content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows="5"
                placeholder="Your content here..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Link Text</label>
                <input
                  type="text"
                  value={content.linkText || ''}
                  onChange={(e) => updateContent('linkText', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Read more →"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Link URL</label>
                <input
                  type="text"
                  value={content.link || ''}
                  onChange={(e) => updateContent('link', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="/page"
                />
              </div>
            </div>
          </div>
        );

      case 'list':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Icon</label>
              <input
                type="text"
                value={content.icon || ''}
                onChange={(e) => updateContent('icon', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="🎯"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="List title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">List Style</label>
              <select
                value={content.listStyle || 'bullet'}
                onChange={(e) => updateContent('listStyle', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="bullet">Bullet Points</option>
                <option value="numbered">Numbered List</option>
                <option value="checkmark">Checkmarks</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Items</label>
              {(content.items || []).map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateArrayContent('items', index, e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-lg"
                    placeholder={`Item ${index + 1}`}
                  />
                  <button
                    onClick={() => removeArrayItem('items', index)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addArrayItem('items', '')}
                className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
              >
                + Add Item
              </button>
            </div>
          </div>
        );

      case 'statistics':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Statistics</label>
              {(content.statistics || []).map((stat, index) => (
                <div key={index} className="border rounded-lg p-4 mb-3">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div>
                      <label className="block text-xs font-medium mb-1">Value</label>
                      <input
                        type="text"
                        value={stat.value || ''}
                        onChange={(e) => {
                          const stats = [...(content.statistics || [])];
                          stats[index] = { ...stats[index], value: e.target.value };
                          updateContent('statistics', stats);
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="95%"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1">Label</label>
                      <input
                        type="text"
                        value={stat.label || ''}
                        onChange={(e) => {
                          const stats = [...(content.statistics || [])];
                          stats[index] = { ...stats[index], label: e.target.value };
                          updateContent('statistics', stats);
                        }}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="Placement Rate"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const stats = (content.statistics || []).filter((_, i) => i !== index);
                      updateContent('statistics', stats);
                    }}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove Statistic
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const stats = [...(content.statistics || []), { value: '', label: '' }];
                  updateContent('statistics', stats);
                }}
                className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50"
              >
                + Add Statistic
              </button>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-4">
            <ImageUploader
              value={content.src || ''}
              onChange={(url) => updateContent('src', url)}
              label="Image"
              folder="images"
              required
            />
            <div>
              <label className="block text-sm font-medium mb-1">Alt Text</label>
              <input
                type="text"
                value={content.alt || ''}
                onChange={(e) => updateContent('alt', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Image description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Caption</label>
              <input
                type="text"
                value={content.caption || ''}
                onChange={(e) => updateContent('caption', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Optional caption"
              />
            </div>
          </div>
        );

      case 'button':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Button Text</label>
              <input
                type="text"
                value={content.text || ''}
                onChange={(e) => updateContent('text', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Click Here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Link URL</label>
              <input
                type="text"
                value={content.link || ''}
                onChange={(e) => updateContent('link', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="/destination"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Button Style</label>
              <select
                value={content.variant || 'primary'}
                onChange={(e) => updateContent('variant', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div>
            <label className="block text-sm font-medium mb-1">Content (JSON)</label>
            <textarea
              value={JSON.stringify(content, null, 2)}
              onChange={(e) => {
                try {
                  setEditingBlock({ ...editingBlock, content: JSON.parse(e.target.value) });
                } catch {}
              }}
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
              rows="10"
            />
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Page Builder - Content Blocks</h1>
          <p className="text-gray-600 text-sm mt-1">Design each page with customizable content blocks</p>
        </div>
        {pages.length > 0 && selectedPage && (
          <button
            onClick={handleCreateBlock}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            Add Block
          </button>
        )}
      </div>

      {/* No Pages Message */}
      {pages.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <LayoutIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Pages Found</h2>
          <p className="text-gray-600 mb-6">
            You need to create a page first before adding content blocks.
          </p>
          <a
            href="/admin/pages"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-5 h-5" />
            Create Your First Page
          </a>
        </div>
      ) : (
        <>
          {/* Page Selector */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg shadow-md p-6 mb-6 border-2 border-green-200">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              📄 Select Page to Edit
            </label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 bg-white text-lg font-medium"
            >
              {pages.map(page => (
                <option key={page.pageName} value={page.pageName}>
                  {page.pageTitle} ({page.pageName})
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-600 mt-2">
              Selected: <span className="font-semibold text-green-700">{selectedPage}</span>
            </p>
          </div>

          {/* Blocks List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-green-600"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {blocks.length === 0 ? (
                <div className="bg-white rounded-lg shadow-md p-12 text-center">
                  <LayoutIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No blocks yet. Start building your page!</p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                    <button
                      onClick={handleCreateBlock}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add First Block
                    </button>
                    
                    <button
                      onClick={handleImportDefaultContent}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Import Default Content
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 mt-4">
                    💡 Tip: Click "Import Default Content" to auto-generate editable content blocks for this page
                  </p>
                </div>
              ) : (
                blocks.map((block, index) => {
                  const Icon = getBlockIcon(block.blockType);
                  const color = getBlockColor(block.blockType);
                  
                  return (
                    <div
                      key={block.id}
                      className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
                        block.isVisible ? '' : 'opacity-60'
                      }`}
                      style={{ borderLeftColor: color }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Move className="w-4 h-4 text-gray-400 cursor-move" />
                            <span className="text-sm font-mono text-gray-500">#{index + 1}</span>
                          </div>
                          
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                            style={{ backgroundColor: color }}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          
                          <div>
                            <div className="font-semibold text-gray-900">{block.blockLabel}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                                {block.blockType}
                              </span>
                              {block.sectionName && (
                                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
                                  {block.sectionName}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">{block.blockId}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleToggleVisibility(block)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            title={block.isVisible ? 'Hide' : 'Show'}
                          >
                            {block.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleCloneBlock(block.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                            title="Clone"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditBlock(block)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </>
      )}

      {/* Block Editor Modal */}
      {showBlockEditor && editingBlock && (
        <div className="fixed inset-0 bg-gray-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {editingBlock.id ? 'Edit Block' : 'Create Block'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">{editingBlock.blockLabel}</p>
              </div>
              <button
                onClick={() => setShowBlockEditor(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-between border-b bg-gray-50 px-6 py-3">
              <div className="flex gap-2">
                {['content'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium rounded-t-lg ${
                      activeTab === tab
                        ? 'bg-white text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {showAdvanced ? '← Simple Mode' : 'Advanced Settings →'}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'content' && (
                <div className="space-y-6">
                  {/* Basic Settings */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Block Type</label>
                        <select
                          value={editingBlock.blockType}
                          onChange={(e) => setEditingBlock({ ...editingBlock, blockType: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                        >
                          {BLOCK_TYPES.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Block Name</label>
                        <input
                          type="text"
                          value={editingBlock.blockLabel}
                          onChange={(e) => setEditingBlock({ ...editingBlock, blockLabel: e.target.value })}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                          placeholder="e.g., Vision Statement"
                        />
                      </div>
                    </div>

                    {/* Advanced IDs - collapsible */}
                    {showAdvanced && (
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-600">Block ID (Auto-generated)</label>
                          <input
                            type="text"
                            value={editingBlock.blockId}
                            onChange={(e) => setEditingBlock({ ...editingBlock, blockId: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-600">Section Name (Optional)</label>
                          <input
                            type="text"
                            value={editingBlock.sectionName || ''}
                            onChange={(e) => setEditingBlock({ ...editingBlock, sectionName: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                            placeholder="Optional"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content Fields */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">📝 Content</h3>
                    {renderContentFields()}
                  </div>

                  {/* Quick Styling - only show common options */}
                  {showAdvanced && (
                    <>
                      <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold mb-4">🎨 Quick Styling</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Background</label>
                            <input
                              type="text"
                              value={editingBlock.styling?.backgroundColor || ''}
                              onChange={(e) => setEditingBlock({
                                ...editingBlock,
                                styling: { ...editingBlock.styling, backgroundColor: e.target.value }
                              })}
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="#ffffff"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Padding</label>
                            <input
                              type="text"
                              value={editingBlock.styling?.padding || ''}
                              onChange={(e) => setEditingBlock({
                                ...editingBlock,
                                styling: { ...editingBlock.styling, padding: e.target.value }
                              })}
                              className="w-full px-3 py-2 border rounded-lg"
                              placeholder="20px"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">Text Align</label>
                            <select
                              value={editingBlock.styling?.textAlign || ''}
                              onChange={(e) => setEditingBlock({
                                ...editingBlock,
                                styling: { ...editingBlock.styling, textAlign: e.target.value }
                              })}
                              className="w-full px-3 py-2 border rounded-lg"
                            >
                              <option value="">Default</option>
                              <option value="left">Left</option>
                              <option value="center">Center</option>
                              <option value="right">Right</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setShowBlockEditor(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlock}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
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

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
  { value: 'table', label: 'Table', icon: LayoutIcon, color: '#0ea5e9' },
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

  // Define all available pages based on templates
  const AVAILABLE_PAGES = [
    { pageName: 'homepage', pageTitle: 'Homepage' },
    { pageName: 'why-iiitk', pageTitle: 'Why IIIT Kottayam' },
    { pageName: 'about', pageTitle: 'About' },
    { pageName: 'admissions', pageTitle: 'Admissions' },
    { pageName: 'academics', pageTitle: 'Academics' },
    { pageName: 'research-groups', pageTitle: 'Research Groups' },
    { pageName: 'placements', pageTitle: 'Placements' },
    { pageName: 'nirf', pageTitle: 'NIRF' },
    // Courses
    { pageName: 'btech-cse', pageTitle: 'B.Tech CSE' },
    { pageName: 'btech-ece', pageTitle: 'B.Tech ECE' },
    { pageName: 'btech-cybersecurity', pageTitle: 'B.Tech Cybersecurity' },
    { pageName: 'btech-ai-ds', pageTitle: 'B.Tech AI & Data Science' },
    // Facilities
    { pageName: 'hostel', pageTitle: 'Hostel' },
    { pageName: 'gym', pageTitle: 'Gymnasium' },
    { pageName: 'gymnasium', pageTitle: 'Gymnasium (Alt)' },
    { pageName: 'internet', pageTitle: 'Internet' },
    { pageName: 'campus-network', pageTitle: 'Campus Network' },
    { pageName: 'medical-centre', pageTitle: 'Medical Centre' },
    { pageName: 'student-mess', pageTitle: 'Student Mess' },
    { pageName: 'security', pageTitle: 'Security' },
    { pageName: 'sports', pageTitle: 'Sports' },
    { pageName: 'bank-atm', pageTitle: 'Bank/ATM' },
    // IIC & Clubs
    { pageName: 'innovation-cell', pageTitle: 'Innovation Cell' },
    { pageName: 'cultural-club', pageTitle: 'Cultural Club' },
    { pageName: 'technical-club', pageTitle: 'Technical Club' },
    { pageName: 'sports-club', pageTitle: 'Sports Club' },
    { pageName: 'fdp-webinars', pageTitle: 'FDP & Webinars' },
    { pageName: 'trendles-club', pageTitle: 'Trendles Club' },
    { pageName: 'cyber-security-club', pageTitle: 'Cyber Security Club' },
    { pageName: 'mind-quest', pageTitle: 'Mind Quest' },
    { pageName: 'ieee-student-branch', pageTitle: 'IEEE Student Branch' },
    { pageName: 'acm', pageTitle: 'ACM Student Chapter' },
    // Others
    { pageName: 'gallery', pageTitle: 'Gallery' },
    { pageName: 'campus-life', pageTitle: 'Campus Life' },
    { pageName: 'contact', pageTitle: 'Contact' },
    { pageName: 'governance', pageTitle: 'Governance' },
    { pageName: 'scholarships', pageTitle: 'Scholarships' }
  ];

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
        setBlocks(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching blocks:', error);
    } finally {
      setLoading(false);
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

  const handleImportDefaultContent = async () => {
    if (!window.confirm(`This will REPLACE all existing content for "${selectedPage}" with default content from the actual website pages. All current blocks for this page will be deleted and replaced with fresh content. Continue?`)) {
      return;
    }

    try {
      // First, delete all existing blocks for this page
      const existingBlocks = blocks.filter(block => block.pageName === selectedPage);
      console.log(`Found ${existingBlocks.length} existing blocks to delete for page "${selectedPage}"`);
      
      let deletedCount = 0;
      for (const block of existingBlocks) {
        try {
          const response = await API.delete(`/api/content-blocks/${block.id}`);
          if (response.success) {
            deletedCount++;
            console.log(`✅ Deleted block: ${block.blockId}`);
          } else {
            console.error(`❌ Failed to delete block ${block.blockId}:`, response.error);
          }
        } catch (delError) {
          console.error(`❌ Error deleting block ${block.blockId}:`, delError);
        }
      }
      
      console.log(`Deleted ${deletedCount} of ${existingBlocks.length} blocks`);

      // Define COMPLETE existing content from the actual website pages
      const pageContentTemplates = {
        'homepage': [
          { blockId: 'home-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Homepage Hero Banner', 
            content: { title: 'Welcome to IIIT Kottayam', subtitle: 'Pioneering Excellence in Technology and Innovation', description: 'A premier institute fostering cutting-edge research and world-class education in Information Technology' }, blockOrder: 0 },
          { blockId: 'home-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About IIIT Kottayam',
            content: { text: 'Indian Institute of Information Technology Kottayam (IIIT Kottayam) is an Institute of National Importance established by the Ministry of Education, Government of India. We are committed to academic excellence and innovation in Information Technology, fostering world-class education and cutting-edge research.' }, blockOrder: 1 },
          { blockId: 'home-vision', sectionName: 'vision', blockType: 'heading', blockLabel: 'Our Vision',
            content: { text: 'Our Vision', level: 2 }, blockOrder: 2 },
          { blockId: 'home-vision-text', sectionName: 'vision', blockType: 'paragraph', blockLabel: 'Vision Statement',
            content: { text: 'To be a globally recognized center of excellence in Information Technology education, research, and innovation, contributing to societal transformation through technology.' }, blockOrder: 3 }
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
          { blockId: 'admissions-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Join IIIT Kottayam' }, blockOrder: 0 },
          { blockId: 'admissions-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Admissions', level: 1 }, blockOrder: 1 },
          { blockId: 'admissions-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Explore our Undergraduate, Postgraduate, and Doctoral programmes.' }, blockOrder: 2 },
          { blockId: 'admissions-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'IIIT Kottayam offers world-class education with cutting-edge programs in technology and research. Our admission process is designed to identify talented students who are passionate about innovation and academic excellence.' }, blockOrder: 3 },
          { blockId: 'admissions-ug-heading', sectionName: 'ug', blockType: 'heading', blockLabel: 'UG Programs Heading',
            content: { text: 'Under Graduate Programmes', level: 2 }, blockOrder: 4 },
          { blockId: 'admissions-ug-btech', sectionName: 'ug', blockType: 'heading', blockLabel: 'B.Tech Programs',
            content: { text: 'B.Tech/B.Tech-MS Programmes:', level: 3 }, blockOrder: 5 },
          { blockId: 'admissions-ug-programs', sectionName: 'ug', blockType: 'list', blockLabel: 'UG Programs List',
            content: { items: ['Computer Science and Engineering (CSE)', 'Electronics and Communication Engineering (ECE)', 'Computer Science with specialisation in Cyber Security', 'Computer Science with specialisation in AI & Data Science'] }, blockOrder: 6 }
        ],
        'academics': [
          { blockId: 'academics-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Education at IIITK' }, blockOrder: 0 },
          { blockId: 'academics-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Academics', level: 1 }, blockOrder: 1 },
          { blockId: 'academics-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Innovative and dynamic curriculum focused on industry and research.' }, blockOrder: 2 },
          { blockId: 'academics-intro-para1', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction Paragraph 1',
            content: { text: 'The classes for the first batch of B.Tech in Computer Science & Engineering commenced in August 2015. Senior faculty members from other Institutions of National Importance like, IITs, IISERs, NITs etc. are mentoring the vibrant faculty team of IIIT Kottayam. Only people with a Ph.D degree from reputed National Institutions and having a flare for teaching and research are engaged by IIIT Kottayam as faculty. PhD programme started in the year 2019 & M.Tech for working professionals in 2020.' }, blockOrder: 3 },
          { blockId: 'academics-intro-para2', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction Paragraph 2',
            content: { text: 'IIIT Kottayam follows an innovative and dynamic curriculum at par with other Institutions of National Importance with focus on the demands of industry and research. Most of the core courses are covered in the first half while the second half of the program largely comprises of need based courses focusing on the demands of the industry as well as thrust on research.' }, blockOrder: 4 },
          { blockId: 'academics-ug-heading', sectionName: 'ug', blockType: 'heading', blockLabel: 'UG Programme Heading',
            content: { text: 'UG Programme', level: 2 }, blockOrder: 5 }
        ],
        'research-groups': [
          { blockId: 'research-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Research Groups' }, blockOrder: 0 },
          { blockId: 'research-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'RESEARCH GROUPS', level: 1 }, blockOrder: 1 },
          { blockId: 'research-about-heading', sectionName: 'about', blockType: 'heading', blockLabel: 'About Research Groups',
            content: { text: 'About Research Groups', level: 2 }, blockOrder: 2 },
          { blockId: 'research-about-desc', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Description',
            content: { text: 'The research groups at IIIT Kottayam foster a vibrant research and innovation culture by bringing together interdisciplinary teams. Each group focuses on domain-specific research agendas and encourages collaboration with industry and international partners.' }, blockOrder: 3 },
          { blockId: 'research-involved-heading', sectionName: 'involved', blockType: 'heading', blockLabel: 'Who is Involved',
            content: { text: 'Who is Involved?', level: 2 }, blockOrder: 4 },
          { blockId: 'research-involved-list', sectionName: 'involved', blockType: 'list', blockLabel: 'Involved Members',
            content: { items: ['Faculty members of IIIT Kottayam', 'Ph.D. scholars', 'MTech students', 'BTech students', 'Alumni of IIIT Kottayam', 'Interns', 'Industry experts', 'Experts from R&D labs', 'Renowned faculty members of premier institutes in India', 'Foreign renowned faculty members', 'Foreign industry experts', 'Foreign research scholars', 'Foreign R&D experts'] }, blockOrder: 5 },
          { blockId: 'research-goals-heading', sectionName: 'goals', blockType: 'heading', blockLabel: 'Goals',
            content: { text: 'Goals', level: 2 }, blockOrder: 6 },
          { blockId: 'research-goals-list', sectionName: 'goals', blockType: 'list', blockLabel: 'Goals List',
            content: { items: ['To enhance the Research & Project Funding for IIIT Kottayam & to establish Research Lab for the respective Group', 'To enhance the Consultancy work for faculty members', 'To enhance Campus Placement'] }, blockOrder: 7 },
          { blockId: 'research-active-heading', sectionName: 'active', blockType: 'heading', blockLabel: 'Active Research Groups',
            content: { text: 'Active Research Groups', level: 2 }, blockOrder: 8 },
          { blockId: 'research-groups-list', sectionName: 'active', blockType: 'list', blockLabel: 'Research Groups List',
            content: { items: ['Data Science Research Group', 'Bigdata & ML Research Group', 'Cyber Security Research Group', 'Network Science Research Group', 'IoT Cloud Research Group', 'Intelligent IoT Research Group', 'Smart Wireless Inter-Networking Research Group', 'I2C5-Intelligent Integrated Circuits and Systems Research Group', 'Computational Engineering and Data Modelling Research Group', 'Data Analytics and Business Decisions', 'Bio-Medical Informatics and Genomics Research Group', 'FACTS-H Lab', 'AI-powered Signal and Image Processing Research (ASPIRE) Group'] }, blockOrder: 9 }
        ],
        'placements': [
          { blockId: 'placements-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Career Success' }, blockOrder: 0 },
          { blockId: 'placements-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'IIIT KOTTAYAM PLACEMENTS', level: 1 }, blockOrder: 1 },
          { blockId: 'placements-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'IIIT Kottayam has consistently achieved outstanding placement records with top companies recruiting our students. Our placement cell works tirelessly to connect students with leading organizations across various domains.' }, blockOrder: 2 }
        ],
        'nirf': [
          { blockId: 'nirf-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Our Latest Achievement' }, blockOrder: 0 },
          { blockId: 'nirf-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'NIRF Ranking 2025', level: 1 }, blockOrder: 1 },
          { blockId: 'nirf-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'A Testament to Our Continued Excellence in Education and Research' }, blockOrder: 2 },
          { blockId: 'nirf-engineering-heading', sectionName: 'engineering', blockType: 'heading', blockLabel: 'Engineering Rank',
            content: { text: 'Engineering', level: 2 }, blockOrder: 3 },
          { blockId: 'nirf-engineering-rank', sectionName: 'engineering', blockType: 'paragraph', blockLabel: 'Engineering Rank Band',
            content: { text: 'Rank Band: 101-150' }, blockOrder: 4 },
          { blockId: 'nirf-engineering-desc', sectionName: 'engineering', blockType: 'paragraph', blockLabel: 'Engineering Description',
            content: { text: 'Consistently placed among the top engineering institutions, reflecting our strong focus on technical education and innovation.' }, blockOrder: 5 },
          { blockId: 'nirf-overall-heading', sectionName: 'overall', blockType: 'heading', blockLabel: 'Overall Rank',
            content: { text: 'Overall', level: 2 }, blockOrder: 6 },
          { blockId: 'nirf-overall-rank', sectionName: 'overall', blockType: 'paragraph', blockLabel: 'Overall Rank Band',
            content: { text: 'Rank Band: 151-200' }, blockOrder: 7 },
          { blockId: 'nirf-overall-desc', sectionName: 'overall', blockType: 'paragraph', blockLabel: 'Overall Description',
            content: { text: 'Recognized nationally for our comprehensive academic framework, research output, and holistic development of students.' }, blockOrder: 8 },
          { blockId: 'nirf-director-message', sectionName: 'message', blockType: 'paragraph', blockLabel: 'Director Message',
            content: { text: '"Our performance in the NIRF 2025 rankings is a direct result of the relentless dedication of our faculty, the innovative spirit of our students, and our collective commitment to academic and research excellence." — Director, IIIT Kottayam' }, blockOrder: 9 }
        ],
        'hostel': [
          { blockId: 'hostel-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Campus Living' }, blockOrder: 0 },
          { blockId: 'hostel-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Hostel', level: 1 }, blockOrder: 1 },
          { blockId: 'hostel-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Comfortable and secure accommodation for all students.' }, blockOrder: 2 },
          { blockId: 'hostel-about-heading', sectionName: 'about', blockType: 'heading', blockLabel: 'About Hostels',
            content: { text: 'About Our Hostels', level: 2 }, blockOrder: 3 },
          { blockId: 'hostel-about-desc', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Description',
            content: { text: 'Separate hostel accommodation is provided for boys and girls. There are six-year hostel for boys and three hostel for girls. All the hostels have common rooms. 24 hour WiFi connectivity and recreational games, where newspapers, magazines and TVs are available. Round the clock water and electricity is provided. Laundry equipments are also available in the hostels.' }, blockOrder: 4 },
          { blockId: 'hostel-facilities-heading', sectionName: 'facilities', blockType: 'heading', blockLabel: 'Facilities',
            content: { text: 'Facilities', level: 2 }, blockOrder: 5 },
          { blockId: 'hostel-facilities-list', sectionName: 'facilities', blockType: 'list', blockLabel: 'Facilities List',
            content: { items: ['24-hour WiFi connectivity', 'Common dining facilities', 'Recreation rooms with TV', 'Newspapers and magazines', '24/7 security', 'Laundry equipment available'] }, blockOrder: 6 }
        ],
        'gym': [
          { blockId: 'gym-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Fitness & Wellness' }, blockOrder: 0 },
          { blockId: 'gym-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Gymnasium', level: 1 }, blockOrder: 1 },
          { blockId: 'gym-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'State-of-the-art fitness facility for developing physical health and sports activities.' }, blockOrder: 2 },
          { blockId: 'gym-about-heading', sectionName: 'about', blockType: 'heading', blockLabel: 'About Gymnasium',
            content: { text: 'About Our Gymnasium', level: 2 }, blockOrder: 3 },
          { blockId: 'gym-about-desc', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Description',
            content: { text: 'A state of art, Gymnasium nourishes several enthusiasts to develop their fitness & sports activities. IIIT Kottayam has a well equipped gymnasium including Spinning Bike, Treadmill and Elliptical Cross Trainer. We also have Benches, Incline Chest, Seater Shoulder Press, Cable Cross Over, Straight Bar, Leg Curl/Leg Extension & Dumbbells. Students can avail the facilities of gym with the proper guidance of Physical Trainer.' }, blockOrder: 4 },
          { blockId: 'gym-equipment-heading', sectionName: 'equipment', blockType: 'heading', blockLabel: 'Available Equipment',
            content: { text: 'Available Equipment', level: 2 }, blockOrder: 5 },
          { blockId: 'gym-equipment-list', sectionName: 'equipment', blockType: 'list', blockLabel: 'Equipment List',
            content: { items: ['Spinning Bike - High-intensity cardio workout', 'Treadmill - Running and walking exercise', 'Elliptical Cross Trainer - Low-impact full body workout', 'Bench Press - Upper body strength training', 'Incline Chest - Targeted chest muscle development', 'Seater Shoulder Press - Shoulder and arm strengthening', 'Cable Cross Over - Versatile resistance training', 'Straight Bar - Core strength and stability', 'Leg Curl/Extension - Lower body muscle development', 'Dumbbells - Free weight training equipment'] }, blockOrder: 6 }
        ],
        'gallery': [
          { blockId: 'gallery-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Visual Archive' }, blockOrder: 0 },
          { blockId: 'gallery-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Photo Gallery', level: 1 }, blockOrder: 1 },
          { blockId: 'gallery-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Explore memorable moments and events from our vibrant campus life through our comprehensive photo archives.' }, blockOrder: 2 },
          { blockId: 'gallery-about-heading', sectionName: 'about', blockType: 'heading', blockLabel: 'About Gallery',
            content: { text: 'About Our Gallery', level: 2 }, blockOrder: 3 },
          { blockId: 'gallery-about-desc', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Description',
            content: { text: 'Our photo gallery serves as a visual chronicle of IIIT Kottayam\'s journey, capturing the essence of academic excellence, cultural diversity, and community spirit. From technical conferences to cultural festivals, every significant moment is preserved for posterity.' }, blockOrder: 4 }
        ],
        'campus-life': [
          { blockId: 'campus-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Campus Life Hero',
            content: { title: 'Campus Life', subtitle: 'Vibrant Community & Activities' }, blockOrder: 0 },
          { blockId: 'campus-facilities', sectionName: 'facilities', blockType: 'heading', blockLabel: 'Facilities',
            content: { text: 'Campus Facilities', level: 2 }, blockOrder: 1 }
        ],
        'contact': [
          { blockId: 'contact-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Get In Touch' }, blockOrder: 0 },
          { blockId: 'contact-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'CONTACT US', level: 1 }, blockOrder: 1 },
          { blockId: 'contact-reach-heading', sectionName: 'directions', blockType: 'heading', blockLabel: 'Reach IIIT Kottayam',
            content: { text: 'Reach IIIT Kottayam', level: 2 }, blockOrder: 2 },
          { blockId: 'contact-bus-station', sectionName: 'directions', blockType: 'paragraph', blockLabel: 'From Bus Station',
            content: { text: 'From the Bus Station (KSRTC Bus Station): IIIT Kottayam\'s permanent campus is located in Valavoor village, Rejo, Kottayam. The campus is about 18km away from Rela which is en route to IIIT Kottayam campus.' }, blockOrder: 3 },
          { blockId: 'contact-airport', sectionName: 'directions', blockType: 'paragraph', blockLabel: 'From Airport',
            content: { text: 'From the Airport: IIIT Kottayam is about 70 km from the Cochin International Airport, Nedumbassery. A taxi will cost around Rs. 2000/- from Airport to IIIT Kottayam campus.' }, blockOrder: 4 },
          { blockId: 'contact-railway', sectionName: 'directions', blockType: 'paragraph', blockLabel: 'From Railway Station',
            content: { text: 'From the Railway Station (KSRTC Bus Station): IIIT Kottayam is about 40 km from Kottayam Railway Station but services are available from KSRTC Bus Station to Rela. From Rela, you can hire an auto/taxi or gypsy buses to Scooter Junction & then you can hire an auto to IIIT Kottayam campus.' }, blockOrder: 5 },
          { blockId: 'contact-general', sectionName: 'contact', blockType: 'paragraph', blockLabel: 'General Enquiry',
            content: { text: 'General Enquiry: +91 0482 228210, +91 8075-521128' }, blockOrder: 6 },
          { blockId: 'contact-email', sectionName: 'contact', blockType: 'paragraph', blockLabel: 'Email',
            content: { text: 'Email: office@iiitkottayam.ac.in' }, blockOrder: 7 },
          { blockId: 'contact-address-heading', sectionName: 'address', blockType: 'heading', blockLabel: 'Communication Address',
            content: { text: 'Communication Address', level: 2 }, blockOrder: 8 },
          { blockId: 'contact-address', sectionName: 'address', blockType: 'paragraph', blockLabel: 'Address',
            content: { text: 'Indian Institute of Information Technology Kottayam, Valavoor PO, Kottayam, Kerala, India' }, blockOrder: 9 }
        ],
        'governance': [
          { blockId: 'governance-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Structure & Reports' }, blockOrder: 0 },
          { blockId: 'governance-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Governance', level: 1 }, blockOrder: 1 },
          { blockId: 'governance-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Explore the foundational acts, statutes, and annual reports of the institute.' }, blockOrder: 2 },
          { blockId: 'governance-docs-heading', sectionName: 'documents', blockType: 'heading', blockLabel: 'Core Documents',
            content: { text: 'Core Documents', level: 2 }, blockOrder: 3 },
          { blockId: 'governance-docs-list', sectionName: 'documents', blockType: 'list', blockLabel: 'Governance Documents',
            content: { items: ['IIIT PPP Act (2017)', 'IIIT Bill', 'IIITK Statutes'] }, blockOrder: 4 },
          { blockId: 'governance-reports-heading', sectionName: 'reports', blockType: 'heading', blockLabel: 'Annual Reports',
            content: { text: 'Annual Reports', level: 2 }, blockOrder: 5 }
        ],
        'scholarships': [
          { blockId: 'scholarships-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Financial Support' }, blockOrder: 0 },
          { blockId: 'scholarships-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Scholarship & Educational Loans', level: 1 }, blockOrder: 1 },
          { blockId: 'scholarships-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Explore financial aid options, scholarships, and bank loan schemes available to students.' }, blockOrder: 2 },
          { blockId: 'scholarships-banks-heading', sectionName: 'banks', blockType: 'heading', blockLabel: 'Bank Loan Schemes',
            content: { text: 'Bank Loan Schemes', level: 2 }, blockOrder: 3 },
          { blockId: 'scholarships-banks-list', sectionName: 'banks', blockType: 'list', blockLabel: 'Bank List',
            content: { items: ['State Bank of India - Scholar Loan Scheme', 'Punjab National Bank', 'Indian Bank - Loan Scheme', 'Union Bank - Loan Scheme', 'Canara Bank - MoU with Ministry of Education'] }, blockOrder: 4 }
        ],
        'internet': [
          { blockId: 'internet-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Network Infrastructure' }, blockOrder: 0 },
          { blockId: 'internet-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Internet', level: 1 }, blockOrder: 1 },
          { blockId: 'internet-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'High-speed connectivity and advanced computing infrastructure.' }, blockOrder: 2 },
          { blockId: 'internet-overview-heading', sectionName: 'overview', blockType: 'heading', blockLabel: 'Network Infrastructure',
            content: { text: 'Campus Network Infrastructure', level: 2 }, blockOrder: 3 },
          { blockId: 'internet-overview-para1', sectionName: 'overview', blockType: 'paragraph', blockLabel: 'Overview Paragraph 1',
            content: { text: 'The campus is equipped with an internet bandwidth of 5 Gbps primary and 1 Gbps secondary link (1:1). Internet connectivity is also extended to the boys\' and girls\' hostels through both wired and wireless connections. More than 250 access points are deployed throughout the campus to provide these services.' }, blockOrder: 4 },
          { blockId: 'internet-overview-para2', sectionName: 'overview', blockType: 'paragraph', blockLabel: 'Overview Paragraph 2',
            content: { text: 'At present, there are more than 500 computers with 200 high-end laptops and 50 workstations, all equipped with wired connectivity. More than 2,800 users (including staff and students) are connected to the Institute network through proper authentication methods. Around 300 IP phones are installed at various locations inside and outside the campus to ensure easy communication.' }, blockOrder: 5 },
          { blockId: 'internet-features-heading', sectionName: 'features', blockType: 'heading', blockLabel: 'Key Features',
            content: { text: 'Key Features', level: 2 }, blockOrder: 6 },
          { blockId: 'internet-features-list', sectionName: 'features', blockType: 'list', blockLabel: 'Features List',
            content: { items: ['5 Gbps Primary Bandwidth', '250+ Access Points', '2,800+ Connected Users', '24/7 CCTV Surveillance'] }, blockOrder: 7 }
        ],
        'medical-centre': [
          { blockId: 'medical-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Health & Wellness' }, blockOrder: 0 },
          { blockId: 'medical-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Medical Centre', level: 1 }, blockOrder: 1 },
          { blockId: 'medical-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Comprehensive healthcare services for all students and staff' }, blockOrder: 2 },
          { blockId: 'medical-services-heading', sectionName: 'services', blockType: 'heading', blockLabel: 'Medical Services',
            content: { text: 'Medical Services', level: 2 }, blockOrder: 3 },
          { blockId: 'medical-services-list', sectionName: 'services', blockType: 'list', blockLabel: 'Services List',
            content: { items: ['General Consultation - Primary healthcare consultation services', 'Emergency Care - 24/7 emergency medical assistance', 'Health Checkups - Regular health monitoring and checkups', 'Medicine Dispensary - Essential medicines and prescriptions', 'First Aid - Immediate first aid treatment', 'Ambulance Service - Fully equipped ambulance for emergencies'] }, blockOrder: 4 },
          { blockId: 'medical-contact', sectionName: 'contact', blockType: 'paragraph', blockLabel: 'Contact',
            content: { text: 'Help Desk: 0482 2202705 for assistance' }, blockOrder: 5 }
        ],
        'student-mess': [
          { blockId: 'mess-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Dining Facilities' }, blockOrder: 0 },
          { blockId: 'mess-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Student Mess', level: 1 }, blockOrder: 1 },
          { blockId: 'mess-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Nutritious and affordable dining options for all students' }, blockOrder: 2 },
          { blockId: 'mess-features-heading', sectionName: 'features', blockType: 'heading', blockLabel: 'Mess Features',
            content: { text: 'Mess Features', level: 2 }, blockOrder: 3 },
          { blockId: 'mess-features-list', sectionName: 'features', blockType: 'list', blockLabel: 'Features List',
            content: { items: ['Affordable Dining - High-quality meals at affordable prices', 'Student Management - Managed by elected student representatives', 'Nutritious Meals - Balanced vegetarian and non-vegetarian options', 'Hygienic Environment - Maintained cleanliness and food safety standards'] }, blockOrder: 4 }
        ],
        'innovation-cell': [
          { blockId: 'iic-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Innovation & Entrepreneurship' }, blockOrder: 0 },
          { blockId: 'iic-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Innovation Cell', level: 1 }, blockOrder: 1 },
          { blockId: 'iic-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Fostering innovation, creativity, and entrepreneurship among students' }, blockOrder: 2 },
          { blockId: 'iic-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About IIC',
            content: { text: 'The Institution\'s Innovation Council (IIC) at IIIT Kottayam is dedicated to promoting innovation and entrepreneurship among students. We organize workshops, hackathons, competitions, and mentorship programs to help students transform their ideas into reality.' }, blockOrder: 3 },
          { blockId: 'iic-objectives-heading', sectionName: 'objectives', blockType: 'heading', blockLabel: 'Objectives',
            content: { text: 'Our Objectives', level: 2 }, blockOrder: 4 },
          { blockId: 'iic-objectives-list', sectionName: 'objectives', blockType: 'list', blockLabel: 'Objectives List',
            content: { items: ['Promote innovation and entrepreneurship culture', 'Conduct workshops and training programs', 'Support startup initiatives and incubation', 'Organize competitions and hackathons', 'Provide mentorship from industry experts'] }, blockOrder: 5 }
        ],
        'cultural-club': [
          { blockId: 'cultural-hero-badge', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Badge',
            content: { text: 'Arts & Culture' }, blockOrder: 0 },
          { blockId: 'cultural-hero-title', sectionName: 'hero', blockType: 'heading', blockLabel: 'Hero Title',
            content: { text: 'Cultural Club', level: 1 }, blockOrder: 1 },
          { blockId: 'cultural-hero-subtitle', sectionName: 'hero', blockType: 'paragraph', blockLabel: 'Hero Subtitle',
            content: { text: 'Celebrating diversity through music, dance, drama, and arts' }, blockOrder: 2 },
          { blockId: 'cultural-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About Cultural Club',
            content: { text: 'The Cultural Club at IIIT Kottayam provides a platform for students to explore and showcase their talents in various art forms including music, dance, drama, and visual arts. We organize cultural festivals, competitions, and performances throughout the year.' }, blockOrder: 3 },
          { blockId: 'cultural-activities-heading', sectionName: 'activities', blockType: 'heading', blockLabel: 'Activities',
            content: { text: 'Our Activities', level: 2 }, blockOrder: 4 },
          { blockId: 'cultural-activities-list', sectionName: 'activities', blockType: 'list', blockLabel: 'Activities List',
            content: { items: ['Music performances and concerts', 'Dance competitions and workshops', 'Drama and theatre productions', 'Art exhibitions and competitions', 'Cultural festivals and celebrations', 'Talent showcases and open mic events'] }, blockOrder: 5 }
        ],
        // Course Pages
        'btech-cse': [
          { blockId: 'btech-cse-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'B.Tech Computer Science & Engineering', subtitle: 'Building Tomorrow\'s Technology Leaders' }, blockOrder: 0 },
          { blockId: 'btech-cse-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'The B.Tech Computer Science and Engineering program at IIIT Kottayam provides comprehensive education in computing fundamentals, software development, algorithms, and emerging technologies.' }, blockOrder: 1 },
          { blockId: 'btech-cse-duration', sectionName: 'details', blockType: 'paragraph', blockLabel: 'Duration',
            content: { text: 'Duration: 4 Years (8 Semesters)' }, blockOrder: 2 }
        ],
        'btech-ece': [
          { blockId: 'btech-ece-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'B.Tech Electronics & Communication Engineering', subtitle: 'Innovating Communication Systems' }, blockOrder: 0 },
          { blockId: 'btech-ece-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'The B.Tech ECE program combines electronics and communication engineering with modern technologies including IoT, wireless systems, and VLSI design.' }, blockOrder: 1 },
          { blockId: 'btech-ece-duration', sectionName: 'details', blockType: 'paragraph', blockLabel: 'Duration',
            content: { text: 'Duration: 4 Years (8 Semesters)' }, blockOrder: 2 }
        ],
        'btech-cybersecurity': [
          { blockId: 'btech-cs-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'B.Tech Cybersecurity', subtitle: 'Protecting the Digital World' }, blockOrder: 0 },
          { blockId: 'btech-cs-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'Our specialized cybersecurity program prepares students to tackle modern security challenges with hands-on training in ethical hacking, network security, cryptography, and cyber forensics.' }, blockOrder: 1 },
          { blockId: 'btech-cs-duration', sectionName: 'details', blockType: 'paragraph', blockLabel: 'Duration',
            content: { text: 'Duration: 4 Years (8 Semesters)' }, blockOrder: 2 }
        ],
        'btech-ai-ds': [
          { blockId: 'btech-ai-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'B.Tech AI & Data Science', subtitle: 'Shaping the Future with Intelligence' }, blockOrder: 0 },
          { blockId: 'btech-ai-intro', sectionName: 'intro', blockType: 'paragraph', blockLabel: 'Introduction',
            content: { text: 'This program focuses on artificial intelligence, machine learning, data analytics, and deep learning to prepare students for careers in AI-driven industries.' }, blockOrder: 1 },
          { blockId: 'btech-ai-duration', sectionName: 'details', blockType: 'paragraph', blockLabel: 'Duration',
            content: { text: 'Duration: 4 Years (8 Semesters)' }, blockOrder: 2 }
        ],
        // Facilities Pages
        'security': [
          { blockId: 'security-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Campus Security', subtitle: 'Ensuring Safe Environment' }, blockOrder: 0 },
          { blockId: 'security-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'IIIT Kottayam maintains 24/7 campus security with trained personnel, CCTV surveillance, and access control systems to ensure the safety of all students and staff.' }, blockOrder: 1 },
          { blockId: 'security-features', sectionName: 'features', blockType: 'list', blockLabel: 'Features',
            content: { items: ['24/7 Security Personnel', 'CCTV Surveillance', 'Access Control System', 'Emergency Response Team', 'Visitor Management System'] }, blockOrder: 2 }
        ],
        'sports': [
          { blockId: 'sports-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Sports Facilities', subtitle: 'Play, Compete, Excel' }, blockOrder: 0 },
          { blockId: 'sports-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'Our campus offers excellent sports facilities including cricket, football, basketball, volleyball, badminton, and indoor games to promote physical fitness and team spirit.' }, blockOrder: 1 },
          { blockId: 'sports-list', sectionName: 'facilities', blockType: 'list', blockLabel: 'Available Sports',
            content: { items: ['Cricket Ground', 'Football Field', 'Basketball Court', 'Volleyball Court', 'Badminton Courts', 'Table Tennis', 'Chess & Carrom'] }, blockOrder: 2 }
        ],
        'bank-atm': [
          { blockId: 'bank-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Bank & ATM', subtitle: 'Banking Services on Campus' }, blockOrder: 0 },
          { blockId: 'bank-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'Campus banking facilities with ATM services are available for the convenience of students and staff.' }, blockOrder: 1 },
          { blockId: 'bank-services', sectionName: 'services', blockType: 'list', blockLabel: 'Services',
            content: { items: ['24/7 ATM Access', 'Account Opening Assistance', 'Student Banking Services'] }, blockOrder: 2 }
        ],
        'campus-network': [
          { blockId: 'network-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'IIIT Kottayam Campus Network', subtitle: 'High-Speed Connectivity' }, blockOrder: 0 },
          { blockId: 'network-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The campus is equipped with state-of-the-art networking infrastructure providing high-speed internet connectivity across all facilities including academic buildings, hostels, and common areas.' }, blockOrder: 1 },
          { blockId: 'network-features', sectionName: 'features', blockType: 'list', blockLabel: 'Features',
            content: { items: ['5 Gbps Primary Bandwidth', 'Wi-Fi Coverage Across Campus', '250+ Access Points', '2,800+ Connected Users', 'IP Telephony System'] }, blockOrder: 2 }
        ],
        'gymnasium': [
          { blockId: 'gymnasium-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Gymnasium', subtitle: 'Fitness & Wellness Center' }, blockOrder: 0 },
          { blockId: 'gymnasium-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'Our well-equipped gymnasium provides modern fitness equipment and facilities for students and staff to maintain physical health and wellness.' }, blockOrder: 1 },
          { blockId: 'gymnasium-equipment', sectionName: 'equipment', blockType: 'list', blockLabel: 'Equipment',
            content: { items: ['Treadmills', 'Exercise Bikes', 'Weight Training Equipment', 'Dumbbells & Barbells', 'Yoga Mats', 'Cross Trainers'] }, blockOrder: 2 }
        ],
        // IIC & Clubs Pages
        'technical-club': [
          { blockId: 'tech-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Technical Club', subtitle: 'Innovation Through Technology' }, blockOrder: 0 },
          { blockId: 'tech-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The Technical Club organizes coding competitions, hackathons, workshops, and technical events to enhance students\' technical skills and promote innovation.' }, blockOrder: 1 },
          { blockId: 'tech-activities', sectionName: 'activities', blockType: 'list', blockLabel: 'Activities',
            content: { items: ['Coding Competitions', 'Hackathons', 'Technical Workshops', 'Project Exhibitions', 'Guest Lectures', 'Tech Talks'] }, blockOrder: 2 }
        ],
        'sports-club': [
          { blockId: 'sports-club-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Sports Club', subtitle: 'Champions in Making' }, blockOrder: 0 },
          { blockId: 'sports-club-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The Sports Club promotes physical fitness and sportsmanship by organizing inter-college tournaments, training sessions, and sports events.' }, blockOrder: 1 },
          { blockId: 'sports-club-events', sectionName: 'events', blockType: 'list', blockLabel: 'Events',
            content: { items: ['Annual Sports Meet', 'Inter-College Tournaments', 'Intra-College Competitions', 'Fitness Workshops', 'Yoga Sessions'] }, blockOrder: 2 }
        ],
        'fdp-webinars': [
          { blockId: 'fdp-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'FDP & Webinars', subtitle: 'Continuous Learning & Development' }, blockOrder: 0 },
          { blockId: 'fdp-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'IIIT Kottayam regularly organizes Faculty Development Programs and webinars on emerging technologies and pedagogical innovations.' }, blockOrder: 1 }
        ],
        'trendles-club': [
          { blockId: 'trendles-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Trendles Club', subtitle: 'Entrepreneurship & Innovation' }, blockOrder: 0 },
          { blockId: 'trendles-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'Trendles Club fosters entrepreneurial spirit among students through mentorship, startup guidance, and innovation challenges.' }, blockOrder: 1 }
        ],
        'cyber-security-club': [
          { blockId: 'cyber-club-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Cyber Security Club', subtitle: 'Securing the Digital Future' }, blockOrder: 0 },
          { blockId: 'cyber-club-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The Cyber Security Club conducts workshops on ethical hacking, capture-the-flag competitions, and security awareness programs.' }, blockOrder: 1 },
          { blockId: 'cyber-club-activities', sectionName: 'activities', blockType: 'list', blockLabel: 'Activities',
            content: { items: ['CTF Competitions', 'Ethical Hacking Workshops', 'Security Awareness Programs', 'Bug Bounty Events'] }, blockOrder: 2 }
        ],
        'mind-quest': [
          { blockId: 'mindquest-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'Mind Quest', subtitle: 'Exploring Knowledge & Creativity' }, blockOrder: 0 },
          { blockId: 'mindquest-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'Mind Quest organizes quizzes, debates, and intellectual competitions to enhance critical thinking and general knowledge.' }, blockOrder: 1 }
        ],
        'ieee-student-branch': [
          { blockId: 'ieee-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'IEEE Student Branch', subtitle: 'Connecting Technology Enthusiasts' }, blockOrder: 0 },
          { blockId: 'ieee-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The IEEE Student Branch provides networking opportunities, technical workshops, and access to global IEEE resources and conferences.' }, blockOrder: 1 }
        ],
        'acm': [
          { blockId: 'acm-hero', sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero',
            content: { title: 'ACM Student Chapter', subtitle: 'Advancing Computing as a Science' }, blockOrder: 0 },
          { blockId: 'acm-about', sectionName: 'about', blockType: 'paragraph', blockLabel: 'About',
            content: { text: 'The ACM Student Chapter organizes programming contests, research paper presentations, and provides access to ACM digital library and resources.' }, blockOrder: 1 }
        ]
      };

      // Get template for selected page or create generic content
      const blocksTemplate = pageContentTemplates[selectedPage] || [
        { blockId: `${selectedPage}-hero`, sectionName: 'hero', blockType: 'hero', blockLabel: 'Hero Section',
          content: { title: selectedPage.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), subtitle: 'Welcome' }, blockOrder: 0 },
        { blockId: `${selectedPage}-content`, sectionName: 'main', blockType: 'paragraph', blockLabel: 'Main Content',
          content: { text: 'Add your content here.' }, blockOrder: 1 }
      ];

      // Create blocks
      let successCount = 0;
      let failCount = 0;
      const errors = [];
      
      for (const template of blocksTemplate) {
        try {
          const block = {
            ...template,
            pageName: selectedPage,
            isVisible: true
          };
          const response = await API.post('/api/content-blocks', block);
          
          if (response.success) {
            successCount++;
            console.log(`✅ Created block: ${template.blockId}`);
          } else {
            failCount++;
            const errorMsg = response.error || 'Unknown error';
            errors.push(`${template.blockId}: ${errorMsg}`);
            console.error(`❌ Failed to create block ${template.blockId}:`, errorMsg);
          }
        } catch (createError) {
          failCount++;
          const errorMsg = createError.message || 'Unknown error';
          errors.push(`${template.blockId}: ${errorMsg}`);
          console.error(`❌ Exception creating block ${template.blockId}:`, createError);
        }
      }

      if (successCount > 0) {
        alert(`✅ Content import completed!\n\n✓ ${successCount} blocks created successfully\n${failCount > 0 ? `✗ ${failCount} blocks failed\n\nErrors:\n${errors.slice(0, 3).join('\n')}${errors.length > 3 ? '\n...' : ''}` : ''}\n\nYou can now edit these blocks in the admin panel.`);
        fetchBlocks();
      } else {
        alert(`❌ Content import failed!\n\nNo blocks were created successfully.\n\nErrors:\n${errors.slice(0, 5).join('\n')}\n\nPlease check:\n1. You are logged in\n2. Backend server is running\n3. Database connection is working`);
      }
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
              <label className="block text-sm font-medium mb-1">Badge Text</label>
              <input
                type="text"
                value={content.badge || ''}
                onChange={(e) => updateContent('badge', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Established 2015 • Institution of National Importance"
              />
              <p className="text-xs text-gray-500 mt-1">Small badge that appears above the title</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Why IIIT Kottayam"
              />
              <p className="text-xs text-gray-500 mt-1">First word will be normal, rest will be in green gradient</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Pioneering excellence in Information Technology education and research"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                value={content.description || ''}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                rows="3"
                placeholder="Additional description text (optional)"
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
              label="Background Image (Optional)"
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
                placeholder="🎯 or 🗄️"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Badge Text (optional)</label>
              <input
                type="text"
                value={content.badge || ''}
                onChange={(e) => updateContent('badge', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Institute Archives"
              />
              <p className="text-xs text-gray-500 mt-1">Shows as a badge above the title</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Annual Reports or Core Documents"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Items with Links</label>
              <p className="text-xs text-gray-500 mb-2">
                Format: <code className="bg-gray-100 px-1 rounded">Text|URL</code> or <code className="bg-gray-100 px-1 rounded">ICON Text|URL</code>
                <br/>Examples: 
                <br/>• <code className="bg-gray-100 px-1 rounded">Annual Report 2015-16|https://example.com/report.pdf</code>
                <br/>• <code className="bg-gray-100 px-1 rounded">SCALES IIIT PPP Act|https://example.com/act.pdf</code>
              </p>
              {(content.items || []).map((item, index) => {
                const [itemText, itemUrl] = typeof item === 'string' && item.includes('|') ? item.split('|') : [item, ''];
                return (
                  <div key={index} className="mb-3 p-3 border rounded-lg bg-gray-50">
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={itemText}
                        onChange={(e) => {
                          const newValue = itemUrl ? `${e.target.value}|${itemUrl}` : e.target.value;
                          updateArrayContent('items', index, newValue);
                        }}
                        className="flex-1 px-3 py-2 border rounded-lg bg-white"
                        placeholder={`Item ${index + 1} text (e.g., Annual Report 2015-16 or SCALES IIIT PPP Act)`}
                      />
                      <button
                        onClick={() => removeArrayItem('items', index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-xs text-gray-600 shrink-0">🔗 Link:</span>
                      <input
                        type="text"
                        value={itemUrl}
                        onChange={(e) => {
                          const newValue = e.target.value ? `${itemText}|${e.target.value}` : itemText;
                          updateArrayContent('items', index, newValue);
                        }}
                        className="flex-1 px-3 py-2 text-sm border rounded-lg bg-white"
                        placeholder="https://example.com/file.pdf (optional)"
                      />
                    </div>
                  </div>
                );
              })}
              <button
                onClick={() => addArrayItem('items')}
                className="w-full px-3 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50 text-gray-600"
              >
                + Add Item
              </button>
            </div>
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

      case 'button':
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

      case 'table':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                value={content.title || ''}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Fee Structure"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (optional)</label>
              <input
                type="text"
                value={content.subtitle || ''}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Initial First Semester Payment"
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty for full-width table layout</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Table Headers (comma separated)</label>
              <input
                type="text"
                value={(content.headers || []).join(', ')}
                onChange={(e) => updateContent('headers', e.target.value.split(',').map(h => h.trim()))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Fee Component, Amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Table Rows</label>
              {(content.rows || []).map((row, rowIndex) => (
                <div key={rowIndex} className="border rounded-lg p-3 mb-3 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Row {rowIndex + 1}</span>
                    <button
                      onClick={() => {
                        const newRows = [...(content.rows || [])];
                        newRows.splice(rowIndex, 1);
                        updateContent('rows', newRows);
                      }}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={row.join(', ')}
                    onChange={(e) => {
                      const newRows = [...(content.rows || [])];
                      newRows[rowIndex] = e.target.value.split(',').map(cell => cell.trim());
                      updateContent('rows', newRows);
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                    placeholder="Cell 1, Cell 2, Cell 3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate cells with commas. Number of cells should match headers.</p>
                </div>
              ))}
              <button
                onClick={() => {
                  const headerCount = (content.headers || []).length || 2;
                  const newRow = Array(headerCount).fill('');
                  updateContent('rows', [...(content.rows || []), newRow]);
                }}
                className="w-full px-3 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50 text-gray-600"
              >
                + Add Row
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Notes (optional)</label>
              <p className="text-xs text-gray-500 mb-2">Add notes below the table. Use "Text|URL" format for links.</p>
              {(content.notes || []).map((note, noteIndex) => (
                <div key={noteIndex} className="border rounded-lg p-3 mb-3 bg-gray-50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium">Note {noteIndex + 1}</span>
                    <button
                      onClick={() => {
                        const newNotes = [...(content.notes || [])];
                        newNotes.splice(noteIndex, 1);
                        updateContent('notes', newNotes);
                      }}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded ml-auto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    value={note}
                    onChange={(e) => {
                      const newNotes = [...(content.notes || [])];
                      newNotes[noteIndex] = e.target.value;
                      updateContent('notes', newNotes);
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                    rows="2"
                    placeholder="Mode of reporting at the institute: Offline"
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  updateContent('notes', [...(content.notes || []), '']);
                }}
                className="w-full px-3 py-2 border-2 border-dashed rounded-lg hover:bg-gray-50 text-gray-600"
              >
                + Add Note
              </button>
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
              style={{ maxHeight: '400px' }}
            >
              <optgroup label="📚 Institute & General">
                <option value="homepage">Homepage</option>
                <option value="why-iiitk">Why IIIT Kottayam</option>
                <option value="about">About</option>
                <option value="admissions">Admissions</option>
                <option value="academics">Academics</option>
                <option value="research-groups">Research Groups</option>
                <option value="placements">Placements</option>
                <option value="nirf">NIRF</option>
                <option value="governance">Governance</option>
                <option value="scholarships">Scholarships</option>
              </optgroup>
              
              <optgroup label="🎓 Courses">
                <option value="btech-cse">B.Tech CSE</option>
                <option value="btech-ece">B.Tech ECE</option>
                <option value="btech-cybersecurity">B.Tech Cybersecurity</option>
                <option value="btech-ai-ds">B.Tech AI & Data Science</option>
              </optgroup>
              
              <optgroup label="🏢 Facilities">
                <option value="hostel">Hostel</option>
                <option value="gym">Gymnasium</option>
                <option value="internet">Internet</option>
                <option value="campus-network">Campus Network</option>
                <option value="medical-centre">Medical Centre</option>
                <option value="student-mess">Student Mess</option>
                <option value="security">Security</option>
                <option value="sports">Sports</option>
                <option value="bank-atm">Bank/ATM</option>
              </optgroup>
              
              <optgroup label="🎯 IIC & Clubs">
                <option value="innovation-cell">Innovation Cell</option>
                <option value="cultural-club">Cultural Club</option>
                <option value="technical-club">Technical Club</option>
                <option value="sports-club">Sports Club</option>
                <option value="fdp-webinars">FDP & Webinars</option>
                <option value="trendles-club">Trendles Club</option>
                <option value="cyber-security-club">Cyber Security Club</option>
                <option value="mind-quest">Mind Quest</option>
                <option value="ieee-student-branch">IEEE Student Branch</option>
                <option value="acm">ACM Student Chapter</option>
              </optgroup>
              
              <optgroup label="📷 Others">
                <option value="gallery">Gallery</option>
                <option value="campus-life">Campus Life</option>
                <option value="contact">Contact</option>
              </optgroup>
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

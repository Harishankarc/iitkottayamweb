import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Zap, Heading2, Type, Image, ImagePlus, List, Layers, Table, BarChart3, Pointer, Eye, EyeOff, Eraser } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import API from '../../api/api';
import ImageUploader from '../components/ImageUploader';
import RichEditor from '../components/RichEditor';

const BLOCK_TYPE_ICONS = {
  hero: Zap,
  heading: Heading2,
  paragraph: Type,
  image: Image,
  gallery: ImagePlus,
  list: List,
  card: Layers,
  table: Table,
  statistics: BarChart3,
  button: Pointer
};
const FACULTY_DETAIL_BLOCK_TYPES = [
  { value: 'heading', label: 'Heading', icon: 'heading' },
  { value: 'paragraph', label: 'Paragraph', icon: 'paragraph' },
  { value: 'image', label: 'Single Image', icon: 'image' },
  { value: 'gallery', label: 'Image Gallery', icon: 'gallery' },
  { value: 'table', label: 'Table', icon: 'table' },
  { value: 'statistics', label: 'Statistics', icon: 'statistics' }
];
const MAIN_SECTION_MAX_LINES = 7;
const MAIN_SECTION_MAX_LINE_LENGTH = 42;

const escapeHtml = (value) => String(value || '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const resolveMediaUrl = (value) => {
  const rawValue = String(value || '').trim();
  if (!rawValue) return '';
  if (rawValue.startsWith('http://') || rawValue.startsWith('https://') || rawValue.startsWith('data:')) {
    return rawValue;
  }
  return API.getImageUrl(rawValue) || rawValue;
};

const createDefaultDetailBuilderContent = (blockType) => {
  switch (blockType) {
    case 'heading': return { icon: '📝', text: '', level: 2, position: 'left' };
    case 'paragraph': return { text: '' };
    case 'image': return { title: '', url: '', alt: '', caption: '' };
    case 'gallery': return { title: '', images: [''] };
    case 'table': return { title: '', subtitle: '', headers: [''], rows: [['']] };
    case 'statistics': return { title: '', stats: [{ value: '', label: '' }] };
    default: return {};
  }
};

const parseDetailBlocksFromHtml = (htmlString) => {
  if (!htmlString || typeof htmlString !== 'string') return [];
  const blocks = [];
  const sectionRegex = /<section[^>]*>([\s\S]*?)<\/section>/gi;
  let match;
  while ((match = sectionRegex.exec(htmlString)) !== null) {
    const content = match[1];
    let block = null;
    if (content.includes('<h1 ') || content.includes('<h2 ') || content.includes('<h3 ') || content.includes('<h4 ') || content.includes('<h5 ') || content.includes('<h6 ')) {
      const headingMatch = content.match(/<h([1-6])[^>]*style="[^"]*font-size:([^";]+)[^"]*"[^>]*>([\s\S]*?)<\/h\1>/i) || content.match(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/i);
      if (headingMatch) {
        const level = Number(headingMatch[1] || 2);
        const headingText = headingMatch[3] || headingMatch[2] || '';
        const iconMatch = headingText.match(/^([^<]+?)\s+(<.*)$/s);
        const positionMatch = content.match(/text-align:([^;]+)/i);
        const position = positionMatch ? positionMatch[1].trim() : 'left';
        block = {
          blockType: 'heading',
          content: {
            icon: iconMatch ? iconMatch[1].trim() : '',
            text: iconMatch ? iconMatch[2] : headingText,
            level,
            position
          },
          rawHtml: match[0]
        };
      }
    } else if (content.includes('<div') && content.includes('line-height:1.75')) {
      // New simple paragraph format
      const htmlMatch = content.match(/<div[^>]*>([\s\S]*)<\/div>/i);
      block = {
        blockType: 'paragraph',
        content: {
          text: htmlMatch ? htmlMatch[1].trim() : content.replace(/<[^>]+>/g, '').trim()
        },
        rawHtml: match[0]
      };
    } else if (content.includes('<p') && content.includes('line-height:1.75') && content.includes('color:#374151')) {
      const htmlMatch = content.match(/<p[^>]*style="[^"]*line-height:1.75[^"]*color:#374151[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
      block = {
        blockType: 'paragraph',
        content: {
          text: htmlMatch ? htmlMatch[1] : ''
        },
        rawHtml: match[0]
      };
    } else if (content.includes('border:1px solid #e5e7eb') && content.includes('line-height:1.75') && content.includes('color:#374151')) {
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const iconMatch = content.match(/<div[^>]*style="[^"]*font-size:18px[^\"]*"[^>]*>([\s\S]*?)<\/div>/i);
      const linkMatch = content.match(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/i);
      const textMatch = content.match(/<div[^>]*style="margin:0;line-height:1.75;color:#374151;"[^>]*>([\s\S]*?)<\/div>/i);
      block = {
        blockType: 'paragraph',
        content: {
          icon: iconMatch ? iconMatch[1].replace(/<[^>]+>/g, '').trim() : '',
          title: titleMatch ? titleMatch[1] : '',
          text: textMatch ? textMatch[1] : '',
          linkText: linkMatch ? linkMatch[2] : '',
          link: linkMatch ? linkMatch[1] : ''
        },
        rawHtml: match[0]
      };
    } else if (content.includes('<table')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const headers = [...content.matchAll(/<th[^>]*>(.+?)<\/th>/gi)].map(m => m[1]);
      const rows = [...content.matchAll(/<tr>(.+?)<\/tr>/gi)].map(rowMatch => [...rowMatch[1].matchAll(/<td[^>]*>(.+?)<\/td>/gi)].map(m => m[1]));
      block = { blockType: 'table', content: { title: titleMatch ? titleMatch[1] : '', subtitle: '', headers: headers.length > 0 ? headers : [''], rows: rows.length > 0 ? rows : [['']] }, rawHtml: match[0] };
    } else if (content.includes('<img') && content.includes('max-width:100%')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const imgMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/i);
      const captionMatch = content.match(/<p[^>]*color:#6b7280[^>]*>(.+?)<\/p>/i);
      block = { blockType: 'image', content: { title: titleMatch ? titleMatch[1] : '', url: imgMatch ? imgMatch[1] : '', alt: imgMatch ? imgMatch[2] : '', caption: captionMatch ? captionMatch[1] : '' }, rawHtml: match[0] };
    } else if (content.includes('grid-template-columns:repeat(auto-fit,minmax(160px,1fr))')) {
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const images = [...content.matchAll(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi)].map((m) => m[1]);
      block = { blockType: 'gallery', content: { title: titleMatch ? titleMatch[1] : '', images: images.length > 0 ? images : [''] }, rawHtml: match[0] };
    } else if (content.includes('grid-template-columns:repeat(auto-fit,minmax(160px,1fr))') || content.includes('background:#f8fffb')) {
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const stats = [...content.matchAll(/<div style="font-size:24px;font-weight:800;color:#239244;">([\s\S]*?)<\/div>\s*<div style="font-size:13px;color:#6b7280;">([\s\S]*?)<\/div>/gi)]
        .map((m) => ({ value: m[1], label: m[2] }));
      block = { blockType: 'statistics', content: { title: titleMatch ? titleMatch[1] : '', stats: stats.length > 0 ? stats : [{ value: '', label: '' }] }, rawHtml: match[0] };
    }
    if (block) blocks.push({ ...block, hidden: false });
  }
  return blocks.length > 0 ? blocks : [];
};

const createBlockBuilderState = (blockType = 'heading') => ({
  blockType,
  content: createDefaultDetailBuilderContent(blockType)
});

const formatParagraphText = (text) => {
  if (!text) return '';
  
  // If it's already HTML from RichEditor, just return it
  if (text.includes('<') && text.includes('>')) {
    return text;
  }
  
  // Otherwise, process markdown syntax
  let html = text;
  
  // Check if contains list items
  const lines = html.split('\n');
  const hasListItems = lines.some(line => line.trim().startsWith('- '));
  
  if (hasListItems) {
    // Group lines into paragraphs and lists
    let result = '';
    let listItems = [];
    
    lines.forEach(line => {
      if (line.trim().startsWith('- ')) {
        listItems.push(line.replace(/^-\s*/, ''));
      } else if (line.trim()) {
        if (listItems.length > 0) {
          // Apply formatting to list items first
          const formattedItems = listItems.map(item => {
            let formatted = item;
            formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>');
            formatted = formatted.replace(/\*([^\*]+)\*/g, '<i>$1</i>');
            formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#239244;font-weight:700;text-decoration:none;">$1</a>');
            return formatted;
          });
          result += `<ul style="margin:12px 0;padding-left:20px;"><li style="margin:6px 0;color:#374151;">${formattedItems.join('</li><li style="margin:6px 0;color:#374151;">')}</li></ul>`;
          listItems = [];
        }
        // Apply formatting to paragraph
        let formatted = line;
        formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>');
        formatted = formatted.replace(/\*([^\*]+)\*/g, '<i>$1</i>');
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#239244;font-weight:700;text-decoration:none;">$1</a>');
        result += `<p style="margin:8px 0;line-height:1.75;color:#374151;">${formatted}</p>`;
      }
    });
    
    if (listItems.length > 0) {
      // Apply formatting to list items
      const formattedItems = listItems.map(item => {
        let formatted = item;
        formatted = formatted.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>');
        formatted = formatted.replace(/\*([^\*]+)\*/g, '<i>$1</i>');
        formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#239244;font-weight:700;text-decoration:none;">$1</a>');
        return formatted;
      });
      result += `<ul style="margin:12px 0;padding-left:20px;"><li style="margin:6px 0;color:#374151;">${formattedItems.join('</li><li style="margin:6px 0;color:#374151;">')}</li></ul>`;
    }
    
    html = result || html;
  } else {
    // No list items, just apply formatting
    html = html.replace(/\*\*([^\*]+)\*\*/g, '<b>$1</b>'); // Bold
    html = html.replace(/\*([^\*]+)\*/g, '<i>$1</i>'); // Italic
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#239244;font-weight:700;text-decoration:none;">$1</a>'); // Links
    // Wrap in paragraph if not already wrapped
    if (!html.startsWith('<')) {
      html = `<p style="margin:0;line-height:1.75;color:#374151;">${html}</p>`;
    }
  }
  
  return html;
};

const buildDetailBlockHtml = (blockType, content) => {
  const heroBackgroundImage = resolveMediaUrl(content?.backgroundImage);
  const imageUrl = resolveMediaUrl(content?.url);
  const buttonLink = String(content?.link || '').trim() || '#';
  const buttonLabel = String(content?.buttonText || '').trim() || 'Learn More';
  const richText = (value) => String(value || '').trim();

  switch (blockType) {
    case 'heading':
      return `<section style="margin:18px 0;"><h${content.level || 2} style="margin:0;font-size:${content.level === 1 ? '32px' : content.level === 3 ? '24px' : '28px'};font-weight:800;color:#111827;text-align:${content.position || 'left'};">${content.icon ? `${escapeHtml(content.icon)} ` : ''}${richText(content.text)}</h${content.level || 2}></section>`;
    case 'paragraph':
      return `<section style="margin:18px 0;"><div style="line-height:1.75;">${formatParagraphText(content.text)}</div></section>`;
    case 'image':
      return `<section style="margin:18px 0;text-align:center;">${content.title ? `<h3 style="margin:0 0 10px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(content.alt || content.title || 'Faculty image')}" style="max-width:100%;width:100%;max-height:500px;aspect-ratio:1/1;object-fit:cover;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.08);display:inline-block;" />` : ''}${content.caption ? `<p style="margin:10px 0 0;color:#6b7280;font-size:13px;">${escapeHtml(content.caption)}</p>` : ''}</section>`;
    case 'gallery':
      return `<section style="margin:18px 0;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${richText(content.title || '')}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">${(content.images || []).filter(Boolean).map((itemUrl) => `<img src="${escapeHtml(resolveMediaUrl(itemUrl))}" alt="Gallery image" style="width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;border-radius:12px;display:block;" />`).join('')}</div></section>`;
      return `<section style="margin:18px 0;overflow:auto;">${content.title ? `<h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${content.subtitle ? `<p style="margin:0 0 12px 0;color:#6b7280;">${escapeHtml(content.subtitle)}</p>` : ''}<table style="width:100%;border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;"><thead><tr>${(content.headers || []).filter(Boolean).map((header) => `<th style="background:#ecfdf5;border:1px solid #d1d5db;padding:10px 12px;text-align:left;color:#111827;">${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${(content.rows || []).map((row) => `<tr>${(row || []).map((cell) => `<td style="border:1px solid #d1d5db;padding:10px 12px;color:#374151;">${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
    case 'statistics':
      return `<section style="margin:18px 0;padding:18px;border:1px solid #d1fae5;border-radius:16px;background:#f8fffb;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${richText(content.title || '')}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">${(content.stats || []).filter(Boolean).map((stat) => `<div style="padding:14px;border-radius:12px;background:#fff;border:1px solid #d1d5db;"><div style="font-size:24px;font-weight:800;color:#239244;">${escapeHtml(stat.value)}</div><div style="font-size:13px;color:#6b7280;">${escapeHtml(stat.label)}</div></div>`).join('')}</div></section>`;
    default:
      return '';
  }
};

const normalizeEmail = (value) => {
  if (typeof value !== 'string') return value;
  return value.trim().replace(/\s*(?:\(|\[)?at(?:\)|\])?\s*/gi, '@').replace(/\s*(?:\(|\[)?dot(?:\)|\])?\s*/gi, '.').replace(/\s+/g, '').toLowerCase();
};

const textToList = (value) => {
  if (!value || typeof value !== 'string') return [];
  const trimmed = value.trim();
  if (!trimmed) return [];
  const normalized = trimmed.replace(/\\/g, '\n');
  if (normalized.includes('\n')) return normalized.split('\n').map((item) => item.trim()).filter(Boolean);
  return trimmed.split(',').map((item) => item.trim()).filter(Boolean);
};

const normalizeMainSection = (value) => {
  if (typeof value !== 'string') return '';
  const normalized = value.replace(/\r\n/g, '\n').replace(/\\/g, '\n');
  const lines = normalized.split('\n').slice(0, MAIN_SECTION_MAX_LINES).map((line) => line.slice(0, MAIN_SECTION_MAX_LINE_LENGTH));
  return lines.join('\n');
};

const toDetailArray = (value) => {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      // ignore
    }
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  return [];
};

export default function ManageFaculty() {
  const location = useLocation();
  const editFacultyIdFromState = location.state?.editFacultyId;
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [detailBuilder, setDetailBuilder] = useState(createBlockBuilderState('heading'));
  const [detailBlocks, setDetailBlocks] = useState([]);
  const [editingBlockIndex, setEditingBlockIndex] = useState(null);
  const [activeEditorStep, setActiveEditorStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', designation: '', department: 'General', email: '', phone: '', photo: '', qualification: '', specialization: '', experience: '', researchInterests: '', publications: '', googleScholar: '', linkedIn: '', researchGate: '', mainSection: '', fullDetails: '', fullDetailsHtml: '', useHtmlEditor: false, isActive: true });
  const paragraphEditorRef = React.useRef(null);

  const editorSteps = [
    { step: 1, label: 'Profile Details', description: 'Identity and image' },
    { step: 2, label: 'Main Details', description: 'Summary and links' },
    { step: 3, label: 'Full Details', description: 'Block-based content' }
  ];

  useEffect(() => { fetchFaculty(); }, []);

  useEffect(() => {
    if (editFacultyIdFromState && faculty.length > 0) {
      const facultyToEdit = faculty.find(f => f.id == editFacultyIdFromState);
      if (facultyToEdit) openEditModal(facultyToEdit);
    }
  }, [editFacultyIdFromState, faculty]);

  const fetchFaculty = async () => {
    try {
      setFetchError('');
      const token = localStorage.getItem('token');
      const response = await fetch(`${API.baseURL}/api/faculty`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || 'Failed to load faculty data');
      const data = await response.json();
      setFaculty(data.data || []);
    } catch (error) {
      console.error('Error fetching faculty:', error);
      setFaculty([]);
      setFetchError(error.message || 'Unable to load faculty data. Check backend server.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', designation: '', department: 'General', email: '', phone: '', photo: '', qualification: '', specialization: '', experience: '', researchInterests: '', publications: '', googleScholar: '', linkedIn: '', researchGate: '', mainSection: '', fullDetails: '', fullDetailsHtml: '', useHtmlEditor: false, isActive: true });
    setDetailBuilder(createBlockBuilderState('heading'));
    setDetailBlocks([]);
    setEditingBlockIndex(null);
    setEditingItem(null);
    setActiveEditorStep(1);
  };

  const openEditModal = (item) => {
    const resolvedFullDetails = Array.isArray(item.fullDetails) ? item.fullDetails : toDetailArray(item.fullDetails || '');
    const fallbackFullDetails = Array.isArray(item.rightSideDetails) ? item.rightSideDetails : toDetailArray(item.rightSideDetails || '');
    const parsedBlocks = item.fullDetailsHtml ? parseDetailBlocksFromHtml(item.fullDetailsHtml) : [];
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      designation: item.designation || '',
      department: item.department || 'General',
      email: item.email || '',
      phone: item.phone || '',
      photo: item.photo || '',
      qualification: item.qualification || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      researchInterests: Array.isArray(item.researchInterests) ? item.researchInterests.join(', ') : (item.researchInterests || ''),
      publications: Array.isArray(item.publications) ? item.publications.join(', ') : (item.publications || ''),
      googleScholar: item.googleScholar || '',
      linkedIn: item.linkedIn || '',
      researchGate: item.researchGate || '',
      mainSection: normalizeMainSection(item.mainSection || ''),
      fullDetails: (resolvedFullDetails.length > 0 ? resolvedFullDetails : fallbackFullDetails).join('\n'),
      fullDetailsHtml: item.fullDetailsHtml || '',
      useHtmlEditor: parsedBlocks.length > 0,
      isActive: item.isActive !== false
    });
    setDetailBlocks(parsedBlocks.length > 0 ? parsedBlocks : []);
    setDetailBuilder(createBlockBuilderState('heading'));
    setEditingBlockIndex(null);
    setActiveEditorStep(item.fullDetailsHtml ? 3 : 1);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem ? `${API.baseURL}/api/faculty/${editingItem.id}` : `${API.baseURL}/api/faculty`;
      const visibleBlocks = detailBlocks.filter((block) => !block.hidden);
      const fullDetailsHtmlToSave = formData.useHtmlEditor
        ? (visibleBlocks.length > 0 ? visibleBlocks.map((block) => block.rawHtml || buildDetailBlockHtml(block.blockType, block.content)).join('') : (formData.fullDetailsHtml || ''))
        : (formData.fullDetailsHtml || '');
      // Merge with existing item values when editing to avoid accidental data loss
      const payload = {
        name: (formData.name || (editingItem && editingItem.name)) || '',
        designation: (formData.designation || (editingItem && editingItem.designation)) || '',
        department: (formData.department?.trim() || (editingItem && editingItem.department) || 'General'),
        email: (() => {
          const normalizedEmail = normalizeEmail((formData.email || (editingItem && editingItem.email)) || '');
          return normalizedEmail && normalizedEmail.trim() ? normalizedEmail : null;
        })(),
        phone: (formData.phone?.trim() || (editingItem && editingItem.phone)) || '',
        photo: (formData.photo || (editingItem && editingItem.photo)) || '',
        mainSection: normalizeMainSection(formData.mainSection || (editingItem && editingItem.mainSection) || '').trim(),
        fullDetails: (textToList(formData.fullDetails).length > 0 ? textToList(formData.fullDetails) : (editingItem && (Array.isArray(editingItem.fullDetails) ? editingItem.fullDetails : toDetailArray(editingItem.fullDetails))) || []),
        fullDetailsHtml: (fullDetailsHtmlToSave && fullDetailsHtmlToSave.length > 0) ? fullDetailsHtmlToSave : ((editingItem && editingItem.fullDetailsHtml) || ''),
        isActive: !!formData.isActive
      };
      console.log('ManageFaculty payload preview:', { id: editingItem?.id, name: payload.name, fullDetailsHtmlLength: (payload.fullDetailsHtml || '').length, fullDetailsCount: (payload.fullDetails || []).length });
      console.log('ManageFaculty saving fullDetailsHtml (first 500 chars):', (fullDetailsHtmlToSave || '').slice(0, 500));
      const response = await fetch(url, {
        method: editingItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error((await response.json().catch(() => ({}))).message || 'Failed to save faculty details');
      await fetchFaculty();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving faculty:', error);
      alert(error.message || 'Unable to save faculty details');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this faculty member?')) return;
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API.baseURL}/api/faculty/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      fetchFaculty();
    } catch (error) {
      console.error('Error deleting faculty:', error);
    }
  };

  const updateDetailBuilderType = (blockType) => setDetailBuilder(createBlockBuilderState(blockType));
  const updateDetailBuilderContent = (field, value) => setDetailBuilder((prev) => ({ ...prev, content: { ...prev.content, [field]: value } }));
  const updateDetailBuilderArray = (field, index, value) => setDetailBuilder((prev) => { const next = Array.isArray(prev.content[field]) ? [...prev.content[field]] : []; next[index] = value; return { ...prev, content: { ...prev.content, [field]: next } }; });
  const addDetailBuilderArrayItem = (field, defaultValue = '') => setDetailBuilder((prev) => { const next = Array.isArray(prev.content[field]) ? [...prev.content[field]] : []; return { ...prev, content: { ...prev.content, [field]: [...next, defaultValue] } }; });
  const removeDetailBuilderArrayItem = (field, index) => setDetailBuilder((prev) => { const next = Array.isArray(prev.content[field]) ? prev.content[field].filter((_, i) => i !== index) : []; return { ...prev, content: { ...prev.content, [field]: next } }; });
  const clearCurrentBlockContent = () => setDetailBuilder((prev) => ({ ...prev, content: createDefaultDetailBuilderContent(prev.blockType) }));

  const insertDetailBuilderBlock = () => {
    if (editingBlockIndex !== null) {
      setDetailBlocks((prev) => {
        const next = [...prev];
        next[editingBlockIndex] = { blockType: detailBuilder.blockType, content: detailBuilder.content, rawHtml: buildDetailBlockHtml(detailBuilder.blockType, detailBuilder.content), hidden: next[editingBlockIndex]?.hidden === true };
        return next;
      });
      setEditingBlockIndex(null);
    } else {
      setDetailBlocks((prev) => [...prev, { blockType: detailBuilder.blockType, content: detailBuilder.content, rawHtml: buildDetailBlockHtml(detailBuilder.blockType, detailBuilder.content), hidden: false }]);
    }
    setDetailBuilder(createBlockBuilderState(detailBuilder.blockType));
  };

  const deleteBlock = (index) => {
    setDetailBlocks((prev) => prev.filter((_, i) => i !== index));
    setEditingBlockIndex(null);
  };

  const editBlock = (index) => {
    const block = detailBlocks[index];
    if (block) {
      setDetailBuilder({ blockType: block.blockType, content: block.content || createDefaultDetailBuilderContent(block.blockType) });
      setEditingBlockIndex(index);
    }
  };

  const toggleBlockVisibility = (index) => {
    setDetailBlocks((prev) => prev.map((block, i) => (i === index ? { ...block, hidden: !block.hidden } : block)));
  };

  const renderEditorStepContent = () => {
    if (activeEditorStep === 1) {
      return (
        <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6 min-h-0">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Profile Details</h4>
              <p className="text-xs text-slate-500">Basic identity and contact information</p>
            </div>
            <div className="space-y-4">
              <div><label htmlFor="faculty-name" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Name *</label><input id="faculty-name" type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" /></div>
              <div><label htmlFor="faculty-designation" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Designation *</label><input id="faculty-designation" type="text" required value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" /></div>
              <div><label htmlFor="faculty-department" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Department *</label><input id="faculty-department" type="text" required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" /></div>
              <div className="grid grid-cols-1 gap-4"><div><label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Email</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="faculty@example.com" /></div><div><label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Phone Number</label><input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="+91 9876543210" /></div></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-emerald-900 p-4 text-white shadow-lg">
              <div className="text-xs uppercase tracking-[0.2em] text-emerald-200">Profile Preview</div>
              <div className="mt-4 flex items-center gap-4">
                <div className="h-20 w-20 rounded-2xl overflow-hidden border-2 border-white/30 bg-white/10 flex-shrink-0">
                  <img src={formData.photo ? API.getImageUrl(formData.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'Faculty')}&size=200&background=239244&color=ffffff&bold=true`} alt={formData.name || 'Faculty preview'} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'Faculty')}&size=200&background=239244&color=ffffff&bold=true`; }} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold leading-tight truncate">{formData.name || 'Faculty Name'}</h3>
                  <p className="text-sm text-emerald-100 truncate">{formData.designation || 'Designation'}</p>
                  <p className="text-xs text-white/80 mt-1 truncate">{formData.department || 'Department'}</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <div className="rounded-xl bg-white/10 px-3 py-2"><div className="text-white/60">Photo</div><div className="font-semibold truncate">{formData.photo ? 'Added' : 'Not set'}</div></div>
                <div className="rounded-xl bg-white/10 px-3 py-2"><div className="text-white/60">Status</div><div className="font-semibold">{formData.isActive ? 'Active' : 'Inactive'}</div></div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Upload Photo</h4>
                  <p className="text-xs text-slate-500">Choose an image and preview it here before saving.</p>
                </div>
              </div>
              <div className="rounded-3xl border border-dashed border-slate-300 bg-gradient-to-br from-white via-slate-50 to-emerald-50 p-4 shadow-inner">
                <ImageUploader
                  value={formData.photo || ''}
                  onChange={(url) => { setFormData({ ...formData, photo: url }); }}
                  label="Upload Photo"
                  folder="faculty"
                  aspectRatio="1/1"
                />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeEditorStep === 2) {
      return (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Main Details</h4>
            <p className="text-xs text-slate-500">Summary information that appears before the full details section.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Qualification</label>
              <input type="text" value={formData.qualification} onChange={(e) => setFormData({ ...formData, qualification: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Ph.D., M.Tech, etc." />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Specialization</label>
              <input type="text" value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Machine Learning, Networks, etc." />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Experience</label>
              <input type="text" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="10+ years" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Google Scholar</label>
              <input type="url" value={formData.googleScholar} onChange={(e) => setFormData({ ...formData, googleScholar: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="https://scholar.google.com/..." />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">LinkedIn</label>
              <input type="url" value={formData.linkedIn} onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">ResearchGate</label>
              <input type="url" value={formData.researchGate} onChange={(e) => setFormData({ ...formData, researchGate: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="https://researchgate.net/..." />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Research Interests</label>
              <textarea rows={4} value={formData.researchInterests} onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white" placeholder="AI, machine learning, data science" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Publications</label>
              <textarea rows={4} value={formData.publications} onChange={(e) => setFormData({ ...formData, publications: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white" placeholder="Paper 1, Paper 2, Paper 3" />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Publish Status</h4>
                <p className="text-xs text-slate-500">Controls whether faculty is visible on the site</p>
              </div>
              <input type="checkbox" id="isActive" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="h-5 w-5 rounded border-slate-300" style={{ accentColor: API.color1 }} />
            </div>
            <label htmlFor="isActive" className="mt-2 inline-block text-sm text-slate-700">Active</label>
          </div>
        </div>
      );
    }

    // Page 3: Full Details (Simplified)
    return (
      <div className="space-y-6">
        <div className="max-w-3xl">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-slate-900">Full Details</h3>
            <p className="text-sm text-slate-500 mt-1">Add a detailed profile description that will appear on the public faculty page</p>
          </div>

          {/* Toggle Advanced Mode */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input 
                type="checkbox" 
                checked={formData.useHtmlEditor} 
                onChange={(e) => setFormData({ ...formData, useHtmlEditor: e.target.checked })}
                className="h-5 w-5 rounded"
              />
              <span className="text-sm font-semibold text-slate-700">Use Advanced Block Editor</span>
              <span className="text-xs text-slate-500 ml-auto">For complex layouts with multiple sections</span>
            </label>
          </div>
        </div>

        {/* Simple Rich Text Editor (Default) */}
        {!formData.useHtmlEditor ? (
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-900 mb-2">Profile Description</label>
                <p className="text-xs text-slate-500">Write about achievements, research, expertise, and other relevant information.</p>
              </div>
              <RichEditor
                value={formData.fullDetailsHtml || ''}
                onChange={(html) => setFormData({ ...formData, fullDetailsHtml: html })}
              />
              <p className="text-xs text-slate-400 mt-3">
                💡 Tip: Use bold, italics, headings, and links to structure your content
              </p>
            </div>
          </div>
        ) : (
          /* Advanced Block Editor - Two Column Layout FULL WIDTH */
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 h-[calc(100vh-480px)] min-h-96">
            {/* LEFT SIDEBAR: Block Type, Options & Block List */}
            <div className="flex flex-col gap-4 min-h-0 overflow-y-auto">
              {/* Block Type Selector */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <label htmlFor="detail-block-type" className="block text-sm font-bold text-slate-900 mb-3">Block Type</label>
                <select 
                  id="detail-block-type" 
                  value={detailBuilder.blockType} 
                  onChange={(e) => updateDetailBuilderType(e.target.value)} 
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {FACULTY_DETAIL_BLOCK_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>

              {/* Heading Size Selector (Only for Heading block type) */}
              {detailBuilder.blockType === 'heading' && (
                <>
                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <label htmlFor="heading-level" className="block text-sm font-bold text-slate-900 mb-3">Heading Size</label>
                    <select 
                      id="heading-level"
                      value={detailBuilder.content.level || 2} 
                      onChange={(e) => updateDetailBuilderContent('level', Number(e.target.value))} 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value={1}>H1 - Extra Large</option>
                      <option value={2}>H2 - Large</option>
                      <option value={3}>H3 - Medium</option>
                      <option value={4}>H4 - Small</option>
                    </select>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                    <label htmlFor="heading-position" className="block text-sm font-bold text-slate-900 mb-3">Position</label>
                    <select 
                      id="heading-position"
                      value={detailBuilder.content.position || 'left'} 
                      onChange={(e) => updateDetailBuilderContent('position', e.target.value)} 
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>
                </>
              )}

              {/* Paragraph Formatting Toolbar (Left column only) */}
              {detailBuilder.blockType === 'paragraph' && (
                <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                  <p className="text-xs font-bold text-slate-900 mb-3">Text Formatting</p>
                  <div className="grid grid-cols-6 gap-2">
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.exec('bold')}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 font-bold"
                      title="Bold"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.exec('italic')}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700 italic"
                      title="Italic"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.exec('underline')}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700"
                      title="Underline"
                    >
                      U
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.insertLink()}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700"
                      title="Link"
                    >
                      Link
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.insertList(false)}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700"
                      title="Unordered List"
                    >
                      UL
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => paragraphEditorRef.current?.insertList(true)}
                      className="p-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-slate-700"
                      title="Ordered List"
                    >
                      OL
                    </button>
                  </div>
                </div>
              )}

              {/* Added Blocks List */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
                <h4 className="text-sm font-bold text-slate-900 mb-3">Blocks ({detailBlocks.length})</h4>
                
                {detailBlocks.length === 0 ? (
                  <div className="text-center py-6 px-2">
                    <p className="text-xs text-slate-500">No blocks yet</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {detailBlocks.map((block, index) => {
                      const blockLabel = FACULTY_DETAIL_BLOCK_TYPES.find((t) => t.value === block.blockType)?.label || block.blockType;
                      const isEditing = editingBlockIndex === index;
                      const isHidden = block.hidden === true;
                      return (
                        <div 
                          key={index} 
                          className={`flex items-center gap-2 p-4 rounded-lg border cursor-pointer transition ${isEditing ? 'bg-blue-100 border-blue-300' : isHidden ? 'bg-slate-50 border-slate-200 opacity-60' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                          onClick={() => editBlock(index)}
                        >
                          <div className="flex-shrink-0 h-6 w-6 rounded bg-slate-300 flex items-center justify-center font-bold text-xs text-slate-700">
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-900 truncate">{blockLabel}</p>
                          </div>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); toggleBlockVisibility(index); }} 
                            className="p-1 hover:bg-slate-200 rounded text-slate-600 flex-shrink-0"
                            title={isHidden ? 'Show' : 'Hide'}
                          >
                            {isHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          </button>
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); deleteBlock(index); }} 
                            className="p-1 hover:bg-red-100 rounded text-red-600 flex-shrink-0"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT AREA: Input Area & Block-Specific Options */}
            <div className="flex flex-col gap-4 min-h-0">
              {/* Main Input/Editing Area */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6 flex-1 overflow-y-auto">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">Block Content</h4>
                  <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded mb-4">
                    <strong>Current:</strong> {FACULTY_DETAIL_BLOCK_TYPES.find(t => t.value === detailBuilder.blockType)?.label}
                  </div>
                </div>
                {renderDetailBuilderFields()}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button 
                  type="button" 
                  onClick={clearCurrentBlockContent} 
                  className="flex-1 px-4 py-2.5 bg-amber-50 text-amber-700 rounded-lg font-semibold hover:bg-amber-100 border border-amber-200"
                >
                  Clear
                </button>
                <button 
                  type="button" 
                  onClick={insertDetailBuilderBlock} 
                  className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700"
                >
                  {editingBlockIndex !== null ? 'Update' : 'Add Block'}
                </button>
                {editingBlockIndex !== null && (
                  <button 
                    type="button" 
                    onClick={() => { setEditingBlockIndex(null); setDetailBuilder(createBlockBuilderState('heading')); }} 
                    className="flex-1 px-4 py-2.5 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    );
  };

  const renderDetailBuilderFields = () => {
    const content = detailBuilder.content || {};

    const fieldLabel = (label) => (
      <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">{label}</label>
    );

    const richField = (label, value, onChange) => (
      <div className="space-y-1">
        {fieldLabel(label)}
        <RichEditor value={value || ''} onChange={onChange} />
      </div>
    );

    const formatGuide = (
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-900">
        <p className="font-semibold mb-1">Available formatting</p>
        <p>Bold, italic, links, H2/H3 headings, paragraph, ordered/unordered lists, table, image, button, and card snippets.</p>
      </div>
    );

    switch (detailBuilder.blockType) {
      case 'heading':
        return (
          <div className="space-y-4">
            <div>
              {fieldLabel('Heading Text')}
              <input 
                type="text" 
                placeholder="Enter heading text..." 
                value={content.text || ''} 
                onChange={(e) => updateDetailBuilderContent('text', e.target.value)} 
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
          </div>
        );
      case 'paragraph': {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3">Paragraph Text</label>
              <p className="text-xs text-slate-500 mb-2">
                <strong>Tip:</strong> Use the formatting buttons in the left sidebar or the editor toolbar. Text will display with actual formatting below.
              </p>
              <RichEditor 
                ref={paragraphEditorRef}
                value={content.text || ''} 
                onChange={(html) => updateDetailBuilderContent('text', html)} 
                showToolbar={false}
              />
            </div>

            {content.text && (
              <div className="border-t pt-4">
                <label className="block text-sm font-bold text-slate-900 mb-3">Preview</label>
                <div 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50"
                  dangerouslySetInnerHTML={{ __html: formatParagraphText(content.text) }}
                  style={{
                    lineHeight: '1.75',
                    color: '#374151',
                    fontSize: '14px'
                  }}
                />
                <style>{`
                  div[dangerouslySetInnerHTML] b { font-weight: 700; }
                  div[dangerouslySetInnerHTML] i { font-style: italic; }
                  div[dangerouslySetInnerHTML] u,
                  div[dangerouslySetInnerHTML] span[style*="text-decoration:underline"] { text-decoration: underline; }
                  div[dangerouslySetInnerHTML] a { color: #239244; font-weight: 700; text-decoration: none; }
                  div[dangerouslySetInnerHTML] a:hover { text-decoration: underline; }
                  div[dangerouslySetInnerHTML] ul { margin: 12px 0; padding-left: 20px; }
                  div[dangerouslySetInnerHTML] li { margin: 6px 0; color: #374151; }
                  div[dangerouslySetInnerHTML] p { margin: 8px 0; }
                `}</style>
              </div>
            )}
          </div>
        );
      }
      case 'image':
        return (
          <div className="space-y-4">
            {formatGuide}
            {richField('Image title', content.title, (html) => updateDetailBuilderContent('title', html))}
            <ImageUploader value={content.url || ''} onChange={(url) => updateDetailBuilderContent('url', url)} label="Upload image" folder="faculty" />
            <div>
              {fieldLabel('Alt text')}
              <input className="w-full px-3 py-2 border rounded-lg" placeholder="Alt text" value={content.alt || ''} onChange={(e) => updateDetailBuilderContent('alt', e.target.value)} />
            </div>
            {richField('Caption', content.caption, (html) => updateDetailBuilderContent('caption', html))}
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-4">
            {formatGuide}
            {richField('Gallery title', content.title, (html) => updateDetailBuilderContent('title', html))}
            {(content.images || []).map((image, index) => (
              <div key={index} className="space-y-2 rounded-lg border bg-white p-3">
                <div className="flex items-center justify-between"><span className="text-xs font-semibold text-gray-600">Image {index + 1}</span><button type="button" className="text-xs text-red-600" onClick={() => removeDetailBuilderArrayItem('images', index)}>Remove</button></div>
                <ImageUploader value={image || ''} onChange={(url) => updateDetailBuilderArray('images', index, url)} label={`Image ${index + 1}`} folder="faculty" />
              </div>
            ))}
            <button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('images', '')}>+ Add Image</button>
          </div>
        );
      case 'table':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Table title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle (optional)" value={content.subtitle || ''} onChange={(e) => updateDetailBuilderContent('subtitle', e.target.value)} /><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Headers</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('headers', '')}>+ Add Header</button></div>{(content.headers || []).map((header, index) => (<div key={index} className="flex gap-2 mb-2"><input className="flex-1 px-3 py-2 border rounded-lg" placeholder={`Header ${index + 1}`} value={header || ''} onChange={(e) => updateDetailBuilderArray('headers', index, e.target.value)} /><button type="button" className="px-3 py-2 text-red-600" onClick={() => removeDetailBuilderArrayItem('headers', index)}>×</button></div>))}</div><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Rows</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('rows', [''])}>+ Add Row</button></div>{(content.rows || []).map((row, rowIndex) => (<div key={rowIndex} className="rounded-lg border bg-white p-3 mb-2"><div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max((content.headers || []).length, 1)}, minmax(0, 1fr))` }}>{(row || []).map((cell, cellIndex) => (<input key={cellIndex} className="w-full px-3 py-2 border rounded-lg" placeholder={`R${rowIndex + 1}C${cellIndex + 1}`} value={cell || ''} onChange={(e) => { const nextRows = [...(content.rows || [])]; const nextRow = Array.isArray(nextRows[rowIndex]) ? [...nextRows[rowIndex]] : []; nextRow[cellIndex] = e.target.value; nextRows[rowIndex] = nextRow; updateDetailBuilderContent('rows', nextRows); }} />))}</div></div>))}</div></div>;
      case 'statistics':
        return <div className="space-y-4">{formatGuide}{richField('Statistics title', content.title, (html) => updateDetailBuilderContent('title', html))}{(content.stats || []).map((stat, index) => (<div key={index} className="rounded-lg border bg-white p-3"><div className="grid grid-cols-2 gap-2 mb-2"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Value" value={stat.value || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], value: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Label" value={stat.label || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], label: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} /></div><button type="button" className="text-xs text-red-600" onClick={() => removeDetailBuilderArrayItem('stats', index)}>Remove statistic</button></div>))}<button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('stats', { value: '', label: '' })}>+ Add Statistic</button></div>;
      default:
        return <div className="rounded-xl border border-dashed p-4 text-sm text-gray-500">This block type does not have a custom editor yet.</div>;
    }
  };

  const filteredFaculty = faculty.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (item?.name || '').toLowerCase().includes(term) || (item?.department || '').toLowerCase().includes(term);
  });

  if (loading) {
    return <div className="flex items-center justify-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2" style={{ borderColor: API.color1 }}></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Faculty</h1>
          <p className="text-gray-600 mt-1">Manage faculty members and profiles</p>
        </div>
        <button onClick={() => { resetForm(); setShowModal(true); }} className="flex items-center px-4 py-2 text-white rounded-lg hover:opacity-90" style={{ backgroundColor: API.color1 }}>
          <Plus className="h-5 w-5 mr-2" />
          Add Faculty
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input type="text" placeholder="Search faculty..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg" />
        </div>
      </div>

      {fetchError && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{fetchError}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((member) => (
          <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="h-16 w-16 rounded-full overflow-hidden border-2 bg-slate-100" style={{ borderColor: `${API.color1}33` }}>
                  <img src={member.photo ? API.getImageUrl(member.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`} alt={member.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`; }} />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditModal(member)} className="text-blue-600 hover:text-blue-900"><Edit className="h-5 w-5" /></button>
                  <button onClick={() => handleDelete(member.id)} className="text-red-600 hover:text-red-900"><Trash2 className="h-5 w-5" /></button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{member.designation}</p>
              <p className="text-sm font-medium" style={{ color: API.color1 }}>{member.department}</p>
              <div className="mt-4 border-t pt-3"><p className="text-xs text-gray-500">Full profile details are available in Edit.</p></div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-3 md:p-6">
          <div className="bg-white rounded-3xl max-w-[1600px] w-full max-h-[94vh] overflow-hidden shadow-2xl border border-slate-200">
            <div className="px-6 py-2 border-b bg-gradient-to-r from-emerald-50 via-white to-sky-50 flex items-start justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{editingItem ? 'Edit Faculty' : 'Add Faculty'}</h2>
                <p className="text-xs text-slate-500 mt-0.5">Edit profile basics on the left and build full details with blocks on the right.</p>
              </div>
              <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="h-9 w-9 rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white transition" aria-label="Close faculty editor">×</button>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-0 max-h-[calc(94vh-58px)] h-[calc(94vh-58px)] min-h-0 overflow-hidden bg-slate-50">
              <div className="border-b border-slate-200 bg-white px-4 sm:px-6 py-3">
                <div className="flex flex-wrap items-center gap-2">
                  {editorSteps.map((step) => {
                    const isActive = activeEditorStep === step.step;
                    return (
                      <button
                        key={step.step}
                        type="button"
                        onClick={() => setActiveEditorStep(step.step)}
                        className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${isActive ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}`}
                      >
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${isActive ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {step.step}
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{step.label}</div>
                          <div className="text-xs opacity-80">{step.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 sm:p-6 min-h-0">
                {renderEditorStepContent()}
              </div>

              <div className="flex items-center justify-between gap-6 border-t border-slate-200 bg-white px-4 sm:px-6 py-8">
                <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="px-5 py-3 border border-slate-300 rounded-xl hover:bg-white bg-white text-slate-700 font-semibold">Cancel</button>
                <div className="flex items-center gap-3">
                  {activeEditorStep > 1 && (
                    <button type="button" onClick={() => setActiveEditorStep((step) => Math.max(1, step - 1))} className="px-5 py-3 border border-slate-300 rounded-xl hover:bg-white bg-white text-slate-700 font-semibold">
                      Back
                    </button>
                  )}
                  {activeEditorStep < 3 ? (
                    <button type="button" onClick={() => setActiveEditorStep((step) => Math.min(3, step + 1))} className="px-5 py-3 text-white rounded-xl font-semibold hover:opacity-90 shadow-sm" style={{ backgroundColor: API.color1 }}>
                      Next
                    </button>
                  ) : (
                    <button type="button" onClick={handleSubmit} className="px-5 py-3 text-white rounded-xl font-semibold hover:opacity-90 shadow-sm" style={{ backgroundColor: API.color1 }}>{editingItem ? 'Update' : 'Create'}</button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

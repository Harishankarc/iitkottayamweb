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
  { value: 'hero', label: 'Hero Banner', icon: 'hero' },
  { value: 'heading', label: 'Heading', icon: 'heading' },
  { value: 'paragraph', label: 'Paragraph', icon: 'paragraph' },
  { value: 'image', label: 'Single Image', icon: 'image' },
  { value: 'gallery', label: 'Image Gallery', icon: 'gallery' },
  { value: 'list', label: 'List', icon: 'list' },
  { value: 'card', label: 'Card', icon: 'card' },
  { value: 'table', label: 'Table', icon: 'table' },
  { value: 'statistics', label: 'Statistics', icon: 'statistics' },
  { value: 'button', label: 'Button', icon: 'button' }
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
    case 'hero': return { title: '', subtitle: '', description: '', badge: '', buttonText: '', buttonLink: '', backgroundImage: '' };
    case 'heading': return { icon: '📝', text: '', level: 2 };
    case 'paragraph': return { icon: '', title: '', text: '', linkText: '', link: '' };
    case 'image': return { title: '', url: '', alt: '', caption: '' };
    case 'gallery': return { title: '', images: [''] };
    case 'list': return { icon: '📋', title: '', items: [''] };
    case 'card': return { icon: '🃏', title: '', description: '', link: '' };
    case 'table': return { title: '', subtitle: '', headers: [''], rows: [['']] };
    case 'statistics': return { title: '', stats: [{ value: '', label: '' }] };
    case 'button': return { title: '', description: '', buttonText: '', link: '', variant: 'primary' };
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
    if (content.includes('<h2 ') && content.includes('font-size:32px')) {
      const titleMatch = content.match(/<h2[^>]*>(.+?)<\/h2>/i);
      const subMatch = content.match(/<h3[^>]*style="[^"]*font-size:20px[^"]*"[^>]*>(.+?)<\/h3>/i);
      const btnMatch = content.match(/<a[^>]*href="([^"]*)"[^>]*>(.+?)<\/a>/i);
      block = { blockType: 'hero', content: { title: titleMatch ? titleMatch[1] : '', subtitle: subMatch ? subMatch[1] : '', description: '', backgroundImage: '', buttonText: btnMatch ? btnMatch[2] : '', buttonLink: btnMatch ? btnMatch[1] : '', badge: '' } };
    } else if (content.includes('<h3 ') && content.includes('<ul')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const items = [...content.matchAll(/<li>(.+?)<\/li>/gi)].map(m => m[1]);
      block = { blockType: 'list', content: { title: titleMatch ? titleMatch[1] : '', items: items.length > 0 ? items : [''], icon: '' } };
    } else if (content.includes('<table')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const headers = [...content.matchAll(/<th[^>]*>(.+?)<\/th>/gi)].map(m => m[1]);
      const rows = [...content.matchAll(/<tr>(.+?)<\/tr>/gi)].map(rowMatch => [...rowMatch[1].matchAll(/<td[^>]*>(.+?)<\/td>/gi)].map(m => m[1]));
      block = { blockType: 'table', content: { title: titleMatch ? titleMatch[1] : '', subtitle: '', headers: headers.length > 0 ? headers : [''], rows: rows.length > 0 ? rows : [['']] } };
    } else if (content.includes('<img') && content.includes('max-width:100%')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const imgMatch = content.match(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/i);
      const captionMatch = content.match(/<p[^>]*color:#6b7280[^>]*>(.+?)<\/p>/i);
      block = { blockType: 'image', content: { title: titleMatch ? titleMatch[1] : '', url: imgMatch ? imgMatch[1] : '', alt: imgMatch ? imgMatch[2] : '', caption: captionMatch ? captionMatch[1] : '' } };
    } else if (content.includes('display:flex;align-items:center;justify-content:space-between')) {
      const btnMatch = content.match(/<a[^>]*href="([^"]*)"[^>]*>(.+?)<\/a>/i);
      const titleMatch = content.match(/<h3[^>]*style="[^"]*font-size:20px[^"]*"[^>]*>(.+?)<\/h3>/i);
      const descMatch = content.match(/<p[^>]*style="margin:0;color:#374151[^>]*>(.+?)<\/p>/i);
      block = { blockType: 'button', content: { title: titleMatch ? titleMatch[1] : '', description: descMatch ? descMatch[1] : '', buttonText: btnMatch ? btnMatch[2] : 'Learn More', link: btnMatch ? btnMatch[1] : '', variant: content.includes('#6b7280') ? 'secondary' : 'primary' } };
    }
    if (block) blocks.push({ ...block, hidden: false });
  }
  return blocks.length > 0 ? blocks : [];
};

const createBlockBuilderState = (blockType = 'heading') => ({
  blockType,
  content: createDefaultDetailBuilderContent(blockType)
});

const buildDetailBlockHtml = (blockType, content) => {
  const heroBackgroundImage = resolveMediaUrl(content?.backgroundImage);
  const imageUrl = resolveMediaUrl(content?.url);
  const buttonLink = String(content?.link || '').trim() || '#';
  const buttonLabel = String(content?.buttonText || '').trim() || 'Learn More';

  switch (blockType) {
    case 'hero':
      return `<section style="padding:24px;border:1px solid #d1fae5;border-radius:18px;margin:18px 0;background:linear-gradient(135deg,#f0fdf4,#ecfeff);">${heroBackgroundImage ? `<div style="margin-bottom:16px;"><img src="${escapeHtml(heroBackgroundImage)}" alt="${escapeHtml(content.title || 'Hero image')}" style="width:100%;border-radius:14px;max-height:320px;object-fit:cover;" /></div>` : ''}${content.badge ? `<div style="display:inline-block;padding:6px 12px;border-radius:999px;background:#239244;color:#fff;font-size:12px;font-weight:700;margin-bottom:12px;">${escapeHtml(content.badge)}</div>` : ''}${content.title ? `<h2 style="margin:0 0 10px 0;font-size:32px;font-weight:800;color:#111827;">${escapeHtml(content.title)}</h2>` : ''}${content.subtitle ? `<h3 style="margin:0 0 10px 0;font-size:20px;font-weight:600;color:#166534;">${escapeHtml(content.subtitle)}</h3>` : ''}${content.description ? `<p style="margin:0;color:#374151;line-height:1.7;">${escapeHtml(content.description)}</p>` : ''}${content.buttonText ? `<div style="margin-top:16px;"><a href="${escapeHtml(content.buttonLink || '#')}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#239244;color:#fff;text-decoration:none;font-weight:700;">${escapeHtml(content.buttonText)}</a></div>` : ''}</section>`;
    case 'heading':
      return `<section style="margin:18px 0;"><h${content.level || 2} style="margin:0;font-size:${content.level === 1 ? '32px' : content.level === 3 ? '24px' : '28px'};font-weight:800;color:#111827;">${content.icon ? `${escapeHtml(content.icon)} ` : ''}${escapeHtml(content.text)}</h${content.level || 2}></section>`;
    case 'paragraph':
      return `<section style="margin:18px 0;padding:18px 20px;border:1px solid #e5e7eb;border-radius:14px;background:#fff;">${content.icon ? `<div style="margin-bottom:10px;font-size:18px;font-weight:700;color:#239244;">${escapeHtml(content.icon)} ${content.title ? escapeHtml(content.title) : ''}</div>` : (content.title ? `<h3 style="margin:0 0 10px 0;font-size:20px;font-weight:700;color:#239244;">${escapeHtml(content.title)}</h3>` : '')}${content.text ? `<p style="margin:0;line-height:1.75;color:#374151;">${escapeHtml(content.text)}</p>` : ''}${content.link ? `<div style="margin-top:12px;"><a href="${escapeHtml(content.link)}" style="color:#239244;font-weight:700;text-decoration:none;">${escapeHtml(content.linkText || 'Read more')}</a></div>` : ''}</section>`;
    case 'image':
      return `<section style="margin:18px 0;text-align:center;">${content.title ? `<h3 style="margin:0 0 10px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(content.alt || content.title || 'Faculty image')}" style="max-width:100%;width:100%;max-height:500px;aspect-ratio:1/1;object-fit:cover;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.08);display:inline-block;" />` : ''}${content.caption ? `<p style="margin:10px 0 0;color:#6b7280;font-size:13px;">${escapeHtml(content.caption)}</p>` : ''}</section>`;
    case 'gallery':
      return `<section style="margin:18px 0;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title || '')}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">${(content.images || []).filter(Boolean).map((itemUrl) => `<img src="${escapeHtml(resolveMediaUrl(itemUrl))}" alt="Gallery image" style="width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;border-radius:12px;display:block;" />`).join('')}</div></section>`;
    case 'list':
      return `<section style="margin:18px 0;padding:18px 20px;border:1px solid #e5e7eb;border-radius:14px;background:#fff;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title || '')}</h3><ul style="margin:0;padding-left:20px;color:#374151;line-height:1.8;">${(content.items || []).filter(Boolean).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>`;
    case 'card':
      return `<section style="margin:18px 0;padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#fff;display:flex;gap:14px;align-items:flex-start;">${content.icon ? `<div style="font-size:28px;line-height:1;">${escapeHtml(content.icon)}</div>` : ''}<div>${content.title ? `<h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${content.description ? `<p style="margin:0;color:#374151;line-height:1.7;">${escapeHtml(content.description)}</p>` : ''}${content.link ? `<div style="margin-top:12px;"><a href="${escapeHtml(content.link)}" style="color:#239244;font-weight:700;text-decoration:none;">Learn more</a></div>` : ''}</div></section>`;
    case 'table':
      return `<section style="margin:18px 0;overflow:auto;">${content.title ? `<h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${content.subtitle ? `<p style="margin:0 0 12px 0;color:#6b7280;">${escapeHtml(content.subtitle)}</p>` : ''}<table style="width:100%;border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;"><thead><tr>${(content.headers || []).filter(Boolean).map((header) => `<th style="background:#ecfdf5;border:1px solid #d1d5db;padding:10px 12px;text-align:left;color:#111827;">${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${(content.rows || []).map((row) => `<tr>${(row || []).map((cell) => `<td style="border:1px solid #d1d5db;padding:10px 12px;color:#374151;">${escapeHtml(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
    case 'statistics':
      return `<section style="margin:18px 0;padding:18px;border:1px solid #d1fae5;border-radius:16px;background:#f8fffb;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title || '')}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">${(content.stats || []).filter(Boolean).map((stat) => `<div style="padding:14px;border-radius:12px;background:#fff;border:1px solid #d1d5db;"><div style="font-size:24px;font-weight:800;color:#239244;">${escapeHtml(stat.value)}</div><div style="font-size:13px;color:#6b7280;">${escapeHtml(stat.label)}</div></div>`).join('')}</div></section>`;
    case 'button':
      return `<section style="margin:18px 0;padding:18px;border:1px solid #e5e7eb;border-radius:16px;background:#fff;display:flex;align-items:center;justify-content:space-between;gap:16px;"><div>${content.title ? `<h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${content.description ? `<p style="margin:0;color:#374151;line-height:1.7;">${escapeHtml(content.description)}</p>` : ''}</div><a href="${escapeHtml(buttonLink)}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:${content.variant === 'secondary' ? '#6b7280' : '#239244'};color:#fff;text-decoration:none;font-weight:700;white-space:nowrap;">${escapeHtml(buttonLabel)}</a></section>`;
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
      const response = await fetch(`${API.baseURL}/api/faculty`, { headers: { Authorization: `Bearer ${token}` } });
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
      useHtmlEditor: Boolean(item.fullDetailsHtml),
      isActive: item.isActive !== false
    });
    const parsedBlocks = item.fullDetailsHtml ? parseDetailBlocksFromHtml(item.fullDetailsHtml) : [];
    setDetailBlocks(parsedBlocks.length > 0 ? parsedBlocks : []);
    if (parsedBlocks.length > 0) {
      setDetailBuilder({
        blockType: parsedBlocks[0].blockType,
        content: parsedBlocks[0].content || createDefaultDetailBuilderContent(parsedBlocks[0].blockType)
      });
      setEditingBlockIndex(0);
    } else {
      setDetailBuilder(createBlockBuilderState('heading'));
      setEditingBlockIndex(null);
    }
    setActiveEditorStep(item.fullDetailsHtml ? 3 : 1);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem ? `${API.baseURL}/api/faculty/${editingItem.id}` : `${API.baseURL}/api/faculty`;
      const fullDetailsHtmlToSave = formData.useHtmlEditor
        ? detailBlocks.filter((block) => !block.hidden).map(block => buildDetailBlockHtml(block.blockType, block.content)).join('')
        : (formData.fullDetailsHtml || '');
      const payload = {
        name: formData.name,
        designation: formData.designation,
        department: formData.department?.trim() || 'General',
        email: normalizeEmail(formData.email || ''),
        phone: formData.phone?.trim() || '',
        photo: formData.photo || '',
        mainSection: normalizeMainSection(formData.mainSection || '').trim(),
        fullDetails: textToList(formData.fullDetails),
        fullDetailsHtml: fullDetailsHtmlToSave,
        isActive: !!formData.isActive
      };
      const response = await fetch(url, { method: editingItem ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
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
      await fetch(`${API.baseURL}/api/faculty/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
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
        next[editingBlockIndex] = { blockType: detailBuilder.blockType, content: detailBuilder.content, hidden: next[editingBlockIndex]?.hidden === true };
        return next;
      });
      setEditingBlockIndex(null);
    } else {
      setDetailBlocks((prev) => [...prev, { blockType: detailBuilder.blockType, content: detailBuilder.content, hidden: false }]);
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

    // Page 4 disabled for now.

    return (
      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Full Details</h3>
          <p className="text-sm text-slate-500">Switch modes below. Advanced mode gives you the same block options as content management.</p>
        </div>
        <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 w-fit">
          <input type="checkbox" checked={formData.useHtmlEditor} onChange={(e) => setFormData({ ...formData, useHtmlEditor: e.target.checked })} />
          Use advanced editor
        </label>

        {formData.useHtmlEditor ? (
          <div className="space-y-8 rounded-2xl border bg-slate-50 p-4 shadow-sm">
            <div>
              <label htmlFor="detail-block-type" className="block text-sm font-semibold text-gray-700 mb-3">Block Type</label>
              <select id="detail-block-type" value={detailBuilder.blockType} onChange={(e) => updateDetailBuilderType(e.target.value)} className="w-full px-3 py-2.5 rounded-xl border border-gray-300 bg-white text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                {FACULTY_DETAIL_BLOCK_TYPES.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
              </select>
              <p className="mt-2 text-xs text-gray-500">Open the dropdown and scroll to see all block types.</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-6">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm font-semibold text-gray-700">Block content</p>
                <p className="text-xs text-gray-500">{detailBuilder.blockType}</p>
              </div>
              {renderDetailBuilderFields()}
              <button type="button" onClick={clearCurrentBlockContent} className="w-full px-4 py-2.5 bg-amber-100 text-amber-800 rounded-lg font-semibold hover:bg-amber-200 border border-amber-300 inline-flex items-center justify-center gap-2">
                <Eraser className="h-4 w-4" />
                Clear Current Block Fields
              </button>
              <button type="button" onClick={insertDetailBuilderBlock} className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                {editingBlockIndex !== null ? 'Update Block' : 'Add Block'}
              </button>
              {editingBlockIndex !== null && (
                <button type="button" onClick={() => { setEditingBlockIndex(null); setDetailBuilder(createBlockBuilderState('heading')); }} className="w-full px-4 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400">
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="space-y-3 rounded-2xl border bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <p className="text-sm font-semibold text-gray-700">Full details content</p>
                <p className="text-xs text-gray-500">{detailBlocks.filter((block) => !block.hidden).length} visible / {detailBlocks.length} total</p>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {detailBlocks.length === 0 ? (
                  <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center space-y-3">
                    {formData.fullDetailsHtml ? (
                      <>
                        <p className="text-sm text-gray-600 font-semibold">Current content:</p>
                        <div className="bg-gray-50 rounded p-3 max-h-48 overflow-y-auto text-left prose prose-sm" dangerouslySetInnerHTML={{ __html: formData.fullDetailsHtml }} />
                        <p className="text-xs text-gray-500">This content is saved. To edit it, click "Clear and Add New Blocks" below.</p>
                        <button type="button" onClick={() => { setFormData({ ...formData, fullDetailsHtml: '', useHtmlEditor: true }); setDetailBlocks([]); }} className="w-full px-3 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Clear and Add New Blocks</button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-500">No blocks added yet. Create and add blocks from the section above.</p>
                    )}
                  </div>
                ) : (
                  detailBlocks.map((block, index) => {
                    const IconComponent = BLOCK_TYPE_ICONS[block.blockType];
                    const blockLabel = FACULTY_DETAIL_BLOCK_TYPES.find((t) => t.value === block.blockType)?.label || block.blockType;
                    const isEditing = editingBlockIndex === index;
                    const isHidden = block.hidden === true;
                    return (
                      <div key={index} className={`rounded-lg border p-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between ${isEditing ? 'bg-blue-50 border-blue-300' : isHidden ? 'bg-slate-100 border-slate-300 opacity-80' : 'bg-slate-50 border-gray-300'}`}>
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ${isEditing ? 'bg-blue-500' : 'bg-gray-400'}`}>
                            {index + 1}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              {IconComponent && <IconComponent className="h-4 w-4 text-gray-600 flex-shrink-0" />}
                              <p className="text-sm font-semibold text-gray-900">{blockLabel}</p>
                              {isEditing && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Editing</span>}
                              {isHidden && <span className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded">Hidden</span>}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Block {index + 1}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 flex-shrink-0 sm:justify-end">
                          <button type="button" onClick={() => toggleBlockVisibility(index)} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg border border-gray-200 bg-white" title={isHidden ? 'Show block' : 'Hide block'}>
                            {isHidden ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                            {isHidden ? 'Show' : 'Hide'}
                          </button>
                          <button type="button" onClick={() => editBlock(index)} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50 rounded-lg border border-blue-200 bg-white" title="Edit block">
                            <Edit className="h-4 w-4" />
                            Edit
                          </button>
                          <button type="button" onClick={() => deleteBlock(index)} className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 rounded-lg border border-red-200 bg-white" title="Delete block">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <textarea rows={6} value={formData.fullDetails} onChange={(e) => setFormData({ ...formData, fullDetails: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm bg-white" placeholder="**Education**\nPh.D. in Computer Science, XYZ University\nM.Tech in Computer Science\n\n**Experience**\n10+ years teaching experience\n5+ years research experience" />
        )}
      </div>
    );
  };

  const renderDetailBuilderFields = () => {
    const content = detailBuilder.content || {};

    switch (detailBuilder.blockType) {
      case 'hero':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Badge text" value={content.badge || ''} onChange={(e) => updateDetailBuilderContent('badge', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Hero title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle" value={content.subtitle || ''} onChange={(e) => updateDetailBuilderContent('subtitle', e.target.value)} /><textarea className="w-full px-3 py-2 border rounded-lg" rows={4} placeholder="Description" value={content.description || ''} onChange={(e) => updateDetailBuilderContent('description', e.target.value)} /><div className="grid grid-cols-2 gap-3"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Button text" value={content.buttonText || ''} onChange={(e) => updateDetailBuilderContent('buttonText', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Button link" value={content.buttonLink || ''} onChange={(e) => updateDetailBuilderContent('buttonLink', e.target.value)} /></div><ImageUploader value={content.backgroundImage || ''} onChange={(url) => updateDetailBuilderContent('backgroundImage', url)} label="Background image" folder="faculty" /></div>;
      case 'heading':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Icon (optional)" value={content.icon || ''} onChange={(e) => updateDetailBuilderContent('icon', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Heading text" value={content.text || ''} onChange={(e) => updateDetailBuilderContent('text', e.target.value)} /><select className="w-full px-3 py-2 border rounded-lg" value={content.level || 2} onChange={(e) => updateDetailBuilderContent('level', Number(e.target.value))}><option value={1}>H1</option><option value={2}>H2</option><option value={3}>H3</option><option value={4}>H4</option></select></div>;
      case 'paragraph':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Icon (optional)" value={content.icon || ''} onChange={(e) => updateDetailBuilderContent('icon', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><textarea className="w-full px-3 py-2 border rounded-lg" rows={5} placeholder="Paragraph text" value={content.text || ''} onChange={(e) => updateDetailBuilderContent('text', e.target.value)} /><div className="grid grid-cols-2 gap-3"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Link text" value={content.linkText || ''} onChange={(e) => updateDetailBuilderContent('linkText', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Link URL" value={content.link || ''} onChange={(e) => updateDetailBuilderContent('link', e.target.value)} /></div></div>;
      case 'image':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Image title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><ImageUploader value={content.url || ''} onChange={(url) => updateDetailBuilderContent('url', url)} label="Upload image" folder="faculty" /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Alt text" value={content.alt || ''} onChange={(e) => updateDetailBuilderContent('alt', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Caption (optional)" value={content.caption || ''} onChange={(e) => updateDetailBuilderContent('caption', e.target.value)} /></div>;
      case 'gallery':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Gallery title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} />{(content.images || []).map((image, index) => (<div key={index} className="space-y-2 rounded-lg border bg-white p-3"><div className="flex items-center justify-between"><span className="text-xs font-semibold text-gray-600">Image {index + 1}</span><button type="button" className="text-xs text-red-600" onClick={() => removeDetailBuilderArrayItem('images', index)}>Remove</button></div><ImageUploader value={image || ''} onChange={(url) => updateDetailBuilderArray('images', index, url)} label={`Image ${index + 1}`} folder="faculty" /></div>))}<button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('images', '')}>+ Add Image</button></div>;
      case 'list':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="List title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Icon (optional)" value={content.icon || ''} onChange={(e) => updateDetailBuilderContent('icon', e.target.value)} />{(content.items || []).map((item, index) => (<div key={index} className="flex gap-2"><input className="flex-1 px-3 py-2 border rounded-lg" placeholder={`Item ${index + 1}`} value={item || ''} onChange={(e) => updateDetailBuilderArray('items', index, e.target.value)} /><button type="button" className="px-3 py-2 text-red-600" onClick={() => removeDetailBuilderArrayItem('items', index)}>×</button></div>))}<button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('items', '')}>+ Add Item</button></div>;
      case 'card':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Card title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><textarea className="w-full px-3 py-2 border rounded-lg" rows={4} placeholder="Card description" value={content.description || ''} onChange={(e) => updateDetailBuilderContent('description', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Icon / emoji" value={content.icon || ''} onChange={(e) => updateDetailBuilderContent('icon', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Link URL (optional)" value={content.link || ''} onChange={(e) => updateDetailBuilderContent('link', e.target.value)} /></div>;
      case 'table':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Table title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle (optional)" value={content.subtitle || ''} onChange={(e) => updateDetailBuilderContent('subtitle', e.target.value)} /><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Headers</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('headers', '')}>+ Add Header</button></div>{(content.headers || []).map((header, index) => (<div key={index} className="flex gap-2 mb-2"><input className="flex-1 px-3 py-2 border rounded-lg" placeholder={`Header ${index + 1}`} value={header || ''} onChange={(e) => updateDetailBuilderArray('headers', index, e.target.value)} /><button type="button" className="px-3 py-2 text-red-600" onClick={() => removeDetailBuilderArrayItem('headers', index)}>×</button></div>))}</div><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Rows</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('rows', [''])}>+ Add Row</button></div>{(content.rows || []).map((row, rowIndex) => (<div key={rowIndex} className="rounded-lg border bg-white p-3 mb-2"><div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max((content.headers || []).length, 1)}, minmax(0, 1fr))` }}>{(row || []).map((cell, cellIndex) => (<input key={cellIndex} className="w-full px-3 py-2 border rounded-lg" placeholder={`R${rowIndex + 1}C${cellIndex + 1}`} value={cell || ''} onChange={(e) => { const nextRows = [...(content.rows || [])]; const nextRow = Array.isArray(nextRows[rowIndex]) ? [...nextRows[rowIndex]] : []; nextRow[cellIndex] = e.target.value; nextRows[rowIndex] = nextRow; updateDetailBuilderContent('rows', nextRows); }} />))}</div></div>))}</div></div>;
      case 'statistics':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Statistics title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} />{(content.stats || []).map((stat, index) => (<div key={index} className="rounded-lg border bg-white p-3"><div className="grid grid-cols-2 gap-2 mb-2"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Value" value={stat.value || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], value: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Label" value={stat.label || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], label: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} /></div><button type="button" className="text-xs text-red-600" onClick={() => removeDetailBuilderArrayItem('stats', index)}>Remove statistic</button></div>))}<button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('stats', { value: '', label: '' })}>+ Add Statistic</button></div>;
      case 'button':
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><textarea className="w-full px-3 py-2 border rounded-lg" rows={3} placeholder="Description" value={content.description || ''} onChange={(e) => updateDetailBuilderContent('description', e.target.value)} /><div className="grid grid-cols-2 gap-3"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Button text" value={content.buttonText || ''} onChange={(e) => updateDetailBuilderContent('buttonText', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Link URL" value={content.link || ''} onChange={(e) => updateDetailBuilderContent('link', e.target.value)} /></div><select className="w-full px-3 py-2 border rounded-lg" value={content.variant || 'primary'} onChange={(e) => updateDetailBuilderContent('variant', e.target.value)}><option value="primary">Primary</option><option value="secondary">Secondary</option></select></div>;
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

            <form onSubmit={handleSubmit} className="flex flex-col gap-0 max-h-[calc(94vh-58px)] h-[calc(94vh-58px)] min-h-0 overflow-hidden bg-slate-50">
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
                    <button type="submit" className="px-5 py-3 text-white rounded-xl font-semibold hover:opacity-90 shadow-sm" style={{ backgroundColor: API.color1 }}>{editingItem ? 'Update' : 'Create'}</button>
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

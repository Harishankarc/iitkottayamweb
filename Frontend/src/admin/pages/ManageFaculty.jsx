import React, { useEffect, useState, useRef } from 'react';
import { Plus, Edit, Trash2, Search, Zap, Heading2, Type, Image, ImagePlus, List, ListOrdered, Layers, Table, BarChart3, Pointer, Eye, EyeOff, Eraser, Bold, Italic, Underline, Link as LinkIcon } from 'lucide-react';
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
    case 'statistics': return { title: 'Statistics', stats: [{ value: '', label: '' }] };
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
    // Detect image tags inside this section (if any)
    const imgTags = (content.match(/<img[\s\S]*?>/gi) || []);
    // Treat as heading only when there are heading tags and the section does not look like
    // an image/gallery block. Exclude gallery-like sections (grid-template, multiple images)
    // or single-image sections that already use max-width styling (handled elsewhere).
    if ((content.includes('<h1 ') || content.includes('<h2 ') || content.includes('<h3 ') || content.includes('<h4 ') || content.includes('<h5 ') || content.includes('<h6 ')) &&
      !(content.includes('<img') && content.includes('max-width:100%')) &&
      !content.includes('<table') &&
      !content.includes('grid-template-columns') &&
      imgTags.length <= 1) {
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
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const headers = [...content.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/gi)].map(m => String(m[1] || '').replace(/<[^>]+>/g, '').trim()).filter(Boolean);
      const rows = [...content.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
        .map(rowMatch => [...rowMatch[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map(m => String(m[1] || '').replace(/<[^>]+>/g, '').trim()))
        .filter((row) => row.length > 0);
      block = { blockType: 'table', content: { title: titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '', subtitle: '', headers: headers.length > 0 ? headers : [''], rows: rows.length > 0 ? rows : [['']] }, rawHtml: match[0] };
    } else if (content.includes('<img') && content.includes('max-width:100%')) {
      const titleMatch = content.match(/<h3[^>]*>(.+?)<\/h3>/i);
      const srcMatch = content.match(/<img[^>]*\bsrc=(['"])(.*?)\1/i);
      const altMatch = content.match(/<img[^>]*\balt=(['"])(.*?)\1/i);
      const captionMatch = content.match(/<p[^>]*color:#6b7280[^>]*>(.+?)<\/p>/i);
      block = {
        blockType: 'image',
        content: {
          title: titleMatch ? titleMatch[1] : '',
          url: srcMatch ? srcMatch[2] : '',
          alt: altMatch ? altMatch[2] : '',
          caption: captionMatch ? captionMatch[1] : ''
        },
        rawHtml: match[0]
      };
    } else if ((content.includes('grid-template-columns:repeat(auto-fit,minmax(160px,1fr))') || content.includes('gallery-grid')) && content.includes('<img')) {
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const imgTags = content.match(/<img[^>]*>/gi) || [];
      const images = imgTags.map(tag => {
        const srcMatch = tag.match(/\bsrc=(['"])(.*?)\1/i);
        return srcMatch ? srcMatch[2] : '';
      }).filter(Boolean);
      block = { blockType: 'gallery', content: { title: titleMatch ? titleMatch[1] : '', images: images.length > 0 ? images : [''] }, rawHtml: match[0] };
    } else if (content.includes('grid-template-columns:repeat(auto-fit,minmax(160px,1fr))') || content.includes('background:#f8fffb')) {
      const titleMatch = content.match(/<h3[^>]*>([\s\S]*?)<\/h3>/i);
      const stats = [...content.matchAll(/<div style="font-size:24px;font-weight:800;color:#239244;">([\s\S]*?)<\/div>[\s\S]*?<div style="font-size:13px;color:#6b7280;">([\s\S]*?)<\/div>/gi)]
        .map((m) => ({ value: m[1], label: m[2] }));
      block = { blockType: 'statistics', content: { title: titleMatch ? titleMatch[1] : '', stats: stats.length > 0 ? stats : [{ value: '', label: '' }] }, rawHtml: match[0] };
    }
    if (block) {
      const startTag = match[0].match(/<section[^>]*>/i)?.[0] || '';
      const isHidden = /display\s*:\s*none/i.test(startTag);
      blocks.push({ ...block, hidden: isHidden });
    }
  }
  return blocks.length > 0 ? blocks : [];
};

const createBlockBuilderState = (blockType = 'heading') => ({
  blockType,
  content: createDefaultDetailBuilderContent(blockType)
});

const sanitizeParagraphHtml = (html) => {
  if (!html) return '';
  
  // Remove empty tags (even with attributes like dir/style)
  let cleaned = html.replace(/<(strong|em|u|a|span|b|i)(?:\s+[^>]*)?>[\s]*(?:<br\s*\/?>)?[\s]*<\/\1>/gi, '');
  
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
  
  // Ensure common inline tags are balanced (close any unclosed tags)
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

const formatParagraphText = (text) => {
  if (!text) return '';
  
  // Sanitize first
  const sanitized = sanitizeParagraphHtml(text);
  
  // If it's already HTML from RichEditor, just return it (it's clean native HTML)
  if (sanitized.includes('<') && sanitized.includes('>')) {
    return sanitized;
  }
  
  // Otherwise, process markdown syntax
  let html = sanitized;
  
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
      return `<section style="margin:18px 0;text-align:center;">${content.title ? `<h3 style="margin:0 0 10px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${imageUrl ? `<img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(content.alt || content.title || 'Faculty image')}" style="max-width:100%;width:100%;max-height:300px;aspect-ratio:1/1;object-fit:cover;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.08);display:inline-block;" />` : ''}${content.caption ? `<p style="margin:10px 0 0;color:#6b7280;font-size:13px;">${escapeHtml(content.caption)}</p>` : ''}</section>`;
    case 'gallery':
      return `<section style="margin:18px 0;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${richText(content.title || '')}</h3><div class="gallery-grid" style="max-width:750px;margin:12px auto;display:grid;grid-template-columns:repeat(4,1fr);gap:8px;">${(content.images || []).filter(Boolean).map((itemUrl) => `<img src="${escapeHtml(resolveMediaUrl(itemUrl))}" alt="Gallery image" style="width:100%;height:auto;aspect-ratio:1/1;object-fit:cover;border-radius:12px;display:block;" />`).join('')}</div></section>`;
    case 'table':
      return `<section style="margin:18px 0;overflow:auto;">${content.title ? `<h3 style="margin:0 0 8px 0;font-size:20px;font-weight:700;color:#111827;">${escapeHtml(content.title)}</h3>` : ''}${content.subtitle ? `<p style="margin:0 0 12px 0;color:#6b7280;">${escapeHtml(content.subtitle)}</p>` : ''}<table style="width:100%;border-collapse:collapse;border:1px solid #d1d5db;border-radius:12px;overflow:hidden;"><thead><tr>${(content.headers || []).map((header) => `<th style="background:#ecfdf5;border:1px solid #d1d5db;padding:10px 12px;text-align:left;color:#111827;">${escapeHtml(header)}</th>`).join('')}</tr></thead><tbody>${(content.rows || []).map((row) => `<tr>${Array.from({ length: Math.max((content.headers || []).length, 1) }, (_, cellIndex) => `<td style="border:1px solid #d1d5db;padding:10px 12px;color:#374151;">${escapeHtml((row || [])[cellIndex] || '')}</td>`).join('')}</tr>`).join('')}</tbody></table></section>`;
    case 'statistics': {
      const statValues = (content.stats || []).map((stat) => {
        const number = Number(String(stat.value || '').replace(/,/g, '').match(/-?\d+(?:\.\d+)?/)?.[0] || '0');
        return Number.isFinite(number) ? number : 0;
      });
      const maxStatValue = Math.max(...statValues, 1);
      const sectionTitle = richText(content.title?.trim() ? content.title : 'Statistics');
      return `<section style="margin:18px 0;padding:18px;border:1px solid #d1fae5;border-radius:16px;background:#f8fffb;"><h3 style="margin:0 0 12px 0;font-size:20px;font-weight:700;color:#111827;">${sectionTitle}</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px;">${(content.stats || []).filter(Boolean).map((stat, index) => { const value = statValues[index] || 0; const width = Math.min(100, Math.max(10, Math.round((value / maxStatValue) * 100))); return `<div style="padding:18px;border-radius:16px;background:#fff;border:1px solid #d1d5db;display:flex;flex-direction:column;gap:12px;"><div style="font-size:24px;font-weight:800;color:#239244;">${escapeHtml(stat.value)}</div><div style="width:100%;height:10px;border-radius:999px;background:#e5f7ef;overflow:hidden;"><div style="width:${width}%;height:100%;border-radius:999px;background:#239244;"></div></div><div style="font-size:13px;color:#6b7280;">${escapeHtml(stat.label)}</div></div>`; }).join('')}</div></section>`;
    }
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

const stripInlineTextColors = (html) => {
  if (typeof html !== 'string') return '';
  let cleaned = html;
  cleaned = cleaned.replace(/<font\b[^>]*\bcolor\s*=\s*(['"]?)(?:#[0-9a-fA-F]{3,6}|rgb\([^)]*\)|rgba\([^)]*\)|[a-zA-Z]+)\1[^>]*>/gi, '');
  cleaned = cleaned.replace(/<\/font>/gi, '');
  cleaned = cleaned.replace(/\s*\bcolor\s*=\s*(['"]?)(?:#[0-9a-fA-F]{3,6}|rgb\([^)]*\)|rgba\([^)]*\)|[a-zA-Z]+)\1/gi, '');
  cleaned = cleaned.replace(/\s*style\s*=\s*(['"])(.*?)\1/gi, (match, quote, styleText) => {
    const resultStyle = styleText
      .split(';')
      .map((part) => part.trim())
      .filter((part) => part && !/^color\s*:/i.test(part))
      .join('; ');
    return resultStyle ? ` style=${quote}${resultStyle}${quote}` : '';
  });
  cleaned = cleaned.replace(/\s+(?:style|color)\s*=\s*(['"]?)\s*\1/gi, '');
  return cleaned;
};

const normalizeMainSectionPage = (value) => {
  if (typeof value !== 'string') return '';
  const sanitized = stripInlineTextColors(value);
  const normalized = sanitized.replace(/\r\n/g, '\n').replace(/\\/g, '\n');
  const lines = normalized
    .split('\n')
    .slice(0, MAIN_SECTION_MAX_LINES)
    .map((line) => line.slice(0, MAIN_SECTION_MAX_LINE_LENGTH));
  return lines.join('\n');
};

const normalizeMainSectionPages = (value) => {
  if (Array.isArray(value)) {
    return value.map((page) => normalizeMainSectionPage(String(page || ''))).filter((page) => page.trim() !== '');
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return normalizeMainSectionPages(parsed);
      }
    } catch {
      // Continue to treat it as a single page string.
    }
    const page = normalizeMainSectionPage(value);
    return page ? [page] : [];
  }
  return [];
};

const parseMainSectionPages = (value) => {
  if (Array.isArray(value)) {
    return value.map((page) => String(page || ''));
  }
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.map((page) => String(page || ''));
      }
    } catch {
      // Use plain string as a single page.
    }
    return [value];
  }
  return [''];
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
    const normalized = value.replace(/\r\n/g, '\n');
    return normalized.split(/[\n,]+/).map((item) => item.trim()).filter(Boolean);
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
  const [formData, setFormData] = useState({ name: '', designation: '', facultyType: 'Internal Faculty', department: 'General', email: '', phone: '', photo: '', qualification: '', specialization: '', experience: '', researchInterests: '', publications: '', googleScholar: '', linkedIn: '', researchGate: '', mainSectionPages: [''], fullDetails: '', fullDetailsHtml: '', useHtmlEditor: false, isActive: true });
  const [pendingListType, setPendingListType] = useState(null);
  const [pendingListItemCount, setPendingListItemCount] = useState(0);
  const paragraphEditorRef = React.useRef(null);

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

  const editorSteps = [
    { step: 1, label: 'Profile Details', description: 'Identity and image' },
    { step: 2, label: 'Main Details', description: 'Summary and links' },
    { step: 3, label: 'Full Details', description: 'Block-based content' }
  ];

  const [sortOrders, setSortOrders] = useState({
    'Internal Faculty': 'newest',
    'Adjunct Faculty': 'newest',
    'Former Faculty': 'newest'
  });

  useEffect(() => {
    fetchFaculty();
    fetchSettings();
  }, []);

  useEffect(() => {
    if (editFacultyIdFromState && faculty.length > 0) {
      const facultyToEdit = faculty.find(f => f.id == editFacultyIdFromState);
      if (facultyToEdit) openEditModal(facultyToEdit);
    }
  }, [editFacultyIdFromState, faculty]);

  const fetchSettings = async () => {
    try {
      const response = await fetch(`${API.baseURL}/api/site-settings?category=faculty`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.settings) {
          setSortOrders({
            'Internal Faculty': data.settings['faculty_sort_internal']?.value || 'newest',
            'Adjunct Faculty': data.settings['faculty_sort_adjunct']?.value || 'newest',
            'Former Faculty': data.settings['faculty_sort_former']?.value || 'newest'
          });
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSortOrderChange = async (type, value) => {
    const keyMap = {
      'Internal Faculty': 'faculty_sort_internal',
      'Adjunct Faculty': 'faculty_sort_adjunct',
      'Former Faculty': 'faculty_sort_former'
    };
    const key = keyMap[type];
    setSortOrders(prev => ({ ...prev, [type]: value }));
    try {
      const token = localStorage.getItem('token');
      await fetch(`${API.baseURL}/api/site-settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          settingKey: key,
          settingValue: value,
          settingType: 'text',
          category: 'faculty',
          description: `Sort order for ${type}`
        })
      });
    } catch (err) {
      console.error('Error saving setting:', err);
    }
  };


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
    setFormData({ name: '', designation: '', facultyType: 'Internal Faculty', department: 'General', email: '', phone: '', photo: '', qualification: '', specialization: '', experience: '', researchInterests: '', publications: '', googleScholar: '', linkedIn: '', researchGate: '', mainSectionPages: [''], fullDetails: '', fullDetailsHtml: '', useHtmlEditor: true, isActive: true });
    setDetailBuilder(createBlockBuilderState('heading'));
    setDetailBlocks([]);
    setEditingBlockIndex(null);
    setEditingItem(null);
    setPendingListType(null);
    setPendingListItemCount(0);
    setActiveEditorStep(1);
  };

  const appendPendingListItem = () => {
    if (!pendingListType) return;
    const existingHtml = detailBuilder.content?.text || '';
    const nextItemNumber = pendingListItemCount + 1;
    const itemLabel = `List item ${nextItemNumber}`;
    const tag = pendingListType;
    const listRegex = new RegExp(`(<${tag}[^>]*>)([\s\S]*?)(</${tag}>)`, 'gi');
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

    updateDetailBuilderContent('text', sanitizeParagraphHtml(updatedHtml));
    setPendingListItemCount(nextItemNumber);
  };

  const openEditModal = (item) => {
    const resolvedFullDetails = Array.isArray(item.fullDetails) ? item.fullDetails : toDetailArray(item.fullDetails || '');
    const fallbackFullDetails = Array.isArray(item.rightSideDetails) ? item.rightSideDetails : toDetailArray(item.rightSideDetails || '');
    let parsedBlocks = item.fullDetailsHtml ? parseDetailBlocksFromHtml(item.fullDetailsHtml) : [];
    if (item.fullDetailsHtml && parsedBlocks.length === 0) {
      parsedBlocks = [{
        blockType: 'paragraph',
        content: { text: item.fullDetailsHtml },
        rawHtml: `<section style="margin:18px 0;"><div style="line-height:1.75;">${item.fullDetailsHtml}</div></section>`,
        hidden: false
      }];
    }
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      designation: item.designation || '',
      facultyType: item.facultyType || 'Internal Faculty',
      department: item.department || 'General',
      email: item.email || '',
      phone: item.phone || '',
      photo: item.photo || '',
      qualification: item.qualification || '',
      specialization: item.specialization || '',
      experience: item.experience || '',
      researchInterests: Array.isArray(item.researchInterests) ? item.researchInterests.join('\n') : (item.researchInterests || ''),
      publications: Array.isArray(item.publications) ? item.publications.join('\n') : (item.publications || ''),
      googleScholar: item.googleScholar || '',
      linkedIn: item.linkedIn || '',
      researchGate: item.researchGate || '',
      mainSectionPages: parseMainSectionPages(item.mainSection || ''),
      fullDetails: (resolvedFullDetails.length > 0 ? resolvedFullDetails : fallbackFullDetails).join('\n'),
      fullDetailsHtml: item.fullDetailsHtml || '',
      useHtmlEditor: true,
      isActive: item.isActive !== false
    });
    setDetailBlocks(parsedBlocks);
    setDetailBuilder(createBlockBuilderState('heading'));
    setEditingBlockIndex(null);
    setActiveEditorStep(1);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingItem ? `${API.baseURL}/api/faculty/${editingItem.id}` : `${API.baseURL}/api/faculty`;
      const fullDetailsHtmlToSave = formData.useHtmlEditor
        ? (detailBlocks.length > 0
            ? detailBlocks.map((block) => {
                let html = block.rawHtml || buildDetailBlockHtml(block.blockType, block.content);
                if (block.hidden) {
                  // Ensure style has display:none;
                  if (html.includes('<section')) {
                    const matchStyle = html.match(/<section[^>]*style=(['"])(.*?)\1/i);
                    if (matchStyle) {
                      const quote = matchStyle[1];
                      const styleVal = matchStyle[2];
                      if (!styleVal.includes('display:none')) {
                        const newStyle = `display:none;${styleVal}`;
                        html = html.replace(/(<section[^>]*style=)(['"])(.*?)\2/i, `$1$2${newStyle}$2`);
                      }
                    } else {
                      html = html.replace(/(<section)/i, '$1 style="display:none;"');
                    }
                  }
                } else {
                  // Ensure display:none; is removed from style
                  if (html.includes('<section')) {
                    const matchStyle = html.match(/<section[^>]*style=(['"])(.*?)\1/i);
                    if (matchStyle) {
                      const quote = matchStyle[1];
                      const styleVal = matchStyle[2];
                      if (styleVal.includes('display:none')) {
                        const cleanStyle = styleVal.replace(/display\s*:\s*none\s*;?/gi, '');
                        html = html.replace(/(<section[^>]*style=)(['"])(.*?)\2/i, `$1$2${cleanStyle}$2`);
                      }
                    }
                  }
                }
                return html;
              }).join('')
            : (formData.fullDetailsHtml || ''))
        : (formData.fullDetailsHtml || '');
      // Merge with existing item values when editing to avoid accidental data loss
      const payload = {
        name: (formData.name || (editingItem && editingItem.name)) || '',
        designation: (formData.designation || (editingItem && editingItem.designation)) || '',
        facultyType: (formData.facultyType || (editingItem && editingItem.facultyType) || 'Internal Faculty'),
        department: (formData.department?.trim() || (editingItem && editingItem.department) || 'General'),
        email: (() => {
          const normalizedEmail = normalizeEmail((formData.email || (editingItem && editingItem.email)) || '');
          return normalizedEmail && normalizedEmail.trim() ? normalizedEmail : null;
        })(),
        phone: (formData.phone?.trim() || (editingItem && editingItem.phone)) || '',
        photo: (formData.photo || (editingItem && editingItem.photo)) || '',
        qualification: (formData.qualification?.trim() || (editingItem && editingItem.qualification)) || '',
        specialization: (formData.specialization?.trim() || (editingItem && editingItem.specialization)) || '',
        experience: (() => {
          if (typeof formData.experience === 'string') return formData.experience.trim();
          if (formData.experience != null && formData.experience !== '') return String(formData.experience).trim();
          if (editingItem && editingItem.experience != null && editingItem.experience !== '') return String(editingItem.experience).trim();
          return '';
        })(),
        googleScholar: (formData.googleScholar?.trim() || (editingItem && editingItem.googleScholar)) || '',
        linkedIn: (formData.linkedIn?.trim() || (editingItem && editingItem.linkedIn)) || '',
        researchGate: (formData.researchGate?.trim() || (editingItem && editingItem.researchGate)) || '',
        researchInterests: (formData.researchInterests?.trim() || (editingItem && editingItem.researchInterests)) || '',
        publications: (formData.publications?.trim() || (editingItem && editingItem.publications)) || '',
        mainSection: normalizeMainSectionPages(formData.mainSectionPages || (editingItem && editingItem.mainSection) || []),
        fullDetails: (textToList(formData.fullDetails).length > 0 ? textToList(formData.fullDetails) : (editingItem && (Array.isArray(editingItem.fullDetails) ? editingItem.fullDetails : toDetailArray(editingItem.fullDetails))) || []),
        fullDetailsHtml: (fullDetailsHtmlToSave && fullDetailsHtmlToSave.length > 0) ? fullDetailsHtmlToSave : ((editingItem && editingItem.fullDetailsHtml) || ''),
        isActive: !!formData.isActive
      };
      console.log('ManageFaculty payload preview:', { id: editingItem?.id, name: payload.name, researchInterests: payload.researchInterests, publications: payload.publications, fullDetailsHtmlLength: (payload.fullDetailsHtml || '').length, fullDetailsCount: (payload.fullDetails || []).length });
      console.log('📄 MainSection being saved:', payload.mainSection);
      console.log('🔢 MainSectionPages count:', (payload.mainSection || []).length);
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
              <div><label htmlFor="faculty-designation" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Designation *</label><select id="faculty-designation" required value={formData.designation} onChange={(e) => setFormData({ ...formData, designation: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"><option value="">-- Select Designation --</option><option value="Professor">Professor</option><option value="Associate Professor">Associate Professor</option><option value="Assistant Professor">Assistant Professor</option><option value="Adjunct Faculty">Adjunct Faculty</option><option value="Former Faculty">Former Faculty</option></select></div>
              <div><label htmlFor="faculty-type" className="block text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">Faculty Type</label><select id="faculty-type" value={formData.facultyType || 'Internal Faculty'} onChange={(e) => setFormData({ ...formData, facultyType: e.target.value })} className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"><option value="Internal Faculty">Internal Faculty</option><option value="Adjunct Faculty">Adjunct Faculty</option><option value="Former Faculty">Former Faculty</option></select><p className="text-xs text-slate-400 mt-1">Controls the group this member appears in on the faculty page.</p></div>
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
            <p className="text-xs text-slate-500">Enter rotating summary pages for the public faculty page. Each page supports up to 7 lines and 42 characters per line.</p>
          </div>

          <div className="space-y-4">
            {formData.mainSectionPages.map((page, index) => (
              <div key={`main-page-${index}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h5 className="text-sm font-semibold text-slate-900">Page {index + 1}</h5>
                    <p className="text-xs text-slate-500">Page content displays for 7 seconds, then fades to the next page.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => {
                        const next = [...prev.mainSectionPages];
                        next.splice(index, 1);
                        return { ...prev, mainSectionPages: next.length > 0 ? next : [''] };
                      });
                    }}
                    className="text-xs font-semibold text-red-600 hover:text-red-800"
                    disabled={formData.mainSectionPages.length === 1}
                  >
                    Remove page
                  </button>
                </div>
                <textarea
                  rows={7}
                  value={page}
                  onChange={(e) => {
                    const nextPage = normalizeMainSectionPage(e.target.value);
                    setFormData((prev) => {
                      const next = [...prev.mainSectionPages];
                      next[index] = nextPage;
                      return { ...prev, mainSectionPages: next };
                    });
                  }}
                  className="w-full min-h-[220px] resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Enter up to 7 lines, 42 characters per line"
                />
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>{page.split('\n').filter(Boolean).length} / {MAIN_SECTION_MAX_LINES} lines</span>
                  <span>Longest line {Math.max(...page.split('\n').map((line) => line.length), 0)} / {MAIN_SECTION_MAX_LINE_LENGTH} chars</span>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, mainSectionPages: [...prev.mainSectionPages, ''] }))}
              className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Plus className="h-4 w-4" />
              Add more page
            </button>
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
        </div>

        {/* Advanced Block Editor - Two Column Layout FULL WIDTH */}
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
              <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
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
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Text Formatting</p>
                <div className="flex flex-wrap gap-2 items-center">
                  {/* Inline Formats */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button 
                      type="button" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (paragraphEditorRef.current) {
                          paragraphEditorRef.current.applyInlineFormat('strong');
                        }
                      }} 
                      className={`w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 ${
                        activeFormats.bold 
                          ? 'text-white font-bold format-btn-active' 
                          : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                      }`}
                      style={activeFormats.bold ? { backgroundColor: API.color1 || '#239244' } : {}}
                      title="Bold"
                    >
                      <Bold className="h-4.5 w-4.5" />
                    </button>
                    <button 
                      type="button" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (paragraphEditorRef.current) {
                          paragraphEditorRef.current.applyInlineFormat('em');
                        }
                      }} 
                      className={`w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 ${
                        activeFormats.italic 
                          ? 'text-white format-btn-active' 
                          : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                      }`}
                      style={activeFormats.italic ? { backgroundColor: API.color1 || '#239244' } : {}}
                      title="Italic"
                    >
                      <Italic className="h-4.5 w-4.5" />
                    </button>
                    <button 
                      type="button" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (paragraphEditorRef.current) {
                          paragraphEditorRef.current.applyInlineFormat('u');
                        }
                      }} 
                      className={`w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 ${
                        activeFormats.underline 
                          ? 'text-white format-btn-active' 
                          : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                      }`}
                      style={activeFormats.underline ? { backgroundColor: API.color1 || '#239244' } : {}}
                      title="Underline"
                    >
                      <Underline className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Insert Actions */}
                  <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button 
                      type="button" 
                      onMouseDown={(e) => {
                        e.preventDefault();
                        if (paragraphEditorRef.current) {
                          paragraphEditorRef.current.insertLink();
                        }
                      }} 
                      className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 hover:text-slate-900 text-slate-600 transition-all duration-200 hover:scale-105 active:scale-95" 
                      title="Insert Link"
                    >
                      <LinkIcon className="h-4.5 w-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setPendingListType('ul');
                        setPendingListItemCount(0);
                        setTimeout(() => {
                          appendPendingListItem();
                        }, 50);
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 ${
                        pendingListType === 'ul' 
                          ? 'text-white format-btn-active' 
                          : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                      }`}
                      style={pendingListType === 'ul' ? { backgroundColor: API.color1 || '#239244' } : {}}
                      title="Bullet List"
                    >
                      <List className="h-4.5 w-4.5" />
                    </button>
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setPendingListType('ol');
                        setPendingListItemCount(0);
                        setTimeout(() => {
                          appendPendingListItem();
                        }, 50);
                      }}
                       className={`w-10 h-10 flex items-center justify-center rounded-lg hover:scale-105 active:scale-95 transition-all duration-200 ${
                        pendingListType === 'ol' 
                          ? 'text-white format-btn-active' 
                          : 'hover:bg-slate-100 hover:text-slate-900 text-slate-600'
                      }`}
                      style={pendingListType === 'ol' ? { backgroundColor: API.color1 || '#239244' } : {}}
                      title="Numbered List"
                    >
                      <ListOrdered className="h-4.5 w-4.5" />
                    </button>
                  </div>

                  {/* Clear Format */}
                  <button 
                    type="button" 
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (paragraphEditorRef.current) {
                        paragraphEditorRef.current.exec('removeFormat');
                      }
                    }} 
                    className="h-10 px-3 flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 text-xs font-semibold shadow-sm hover:scale-105 active:scale-95" 
                    title="Clear formatting"
                  >
                    <Eraser className="h-4 w-4" />
                    <span>Clear</span>
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
                onChange={(html) => updateDetailBuilderContent('text', sanitizeParagraphHtml(html))} 
                showToolbar={false}
              />
              {pendingListType && (
                <div className="flex flex-wrap gap-2 mt-3 animate-fadeIn">
                  <button
                    type="button"
                    onClick={() => {
                      appendPendingListItem();
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Add List Item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPendingListType(null);
                      setPendingListItemCount(0);
                    }}
                    className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg hover:scale-105 active:scale-95 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {content.text && (
              <div className="border-t pt-4">
                <label className="block text-sm font-bold text-slate-900 mb-3">Preview</label>
                <div 
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 content-html"
                  dangerouslySetInnerHTML={{ __html: formatParagraphText(content.text) }}
                  style={{
                    lineHeight: '1.75',
                    color: '#374151',
                    fontSize: '14px'
                  }}
                />
                <style>{`
                  div[dangerouslySetInnerHTML] strong,
                  div[dangerouslySetInnerHTML] b { font-weight: 700; }
                  div[dangerouslySetInnerHTML] em,
                  div[dangerouslySetInnerHTML] i { font-style: italic; }
                  div[dangerouslySetInnerHTML] u,
                  div[dangerouslySetInnerHTML] span[style*="text-decoration:underline"] { text-decoration: underline; }
                  div[dangerouslySetInnerHTML] a { color: #239244; font-weight: 700; text-decoration: none; }
                  div[dangerouslySetInnerHTML] a:hover { text-decoration: underline; }
                  div[dangerouslySetInnerHTML] ul { margin: 12px 0; padding-left: 20px; list-style-type: disc; list-style-position: outside; }
                  div[dangerouslySetInnerHTML] ol { margin: 12px 0; padding-left: 20px; list-style-type: decimal; list-style-position: outside; }
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
            <div>
              {fieldLabel('Image title')}
              <input
                type="text"
                placeholder="Enter image title"
                value={content.title || ''}
                onChange={(e) => updateDetailBuilderContent('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              {fieldLabel('Image')}
              <ImageUploader value={content.url || ''} onChange={(url) => updateDetailBuilderContent('url', url)} label="Upload image" folder="faculty" />
              <p className="text-xs text-slate-500 mt-2">Image size format: width x height (example: 800 x 600). You can also write: Size = width length height.</p>
            </div>
            <div>
              {fieldLabel('Alt text')}
              <input className="w-full px-3 py-2 border rounded-lg" placeholder="Alt text" value={content.alt || ''} onChange={(e) => updateDetailBuilderContent('alt', e.target.value)} />
            </div>
            <div>
              {fieldLabel('Caption')}
              <input
                type="text"
                placeholder="Enter caption (plain text only)"
                value={content.caption || ''}
                onChange={(e) => updateDetailBuilderContent('caption', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              {fieldLabel('Gallery title')}
              <input
                type="text"
                placeholder="Enter gallery title"
                value={content.title || ''}
                onChange={(e) => updateDetailBuilderContent('title', e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-1">
              <span className="font-semibold text-slate-800">💡 Gallery Image Guidelines:</span>
              <p>• Recommended Size: Square aspect ratio (1:1), e.g., <strong className="text-slate-800">800 &times; 800 px</strong> or higher.</p>
              <p>• Display format: 4 columns per row, centered, with individual image dimensions rendering as <strong className="text-slate-800">187.5px &times; 187.5px</strong>.</p>
            </div>
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
        return <div className="space-y-4"><input className="w-full px-3 py-2 border rounded-lg" placeholder="Table title" value={content.title || ''} onChange={(e) => updateDetailBuilderContent('title', e.target.value)} /><input className="w-full px-3 py-2 border rounded-lg" placeholder="Subtitle (optional)" value={content.subtitle || ''} onChange={(e) => updateDetailBuilderContent('subtitle', e.target.value)} /><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Headers</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('headers', '')}>+ Add Header</button></div>{(content.headers || []).map((header, index) => (<div key={index} className="flex gap-2 mb-2"><input className="flex-1 px-3 py-2 border rounded-lg" placeholder={`Header ${index + 1}`} value={header || ''} onChange={(e) => updateDetailBuilderArray('headers', index, e.target.value)} /><button type="button" className="px-3 py-2 text-red-600" onClick={() => removeDetailBuilderArrayItem('headers', index)}>×</button></div>))}</div><div><div className="flex items-center justify-between mb-2"><span className="text-sm font-semibold text-gray-700">Rows</span><button type="button" className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700" onClick={() => addDetailBuilderArrayItem('rows', Array(Math.max((content.headers || []).length, 1)).fill(''))}>+ Add Row</button></div>{(content.rows || []).map((row, rowIndex) => (<div key={rowIndex} className="rounded-lg border bg-white p-3 mb-2"><div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.max((content.headers || []).length, 1)}, minmax(0, 1fr))` }}>{Array(Math.max((content.headers || []).length, 1)).fill(null).map((_, cellIndex) => (<input key={cellIndex} className="w-full px-3 py-2 border rounded-lg" placeholder={`R${rowIndex + 1}C${cellIndex + 1}`} value={(row && row[cellIndex]) || ''} onChange={(e) => { const nextRows = [...(content.rows || [])]; const nextRow = Array.isArray(nextRows[rowIndex]) ? [...nextRows[rowIndex]] : []; nextRow[cellIndex] = e.target.value; nextRows[rowIndex] = nextRow; updateDetailBuilderContent('rows', nextRows); }} />))}</div></div>))}</div></div>;
      case 'statistics':
        return (
          <div className="space-y-4">
            {formatGuide}
            {richField('Section Title', content.title, (html) => updateDetailBuilderContent('title', html))}
            {(content.stats || []).map((stat, index) => (
              <div key={index} className="rounded-lg border bg-white p-3">
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input className="w-full px-3 py-2 border rounded-lg" placeholder="Value" value={stat.value || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], value: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} />
                  <input className="w-full px-3 py-2 border rounded-lg" placeholder="Label" value={stat.label || ''} onChange={(e) => { const nextStats = [...(content.stats || [])]; nextStats[index] = { ...nextStats[index], label: e.target.value }; updateDetailBuilderContent('stats', nextStats); }} />
                </div>
                <button type="button" className="text-xs text-red-600" onClick={() => removeDetailBuilderArrayItem('stats', index)}>Remove statistic</button>
              </div>
            ))}
            <button type="button" className="px-3 py-2 text-sm text-green-700 border border-green-600 rounded-lg hover:bg-green-50" onClick={() => addDetailBuilderArrayItem('stats', { value: '', label: '' })}>+ Add Statistic</button>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-900 mb-3">Preview</div>
              <div dangerouslySetInnerHTML={{ __html: buildDetailBlockHtml('statistics', content) }} />
            </div>
          </div>
        );
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

      {[
        { type: 'Internal Faculty', title: 'Internal Faculty' },
        { type: 'Adjunct Faculty', title: 'Adjunct Faculty' },
        { type: 'Former Faculty', title: 'Former Faculty' }
      ].map(({ type, title }) => {
        const sectionItems = filteredFaculty
          .filter((member) => (member.facultyType || 'Internal Faculty') === type)
          .sort((a, b) => {
            const order = sortOrders[type] || 'newest';
            return order === 'newest' ? b.id - a.id : a.id - b.id;
          });

        return (
          <div key={type} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-50 text-emerald-700">
                  {sectionItems.length}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Default Sort:</label>
                <select
                  value={sortOrders[type] || 'newest'}
                  onChange={(e) => handleSortOrderChange(type, e.target.value)}
                  className="text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white text-slate-700 cursor-pointer shadow-sm"
                >
                  <option value="newest">Last Added</option>
                  <option value="oldest">First Added</option>
                </select>
              </div>
            </div>

            {sectionItems.length === 0 ? (
              <div className="text-center py-8 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                <p className="text-sm text-slate-500">No {title.toLowerCase()} cards found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sectionItems.map((member) => (
                  <div key={member.id} className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border ${!member.isActive ? 'border-amber-300 bg-amber-50/20 opacity-80' : 'border-slate-100'}`}>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-16 w-16 rounded-full overflow-hidden border-2 bg-slate-100" style={{ borderColor: `${API.color1}33` }}>
                          <img src={member.photo ? API.getImageUrl(member.photo) : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`} alt={member.name} className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=200&background=239244&color=ffffff&bold=true`; }} />
                        </div>
                        <div className="flex items-center gap-2">
                          {!member.isActive && (
                            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 rounded-full">
                              Draft / Inactive
                            </span>
                          )}
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
            )}
          </div>
        );
      })}

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

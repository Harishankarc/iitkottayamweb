import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * ContentBlock Model
 * Represents individual content blocks/elements within a page
 * Each block can be text, image, video, gallery, etc. with full design control
 */
const ContentBlock = sequelize.define('ContentBlock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  
  // Block Identification
  blockId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Unique identifier for this block (e.g., "hero-section", "intro-text")'
  },
  
  pageName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'Associated page name'
  },
  
  sectionName: {
    type: DataTypes.STRING(100),
    allowNull: true,
    comment: 'Section name if block belongs to a specific section'
  },
  
  // Block Type
  blockType: {
    type: DataTypes.ENUM(
      'text',           // Rich text content
      'heading',        // Headings (H1-H6)
      'paragraph',      // Paragraph text
      'image',          // Single image
      'gallery',        // Image gallery
      'video',          // Video embed
      'button',         // Call-to-action button
      'link',           // Hyperlink
      'list',           // Bullet/numbered list
      'table',          // Data table
      'statistics',     // Stats/numbers display
      'card',           // Card component
      'hero',           // Hero banner
      'divider',        // Horizontal divider
      'spacer',         // Empty space
      'icon',           // Icon element
      'quote',          // Blockquote
      'code',           // Code snippet
      'accordion',      // Collapsible content
      'tabs',           // Tabbed content
      'carousel',       // Image/content carousel
      'map',            // Embedded map
      'form',           // Form element
      'custom'          // Custom HTML/component
    ),
    allowNull: false,
    defaultValue: 'text'
  },
  
  // Content
  content: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('content');
      try {
        return rawValue ? JSON.parse(rawValue) : {};
      } catch {
        return { text: rawValue };
      }
    },
    set(value) {
      this.setDataValue('content', typeof value === 'string' ? value : JSON.stringify(value));
    },
    comment: 'Block content - structure varies by blockType'
  },
  
  // Styling Properties
  styling: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('styling');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('styling', JSON.stringify(value));
    },
    comment: 'CSS-like styling: colors, fonts, spacing, borders, shadows, etc.'
  },
  
  // Layout Properties
  layout: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('layout');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('layout', JSON.stringify(value));
    },
    comment: 'Layout settings: width, alignment, columns, flex, grid, etc.'
  },
  
  // Responsive Settings
  responsive: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('responsive');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('responsive', JSON.stringify(value));
    },
    comment: 'Responsive breakpoints and settings for mobile/tablet/desktop'
  },
  
  // Animation & Effects
  animation: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('animation');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('animation', JSON.stringify(value));
    },
    comment: 'Animation settings: fade, slide, zoom, etc.'
  },
  
  // Order & Visibility
  blockOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Display order within section/page'
  },
  
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    comment: 'Visibility toggle'
  },
  
  // Metadata
  blockLabel: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: 'Admin label for this block'
  },
  
  blockDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: 'Admin description/notes'
  },
  
  customClasses: {
    type: DataTypes.STRING(500),
    allowNull: true,
    comment: 'Custom CSS classes'
  },
  
  customAttributes: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue('customAttributes');
      return rawValue ? JSON.parse(rawValue) : {};
    },
    set(value) {
      this.setDataValue('customAttributes', JSON.stringify(value));
    },
    comment: 'Custom HTML attributes'
  }
}, {
  tableName: 'content_blocks',
  timestamps: true
});

export default ContentBlock;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const PageContent = sequelize.define('PageContent', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  pageName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true // e.g., "homepage", "why-iiitk", "admission", "governance"
  },
  pageTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pageSlug: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100) // e.g., "institute", "course", "people", "facilities"
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  metaKeywords: {
    type: DataTypes.TEXT
  },
  // All actual content (hero, paragraphs, images, etc.) is now stored in content_blocks table
  // This table only contains page metadata and settings
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'page_contents',
  timestamps: true
});

export default PageContent;

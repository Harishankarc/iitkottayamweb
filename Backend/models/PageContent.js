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
  // Hero/Banner Section
  heroImage: {
    type: DataTypes.STRING(500)
  },
  heroTitle: {
    type: DataTypes.STRING(500)
  },
  heroSubtitle: {
    type: DataTypes.TEXT
  },
  // Dynamic sections - can contain any type of content
  sections: {
    type: DataTypes.TEXT, // JSON array of content sections
    allowNull: true,
    defaultValue: '[]',
    get() {
      const raw = this.getDataValue('sections');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('sections', JSON.stringify(val));
    }
  },
  // Additional structured data
  content: {
    type: DataTypes.TEXT('long'), // Main content/description
  },
  sidebar: {
    type: DataTypes.TEXT, // JSON for sidebar content
    get() {
      const raw = this.getDataValue('sidebar');
      return raw ? JSON.parse(raw) : null;
    },
    set(val) {
      this.setDataValue('sidebar', JSON.stringify(val));
    }
  },
  customFields: {
    type: DataTypes.TEXT, // JSON for any custom fields specific to the page
    get() {
      const raw = this.getDataValue('customFields');
      return raw ? JSON.parse(raw) : {};
    },
    set(val) {
      this.setDataValue('customFields', JSON.stringify(val));
    }
  },
  layout: {
    type: DataTypes.TEXT, // JSON for page-level layout settings
    get() {
      const raw = this.getDataValue('layout');
      return raw ? JSON.parse(raw) : {};
    },
    set(val) {
      this.setDataValue('layout', JSON.stringify(val));
    }
  },
  navigationGroup: {
    type: DataTypes.STRING(100), // Navigation group (institute, course, etc.)
    allowNull: true
  },
  parentPage: {
    type: DataTypes.STRING(100), // Parent page if this is a sub-page
    allowNull: true
  },
  pageOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'page_contents',
  timestamps: true
});

export default PageContent;

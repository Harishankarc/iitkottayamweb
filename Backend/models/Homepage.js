import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Homepage = sequelize.define('Homepage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Vision & Mission
  visionTitle: {
    type: DataTypes.STRING(255),
    defaultValue: 'Vision'
  },
  visionContent: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  visionLink: {
    type: DataTypes.STRING(255)
  },
  missionTitle: {
    type: DataTypes.STRING(255),
    defaultValue: 'Mission'
  },
  missionContent: {
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const raw = this.getDataValue('missionContent');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('missionContent', JSON.stringify(val));
    }
  },
  
  // Placement Statistics
  highestPackage: {
    type: DataTypes.STRING(50),
    defaultValue: '45 LPA'
  },
  averagePackage: {
    type: DataTypes.STRING(50),
    defaultValue: '14 LPA'
  },
  companiesVisited: {
    type: DataTypes.STRING(50),
    defaultValue: '100+'
  },
  placementRate: {
    type: DataTypes.STRING(50),
    defaultValue: '95%'
  },
  placementImage: {
    type: DataTypes.STRING(500)
  },
  
  // Quick Links
  quickLinks: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('quickLinks');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('quickLinks', JSON.stringify(val));
    }
  },
  
  // Newsletter
  newsletterTitle: {
    type: DataTypes.STRING(255),
    defaultValue: 'Stay Connected'
  },
  newsletterSubtitle: {
    type: DataTypes.STRING(255),
    defaultValue: 'Subscribe for the latest news and updates from IIIT Kottayam.'
  },
  
  // SEO
  metaTitle: {
    type: DataTypes.STRING(255)
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  metaKeywords: {
    type: DataTypes.TEXT
  },
  
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'homepage_settings',
  timestamps: true
});

export default Homepage;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Footer = sequelize.define('Footer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  section: {
    type: DataTypes.STRING(50),
    allowNull: false,
    comment: 'e.g., about, quickLinks, contact, social'
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    comment: 'Can be JSON for structured data'
  },
  links: {
    type: DataTypes.TEXT,
    comment: 'JSON array of {label, url} objects'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'footer',
  timestamps: true
});

export default Footer;

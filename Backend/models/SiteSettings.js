import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SiteSettings = sequelize.define('SiteSettings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  settingKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    comment: 'e.g., site_logo, site_title, contact_email'
  },
  settingValue: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  settingType: {
    type: DataTypes.ENUM('text', 'image', 'json', 'boolean', 'number'),
    defaultValue: 'text'
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general',
    comment: 'e.g., general, contact, social, appearance'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'site_settings',
  timestamps: true
});

export default SiteSettings;

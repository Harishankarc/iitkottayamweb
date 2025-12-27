import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Media = sequelize.define('Media', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  source: {
    type: DataTypes.STRING(100),
    allowNull: false // e.g., "Mathrubhumi", "The Hindu", "YouTube"
  },
  type: {
    type: DataTypes.ENUM('news', 'video', 'article', 'press-release'),
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING(255)
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  publishDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  excerpt: {
    type: DataTypes.TEXT
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'media',
  timestamps: true
});

export default Media;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Gallery = sequelize.define('Gallery', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  eventTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  eventDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('academic', 'cultural', 'sports', 'technical', 'seminar', 'other'),
    defaultValue: 'other'
  },
  images: {
    type: DataTypes.TEXT, // JSON array of image URLs
    get() {
      const raw = this.getDataValue('images');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('images', JSON.stringify(val));
    }
  },
  thumbnail: {
    type: DataTypes.STRING(255) // Featured/cover image
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'gallery',
  timestamps: true
});

export default Gallery;

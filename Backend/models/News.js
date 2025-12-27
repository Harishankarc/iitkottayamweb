import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const News = sequelize.define('News', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  excerpt: {
    type: DataTypes.STRING(500)
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general'
  },
  image: {
    type: DataTypes.STRING(255)
  },
  author: {
    type: DataTypes.STRING(100)
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  publishedDate: {
    type: DataTypes.DATE
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isNew: {
    type: DataTypes.VIRTUAL,
    get() {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return this.createdAt > sevenDaysAgo;
    }
  }
}, {
  tableName: 'news',
  timestamps: true
});

export default News;

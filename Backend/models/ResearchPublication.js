import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ResearchPublication = sequelize.define('ResearchPublication', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  authors: {
    type: DataTypes.TEXT, // JSON array
    allowNull: false,
    get() {
      const raw = this.getDataValue('authors');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('authors', JSON.stringify(val));
    }
  },
  publicationType: {
    type: DataTypes.ENUM('journal', 'conference', 'book-chapter', 'patent', 'thesis'),
    allowNull: false
  },
  venue: {
    type: DataTypes.STRING(500) // Journal/Conference name
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  volume: {
    type: DataTypes.STRING(50)
  },
  pages: {
    type: DataTypes.STRING(50)
  },
  doi: {
    type: DataTypes.STRING(255)
  },
  abstract: {
    type: DataTypes.TEXT
  },
  keywords: {
    type: DataTypes.TEXT, // JSON array
    get() {
      const raw = this.getDataValue('keywords');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('keywords', JSON.stringify(val));
    }
  },
  pdfLink: {
    type: DataTypes.STRING(500)
  },
  externalLink: {
    type: DataTypes.STRING(500)
  },
  department: {
    type: DataTypes.STRING(100)
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
  tableName: 'research_publications',
  timestamps: true
});

export default ResearchPublication;

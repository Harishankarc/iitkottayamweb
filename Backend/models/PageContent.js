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
    unique: true // e.g., "about", "admission", "governance"
  },
  pageTitle: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  metaDescription: {
    type: DataTypes.TEXT
  },
  sections: {
    type: DataTypes.TEXT, // JSON array of content sections
    allowNull: false,
    get() {
      const raw = this.getDataValue('sections');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('sections', JSON.stringify(val));
    }
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'page_contents',
  timestamps: true
});

export default PageContent;

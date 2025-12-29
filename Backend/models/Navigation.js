import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Navigation = sequelize.define('Navigation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  label: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  path: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Parent menu item ID for nested menus'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  icon: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  isExternal: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  children: {
    type: DataTypes.TEXT,
    comment: 'JSON array of child menu items'
  }
}, {
  tableName: 'navigation',
  timestamps: true
});

export default Navigation;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const CompanyLogo = sequelize.define('CompanyLogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  category: {
    type: DataTypes.ENUM('incubation', 'collaboration', 'placement', 'partner'),
    defaultValue: 'partner'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'company_logos',
  timestamps: true
});

export default CompanyLogo;

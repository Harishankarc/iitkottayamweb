import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Placement = sequelize.define('Placement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  academicYear: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  companyLogo: {
    type: DataTypes.STRING(255)
  },
  sector: {
    type: DataTypes.STRING(100)
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  package: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  studentsPlaced: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  visitDate: {
    type: DataTypes.DATE
  },
  description: {
    type: DataTypes.TEXT
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'placements',
  timestamps: true
});

export default Placement;

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FdpProgram = sequelize.define('FdpProgram', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  slNo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  topic: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  programme: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  coordinator: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  brochureUrl: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'fdp_programs',
  timestamps: true
});

export default FdpProgram;

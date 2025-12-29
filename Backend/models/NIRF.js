import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const NIRF = sequelize.define('NIRF', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    comment: 'e.g., Engineering, Overall, Architecture & Planning'
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  change: {
    type: DataTypes.ENUM('up', 'down', 'same'),
    defaultValue: 'same'
  },
  previousRank: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  score: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'nirf_rankings',
  timestamps: true
});

export default NIRF;

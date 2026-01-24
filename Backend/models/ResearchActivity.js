import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ResearchActivity = sequelize.define('ResearchActivity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  activityType: {
    type: DataTypes.ENUM('invited-talk', 'seminar', 'workshop', 'conference', 'fdp', 'webinar', 'other'),
    allowNull: false
  },
  serialNumber: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  faculty: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  topic: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  institution: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  activityDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  venue: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  duration: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  participants: {
    type: DataTypes.INTEGER,
    allowNull: true
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
  tableName: 'research_activities',
  timestamps: true
});

export default ResearchActivity;

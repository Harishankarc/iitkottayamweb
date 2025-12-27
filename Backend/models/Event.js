import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING(50),
    defaultValue: 'general'
  },
  image: {
    type: DataTypes.STRING(255)
  },
  venue: {
    type: DataTypes.STRING(255)
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE
  },
  organizer: {
    type: DataTypes.STRING(100)
  },
  registrationLink: {
    type: DataTypes.STRING(255)
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  attendees: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'events',
  timestamps: true
});

export default Event;

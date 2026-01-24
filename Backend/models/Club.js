import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Club = sequelize.define('Club', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  slug: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('technical', 'cultural', 'sports', 'innovation', 'ieee', 'acm', 'security', 'other'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mission: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  vision: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  logo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  coverImage: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  facultyCoordinators: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('facultyCoordinators');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('facultyCoordinators', JSON.stringify(val));
    }
  },
  studentLeads: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('studentLeads');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('studentLeads', JSON.stringify(val));
    }
  },
  activities: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('activities');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('activities', JSON.stringify(val));
    }
  },
  achievements: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('achievements');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('achievements', JSON.stringify(val));
    }
  },
  gallery: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('gallery');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('gallery', JSON.stringify(val));
    }
  },
  socialLinks: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('socialLinks');
      return raw ? JSON.parse(raw) : {};
    },
    set(val) {
      this.setDataValue('socialLinks', JSON.stringify(val));
    }
  },
  contactEmail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  contactPhone: {
    type: DataTypes.STRING(20),
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
  tableName: 'clubs',
  timestamps: true
});

export default Club;

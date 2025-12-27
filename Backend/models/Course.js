import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false // e.g., "B.Tech in Computer Science and Engineering"
  },
  shortName: {
    type: DataTypes.STRING(50),
    allowNull: false // e.g., "B.Tech CSE"
  },
  slug: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false // e.g., "btech-cse"
  },
  program: {
    type: DataTypes.ENUM('B.Tech', 'M.Tech', 'Ph.D'),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false // CSE, ECE, AI&DS, Cyber Security
  },
  duration: {
    type: DataTypes.STRING(50) // e.g., "4 Years"
  },
  totalSeats: {
    type: DataTypes.INTEGER
  },
  description: {
    type: DataTypes.TEXT
  },
  eligibility: {
    type: DataTypes.TEXT
  },
  objectives: {
    type: DataTypes.TEXT, // JSON array
    get() {
      const raw = this.getDataValue('objectives');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('objectives', JSON.stringify(val));
    }
  },
  curriculum: {
    type: DataTypes.TEXT // JSON object with semester-wise subjects
  },
  feeStructure: {
    type: DataTypes.TEXT, // JSON array/object
    get() {
      const raw = this.getDataValue('feeStructure');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('feeStructure', JSON.stringify(val));
    }
  },
  labImages: {
    type: DataTypes.TEXT, // JSON array of lab/facility images
    get() {
      const raw = this.getDataValue('labImages');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('labImages', JSON.stringify(val));
    }
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
  tableName: 'courses',
  timestamps: true
});

export default Course;

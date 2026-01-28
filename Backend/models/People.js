import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const People = sequelize.define('People', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: {
      isEmail: {
        msg: 'Please provide a valid email address'
      }
    },
    set(value) {
      // If empty string, set to null to avoid validation
      this.setDataValue('email', value === '' ? null : value);
    }
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  photo: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  qualification: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  specialization: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  experience: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  userType: {
    type: DataTypes.ENUM(
      'administration',
      'hod',
      'faculty',
      'technical-staff',
      'support-staff',
      'research-scholars',
      'btech-students',
      'mtech-students',
      'gender-index'
    ),
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'people',
  timestamps: true
});

export default People;

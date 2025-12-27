import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  rollNumber: {
    type: DataTypes.STRING(50),
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  photo: {
    type: DataTypes.STRING(255)
  },
  program: {
    type: DataTypes.ENUM('B.Tech', 'M.Tech', 'Ph.D'),
    allowNull: false
  },
  branch: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  batch: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  currentSemester: {
    type: DataTypes.INTEGER
  },
  cgpa: {
    type: DataTypes.DECIMAL(4, 2)
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'students',
  timestamps: true
});

export default Student;

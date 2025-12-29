import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  phone: {
    type: DataTypes.STRING(20)
  },
  subject: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('general', 'admission', 'recruitment', 'academic', 'technical', 'other'),
    defaultValue: 'general'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'resolved', 'closed'),
    defaultValue: 'pending'
  },
  assignedTo: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  notes: {
    type: DataTypes.TEXT
  },
  ipAddress: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'contacts',
  timestamps: true
});

export default Contact;

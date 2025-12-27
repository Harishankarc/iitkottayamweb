import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Faculty = sequelize.define('Faculty', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  designation: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  department: {
    type: DataTypes.STRING(100),
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
  qualification: {
    type: DataTypes.STRING(255)
  },
  specialization: {
    type: DataTypes.TEXT
  },
  experience: {
    type: DataTypes.INTEGER
  },
  researchInterests: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('researchInterests');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('researchInterests', JSON.stringify(val));
    }
  },
  publications: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('publications');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('publications', JSON.stringify(val));
    }
  },
  googleScholar: {
    type: DataTypes.STRING(255)
  },
  linkedIn: {
    type: DataTypes.STRING(255)
  },
  researchGate: {
    type: DataTypes.STRING(255)
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'faculty',
  timestamps: true
});

export default Faculty;

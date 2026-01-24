import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Facility = sequelize.define('Facility', {
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
    type: DataTypes.ENUM('hostel', 'gym', 'sports', 'medical', 'mess', 'internet', 'security', 'library', 'other'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  images: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('images');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('images', JSON.stringify(val));
    }
  },
  contact: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('contact');
      return raw ? JSON.parse(raw) : null;
    },
    set(val) {
      this.setDataValue('contact', JSON.stringify(val));
    }
  },
  timings: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('timings');
      return raw ? JSON.parse(raw) : null;
    },
    set(val) {
      this.setDataValue('timings', JSON.stringify(val));
    }
  },
  amenities: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('amenities');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('amenities', JSON.stringify(val));
    }
  },
  wardens: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('wardens');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('wardens', JSON.stringify(val));
    }
  },
  halls: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('halls');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('halls', JSON.stringify(val));
    }
  },
  customFields: {
    type: DataTypes.TEXT,
    allowNull: true,
    get() {
      const raw = this.getDataValue('customFields');
      return raw ? JSON.parse(raw) : {};
    },
    set(val) {
      this.setDataValue('customFields', JSON.stringify(val));
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
  tableName: 'facilities',
  timestamps: true
});

export default Facility;

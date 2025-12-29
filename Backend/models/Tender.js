import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Tender = sequelize.define('Tender', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tenderNumber: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  title: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  category: {
    type: DataTypes.ENUM('civil', 'electrical', 'it', 'procurement', 'services', 'other'),
    defaultValue: 'other'
  },
  status: {
    type: DataTypes.ENUM('live', 'closed', 'cancelled', 'awarded'),
    defaultValue: 'live'
  },
  publishDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  estimatedValue: {
    type: DataTypes.DECIMAL(15, 2)
  },
  emdAmount: {
    type: DataTypes.DECIMAL(15, 2)
  },
  documentUrl: {
    type: DataTypes.STRING(500)
  },
  documentPassword: {
    type: DataTypes.STRING(100)
  },
  corrigendum: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('corrigendum');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('corrigendum', JSON.stringify(val));
    }
  },
  contactPerson: {
    type: DataTypes.STRING(255)
  },
  contactEmail: {
    type: DataTypes.STRING(255)
  },
  contactPhone: {
    type: DataTypes.STRING(20)
  },
  awardedTo: {
    type: DataTypes.STRING(255)
  },
  awardedAmount: {
    type: DataTypes.DECIMAL(15, 2)
  },
  awardedDate: {
    type: DataTypes.DATE
  },
  isPublished: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'tenders',
  timestamps: true
});

export default Tender;

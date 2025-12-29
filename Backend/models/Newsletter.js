import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Newsletter = sequelize.define('Newsletter', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.ENUM('subscribed', 'unsubscribed', 'bounced'),
    defaultValue: 'subscribed'
  },
  subscribedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  unsubscribedAt: {
    type: DataTypes.DATE
  },
  ipAddress: {
    type: DataTypes.STRING(50)
  },
  source: {
    type: DataTypes.STRING(100),
    defaultValue: 'website'
  },
  tags: {
    type: DataTypes.TEXT,
    get() {
      const raw = this.getDataValue('tags');
      return raw ? JSON.parse(raw) : [];
    },
    set(val) {
      this.setDataValue('tags', JSON.stringify(val));
    }
  }
}, {
  tableName: 'newsletters',
  timestamps: true
});

export default Newsletter;

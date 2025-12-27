import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const HeroSlider = sequelize.define('HeroSlider', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  subtitle: {
    type: DataTypes.STRING(500)
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  buttonText: {
    type: DataTypes.STRING(100)
  },
  buttonLink: {
    type: DataTypes.STRING(255)
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'hero_sliders',
  timestamps: true
});

export default HeroSlider;

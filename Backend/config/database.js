import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Database Config:', {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  database: process.env.DB_NAME || 'iitkottayam',
  port: process.env.DB_PORT || 3306
});

const sequelize = new Sequelize(
  process.env.DB_NAME || 'iitkottayam',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || '127.0.0.1',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: false
    }
  }
);

export default sequelize;

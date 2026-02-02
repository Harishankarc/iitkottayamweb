const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'iiitkottayam',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

async function checkMediaContent() {
  try {
    await sequelize.authenticate();

    const [results] = await sequelize.query(`
      SELECT id, blockType, content 
      FROM content_blocks 
      WHERE pageName = "media"
      ORDER BY blockOrder
    `);

    console.log('Media blocks:\n');
    results.forEach((block) => {
      console.log(`Block ${block.id} (${block.blockType}):`);
      console.log(block.content);
      console.log('');
    });

    await sequelize.close();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

checkMediaContent();

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

async function cleanupMedia() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Delete old duplicates (196, 197 - keeping newer ones 640, 641, 642)
    await sequelize.query(`DELETE FROM content_blocks WHERE id IN (196, 197)`);
    console.log('✅ Deleted duplicate blocks\n');

    const [results] = await sequelize.query(`
      SELECT id, blockId, blockType, blockOrder 
      FROM content_blocks 
      WHERE pageName = "media"
      ORDER BY blockOrder
    `);

    console.log('Current media page blocks:');
    results.forEach(block => {
      console.log(`  - ${block.blockType} (ID: ${block.id}, Order: ${block.blockOrder})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupMedia();

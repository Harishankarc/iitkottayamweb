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

async function deleteBlock() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    await sequelize.query(`DELETE FROM content_blocks WHERE id = 638`);
    console.log('✅ Deleted broken gallery block (ID: 638)\n');

    const [results] = await sequelize.query(`
      SELECT id, blockType, blockOrder 
      FROM content_blocks 
      WHERE pageName = "placements"
      ORDER BY blockOrder
    `);

    console.log('Remaining blocks:');
    results.forEach(block => {
      console.log(`  - ID ${block.id}: ${block.blockType} (order: ${block.blockOrder})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

deleteBlock();

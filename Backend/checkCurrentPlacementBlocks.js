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

async function checkBlocks() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    const [results] = await sequelize.query(`
      SELECT id, blockId, blockType, content, blockOrder, createdAt 
      FROM content_blocks 
      WHERE pageName = "placements"
      ORDER BY blockOrder
    `);

    console.log(`Found ${results.length} blocks for placements page:\n`);

    results.forEach((block, index) => {
      console.log(`Block ${index + 1}:`);
      console.log(`  ID: ${block.id}`);
      console.log(`  Type: ${block.blockType}`);
      console.log(`  Order: ${block.blockOrder}`);
      console.log(`  Created: ${block.createdAt}`);
      
      if (block.blockType === 'gallery' || block.blockType === 'image') {
        const content = JSON.parse(block.content);
        console.log(`  Content:`, JSON.stringify(content, null, 2));
        
        // Check for Windows paths
        if (block.blockType === 'gallery' && content.images) {
          content.images.forEach((img, i) => {
            if (img.url && img.url.includes('C:\\')) {
              console.log(`  ⚠️ WARNING: Image ${i + 1} has Windows path!`);
            }
          });
        } else if (block.blockType === 'image' && content.url && content.url.includes('C:\\')) {
          console.log(`  ⚠️ WARNING: Has Windows path!`);
        }
      }
      console.log('');
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkBlocks();

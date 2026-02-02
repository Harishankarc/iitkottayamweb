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

async function seedMediaPage() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    const blocks = [
      {
        blockId: 'media-hero',
        pageName: 'media',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'IIIT Kottayam in the Media',
          subtitle: 'Media Coverage & Press Releases',
          alignment: 'center'
        }),
        blockOrder: 0,
        isVisible: true
      },
      {
        blockId: 'media-intro',
        pageName: 'media',
        blockType: 'paragraph',
        content: JSON.stringify({
          text: 'Stay updated with the latest news, media coverage, and press releases about IIIT Kottayam. Our institute has been featured in various national and regional media outlets for its academic excellence, research contributions, and campus initiatives.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      {
        blockId: 'media-info',
        pageName: 'media',
        blockType: 'heading',
        content: JSON.stringify({
          text: 'Content for this page is being updated. Please check back soon for more information.',
          level: 3,
          alignment: 'center'
        }),
        blockOrder: 2,
        isVisible: true
      }
    ];

    for (const block of blocks) {
      await sequelize.query(`
        INSERT INTO content_blocks 
        (blockId, pageName, blockType, content, blockOrder, isVisible, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, {
        replacements: [
          block.blockId,
          block.pageName,
          block.blockType,
          block.content,
          block.blockOrder,
          block.isVisible
        ]
      });
    }

    console.log(`✅ Successfully seeded ${blocks.length} blocks for media page\n`);

    const [results] = await sequelize.query(`
      SELECT id, blockId, blockType, blockOrder 
      FROM content_blocks 
      WHERE pageName = "media"
      ORDER BY blockOrder
    `);

    console.log('Created blocks:');
    results.forEach(block => {
      console.log(`  - ${block.blockType} (ID: ${block.id}, Order: ${block.blockOrder})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedMediaPage();

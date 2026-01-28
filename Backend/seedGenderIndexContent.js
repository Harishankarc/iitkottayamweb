import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedGenderIndexContent() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    console.log('🔄 Starting to seed Gender Index content...\n');

    // Clear existing content for gender-index page
    await connection.execute(`DELETE FROM content_blocks WHERE pageName = 'gender-index'`);
    console.log('✅ Cleared existing Gender Index content\n');

    const contentBlocks = [
      {
        blockId: 'hero-section',
        pageName: 'gender-index',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Gender Index',
          subtitle: 'Diversity & Inclusion',
          description: 'Statistical overview of gender distribution at IIIT Kottayam.'
        }),
        orderIndex: 1
      },
      {
        blockId: 'gender-stats-table',
        pageName: 'gender-index',
        blockType: 'table',
        content: JSON.stringify({
          title: 'IIIT Kottayam - Gender Statistics',
          headers: ['Gender', 'Category', 'Count'],
          rows: [
            ['Male', 'IIIT Kottayam', '753'],
            ['Female', 'IIIT Kottayam', '144'],
            ['Total', 'IIIT Kottayam', '897'],
            ['Male', 'Professional & Technical', '36'],
            ['Female', 'Professional & Technical', '27'],
            ['Total', 'Professional & Technical', '63']
          ]
        }),
        orderIndex: 2
      }
    ];

    for (const block of contentBlocks) {
      await connection.execute(
        `INSERT INTO content_blocks (blockId, pageName, blockType, content, blockOrder, isVisible, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          block.blockId,
          block.pageName,
          block.blockType,
          block.content,
          block.orderIndex,
          true
        ]
      );
      console.log(`✅ Added ${block.blockType} block: ${block.blockId}`);
    }

    console.log(`\n🎉 Successfully seeded ${contentBlocks.length} content blocks for Gender Index!`);
    console.log('\n📝 Note: You can now edit this content from Content Management > Manage Pages > Gender Index');

  } catch (error) {
    console.error('❌ Error seeding Gender Index content:', error);
  } finally {
    await connection.end();
  }
}

seedGenderIndexContent();

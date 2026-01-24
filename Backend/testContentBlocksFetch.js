import sequelize from './config/database.js';

async function testContentBlocks() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Test 1: Check total blocks
    const [totalBlocks] = await sequelize.query(`
      SELECT COUNT(*) as total FROM content_blocks
    `);
    console.log(`Total content blocks: ${totalBlocks[0].total}\n`);

    // Test 2: Sample blocks by page
    const [blocksByPage] = await sequelize.query(`
      SELECT pageName, COUNT(*) as blockCount 
      FROM content_blocks 
      GROUP BY pageName 
      ORDER BY blockCount DESC 
      LIMIT 10
    `);
    console.log('Top 10 pages with most blocks:');
    blocksByPage.forEach(r => console.log(`  ${r.pageName}: ${r.blockCount} blocks`));

    // Test 3: Check a specific page (homepage)
    const [homepageBlocks] = await sequelize.query(`
      SELECT blockId, blockType, blockLabel, isVisible, blockOrder
      FROM content_blocks 
      WHERE pageName = 'homepage'
      ORDER BY blockOrder
    `);
    console.log('\nHomepage blocks:');
    if (homepageBlocks.length === 0) {
      console.log('  ⚠️  No blocks found for homepage!');
    } else {
      homepageBlocks.forEach(b => console.log(`  [${b.blockOrder}] ${b.blockLabel} (${b.blockType}) - ${b.isVisible ? 'Visible' : 'Hidden'}`));
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

testContentBlocks();

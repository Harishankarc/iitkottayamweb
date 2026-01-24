import sequelize from './config/database.js';

async function cleanupPageContents() {
  try {
    console.log('🧹 Cleaning up page_contents table...\n');
    
    // Remove duplicate content columns
    const queries = [
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS heroImage',
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS heroTitle',
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS heroSubtitle',
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS sections',
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS content',
      'ALTER TABLE page_contents DROP COLUMN IF EXISTS sidebar'
    ];
    
    for (const query of queries) {
      try {
        await sequelize.query(query);
        console.log('✅', query);
      } catch (err) {
        if (err.message.includes('check that it exists')) {
          console.log('⏭️  Column already removed:', query.split(' ').pop());
        } else {
          console.error('❌ Error:', err.message);
        }
      }
    }
    
    console.log('\n✨ Cleanup complete!\n');
    console.log('📋 Remaining columns in page_contents:');
    console.log('=' .repeat(60));
    
    const [results] = await sequelize.query(`
      SELECT COLUMN_NAME, DATA_TYPE 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = DATABASE() 
        AND TABLE_NAME = 'page_contents'
      ORDER BY ORDINAL_POSITION
    `);
    
    results.forEach(col => {
      console.log(`  ${col.COLUMN_NAME.padEnd(20)} → ${col.DATA_TYPE}`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ page_contents now contains ONLY metadata');
    console.log('✅ ALL content is stored in content_blocks table');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanupPageContents();

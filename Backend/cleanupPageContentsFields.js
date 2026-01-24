import sequelize from './config/database.js';

async function cleanupPageContentsFields() {
  console.log('🧹 Cleaning up unused fields from page_contents table...\n');

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Drop unused columns
    const columnsToRemove = [
      'customFields',
      'layout', 
      'navigationGroup',
      'parentPage',
      'pageOrder',
      'sortOrder'
    ];

    console.log('Dropping unused columns:');
    for (const column of columnsToRemove) {
      try {
        await sequelize.query(`ALTER TABLE page_contents DROP COLUMN ${column}`);
        console.log(`  ✅ Dropped ${column}`);
      } catch (error) {
        if (error.message.includes("doesn't exist")) {
          console.log(`  ⚠️  ${column} already removed`);
        } else {
          console.log(`  ❌ Error dropping ${column}:`, error.message);
        }
      }
    }

    console.log('\n📋 Verifying remaining columns...');
    const [results] = await sequelize.query(`DESCRIBE page_contents`);
    console.log('\nRemaining columns:');
    results.forEach(col => {
      console.log(`  - ${col.Field} (${col.Type})`);
    });

    console.log('\n✅ Cleanup complete!');
    console.log('Final column count:', results.length);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

cleanupPageContentsFields();

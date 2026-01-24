import ContentBlock from './models/ContentBlock.js';
import sequelize from './config/database.js';

/**
 * Clean up database to match ONLY what's displayed on user-facing pages
 * Remove all blocks that don't appear in the actual UI
 */

const PAGES_TO_KEEP = {
  'homepage': [
    'homepage-vision',
    'homepage-mission',
    'homepage-placement-stats'
  ],
  'why-iiitk': [
    'why-hero',
    'why-about-intro',
    'why-about-campus',
    'why-highlights',
    'why-cta'
  ],
  'academics': [
    'academics-hero',
    'academics-overview',
    'academics-programs',
    'academics-features',
    'academics-cta'
  ],
  'admission': [
    'admission-hero',
    'admission-process',
    'admission-eligibility',
    'admission-dates'
  ],
  'governance': [
    'governance-hero',
    'governance-bod',
    'governance-senate',
    'governance-committees'
  ],
  'scholarship': [
    'scholarship-hero',
    'scholarship-overview',
    'scholarship-types',
    'scholarship-apply'
  ]
};

async function cleanupUnwantedBlocks() {
  console.log('🧹 Cleaning up unwanted content blocks...\n');

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    let totalRemoved = 0;
    let totalKept = 0;

    for (const [pageName, blockIdsToKeep] of Object.entries(PAGES_TO_KEEP)) {
      console.log(`\n📄 Processing: ${pageName}`);
      
      // Get all blocks for this page
      const allBlocks = await ContentBlock.findAll({
        where: { pageName }
      });

      console.log(`   Found ${allBlocks.length} blocks in database`);
      console.log(`   Keeping ${blockIdsToKeep.length} blocks`);

      // Delete blocks not in the keep list
      for (const block of allBlocks) {
        if (!blockIdsToKeep.includes(block.blockId)) {
          await block.destroy();
          console.log(`   ❌ Removed: ${block.blockLabel} (${block.blockId})`);
          totalRemoved++;
        } else {
          console.log(`   ✅ Kept: ${block.blockLabel} (${block.blockId})`);
          totalKept++;
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 CLEANUP SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Kept: ${totalKept} blocks`);
    console.log(`❌ Removed: ${totalRemoved} blocks`);
    console.log(`📦 Pages cleaned: ${Object.keys(PAGES_TO_KEEP).length}`);
    console.log('='.repeat(60));

    // Show final block counts
    console.log('\n📊 Final Block Counts:');
    for (const pageName of Object.keys(PAGES_TO_KEEP)) {
      const count = await ContentBlock.count({ where: { pageName } });
      console.log(`   ${pageName}: ${count} blocks`);
    }

    console.log('\n✅ Cleanup complete! Database now matches user-facing pages.\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

cleanupUnwantedBlocks();

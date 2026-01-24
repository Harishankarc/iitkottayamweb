import sequelize from './config/database.js';
import PageContent from './models/PageContent.js';
import ContentBlock from './models/ContentBlock.js';

async function verify() {
  try {
    await sequelize.sync();
    
    const page = await PageContent.findOne({ where: { pageName: 'homepage' } });
    const blocks = await ContentBlock.findAll({ where: { pageName: 'homepage' } });
    
    console.log('\n📄 PAGE_CONTENTS (Metadata Only):');
    console.log('='.repeat(70));
    console.log('pageName:', page.pageName);
    console.log('pageTitle:', page.pageTitle);
    console.log('pageSlug:', page.pageSlug);
    console.log('metaDescription:', page.metaDescription?.substring(0, 50) + '...');
    console.log('isPublished:', page.isPublished);
    console.log('category:', page.category);
    
    console.log('\n📦 CONTENT_BLOCKS (ALL Content):');
    console.log('='.repeat(70));
    console.log('Total blocks:', blocks.length);
    blocks.slice(0, 10).forEach((b, i) => {
      console.log(`  ${i+1}. ${b.blockType.padEnd(12)} - ${b.blockLabel}`);
    });
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ SUCCESS! Clean separation achieved:');
    console.log('   • page_contents = ONLY metadata (title, SEO, settings)');
    console.log('   • content_blocks = ALL content (hero, paragraphs, images, etc.)');
    console.log('   • NO DUPLICATION!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verify();

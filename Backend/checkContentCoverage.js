import sequelize from './config/database.js';
import PageContent from './models/PageContent.js';
import ContentBlock from './models/ContentBlock.js';

async function checkPageCoverage() {
  try {
    await sequelize.sync();
    
    // Get all pages
    const allPages = await PageContent.findAll({
      attributes: ['pageName', 'pageTitle', 'category'],
      order: [['category', 'ASC'], ['pageName', 'ASC']]
    });
    
    console.log('📊 Checking Content Block Coverage for All Pages');
    console.log('='.repeat(80));
    console.log(`Total Pages in Database: ${allPages.length}\n`);
    
    let pagesWithContent = 0;
    let pagesWithoutContent = 0;
    const missingContent = [];
    
    for (const page of allPages) {
      const blocks = await ContentBlock.count({
        where: { pageName: page.pageName }
      });
      
      if (blocks > 0) {
        pagesWithContent++;
        console.log(`✅ ${page.pageName.padEnd(35)} | ${blocks} blocks | ${page.pageTitle}`);
      } else {
        pagesWithoutContent++;
        missingContent.push(page);
        console.log(`❌ ${page.pageName.padEnd(35)} | 0 blocks | ${page.pageTitle}`);
      }
    }
    
    console.log('\n' + '='.repeat(80));
    console.log('📈 Summary:');
    console.log(`  Total Pages: ${allPages.length}`);
    console.log(`  ✅ Pages WITH content: ${pagesWithContent}`);
    console.log(`  ❌ Pages WITHOUT content: ${pagesWithoutContent}`);
    
    if (missingContent.length > 0) {
      console.log('\n❌ Pages Missing Content Blocks:');
      console.log('='.repeat(80));
      const byCategory = {};
      missingContent.forEach(p => {
        if (!byCategory[p.category]) byCategory[p.category] = [];
        byCategory[p.category].push(p);
      });
      
      Object.keys(byCategory).sort().forEach(cat => {
        console.log(`\n📂 ${cat.toUpperCase()}`);
        byCategory[cat].forEach(p => {
          console.log(`  - ${p.pageName} (${p.pageTitle})`);
        });
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkPageCoverage();

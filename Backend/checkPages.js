import sequelize from './config/database.js';
import PageContent from './models/PageContent.js';

const checkPages = async () => {
  try {
    await sequelize.sync();
    
    const pages = await PageContent.findAll({
      attributes: ['id', 'pageName', 'pageTitle', 'category', 'isPublished'],
      order: [['category', 'ASC'], ['pageName', 'ASC']]
    });
    
    console.log('📄 Pages in Database:');
    console.log('='.repeat(100));
    
    // Group by category
    const byCategory = {};
    pages.forEach(p => {
      if (!byCategory[p.category]) byCategory[p.category] = [];
      byCategory[p.category].push(p);
    });
    
    Object.keys(byCategory).sort().forEach(category => {
      console.log(`\n📂 ${category.toUpperCase()}`);
      byCategory[category].forEach(p => {
        const status = p.isPublished ? '✅' : '❌';
        console.log(`  ${status} ${p.pageName.padEnd(30)} → ${p.pageTitle}`);
      });
    });
    
    console.log('\n' + '='.repeat(100));
    console.log(`Total: ${pages.length} pages`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

checkPages();

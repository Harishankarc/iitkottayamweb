import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function checkBankATMPage() {
  try {
    const [pages] = await sequelize.query(
      `SELECT pageName, pageTitle, pageSlug FROM pages WHERE pageName = 'bank-atm' OR pageSlug LIKE '%bank%'`
    );
    
    if (pages.length > 0) {
      console.log(`✅ Found ${pages.length} page(s) related to bank/atm:`);
      pages.forEach(p => console.log(`   - ${p.pageName} (${p.pageTitle}) → ${p.pageSlug}`));
    } else {
      console.log('❌ No bank-atm page found in pages table!');
      console.log('   Content blocks exist but page entry is missing.');
      console.log('   Need to create page entry in pages table.');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkBankATMPage();

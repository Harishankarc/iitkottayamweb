import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function checkBankATMContent() {
  try {
    const [results] = await sequelize.query(
      `SELECT blockId, pageName, blockType FROM content_blocks WHERE pageName = 'bank-atm'`
    );
    
    if (results.length > 0) {
      console.log(`✅ Found ${results.length} bank-atm blocks in database:`);
      results.forEach(r => console.log(`   - ${r.blockId} (${r.blockType})`));
    } else {
      console.log('❌ No bank-atm content found in database!');
      console.log('   Run: node seedBankATMContent.js');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkBankATMContent();

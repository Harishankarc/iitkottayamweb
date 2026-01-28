import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function checkBankATMImages() {
  try {
    const [blocks] = await sequelize.query(
      `SELECT blockId, blockType, content FROM content_blocks WHERE pageName = 'bank-atm' AND blockType = 'image'`
    );
    
    if (blocks.length > 0) {
      console.log(`✅ Found ${blocks.length} image block(s):`);
      blocks.forEach(b => {
        const content = JSON.parse(b.content);
        console.log(`\n${b.blockId}:`);
        console.log(`  URL: ${content.url}`);
        console.log(`  Alt: ${content.alt}`);
      });
    } else {
      console.log('❌ No image blocks found!');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkBankATMImages();

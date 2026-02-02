import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});

async function checkBlocks() {
  try {
    const blocks = await sequelize.query(
      'SELECT blockId, blockType, content, isVisible FROM content_blocks WHERE pageName = "research-activities"',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    console.log(`\n📊 Found ${blocks.length} blocks for research-activities:\n`);
    blocks.forEach(block => {
      console.log(`- ${block.blockType}: ${block.blockId}`);
      console.log(`  Visible: ${block.isVisible}`);
      console.log(`  Content:`, JSON.stringify(JSON.parse(block.content), null, 2));
      console.log('');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkBlocks();

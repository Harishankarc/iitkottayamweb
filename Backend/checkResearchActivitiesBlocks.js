import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function checkBlocks() {
  try {
    const blocks = await sequelize.query(
      'SELECT id, blockId, blockType, isVisible, blockOrder, content FROM content_blocks WHERE pageName = "research-activities" ORDER BY blockOrder',
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('=== RESEARCH ACTIVITIES BLOCKS ===');
    console.log('Total blocks:', blocks.length);
    console.log('');
    
    blocks.forEach((block, index) => {
      console.log(`Block ${index + 1}:`);
      console.log('  ID:', block.id);
      console.log('  Block ID:', block.blockId);
      console.log('  Type:', block.blockType);
      console.log('  Visible:', block.isVisible);
      console.log('  Order:', block.blockOrder);
      console.log('  Content:', block.content.substring(0, 100) + '...');
      console.log('');
    });

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkBlocks();

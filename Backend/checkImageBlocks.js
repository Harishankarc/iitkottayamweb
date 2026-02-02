import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function checkImages() {
  try {
    const blocks = await sequelize.query(
      "SELECT pageName, blockId, blockType, content FROM content_blocks WHERE blockType = 'image' LIMIT 10",
      { type: Sequelize.QueryTypes.SELECT }
    );

    console.log('=== IMAGE BLOCKS ===');
    console.log('Total image blocks found:', blocks.length);
    console.log('');
    
    blocks.forEach((block, index) => {
      console.log(`Image Block ${index + 1}:`);
      console.log('  Page:', block.pageName);
      console.log('  Block ID:', block.blockId);
      console.log('  Content:', block.content);
      console.log('');
    });

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkImages();

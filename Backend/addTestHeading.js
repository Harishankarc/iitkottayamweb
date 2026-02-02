import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  logging: false
});

async function addHeading() {
  try {
    await sequelize.query(
      `INSERT INTO content_blocks (blockId, pageName, blockType, content, blockOrder, isVisible, createdAt, updatedAt) 
       VALUES ('test-heading-456', 'research-activities', 'heading', '{"text":"Latest Research Updates","level":"h2","align":"center"}', 4, 1, NOW(), NOW())`
    );
    
    console.log('✅ Heading block added successfully!');
    
    // Verify
    const blocks = await sequelize.query(
      'SELECT blockId, blockType FROM content_blocks WHERE pageName = "research-activities"',
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    console.log('\nAll blocks for research-activities:');
    blocks.forEach(b => console.log(`- ${b.blockType}: ${b.blockId}`));
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addHeading();

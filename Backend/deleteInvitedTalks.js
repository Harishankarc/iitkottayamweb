import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function deleteBlock() {
  try {
    // Find and delete the invited-talks block from research-groups
    const result = await sequelize.query(
      'DELETE FROM content_blocks WHERE blockId = "invited-talks" AND pageName = "research-groups"',
      { type: Sequelize.QueryTypes.DELETE }
    );

    console.log('✅ Deleted invited-talks block from research-groups');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteBlock();

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function deleteBrokenGallery() {
  try {
    await sequelize.query(
      'DELETE FROM content_blocks WHERE id = 636',
      { type: Sequelize.QueryTypes.DELETE }
    );

    console.log('✅ Deleted broken gallery block (ID: 636)');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

deleteBrokenGallery();

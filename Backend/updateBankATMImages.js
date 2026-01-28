import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('iiitkottayam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

async function updateBankATMImages() {
  try {
    // Update image paths to use the uploaded files
    await sequelize.query(`
      UPDATE content_blocks 
      SET content = JSON_SET(content, '$.url', '/uploads/image-1769427558055-734749727.jpg')
      WHERE pageName = 'bank-atm' AND blockId = 'atm-image-1'
    `);
    
    await sequelize.query(`
      UPDATE content_blocks 
      SET content = JSON_SET(content, '$.url', '/uploads/image-1769427570515-880896829.jpg')
      WHERE pageName = 'bank-atm' AND blockId = 'atm-image-2'
    `);
    
    console.log('✅ Updated image URLs to use uploaded files');
    console.log('   Image 1: /uploads/image-1769427558055-734749727.jpg');
    console.log('   Image 2: /uploads/image-1769427570515-880896829.jpg');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

updateBankATMImages();

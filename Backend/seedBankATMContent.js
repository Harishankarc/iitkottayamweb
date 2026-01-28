import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'iiitkottayam',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

async function seedBankATMContent() {
  try {
    console.log('🔄 Starting to seed Bank/ATM content...');
    
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear existing Bank/ATM content
    await sequelize.query(
      `DELETE FROM content_blocks WHERE pageName = 'bank-atm'`
    );
    console.log('✅ Cleared existing Bank/ATM content');

    const blocks = [
      {
        blockId: 'hero-section',
        pageName: 'bank-atm',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Bank/ATM',
          subtitle: 'Banking Services on Campus',
          description: 'IIIT Kottayam is having 24/7 ATM facility in the premises.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      {
        blockId: 'atm-image-1',
        pageName: 'bank-atm',
        blockType: 'image',
        content: JSON.stringify({
          url: '/images/facilities/atm1.jpg',
          alt: 'IIIT Kottayam ATM Facility - View 1',
          caption: 'ATM facility available 24/7 for students and staff'
        }),
        blockOrder: 2,
        isVisible: true
      },
      {
        blockId: 'atm-image-2',
        pageName: 'bank-atm',
        blockType: 'image',
        content: JSON.stringify({
          url: '/images/facilities/atm2.jpg',
          alt: 'IIIT Kottayam ATM Facility - View 2',
          caption: 'Modern banking infrastructure on campus'
        }),
        blockOrder: 3,
        isVisible: true
      },
      {
        blockId: 'banking-info',
        pageName: 'bank-atm',
        blockType: 'paragraph',
        content: JSON.stringify({
          text: 'Our campus provides convenient banking facilities with 24/7 ATM access. The ATM facility is located within the campus premises, ensuring easy access for all students, faculty, and staff members. This facility supports multiple banking networks and provides round-the-clock service for cash withdrawals and other banking transactions.'
        }),
        blockOrder: 4,
        isVisible: true
      },
      {
        blockId: 'atm-features',
        pageName: 'bank-atm',
        blockType: 'list',
        content: JSON.stringify({
          title: 'ATM Facilities',
          items: [
            '24/7 ATM Access - Round the clock cash withdrawal facility',
            'Multiple Bank Support - Accepts cards from all major banks',
            'Secure Location - Located within campus premises for safety',
            'Quick Service - Fast and efficient transaction processing',
            'Balance Inquiry - Check your account balance anytime',
            'Mini Statement - Get recent transaction details'
          ]
        }),
        blockOrder: 5,
        isVisible: true
      }
    ];

    // Insert blocks
    for (const block of blocks) {
      await sequelize.query(
        `INSERT INTO content_blocks (blockId, pageName, blockType, content, blockOrder, isVisible, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        {
          replacements: [
            block.blockId,
            block.pageName,
            block.blockType,
            block.content,
            block.blockOrder,
            block.isVisible
          ]
        }
      );
      console.log(`✅ Added ${block.blockType} block: ${block.blockId}`);
    }

    console.log(`🎉 Successfully seeded ${blocks.length} content blocks for Bank/ATM!`);
    console.log('📝 Note: You can now edit this content from Content Management > Manage Pages > Bank/ATM');
    
  } catch (error) {
    console.error('❌ Error seeding Bank/ATM content:', error.message);
  } finally {
    await sequelize.close();
  }
}

seedBankATMContent();

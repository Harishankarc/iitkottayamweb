const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

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

async function seedMediaCards() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    const cards = [
      {
        blockId: 'media-card-1',
        pageName: 'media',
        blockType: 'card',
        content: JSON.stringify({
          title: 'Mathrubhumi Daily',
          description: '7th Convocation Coverage',
          image: '/uploads/mathrubhumi-news.jpg',
          link: 'https://example.com/mathrubhumi-article',
          buttonText: 'Read News-7th Convocation',
          icon: '📰'
        }),
        blockOrder: 3,
        isVisible: true
      },
      {
        blockId: 'media-card-2',
        pageName: 'media',
        blockType: 'card',
        content: JSON.stringify({
          title: 'Manorama Online',
          description: 'PM-VIKAS skill development programme launched at IIIT Kottayam',
          image: '/uploads/manorama-news.jpg',
          link: 'https://example.com/manorama-article',
          buttonText: 'Read News-PM-VIKAS',
          icon: '📰'
        }),
        blockOrder: 4,
        isVisible: true
      },
      {
        blockId: 'media-card-3',
        pageName: 'media',
        blockType: 'card',
        content: JSON.stringify({
          title: 'Youtube',
          description: '7th Convocation Video Coverage',
          image: '/uploads/youtube-thumbnail.jpg',
          link: 'https://youtube.com/watch?v=example',
          buttonText: 'View Video',
          icon: '🎥'
        }),
        blockOrder: 5,
        isVisible: true
      },
      {
        blockId: 'media-card-4',
        pageName: 'media',
        blockType: 'card',
        content: JSON.stringify({
          title: 'X.com',
          description: 'PM-VIKAS Launch Highlights',
          image: '/uploads/twitter-post.jpg',
          link: 'https://x.com/example',
          buttonText: 'View Video',
          icon: '🐦'
        }),
        blockOrder: 6,
        isVisible: true
      }
    ];

    for (const card of cards) {
      await sequelize.query(`
        INSERT INTO content_blocks 
        (blockId, pageName, blockType, content, blockOrder, isVisible, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, {
        replacements: [
          card.blockId,
          card.pageName,
          card.blockType,
          card.content,
          card.blockOrder,
          card.isVisible
        ]
      });
    }

    console.log(`✅ Successfully seeded ${cards.length} media cards\n`);

    const [results] = await sequelize.query(`
      SELECT id, blockId, blockType, blockOrder 
      FROM content_blocks 
      WHERE pageName = "media"
      ORDER BY blockOrder
    `);

    console.log('All media page blocks:');
    results.forEach(block => {
      console.log(`  - ${block.blockType} (ID: ${block.id}, Order: ${block.blockOrder})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedMediaCards();

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedTrendlesClubPage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    const blocks = [
      {
        pageName: 'trendles-club',
        blockId: 'trendles-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'Trendles Club',
          description: '"When \'I\' is replaced by \'We\' even illness becomes Wellness"'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About Trendles Club',
          text: 'This is an official social club of IIIT Kottayam, that focuses on social impact of IIIT Kottayam by organizing various programs round the year. Some notable events include: Savitribai R.Phule, Children\'s Day, PEHCHAAN (the fashion show), World Literacy Day, Environment Day among others.\n\nThis club is a union various sub-clubs like Obliteuse (for photography), Literary club (for quizzes and appreciating literary works), Manga club etc., The Trendles Club of IIIT Kottayam is a vibrant and learning community engagement and social responsibility among students. The club organizes a wide array of activities, including charity drives, community service projects, and events aimed at fostering a sense of social awareness and empathy. These initiatives aim to promote a sense of civic duty, intellectual curiosity, and creative expression, creating a well-rounded and socially aware student body.\n\nBeyond the social contributions, the Trendles Club also envisions a positive impact with events such as fashion shows, fun events, the Secret Grill service to make a positive impact both within the campus and in the broader community.\n\nBe it Ashoka a freshers\' night to welcome freshers, or renaissance or lndla Pakistan Partition Day division, or Environmental Day celebrations or flash mobbing or conducting quizzes or December festivities, Trendles club Is here to help bring out the joy in you and has the deep root !\n\nJoin hands with us, get refreshed, feel content and feel responsible with the wide-spread social activities of the Trendles club.'
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-fic',
        blockType: 'list',
        blockLabel: 'Faculty In-Charge',
        content: JSON.stringify({
          title: 'Trendles Club FIC',
          items: [
            'Dr. S.Mohakud - Trendles Club FIC',
            'Dr. John Paul Martin - Trendles Club FIC',
            'Dr. Sangeetha A.Shenoi - Trendles Club FIC'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-mentors',
        blockType: 'list',
        blockLabel: 'Mentors',
        content: JSON.stringify({
          title: 'Mentors',
          items: [
            'Mr. Pradeep Somalraju - pradeep21bcd1@iiittkottayam.ac.in',
            'Mr. Avush Raj - avush22bcs17@iiittkottayam.ac.in'
          ]
        }),
        blockOrder: 4,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-gallery-agony',
        blockType: 'image',
        blockLabel: 'Agony 2025 Gallery',
        content: JSON.stringify({
          title: 'Agony 2025',
          images: []
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-gallery-blood',
        blockType: 'image',
        blockLabel: 'Blood Donation Camp 2025 Gallery',
        content: JSON.stringify({
          title: 'Blood Donation Camp 2025',
          images: []
        }),
        blockOrder: 6,
        isVisible: 1
      },
      {
        pageName: 'trendles-club',
        blockId: 'trendles-gallery-events',
        blockType: 'image',
        blockLabel: 'Events Gallery',
        content: JSON.stringify({
          title: 'Events Gallery',
          images: []
        }),
        blockOrder: 7,
        isVisible: 1
      }
    ];

    console.log('\nSeeding Trendles Club page...');
    
    for (const block of blocks) {
      await connection.execute(
        `INSERT INTO content_blocks 
         (pageName, blockId, blockType, blockLabel, content, blockOrder, isVisible)
         VALUES (?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
         blockType = VALUES(blockType),
         blockLabel = VALUES(blockLabel),
         content = VALUES(content),
         blockOrder = VALUES(blockOrder),
         isVisible = VALUES(isVisible)`,
        [
          block.pageName,
          block.blockId,
          block.blockType,
          block.blockLabel,
          block.content,
          block.blockOrder,
          block.isVisible
        ]
      );
      console.log(`✓ Seeded: ${block.blockId}`);
    }

    console.log('\n✅ Trendles Club page seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Trendles Club page:', error);
  } finally {
    await connection.end();
  }
}

seedTrendlesClubPage();

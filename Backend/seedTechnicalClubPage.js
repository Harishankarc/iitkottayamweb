import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iiitkottayam',
  port: process.env.DB_PORT || 3306
};

async function seedTechnicalClubPage() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to database');

    const blocks = [
      {
        pageName: 'technical-club',
        blockId: 'tech-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'Beta Labs - Technical Club',
          description: 'Inspiring innovation through technical excellence and collaborative learning'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'technical-club',
        blockId: 'tech-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About Beta Labs',
          text: "Beta Labs is the students' technical club of IIIT Kottayam, intended to increase the interaction of our students with the research world by creating a platform to inspire students and to familiarize them with the booming opportunities around them. Students are updated with the contemporary works of research and technology through group discussions, seminars, and other activities throughout the year. They experience hands-on sessions in the current hot domains of research by working on self-designed projects in small groups. Weekly gatherings are held to analyze and evaluate their progress.\n\nVision: The activities of the club motivate self-learning and sharing information amongst peers enabling students to widen the horizon of knowledge whilst sharpening their skills."
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'technical-club',
        blockId: 'tech-coordinators',
        blockType: 'list',
        blockLabel: 'Faculty Coordinators',
        content: JSON.stringify({
          title: 'Faculty Coordinators',
          items: [
            'Dr. Santhos Kumar - FIC',
            'Dr. Sravah Bellankonda - FIC',
            'Dr. Salei C - FIC',
            'Dr. Chakradhar Padamutham - FIC',
            'Dr. Priyadarshini S - FIC'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'technical-club',
        blockId: 'tech-members',
        blockType: 'list',
        blockLabel: 'Student Mentors',
        content: JSON.stringify({
          title: 'Student Mentors',
          items: [
            'Anishumohan Acharya - anishumohan25bcj19@iittkottayam.ac.in',
            'Sriharsha Bodicherla - sriharsha23bcd1@iittkottayam.ac.in'
          ]
        }),
        blockOrder: 4,
        isVisible: 1
      },
      {
        pageName: 'technical-club',
        blockId: 'tech-achievements',
        blockType: 'list',
        blockLabel: 'Coding Achievements',
        content: JSON.stringify({
          title: 'IIIT Kottayam Students - Coding Performance',
          items: [
            'Google Summer of Code (2018 & 2020) - Mr. Rahul Badami - ₹5400 cash award',
            'GNOME Settings Platform Development - Mr. Gotam Gorash (20bcs173), Mr. Akshay Warrier (21bcs8) - ₹5000 stipend each',
            'Smart India Hackathon 2022 - 1st Prize - Team Lead: Aaditi (2021BEC006) - ₹1 Lakh',
            'Vimarsh National 5G Hackathon - Mr. Anurop K B - ₹4 Lakh support (₹1.5 Lakh prize)',
            'Smart India Hackathon - 1st Prize - Team: Sons of Pitches, Ms. Harini T (Lead)'
          ]
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'technical-club',
        blockId: 'tech-gallery',
        blockType: 'gallery',
        blockLabel: 'Image Gallery',
        content: JSON.stringify({
          images: []
        }),
        blockOrder: 6,
        isVisible: 1
      }
    ];

    console.log('\nSeeding Technical Club page...');
    
    for (const block of blocks) {
      await connection.execute(
        `INSERT INTO content_blocks 
         (pageName, blockId, blockType, blockLabel, content, blockOrder, isVisible, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
         ON DUPLICATE KEY UPDATE 
         blockType = VALUES(blockType),
         blockLabel = VALUES(blockLabel),
         content = VALUES(content),
         blockOrder = VALUES(blockOrder),
         isVisible = VALUES(isVisible),
         updatedAt = NOW()`,
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
      console.log(`  ✓ Inserted/Updated block: ${block.blockId}`);
    }

    console.log('\n✅ Technical Club page seeded successfully!');

  } catch (error) {
    console.error('Error seeding Technical Club page:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('Database connection closed');
    }
  }
}

// Run the seeder
seedTechnicalClubPage()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  });

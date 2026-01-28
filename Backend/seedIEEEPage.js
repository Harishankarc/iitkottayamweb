import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedIEEEPage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    const blocks = [
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'IEEE Student Branch',
          description: 'Institute of Electrical and Electronics Engineers - IIIT Kottayam'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About IEEE Student Branch',
          text: 'The IEEE Student Branch at IIIT Kottayam is part of the world\'s largest technical professional organization dedicated to advancing technology for humanity. Our branch provides students with opportunities to develop technical and professional skills, network with peers and professionals, and contribute to innovative projects.\n\nWe organize technical workshops, seminars, competitions, and collaborative projects that help students stay updated with the latest technological advancements. As members of IEEE, students gain access to a vast library of technical resources, conferences, and networking opportunities worldwide.'
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-activities',
        blockType: 'list',
        blockLabel: 'Activities',
        content: JSON.stringify({
          title: 'Our Activities',
          items: [
            'Technical workshops and training sessions',
            'Project exhibitions and competitions',
            'Guest lectures from industry experts',
            'Research paper presentations',
            'IEEE conferences and events participation',
            'Community service projects'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-coordinators',
        blockType: 'list',
        blockLabel: 'Branch Counselor',
        content: JSON.stringify({
          title: 'Branch Counselor',
          items: [
            'Dr. Faculty Counselor - counselor@iiitkottayam.ac.in'
          ]
        }),
        blockOrder: 4,
        isVisible: 1
      },
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-members',
        blockType: 'list',
        blockLabel: 'Executive Committee',
        content: JSON.stringify({
          title: 'Executive Committee',
          items: [
            'Chairperson - 2024 Batch',
            'Vice Chairperson - 2024 Batch',
            'Secretary - 2024 Batch',
            'Treasurer - 2024 Batch',
            'Membership Development Officer - 2024 Batch'
          ]
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'ieee-student-branch',
        blockId: 'ieee-gallery',
        blockType: 'gallery',
        blockLabel: 'Image Gallery',
        content: JSON.stringify({
          images: []
        }),
        blockOrder: 6,
        isVisible: 1
      }
    ];

    console.log('\nSeeding IEEE Student Branch page...');
    
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

    console.log('\n✅ IEEE Student Branch page seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding IEEE Student Branch page:', error);
  } finally {
    await connection.end();
  }
}

seedIEEEPage();

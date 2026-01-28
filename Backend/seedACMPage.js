import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedACMPage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    const blocks = [
      {
        pageName: 'acm',
        blockId: 'acm-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'ACM Student Chapter',
          description: 'Association for Computing Machinery - IIIT Kottayam'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'acm',
        blockId: 'acm-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About ACM',
          text: 'The ACM Student Chapter at IIIT Kottayam is a student-run organization that promotes computer science education and professional development. We organize workshops, coding competitions, tech talks, and networking events to help students enhance their technical skills and connect with industry professionals.\n\nAs a part of the global ACM community, we provide access to exclusive resources, research papers, and learning opportunities. Our chapter focuses on fostering innovation, collaboration, and excellence in computing.'
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'acm',
        blockId: 'acm-activities',
        blockType: 'list',
        blockLabel: 'Activities',
        content: JSON.stringify({
          title: 'Our Activities',
          items: [
            'Coding competitions and hackathons',
            'Technical workshops and seminars',
            'Guest lectures from industry experts',
            'Research paper discussions',
            'Career guidance and networking events',
            'Open source project collaborations'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'acm',
        blockId: 'acm-coordinators',
        blockType: 'list',
        blockLabel: 'Faculty Coordinators',
        content: JSON.stringify({
          title: 'Faculty Coordinators',
          items: [
            'Dr. Faculty Coordinator - coordinator@iiitkottayam.ac.in'
          ]
        }),
        blockOrder: 4,
        isVisible: 1
      },
      {
        pageName: 'acm',
        blockId: 'acm-members',
        blockType: 'list',
        blockLabel: 'Office Bearers',
        content: JSON.stringify({
          title: 'Office Bearers',
          items: [
            'Chairperson - 2024 Batch',
            'Vice Chairperson - 2024 Batch',
            'Secretary - 2024 Batch',
            'Treasurer - 2024 Batch'
          ]
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'acm',
        blockId: 'acm-gallery',
        blockType: 'gallery',
        blockLabel: 'Image Gallery',
        content: JSON.stringify({
          images: []
        }),
        blockOrder: 6,
        isVisible: 1
      }
    ];

    console.log('\nSeeding ACM page...');
    
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

    console.log('\n✅ ACM page seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding ACM page:', error);
  } finally {
    await connection.end();
  }
}

seedACMPage();

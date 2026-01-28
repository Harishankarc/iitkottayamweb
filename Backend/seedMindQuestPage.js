import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function seedMindQuestPage() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    const blocks = [
      {
        pageName: 'mind-quest',
        blockId: 'mindquest-hero',
        blockType: 'hero',
        blockLabel: 'Hero Section',
        content: JSON.stringify({
          title: 'Mind Quest',
          description: 'Promoting Mental Health & Well-being in Campus'
        }),
        blockOrder: 1,
        isVisible: 1
      },
      {
        pageName: 'mind-quest',
        blockId: 'mindquest-about',
        blockType: 'paragraph',
        blockLabel: 'About Section',
        content: JSON.stringify({
          title: 'About Mind Quest',
          text: 'Mind Quest is a student-driven initiative dedicated to fostering mental health awareness and creating a supportive environment on campus. We believe that mental well-being is as important as physical health, and our mission is to provide resources, support, and a safe space for students to discuss mental health openly.\n\nWe organize regular workshops, awareness sessions, and peer support programs to help students cope with stress, anxiety, and other mental health challenges. Our team is committed to breaking the stigma around mental health and promoting a culture of care and understanding.'
        }),
        blockOrder: 2,
        isVisible: 1
      },
      {
        pageName: 'mind-quest',
        blockId: 'mindquest-goals',
        blockType: 'list',
        blockLabel: 'Our Goals',
        content: JSON.stringify({
          title: 'Our Goals',
          items: [
            'Raise awareness about mental health issues',
            'Provide peer support and counseling resources',
            'Organize stress-relief activities and workshops',
            'Create a stigma-free environment for mental health discussions',
            'Connect students with professional mental health services'
          ]
        }),
        blockOrder: 3,
        isVisible: 1
      },
      {
        pageName: 'mind-quest',
        blockId: 'mindquest-coordinators',
        blockType: 'list',
        blockLabel: 'Coordinators',
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
        pageName: 'mind-quest',
        blockId: 'mindquest-members',
        blockType: 'list',
        blockLabel: 'Team Members',
        content: JSON.stringify({
          title: 'Core Team Members',
          items: [
            'Student Leader 1 - leader1@iiitkottayam.ac.in',
            'Student Leader 2 - leader2@iiitkottayam.ac.in'
          ]
        }),
        blockOrder: 5,
        isVisible: 1
      },
      {
        pageName: 'mind-quest',
        blockId: 'mindquest-gallery',
        blockType: 'gallery',
        blockLabel: 'Image Gallery',
        content: JSON.stringify({
          images: []
        }),
        blockOrder: 6,
        isVisible: 1
      }
    ];

    console.log('\nSeeding Mind Quest page...');
    
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

    console.log('\n✅ Mind Quest page seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Mind Quest page:', error);
  } finally {
    await connection.end();
  }
}

seedMindQuestPage();

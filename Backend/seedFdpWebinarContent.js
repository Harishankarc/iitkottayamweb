import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function seedFdpWebinarContent() {
  const client = await pool.connect();
  
  try {
    console.log('Database connected for FDP Webinar seeding...');
    
    await client.query('BEGIN');
    
    // Clear existing fdp-webinar content blocks
    await client.query(`DELETE FROM content_blocks WHERE "pageName" = 'fdp-webinar'`);
    console.log('Cleared existing FDP webinar content blocks');
    
    const contentBlocks = [
      // Hero Block
      {
        pageName: 'fdp-webinar',
        blockType: 'hero',
        content: {
          title: 'Faculty Development Programmes',
          badge: 'Professional Development',
          description: 'Workshops, webinars, and professional development initiatives for faculty enhancement.'
        },
        blockOrder: 1,
        isVisible: true
      },
      
      // About FDP
      {
        pageName: 'fdp-webinar',
        blockType: 'paragraph',
        content: {
          title: 'About Faculty Development Programmes',
          text: `A curated list of faculty development programmes, workshops and webinars organised by the institute to enhance teaching methodologies, research capabilities, and professional growth of faculty members.`
        },
        blockOrder: 2,
        isVisible: true
      },
      
      // FDP Features
      {
        pageName: 'fdp-webinar',
        blockType: 'list',
        content: {
          title: 'FDP Features',
          items: [
            'Regular Workshops - Scheduled development programmes throughout the academic year',
            'Expert Sessions - Interactive sessions with industry and academic experts',
            'Resource Access - Archived recordings and educational materials'
          ]
        },
        blockOrder: 3,
        isVisible: true
      },
      
      // External Link Info
      {
        pageName: 'fdp-webinar',
        blockType: 'paragraph',
        content: {
          title: 'Access FDP Details',
          text: `For detailed information about current and past Faculty Development Programmes, please visit: <a href="https://iiitkottayam.ac.in/#!/fdp" target="_blank" rel="noopener noreferrer">https://iiitkottayam.ac.in/#!/fdp</a>`
        },
        blockOrder: 4,
        isVisible: true
      }
    ];
    
    // Insert all content blocks
    for (const block of contentBlocks) {
      await client.query(
        `INSERT INTO content_blocks ("pageName", "blockType", content, "blockOrder", "isVisible", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        [block.pageName, block.blockType, JSON.stringify(block.content), block.blockOrder, block.isVisible]
      );
    }
    
    await client.query('COMMIT');
    console.log(`✅ Successfully seeded ${contentBlocks.length} FDP webinar content blocks`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding FDP webinar content:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedFdpWebinarContent();

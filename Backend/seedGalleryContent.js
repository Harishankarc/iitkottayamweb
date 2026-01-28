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

async function seedGalleryContent() {
  const client = await pool.connect();
  
  try {
    console.log('Database connected for Gallery seeding...');
    
    await client.query('BEGIN');
    
    // Clear existing gallery content blocks
    await client.query(`DELETE FROM content_blocks WHERE "pageName" = 'gallery'`);
    console.log('Cleared existing gallery content blocks');
    
    const contentBlocks = [
      // Hero Block
      {
        pageName: 'gallery',
        blockType: 'hero',
        content: {
          title: 'Photo Gallery',
          badge: 'Visual Archive',
          description: 'Explore memorable moments and events from our vibrant campus life through our comprehensive photo archives.'
        },
        blockOrder: 1,
        isVisible: true
      },
      
      // About Gallery
      {
        pageName: 'gallery',
        blockType: 'paragraph',
        content: {
          title: 'About Our Gallery',
          text: `Our photo gallery serves as a visual chronicle of IIIT Kottayam's journey, capturing the essence of academic excellence, cultural diversity, and community spirit. From technical conferences to cultural festivals, every significant moment is preserved for posterity.`
        },
        blockOrder: 2,
        isVisible: true
      },
      
      // Gallery Features
      {
        pageName: 'gallery',
        blockType: 'list',
        content: {
          title: 'Gallery Features',
          items: [
            'Event Photography - Comprehensive photo documentation of all institute events',
            'Timeline Archives - Chronologically organized galleries from past years',
            'Community Moments - Capturing memorable moments of our campus community',
            'Achievement Records - Visual records of competitions and achievements'
          ]
        },
        blockOrder: 3,
        isVisible: true
      },
      
      // Featured Images (12 images)
      ...Array.from({ length: 12 }, (_, i) => ({
        pageName: 'gallery',
        blockType: 'image',
        content: {
          src: `/images/gallery/featured${i + 1}.jpg`,
          alt: `Featured Image ${i + 1}`,
          caption: `Featured gallery image ${i + 1}`
        },
        blockOrder: 4 + i,
        isVisible: true
      }))
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
    console.log(`✅ Successfully seeded ${contentBlocks.length} gallery content blocks`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding gallery content:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedGalleryContent();

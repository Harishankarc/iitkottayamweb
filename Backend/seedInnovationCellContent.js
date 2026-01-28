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

async function seedInnovationCellContent() {
  const client = await pool.connect();
  
  try {
    console.log('Database connected for Innovation Cell seeding...');
    
    await client.query('BEGIN');
    
    // Clear existing innovation-cell content blocks
    await client.query(`DELETE FROM content_blocks WHERE "pageName" = 'innovation-cell'`);
    console.log('Cleared existing innovation cell content blocks');
    
    const contentBlocks = [
      // Hero Block
      {
        pageName: 'innovation-cell',
        blockType: 'hero',
        content: {
          title: 'Institution Innovation Council',
          badge: 'Innovation & Entrepreneurship',
          description: 'Fostering a culture of innovation and entrepreneurship among students and faculty.'
        },
        blockOrder: 1,
        isVisible: true
      },
      
      // About IIC Section
      {
        pageName: 'innovation-cell',
        blockType: 'paragraph',
        content: {
          title: 'About Institution Innovation Council',
          text: `Ministry of Human Resource Development (MHRD), Govt. of India has established 'MHRD's Innovation Cell (MIC)' to systematically foster the culture of Innovation amongst all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are informative years.<br><br>MIC has envisioned encouraging the creation of 'Institution's Innovation Council (IICs)' across selected HEIs. A network of these IICs will be established to promote innovation in the Institution through multitudinous modes leading to an innovation promotion eco-system in the campuses.`
        },
        blockOrder: 2,
        isVisible: true
      },
      
      // Innovation Features
      {
        pageName: 'innovation-cell',
        blockType: 'list',
        content: {
          title: 'Innovation Features',
          items: [
            'Innovation Culture - Foster creativity and innovative thinking among students',
            'Startup Support - Entrepreneurship ecosystem for emerging startups',
            'ARIIA Framework - Excellence in innovation achievements ranking',
            'Pre-incubation - Scouting and nurturing innovative ideas'
          ]
        },
        blockOrder: 3,
        isVisible: true
      },
      
      // Team Members
      {
        pageName: 'innovation-cell',
        blockType: 'paragraph',
        content: {
          title: 'Our Team',
          text: `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px;">
            <div style="text-align: center;">
              <strong>Dr. Ragesh G K</strong><br>
              Faculty In-Charge Institute Innovation Cell<br>
              <a href="mailto:ragesh@iiitkottayam.ac.in">ragesh@iiitkottayam.ac.in</a><br>
              +91 4822202175
            </div>
            <div style="text-align: center;">
              <strong>Mr. Anuroop K B</strong><br>
              Chief Innovation Officer<br>
              <a href="mailto:cio@iiitkottayam.ac.in">cio@iiitkottayam.ac.in</a><br>
              +91 4822202211
            </div>
          </div>`
        },
        blockOrder: 4,
        isVisible: true
      },
      
      // Major Focus Areas
      {
        pageName: 'innovation-cell',
        blockType: 'list',
        content: {
          title: 'Major Focus Areas',
          items: [
            'To create a vibrant local innovation ecosystem.',
            'Start-up supporting Mechanism in HEIs.',
            'Prepare Institute for Atal Ranking of Institutions on Innovation Achievements Framework.',
            'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas.',
            'Develop better Cognitive Ability for Technology Students.'
          ]
        },
        blockOrder: 5,
        isVisible: true
      },
      
      // Objectives
      {
        pageName: 'innovation-cell',
        blockType: 'list',
        content: {
          title: 'Our Objectives',
          items: [
            'To create a vibrant local innovation ecosystem',
            'Start-up/ entrepreneurship supporting Mechanism in HEIs',
            'Prepare institute for Atal Ranking of Institutions on Innovation Achievements Framework (ARIIA)',
            'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas',
            'Develop better Cognitive Ability amongst Technology Students'
          ]
        },
        blockOrder: 6,
        isVisible: true
      },
      
      // Image Placeholders (6 images)
      ...Array.from({ length: 6 }, (_, i) => ({
        pageName: 'innovation-cell',
        blockType: 'image',
        content: {
          src: `/images/innovation/activity${i + 1}.jpg`,
          alt: `Innovation Activity ${i + 1}`,
          caption: `Innovation activity image ${i + 1}`
        },
        blockOrder: 7 + i,
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
    console.log(`✅ Successfully seeded ${contentBlocks.length} innovation cell content blocks`);
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error seeding innovation cell content:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seedInnovationCellContent();

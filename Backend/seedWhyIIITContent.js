import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false
});

async function seedWhyIIITContent() {
  try {
    // First, check if page exists in page_contents
    const [pageExists] = await sequelize.query(
      `SELECT * FROM page_contents WHERE pageName = 'why-iiitk'`
    );

    if (pageExists.length === 0) {
      // Create page content entry
      await sequelize.query(`
        INSERT INTO page_contents (pageName, pageTitle, metaDescription, isActive, createdAt, updatedAt)
        VALUES (
          'why-iiitk',
          'Established 2015 • Institution of National Importance',
          'Pioneering excellence in Information Technology education and research',
          1,
          NOW(),
          NOW()
        )
      `);
      console.log('✅ Created page_contents entry for why-iiitk');
    } else {
      console.log('✅ Page content already exists');
    }

    // Delete existing content blocks for this page
    await sequelize.query(`
      DELETE FROM content_blocks WHERE pageName = 'why-iiitk'
    `);
    console.log('🗑️  Cleared existing content blocks');

    // Insert Introduction Card Block
    await sequelize.query(`
      INSERT INTO content_blocks 
      (blockId, pageName, blockType, blockLabel, content, blockOrder, isVisible, createdAt, updatedAt)
      VALUES (
        'intro-section',
        'why-iiitk',
        'text',
        'About Our Institute',
        '<p>The Indian Institute of Information Technology (IIIT) Kottayam is an <strong style="color: #239244;">"Institution of National Importance"</strong> established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.</p><p>The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.</p>',
        1,
        1,
        NOW(),
        NOW()
      )
    `);
    console.log('✅ Added Introduction block');

    // Insert Features/Tags as a list block
    await sequelize.query(`
      INSERT INTO content_blocks 
      (blockId, pageName, blockType, blockLabel, content, blockOrder, isVisible, createdAt, updatedAt)
      VALUES (
        'key-highlights',
        'why-iiitk',
        'list',
        'Key Highlights',
        '["🤝 PPP Model", "🌳 53 Acre Campus", "🚀 AIC Certified", "🏆 National Importance"]',
        2,
        1,
        NOW(),
        NOW()
      )
    `);
    console.log('✅ Added Key Highlights block');

    // Insert Admissions Banner as a call-to-action block
    await sequelize.query(`
      INSERT INTO content_blocks 
      (blockId, pageName, blockType, blockLabel, content, customAttributes, blockOrder, isVisible, createdAt, updatedAt)
      VALUES (
        'admissions-cta',
        'why-iiitk',
        'button',
        'Interested in Joining IIIT Kottayam?',
        'Explore our admission process, eligibility criteria, and application deadlines',
        '{"buttonText": "Learn More", "linkUrl": "/admissions"}',
        3,
        1,
        NOW(),
        NOW()
      )
    `);
    console.log('✅ Added Admissions CTA block');

    console.log('\n✅ All content blocks seeded successfully for why-iiitk page!');
    console.log('🎉 The page will now use database content instead of hardcoded content.');
    
  } catch (error) {
    console.error('❌ Error seeding content:', error);
  } finally {
    await sequelize.close();
  }
}

seedWhyIIITContent();

import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedSecurityContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Security seeding...');

    // Delete existing security content
    await ContentBlock.destroy({ where: { pageName: 'security' } });
    console.log('Cleared existing security content blocks');

    const securityBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'security',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Campus Safety',
          title: 'Security',
          description: 'Ensuring a safe and secure environment for all students and staff.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-security',
        pageName: 'security',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Campus Security',
          text: 'The retired army personnel (with minimum 15 years of experience in army) through Army Welfare Placement Organization (AWPO) are deployed for taking care of security of entire IIIT Kottayam, including external hostels. They have served many remote parts of the country and can speak many languages such as Malayalam, Hindi, Telugu, Kannada, Bengali etc. Thus apart from security and vigilance they take care of students from different states of India with variety of linguistic background.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Security Features
      {
        blockId: 'security-features',
        pageName: 'security',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Security Features',
          items: [
            '24/7 Security - Round-the-clock security coverage across campus',
            'CCTV Surveillance - Comprehensive camera monitoring system',
            'Trained Personnel - Experienced retired army personnel with 15+ years experience',
            'Emergency Response - Quick response team for any security concerns',
            'Multi-lingual Staff - Security personnel fluent in multiple Indian languages',
            'Hostel Security - Dedicated security for all hostel blocks'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 9 }, (_, i) => ({
        blockId: `security-image-${i + 1}`,
        pageName: 'security',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/security${i + 1}.jpg`,
          alt: `IIIT Kottayam Security - View ${i + 1}`,
          caption: `Security facility image ${i + 1}`
        }),
        blockOrder: 4 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(securityBlocks);
    console.log(`✅ Successfully seeded ${securityBlocks.length} security content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding security content:', error);
    process.exit(1);
  }
};

seedSecurityContent();

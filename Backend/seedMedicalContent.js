import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedMedicalContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Medical Centre seeding...');

    // Delete existing medical content
    await ContentBlock.destroy({ where: { pageName: 'medical-centre' } });
    console.log('Cleared existing medical centre content blocks');

    const medicalBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'medical-centre',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Health & Wellness',
          title: 'Medical Centre',
          description: 'Comprehensive healthcare services available 24/7 for all students and staff.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-medical',
        pageName: 'medical-centre',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Medical Centre',
          text: 'IIIT Kottayam maintains a well-equipped medical centre providing 24/7 healthcare services to students and staff. Our facility offers primary healthcare consultation, emergency care, regular health checkups, medicine dispensary, first aid treatment, and ambulance service. The medical centre is staffed with qualified healthcare professionals committed to ensuring the well-being of our campus community.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Services List
      {
        blockId: 'medical-services',
        pageName: 'medical-centre',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Medical Services',
          items: [
            'General Consultation - Primary healthcare consultation services',
            'Emergency Care - 24/7 emergency medical assistance',
            'Health Checkups - Regular health monitoring and checkups',
            'Medicine Dispensary - Essential medicines and prescriptions',
            'First Aid - Immediate first aid treatment',
            'Ambulance Service - Fully equipped ambulance for emergencies'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Contact Info
      {
        blockId: 'medical-contact',
        pageName: 'medical-centre',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Contact Information',
          text: 'For medical assistance, contact our Help Desk at 0482 2202705. Our medical staff is available round the clock to provide immediate assistance for any health-related concerns.'
        }),
        blockOrder: 4,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 12 }, (_, i) => ({
        blockId: `medical-image-${i + 1}`,
        pageName: 'medical-centre',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/medical${i + 1}.jpg`,
          alt: `IIIT Kottayam Medical Centre - View ${i + 1}`,
          caption: `Medical facility image ${i + 1}`
        }),
        blockOrder: 5 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(medicalBlocks);
    console.log(`✅ Successfully seeded ${medicalBlocks.length} medical centre content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding medical content:', error);
    process.exit(1);
  }
};

seedMedicalContent();

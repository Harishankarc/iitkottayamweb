import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedGymContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Gym seeding...');

    // Delete existing gym content
    await ContentBlock.destroy({ where: { pageName: 'gym' } });
    console.log('Cleared existing gym content blocks');

    const gymBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'gym',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Fitness & Wellness',
          title: 'Gymnasium',
          description: 'State-of-the-art fitness facility for developing physical health and sports activities.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-gym',
        pageName: 'gym',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Gymnasium',
          text: 'A state of art, Gymnasium nourishes several enthusiasts to develop their fitness & sports activities. IIIT Kottayam has a well equipped gymnasium including Spinning Bike, Treadmill and Elliptical Cross Trainer. We also have Benches, Incline Chest, Seater Shoulder Press, Cable Cross Over, Straight Bar, Leg Curl/Leg Extension & Dumbbells. Students can avail the facilities of gym with the proper guidance of Physical Trainer.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Equipment List
      {
        blockId: 'gym-equipment',
        pageName: 'gym',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Available Equipment',
          items: [
            'Spinning Bike - High-intensity cardio workout',
            'Treadmill - Running and walking exercise',
            'Elliptical Cross Trainer - Low-impact full body workout',
            'Bench Press - Upper body strength training',
            'Incline Chest - Targeted chest muscle development',
            'Seater Shoulder Press - Shoulder and arm strengthening',
            'Cable Cross Over - Versatile resistance training',
            'Straight Bar - Core strength and stability',
            'Leg Curl/Extension - Lower body muscle development',
            'Dumbbells - Free weight training equipment'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Guidance Section
      {
        blockId: 'professional-guidance',
        pageName: 'gym',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Professional Guidance',
          text: 'Our experienced Physical Trainer provides proper guidance to ensure students can safely and effectively use all gym facilities. Professional supervision helps maximize workout benefits while maintaining safety standards.'
        }),
        blockOrder: 4,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 9 }, (_, i) => ({
        blockId: `gym-image-${i + 1}`,
        pageName: 'gym',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/gym${i + 1}.jpg`,
          alt: `IIIT Kottayam Gymnasium - View ${i + 1}`,
          caption: `Gym facility image ${i + 1}`
        }),
        blockOrder: 5 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(gymBlocks);
    console.log(`✅ Successfully seeded ${gymBlocks.length} gym content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding gym content:', error);
    process.exit(1);
  }
};

seedGymContent();

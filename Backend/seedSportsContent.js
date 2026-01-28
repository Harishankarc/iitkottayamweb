import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedSportsContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Sports seeding...');

    // Delete existing sports content
    await ContentBlock.destroy({ where: { pageName: 'sports' } });
    console.log('Cleared existing sports content blocks');

    const sportsBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'sports',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Sports & Recreation',
          title: 'Sports Facilities',
          description: 'World-class sports infrastructure promoting physical fitness and competitive spirit.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-sports',
        pageName: 'sports',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Sports Facilities',
          text: 'IIIT Kottayam believes in the holistic development of students through sports and physical activities. Our campus features comprehensive sports facilities including cricket ground, football field, basketball court, volleyball court, badminton courts, table tennis, athletics track, and indoor games. Regular tournaments and inter-college competitions foster team spirit and sportsmanship among students.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Facilities List
      {
        blockId: 'sports-facilities',
        pageName: 'sports',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Available Sports Facilities',
          items: [
            'Cricket Ground - Professional cricket field with proper pitch',
            'Football Field - Standard size football ground',
            'Basketball Court - Indoor basketball court with proper flooring',
            'Volleyball Court - Outdoor volleyball court',
            'Badminton Court - Indoor badminton courts',
            'Table Tennis - Multiple table tennis tables',
            'Athletics Track - Running track and field events area',
            'Chess & Carrom - Indoor games facility'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 12 }, (_, i) => ({
        blockId: `sports-image-${i + 1}`,
        pageName: 'sports',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/sports${i + 1}.jpg`,
          alt: `IIIT Kottayam Sports Facility - View ${i + 1}`,
          caption: `Sports facility image ${i + 1}`
        }),
        blockOrder: 4 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(sportsBlocks);
    console.log(`✅ Successfully seeded ${sportsBlocks.length} sports content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding sports content:', error);
    process.exit(1);
  }
};

seedSportsContent();

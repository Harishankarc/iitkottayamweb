import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedHostelContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Hostel seeding...');

    // Delete existing hostel content
    await ContentBlock.destroy({ where: { pageName: 'hostel' } });
    console.log('Cleared existing hostel content blocks');

    const hostelBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'hostel',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Residential Facilities',
          title: 'Hostel',
          description: 'Comfortable and secure accommodation with modern amenities for all students.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-hostel',
        pageName: 'hostel',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Hostels',
          text: 'IIIT Kottayam provides separate hostel facilities for boys and girls with modern amenities and 24/7 security. Each hostel is managed by dedicated wardens who ensure a safe and conducive living environment. The hostels are equipped with WiFi connectivity, common rooms, mess facilities, and recreational areas. Students enjoy a comfortable stay with all essential facilities within the campus.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Hostel Facilities
      {
        blockId: 'hostel-facilities',
        pageName: 'hostel',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Hostel Facilities',
          items: [
            'Separate Boys and Girls Hostels',
            '24/7 Security and Surveillance',
            'WiFi Connectivity in all rooms',
            'Common Rooms and Recreation Areas',
            'Mess Facilities within hostel premises',
            'Laundry Services',
            'Medical Facilities nearby',
            'Study Rooms and Library access'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Boys Hostel Info
      {
        blockId: 'boys-hostel-info',
        pageName: 'hostel',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Boys Hostel',
          text: 'Chief Warden: Dr. [Name]\nEmail: boyshostel@iitkottayam.ac.in\nPhone: +91 482-2202XXX\n\nThe boys hostel accommodates undergraduate and postgraduate students with modern facilities and amenities. Managed by experienced wardens, the hostel maintains a disciplined yet friendly environment.'
        }),
        blockOrder: 4,
        isVisible: true
      },

      // Girls Hostel Info
      {
        blockId: 'girls-hostel-info',
        pageName: 'hostel',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Girls Hostel',
          text: 'Chief Warden: Dr. [Name]\nEmail: girlshostel@iitkottayam.ac.in\nPhone: +91 482-2202XXX\n\nThe girls hostel provides a safe and secure residential facility with dedicated female wardens ensuring round-the-clock supervision. The hostel offers comfortable living spaces with all necessary amenities.'
        }),
        blockOrder: 5,
        isVisible: true
      },

      // Hostel Rules
      {
        blockId: 'hostel-rules',
        pageName: 'hostel',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Hostel Rules & Guidelines',
          text: 'All students must adhere to hostel rules and regulations. In-time and out-time must be strictly followed. Visitors must register at the security desk. Ragging is strictly prohibited and punishable. Students must maintain cleanliness and discipline within hostel premises. Any damage to hostel property will be charged from the responsible student.'
        }),
        blockOrder: 6,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 12 }, (_, i) => ({
        blockId: `hostel-image-${i + 1}`,
        pageName: 'hostel',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/hostel${i + 1}.jpg`,
          alt: `IIIT Kottayam Hostel - View ${i + 1}`,
          caption: `Hostel facility image ${i + 1}`
        }),
        blockOrder: 7 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(hostelBlocks);
    console.log(`✅ Successfully seeded ${hostelBlocks.length} hostel content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding hostel content:', error);
    process.exit(1);
  }
};

seedHostelContent();

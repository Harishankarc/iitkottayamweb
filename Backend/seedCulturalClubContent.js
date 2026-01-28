import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedCulturalClubContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Cultural Club seeding...');

    // Delete existing cultural-club content
    await ContentBlock.destroy({ where: { pageName: 'cultural-club' } });
    console.log('Cleared existing cultural club content blocks');
    
    const contentBlocks = [
      // Hero Block
      {
        blockId: 'hero-section',
        pageName: 'cultural-club',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Cultural Club - Wildbeats',
          badge: 'Arts & Culture',
          description: 'Expressing creativity through art, music, dance, drama, and cultural celebrations.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      
      // About Section
      {
        blockId: 'about-wildbeats',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Wildbeats Cultural Club',
          text: `Wildbeats, the Cultural Club of IIIT Kottayam serves as a hub where students from different backgrounds come together to express themselves through art, music, dance, drama, and more. The Club organizes various events throughout the academic year designed to promote cultural exchange and understanding.<br><br>From traditional festivals and performances showcasing different regions' cultural heritage to workshops that teach students about global cuisines and dance, the club offers a platform for both learning and celebration. Wildbeats nurtures talent and leadership skills among its members, empowering them to organize cultural events and build confidence through public performances.`
        }),
        blockOrder: 2,
        isVisible: true
      },
      
      // Club Features List
      {
        blockId: 'club-features',
        pageName: 'cultural-club',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Club Features',
          items: [
            'Creative Expression - Platform for artistic and cultural expression',
            'Community Building - Bringing together students from diverse backgrounds',
            'Talent Development - Nurturing and showcasing creative talents',
            'Cultural Awareness - Promoting understanding of different cultures'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },
      
      // Faculty In-Charge
      {
        blockId: 'faculty-incharge',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Faculty In-Charge',
          text: '<div style="text-align: center;"><strong>Dr. Gayathri G.R.</strong><br>Cultural Club Faculty In-Charge</div>'
        }),
        blockOrder: 4,
        isVisible: true
      },
      
      // Student Mentors
      {
        blockId: 'student-mentors',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Student Mentors',
          text: `<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; text-align: center;">
            <div><strong>Rajshith Dondapati</strong><br>2021 Batch</div>
            <div><strong>Aaditya</strong><br>2021 Batch</div>
          </div>`
        }),
        blockOrder: 5,
        isVisible: true
      },
      
      // Club Faculty Members
      {
        blockId: 'club-faculty',
        pageName: 'cultural-club',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Club Faculty Members',
          items: [
            'Dr. Pancham V',
            'Dr. Dhanyamol',
            'Dr. Manu Madhavan',
            'Dr. Nandini Warrier',
            'Dr. Rajesh G'
          ]
        }),
        blockOrder: 6,
        isVisible: true
      },
      
      // Cultural Activities
      {
        blockId: 'cultural-activities',
        pageName: 'cultural-club',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Cultural Activities',
          items: [
            'Traditional Arts - Exploring diverse cultural heritage through art forms',
            'Musical Events - Showcasing musical talents and performances',
            'Dance Performances - Cultural dance performances from different regions',
            'Drama & Theatre - Theatrical performances and dramatic expressions',
            'Workshops - Learning sessions about global cultures',
            'Festivals - Cultural festivals and traditional celebrations'
          ]
        }),
        blockOrder: 7,
        isVisible: true
      },
      
      // Featured Events
      {
        blockId: 'featured-events',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Featured Events',
          text: `<h3>Mime at School</h3>
          <p>Creative mime performances showcasing artistic expression and storytelling through silent art.</p>
          <br>
          <h3>Deep-O-Dashami</h3>
          <p>Cultural celebration featuring traditional performances, music, and community participation.</p>`
        }),
        blockOrder: 8,
        isVisible: true
      },
      
      // Connect Section
      {
        blockId: 'connect-wildbeats',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Connect with Wildbeats',
          text: `Whether you're passionate about performing arts, interested in learning about different cultures, or simply looking to make lifelong friendships, the Cultural Club invites you to join us on a journey of discovery, creativity, and mutual respect.<br><br>Explore the vibrant activities of our Cultural Club on Instagram: @wildbeats_iiitkottayam`
        }),
        blockOrder: 9,
        isVisible: true
      },
      
      // Image Placeholders (9 images)
      ...Array.from({ length: 9 }, (_, i) => ({
        blockId: `cultural-image-${i + 1}`,
        pageName: 'cultural-club',
        blockType: 'image',
        content: JSON.stringify({
          src: `/images/clubs/cultural${i + 1}.jpg`,
          alt: `Cultural Club Event ${i + 1}`,
          caption: `Cultural event image ${i + 1}`
        }),
        blockOrder: 10 + i,
        isVisible: true
      }))
    ];
    
    // Insert all content blocks
    await ContentBlock.bulkCreate(contentBlocks);
    
    console.log(`✅ Successfully seeded ${contentBlocks.length} cultural club content blocks`);
    
  } catch (error) {
    console.error('Error seeding cultural club content:', error);
    throw error;
  } finally {
    await db.close();
  }
};

seedCulturalClubContent();

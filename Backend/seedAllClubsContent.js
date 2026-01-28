import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedAllClubsContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for IIC & Clubs seeding...');

    // Cultural Club
    await ContentBlock.destroy({ where: { pageName: 'cultural-club' } });
    console.log('Cleared existing cultural club content');

    const culturalBlocks = [
      {
        blockId: 'hero-cultural',
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
      {
        blockId: 'about-cultural',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Wildbeats Cultural Club',
          text: `Wildbeats, the Cultural Club of IIIT Kottayam serves as a hub where students from different backgrounds come together to express themselves through art, music, dance, drama, and more. The Club organizes various events throughout the academic year designed to promote cultural exchange and understanding.<br><br>From traditional festivals and performances showcasing different regions' cultural heritage to workshops that teach students about global cuisines and dance, the club offers a platform for both learning and celebration. Wildbeats nurtures talent and leadership skills among its members, empowering them to organize cultural events and build confidence through public performances.`
        }),
        blockOrder: 2,
        isVisible: true
      },
      {
        blockId: 'features-cultural',
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
      {
        blockId: 'fic-cultural',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Faculty In-Charge',
          text: '<div style="text-align: center;"><strong>Dr. Gayathri G.R.</strong><br>Cultural Club Faculty In-Charge</div>'
        }),
        blockOrder: 4,
        isVisible: true
      },
      {
        blockId: 'mentors-cultural',
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
      {
        blockId: 'faculty-cultural',
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
      {
        blockId: 'activities-cultural',
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
      {
        blockId: 'events-cultural',
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
      {
        blockId: 'connect-cultural',
        pageName: 'cultural-club',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Connect with Wildbeats',
          text: `Whether you're passionate about performing arts, interested in learning about different cultures, or simply looking to make lifelong friendships, the Cultural Club invites you to join us on a journey of discovery, creativity, and mutual respect.<br><br>Explore the vibrant activities of our Cultural Club on Instagram: @wildbeats_iiitkottayam`
        }),
        blockOrder: 9,
        isVisible: true
      },
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

    await ContentBlock.bulkCreate(culturalBlocks);
    console.log(`✅ Cultural Club: ${culturalBlocks.length} blocks`);

    // Innovation Cell
    await ContentBlock.destroy({ where: { pageName: 'innovation-cell' } });
    console.log('Cleared existing innovation cell content');

    const innovationBlocks = [
      {
        blockId: 'hero-innovation',
        pageName: 'innovation-cell',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Institution Innovation Council',
          badge: 'Innovation & Entrepreneurship',
          description: 'Fostering a culture of innovation and entrepreneurship among students and faculty.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      {
        blockId: 'about-innovation',
        pageName: 'innovation-cell',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Institution Innovation Council',
          text: `Ministry of Human Resource Development (MHRD), Govt. of India has established 'MHRD's Innovation Cell (MIC)' to systematically foster the culture of Innovation amongst all Higher Education Institutions (HEIs). The primary mandate of MIC is to encourage, inspire and nurture young students by supporting them to work with new ideas and transform them into prototypes while they are informative years.<br><br>MIC has envisioned encouraging the creation of 'Institution's Innovation Council (IICs)' across selected HEIs. A network of these IICs will be established to promote innovation in the Institution through multitudinous modes leading to an innovation promotion eco-system in the campuses.`
        }),
        blockOrder: 2,
        isVisible: true
      },
      {
        blockId: 'features-innovation',
        pageName: 'innovation-cell',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Innovation Features',
          items: [
            'Innovation Culture - Foster creativity and innovative thinking among students',
            'Startup Support - Entrepreneurship ecosystem for emerging startups',
            'ARIIA Framework - Excellence in innovation achievements ranking',
            'Pre-incubation - Scouting and nurturing innovative ideas'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },
      {
        blockId: 'team-innovation',
        pageName: 'innovation-cell',
        blockType: 'paragraph',
        content: JSON.stringify({
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
        }),
        blockOrder: 4,
        isVisible: true
      },
      {
        blockId: 'focus-innovation',
        pageName: 'innovation-cell',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Major Focus Areas',
          items: [
            'To create a vibrant local innovation ecosystem.',
            'Start-up supporting Mechanism in HEIs.',
            'Prepare Institute for Atal Ranking of Institutions on Innovation Achievements Framework.',
            'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas.',
            'Develop better Cognitive Ability for Technology Students.'
          ]
        }),
        blockOrder: 5,
        isVisible: true
      },
      {
        blockId: 'objectives-innovation',
        pageName: 'innovation-cell',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Our Objectives',
          items: [
            'To create a vibrant local innovation ecosystem',
            'Start-up/ entrepreneurship supporting Mechanism in HEIs',
            'Prepare institute for Atal Ranking of Institutions on Innovation Achievements Framework (ARIIA)',
            'Establish Function Ecosystem for Scouting ideas and Pre-incubation of ideas',
            'Develop better Cognitive Ability amongst Technology Students'
          ]
        }),
        blockOrder: 6,
        isVisible: true
      },
      ...Array.from({ length: 6 }, (_, i) => ({
        blockId: `innovation-image-${i + 1}`,
        pageName: 'innovation-cell',
        blockType: 'image',
        content: JSON.stringify({
          src: `/images/innovation/activity${i + 1}.jpg`,
          alt: `Innovation Activity ${i + 1}`,
          caption: `Innovation activity image ${i + 1}`
        }),
        blockOrder: 7 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(innovationBlocks);
    console.log(`✅ Innovation Cell: ${innovationBlocks.length} blocks`);

    // Gallery
    await ContentBlock.destroy({ where: { pageName: 'gallery' } });
    console.log('Cleared existing gallery content');

    const galleryBlocks = [
      {
        blockId: 'hero-gallery',
        pageName: 'gallery',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Photo Gallery',
          badge: 'Visual Archive',
          description: 'Explore memorable moments and events from our vibrant campus life through our comprehensive photo archives.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      {
        blockId: 'about-gallery',
        pageName: 'gallery',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Gallery',
          text: `Our photo gallery serves as a visual chronicle of IIIT Kottayam's journey, capturing the essence of academic excellence, cultural diversity, and community spirit. From technical conferences to cultural festivals, every significant moment is preserved for posterity.`
        }),
        blockOrder: 2,
        isVisible: true
      },
      {
        blockId: 'features-gallery',
        pageName: 'gallery',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Gallery Features',
          items: [
            'Event Photography - Comprehensive photo documentation of all institute events',
            'Timeline Archives - Chronologically organized galleries from past years',
            'Community Moments - Capturing memorable moments of our campus community',
            'Achievement Records - Visual records of competitions and achievements'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },
      ...Array.from({ length: 12 }, (_, i) => ({
        blockId: `gallery-image-${i + 1}`,
        pageName: 'gallery',
        blockType: 'image',
        content: JSON.stringify({
          src: `/images/gallery/featured${i + 1}.jpg`,
          alt: `Featured Image ${i + 1}`,
          caption: `Featured gallery image ${i + 1}`
        }),
        blockOrder: 4 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(galleryBlocks);
    console.log(`✅ Gallery: ${galleryBlocks.length} blocks`);

    // FDP Webinar
    await ContentBlock.destroy({ where: { pageName: 'fdp-webinar' } });
    console.log('Cleared existing FDP webinar content');

    const fdpBlocks = [
      {
        blockId: 'hero-fdp',
        pageName: 'fdp-webinar',
        blockType: 'hero',
        content: JSON.stringify({
          title: 'Faculty Development Programmes',
          badge: 'Professional Development',
          description: 'Workshops, webinars, and professional development initiatives for faculty enhancement.'
        }),
        blockOrder: 1,
        isVisible: true
      },
      {
        blockId: 'about-fdp',
        pageName: 'fdp-webinar',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Faculty Development Programmes',
          text: `A curated list of faculty development programmes, workshops and webinars organised by the institute to enhance teaching methodologies, research capabilities, and professional growth of faculty members.`
        }),
        blockOrder: 2,
        isVisible: true
      },
      {
        blockId: 'features-fdp',
        pageName: 'fdp-webinar',
        blockType: 'list',
        content: JSON.stringify({
          title: 'FDP Features',
          items: [
            'Regular Workshops - Scheduled development programmes throughout the academic year',
            'Expert Sessions - Interactive sessions with industry and academic experts',
            'Resource Access - Archived recordings and educational materials'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },
      {
        blockId: 'access-fdp',
        pageName: 'fdp-webinar',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Access FDP Details',
          text: `For detailed information about current and past Faculty Development Programmes, please visit: <a href="https://iiitkottayam.ac.in/#!/fdp" target="_blank" rel="noopener noreferrer">https://iiitkottayam.ac.in/#!/fdp</a>`
        }),
        blockOrder: 4,
        isVisible: true
      }
    ];

    await ContentBlock.bulkCreate(fdpBlocks);
    console.log(`✅ FDP Webinar: ${fdpBlocks.length} blocks`);

    console.log('\n🎉 Successfully seeded all IIC & Clubs content!');
    
  } catch (error) {
    console.error('Error seeding clubs content:', error);
    throw error;
  } finally {
    await db.close();
  }
};

seedAllClubsContent();

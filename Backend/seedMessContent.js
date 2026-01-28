import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedMessContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Student Mess seeding...');

    // Delete existing mess content
    await ContentBlock.destroy({ where: { pageName: 'student-mess' } });
    console.log('Cleared existing student mess content blocks');

    const messBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'student-mess',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Dining Services',
          title: 'Student Mess',
          description: 'Quality dining facilities providing nutritious meals at affordable prices.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-mess',
        pageName: 'student-mess',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Student Co-operative Mess',
          text: 'The Student Co-operative Mess is a student-run initiative committed to providing nutritious, hygienic, and affordable meals to the campus community. It operates on a non-profit basis, aiming to create a welcoming dining environment where students can enjoy a variety of cuisines catering to different tastes and dietary needs.<br><br><strong>Email ID:</strong> <a href="mailto:studentmess@iitkottayam.ac.in">studentmess@iitkottayam.ac.in</a>'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Mess Features
      {
        blockId: 'mess-features',
        pageName: 'student-mess',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Mess Facilities & Features',
          items: [
            'Affordable Dining - High-quality meals at affordable prices for all students',
            'Student Management - Managed by elected student representatives',
            'Nutritious Meals - Balanced vegetarian and non-vegetarian options',
            'Hygiene Standards - Strict quality checks and safety guidelines',
            'Spacious Dining Hall - Comfortable seating for all students',
            'Flexible Timing - Breakfast, lunch, and dinner service',
            'Quality Assurance - Regular inspections and feedback mechanisms',
            'Diverse Menu - Variety of cuisines catering to different tastes'
          ]
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Faculty In Charge Section
      {
        blockId: 'faculty-incharge',
        pageName: 'student-mess',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Faculty In Charge',
          text: '<div style="margin-bottom: 20px;"><strong>Dr. John Paul Martin</strong><br>Faculty In Charge (FIC) Mess Committee<br>📧 fic_messcommittee@iitkottayam.ac.in<br>📞 +91 482-2202202</div><div style="margin-bottom: 20px;"><strong>Dr. Chakradhar Padamuthum</strong><br>Associate FIC<br>📧 chakradhar@iitkottayam.ac.in<br>📞 +91 482-2202263</div><div><strong>Dr. Emy Mariam George</strong><br>Associate FIC<br>📧 emy@iitkottayam.ac.in<br>📞 +91 482-2202270</div>'
        }),
        blockOrder: 4,
        isVisible: true
      },

      // Mess Supervisors Section
      {
        blockId: 'mess-supervisors',
        pageName: 'student-mess',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Mess Supervisors',
          text: '<div style="margin-bottom: 20px;"><strong>Mr. Raja Mohanan</strong><br>📧 me1@iitkottayam.ac.in</div><div><strong>Mr. Raju G</strong><br>📧 me2@iitkottayam.ac.in</div>'
        }),
        blockOrder: 5,
        isVisible: true
      },

      // Office Bearers - Secretaries
      {
        blockId: 'office-bearers',
        pageName: 'student-mess',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Office Bearers',
          text: '<h3 style="color: #239244; font-size: 1.25rem; margin-bottom: 15px;">Secretaries</h3><div style="margin-bottom: 20px;"><strong>Basant Santhan Reddy</strong><br>Secretary<br>📧 santhan27dec20@iitkottayam.ac.in<br>📞 +91 93472 90560</div><div style="margin-bottom: 30px;"><strong>Akash Nair</strong><br>Secretary<br>📧 akash21rec04@iitkottayam.ac.in<br>📞 +91 95001 46264</div><h3 style="color: #239244; font-size: 1.25rem; margin-bottom: 15px;">Joint Secretaries</h3><div style="margin-bottom: 20px;"><strong>Srinatha K</strong><br>Joint Secretary</div><div style="margin-bottom: 30px;"><strong>Ayush Saipal</strong><br>Joint Secretary</div><h3 style="color: #239244; font-size: 1.25rem; margin-bottom: 15px;">Finance Head</h3><div style="margin-bottom: 30px;"><strong>MD Sameer Pasha</strong><br>Finance Head</div><h3 style="color: #239244; font-size: 1.25rem; margin-bottom: 15px;">Quality Assurance Heads</h3><div style="margin-bottom: 20px;"><strong>Raghavan Dev</strong><br>Quality Assurance Head</div><div><strong>Keshavadh Gayathri</strong><br>Quality Assurance Head</div>'
        }),
        blockOrder: 6,
        isVisible: true
      },

      // Student Involvement Section
      {
        blockId: 'student-involvement',
        pageName: 'student-mess',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Student Involvement',
          text: 'The mess emphasizes active student participation, giving students a voice in decisions related to menu changes, service improvements, and operational policies. Regular feedback sessions are held to gather suggestions and address concerns, making the mess a truly cooperative effort.'
        }),
        blockOrder: 7,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 9 }, (_, i) => ({
        blockId: `mess-image-${i + 1}`,
        pageName: 'student-mess',
        blockType: 'image',
        content: JSON.stringify({
          src: `/images/facilities/mess${i + 1}.jpg`,
          alt: `IIIT Kottayam Student Mess - View ${i + 1}`,
          caption: `Mess facility image ${i + 1}`
        }),
        blockOrder: 8 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(messBlocks);
    console.log(`✅ Successfully seeded ${messBlocks.length} student mess content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding mess content:', error);
    process.exit(1);
  }
};

seedMessContent();

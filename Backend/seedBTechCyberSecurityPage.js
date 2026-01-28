import sequelize from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

async function seedBTechCyberSecurityContent() {
  console.log('🎓 Seeding B.Tech Cyber Security Page Content...\n');

  try {
    // Delete existing content blocks for btech-cyber-security
    await ContentBlock.destroy({ where: { pageName: 'btech-cyber-security' } });
    console.log('🗑️  Cleared existing btech-cyber-security content blocks\n');

    // Hero Block
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Hero Section',
      content: JSON.stringify({
        badge: 'B.Tech Programmes',
        title: 'Computer Science (Cyber Security)',
        subtitle: 'Building expertise in Cybersecurity and Information Security'
      }),
      blockOrder: 0,
      isVisible: true
    });
    console.log('✅ Hero block created');

    // Program Description
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-description',
      sectionName: 'description',
      blockType: 'paragraph',
      blockLabel: 'Program Description',
      content: JSON.stringify({
        text: 'The B.Tech program in Computer Science (Cyber Security) is designed to provide comprehensive knowledge in cybersecurity, cryptography, network security, ethical hacking, and information security. The programme focuses on creating a strong foundation in computer science fundamentals while specializing in protecting digital assets, securing networks, and developing robust security solutions for modern cyber threats. Students learn about malware analysis, penetration testing, digital forensics, and security architecture.'
      }),
      blockOrder: 1,
      isVisible: true
    });
    console.log('✅ Description block created');

    // Lab Images
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-images',
      sectionName: 'images',
      blockType: 'image',
      blockLabel: 'Lab Facility Images',
      content: JSON.stringify({
        images: [
          {
            url: 'cs(cyber)lab1(1).jpg',
            alt: 'Cyber Security Lab Facility 1',
            caption: 'LAB FACILITY'
          },
          {
            url: 'cs(cyber)lab2(1).jpg',
            alt: 'Cyber Security Lab Facility 2',
            caption: 'LAB FACILITY'
          }
        ]
      }),
      blockOrder: 2,
      isVisible: true
    });
    console.log('✅ Lab images block created');

    // Program Highlights
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-highlights',
      sectionName: 'highlights',
      blockType: 'list',
      blockLabel: 'Program Highlights',
      content: JSON.stringify({
        title: 'Program Highlights',
        items: [
          'Specialized focus on cybersecurity and information security',
          'Hands-on training in ethical hacking and penetration testing',
          'Advanced cryptography and network security courses',
          'Digital forensics and incident response training',
          'Industry-standard security tools and technologies',
          'Expert faculty with cybersecurity certifications',
          'Internships with leading cybersecurity firms',
          'Research opportunities in emerging security domains'
        ]
      }),
      blockOrder: 3,
      isVisible: true
    });
    console.log('✅ Program highlights created');

    // Admission Section
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-admission',
      sectionName: 'admission',
      blockType: 'card',
      blockLabel: 'Admission Section',
      content: JSON.stringify({
        icon: '🎓',
        title: 'Admission',
        description: 'Admission to the B.Tech/B.Tech-MS programme will be based on performance in the Joint Entrance Examination (JEE - Main) conducted by National Testing Agency(NTA) (subject to change if any ordered by Ministry of Education, Govt. of India) through the counselling under JoSAA/CSAB.',
        link: {
          text: 'Click here for details...',
          url: '/admission'
        }
      }),
      blockOrder: 4,
      isVisible: true
    });
    console.log('✅ Admission section created');

    // Admission Additional Info
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-admission-info',
      sectionName: 'admission',
      blockType: 'paragraph',
      blockLabel: 'Admission Additional Info',
      content: JSON.stringify({
        text: 'The number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.'
      }),
      blockOrder: 5,
      isVisible: true
    });
    console.log('✅ Admission additional info created');

    // Fee Structure - Regular Admission 2025
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-fee-regular',
      sectionName: 'fee-structure',
      blockType: 'table',
      blockLabel: 'Fee Structure - Regular Admission',
      content: JSON.stringify({
        title: 'Fee Structure for the B.Tech program (Admission 2025)',
        subtitle: '',
        headers: [
          'Details',
          'First Year\nFirst Semester',
          'First Year\nSecond Semester',
          'Second Year\nThird Semester',
          'Second Year\nFourth Semester',
          'Third Year\nFifth Semester',
          'Third Year\nSixth Semester',
          'Fourth Year\nSeventh Semester',
          'Fourth Year\nEighth Semester'
        ],
        rows: [
          ['Tuition Fee', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-'],
          ['Hostel/Facility maintenance fee', '34,000/-', '34,000/-', '37,500/-', '37,500/-', '41,250/-', '41,250/-', '45,500/-', '45,500/-'],
          ['Mess Advance', '30,750/-', '30,750/-', '33,825/-', '33,825/-', '37,250/-', '37,250/-', '40,975/-', '40,975/-'],
          ['Medical Insurance', '1300/-', '-', '1300/-', '-', '1300/-', '-', '1300/-', '-'],
          ['Mess Equipment Maintenance Fee', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Sports Equipment Maintenance Fee', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Club Activities', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Caution Deposit (One Time Fee)', '13,000/-', '-', '-', '-', '-', '-', '-', '-'],
          ['Convocation Fee (One-Time Fee)', '-', '-', '-', '-', '-', '-', '5000/-', '-'],
          ['Sports (One time Fee)', '1100/-', '-', '-', '-', '-', '-', '-', '-'],
          ['Mess (One time Fee)', '1100/-', '-', '-', '-', '-', '-', '-', '-']
        ],
        notes: [
          'In view of the above, the initial first semester payment on joining for the admission-2025 shall be 1,45,200/- towards tuition fee, 34,000/- towards hostel/facility maintenance fee, 30,750/- towards mess advance, Rs. 1300/- towards medical insurance, 300/- towards mess equipment maintenance, 300/- towards sports equipment maintenance, 300/- towards club activities, Rs. 13,000/- towards caution deposit, Rs. 1100/- towards sports (one-time fee) & Rs. 1100/- towards mess (one-time fee).'
        ]
      }),
      blockOrder: 6,
      isVisible: true
    });
    console.log('✅ Regular fee structure table created');

    // Fee Structure - DASA Admission 2025
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-fee-dasa',
      sectionName: 'fee-structure',
      blockType: 'table',
      blockLabel: 'Fee Structure - DASA Admission',
      content: JSON.stringify({
        title: 'The Fee Structure for B.Tech program - DASA Admission 2025',
        subtitle: '',
        headers: [
          'Details',
          'First Year\nFirst Semester',
          'First Year\nSecond Semester',
          'Second Year\nThird Semester',
          'Second Year\nFourth Semester',
          'Third Year\nFifth Semester',
          'Third Year\nSixth Semester',
          'Fourth Year\nSeventh Semester',
          'Fourth Year\nEighth Semester'
        ],
        rows: [
          ['Tuition Fee', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-', '1,45,200/-'],
          ['Hostel/Facility maintenance fee', '34,000/-', '34,000/-', '37,500/-', '37,500/-', '41,250/-', '41,250/-', '45,500/-', '45,500/-'],
          ['Mess Advance', '30,750/-', '30,750/-', '33,825/-', '33,825/-', '37,250/-', '37,250/-', '40,975/-', '40,975/-'],
          ['Medical Insurance', '1300/-', '-', '1300/-', '-', '1300/-', '-', '1300/-', '-'],
          ['Mess Equipment Maintenance Fee', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Sports Equipment Maintenance Fee', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Club Activities', '300/-', '-', '300/-', '-', '300/-', '-', '300/-', '-'],
          ['Caution Deposit (One Time Fee)', '13,000/-', '-', '-', '-', '-', '-', '-', '-'],
          ['Convocation Fee (One-Time Fee)', '-', '-', '-', '-', '-', '-', '5000/-', '-'],
          ['Sports (One time Fee)', '1100/-', '-', '-', '-', '-', '-', '-', '-'],
          ['Mess (One time Fee)', '1100/-', '-', '-', '-', '-', '-', '-', '-']
        ],
        notes: [
          '(a) CIWG Category: As per DASA fee structure.',
          '(b) Non SAARC & SAARC : As per DASA fee structure -> DASA Admission 2025.',
          'Mode of reporting at the Institute: Offline',
          'Date of commencement of classes: Will be finalized according to the JoSAA/CSAB schedule and will be declared later.'
        ]
      }),
      blockOrder: 7,
      isVisible: true
    });
    console.log('✅ DASA fee structure table created');

    // Curriculum Section
    await ContentBlock.create({
      pageName: 'btech-cyber-security',
      blockId: 'btech-cs-curriculum',
      sectionName: 'curriculum',
      blockType: 'card',
      blockLabel: 'Curriculum Links',
      content: JSON.stringify({
        title: 'The detailed curriculum and regulations can be found here:',
        links: [
          {
            icon: '📅',
            text: 'UG Academic Calendar',
            url: '/academics#calendar'
          },
          {
            icon: '📚',
            text: 'B.Tech Cyber Security Curriculum',
            url: '/curriculum/btech-cyber-security'
          },
          {
            icon: '📖',
            text: 'UG Course Regulations',
            url: '/regulations/ug'
          }
        ]
      }),
      blockOrder: 8,
      isVisible: true
    });
    console.log('✅ Curriculum section created');

    console.log('\n✅ B.Tech Cyber Security page content seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding B.Tech Cyber Security content:', error);
    throw error;
  }
}

// Run the seeder
seedBTechCyberSecurityContent()
  .then(() => {
    console.log('Done!');
    return sequelize.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });

export default seedBTechCyberSecurityContent;

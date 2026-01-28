import sequelize from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

async function seedBTechCSEContent() {
  console.log('🎓 Seeding B.Tech CSE Page Content...\n');

  try {
    // Delete existing content blocks for btech-cse
    await ContentBlock.destroy({ where: { pageName: 'btech-cse' } });
    console.log('🗑️  Cleared existing btech-cse content blocks\n');

    // Hero Block
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Hero Section',
      content: JSON.stringify({
        badge: 'B.Tech Programmes',
        title: 'Computer Science & Engineering',
        subtitle: 'Building a strong foundation in core computer science, engineering, and simulation.'
      }),
      blockOrder: 0,
      isVisible: true
    });
    console.log('✅ Hero block created');

    // Program Description
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-description',
      sectionName: 'description',
      blockType: 'paragraph',
      blockLabel: 'Program Description',
      content: JSON.stringify({
        text: 'The programme is designed to build a strong foundation in Computer Science and Engineering that includes hardware, simulation and emulation. The programme has a blend of core courses, department electives, open electives, and management electives. The BTech CSE programme starts with computation oriented courses and the initial four semesters are focused on creating a strong Computer Science Foundation which enables the student to harness the required engineering skills for problem solving using computer science.'
      }),
      blockOrder: 1,
      isVisible: true
    });
    console.log('✅ Description block created');

    // Lab Images
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-images',
      sectionName: 'images',
      blockType: 'image',
      blockLabel: 'Lab Facility Images',
      content: JSON.stringify({
        images: [
          {
            url: 'cslab1.jpg',
            alt: 'Computer Science Lab Facility 1',
            caption: 'LAB FACILITY'
          },
          {
            url: 'cslab2.jpg',
            alt: 'Computer Science Lab Facility 2',
            caption: 'LAB FACILITY'
          }
        ]
      }),
      blockOrder: 2,
      isVisible: true
    });
    console.log('✅ Lab images block created');

    // Admission Section
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-admission',
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
      blockOrder: 3,
      isVisible: true
    });
    console.log('✅ Admission section created');

    // Admission Additional Info
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-admission-info',
      sectionName: 'admission',
      blockType: 'paragraph',
      blockLabel: 'Admission Additional Info',
      content: JSON.stringify({
        text: 'The number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.'
      }),
      blockOrder: 4,
      isVisible: true
    });
    console.log('✅ Admission additional info created');

    // Fee Structure - Regular Admission 2025
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-fee-regular',
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
      blockOrder: 5,
      isVisible: true
    });
    console.log('✅ Regular fee structure table created');

    // Fee Structure - DASA Admission 2025
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-fee-dasa',
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
      blockOrder: 6,
      isVisible: true
    });
    console.log('✅ DASA fee structure table created');

    // Curriculum Section
    await ContentBlock.create({
      pageName: 'btech-cse',
      blockId: 'btech-cse-curriculum',
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
            text: 'B.Tech CSE Curriculum',
            url: '/curriculum/btech-cse'
          },
          {
            icon: '📖',
            text: 'UG Course Regulations',
            url: '/regulations/ug'
          }
        ]
      }),
      blockOrder: 7,
      isVisible: true
    });
    console.log('✅ Curriculum section created');

    console.log('\n✅ B.Tech CSE page content seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding B.Tech CSE content:', error);
    throw error;
  }
}

// Run the seeder
seedBTechCSEContent()
  .then(() => {
    console.log('Done!');
    return sequelize.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });

export default seedBTechCSEContent;

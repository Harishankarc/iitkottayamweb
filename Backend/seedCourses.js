import Course from './models/Course.js';
import sequelize from './config/database.js';

const feeStructure = [
  {
    details: 'Tuition Fee',
    sem1: '1,45,200/-', sem2: '1,45,200/-', sem3: '1,45,200/-', sem4: '1,45,200/-',
    sem5: '1,45,200/-', sem6: '1,45,200/-', sem7: '1,45,200/-', sem8: '1,45,200/-',
  },
  {
    details: 'Hostel/Facility maintenance fee',
    sem1: '34,000/-', sem2: '34,000/-', sem3: '37,500/-', sem4: '37,500/-',
    sem5: '41,250/-', sem6: '41,250/-', sem7: '45,500/-', sem8: '45,500/-',
  },
  {
    details: 'Mess Advance',
    sem1: '30,750/-', sem2: '30,750/-', sem3: '33,825/-', sem4: '33,825/-',
    sem5: '37,250/-', sem6: '37,250/-', sem7: '40,975/-', sem8: '40,975/-',
  },
  {
    details: 'Medical Insurance',
    sem1: '1300/-', sem2: '-', sem3: '1300/-', sem4: '-',
    sem5: '1300/-', sem6: '-', sem7: '1300/-', sem8: '-',
  },
  {
    details: 'Mess Equipment Maintenance Fee',
    sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
    sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
  },
  {
    details: 'Sports Equipment Maintenance Fee',
    sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
    sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
  },
  {
    details: 'Club Activities',
    sem1: '300/-', sem2: '-', sem3: '300/-', sem4: '-',
    sem5: '300/-', sem6: '-', sem7: '300/-', sem8: '-',
  },
  {
    details: 'Caution Deposit (One Time Fee)',
    sem1: '13,000/-', sem2: '-', sem3: '-', sem4: '-',
    sem5: '-', sem6: '-', sem7: '-', sem8: '-',
  },
  {
    details: 'Convocation Fee (One-Time Fee)',
    sem1: '-', sem2: '-', sem3: '-', sem4: '-',
    sem5: '-', sem6: '-', sem7: '5000/-', sem8: '-',
  },
  {
    details: 'Sports (One time Fee)',
    sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
    sem5: '-', sem6: '-', sem7: '-', sem8: '-',
  },
  {
    details: 'Mess (One time Fee)',
    sem1: '1100/-', sem2: '-', sem3: '-', sem4: '-',
    sem5: '-', sem6: '-', sem7: '-', sem8: '-',
  },
];

const seedCourses = async () => {
  try {
    console.log('✅ Database connected');

    // Clear existing courses
    await Course.destroy({ where: {} });

    const courses = [
      {
        name: 'B.Tech in Computer Science and Engineering',
        shortName: 'B.Tech CSE',
        slug: 'btech-cse',
        program: 'B.Tech',
        department: 'Computer Science and Engineering',
        duration: '4 Years',
        totalSeats: 120,
        description: 'The B.Tech program in Computer Science and Engineering provides comprehensive education in computing principles, software development, and emerging technologies.',
        eligibility: 'Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics. Valid JEE Main score required.',
        objectives: [
          'Develop strong foundation in computer science fundamentals',
          'Build expertise in software development and programming',
          'Understand modern computing technologies and trends',
          'Prepare for careers in software industry and research'
        ],
        syllabus: { semesters: 8, totalCredits: 160 },
        feeStructure: feeStructure,
        isActive: true,
        displayOrder: 1
      },
      {
        name: 'B.Tech in Electronics and Communication Engineering',
        shortName: 'B.Tech ECE',
        slug: 'btech-ece',
        program: 'B.Tech',
        department: 'Electronics and Communication Engineering',
        duration: '4 Years',
        totalSeats: 60,
        description: 'The B.Tech program in Electronics and Communication Engineering covers electronic circuits, communication systems, signal processing, and VLSI design.',
        eligibility: 'Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics. Valid JEE Main score required.',
        objectives: [
          'Master electronics and communication fundamentals',
          'Develop skills in circuit design and analysis',
          'Understand modern communication technologies',
          'Prepare for careers in electronics and telecom industry'
        ],
        syllabus: { semesters: 8, totalCredits: 160 },
        feeStructure: feeStructure,
        isActive: true,
        displayOrder: 2
      },
      {
        name: 'B.Tech in Computer Science and Engineering (Cyber Security)',
        shortName: 'B.Tech CSE (Cyber Security)',
        slug: 'btech-cyber-security',
        program: 'B.Tech',
        department: 'Computer Science and Engineering',
        duration: '4 Years',
        totalSeats: 60,
        description: 'The B.Tech program in Cyber Security focuses on information security, network security, cryptography, and ethical hacking.',
        eligibility: 'Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics. Valid JEE Main score required.',
        objectives: [
          'Build expertise in cybersecurity principles',
          'Understand network and system security',
          'Master cryptographic techniques',
          'Prepare for careers in cybersecurity domain'
        ],
        syllabus: { semesters: 8, totalCredits: 160 },
        feeStructure: feeStructure,
        isActive: true,
        displayOrder: 3
      },
      {
        name: 'B.Tech in Computer Science and Engineering (AI & Data Science)',
        shortName: 'B.Tech CSE (AI & DS)',
        slug: 'btech-ai-ds',
        program: 'B.Tech',
        department: 'Computer Science and Engineering',
        duration: '4 Years',
        totalSeats: 60,
        description: 'The B.Tech program in AI and Data Science covers artificial intelligence, machine learning, data analytics, and big data technologies.',
        eligibility: 'Passed 10+2 or equivalent with Physics, Chemistry, and Mathematics. Valid JEE Main score required.',
        objectives: [
          'Develop expertise in AI and ML algorithms',
          'Master data science and analytics techniques',
          'Understand deep learning and neural networks',
          'Prepare for careers in AI and data-driven industries'
        ],
        syllabus: { semesters: 8, totalCredits: 160 },
        feeStructure: feeStructure,
        isActive: true,
        displayOrder: 4
      }
    ];

    await Course.bulkCreate(courses);
    console.log(`✅ Seeded ${courses.length} courses`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
    process.exit(1);
  }
};

// Run seeder
seedCourses();

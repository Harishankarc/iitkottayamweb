import sequelize from './config/database.js';
import Homepage from './models/Homepage.js';
import Contact from './models/Contact.js';
import Tender from './models/Tender.js';
import Newsletter from './models/Newsletter.js';

const seedHomepageData = async () => {
  try {
    console.log('🌱 Starting database seeding for homepage and additional tables...');

    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');

    // Seed Homepage Settings
    const homepageExists = await Homepage.findOne();
    if (!homepageExists) {
      await Homepage.create({
        visionContent: '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.',
        visionLink: '/institute/governance',
        missionContent: [
          'Produce competent and ethical graduates.',
          'Solve local & global problems through technology.',
          'Promote significance of ethics and integrity.'
        ],
        highestPackage: '45 LPA',
        averagePackage: '14 LPA',
        companiesVisited: '100+',
        placementRate: '95%',
        placementImage: 'placementstatisticsiiit.jpeg',
        quickLinks: [
          { name: 'Admissions', path: '/institute/admission' },
          { name: 'Academics', path: '/institute/academics' },
          { name: 'Departments', path: '/course/btech-cse' },
          { name: 'Research', path: '/research/faculty-research-papers' },
          { name: 'Placements', path: '/placement' },
          { name: 'Alumni', path: '/people/alumni' }
        ],
        newsletterTitle: 'Stay Connected',
        newsletterSubtitle: 'Subscribe for the latest news and updates from IIIT Kottayam.',
        metaTitle: 'IIIT Kottayam - Indian Institute of Information Technology Kottayam',
        metaDescription: 'IIIT Kottayam is a premier technical institution offering undergraduate and postgraduate programs in Computer Science, Electronics, and related fields.',
        metaKeywords: 'IIIT Kottayam, Engineering College, Computer Science, IT Education, Kerala',
        isActive: true
      });
      console.log('✅ Homepage settings seeded');
    } else {
      console.log('ℹ️  Homepage settings already exist');
    }

    // Seed Sample Tenders
    const tendersExist = await Tender.count();
    if (tendersExist === 0) {
      await Tender.bulkCreate([
        {
          tenderNumber: 'IIITK/2025/CIVIL/001',
          title: 'Construction of New Academic Block',
          description: 'Tender for construction of a new academic building with modern facilities including smart classrooms, laboratories, and faculty chambers.',
          category: 'civil',
          status: 'live',
          publishDate: new Date('2025-01-01'),
          closingDate: new Date('2025-02-15'),
          estimatedValue: 5000000.00,
          emdAmount: 100000.00,
          documentUrl: 'https://iiitkottayam.ac.in/tenders/2025-001.pdf',
          contactPerson: 'Dr. K. Satheesh Kumar',
          contactEmail: 'tenders@iiitkottayam.ac.in',
          contactPhone: '+91-481-2597227',
          isPublished: true
        },
        {
          tenderNumber: 'IIITK/2025/IT/002',
          title: 'Supply and Installation of High-Performance Computing Cluster',
          description: 'Procurement of HPC cluster with GPU nodes for research and computational requirements.',
          category: 'it',
          status: 'live',
          publishDate: new Date('2025-01-10'),
          closingDate: new Date('2025-02-20'),
          estimatedValue: 3000000.00,
          emdAmount: 60000.00,
          documentUrl: 'https://iiitkottayam.ac.in/tenders/2025-002.pdf',
          contactPerson: 'Prof. Rajesh Kumar',
          contactEmail: 'tenders@iiitkottayam.ac.in',
          contactPhone: '+91-481-2597227',
          isPublished: true
        },
        {
          tenderNumber: 'IIITK/2024/ELEC/015',
          title: 'Electrical Maintenance Contract',
          description: 'Annual maintenance contract for electrical installations across campus.',
          category: 'electrical',
          status: 'closed',
          publishDate: new Date('2024-11-01'),
          closingDate: new Date('2024-12-15'),
          estimatedValue: 500000.00,
          emdAmount: 10000.00,
          awardedTo: 'ABC Electricals Pvt Ltd',
          awardedAmount: 475000.00,
          awardedDate: new Date('2024-12-20'),
          isPublished: true
        },
        {
          tenderNumber: 'IIITK/2024/PROC/020',
          title: 'Supply of Laboratory Equipment',
          description: 'Procurement of various laboratory equipment for Electronics and Communication Engineering department.',
          category: 'procurement',
          status: 'cancelled',
          publishDate: new Date('2024-10-01'),
          closingDate: new Date('2024-11-10'),
          estimatedValue: 1000000.00,
          emdAmount: 20000.00,
          isPublished: true
        },
        {
          tenderNumber: 'IIITK/2025/SERV/003',
          title: 'Housekeeping and Sanitation Services',
          description: 'Annual contract for housekeeping and sanitation services for academic and administrative buildings.',
          category: 'services',
          status: 'live',
          publishDate: new Date('2025-01-05'),
          closingDate: new Date('2025-02-05'),
          estimatedValue: 800000.00,
          emdAmount: 16000.00,
          documentUrl: 'https://iiitkottayam.ac.in/tenders/2025-003.pdf',
          contactPerson: 'Mr. Suresh Menon',
          contactEmail: 'admin@iiitkottayam.ac.in',
          contactPhone: '+91-481-2597228',
          isPublished: true
        }
      ]);
      console.log('✅ Sample tenders seeded (5 tenders)');
    } else {
      console.log('ℹ️  Tenders already exist');
    }

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Homepage Settings: 1`);
    console.log(`   - Tenders: ${await Tender.count()}`);
    console.log(`   - Newsletter Subscribers: ${await Newsletter.count()}`);
    console.log(`   - Contact Messages: ${await Contact.count()}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedHomepageData();

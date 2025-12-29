import sequelize from './config/database.js';
import PageContent from './models/PageContent.js';
import Homepage from './models/Homepage.js';

const seedAllPageContent = async () => {
  try {
    console.log('🌱 Starting comprehensive page content seeding...\n');

    await sequelize.sync({ alter: true });
    console.log('✅ Database synced\n');

    // ============================================
    // HOMEPAGE CONTENT
    // ============================================
    const [homepage, created] = await PageContent.findOrCreate({
      where: { pageName: 'homepage' },
      defaults: {
        pageTitle: 'IIIT Kottayam - Indian Institute of Information Technology Kottayam',
        pageSlug: '/',
        category: 'main',
        metaDescription: 'IIIT Kottayam is a premier technical institution offering undergraduate and postgraduate programs in Computer Science, Electronics, and related fields.',
        metaKeywords: 'IIIT Kottayam, Engineering College, Computer Science, IT Education, Kerala',
        heroTitle: 'Welcome to IIIT Kottayam',
        heroSubtitle: 'Generating knowledge for the future through research and innovation',
        sections: [
          {
            id: 'vision',
            type: 'text',
            title: 'Vision',
            content: '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.',
            link: '/institute/governance',
            linkText: 'Read Strategic Plan'
          },
          {
            id: 'mission',
            type: 'list',
            title: 'Mission',
            items: [
              'Produce competent and ethical graduates.',
              'Solve local & global problems through technology.',
              'Promote significance of ethics and integrity.'
            ]
          },
          {
            id: 'placement-stats',
            type: 'statistics',
            title: 'Placement Highlights',
            statistics: [
              { label: 'Highest Package', value: '45 LPA' },
              { label: 'Average Package', value: '14 LPA' },
              { label: 'Companies Visited', value: '100+' },
              { label: 'Placement Rate', value: '95%' }
            ]
          },
          {
            id: 'quick-links',
            type: 'links',
            title: 'Quick Access',
            links: [
              { name: 'Admissions', path: '/institute/admission' },
              { name: 'Academics', path: '/institute/academics' },
              { name: 'Departments', path: '/course/btech-cse' },
              { name: 'Research', path: '/research/faculty-research-papers' },
              { name: 'Placements', path: '/placement' },
              { name: 'Alumni', path: '/people/alumni' }
            ]
          }
        ],
        customFields: {
          showAnnouncements: true,
          showLatestNews: true,
          showEvents: true,
          showFaculty: true,
          showCompanyLogos: true,
          showNIRF: true
        },
        isPublished: true,
        sortOrder: 1
      }
    });
    
    // Update if it already exists
    if (!created) {
      await homepage.update({
        sections: [
          {
            id: 'vision',
            type: 'text',
            title: 'Vision',
            content: '"Generating knowledge for the future" — aspiring to be a top-tier, research-driven organization in IT and allied fields.',
            link: '/institute/governance',
            linkText: 'Read Strategic Plan'
          },
          {
            id: 'mission',
            type: 'list',
            title: 'Mission',
            items: [
              'Produce competent and ethical graduates.',
              'Solve local & global problems through technology.',
              'Promote significance of ethics and integrity.'
            ]
          },
          {
            id: 'placement-stats',
            type: 'statistics',
            title: 'Placement Highlights',
            statistics: [
              { label: 'Highest Package', value: '45 LPA' },
              { label: 'Average Package', value: '14 LPA' },
              { label: 'Companies Visited', value: '100+' },
              { label: 'Placement Rate', value: '95%' }
            ]
          },
          {
            id: 'quick-links',
            type: 'links',
            title: 'Quick Access',
            links: [
              { name: 'Admissions', path: '/institute/admission' },
              { name: 'Academics', path: '/institute/academics' },
              { name: 'Departments', path: '/course/btech-cse' },
              { name: 'Research', path: '/research/faculty-research-papers' },
              { name: 'Placements', path: '/placement' },
              { name: 'Alumni', path: '/people/alumni' }
            ]
          }
        ]
      });
    }
    
    console.log('✅ Homepage content seeded');

    // ============================================
    // WHY IIIT KOTTAYAM
    // ============================================
    await PageContent.findOrCreate({
      where: { pageName: 'why-iiitk' },
      defaults: {
        pageTitle: 'Why IIIT Kottayam?',
        pageSlug: '/why-iiitk',
        category: 'main',
        metaDescription: 'Discover why IIIT Kottayam is the ideal choice for your engineering education.',
        heroTitle: 'Why Choose IIIT Kottayam?',
        heroSubtitle: 'Excellence in Education, Research, and Innovation',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'About IIIT Kottayam',
            content: 'IIIT Kottayam is one of the premier institutes of national importance, established by the Ministry of Education, Government of India. We offer world-class education in Information Technology and allied fields.'
          },
          {
            id: 'highlights',
            type: 'list',
            title: 'Key Highlights',
            items: [
              'Institute of National Importance',
              'State-of-the-art infrastructure and laboratories',
              'Experienced and dedicated faculty',
              'Strong industry partnerships',
              'Excellent placement records',
              'Research-oriented curriculum',
              'Active student clubs and activities',
              'Beautiful campus in God\'s Own Country - Kerala'
            ]
          },
          {
            id: 'achievements',
            type: 'text',
            title: 'Our Achievements',
            content: 'IIIT Kottayam has consistently maintained high standards in academics, research, and placements. Our students have won numerous national and international awards in coding, innovation, and entrepreneurship.'
          }
        ],
        isPublished: true,
        sortOrder: 2
      }
    });
    console.log('✅ Why IIITK content seeded');

    // ============================================
    // INSTITUTE SECTION
    // ============================================

    // Governance
    await PageContent.findOrCreate({
      where: { pageName: 'governance' },
      defaults: {
        pageTitle: 'Governance - IIIT Kottayam',
        pageSlug: '/institute/governance',
        category: 'institute',
        metaDescription: 'Learn about the governance structure and leadership of IIIT Kottayam.',
        heroTitle: 'Governance',
        heroSubtitle: 'Leadership and Administrative Structure',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'About Governance',
            content: 'IIIT Kottayam operates under a well-defined governance structure that ensures transparency, accountability, and excellence in all its operations.'
          },
          {
            id: 'board-of-governors',
            type: 'text',
            title: 'Board of Governors',
            content: 'The Board of Governors is the apex body of the institute responsible for policy formulation and strategic direction.'
          },
          {
            id: 'senate',
            type: 'text',
            title: 'Senate',
            content: 'The Senate is the academic body responsible for maintaining academic standards and approving curriculum and courses.'
          },
          {
            id: 'committees',
            type: 'list',
            title: 'Key Committees',
            items: [
              'Finance Committee',
              'Building and Works Committee',
              'Academic Council',
              'Research Committee',
              'Student Affairs Committee'
            ]
          }
        ],
        isPublished: true,
        sortOrder: 10
      }
    });
    console.log('✅ Governance content seeded');

    // Admission
    await PageContent.findOrCreate({
      where: { pageName: 'admission' },
      defaults: {
        pageTitle: 'Admissions - IIIT Kottayam',
        pageSlug: '/institute/admission',
        category: 'institute',
        metaDescription: 'Information about admissions process, eligibility criteria, and important dates for IIIT Kottayam.',
        heroTitle: 'Admissions',
        heroSubtitle: 'Join the IIIT Kottayam Family',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'Admission Process',
            content: 'IIIT Kottayam offers admission to various undergraduate and postgraduate programs through national-level entrance examinations.'
          },
          {
            id: 'programs',
            type: 'list',
            title: 'Available Programs',
            items: [
              'B.Tech in Computer Science and Engineering',
              'B.Tech in Electronics and Communication Engineering',
              'B.Tech in Cyber Security',
              'B.Tech in AI and Data Science',
              'iM.Tech (5-year integrated program)',
              'M.Tech programs',
              'Ph.D programs'
            ]
          },
          {
            id: 'eligibility',
            type: 'text',
            title: 'Eligibility Criteria',
            content: 'Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics. Admission is through JEE Main, JEE Advanced, or other relevant entrance examinations.'
          },
          {
            id: 'process',
            type: 'list',
            title: 'Admission Process',
            items: [
              'Appear for JEE Main/JEE Advanced',
              'Participate in JoSAA counseling',
              'Select IIIT Kottayam as preferred choice',
              'Complete document verification',
              'Pay admission fees',
              'Report to campus'
            ]
          }
        ],
        customFields: {
          importantDates: [
            { event: 'Application Start', date: 'January 2026' },
            { event: 'Last Date to Apply', date: 'April 2026' },
            { event: 'Entrance Exam', date: 'May 2026' },
            { event: 'Results', date: 'June 2026' },
            { event: 'Counseling', date: 'July 2026' }
          ]
        },
        isPublished: true,
        sortOrder: 11
      }
    });
    console.log('✅ Admission content seeded');

    // Academics
    await PageContent.findOrCreate({
      where: { pageName: 'academics' },
      defaults: {
        pageTitle: 'Academics - IIIT Kottayam',
        pageSlug: '/institute/academics',
        category: 'institute',
        metaDescription: 'Academic programs, curriculum, and facilities at IIIT Kottayam.',
        heroTitle: 'Academics',
        heroSubtitle: 'Excellence in Teaching and Learning',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'Academic Excellence',
            content: 'IIIT Kottayam offers rigorous academic programs designed to prepare students for leadership roles in industry and research.'
          },
          {
            id: 'curriculum',
            type: 'text',
            title: 'Curriculum',
            content: 'Our curriculum is regularly updated to reflect current industry needs and technological advances. It combines theoretical knowledge with practical skills through laboratory work, projects, and internships.'
          },
          {
            id: 'features',
            type: 'list',
            title: 'Academic Features',
            items: [
              'Industry-aligned curriculum',
              'Experienced faculty from premier institutions',
              'State-of-the-art laboratories',
              'Industry internships and projects',
              'Research opportunities',
              'Flexible credit system',
              'Online learning resources',
              'Regular seminars and workshops'
            ]
          }
        ],
        isPublished: true,
        sortOrder: 12
      }
    });
    console.log('✅ Academics content seeded');

    // Scholarship
    await PageContent.findOrCreate({
      where: { pageName: 'scholarship' },
      defaults: {
        pageTitle: 'Scholarships & Educational Loans - IIIT Kottayam',
        pageSlug: '/institute/scholarship',
        category: 'institute',
        metaDescription: 'Information about scholarships and educational loan facilities available at IIIT Kottayam.',
        heroTitle: 'Scholarships & Educational Loans',
        heroSubtitle: 'Financial Support for Students',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'Financial Assistance',
            content: 'IIIT Kottayam is committed to ensuring that financial constraints do not prevent talented students from pursuing quality education.'
          },
          {
            id: 'scholarships',
            type: 'list',
            title: 'Available Scholarships',
            items: [
              'Merit-cum-Means Scholarship',
              'SC/ST Scholarship',
              'OBC (Non-Creamy Layer) Scholarship',
              'Minority Scholarship',
              'EWS Scholarship',
              'Girl Child Scholarship',
              'Sports Quota Scholarship',
              'Physically Challenged Scholarship'
            ]
          },
          {
            id: 'loans',
            type: 'text',
            title: 'Educational Loans',
            content: 'Students can avail educational loans from various nationalized banks. The institute provides necessary certificates and assistance for loan processing.'
          },
          {
            id: 'fee-structure',
            type: 'text',
            title: 'Fee Structure',
            content: 'The fee structure is approved by the Board of Governors and is subject to revision. Fee waivers and installment facilities are available for economically weaker students.'
          }
        ],
        isPublished: true,
        sortOrder: 13
      }
    });
    console.log('✅ Scholarship content seeded');

    // ============================================
    // COURSE PAGES
    // ============================================

    // B.Tech CSE
    await PageContent.findOrCreate({
      where: { pageName: 'btech-cse' },
      defaults: {
        pageTitle: 'B.Tech Computer Science and Engineering - IIIT Kottayam',
        pageSlug: '/course/btech-cse',
        category: 'course',
        metaDescription: 'B.Tech in Computer Science and Engineering program at IIIT Kottayam.',
        heroTitle: 'B.Tech Computer Science and Engineering',
        heroSubtitle: 'Building Future Technology Leaders',
        sections: [
          {
            id: 'overview',
            type: 'text',
            title: 'Program Overview',
            content: 'The B.Tech program in Computer Science and Engineering is a 4-year undergraduate program designed to provide comprehensive knowledge in computer science fundamentals, programming, algorithms, data structures, software engineering, and emerging technologies.'
          },
          {
            id: 'highlights',
            type: 'list',
            title: 'Program Highlights',
            items: [
              'Comprehensive curriculum covering all aspects of CSE',
              'Hands-on experience through projects and internships',
              'Industry collaborations and guest lectures',
              'Research opportunities in cutting-edge areas',
              'Excellent placement records',
              'State-of-the-art computer labs',
              'Experienced faculty from IITs and NITs'
            ]
          },
          {
            id: 'career',
            type: 'text',
            title: 'Career Opportunities',
            content: 'Graduates can pursue careers as Software Engineers, Data Scientists, AI/ML Engineers, Cloud Architects, Cybersecurity Experts, and more in leading tech companies worldwide.'
          }
        ],
        customFields: {
          duration: '4 years',
          degree: 'Bachelor of Technology',
          intake: '120 seats',
          eligibility: 'JEE Main'
        },
        isPublished: true,
        sortOrder: 20
      }
    });
    console.log('✅ B.Tech CSE content seeded');

    // B.Tech ECE
    await PageContent.findOrCreate({
      where: { pageName: 'btech-ece' },
      defaults: {
        pageTitle: 'B.Tech Electronics and Communication Engineering - IIIT Kottayam',
        pageSlug: '/course/btech-ece',
        category: 'course',
        metaDescription: 'B.Tech in Electronics and Communication Engineering program at IIIT Kottayam.',
        heroTitle: 'B.Tech Electronics and Communication Engineering',
        heroSubtitle: 'Innovation in Electronics and Communication',
        sections: [
          {
            id: 'overview',
            type: 'text',
            title: 'Program Overview',
            content: 'The B.Tech program in Electronics and Communication Engineering focuses on electronic devices, circuits, communication systems, signal processing, and VLSI design.'
          },
          {
            id: 'highlights',
            type: 'list',
            title: 'Program Highlights',
            items: [
              'Strong foundation in electronics and communication',
              'Advanced laboratories for practical learning',
              'Focus on emerging areas like IoT and 5G',
              'Industry internships and projects',
              'Research opportunities in signal processing',
              'Excellent placement support'
            ]
          }
        ],
        customFields: {
          duration: '4 years',
          degree: 'Bachelor of Technology',
          intake: '60 seats',
          eligibility: 'JEE Main'
        },
        isPublished: true,
        sortOrder: 21
      }
    });
    console.log('✅ B.Tech ECE content seeded');

    // ============================================
    // FACILITIES PAGES
    // ============================================

    // Hostel
    await PageContent.findOrCreate({
      where: { pageName: 'hostel' },
      defaults: {
        pageTitle: 'Hostel Facilities - IIIT Kottayam',
        pageSlug: '/facilities/hostel',
        category: 'facilities',
        metaDescription: 'Comfortable and secure hostel facilities for students at IIIT Kottayam.',
        heroTitle: 'Hostel Facilities',
        heroSubtitle: 'Your Home Away From Home',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'Hostel Life at IIIT Kottayam',
            content: 'IIIT Kottayam provides separate hostel facilities for boys and girls with modern amenities and 24/7 security.'
          },
          {
            id: 'amenities',
            type: 'list',
            title: 'Hostel Amenities',
            items: [
              'Spacious and well-ventilated rooms',
              'Attached bathrooms with hot water facility',
              'High-speed WiFi connectivity',
              '24/7 security and CCTV surveillance',
              'Common room with TV and indoor games',
              'Reading room and study areas',
              'Laundry facilities',
              'Mess with nutritious food',
              'Medical facilities',
              'Sports facilities'
            ]
          },
          {
            id: 'rules',
            type: 'text',
            title: 'Hostel Rules',
            content: 'Students are expected to follow hostel rules and maintain discipline. Ragging is strictly prohibited and punishable by law.'
          }
        ],
        isPublished: true,
        sortOrder: 40
      }
    });
    console.log('✅ Hostel content seeded');

    // Library
    await PageContent.findOrCreate({
      where: { pageName: 'library' },
      defaults: {
        pageTitle: 'Library - IIIT Kottayam',
        pageSlug: '/facilities/library',
        category: 'facilities',
        metaDescription: 'Central library with extensive collection of books, journals, and digital resources.',
        heroTitle: 'Central Library',
        heroSubtitle: 'Knowledge Hub for Learning and Research',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'About the Library',
            content: 'The Central Library at IIIT Kottayam is equipped with a vast collection of books, journals, magazines, and digital resources to support academic and research needs.'
          },
          {
            id: 'facilities',
            type: 'list',
            title: 'Library Facilities',
            items: [
              'Over 10,000 books across various subjects',
              'Access to international journals and databases',
              'Digital library with e-books and e-journals',
              'Reading halls with comfortable seating',
              'Computer terminals with internet access',
              'Printing and photocopying facilities',
              'Reference section',
              'Magazine and newspaper section',
              'Book bank facility',
              'Inter-library loan facility'
            ]
          },
          {
            id: 'timings',
            type: 'text',
            title: 'Library Timings',
            content: 'The library is open from 8:00 AM to 10:00 PM on all working days. Extended hours during examination periods.'
          }
        ],
        customFields: {
          totalBooks: '10,000+',
          digitalResources: 'IEEE, Springer, ACM',
          seatingCapacity: '200'
        },
        isPublished: true,
        sortOrder: 41
      }
    });
    console.log('✅ Library content seeded');

    // ============================================
    // FOOTER PAGES
    // ============================================

    // RTI
    await PageContent.findOrCreate({
      where: { pageName: 'rti' },
      defaults: {
        pageTitle: 'Right to Information - IIIT Kottayam',
        pageSlug: '/rti',
        category: 'footer',
        metaDescription: 'Information about RTI Act and how to file RTI applications at IIIT Kottayam.',
        heroTitle: 'Right to Information',
        heroSubtitle: 'Transparency and Accountability',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'About RTI',
            content: 'The Right to Information Act, 2005 mandates timely response to citizen requests for government information. IIIT Kottayam is committed to transparency and provides information as per RTI guidelines.'
          },
          {
            id: 'pio',
            type: 'text',
            title: 'Public Information Officer',
            content: 'Name: [To be filled]\nDesignation: Administrative Officer\nEmail: pio@iiitkottayam.ac.in\nPhone: +91-481-2597227'
          },
          {
            id: 'how-to-apply',
            type: 'list',
            title: 'How to Apply for RTI',
            items: [
              'Download RTI application form',
              'Fill in required details',
              'Pay prescribed fee (₹10 via DD/Cash)',
              'Submit to PIO office or by post',
              'Receive acknowledgment',
              'Get information within 30 days'
            ]
          }
        ],
        isPublished: true,
        sortOrder: 60
      }
    });
    console.log('✅ RTI content seeded');

    // ICC
    await PageContent.findOrCreate({
      where: { pageName: 'icc' },
      defaults: {
        pageTitle: 'Internal Complaints Committee - IIIT Kottayam',
        pageSlug: '/icc',
        category: 'footer',
        metaDescription: 'Internal Complaints Committee for prevention of sexual harassment at IIIT Kottayam.',
        heroTitle: 'Internal Complaints Committee (ICC)',
        heroSubtitle: 'Safe and Respectful Campus',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'About ICC',
            content: 'The Internal Complaints Committee (ICC) has been constituted as per the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013 to prevent and address sexual harassment at the workplace.'
          },
          {
            id: 'objectives',
            type: 'list',
            title: 'Objectives',
            items: [
              'Prevent sexual harassment at workplace',
              'Provide mechanism for complaint redressal',
              'Ensure safe and respectful work environment',
              'Create awareness about sexual harassment',
              'Conduct training and workshops'
            ]
          },
          {
            id: 'complaint',
            type: 'text',
            title: 'How to File a Complaint',
            content: 'Complaints can be filed in writing or electronically to the ICC. All complaints are treated with utmost confidentiality. Contact: icc@iiitkottayam.ac.in'
          }
        ],
        isPublished: true,
        sortOrder: 61
      }
    });
    console.log('✅ ICC content seeded');

    // Anti-Ragging
    await PageContent.findOrCreate({
      where: { pageName: 'anti-ragging' },
      defaults: {
        pageTitle: 'Anti-Ragging Policy - IIIT Kottayam',
        pageSlug: '/anti-ragging',
        category: 'footer',
        metaDescription: 'Anti-ragging measures and policies at IIIT Kottayam.',
        heroTitle: 'Anti-Ragging Policy',
        heroSubtitle: 'Zero Tolerance for Ragging',
        sections: [
          {
            id: 'introduction',
            type: 'text',
            title: 'Anti-Ragging Commitment',
            content: 'IIIT Kottayam has zero tolerance towards ragging. Ragging is a criminal offense and is strictly prohibited. Any form of ragging will result in severe punishment including expulsion from the institute.'
          },
          {
            id: 'definition',
            type: 'text',
            title: 'What is Ragging?',
            content: 'Ragging means any act that causes physical or psychological harm, fear, or apprehension in a student. It includes teasing, abuse, bullying, or any form of harassment.'
          },
          {
            id: 'measures',
            type: 'list',
            title: 'Anti-Ragging Measures',
            items: [
              'Anti-ragging committee and squad',
              'CCTV surveillance in campus',
              'Regular awareness programs',
              'Anonymous complaint mechanism',
              'Swift action on complaints',
              'Police involvement when necessary',
              'Counseling support for victims'
            ]
          },
          {
            id: 'helpline',
            type: 'text',
            title: 'Anti-Ragging Helpline',
            content: '24/7 Helpline: 1800-XXX-XXXX\nEmail: antiragging@iiitkottayam.ac.in\nUGC Anti-Ragging Helpline: 1800-180-5522'
          }
        ],
        isPublished: true,
        sortOrder: 62
      }
    });
    console.log('✅ Anti-Ragging content seeded');

    console.log('\n✅ All page content seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Total Pages: ${await PageContent.count()}`);
    console.log('\nPages by category:');
    const categories = await PageContent.findAll({
      attributes: ['category', [sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      group: ['category']
    });
    categories.forEach(cat => {
      console.log(`   - ${cat.category}: ${cat.get('count')} pages`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding page content:', error);
    process.exit(1);
  }
};

seedAllPageContent();

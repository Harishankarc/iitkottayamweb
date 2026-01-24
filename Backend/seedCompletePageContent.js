import ContentBlock from './models/ContentBlock.js';
import sequelize from './config/database.js';

/**
 * This script extracts ALL content from user-facing pages and stores it in content_blocks table
 * so everything becomes editable through the admin panel
 */

const COMPLETE_PAGE_CONTENT = {
  'why-iiitk': [
    {
      blockId: 'why-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Why IIIT Kottayam Hero',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Why IIIT Kottayam',
        subtitle: 'Pioneering excellence in Information Technology education and research',
        badge: 'Established 2015 • Institution of National Importance'
      }
    },
    {
      blockId: 'why-about-intro',
      sectionName: 'about',
      blockType: 'paragraph',
      blockLabel: 'About Institute - Introduction',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '🎓',
        title: 'About Our Institute',
        text: 'The Indian Institute of Information Technology (IIIT) Kottayam is an "Institution of National Importance" established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.'
      }
    },
    {
      blockId: 'why-about-campus',
      sectionName: 'about',
      blockType: 'paragraph',
      blockLabel: 'About Institute - Campus Details',
      blockOrder: 2,
      isVisible: true,
      content: {
        text: 'The institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.'
      }
    },
    {
      blockId: 'why-highlights',
      sectionName: 'highlights',
      blockType: 'list',
      blockLabel: 'Key Highlights',
      blockOrder: 3,
      isVisible: true,
      content: {
        title: 'Key Highlights',
        items: [
          '🤝 PPP Model',
          '🌳 53 Acre Campus',
          '🚀 AIC Certified',
          '🏆 National Importance'
        ]
      }
    },
    {
      blockId: 'why-cta',
      sectionName: 'cta',
      blockType: 'button',
      blockLabel: 'Admission Call-to-Action',
      blockOrder: 4,
      isVisible: true,
      content: {
        title: 'Interested in Joining IIIT Kottayam?',
        description: 'Explore our admission process, eligibility criteria, and application deadlines',
        buttonText: 'Learn More',
        link: '/admissions'
      }
    }
  ],

  'homepage': [
    {
      blockId: 'home-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Main Hero Banner',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Welcome to IIIT Kottayam',
        subtitle: 'Indian Institute of Information Technology Kottayam',
        description: 'A premier institute fostering cutting-edge research and world-class education in Information Technology',
        buttonText: 'Explore Programs',
        buttonLink: '/admissions'
      }
    },
    {
      blockId: 'home-about',
      sectionName: 'about',
      blockType: 'paragraph',
      blockLabel: 'About IIIT Kottayam',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '🎓',
        title: 'About IIIT Kottayam',
        text: 'IIIT Kottayam is an Institution of National Importance established in 2015 under the PPP model. Located in the scenic Kottayam district of Kerala, we offer world-class education in Computer Science, Electronics, and emerging technologies.'
      }
    },
    {
      blockId: 'home-vision',
      sectionName: 'vision',
      blockType: 'paragraph',
      blockLabel: 'Our Vision',
      blockOrder: 2,
      isVisible: true,
      content: {
        icon: '🎯',
        title: 'Our Vision',
        text: 'To be a globally recognized center of excellence in Information Technology education, research, and innovation, contributing to nation-building through skilled professionals and cutting-edge research.'
      }
    },
    {
      blockId: 'home-mission',
      sectionName: 'mission',
      blockType: 'list',
      blockLabel: 'Mission Points',
      blockOrder: 3,
      isVisible: true,
      content: {
        title: 'Our Mission',
        items: [
          'Provide quality education in IT and allied fields',
          'Foster research and innovation ecosystem',
          'Develop industry-ready professionals',
          'Promote entrepreneurship and startups',
          'Collaborate with industry and academia globally'
        ]
      }
    },
    {
      blockId: 'home-stats',
      sectionName: 'statistics',
      blockType: 'statistics',
      blockLabel: 'Key Statistics',
      blockOrder: 4,
      isVisible: true,
      content: {
        stats: [
          { label: 'Established', value: '2015', icon: '📅' },
          { label: 'Campus Size', value: '53 Acres', icon: '🏫' },
          { label: 'Students', value: '500+', icon: '👨‍🎓' },
          { label: 'Placement Rate', value: '95%', icon: '💼' }
        ]
      }
    }
  ],

  'academics': [
    {
      blockId: 'academics-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Academics Hero',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Academics at IIIT Kottayam',
        subtitle: 'Excellence in Technology Education',
        description: 'Comprehensive programs designed to create future leaders in technology'
      }
    },
    {
      blockId: 'academics-overview',
      sectionName: 'overview',
      blockType: 'paragraph',
      blockLabel: 'Academic Overview',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '📚',
        title: 'Academic Excellence',
        text: 'IIIT Kottayam offers undergraduate and postgraduate programs in Computer Science, Electronics, Artificial Intelligence, and Data Science. Our curriculum is designed in collaboration with industry experts to ensure students are equipped with cutting-edge skills.'
      }
    },
    {
      blockId: 'academics-programs',
      sectionName: 'programs',
      blockType: 'list',
      blockLabel: 'Programs Offered',
      blockOrder: 2,
      isVisible: true,
      content: {
        title: 'Programs Offered',
        items: [
          'B.Tech in Computer Science and Engineering',
          'B.Tech in Electronics and Communication Engineering',
          'B.Tech in Artificial Intelligence and Data Science',
          'B.Tech in Cyber Security',
          'M.Tech in Computer Science and Engineering',
          'Ph.D. Programs'
        ]
      }
    },
    {
      blockId: 'academics-features',
      sectionName: 'features',
      blockType: 'list',
      blockLabel: 'Academic Features',
      blockOrder: 3,
      isVisible: true,
      content: {
        title: 'Key Features',
        items: [
          '🏆 AICTE Approved Curriculum',
          '👨‍🏫 Expert Faculty from IITs and NITs',
          '💻 State-of-the-art Labs and Infrastructure',
          '🤝 Industry Collaborations and Internships',
          '📖 Research-Oriented Learning',
          '🌍 International Exposure Programs'
        ]
      }
    },
    {
      blockId: 'academics-cta',
      sectionName: 'cta',
      blockType: 'button',
      blockLabel: 'View Programs CTA',
      blockOrder: 4,
      isVisible: true,
      content: {
        title: 'Explore Our Programs',
        description: 'Discover detailed curriculum, faculty, and admission requirements',
        buttonText: 'View All Programs',
        link: '/courses'
      }
    }
  ],

  'admission': [
    {
      blockId: 'admission-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Admissions Hero',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Admissions to IIIT Kottayam',
        subtitle: 'Begin Your Journey to Excellence',
        description: 'Join India\'s premier institute for Information Technology education'
      }
    },
    {
      blockId: 'admission-process',
      sectionName: 'process',
      blockType: 'paragraph',
      blockLabel: 'Admission Process',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '📝',
        title: 'Admission Process',
        text: 'Admissions to IIIT Kottayam are based on JEE Main ranks for B.Tech programs and GATE scores for M.Tech programs. The institute follows a transparent and merit-based selection process.'
      }
    },
    {
      blockId: 'admission-eligibility',
      sectionName: 'eligibility',
      blockType: 'list',
      blockLabel: 'Eligibility Criteria',
      blockOrder: 2,
      isVisible: true,
      content: {
        title: 'Eligibility Criteria',
        items: [
          'B.Tech: JEE Main qualified with 75% in Class 12',
          'M.Tech: GATE qualified with 60% in B.Tech',
          'Ph.D.: M.Tech/M.E. with valid GATE/NET score',
          'Age limit: As per JoSAA/CCMT norms'
        ]
      }
    },
    {
      blockId: 'admission-dates',
      sectionName: 'dates',
      blockType: 'paragraph',
      blockLabel: 'Important Dates',
      blockOrder: 3,
      isVisible: true,
      content: {
        icon: '📅',
        title: 'Important Dates 2026',
        text: 'Application Start: April 2026 | Application Deadline: June 2026 | Counseling: July 2026 | Academic Session Begins: August 2026'
      }
    }
  ],

  'governance': [
    {
      blockId: 'governance-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Governance Hero',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Governance at IIIT Kottayam',
        subtitle: 'Leadership and Administration',
        description: 'Committed to transparency, excellence, and ethical practices'
      }
    },
    {
      blockId: 'governance-bod',
      sectionName: 'board',
      blockType: 'paragraph',
      blockLabel: 'Board of Governors',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '👥',
        title: 'Board of Governors',
        text: 'The Board of Governors (BoG) is the apex decision-making body of IIIT Kottayam, comprising eminent academics, industry leaders, and government representatives. The BoG oversees academic policies, financial management, and strategic direction.'
      }
    },
    {
      blockId: 'governance-senate',
      sectionName: 'senate',
      blockType: 'paragraph',
      blockLabel: 'Academic Senate',
      blockOrder: 2,
      isVisible: true,
      content: {
        icon: '🎓',
        title: 'Academic Senate',
        text: 'The Senate is responsible for academic matters including curriculum design, examination policies, research initiatives, and quality assurance. It ensures academic excellence and maintains high standards of education.'
      }
    },
    {
      blockId: 'governance-committees',
      sectionName: 'committees',
      blockType: 'list',
      blockLabel: 'Key Committees',
      blockOrder: 3,
      isVisible: true,
      content: {
        title: 'Governance Committees',
        items: [
          'Finance Committee',
          'Building & Works Committee',
          'Internal Quality Assurance Cell (IQAC)',
          'Anti-Ragging Committee',
          'Grievance Redressal Committee',
          'Internal Complaints Committee (ICC)'
        ]
      }
    }
  ],

  'scholarship': [
    {
      blockId: 'scholarship-hero',
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Scholarships Hero',
      blockOrder: 0,
      isVisible: true,
      content: {
        title: 'Scholarships & Financial Aid',
        subtitle: 'Supporting Meritorious Students',
        description: 'Multiple scholarship opportunities to support your education journey'
      }
    },
    {
      blockId: 'scholarship-overview',
      sectionName: 'overview',
      blockType: 'paragraph',
      blockLabel: 'Scholarship Overview',
      blockOrder: 1,
      isVisible: true,
      content: {
        icon: '💰',
        title: 'Financial Support',
        text: 'IIIT Kottayam provides various scholarships and financial assistance programs to support meritorious and economically disadvantaged students. We believe that financial constraints should not be a barrier to quality education.'
      }
    },
    {
      blockId: 'scholarship-types',
      sectionName: 'types',
      blockType: 'list',
      blockLabel: 'Types of Scholarships',
      blockOrder: 2,
      isVisible: true,
      content: {
        title: 'Available Scholarships',
        items: [
          '🏆 Merit-based Scholarships (Top 10% students)',
          '💸 Need-based Financial Aid (EWS category)',
          '👨‍👩‍👧‍👦 SC/ST/OBC Fee Concessions',
          '♿ Scholarships for Differently-abled Students',
          '🎖️ Sports and Cultural Excellence Awards',
          '🌟 Institute Merit Scholarships',
          '📚 Central Government Schemes (MCM, NSP)',
          '🏛️ State Government Scholarships'
        ]
      }
    },
    {
      blockId: 'scholarship-apply',
      sectionName: 'apply',
      blockType: 'button',
      blockLabel: 'Apply for Scholarship',
      blockOrder: 3,
      isVisible: true,
      content: {
        title: 'Apply for Scholarships',
        description: 'Check eligibility and submit your scholarship application online',
        buttonText: 'Apply Now',
        link: '/admissions'
      }
    }
  ]
};

async function seedCompleteContent() {
  console.log('🌱 Seeding complete page content to database...\n');

  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalSkipped = 0;

    for (const [pageName, blocks] of Object.entries(COMPLETE_PAGE_CONTENT)) {
      console.log(`\n📄 Processing: ${pageName}`);
      console.log(`   Blocks to add: ${blocks.length}`);

      for (const blockData of blocks) {
        try {
          // Check if block already exists
          const existing = await ContentBlock.findOne({
            where: { 
              pageName: pageName,
              blockId: blockData.blockId 
            }
          });

          const fullBlockData = {
            ...blockData,
            pageName: pageName
          };

          if (existing) {
            // Update existing block
            await existing.update(fullBlockData);
            console.log(`   ✏️  Updated: ${blockData.blockLabel}`);
            totalUpdated++;
          } else {
            // Create new block
            await ContentBlock.create(fullBlockData);
            console.log(`   ✅ Created: ${blockData.blockLabel}`);
            totalCreated++;
          }
        } catch (error) {
          console.log(`   ❌ Error with ${blockData.blockLabel}:`, error.message);
          totalSkipped++;
        }
      }
    }

    console.log('\n' + '='.repeat(60));
    console.log('📊 SEEDING SUMMARY');
    console.log('='.repeat(60));
    console.log(`✅ Created: ${totalCreated} blocks`);
    console.log(`✏️  Updated: ${totalUpdated} blocks`);
    console.log(`❌ Skipped: ${totalSkipped} blocks`);
    console.log(`📦 Total Pages: ${Object.keys(COMPLETE_PAGE_CONTENT).length}`);
    console.log('='.repeat(60));

    console.log('\n🎉 All content is now editable through Admin Panel!');
    console.log('👉 Go to: Admin → Content Management\n');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await sequelize.close();
  }
}

seedCompleteContent();

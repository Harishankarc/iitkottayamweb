import sequelize from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

// Content templates for different page types
const CONTENT_TEMPLATES = {
  // Course pages
  course: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Course Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'Excellence in Technology Education',
        description: 'A comprehensive program designed to shape future tech leaders',
        backgroundImage: '/images/course-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-overview`,
      pageName,
      sectionName: 'overview',
      blockType: 'paragraph',
      blockLabel: 'Course Overview',
      content: {
        icon: '🎓',
        title: 'About the Program',
        text: 'This program offers a comprehensive curriculum combining theoretical knowledge with practical skills. Students gain hands-on experience through labs, projects, and industry internships.'
      },
      blockOrder: 1,
      isVisible: true
    },
    {
      blockId: `${pageName}-highlights`,
      pageName,
      sectionName: 'highlights',
      blockType: 'list',
      blockLabel: 'Program Highlights',
      content: {
        title: 'Key Features',
        icon: '✓',
        items: [
          'Industry-aligned curriculum',
          'State-of-the-art laboratories',
          'Expert faculty members',
          'Hands-on projects',
          'Industry internships',
          'Placement assistance'
        ]
      },
      blockOrder: 2,
      isVisible: true
    }
  ],

  // Club pages
  club: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Club Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'Student Community & Activities',
        description: 'Join us to learn, collaborate, and grow together',
        backgroundImage: '/images/club-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-about`,
      pageName,
      sectionName: 'about',
      blockType: 'paragraph',
      blockLabel: 'About the Club',
      content: {
        icon: '👥',
        title: 'About Us',
        text: 'Our club provides a platform for students to explore their interests, develop new skills, and connect with like-minded peers. We organize workshops, competitions, and events throughout the year.'
      },
      blockOrder: 1,
      isVisible: true
    },
    {
      blockId: `${pageName}-activities`,
      pageName,
      sectionName: 'activities',
      blockType: 'list',
      blockLabel: 'Club Activities',
      content: {
        title: 'What We Do',
        icon: '🎯',
        items: [
          'Technical workshops and seminars',
          'Hackathons and competitions',
          'Guest lectures by industry experts',
          'Collaborative projects',
          'Networking events',
          'Skill development programs'
        ]
      },
      blockOrder: 2,
      isVisible: true
    }
  ],

  // Facility pages
  facility: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Facility Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'World-Class Infrastructure',
        description: 'Modern facilities designed for student comfort and excellence',
        backgroundImage: '/images/facility-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-description`,
      pageName,
      sectionName: 'description',
      blockType: 'paragraph',
      blockLabel: 'Facility Description',
      content: {
        icon: '🏢',
        title: 'Overview',
        text: 'Our facilities are equipped with modern amenities to ensure a comfortable and productive environment for students. We maintain high standards of quality and cleanliness.'
      },
      blockOrder: 1,
      isVisible: true
    },
    {
      blockId: `${pageName}-features`,
      pageName,
      sectionName: 'features',
      blockType: 'list',
      blockLabel: 'Facility Features',
      content: {
        title: 'Key Features',
        icon: '✓',
        items: [
          'Modern infrastructure',
          '24/7 availability',
          'Well-maintained facilities',
          'Safety and security',
          'Professional staff',
          'Student-friendly environment'
        ]
      },
      blockOrder: 2,
      isVisible: true
    }
  ],

  // Research pages
  research: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Research Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'Innovation Through Research',
        description: 'Advancing knowledge and technology through cutting-edge research',
        backgroundImage: '/images/research-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-overview`,
      pageName,
      sectionName: 'overview',
      blockType: 'paragraph',
      blockLabel: 'Research Overview',
      content: {
        icon: '🔬',
        title: 'Our Research',
        text: 'IIIT Kottayam is committed to fostering a vibrant research culture. Our faculty and students engage in cutting-edge research across various domains of technology and innovation.'
      },
      blockOrder: 1,
      isVisible: true
    },
    {
      blockId: `${pageName}-areas`,
      pageName,
      sectionName: 'areas',
      blockType: 'list',
      blockLabel: 'Research Focus Areas',
      content: {
        title: 'Focus Areas',
        icon: '📊',
        items: [
          'Artificial Intelligence & Machine Learning',
          'Data Science & Analytics',
          'Cybersecurity',
          'Internet of Things',
          'Cloud Computing',
          'Software Engineering'
        ]
      },
      blockOrder: 2,
      isVisible: true
    }
  ],

  // People pages
  people: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'People Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'Our Team',
        description: 'Dedicated professionals working towards excellence in education',
        backgroundImage: '/images/people-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-intro`,
      pageName,
      sectionName: 'intro',
      blockType: 'paragraph',
      blockLabel: 'Introduction',
      content: {
        icon: '👤',
        title: 'Meet Our Team',
        text: 'Our team comprises experienced professionals dedicated to providing quality education and support to students. Each member brings unique expertise and passion to their role.'
      },
      blockOrder: 1,
      isVisible: true
    }
  ],

  // Footer/Info pages
  footer: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Page Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'IIIT Kottayam',
        description: 'Important information and resources',
        backgroundImage: '/images/page-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-content`,
      pageName,
      sectionName: 'content',
      blockType: 'paragraph',
      blockLabel: 'Main Content',
      content: {
        icon: '📄',
        title: 'Information',
        text: 'This page contains important information about IIIT Kottayam. For more details, please contact the administration.'
      },
      blockOrder: 1,
      isVisible: true
    }
  ],

  // Default template
  default: (pageName, pageTitle) => [
    {
      blockId: `${pageName}-hero`,
      pageName,
      sectionName: 'hero',
      blockType: 'hero',
      blockLabel: 'Hero Banner',
      content: {
        title: pageTitle,
        subtitle: 'IIIT Kottayam',
        description: 'Welcome to our page',
        backgroundImage: '/images/default-hero.jpg'
      },
      blockOrder: 0,
      isVisible: true
    },
    {
      blockId: `${pageName}-intro`,
      pageName,
      sectionName: 'intro',
      blockType: 'paragraph',
      blockLabel: 'Introduction',
      content: {
        icon: '📝',
        title: 'Welcome',
        text: 'Content for this page is being updated. Please check back soon for more information.'
      },
      blockOrder: 1,
      isVisible: true
    }
  ]
};

// Page mappings to templates
const PAGE_MAPPINGS = {
  // Courses
  'btech-ai-ds': { template: 'course', title: 'B.Tech Computer Science (AI & DS)' },
  'btech-cyber-security': { template: 'course', title: 'B.Tech Cyber Security' },

  // Facilities
  'gym': { template: 'facility', title: 'Gymnasium' },
  'internet': { template: 'facility', title: 'Internet & Computing' },
  'medical-centre': { template: 'facility', title: 'Medical Centre' },
  'security': { template: 'facility', title: 'Security' },
  'sports': { template: 'facility', title: 'Sports Facilities' },
  'student-mess': { template: 'facility', title: 'Student Mess' },

  // Clubs
  'acm': { template: 'club', title: 'ACM Student Chapter' },
  'cultural-club': { template: 'club', title: 'Cultural Club' },
  'cyber-security-club': { template: 'club', title: 'Cyber Security Club' },
  'fdp-webinars': { template: 'club', title: 'FDP & Webinars' },
  'gallery': { template: 'default', title: 'Photo Gallery' },
  'ieee-student-branch': { template: 'club', title: 'IEEE Student Branch' },
  'innovation-cell': { template: 'club', title: 'Institution Innovation Cell (IIC)' },
  'mind-quest': { template: 'club', title: 'Mind Quest' },
  'sports-club': { template: 'club', title: 'Sports Club' },
  'technical-club': { template: 'club', title: 'Technical Club' },
  'trendles-club': { template: 'club', title: 'Trendles Club' },

  // Research
  'awards-recognition': { template: 'research', title: 'Awards & Recognition' },
  'faculty-research-papers': { template: 'research', title: 'Faculty Research Publications' },
  'international-collaboration': { template: 'research', title: 'International Collaborations' },
  'research-activities': { template: 'research', title: 'Research Activities' },
  'research-funding': { template: 'research', title: 'Research Funding' },
  'research-groups': { template: 'research', title: 'Research Groups' },
  'ug-research-students': { template: 'research', title: 'UG Research Students' },

  // People
  'administration': { template: 'people', title: 'Administration' },
  'btech-students': { template: 'people', title: 'B.Tech Students' },
  'gender-index': { template: 'people', title: 'Gender Index' },
  'hod': { template: 'people', title: 'Head of Department' },
  'mtech-students': { template: 'people', title: 'M.Tech Students' },
  'professional-support-staff': { template: 'people', title: 'Professional Support Staff' },
  'research-scholars': { template: 'people', title: 'Research Scholars' },
  'technical-staff': { template: 'people', title: 'Technical Staff' },

  // Footer/Info
  'anti-ragging': { template: 'footer', title: 'Anti-Ragging Policy' },
  'contact': { template: 'footer', title: 'Contact Us' },
  'icc': { template: 'footer', title: 'Internal Complaints Committee' },
  'idy-2022': { template: 'footer', title: 'International Day of Yoga 2022' },
  'lms-links': { template: 'footer', title: 'LMS Links' },
  'rti': { template: 'footer', title: 'Right to Information' },
  'sitemap': { template: 'footer', title: 'Site Map' },
  'tenders': { template: 'footer', title: 'Tenders' },

  // Other
  'events': { template: 'default', title: 'Events' },
  'media': { template: 'default', title: 'Media Coverage' },
  'nirf': { template: 'default', title: 'NIRF Rankings' },
  'placements': { template: 'default', title: 'Placements' },
  'scholarship': { template: 'default', title: 'Scholarships & Educational Loans' }
};

async function seedAllPageContent() {
  try {
    console.log('🌱 Seeding Content Blocks for All Pages...\n');
    await sequelize.sync();

    let totalCreated = 0;
    let pagesProcessed = 0;

    for (const [pageName, config] of Object.entries(PAGE_MAPPINGS)) {
      const templateType = config.template || 'default';
      const template = CONTENT_TEMPLATES[templateType] || CONTENT_TEMPLATES.default;
      const blocks = template(pageName, config.title);

      console.log(`\n📄 ${pageName} (${config.title})`);
      
      for (const blockData of blocks) {
        try {
          // Check if block already exists
          const existing = await ContentBlock.findOne({
            where: { blockId: blockData.blockId, pageName: blockData.pageName }
          });

          if (!existing) {
            await ContentBlock.create(blockData);
            console.log(`  ✅ Created: ${blockData.blockType} - ${blockData.blockLabel}`);
            totalCreated++;
          } else {
            console.log(`  ⏭️  Skipped: ${blockData.blockLabel} (already exists)`);
          }
        } catch (error) {
          console.error(`  ❌ Error creating ${blockData.blockLabel}:`, error.message);
        }
      }
      
      pagesProcessed++;
    }

    console.log('\n' + '='.repeat(80));
    console.log(`✅ Seeding Complete!`);
    console.log(`  Pages Processed: ${pagesProcessed}`);
    console.log(`  Content Blocks Created: ${totalCreated}`);
    console.log('='.repeat(80));
    console.log('\n✨ All pages now have content blocks!');
    console.log('👉 You can now edit them through Admin → Content Management\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
    process.exit(1);
  }
}

seedAllPageContent();

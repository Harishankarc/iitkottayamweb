import sequelize from './config/database.js';
import PageContent from './models/PageContent.js';

// Complete list of all pages that exist in Frontend/src/screens
const ALL_PAGES = [
  // MAIN
  { pageName: 'homepage', pageTitle: 'IIIT Kottayam - Indian Institute of Information Technology Kottayam', pageSlug: '/', category: 'main', metaDescription: 'Indian Institute of Information Technology Kottayam - A premier institution of national importance', isPublished: true },
  { pageName: 'why-iiitk', pageTitle: 'Why IIIT Kottayam', pageSlug: '/why-iiitk', category: 'main', metaDescription: 'Discover why IIIT Kottayam is a leading institution in technology education', isPublished: true },
  
  // INSTITUTE
  { pageName: 'academics', pageTitle: 'Academics - IIIT Kottayam', pageSlug: '/academics', category: 'institute', metaDescription: 'Academic programs and curriculum at IIIT Kottayam', isPublished: true },
  { pageName: 'admission', pageTitle: 'Admissions - IIIT Kottayam', pageSlug: '/admission', category: 'institute', metaDescription: 'Admission process and requirements for IIIT Kottayam', isPublished: true },
  { pageName: 'governance', pageTitle: 'Governance - IIIT Kottayam', pageSlug: '/governance', category: 'institute', metaDescription: 'Governance structure and leadership at IIIT Kottayam', isPublished: true },
  { pageName: 'scholarship', pageTitle: 'Scholarships & Educational Loans - IIIT Kottayam', pageSlug: '/scholarship', category: 'institute', metaDescription: 'Scholarship opportunities and educational loans for students', isPublished: true },
  
  // COURSES
  { pageName: 'btech-cse', pageTitle: 'B.Tech Computer Science and Engineering - IIIT Kottayam', pageSlug: '/courses/btech-cse', category: 'course', metaDescription: 'B.Tech in Computer Science and Engineering program details', isPublished: true },
  { pageName: 'btech-ece', pageTitle: 'B.Tech Electronics and Communication Engineering - IIIT Kottayam', pageSlug: '/courses/btech-ece', category: 'course', metaDescription: 'B.Tech in Electronics and Communication Engineering program details', isPublished: true },
  { pageName: 'btech-ai-ds', pageTitle: 'B.Tech Computer Science (AI & DS) - IIIT Kottayam', pageSlug: '/courses/btech-ai-ds', category: 'course', metaDescription: 'B.Tech in Computer Science with specialization in AI and Data Science', isPublished: true },
  { pageName: 'btech-cyber-security', pageTitle: 'B.Tech Cyber Security - IIIT Kottayam', pageSlug: '/courses/btech-cyber-security', category: 'course', metaDescription: 'B.Tech in Cyber Security program details', isPublished: true },
  
  // PEOPLE
  { pageName: 'faculty', pageTitle: 'Faculty - IIIT Kottayam', pageSlug: '/people/faculty', category: 'people', metaDescription: 'Distinguished faculty members at IIIT Kottayam', isPublished: true },
  { pageName: 'administration', pageTitle: 'Administration - IIIT Kottayam', pageSlug: '/people/administration', category: 'people', metaDescription: 'Administrative staff and officials', isPublished: true },
  { pageName: 'hod', pageTitle: 'Head of Department - IIIT Kottayam', pageSlug: '/people/hod', category: 'people', metaDescription: 'Heads of academic departments', isPublished: true },
  { pageName: 'technical-staff', pageTitle: 'Technical Staff - IIIT Kottayam', pageSlug: '/people/technical-staff', category: 'people', metaDescription: 'Technical support staff', isPublished: true },
  { pageName: 'professional-support-staff', pageTitle: 'Professional Support Staff - IIIT Kottayam', pageSlug: '/people/professional-support-staff', category: 'people', metaDescription: 'Professional and support staff members', isPublished: true },
  { pageName: 'btech-students', pageTitle: 'B.Tech Students - IIIT Kottayam', pageSlug: '/people/btech-students', category: 'people', metaDescription: 'B.Tech student community', isPublished: true },
  { pageName: 'mtech-students', pageTitle: 'M.Tech Students - IIIT Kottayam', pageSlug: '/people/mtech-students', category: 'people', metaDescription: 'M.Tech student community', isPublished: true },
  { pageName: 'research-scholars', pageTitle: 'Research Scholars - IIIT Kottayam', pageSlug: '/people/research-scholars', category: 'people', metaDescription: 'Ph.D. and research scholars', isPublished: true },
  { pageName: 'gender-index', pageTitle: 'Gender Index - IIIT Kottayam', pageSlug: '/people/gender-index', category: 'people', metaDescription: 'Gender diversity statistics', isPublished: true },
  
  // FACILITIES
  { pageName: 'hostel', pageTitle: 'Hostel Facilities - IIIT Kottayam', pageSlug: '/facilities/hostel', category: 'facilities', metaDescription: 'Modern hostel facilities for students', isPublished: true },
  { pageName: 'library', pageTitle: 'Library - IIIT Kottayam', pageSlug: '/facilities/library', category: 'facilities', metaDescription: 'State-of-the-art library and learning resources', isPublished: true },
  { pageName: 'student-mess', pageTitle: 'Student Mess - IIIT Kottayam', pageSlug: '/facilities/student-mess', category: 'facilities', metaDescription: 'Dining and mess facilities', isPublished: true },
  { pageName: 'gym', pageTitle: 'Gymnasium - IIIT Kottayam', pageSlug: '/facilities/gym', category: 'facilities', metaDescription: 'Fitness and gymnasium facilities', isPublished: true },
  { pageName: 'sports', pageTitle: 'Sports Facilities - IIIT Kottayam', pageSlug: '/facilities/sports', category: 'facilities', metaDescription: 'Sports and recreational facilities', isPublished: true },
  { pageName: 'internet', pageTitle: 'Internet & Computing - IIIT Kottayam', pageSlug: '/facilities/internet', category: 'facilities', metaDescription: 'High-speed internet and computing infrastructure', isPublished: true },
  { pageName: 'medical-centre', pageTitle: 'Medical Centre - IIIT Kottayam', pageSlug: '/facilities/medical-centre', category: 'facilities', metaDescription: 'Healthcare and medical facilities', isPublished: true },
  { pageName: 'security', pageTitle: 'Security - IIIT Kottayam', pageSlug: '/facilities/security', category: 'facilities', metaDescription: 'Campus security and safety measures', isPublished: true },
  
  // IIC & CLUBS
  { pageName: 'innovation-cell', pageTitle: 'Institution Innovation Cell (IIC) - IIIT Kottayam', pageSlug: '/iic/innovation-cell', category: 'iic-clubs', metaDescription: 'Innovation and entrepreneurship cell', isPublished: true },
  { pageName: 'acm', pageTitle: 'ACM Student Chapter - IIIT Kottayam', pageSlug: '/clubs/acm', category: 'iic-clubs', metaDescription: 'Association for Computing Machinery student chapter', isPublished: true },
  { pageName: 'ieee-student-branch', pageTitle: 'IEEE Student Branch - IIIT Kottayam', pageSlug: '/clubs/ieee', category: 'iic-clubs', metaDescription: 'IEEE student branch activities and events', isPublished: true },
  { pageName: 'trendles-club', pageTitle: 'Trendles Club - IIIT Kottayam', pageSlug: '/clubs/trendles', category: 'iic-clubs', metaDescription: 'Technical club for innovation and development', isPublished: true },
  { pageName: 'cyber-security-club', pageTitle: 'Cyber Security Club - IIIT Kottayam', pageSlug: '/clubs/cyber-security', category: 'iic-clubs', metaDescription: 'Cyber security awareness and skill development', isPublished: true },
  { pageName: 'mind-quest', pageTitle: 'Mind Quest - IIIT Kottayam', pageSlug: '/clubs/mind-quest', category: 'iic-clubs', metaDescription: 'Quiz and knowledge club', isPublished: true },
  { pageName: 'cultural-club', pageTitle: 'Cultural Club - IIIT Kottayam', pageSlug: '/clubs/cultural', category: 'iic-clubs', metaDescription: 'Cultural activities and events', isPublished: true },
  { pageName: 'sports-club', pageTitle: 'Sports Club - IIIT Kottayam', pageSlug: '/clubs/sports', category: 'iic-clubs', metaDescription: 'Sports activities and competitions', isPublished: true },
  { pageName: 'technical-club', pageTitle: 'Technical Club - IIIT Kottayam', pageSlug: '/clubs/technical', category: 'iic-clubs', metaDescription: 'Technical workshops and competitions', isPublished: true },
  { pageName: 'fdp-webinars', pageTitle: 'FDP & Webinars - IIIT Kottayam', pageSlug: '/fdp-webinars', category: 'iic-clubs', metaDescription: 'Faculty development programs and webinars', isPublished: true },
  { pageName: 'gallery', pageTitle: 'Photo Gallery - IIIT Kottayam', pageSlug: '/gallery', category: 'iic-clubs', metaDescription: 'Campus life and events gallery', isPublished: true },
  
  // RESEARCH
  { pageName: 'research-groups', pageTitle: 'Research Groups - IIIT Kottayam', pageSlug: '/research/groups', category: 'research', metaDescription: 'Active research groups and focus areas', isPublished: true },
  { pageName: 'research-activities', pageTitle: 'Research Activities - IIIT Kottayam', pageSlug: '/research/activities', category: 'research', metaDescription: 'Ongoing research activities and projects', isPublished: true },
  { pageName: 'research-funding', pageTitle: 'Research Funding - IIIT Kottayam', pageSlug: '/research/funding', category: 'research', metaDescription: 'Research grants and funding opportunities', isPublished: true },
  { pageName: 'faculty-research-papers', pageTitle: 'Faculty Research Publications - IIIT Kottayam', pageSlug: '/research/publications', category: 'research', metaDescription: 'Faculty research papers and publications', isPublished: true },
  { pageName: 'ug-research-students', pageTitle: 'UG Research Students - IIIT Kottayam', pageSlug: '/research/ug-students', category: 'research', metaDescription: 'Undergraduate research opportunities', isPublished: true },
  { pageName: 'international-collab', pageTitle: 'International Collaborations - IIIT Kottayam', pageSlug: '/research/collaborations', category: 'research', metaDescription: 'International research collaborations', isPublished: true },
  { pageName: 'awards-recognition', pageTitle: 'Awards & Recognition - IIIT Kottayam', pageSlug: '/research/awards', category: 'research', metaDescription: 'Research awards and recognitions', isPublished: true },
  
  // PLACEMENT
  { pageName: 'placements', pageTitle: 'Placements - IIIT Kottayam', pageSlug: '/placements', category: 'placement', metaDescription: 'Placement statistics and recruiting companies', isPublished: true },
  
  // MEDIA & MISC
  { pageName: 'media', pageTitle: 'Media Coverage - IIIT Kottayam', pageSlug: '/media', category: 'media', metaDescription: 'Media coverage and press releases', isPublished: true },
  { pageName: 'nirf', pageTitle: 'NIRF Rankings - IIIT Kottayam', pageSlug: '/nirf', category: 'main', metaDescription: 'NIRF rankings and performance', isPublished: true },
  { pageName: 'events', pageTitle: 'Events - IIIT Kottayam', pageSlug: '/events', category: 'main', metaDescription: 'Upcoming and past events', isPublished: true },
  
  // FOOTER
  { pageName: 'contact', pageTitle: 'Contact Us - IIIT Kottayam', pageSlug: '/contact', category: 'footer', metaDescription: 'Contact information and location', isPublished: true },
  { pageName: 'anti-ragging', pageTitle: 'Anti-Ragging Policy - IIIT Kottayam', pageSlug: '/anti-ragging', category: 'footer', metaDescription: 'Anti-ragging policy and guidelines', isPublished: true },
  { pageName: 'icc', pageTitle: 'Internal Complaints Committee - IIIT Kottayam', pageSlug: '/icc', category: 'footer', metaDescription: 'Internal Complaints Committee details', isPublished: true },
  { pageName: 'rti', pageTitle: 'Right to Information - IIIT Kottayam', pageSlug: '/rti', category: 'footer', metaDescription: 'RTI information and process', isPublished: true },
  { pageName: 'tenders', pageTitle: 'Tenders - IIIT Kottayam', pageSlug: '/tenders', category: 'footer', metaDescription: 'Current and archived tenders', isPublished: true },
  { pageName: 'sitemap', pageTitle: 'Site Map - IIIT Kottayam', pageSlug: '/sitemap', category: 'footer', metaDescription: 'Complete site navigation map', isPublished: true },
  { pageName: 'lms-links', pageTitle: 'LMS Links - IIIT Kottayam', pageSlug: '/lms', category: 'footer', metaDescription: 'Learning Management System access', isPublished: true },
  { pageName: 'idy-2022', pageTitle: 'International Day of Yoga 2022 - IIIT Kottayam', pageSlug: '/idy-2022', category: 'footer', metaDescription: 'International Day of Yoga celebration', isPublished: true }
];

const seedAllPages = async () => {
  try {
    console.log('🌱 Starting comprehensive page seeding...\n');
    await sequelize.sync();
    
    let created = 0;
    let updated = 0;
    let skipped = 0;
    
    for (const pageData of ALL_PAGES) {
      const [page, wasCreated] = await PageContent.findOrCreate({
        where: { pageName: pageData.pageName },
        defaults: {
          ...pageData,
          sortOrder: 0,
          sections: [],
          customFields: {}
        }
      });
      
      if (wasCreated) {
        created++;
        console.log(`✅ Created: ${pageData.pageName.padEnd(35)} → ${pageData.pageTitle}`);
      } else {
        // Update existing page if needed
        const needsUpdate = 
          page.pageTitle !== pageData.pageTitle ||
          page.pageSlug !== pageData.pageSlug ||
          page.category !== pageData.category;
          
        if (needsUpdate) {
          await page.update(pageData);
          updated++;
          console.log(`🔄 Updated: ${pageData.pageName.padEnd(35)} → ${pageData.pageTitle}`);
        } else {
          skipped++;
          console.log(`⏭️  Skipped: ${pageData.pageName.padEnd(35)} (already exists)`);
        }
      }
    }
    
    console.log('\n' + '='.repeat(100));
    console.log(`✅ Created: ${created} pages`);
    console.log(`🔄 Updated: ${updated} pages`);
    console.log(`⏭️  Skipped: ${skipped} pages`);
    console.log(`📊 Total pages in database: ${ALL_PAGES.length}`);
    console.log('='.repeat(100));
    console.log('\n✨ All pages from user-facing frontend have been synced to the database!');
    console.log('👉 The admin panel will now show the same pages as users see.\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding pages:', error.message);
    console.error(error);
    process.exit(1);
  }
};

seedAllPages();

import sequelize from './config/database.js';
import News from './models/News.js';

const seedNews = async () => {
  try {
    console.log('📰 Seeding News Data...\n');

    await sequelize.sync();

    const newsItems = [
      {
        title: 'IIIT Kottayam Welcomes New Batch of Students for Academic Year 2025-26',
        slug: 'new-batch-2025-26',
        content: 'IIIT Kottayam proudly welcomes the incoming batch of B.Tech and M.Tech students for the academic year 2025-26. The orientation program included sessions on campus life, academic structure, and opportunities for research and innovation.',
        excerpt: 'New batch of students join IIIT Kottayam for 2025-26 academic year',
        author: 'Admin',
        category: 'Academic',
        tags: JSON.stringify(['admissions', 'orientation', 'students']),
        image: '/images/campus-hero.jpg',
        isPublished: true,
        isFeatured: true,
        publishedDate: new Date('2025-01-05'),
        views: 245
      },
      {
        title: 'Research Paper by IIIT Kottayam Faculty Published in Top-Tier Journal',
        slug: 'research-paper-published',
        content: 'Dr. Rajesh Kumar and team from the Computer Science department have published their groundbreaking research on AI-driven healthcare solutions in the prestigious IEEE Transactions journal. The paper focuses on early disease detection using machine learning algorithms.',
        excerpt: 'Faculty research on AI healthcare published in IEEE Transactions',
        author: 'Research Cell',
        category: 'Research',
        tags: JSON.stringify(['research', 'AI', 'publication', 'faculty']),
        image: '/images/campus-overview.jpg',
        isPublished: true,
        isFeatured: true,
        publishedDate: new Date('2024-12-28'),
        views: 189
      },
      {
        title: 'Annual TechFest 2025: Innovation Meets Excellence',
        slug: 'techfest-2025',
        content: 'The annual TechFest 2025 concluded successfully with participation from over 500 students from various institutions. The three-day event featured hackathons, technical workshops, robotics competitions, and guest lectures from industry experts.',
        excerpt: 'TechFest 2025 showcases student innovation and technical excellence',
        author: 'Events Team',
        category: 'Events',
        tags: JSON.stringify(['techfest', 'events', 'competition', 'innovation']),
        image: '/images/campus-aerial.jpg',
        isPublished: true,
        isFeatured: false,
        publishedDate: new Date('2024-12-20'),
        views: 432
      },
      {
        title: 'Students Secure Internships at Top Tech Companies',
        slug: 'student-internships-2025',
        content: '45 students from the Computer Science and Electronics departments have secured summer internships at leading tech companies including Google, Microsoft, Amazon, and Adobe. The Training and Placement Cell coordinated extensive preparation sessions.',
        excerpt: '45 students land internships at Google, Microsoft, Amazon, and more',
        author: 'Placement Cell',
        category: 'Placements',
        tags: JSON.stringify(['placements', 'internships', 'students', 'careers']),
        image: null,
        isPublished: true,
        isFeatured: false,
        publishedDate: new Date('2024-12-15'),
        views: 567
      },
      {
        title: 'New State-of-the-Art Computer Lab Inaugurated',
        slug: 'new-computer-lab-2025',
        content: 'The institute inaugurated a new computer laboratory equipped with 100 high-performance workstations, advanced networking infrastructure, and software development tools. The lab will support research in cloud computing, data science, and cybersecurity.',
        excerpt: 'New computer lab with 100 workstations now operational',
        author: 'Admin',
        category: 'Infrastructure',
        tags: JSON.stringify(['infrastructure', 'lab', 'facilities']),
        image: null,
        isPublished: true,
        isFeatured: false,
        publishedDate: new Date('2024-12-10'),
        views: 298
      },
      {
        title: 'IIIT Kottayam Ranked Among Top 100 Institutes in NIRF 2025',
        slug: 'nirf-ranking-2025',
        content: 'IIIT Kottayam has been ranked in the top 100 engineering institutes in India by the National Institutional Ranking Framework (NIRF) 2025. This achievement reflects the institute\'s commitment to academic excellence, research output, and industry collaboration.',
        excerpt: 'Institute secures top 100 position in NIRF 2025 rankings',
        author: 'Media Cell',
        category: 'Achievements',
        tags: JSON.stringify(['ranking', 'NIRF', 'achievements']),
        image: null,
        isPublished: true,
        isFeatured: true,
        publishedDate: new Date('2024-12-05'),
        views: 823
      },
      {
        title: 'Workshop on Machine Learning and Data Science',
        slug: 'ml-workshop-2024',
        content: 'A five-day workshop on Machine Learning and Data Science was conducted for students and faculty members. Industry experts from leading tech companies delivered hands-on sessions on Python, TensorFlow, data visualization, and real-world ML applications.',
        excerpt: 'Five-day ML & Data Science workshop concludes successfully',
        author: 'Events Team',
        category: 'Workshops',
        tags: JSON.stringify(['workshop', 'ML', 'data science', 'training']),
        image: null,
        isPublished: true,
        isFeatured: false,
        publishedDate: new Date('2024-11-28'),
        views: 412
      },
      {
        title: 'Student Team Wins National Level Hackathon',
        slug: 'hackathon-winners-2024',
        content: 'A team of four students from IIIT Kottayam won first prize at the National Level Hackathon organized by IIT Delhi. Their project on blockchain-based supply chain management impressed the judges and won a cash prize of ₹1,00,000.',
        excerpt: 'Student team wins first prize at IIT Delhi hackathon',
        author: 'Media Cell',
        category: 'Achievements',
        tags: JSON.stringify(['hackathon', 'students', 'competition', 'blockchain']),
        image: null,
        isPublished: true,
        isFeatured: true,
        publishedDate: new Date('2024-11-20'),
        views: 634
      }
    ];

    // Clear existing news
    await News.destroy({ where: {} });
    console.log('🗑️  Cleared existing news\n');

    // Insert new news
    await News.bulkCreate(newsItems);
    console.log('✅ Successfully seeded news data!\n');

    // Display summary
    console.log('📊 Summary:');
    console.log('─────────────────────');
    console.log(`Total News Items: ${newsItems.length}`);
    console.log(`Published: ${newsItems.filter(n => n.isPublished).length}`);
    console.log(`Featured: ${newsItems.filter(n => n.isFeatured).length}`);
    console.log('\nCategories:');
    const categories = {};
    newsItems.forEach(n => {
      categories[n.category] = (categories[n.category] || 0) + 1;
    });
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`  - ${cat}: ${count}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding news:', error);
    process.exit(1);
  }
};

seedNews();

import sequelize from './config/database.js';
import Course from './models/Course.js';
import ResearchPublication from './models/ResearchPublication.js';
import HeroSlider from './models/HeroSlider.js';
import CompanyLogo from './models/CompanyLogo.js';
import NIRF from './models/NIRF.js';
import Footer from './models/Footer.js';

async function seedMissingData() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Seed Courses
    console.log('📚 Seeding Courses...');
    await Course.bulkCreate([
      {
        name: "B.Tech in Computer Science and Engineering",
        shortName: "B.Tech CSE",
        slug: "btech-cse",
        program: "B.Tech",
        department: "Computer Science and Engineering",
        duration: "4 years",
        totalSeats: 120,
        description: "Four-year undergraduate program in Computer Science and Engineering covering core CS topics, programming, algorithms, and emerging technologies.",
        eligibility: "10+2 with Physics, Mathematics and Chemistry/Computer Science with minimum 75% marks. Valid JEE Main score required.",
        isActive: true
      },
      {
        name: "B.Tech in Electronics and Communication Engineering",
        shortName: "B.Tech ECE",
        slug: "btech-ece",
        program: "B.Tech",
        department: "Electronics and Communication Engineering",
        duration: "4 years",
        totalSeats: 60,
        description: "Comprehensive program covering electronics, communication systems, signal processing, VLSI design, and embedded systems.",
        eligibility: "10+2 with Physics, Mathematics and Chemistry with minimum 75% marks. Valid JEE Main score required.",
        isActive: true
      },
      {
        name: "B.Tech in Computer Science and Engineering (Cyber Security)",
        shortName: "B.Tech CS (Cyber Security)",
        slug: "btech-cyber-security",
        program: "B.Tech",
        department: "Cyber Security",
        duration: "4 years",
        totalSeats: 60,
        description: "Specialized program focusing on cybersecurity, cryptography, network security, ethical hacking, and information security.",
        eligibility: "10+2 with Physics, Mathematics and Chemistry/Computer Science with minimum 75% marks. Valid JEE Main score required.",
        isActive: true
      },
      {
        name: "B.Tech in Computer Science and Engineering (AI & Data Science)",
        shortName: "B.Tech CSE (AI & DS)",
        slug: "btech-ai-ds",
        program: "B.Tech",
        department: "Computer Science and Engineering",
        duration: "4 years",
        totalSeats: 60,
        description: "Advanced program covering Artificial Intelligence, Machine Learning, Deep Learning, Big Data Analytics, and Data Science.",
        eligibility: "10+2 with Physics, Mathematics and Chemistry/Computer Science with minimum 75% marks. Valid JEE Main score required.",
        isActive: true
      },
      {
        name: "M.Tech in Computer Science and Engineering",
        shortName: "M.Tech CSE",
        slug: "mtech-cse",
        program: "M.Tech",
        department: "Computer Science and Engineering",
        duration: "2 years",
        totalSeats: 18,
        description: "Two-year postgraduate program with specializations in various areas of Computer Science.",
        eligibility: "B.E./B.Tech in relevant discipline with minimum 60% marks or equivalent CGPA. Valid GATE score required.",
        isActive: true
      },
      {
        name: "Ph.D. in Computer Science and Engineering",
        shortName: "Ph.D. CSE",
        slug: "phd-cse",
        program: "Ph.D.",
        department: "Computer Science and Engineering",
        duration: "3-5 years",
        totalSeats: 10,
        description: "Doctoral program for advanced research in Computer Science and Engineering.",
        eligibility: "M.E./M.Tech or equivalent with minimum 60% marks. Valid GATE/NET score required.",
        isActive: true
      }
    ]);
    console.log('✅ Added 6 courses\n');

    // Seed Research Publications
    console.log('📄 Seeding Research Publications...');
    await ResearchPublication.bulkCreate([
      {
        title: "Deep Learning Approaches for Medical Image Analysis",
        authors: "Dr. Ebin Deni Raj, Dr. Jayakrushna Sahoo",
        publicationType: "journal",
        venue: "IEEE Transactions on Medical Imaging",
        year: 2024,
        doi: "10.1109/TMI.2024.12345",
        abstract: "This paper presents novel deep learning methods for automated medical image analysis and diagnosis.",
        department: "Computer Science and Engineering",
        isPublished: true
      },
      {
        title: "Blockchain-based Security Framework for IoT Networks",
        authors: "Dr. Panchami V, Dr. Shajulin Benedict",
        publicationType: "conference",
        venue: "IEEE International Conference on Blockchain Technology",
        year: 2024,
        doi: "10.1109/BLOCKCHAIN.2024.67890",
        abstract: "A comprehensive security framework leveraging blockchain technology for securing IoT devices and networks.",
        department: "Cyber Security",
        isPublished: true
      },
      {
        title: "Machine Learning for Predictive Analytics in Healthcare",
        authors: "Dr. Jayakrushna Sahoo, Dr. Victor Paul",
        publicationType: "journal",
        venue: "Journal of Healthcare Analytics",
        year: 2024,
        abstract: "Advanced machine learning techniques for predictive analytics in healthcare systems.",
        department: "Computer Science and Engineering",
        isPublished: true
      },
      {
        title: "VLSI Design Optimization Using AI Techniques",
        authors: "Dr. Bala S",
        publicationType: "conference",
        venue: "International Conference on VLSI Design",
        year: 2023,
        abstract: "Novel AI-based approaches for optimizing VLSI circuit design and reducing power consumption.",
        department: "Electronics and Communication Engineering",
        isPublished: true
      },
      {
        title: "Cloud Computing Resource Optimization in Distributed Systems",
        authors: "Dr. Shajulin Benedict",
        publicationType: "journal",
        venue: "ACM Transactions on Distributed Systems",
        year: 2024,
        doi: "10.1145/ACM.2024.11111",
        abstract: "Research on optimizing resource allocation and scheduling in cloud computing environments.",
        department: "Computer Science and Engineering",
        isPublished: true
      }
    ]);
    console.log('✅ Added 5 research publications\n');

    // Seed Hero Sliders
    console.log('🎬 Seeding Hero Sliders...');
    await HeroSlider.bulkCreate([
      {
        title: "Welcome to IIIT Kottayam",
        subtitle: "An Institute of National Importance",
        description: "Empowering minds, shaping futures through excellence in education and research",
        image: "/images/campus-main.jpg",
        buttonText: "Explore More",
        buttonLink: "/about",
        displayOrder: 1,
        isActive: true
      },
      {
        title: "Cutting-Edge Research",
        subtitle: "Innovation at its Core",
        description: "Leading research in AI, Cybersecurity, IoT, and Emerging Technologies",
        image: "/images/research-lab.jpg",
        buttonText: "View Research",
        buttonLink: "/research",
        displayOrder: 2,
        isActive: true
      },
      {
        title: "100% Placements",
        subtitle: "Building Successful Careers",
        description: "Top recruiters from India and abroad visit our campus every year",
        image: "/images/placement.jpg",
        buttonText: "Placement Records",
        buttonLink: "/placement",
        displayOrder: 3,
        isActive: true
      },
      {
        title: "World-Class Infrastructure",
        subtitle: "State-of-the-Art Facilities",
        description: "Modern labs, smart classrooms, and excellent hostel facilities",
        image: "/images/infrastructure.jpg",
        buttonText: "View Facilities",
        buttonLink: "/facilities",
        displayOrder: 4,
        isActive: true
      }
    ]);
    console.log('✅ Added 4 hero sliders\n');

    // Seed Company Logos
    console.log('🏢 Seeding Company Logos...');
    await CompanyLogo.bulkCreate([
      { companyName: "Google", logoUrl: "/images/companies/google.png", category: "placement", displayOrder: 1, isActive: true },
      { companyName: "Microsoft", logoUrl: "/images/companies/microsoft.png", category: "placement", displayOrder: 2, isActive: true },
      { companyName: "Amazon", logoUrl: "/images/companies/amazon.png", category: "placement", displayOrder: 3, isActive: true },
      { companyName: "Infosys", logoUrl: "/images/companies/infosys.png", category: "placement", displayOrder: 4, isActive: true },
      { companyName: "TCS", logoUrl: "/images/companies/tcs.png", category: "placement", displayOrder: 5, isActive: true },
      { companyName: "Wipro", logoUrl: "/images/companies/wipro.png", category: "placement", displayOrder: 6, isActive: true },
      { companyName: "Cognizant", logoUrl: "/images/companies/cognizant.png", category: "placement", displayOrder: 7, isActive: true },
      { companyName: "Accenture", logoUrl: "/images/companies/accenture.png", category: "placement", displayOrder: 8, isActive: true },
      { companyName: "IBM", logoUrl: "/images/companies/ibm.png", category: "placement", displayOrder: 9, isActive: true },
      { companyName: "Adobe", logoUrl: "/images/companies/adobe.png", category: "placement", displayOrder: 10, isActive: true }
    ]);
    console.log('✅ Added 10 company logos\n');

    // Seed NIRF Rankings
    console.log('🏆 Seeding NIRF Rankings...');
    await NIRF.bulkCreate([
      {
        year: 2024,
        category: "Overall",
        rank: 185,
        change: "up",
        previousRank: 201,
        score: 45.67,
        isPublished: true
      },
      {
        year: 2024,
        category: "Engineering",
        rank: 142,
        change: "up",
        previousRank: 156,
        score: 48.23,
        isPublished: true
      },
      {
        year: 2023,
        category: "Overall",
        rank: 201,
        change: "same",
        previousRank: 201,
        score: 43.45,
        isPublished: true
      },
      {
        year: 2023,
        category: "Engineering",
        rank: 156,
        change: "up",
        previousRank: 178,
        score: 46.12,
        isPublished: true
      }
    ]);
    console.log('✅ Added 4 NIRF rankings\n');

    // Seed Footer Items
    console.log('🔗 Seeding Footer Links...');
    await Footer.bulkCreate([
      {
        section: "about",
        title: "About IIIT Kottayam",
        content: "Indian Institute of Information Technology, Kottayam (IIIT Kottayam) is an Institute of National Importance under the IIIT Act 2014. The institute offers B.Tech, M.Tech and Ph.D. programs in Computer Science and Engineering, Electronics and Communication Engineering, and Cyber Security.",
        links: JSON.stringify([]),
        displayOrder: 1,
        isActive: true
      },
      {
        section: "quick-links",
        title: "Quick Links",
        content: "",
        links: JSON.stringify([
          { text: "Admissions", url: "/admissions" },
          { text: "Academics", url: "/academics" },
          { text: "Research", url: "/research" },
          { text: "Placements", url: "/placements" },
          { text: "Faculty", url: "/faculty" },
          { text: "Students", url: "/students" }
        ]),
        displayOrder: 2,
        isActive: true
      },
      {
        section: "contact",
        title: "Contact Us",
        content: "Indian Institute of Information Technology Kottayam\\nVazhathope Campus, Kottayam\\nKerala - 686635, India",
        links: JSON.stringify([
          { text: "Phone: +91-481-2597315", url: "tel:+914812597315" },
          { text: "Email: office@iiitkottayam.ac.in", url: "mailto:office@iiitkottayam.ac.in" }
        ]),
        displayOrder: 3,
        isActive: true
      },
      {
        section: "social",
        title: "Follow Us",
        content: "",
        links: JSON.stringify([
          { text: "Facebook", url: "https://facebook.com/iiitkottayam", icon: "facebook" },
          { text: "Twitter", url: "https://twitter.com/iiitkottayam", icon: "twitter" },
          { text: "LinkedIn", url: "https://linkedin.com/school/iiitkottayam", icon: "linkedin" },
          { text: "Instagram", url: "https://instagram.com/iiitkottayam", icon: "instagram" }
        ]),
        displayOrder: 4,
        isActive: true
      }
    ]);
    console.log('✅ Added 4 footer sections\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('🎉 Missing data seeded successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log('   • Courses: 6');
    console.log('   • Research Publications: 5');
    console.log('   • Hero Sliders: 4');
    console.log('   • Company Logos: 10');
    console.log('   • NIRF Rankings: 4');
    console.log('   • Footer Items: 4');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedMissingData();

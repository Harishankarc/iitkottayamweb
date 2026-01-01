import sequelize from './config/database.js';
import News from './models/News.js';
import Event from './models/Event.js';
import Faculty from './models/Faculty.js';
import Student from './models/Student.js';
import Placement from './models/Placement.js';
import Announcement from './models/Announcement.js';
import Gallery from './models/Gallery.js';
import Media from './models/Media.js';
import Course from './models/Course.js';
import ResearchPublication from './models/ResearchPublication.js';
import HeroSlider from './models/HeroSlider.js';
import CompanyLogo from './models/CompanyLogo.js';
import NIRF from './models/NIRF.js';
import Footer from './models/Footer.js';

async function seedDatabase() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Seed News
    console.log('📰 Seeding News...');
    await News.bulkCreate([
      {
        title: "Admission to Ph.D. Programme - January 2026",
        content: "Applications are invited for Ph.D. Programme starting January 2026 in Computer Science, Electronics, and related fields.",
        excerpt: "Ph.D. admissions open for January 2026 session",
        category: "admission",
        author: "Admissions Office",
        isPublished: true,
        publishedDate: new Date('2025-10-15'),
        views: 245
      },
      {
        title: "Recruitment of Contract Faculty - CSE dated 17.10.2025",
        content: "IIIT Kottayam invites applications from qualified candidates for the position of Contract Faculty in Computer Science and Engineering department.",
        excerpt: "Contract faculty positions available in CSE",
        category: "recruitment",
        author: "HR Department",
        isPublished: true,
        publishedDate: new Date('2025-10-17'),
        views: 189
      },
      {
        title: "Result of Mess Manager (On Contract) dated 29.09.2025",
        content: "The selection process for Mess Manager position has been completed. Selected candidates are requested to report to the administration office.",
        excerpt: "Mess Manager recruitment results announced",
        category: "results",
        author: "Administration",
        isPublished: true,
        publishedDate: new Date('2025-09-29'),
        views: 156
      },
      {
        title: "Result of Technician (On Contract) dated 08.09.2025",
        content: "Results for Technician positions have been declared. Check the official website for the list of selected candidates.",
        excerpt: "Technician recruitment results out",
        category: "results",
        isPublished: true,
        publishedDate: new Date('2025-09-08'),
        views: 134
      },
      {
        title: "Faculty Development Programme 2024 Successfully Concluded",
        content: "The three-day Faculty Development Programme on Emerging Technologies concluded with great success. Over 50 faculty members participated.",
        excerpt: "FDP 2024 concludes successfully",
        category: "events",
        author: "Training Cell",
        isPublished: true,
        publishedDate: new Date('2025-11-20'),
        views: 298
      }
    ]);
    console.log('✅ Added 5 news articles\n');

    // Seed Events
    console.log('📅 Seeding Events...');
    await Event.bulkCreate([
      {
        title: "Faculty Development Programme 2024 (CSE)",
        description: "A comprehensive workshop on latest trends in Computer Science including AI, ML, and Cloud Computing",
        category: "technical",
        venue: "Seminar Hall, IIIT Kottayam",
        startDate: new Date('2026-01-15'),
        endDate: new Date('2026-01-17'),
        organizer: "Department of CSE",
        registrationLink: "#",
        isPublished: true,
        attendees: 0
      },
      {
        title: "Tech Symposium 2024",
        description: "Annual technical symposium featuring paper presentations, hackathons, and technical exhibitions",
        category: "technical",
        venue: "Main Auditorium",
        startDate: new Date('2026-02-20'),
        endDate: new Date('2026-02-22'),
        organizer: "IEEE Student Branch",
        isPublished: true,
        attendees: 0
      },
      {
        title: "National Conference on Cyber Security",
        description: "Two-day conference on emerging trends in cybersecurity, featuring renowned speakers from industry and academia",
        category: "seminar",
        venue: "Conference Hall",
        startDate: new Date('2026-03-10'),
        endDate: new Date('2026-03-11'),
        organizer: "Cyber Security Department",
        isPublished: true,
        attendees: 0
      },
      {
        title: "Annual Cultural Fest - Kaleidoscope 2026",
        description: "Three-day cultural extravaganza featuring music, dance, drama, and various competitions",
        category: "cultural",
        venue: "Open Air Theatre",
        startDate: new Date('2026-04-05'),
        endDate: new Date('2026-04-07'),
        organizer: "Cultural Club",
        isPublished: true,
        attendees: 0
      }
    ]);
    console.log('✅ Added 4 events\n');

    // Seed Faculty
    console.log('👨‍🏫 Seeding Faculty...');
    await Faculty.bulkCreate([
      {
        name: "Dr. Shajulin Benedict",
        designation: "Associate Professor",
        department: "Computer Science and Engineering",
        email: "shajulin@iiitkottayam.ac.in",
        phone: "+91-1234567890",
        qualification: "Ph.D. in Computer Science",
        specialization: "Cloud Computing, Internet of Things",
        experience: 15,
        researchInterests: ["Cloud Computing", "IoT", "Distributed Systems"],
        publications: [],
        isActive: true,
        photo: "facultyimg1.jpg"
      },
      {
        name: "Dr. Bakkyaraj T",
        designation: "Assistant Professor",
        department: "Computer Science and Engineering",
        email: "bakkyaraj@iiitkottayam.ac.in",
        qualification: "Ph.D. in Computer Science",
        specialization: "Parallel Computing, Algorithms",
        experience: 10,
        researchInterests: ["Parallel Computing", "Algorithms"],
        publications: [],
        isActive: true,
        photo: "facultyimg2.jpg"
      },
      {
        name: "Dr. Panchami V",
        designation: "Assistant Professor",
        department: "Cyber Security",
        email: "panchami@iiitkottayam.ac.in",
        qualification: "Ph.D. in Cyber Security",
        specialization: "Blockchain, Network Security",
        experience: 7,
        researchInterests: ["Blockchain", "Cryptography", "Network Security"],
        publications: [],
        isActive: true,
        photo: "facultyimg3.jpg"
      },
      {
        name: "Prof Ashok S",
        designation: "Professor",
        department: "Electronics and Communication Engineering",
        email: "ashok@iiitkottayam.ac.in",
        qualification: "Ph.D. in ECE",
        specialization: "Signal Processing, Communication",
        experience: 20,
        researchInterests: ["Signal Processing", "Communication"],
        publications: [],
        isActive: true,
        photo: "facultyimg4.jpg"
      },
      {
        name: "Dr. Ebin Deni Raj",
        designation: "Assistant Professor",
        department: "Computer Science and Engineering",
        email: "ebin@iiitkottayam.ac.in",
        qualification: "Ph.D. in Computer Science",
        specialization: "Biomedical AI, Machine Learning",
        experience: 8,
        researchInterests: ["Biomedical AI", "Deep Learning", "Healthcare Analytics"],
        publications: [],
        isActive: true,
        photo: "facultyimg5.jpg"
      },
      {
        name: "Dr. Dhanyamol M V",
        designation: "Assistant Professor",
        department: "Computer Science and Engineering",
        email: "dhanyamol@iiitkottayam.ac.in",
        qualification: "Ph.D. in Computer Science",
        specialization: "Data Science, AI",
        experience: 9,
        researchInterests: ["Data Science", "AI"],
        publications: [],
        isActive: true,
        photo: "facultyimg6.jpg"
      },
      {
        name: "Dr. Amit Kumar Roy",
        designation: "Assistant Professor",
        department: "Mathematics",
        email: "amitkumar@iiitkottayam.ac.in",
        qualification: "Ph.D. in Mathematics",
        specialization: "Applied Mathematics, Optimization",
        experience: 11,
        researchInterests: ["Applied Mathematics", "Optimization"],
        publications: [],
        isActive: true,
        photo: "facultyimg7.jpg"
      },
      {
        name: "Dr. Jayakrushna Sahoo",
        designation: "Assistant Professor",
        department: "Computer Science and Engineering",
        email: "jayakrushna@iiitkottayam.ac.in",
        qualification: "Ph.D. in Computer Science",
        specialization: "Machine Learning, Data Science",
        experience: 10,
        researchInterests: ["Machine Learning", "Data Mining", "Pattern Recognition"],
        publications: [],
        isActive: true,
        photo: "facultyimg8.jpg"
      }
    ]);
    console.log('✅ Added 8 faculty members\n');

    // Seed Students
    console.log('🎓 Seeding Students...');
    await Student.bulkCreate([
      { name: "Rahul Sharma", rollNumber: "BT21CSE001", email: "rahul.bt21cse001@iiitkottayam.ac.in", program: "B.Tech", branch: "Computer Science and Engineering", batch: 2021, currentSemester: 7, cgpa: 8.5, isActive: true },
      { name: "Priya Singh", rollNumber: "BT21CSE002", email: "priya.bt21cse002@iiitkottayam.ac.in", program: "B.Tech", branch: "Computer Science and Engineering", batch: 2021, currentSemester: 7, cgpa: 9.1, isActive: true },
      { name: "Arjun Kumar", rollNumber: "BT22ECE001", email: "arjun.bt22ece001@iiitkottayam.ac.in", program: "B.Tech", branch: "Electronics and Communication", batch: 2022, currentSemester: 5, cgpa: 8.8, isActive: true },
      { name: "Sneha Reddy", rollNumber: "BT22CS001", email: "sneha.bt22cs001@iiitkottayam.ac.in", program: "B.Tech", branch: "Cyber Security", batch: 2022, currentSemester: 5, cgpa: 9.2, isActive: true },
      { name: "Vikram Patel", rollNumber: "BT23CSE001", email: "vikram.bt23cse001@iiitkottayam.ac.in", program: "B.Tech", branch: "Computer Science and Engineering", batch: 2023, currentSemester: 3, cgpa: 8.7, isActive: true },
    ]);
    console.log('✅ Added 5 students\n');

    // Seed Placements
    console.log('🏢 Seeding Placements...');
    await Placement.bulkCreate([
      {
        academicYear: "2024-25",
        companyName: "Google",
        sector: "Technology",
        role: "Software Engineer",
        package: 42.00,
        studentsPlaced: 3,
        visitDate: new Date('2024-11-15'),
        description: "Google recruited 3 students for Software Engineering roles",
        isPublished: true
      },
      {
        academicYear: "2024-25",
        companyName: "Microsoft",
        sector: "Technology",
        role: "SDE",
        package: 38.50,
        studentsPlaced: 5,
        visitDate: new Date('2024-10-20'),
        description: "Microsoft hired 5 students for Software Development positions",
        isPublished: true
      },
      {
        academicYear: "2024-25",
        companyName: "Amazon",
        sector: "E-commerce",
        role: "Software Development Engineer",
        package: 35.00,
        studentsPlaced: 4,
        visitDate: new Date('2024-09-10'),
        description: "Amazon recruited 4 students",
        isPublished: true
      },
      {
        academicYear: "2024-25",
        companyName: "Infosys",
        sector: "IT Services",
        role: "Systems Engineer",
        package: 7.50,
        studentsPlaced: 12,
        visitDate: new Date('2024-08-25'),
        isPublished: true
      }
    ]);
    console.log('✅ Added 4 placements\n');

    // Seed Announcements
    console.log('📢 Seeding Announcements...');
    await Announcement.bulkCreate([
      {
        title: "Winter Break - College Closed",
        message: "The college will remain closed for winter break from December 20, 2025 to January 5, 2026",
        type: "info",
        priority: "high",
        startDate: new Date('2025-12-20'),
        endDate: new Date('2026-01-05'),
        isActive: true
      },
      {
        title: "Library Timing Extended",
        message: "Library will now be open till 10 PM on weekdays for exam preparation",
        type: "success",
        priority: "medium",
        startDate: new Date('2025-12-01'),
        endDate: new Date('2026-01-31'),
        isActive: true
      }
    ]);
    console.log('✅ Added 2 announcements\n');

    // Seed Gallery
    console.log('🖼️ Seeding Gallery...');
    await Gallery.bulkCreate([
      {
        eventTitle: "Faculty Development Programme 2024",
        eventDate: new Date('2024-11-15'),
        description: "Three-day FDP on emerging technologies in Computer Science",
        category: "academic",
        images: [],
        isPublished: true,
        isFeatured: true
      },
      {
        eventTitle: "Annual Sports Meet 2024",
        eventDate: new Date('2024-10-20'),
        description: "Inter-department sports competition",
        category: "sports",
        images: [],
        isPublished: true,
        isFeatured: false
      },
      {
        eventTitle: "Cultural Festival - Kaleidoscope 2024",
        eventDate: new Date('2024-09-15'),
        description: "Annual cultural fest with music, dance and drama",
        category: "cultural",
        images: [],
        isPublished: true,
        isFeatured: true
      }
    ]);
    console.log('✅ Added 3 gallery events\n');

    // Seed Media
    console.log('📰 Seeding Media Coverage...');
    await Media.bulkCreate([
      {
        title: "IIIT Kottayam 7th Convocation Ceremony",
        source: "Mathrubhumi Daily",
        type: "news",
        link: "#",
        publishDate: new Date('2024-12-01'),
        excerpt: "The 7th convocation ceremony was held with great fanfare",
        isPublished: true,
        isFeatured: true
      },
      {
        title: "PIN VIKAS Skill Development Programme Launched",
        source: "Manorama Online",
        type: "news",
        link: "#",
        publishDate: new Date('2024-11-15'),
        excerpt: "New skill development initiative launched at IIIT Kottayam",
        isPublished: true,
        isFeatured: false
      },
      {
        title: "First Batch of Cyber Commandos Complete Training",
        source: "The New Indian Express",
        type: "news",
        link: "#",
        publishDate: new Date('2024-10-10'),
        excerpt: "Cyber security training program successfully completed",
        isPublished: true,
        isFeatured: true
      }
    ]);
    console.log('✅ Added 3 media articles\n');

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
        content: "Indian Institute of Information Technology Kottayam\nVazhathope Campus, Kottayam\nKerala - 686635, India",
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
    console.log('🎉 Database seeding completed successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Summary:');
    console.log('   • News: 5');
    console.log('   • Events: 4');
    console.log('   • Faculty: 6');
    console.log('   • Students: 5');
    console.log('   • Placements: 4');
    console.log('   • Announcements: 2');
    console.log('   • Gallery: 3');
    console.log('   • Media: 3');
    console.log('   • Courses: 6');
    console.log('   • Research Publications: 5');
    console.log('   • Hero Sliders: 4');
    console.log('   • Company Logos: 10');
    console.log('   • NIRF Rankings: 4');
    console.log('   • Footer Items: 4');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

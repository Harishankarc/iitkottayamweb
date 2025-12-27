import sequelize from './config/database.js';
import News from './models/News.js';
import Event from './models/Event.js';
import Faculty from './models/Faculty.js';
import Student from './models/Student.js';
import Placement from './models/Placement.js';
import Announcement from './models/Announcement.js';
import Gallery from './models/Gallery.js';
import Media from './models/Media.js';

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
        isActive: true
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
        isActive: true
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
        isActive: true
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
        isActive: true
      },
      {
        name: "Dr. Bala S",
        designation: "Assistant Professor",
        department: "Electronics and Communication Engineering",
        email: "bala@iiitkottayam.ac.in",
        qualification: "Ph.D. in ECE",
        specialization: "VLSI Design, Embedded Systems",
        experience: 9,
        researchInterests: ["VLSI", "Embedded Systems", "Digital Design"],
        publications: [],
        isActive: true
      },
      {
        name: "Dr. Victor Paul",
        designation: "Assistant Professor",
        department: "Computer Science and Engineering",
        email: "victor@iiitkottayam.ac.in",
        qualification: "Ph.D. in Data Analytics",
        specialization: "Data Analytics, Big Data",
        experience: 6,
        researchInterests: ["Big Data", "Data Analytics", "Business Intelligence"],
        publications: [],
        isActive: true
      }
    ]);
    console.log('✅ Added 6 faculty members\n');

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
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

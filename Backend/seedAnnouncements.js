import Announcement from './models/Announcement.js';
import sequelize from './config/database.js';

const announcements = [
  {
    title: "Online Admissions 2025 - Applications Open",
    message: "Apply now for B.Tech, M.Tech, and PhD programs. Last date: March 31, 2026",
    type: "info",
    priority: "high",
    link: "/admissions",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-03-31"),
    isActive: true
  },
  {
    title: "Library Timing Extended",
    message: "Library will now be open till 10 PM on weekdays for exam preparation",
    type: "success",
    priority: "medium",
    link: "/library",
    startDate: new Date("2025-12-01"),
    endDate: new Date("2026-01-31"),
    isActive: true
  },
  {
    title: "Campus Placement Drive 2025",
    message: "Leading tech companies visiting campus. Register now on placement portal",
    type: "success",
    priority: "high",
    link: "/placements",
    startDate: new Date("2026-01-15"),
    endDate: new Date("2026-02-28"),
    isActive: true
  },
  {
    title: "New Research Facilities Inaugurated",
    message: "State-of-the-art AI and Robotics lab now operational for student projects",
    type: "info",
    priority: "medium",
    link: "/research",
    startDate: new Date("2026-01-10"),
    endDate: new Date("2026-02-15"),
    isActive: true
  },
  {
    title: "International Conference on AI - Call for Papers",
    message: "Submit your research papers by February 28. Full waiver for student authors",
    type: "warning",
    priority: "high",
    link: "/events",
    startDate: new Date("2026-01-20"),
    endDate: new Date("2026-02-28"),
    isActive: true
  },
  {
    title: "Scholarship Applications Open",
    message: "Merit and need-based scholarships available. Apply before February 15",
    type: "info",
    priority: "medium",
    link: "/scholarships",
    startDate: new Date("2026-01-15"),
    endDate: new Date("2026-02-15"),
    isActive: true
  },
  {
    title: "Sports Week 2026 - Register Now",
    message: "Inter-department sports competitions from Feb 5-10. Register your teams",
    type: "success",
    priority: "low",
    link: "/sports",
    startDate: new Date("2026-01-22"),
    endDate: new Date("2026-02-04"),
    isActive: true
  },
  {
    title: "Guest Lecture Series by Industry Experts",
    message: "Weekly sessions every Friday at 4 PM. Open to all students",
    type: "info",
    priority: "medium",
    link: "/events",
    startDate: new Date("2026-01-01"),
    endDate: new Date("2026-06-30"),
    isActive: true
  }
];

async function seedAnnouncements() {
  try {
    await sequelize.authenticate();
    console.log('📢 Seeding Announcements...\n');

    // Clear existing announcements
    await Announcement.destroy({ where: {}, truncate: true });
    console.log('🗑️  Cleared existing announcements\n');

    // Insert new announcements
    await Announcement.bulkCreate(announcements);
    console.log(`✅ Successfully added ${announcements.length} announcements\n`);

    // Display what was added
    const all = await Announcement.findAll({ order: [['priority', 'DESC']] });
    console.log('📋 Announcements in database:');
    all.forEach((a, i) => {
      console.log(`${i + 1}. ${a.title}`);
      console.log(`   Priority: ${a.priority}, Type: ${a.type}`);
      console.log(`   Active: ${a.isActive}, Valid till: ${a.endDate?.toLocaleDateString() || 'No end date'}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding announcements:', error);
    process.exit(1);
  }
}

seedAnnouncements();

import Club from './models/Club.js';
import sequelize from './config/database.js';

const clubsData = [
  {
    name: 'Coding Club',
    slug: 'coding-club',
    type: 'technical',
    description: 'The Coding Club promotes competitive programming, software development, and algorithmic problem-solving among students. Members participate in hackathons, coding competitions, and collaborative projects.',
    activities: JSON.stringify([
      'Weekly coding contests',
      'Hackathon participation',
      'Algorithm workshops',
      'Project collaborations',
      'Tech talks and seminars'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'coding@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 1
  },
  {
    name: 'Robotics Club',
    slug: 'robotics-club',
    type: 'technical',
    description: 'The Robotics Club focuses on robotics, automation, and mechatronics. Students design, build, and program robots for various applications and competitions.',
    activities: JSON.stringify([
      'Robot building workshops',
      'Automation projects',
      'Robotics competitions',
      'Arduino and Raspberry Pi projects',
      'Technical exhibitions'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'robotics@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 2
  },
  {
    name: 'AI & ML Club',
    slug: 'ai-ml-club',
    type: 'technical',
    description: 'The AI & Machine Learning Club explores artificial intelligence, machine learning, and data science. Members work on projects involving neural networks, computer vision, and NLP.',
    activities: JSON.stringify([
      'ML project development',
      'Kaggle competitions',
      'Research paper reading sessions',
      'Industry expert sessions',
      'AI hackathons'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'aiml@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 3
  },
  {
    name: 'Cyber Security Club',
    slug: 'cybersecurity-club',
    type: 'technical',
    description: 'The Cyber Security Club focuses on information security, ethical hacking, and network security. Students learn about vulnerabilities, penetration testing, and defensive strategies.',
    activities: JSON.stringify([
      'Capture The Flag (CTF) competitions',
      'Security workshops',
      'Penetration testing',
      'Security audits',
      'Awareness campaigns'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'cybersec@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 4
  },
  {
    name: 'Cultural Club',
    slug: 'cultural-club',
    type: 'cultural',
    description: 'The Cultural Club organizes and promotes various cultural events, performances, and festivals. It provides a platform for students to showcase their talents in music, dance, drama, and arts.',
    activities: JSON.stringify([
      'Annual cultural fest',
      'Music and dance performances',
      'Drama and theater',
      'Art exhibitions',
      'Festival celebrations',
      'Talent shows'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'cultural@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 5
  },
  {
    name: 'Literary Club',
    slug: 'literary-club',
    type: 'cultural',
    description: 'The Literary Club nurtures creative writing, debating, and public speaking skills. Members engage in poetry, storytelling, book discussions, and literary competitions.',
    activities: JSON.stringify([
      'Creative writing workshops',
      'Debate competitions',
      'Poetry recitals',
      'Book club meetings',
      'Public speaking events',
      'Literary magazine publication'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'literary@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 6
  },
  {
    name: 'Photography Club',
    slug: 'photography-club',
    type: 'cultural',
    description: 'The Photography Club brings together photography enthusiasts to learn, practice, and showcase their work. Members explore various genres from landscape to portrait photography.',
    activities: JSON.stringify([
      'Photography walks',
      'Photo exhibitions',
      'Photography workshops',
      'Camera technique sessions',
      'Photo editing tutorials',
      'Campus event coverage'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'photography@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 7
  },
  {
    name: 'Sports Club',
    slug: 'sports-club',
    type: 'sports',
    description: 'The Sports Club promotes physical fitness and sportsmanship through various indoor and outdoor sports activities. It organizes tournaments, training sessions, and inter-college competitions.',
    activities: JSON.stringify([
      'Cricket tournaments',
      'Football matches',
      'Badminton competitions',
      'Basketball games',
      'Table tennis championships',
      'Athletics events',
      'Fitness training'
    ]),
    coordinator: JSON.stringify({
      name: 'Sports Officer',
      email: 'sports@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 8
  },
  {
    name: 'Innovation & Entrepreneurship Cell (IEC)',
    slug: 'iec',
    type: 'technical',
    description: 'The Innovation & Entrepreneurship Cell fosters entrepreneurial mindset and supports startup ideas among students. It provides mentorship, resources, and networking opportunities.',
    activities: JSON.stringify([
      'Startup idea pitching',
      'Entrepreneurship workshops',
      'Industry mentorship',
      'Funding guidance',
      'Business plan competitions',
      'Networking events'
    ]),
    coordinator: JSON.stringify({
      name: 'Faculty Coordinator',
      email: 'iec@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 9
  },
  {
    name: 'IEEE Student Branch',
    slug: 'ieee',
    type: 'technical',
    description: 'IEEE Student Branch provides professional networking, technical learning, and leadership opportunities through workshops, seminars, and IEEE events.',
    activities: JSON.stringify([
      'Technical workshops',
      'Guest lectures',
      'IEEE conferences',
      'Paper presentations',
      'Project exhibitions',
      'Professional networking'
    ]),
    coordinator: JSON.stringify({
      name: 'Branch Counselor',
      email: 'ieee@iiitkottayam.ac.in',
      phone: '+91 482 2202100'
    }),
    displayOrder: 10
  }
];

async function seedClubs() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');

    // Clear existing clubs
    await Club.destroy({ where: {} });
    console.log('🗑️  Cleared existing clubs\n');

    // Insert new clubs
    for (const club of clubsData) {
      await Club.create(club);
      console.log(`✅ Created club: ${club.name}`);
    }

    console.log('\n🎉 Successfully seeded all clubs!');
    console.log(`📊 Total clubs: ${clubsData.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding clubs:', error);
    process.exit(1);
  }
}

seedClubs();

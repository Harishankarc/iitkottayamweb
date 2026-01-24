import dotenv from 'dotenv';
import sequelize from './config/database.js';
import Facility from './models/Facility.js';

dotenv.config();

const facilities = [
  {
    name: 'Hostel',
    slug: 'hostel',
    type: 'hostel',
    description: 'IIIT Kottayam provides separate hostel facilities for boys and girls with modern amenities and 24/7 security.',
    images: [],
    contact: {
      general: {
        email: 'hostel@iiitkottayam.ac.in',
        phone: '+91 0482-2202100'
      }
    },
    amenities: [
      'Wi-Fi connectivity',
      '24/7 Security',
      'Common rooms',
      'Reading rooms',
      'Indoor games facilities',
      'Laundry facilities',
      'Hot water supply',
      'Power backup'
    ],
    wardens: [
      {
        name: 'Chief Warden',
        role: 'Chief Warden',
        gender: 'Male',
        image: 'https://placehold.co/80x80/e8f5f0/239244?text=CW',
        phone: '+91 0482-2202XXX',
        email: 'chief.warden@iiitkottayam.ac.in'
      }
    ],
    halls: [
      {
        name: "Boys' Hostel",
        gender: 'Male',
        wardenType: 'Male Warden',
        contact: '+91 0482-2202XXX',
        email: 'boys.hostel@iiitkottayam.ac.in'
      },
      {
        name: "Girls' Hostel",
        gender: 'Female',
        wardenType: 'Female Warden',
        contact: '+91 0482-2202XXX',
        email: 'girls.hostel@iiitkottayam.ac.in'
      }
    ],
    isActive: true,
    displayOrder: 1
  },
  {
    name: 'Gymnasium',
    slug: 'gym',
    type: 'gym',
    description: 'A well-equipped gymnasium facility for students and faculty to maintain their physical fitness and health.',
    images: [],
    contact: {
      email: 'sports@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      person: 'Sports In-Charge',
      designation: 'Physical Education Officer'
    },
    timings: {
      weekday: '6:00 AM - 9:00 PM',
      weekend: '7:00 AM - 8:00 PM',
      holidays: 'Closed on institute holidays'
    },
    amenities: [
      'Cardio equipment (treadmills, cycles, elliptical)',
      'Weight training equipment',
      'Strength training machines',
      'Free weights section',
      'Yoga and aerobics area',
      'Personal training available',
      'Changing rooms and lockers',
      'Water purifier'
    ],
    customFields: {
      rules: [
        'Proper sports attire and shoes are mandatory',
        'Equipment must be returned after use',
        'Students must carry their ID cards',
        'Outside footwear not allowed inside gym'
      ]
    },
    isActive: true,
    displayOrder: 2
  },
  {
    name: 'Sports Complex',
    slug: 'sports',
    type: 'sports',
    description: 'State-of-the-art sports facilities for various indoor and outdoor games to promote physical fitness and sportsmanship.',
    images: [],
    contact: {
      email: 'sports@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      person: 'Sports Officer',
      designation: 'Physical Education Officer'
    },
    amenities: [
      'Cricket ground',
      'Football field',
      'Basketball court',
      'Volleyball court',
      'Badminton courts',
      'Table tennis tables',
      'Chess and carrom boards',
      'Athletics track',
      'Sports equipment room'
    ],
    customFields: {
      facilities: [
        {
          name: 'Outdoor Sports',
          games: ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Athletics']
        },
        {
          name: 'Indoor Sports',
          games: ['Badminton', 'Table Tennis', 'Chess', 'Carrom', 'Gym']
        }
      ]
    },
    isActive: true,
    displayOrder: 3
  },
  {
    name: 'Medical Centre',
    slug: 'medical',
    type: 'medical',
    description: 'On-campus medical facility providing primary healthcare services to students and staff.',
    images: [],
    contact: {
      email: 'medical@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      emergency: '108 (Ambulance)',
      person: 'Medical Officer',
      designation: 'Doctor'
    },
    timings: {
      weekday: '9:00 AM - 5:00 PM',
      weekend: '10:00 AM - 2:00 PM',
      emergency: '24/7 Emergency services available'
    },
    amenities: [
      'Qualified medical practitioners',
      'First aid facilities',
      'Basic medicines',
      'Emergency care',
      'Health check-ups',
      'Medical insurance coordination',
      'Ambulance service',
      'Tie-ups with nearby hospitals'
    ],
    customFields: {
      services: [
        'General consultation',
        'First aid and emergency care',
        'Minor injury treatment',
        'Prescription and medicines',
        'Health awareness programs',
        'Vaccination camps'
      ]
    },
    isActive: true,
    displayOrder: 4
  },
  {
    name: 'Student Mess',
    slug: 'mess',
    type: 'mess',
    description: 'Hygienic and nutritious food services providing vegetarian and non-vegetarian meals for students.',
    images: [],
    contact: {
      email: 'mess@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      person: 'Mess Manager'
    },
    timings: {
      breakfast: '7:30 AM - 9:30 AM',
      lunch: '12:30 PM - 2:30 PM',
      snacks: '5:00 PM - 6:00 PM',
      dinner: '7:30 PM - 9:30 PM'
    },
    amenities: [
      'Vegetarian and non-vegetarian options',
      'Hygienic food preparation',
      'Spacious dining hall',
      'Quality ingredients',
      'Special meals on occasions',
      'Feedback system',
      'Mess committee for students'
    ],
    customFields: {
      menuCycle: '7-day rotating menu',
      facilities: [
        'Separate dining areas',
        'Water purifier',
        'Hand wash stations',
        'Clean and hygienic kitchen'
      ]
    },
    isActive: true,
    displayOrder: 5
  },
  {
    name: 'Internet & Network',
    slug: 'internet',
    type: 'internet',
    description: 'High-speed internet connectivity across campus with Wi-Fi access in academic buildings, hostels, and common areas.',
    images: [],
    contact: {
      email: 'network@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      person: 'Network Administrator',
      designation: 'IT Officer'
    },
    amenities: [
      'High-speed fiber optic internet',
      'Campus-wide Wi-Fi coverage',
      'Computer labs with internet',
      'Dedicated bandwidth for academics',
      '24/7 connectivity in hostels',
      'Firewall and security systems',
      'Network monitoring',
      'Technical support'
    ],
    customFields: {
      specifications: {
        bandwidth: 'Multi-Gbps fiber optic connection',
        coverage: 'Entire campus including hostels',
        security: 'Firewall, content filtering, antivirus',
        support: '24/7 technical support'
      },
      services: [
        'Educational resources access',
        'Online library and journals',
        'Video conferencing facilities',
        'Cloud services',
        'Email services'
      ]
    },
    isActive: true,
    displayOrder: 6
  },
  {
    name: 'Security Services',
    slug: 'security',
    type: 'security',
    description: '24/7 security services ensuring safety and security of students, staff, and campus property.',
    images: [],
    contact: {
      email: 'security@iiitkottayam.ac.in',
      phone: '+91 0482-2202XXX',
      emergency: '+91 0482-2202XXX (24/7)',
      person: 'Chief Security Officer'
    },
    amenities: [
      '24/7 security personnel',
      'CCTV surveillance',
      'Main gate access control',
      'Visitor management system',
      'Regular campus patrols',
      'Emergency response team',
      'Fire safety equipment',
      'Women safety measures'
    ],
    customFields: {
      features: [
        'Multiple security checkpoints',
        'Monitored entry and exit',
        'Vehicle parking management',
        'Lost and found services',
        'Safety awareness programs'
      ],
      emergencyContacts: [
        { service: 'Police', number: '100' },
        { service: 'Fire', number: '101' },
        { service: 'Ambulance', number: '108' },
        { service: 'Campus Security', number: '+91 0482-2202XXX' }
      ]
    },
    isActive: true,
    displayOrder: 7
  }
];

const seedFacilities = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear existing data (optional)
    // await Facility.destroy({ where: {} });
    // console.log('🗑️  Cleared existing facilities');

    // Insert new data
    await Facility.bulkCreate(facilities);
    console.log(`✅ Seeded ${facilities.length} facilities`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding facilities:', error);
    console.error(error.stack);
    process.exit(1);
  }
};

seedFacilities();

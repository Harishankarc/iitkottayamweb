import dotenv from 'dotenv';
import sequelize from './config/database.js';
import People from './models/People.js';

dotenv.config();

const peopleData = [
  // Administration
  {
    name: 'Prof. Prasad Krishna',
    designation: 'Director, NIT Calicut',
    department: 'Director (Addl. charge), IIIT Kottayam',
    email: 'director@iiitkottayam.ac.in',
    phone: '+91 0482-2202137 (Office) | +91 0482-2202112 (Office)',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=PK',
    qualification: 'N/A',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr. M Radhakrishnan',
    designation: 'Registrar, IIIT Kottayam',
    department: 'Former Registrar, IISER-TVM | Former Dy. Registrar NIT Calicut',
    email: 'registrar@iiitkottayam.ac.in',
    phone: '+91 0482-2202100',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=MR',
    qualification: 'N/A',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Prof Ashok S',
    designation: 'Adjunct Professor and Professor In-charge (Academics)',
    department: 'Former Professor NIT Calicut',
    email: 'pic.academics@iiitkottayam.ac.in',
    phone: '+91 0482-2202132 | +91 0482-2202175(off.)',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=AS',
    qualification: 'Room No: AC 307',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr. Ebin Deni Raj',
    designation: 'Associate Dean (Academic Affairs)',
    department: '',
    email: 'ebindeniraj@iiitkottayam.ac.in',
    phone: '+91 (0) 482-2202195',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=EDR',
    qualification: 'Room No: AC 308 / AA 117',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr Divya Sindhu Lekha',
    designation: 'Associate Dean (Academic Affairs-PG)',
    department: '',
    email: 'divyasindhu@iiitkottayam.ac.in',
    phone: '+91 (0) 482-2202161',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=DSL',
    qualification: 'Room No: BD 417 / AA 116',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr. Bakkyaraj T',
    designation: 'Associate Dean (Hostel Affairs & Student Events)',
    department: '',
    email: 'bakkyaraj@iiitkottayam.ac.in',
    phone: '+91 (0) 482-2202160',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=BT',
    qualification: 'Room No: AB 212 / AA 118',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr. J. V. Bibal Benifa',
    designation: 'Associate Dean (Students Welfare & Career Development Services)',
    department: '',
    email: 'benifa@iiitkottayam.ac.in',
    phone: '+91 (0) 482-2202163',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=JVB',
    qualification: 'Room No: BD 416 / AB 216',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },
  {
    name: 'Dr. Ragesh G K',
    designation: 'Associate Dean (Industrial Relations & Funding)',
    department: 'Faculty In-Charge (Public Relations & IPR, IIC, Gyaan Innovation Lab, Certificate Programme)',
    email: 'ragesh@iiitkottayam.ac.in',
    phone: '+91 (0) 482-2202179',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=RGK',
    qualification: 'Room No: CAB 103 B',
    specialization: '',
    experience: '',
    userType: 'administration',
    isActive: true
  },

  // HOD
  {
    name: 'Dr. Ananth A',
    designation: 'HOD (Electronics & Communication Eng.)',
    department: 'Electronics & Communication Engineering',
    email: 'ananth@iiitkottayam.ac.in',
    phone: '0482-2202176',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=AA',
    qualification: 'Room No: AB 208 / AC 313',
    specialization: '',
    experience: '',
    userType: 'hod',
    isActive: true
  },
  {
    name: 'Dr. Jayakrushna Sahoo',
    designation: 'HOD(Computer Science & Engineering-I)',
    department: 'Computer Science & Engineering-I',
    email: 'jsahoo@iiitkottayam.ac.in',
    phone: '0482-2202190, 0482-2202164',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=JS',
    qualification: 'Room No: AA 108 / AA 123',
    specialization: '',
    experience: '',
    userType: 'hod',
    isActive: true
  },
  {
    name: 'Dr. Rubell Marion Lincy G',
    designation: 'HOD(Computer Science & Engineering-2)',
    department: 'Computer Science & Engineering-2',
    email: 'lincy@iiitkottayam.ac.in',
    phone: '0482-2202152',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=RL',
    qualification: 'Room No: BC 317 / AB 219',
    specialization: '',
    experience: '',
    userType: 'hod',
    isActive: true
  },
  {
    name: 'Dr. Dhanyamol M V',
    designation: 'HOD (Computational Science & Humanities)',
    department: 'Computational Science & Humanities',
    email: 'dhanya@iiitkottayam.ac.in',
    phone: '0482-2202162',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=DM',
    qualification: 'Room No: BC 316 / AA 119',
    specialization: '',
    experience: '',
    userType: 'hod',
    isActive: true
  },
  {
    name: 'Dr. Panchami',
    designation: 'HOD (CSE- Cyber Security)',
    department: 'CSE- Cyber Security',
    email: 'panchami036@iiitkottayam.ac.in',
    phone: '0482-2202151',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=P',
    qualification: 'Room No: BC 315 / AB 217',
    specialization: '',
    experience: '',
    userType: 'hod',
    isActive: true
  },

  // Technical Staff
  {
    name: 'IT Support Team',
    designation: 'Technical Support Officer',
    department: 'IT Center',
    email: 'itsupport@iiitkottayam.ac.in',
    phone: '+91 0482-2202190',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=IT',
    qualification: '',
    specialization: 'Network Administration, System Maintenance',
    experience: '',
    userType: 'technical-staff',
    isActive: true
  },

  // Support Staff
  {
    name: 'Library Services',
    designation: 'Library In-Charge',
    department: 'Central Library',
    email: 'library@iiitkottayam.ac.in',
    phone: '+91 0482-2202191',
    photo: 'https://placehold.co/128x128/e8f5f0/239244?text=LIB',
    qualification: '',
    specialization: 'Digital Resources, Library Management',
    experience: '',
    userType: 'support-staff',
    isActive: true
  }
];

const seedPeople = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Clear existing people data (optional - remove if you want to keep existing)
    // await People.destroy({ where: {} });
    // console.log('🗑️  Cleared existing people data');

    // Insert new data
    await People.bulkCreate(peopleData);
    console.log(`✅ Seeded ${peopleData.length} people records`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding people:', error);
    process.exit(1);
  }
};

seedPeople();

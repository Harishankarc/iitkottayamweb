import sequelize from './config/database.js';
import People from './models/People.js';

async function seedAdministrationPeople() {
  console.log('👥 Seeding Administration People Data...\n');

  try {
    // Delete existing administration people
    await People.destroy({ where: { userType: 'administration' } });
    console.log('🗑️  Cleared existing administration people\n');

    // Administration Team Members - General Administration
    const administrationData = [
      {
        name: 'Prof. Prasad Krishna',
        designation: 'Director, NIT Calicut',
        department: 'Director (Addl. charge), IIIT Kottayam',
        email: 'director@iiitkottayam.ac.in',
        phone: '+91 0482-2202137 (Office) | +91 0482-2202112 (Office)',
        qualification: 'N/A',
        specialization: 'general', // Using specialization field for category
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=PK',
        userType: 'administration',
        isActive: true
      },
      {
        name: 'Dr. M Radhakrishnan',
        designation: 'Registrar, IIIT Kottayam',
        department: 'Former Registrar, IISER-TVM | Former Dy. Registrar NIT Calicut',
        email: 'registrar@iiitkottayam.ac.in',
        phone: '+91 0482-2202100',
        qualification: 'N/A',
        specialization: 'general',
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=MR',
        userType: 'administration',
        isActive: true
      },
      {
        name: 'Prof Ashok S',
        designation: 'Adjunct Professor and Professor In-charge (Academics)',
        department: 'Former Professor NIT Calicut',
        email: 'pic.academics@iiitkottayam.ac.in',
        phone: '+91 0482-2202132 | +91 0482-2202175(off.)',
        qualification: 'Room No: AC 307',
        specialization: 'general',
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=AS',
        userType: 'administration',
        isActive: true
      },
      {
        name: 'Dr. Ragesh G K',
        designation: 'Associate Dean (Industrial Relations & Funding)',
        department: 'Faculty In-Charge (Public Relations & Intellectual Property Rights, Institute Innovation Cell, Gyaan Innovation Lab-IIITK, Certificate Programme)',
        email: 'ragesh@iiitkottayam.ac.in',
        phone: '+91 (0) 482-2202179',
        qualification: 'N/A',
        specialization: 'fac-in-charge',
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=RGK',
        userType: 'administration',
        isActive: true
      },
      {
        name: 'IT Support Team',
        designation: 'Technical Support Officer',
        department: 'Network Administration | System Maintenance',
        email: 'itsupport@iiitkottayam.ac.in',
        phone: '+91 0482-2202190',
        qualification: 'N/A',
        specialization: 'support',
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=IT',
        userType: 'administration',
        isActive: true
      },
      {
        name: 'Library Services',
        designation: 'Library In-Charge',
        department: 'Digital Resources | Library Management',
        email: 'library@iiitkottayam.ac.in',
        phone: '+91 0482-2202191',
        qualification: 'N/A',
        specialization: 'support',
        experience: 'N/A',
        photo: 'https://placehold.co/128x128/22a05e/ffffff?text=LIB',
        userType: 'administration',
        isActive: true
      }
    ];

    // Insert all people
    for (const person of administrationData) {
      await People.create(person);
      console.log(`✅ Added: ${person.name} - ${person.designation} [${person.specialization}]`);
    }

    console.log('\n✅ Administration people data seeded successfully!');
    console.log(`📊 Total records: ${administrationData.length}`);
    
    const general = administrationData.filter(p => p.specialization === 'general').length;
    const facInCharge = administrationData.filter(p => p.specialization === 'fac-in-charge').length;
    const support = administrationData.filter(p => p.specialization === 'support').length;
    
    console.log(`   - General Administration: ${general}`);
    console.log(`   - Faculty In-Charge: ${facInCharge}`);
    console.log(`   - Support Services: ${support}`);
  } catch (error) {
    console.error('❌ Error seeding administration people:', error);
    throw error;
  }
}

// Run the seeder
seedAdministrationPeople()
  .then(() => {
    console.log('\nDone!');
    return sequelize.close();
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });

export default seedAdministrationPeople;

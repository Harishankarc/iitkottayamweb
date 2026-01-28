import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iiitkottayam',
  port: process.env.DB_PORT || 3306
};

const additionalAdministration = [
  {
    name: 'Prof. Prasad Krishna',
    designation: 'Director, NIT Calicut',
    department: 'Director (Addl. charge), IIIT Kottayam',
    email: 'director@iiitkottayam.ac.in',
    phone: '+91-0483-2202137 (Office) | +91-0483-2202112 (Office)',
    qualification: 'N/A',
    specialization: 'general',
    userType: 'administration',
    photo: 'pk.jpg'
  },
  {
    name: 'Dr. M Radhakrishnan',
    designation: 'Registrar, IIIT Kottayam',
    department: 'Former Registrar, IIHS-TVM | Former Dy. Registrar NIT Calicut',
    email: 'registrar@iiitkottayam.ac.in',
    phone: '+91-0483-2202100',
    qualification: 'N/A',
    specialization: 'general',
    userType: 'administration',
    photo: 'mr.jpg'
  },
  {
    name: 'Prof Ashok S',
    designation: 'Adjunct Professor and Professor In-charge (Academics)',
    department: 'Former Professor, IIIT Calicut',
    email: 'pic.academics@iiitkottayam.ac.in',
    phone: '+91-0483-2202121 | +91-0483-2202179(Staff)',
    qualification: 'Room No: AC 207',
    specialization: 'general',
    userType: 'administration',
    photo: 'as.jpg'
  },
  {
    name: 'Dr. Ebin Deni Raj',
    designation: 'Associate Dean (Academic Affairs)',
    department: '',
    email: 'ebindenraj@iiitkottayam.ac.in',
    phone: '+91 (0)-483-2202198',
    qualification: 'Room No: AC 208 / AA 117',
    specialization: 'fac-in-charge',
    userType: 'administration',
    photo: 'edr.jpg'
  },
  {
    name: 'Dr Divya Sindhu Lekha',
    designation: 'Associate Dean (Academic Affairs-PG)',
    department: '',
    email: 'divyasindhu@iiitkottayam.ac.in',
    phone: '+91 (0)-483-2202141',
    qualification: 'Room No: 8D 417 / AA 116',
    specialization: 'fac-in-charge',
    userType: 'administration',
    photo: 'dsl.jpg'
  },
  {
    name: 'Dr. Baddyaraj T',
    designation: 'Associate Dean (Hostel Affairs & Student Events)',
    department: '',
    email: 'baddyaraj@iiitkottayam.ac.in',
    phone: '+91 (0)-483-2202160',
    qualification: 'Room No: AB 212 / AA 118',
    specialization: 'fac-in-charge',
    userType: 'administration',
    photo: 'bt.jpg'
  }
];

async function seedAdditionalAdministration() {
  let connection;
  
  try {
    console.log('🔗 Connecting to database...');
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');

    // Delete existing administration data to avoid duplicates
    console.log('🗑️  Clearing existing administration data...');
    await connection.execute(
      `DELETE FROM People WHERE userType = 'administration'`
    );
    console.log('✅ Existing data cleared');

    // Insert new administration data
    console.log('📝 Inserting administration data...');
    for (const person of additionalAdministration) {
      const query = `
        INSERT INTO People (
          name, designation, department, email, phone, 
          qualification, specialization, userType, photo, isActive
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      await connection.execute(query, [
        person.name,
        person.designation,
        person.department,
        person.email,
        person.phone,
        person.qualification,
        person.specialization,
        person.userType,
        person.photo,
        true
      ]);
      
      console.log(`✅ Added: ${person.name}`);
    }

    console.log('\n🎉 Successfully seeded administration data!');
    console.log(`📊 Total records: ${additionalAdministration.length}`);

  } catch (error) {
    console.error('❌ Error seeding administration data:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the seeder
seedAdditionalAdministration()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

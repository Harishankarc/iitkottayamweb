import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const students = [
  // 2019 Batch
  { name: 'Aarav Kumar', batch: '2019', branch: 'CSE' },
  { name: 'Diya Sharma', batch: '2019', branch: 'ECE' },
  { name: 'Arjun Patel', batch: '2019', branch: 'CSE' },
  
  // 2020 Batch
  { name: 'Ananya Singh', batch: '2020', branch: 'AI & DS' },
  { name: 'Rohan Verma', batch: '2020', branch: 'CSE' },
  { name: 'Priya Reddy', batch: '2020', branch: 'ECE' },
  { name: 'Vikram Nair', batch: '2020', branch: 'Cybersecurity' },
  
  // 2021 Batch
  { name: 'Ishita Gupta', batch: '2021', branch: 'AI & DS' },
  { name: 'Karan Malhotra', batch: '2021', branch: 'CSE' },
  { name: 'Neha Joshi', batch: '2021', branch: 'ECE' },
  { name: 'Aditya Rao', batch: '2021', branch: 'Cybersecurity' },
  { name: 'Pooja Iyer', batch: '2021', branch: 'CSE' },
  
  // 2022 Batch
  { name: 'Rahul Khanna', batch: '2022', branch: 'AI & DS' },
  { name: 'Sneha Kapoor', batch: '2022', branch: 'CSE' },
  { name: 'Varun Desai', batch: '2022', branch: 'ECE' },
  { name: 'Riya Bansal', batch: '2022', branch: 'Cybersecurity' },
  { name: 'Siddharth Pillai', batch: '2022', branch: 'AI & DS' },
  { name: 'Kavya Menon', batch: '2022', branch: 'CSE' },
  
  // 2023 Batch
  { name: 'Aryan Shah', batch: '2023', branch: 'CSE' },
  { name: 'Tanvi Agarwal', batch: '2023', branch: 'AI & DS' },
  { name: 'Harsh Trivedi', batch: '2023', branch: 'ECE' },
  { name: 'Shruti Sinha', batch: '2023', branch: 'Cybersecurity' },
  { name: 'Nikhil Bhatt', batch: '2023', branch: 'CSE' },
  { name: 'Anjali Saxena', batch: '2023', branch: 'AI & DS' },
  { name: 'Vivek Pandey', batch: '2023', branch: 'ECE' },
  
  // 2024 Batch
  { name: 'Ritika Chawla', batch: '2024', branch: 'AI & DS' },
  { name: 'Akash Mehta', batch: '2024', branch: 'CSE' },
  { name: 'Simran Kaur', batch: '2024', branch: 'Cybersecurity' },
  { name: 'Yash Bhatia', batch: '2024', branch: 'ECE' },
  { name: 'Mira Sethi', batch: '2024', branch: 'AI & DS' },
  { name: 'Kartik Oberoi', batch: '2024', branch: 'CSE' },
  { name: 'Naina Ahuja', batch: '2024', branch: 'ECE' }
];

async function seedMTechStudents() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    console.log('🔄 Starting to seed M.Tech students...\n');

    // Clear existing M.Tech students
    await connection.execute(`DELETE FROM People WHERE userType = 'mtech-students'`);
    console.log('✅ Cleared existing M.Tech students\n');

    // Insert students
    for (const student of students) {
      const [result] = await connection.execute(
        `INSERT INTO People (name, department, specialization, userType, isActive, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          student.name,
          student.batch, // Store batch year in department field
          student.branch || '', // Store branch in specialization field
          'mtech-students',
          true
        ]
      );
      console.log(`✅ Added: ${student.name} (${student.batch} Batch${student.branch ? ', ' + student.branch : ''})`);
    }

    console.log(`\n🎉 Successfully seeded ${students.length} M.Tech students!`);
    console.log(`📊 Distribution:`);
    console.log(`   2019 Batch: ${students.filter(s => s.batch === '2019').length}`);
    console.log(`   2020 Batch: ${students.filter(s => s.batch === '2020').length}`);
    console.log(`   2021 Batch: ${students.filter(s => s.batch === '2021').length}`);
    console.log(`   2022 Batch: ${students.filter(s => s.batch === '2022').length}`);
    console.log(`   2023 Batch: ${students.filter(s => s.batch === '2023').length}`);
    console.log(`   2024 Batch: ${students.filter(s => s.batch === '2024').length}`);

  } catch (error) {
    console.error('❌ Error seeding M.Tech students:', error);
  } finally {
    await connection.end();
  }
}

seedMTechStudents();

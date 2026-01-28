import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const students = [
  // 2015 Batch (from screenshot)
  { name: 'A. ADDEPALLI VENKATA MANIKYALA RAO', batch: '2015', branch: 'CSE' },
  { name: 'AKASH TIMMAPURAM', batch: '2015', branch: 'CSE' },
  { name: 'ANIL KUMAR YADAV', batch: '2015', branch: 'CSE' },
  { name: 'ANJU MARY PETER', batch: '2015', branch: 'ECE' },
  { name: 'ANJU BHATLA', batch: '2015', branch: 'ECE' },
  { name: 'BANAVATH SHIVA SHANTHA MANI', batch: '2015', branch: 'CSE' },
  { name: 'BEVARA RAVI VARMA KUMAR', batch: '2015', branch: 'CSE' },
  { name: 'DARLA PRASHANTH', batch: '2015', branch: 'ECE' },
  { name: 'ESILAVATH RAMYA', batch: '2015', branch: 'ECE' },
  { name: 'ETHAKOTA RAVANSAI', batch: '2015', branch: 'CSE' },
  { name: 'HARSH KUMAR SINGH', batch: '2015', branch: 'CSE' },
  { name: 'JALIBIU PUSHPAK', batch: '2015', branch: 'ECE' },
  { name: 'KALIDINOI ALEKHYA', batch: '2015', branch: 'ECE' },
  { name: 'KODURU JASWANTH KUMAR', batch: '2015', branch: 'CSE' },
  { name: 'KOTLAPUDI JASWANTH', batch: '2015', branch: 'CSE' },
  { name: 'KOVYANA YASHWANT SRIVATSAV', batch: '2015', branch: 'ECE' },
  { name: 'MAROTU RAJESH KUMAR', batch: '2015', branch: 'CSE' },
  { name: 'MEDA RAVALI', batch: '2015', branch: 'ECE' },
  { name: 'MOOD DINESH', batch: '2015', branch: 'CSE' },
  { name: 'MUNULURI SRIJA ASRITHA', batch: '2015', branch: 'ECE' },
  { name: 'POSIPOGU ANANDA BHARATH', batch: '2015', branch: 'CSE' },
  { name: 'RAJAT KUMAR', batch: '2015', branch: 'CSE' },
  { name: 'SAVIO JOSE', batch: '2015', branch: 'CSE' },
  { name: 'SHIVENDRA SINGH', batch: '2015', branch: 'CSE' },
  
  // Additional batches (sample data)
  { name: 'Sample Student 2016-1', batch: '2016', branch: 'CSE' },
  { name: 'Sample Student 2016-2', batch: '2016', branch: 'ECE' },
  { name: 'Sample Student 2017-1', batch: '2017', branch: 'AI & DS' },
  { name: 'Sample Student 2017-2', batch: '2017', branch: 'Cybersecurity' },
  { name: 'Sample Student 2018-1', batch: '2018', branch: 'CSE' },
  { name: 'Sample Student 2018-2', batch: '2018', branch: 'ECE' },
  { name: 'Sample Student 2019-1', batch: '2019', branch: 'AI & DS' },
  { name: 'Sample Student 2019-2', batch: '2019', branch: 'Cybersecurity' },
  { name: 'Sample Student 2020-1', batch: '2020', branch: 'CSE' },
  { name: 'Sample Student 2020-2', batch: '2020', branch: 'ECE' },
  { name: 'Sample Student 2021-1', batch: '2021', branch: 'AI & DS' },
  { name: 'Sample Student 2021-2', batch: '2021', branch: 'CSE' },
  { name: 'Sample Student 2022-1', batch: '2022', branch: 'Cybersecurity' },
  { name: 'Sample Student 2022-2', batch: '2022', branch: 'ECE' }
];

async function seedBTechStudents() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    console.log('🔄 Starting to seed B.Tech students...\n');

    // Clear existing B.Tech students
    await connection.execute(`DELETE FROM People WHERE userType = 'btech-students'`);
    console.log('✅ Cleared existing B.Tech students\n');

    // Insert students
    for (const student of students) {
      const [result] = await connection.execute(
        `INSERT INTO People (name, department, specialization, userType, isActive, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          student.name,
          student.batch, // Store batch year in department field
          student.branch || '', // Store branch in specialization field
          'btech-students',
          true
        ]
      );
      console.log(`✅ Added: ${student.name} (${student.batch} Batch${student.branch ? ', ' + student.branch : ''})`);
    }

    console.log(`\n🎉 Successfully seeded ${students.length} B.Tech students!`);
    console.log(`📊 Distribution:`);
    console.log(`   2015 Batch: ${students.filter(s => s.batch === '2015').length}`);
    console.log(`   2016 Batch: ${students.filter(s => s.batch === '2016').length}`);
    console.log(`   2017 Batch: ${students.filter(s => s.batch === '2017').length}`);
    console.log(`   2018 Batch: ${students.filter(s => s.batch === '2018').length}`);
    console.log(`   2019 Batch: ${students.filter(s => s.batch === '2019').length}`);
    console.log(`   2020 Batch: ${students.filter(s => s.batch === '2020').length}`);
    console.log(`   2021 Batch: ${students.filter(s => s.batch === '2021').length}`);
    console.log(`   2022 Batch: ${students.filter(s => s.batch === '2022').length}`);

  } catch (error) {
    console.error('❌ Error seeding B.Tech students:', error);
  } finally {
    await connection.end();
  }
}

seedBTechStudents();

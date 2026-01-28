import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const scholars = [
  // 2025 Batch
  { name: 'Nair S Rajlaxmi', type: 'EXTERNAL REGISTRANTS', batch: '2025' },
  { name: 'Lekshmi A C', type: 'SELF-FINANCING (FULL-TIME)', batch: '2025' },
  { name: 'Siddhanthapu Srinivasu', type: 'EXTERNAL REGISTRANTS', batch: '2025' },
  
  // 2024 Batch
  { name: 'Pretty Joy', type: 'SCHOLARSHIP HOLDER(FULL- TIME)', batch: '2024' },
  { name: 'Surag Sunil', type: 'SCHOLARSHIP HOLDER(FULL- TIME)', batch: '2024' },
  { name: 'Sreelakshmi. P', type: 'SCHOLARSHIP HOLDER(FULL- TIME)', batch: '2024' },
  
  // 2023 Batch
  { name: 'Sreedevi R', type: 'EXTERNAL REGISTRANTS', batch: '2023' },
  { name: 'Hridya K S', type: 'EXTERNAL REGISTRANTS', batch: '2023' },
  { name: 'Aswathy P', type: 'EXTERNAL REGISTRANTS', batch: '2023' },
  
  // 2022 Batch
  { name: 'Navneeth Sreenivasan', type: 'SELF-FINANCING (FULL-TIME)', batch: '2022' },
  { name: 'Vimal Vinod', type: 'EXTERNAL REGISTRANTS', batch: '2022' },
  { name: 'Remya Paul', type: 'SELF-FINANCING (FULL-TIME)', batch: '2022' },
  
  // 2021 Batch
  { name: 'Ganikanti Sivannarayana', type: 'EXTERNAL REGISTRANTS', batch: '2021' },
  { name: 'M.V.P.Umamaheswara Rao', type: 'EXTERNAL REGISTRANTS', batch: '2021' },
  { name: 'Meagan Mathew', type: 'SELF-FINANCING (FULL-TIME)', batch: '2021' },
  
  // Random distribution for remaining scholars
  { name: 'Lisa Varghese', type: 'SELF-FINANCING (FULL-TIME)', batch: '2024' },
  { name: 'Merin Philip', type: 'EXTERNAL REGISTRANTS', batch: '2023' },
  { name: 'Sanjana Peter', type: 'EXTERNAL REGISTRANTS', batch: '2022' },
  { name: 'Sherin KP', type: 'SELF-FINANCING (FULL-TIME)', batch: '2025' },
  { name: 'Gayathri T', type: 'SELF-FINANCING (FULL-TIME)', batch: '2024' },
  { name: 'Naseema Nazar', type: 'EXTERNAL REGISTRANTS', batch: '2023' }
];

async function seedResearchScholars() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'iiitkottayam'
  });

  try {
    console.log('🔄 Starting to seed research scholars...\n');

    // Clear existing research scholars
    await connection.execute(`DELETE FROM People WHERE userType = 'research-scholars'`);
    console.log('✅ Cleared existing research scholars\n');

    // Insert scholars
    for (const scholar of scholars) {
      const [result] = await connection.execute(
        `INSERT INTO People (name, designation, department, userType, specialization, isActive, createdAt, updatedAt) 
         VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [
          scholar.name,
          scholar.type,
          scholar.batch,
          'research-scholars',
          scholar.type, // Store type in specialization field for filtering
          true
        ]
      );
      console.log(`✅ Added: ${scholar.name} (${scholar.batch} Batch - ${scholar.type})`);
    }

    console.log(`\n🎉 Successfully seeded ${scholars.length} research scholars!`);
    console.log(`📊 Distribution:`);
    console.log(`   2025 Batch: ${scholars.filter(s => s.batch === '2025').length}`);
    console.log(`   2024 Batch: ${scholars.filter(s => s.batch === '2024').length}`);
    console.log(`   2023 Batch: ${scholars.filter(s => s.batch === '2023').length}`);
    console.log(`   2022 Batch: ${scholars.filter(s => s.batch === '2022').length}`);
    console.log(`   2021 Batch: ${scholars.filter(s => s.batch === '2021').length}`);

  } catch (error) {
    console.error('❌ Error seeding research scholars:', error);
  } finally {
    await connection.end();
  }
}

seedResearchScholars();

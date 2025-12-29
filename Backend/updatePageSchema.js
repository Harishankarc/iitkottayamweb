import mysql from 'mysql2/promise';

const addMissingColumns = async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'iitkottayam'
  });

  const columns = [
    { name: 'navigationGroup', type: 'VARCHAR(100)' },
    { name: 'parentPage', type: 'VARCHAR(100)' },
    { name: 'pageOrder', type: 'INT DEFAULT 0' }
  ];

  for (const col of columns) {
    try {
      await conn.query(`ALTER TABLE page_contents ADD COLUMN ${col.name} ${col.type}`);
      console.log(`✅ Added ${col.name}`);
    } catch (e) {
      if (e.message.includes('Duplicate column')) {
        console.log(`✅ ${col.name} already exists`);
      } else {
        console.log(`❌ ${col.name}: ${e.message}`);
      }
    }
  }

  await conn.end();
  console.log('\n✅ Database schema updated!');
};

addMissingColumns();

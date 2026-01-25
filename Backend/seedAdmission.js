import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedAdmissionPage() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'iitkottayam'
    });

    console.log('Connected to database...');

    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'seedAdmissionPage.sql'), 'utf8');
    
    // Split by semicolon and execute each statement
    const statements = sqlFile.split(';').filter(stmt => stmt.trim().length > 0);
    
    for (const statement of statements) {
      if (statement.trim()) {
        await connection.query(statement);
        console.log('Executed statement');
      }
    }

    console.log('✅ Admission page seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding admission page:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedAdmissionPage();

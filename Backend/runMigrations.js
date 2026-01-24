import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runMigrations = async () => {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'iitkottayam',
      multipleStatements: true
    });

    console.log('✅ Database connected');

    // List of migration files
    const migrations = [
      'create_facilities_table.sql',
      'create_research_activities_table.sql',
      'create_clubs_table.sql'
    ];

    // Run each migration
    for (const migrationFile of migrations) {
      console.log(`\n📄 Running migration: ${migrationFile}`);
      
      const migrationPath = join(__dirname, 'migrations', migrationFile);
      const sql = readFileSync(migrationPath, 'utf8');
      
      await connection.query(sql);
      console.log(`✅ Migration completed: ${migrationFile}`);
    }

    console.log('\n🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration error:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

runMigrations();

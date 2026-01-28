import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';
import { execSync } from 'child_process';

const seedAllFacilities = async () => {
  try {
    await db.authenticate();
    console.log('✅ Database connected\n');

    const seeders = [
      'seedGymContent.js',
      'seedSportsContent.js',
      'seedMedicalContent.js',
      'seedSecurityContent.js',
      'seedMessContent.js',
      'seedHostelContent.js',
      'seedInternetContent.js'
    ];

    console.log('🚀 Starting facility pages seeding...\n');

    for (const seeder of seeders) {
      try {
        console.log(`📝 Running ${seeder}...`);
        execSync(`node ${seeder}`, { stdio: 'inherit', cwd: process.cwd() });
      } catch (error) {
        console.error(`❌ Error running ${seeder}:`, error.message);
      }
    }

    // Verify all seeded content
    const gymCount = await ContentBlock.count({ where: { pageName: 'gym' } });
    const sportsCount = await ContentBlock.count({ where: { pageName: 'sports' } });
    const medicalCount = await ContentBlock.count({ where: { pageName: 'medical-centre' } });
    const securityCount = await ContentBlock.count({ where: { pageName: 'security' } });
    const messCount = await ContentBlock.count({ where: { pageName: 'student-mess' } });
    const hostelCount = await ContentBlock.count({ where: { pageName: 'hostel' } });
    const internetCount = await ContentBlock.count({ where: { pageName: 'internet' } });

    console.log('\n📊 Seeding Summary:');
    console.log('='.repeat(50));
    console.log(`Gym: ${gymCount} blocks`);
    console.log(`Sports: ${sportsCount} blocks`);
    console.log(`Medical Centre: ${medicalCount} blocks`);
    console.log(`Security: ${securityCount} blocks`);
    console.log(`Student Mess: ${messCount} blocks`);
    console.log(`Hostel: ${hostelCount} blocks`);
    console.log(`Internet: ${internetCount} blocks`);
    console.log('='.repeat(50));
    
    const total = gymCount + sportsCount + medicalCount + securityCount + messCount + hostelCount + internetCount;
    console.log(`\n✅ Total: ${total} content blocks seeded successfully!`);
    
    console.log('\n📝 All facility pages are now editable from:');
    console.log('   Admin Panel → Content Management → Content Blocks');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in master seeder:', error);
    process.exit(1);
  }
};

seedAllFacilities();

import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

const seeders = [
  { name: 'People', file: 'seedPeople.js' },
  { name: 'Research Activities', file: 'seedResearchActivities.js' },
  { name: 'Facilities', file: 'seedFacilities.js' }
];

const runAllSeeders = async () => {
  console.log('🌱 Starting database seeding...\n');

  for (const seeder of seeders) {
    try {
      console.log(`📦 Seeding ${seeder.name}...`);
      const { stdout, stderr } = await execPromise(`node ${seeder.file}`);
      
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      
    } catch (error) {
      console.error(`❌ Error seeding ${seeder.name}:`, error.message);
      // Continue with other seeders even if one fails
    }
  }

  console.log('\n✨ All seeders completed!');
};

runAllSeeders();

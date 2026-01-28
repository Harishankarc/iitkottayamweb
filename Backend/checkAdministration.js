import sequelize from './config/database.js';
import People from './models/People.js';

async function checkData() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected\n');
    
    const people = await People.findAll({ 
      where: { userType: 'administration' },
      raw: true
    });
    
    console.log(`📊 Found ${people.length} administration records:\n`);
    
    people.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name}`);
      console.log(`   Designation: ${p.designation}`);
      console.log(`   Specialization (Category): ${p.specialization}`);
      console.log(`   Email: ${p.email}`);
      console.log('');
    });
    
    await sequelize.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkData();

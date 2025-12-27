import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import User from './models/User.js';

async function createAdminUser() {
  try {
    // Connect to database
    await sequelize.authenticate();
    console.log('✅ Connected to database');

    // Check if admin exists
    const existingAdmin = await User.findOne({ 
      where: { email: 'admin@iiitkottayam.ac.in' } 
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log('Email:', existingAdmin.email);
      console.log('Role:', existingAdmin.role);
      process.exit(0);
    }

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@iiitkottayam.ac.in',
      password: 'Admin@123', // Will be auto-hashed by the model hook
      role: 'admin',
      isActive: true
    });

    console.log('✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Email:', admin.email);
    console.log('Password: Admin@123');
    console.log('Role:', admin.role);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\nYou can now login at: http://localhost:5173/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();

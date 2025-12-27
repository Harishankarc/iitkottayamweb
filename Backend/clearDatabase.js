import sequelize from './config/database.js';
import News from './models/News.js';
import Event from './models/Event.js';
import Faculty from './models/Faculty.js';
import Student from './models/Student.js';
import Placement from './models/Placement.js';
import Announcement from './models/Announcement.js';
import Gallery from './models/Gallery.js';
import Media from './models/Media.js';

const clearDatabase = async () => {
  try {
    console.log('🗑️  Clearing all tables...');
    
    // Clear all tables
    await News.destroy({ where: {}, truncate: true, cascade: true });
    await Event.destroy({ where: {}, truncate: true, cascade: true });
    await Faculty.destroy({ where: {}, truncate: true, cascade: true });
    await Student.destroy({ where: {}, truncate: true, cascade: true });
    await Placement.destroy({ where: {}, truncate: true, cascade: true });
    await Announcement.destroy({ where: {}, truncate: true, cascade: true });
    await Gallery.destroy({ where: {}, truncate: true, cascade: true });
    await Media.destroy({ where: {}, truncate: true, cascade: true });
    
    console.log('✅ All tables cleared successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();

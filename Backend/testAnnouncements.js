import Announcement from './models/Announcement.js';
import { Op } from 'sequelize';

async function testAnnouncements() {
  try {
    console.log('Testing announcements...\n');
    
    // Get all announcements
    const allAnnouncements = await Announcement.findAll();
    console.log(`Total announcements in DB: ${allAnnouncements.length}`);
    
    // Get active announcements
    const now = new Date();
    const activeAnnouncements = await Announcement.findAll({
      where: {
        isActive: true,
        startDate: { [Op.lte]: now },
        [Op.or]: [
          { endDate: null },
          { endDate: { [Op.gte]: now } }
        ]
      },
      order: [['priority', 'DESC'], ['startDate', 'DESC']]
    });
    
    console.log(`Active announcements: ${activeAnnouncements.length}\n`);
    
    if (activeAnnouncements.length > 0) {
      console.log('Active announcements:');
      activeAnnouncements.forEach((a, i) => {
        console.log(`${i + 1}. ${a.title}`);
        console.log(`   Message: ${a.message}`);
        console.log(`   Type: ${a.type}, Priority: ${a.priority}`);
        console.log(`   Active: ${a.isActive}`);
        console.log(`   Start: ${a.startDate}, End: ${a.endDate}\n`);
      });
    } else {
      console.log('No active announcements found!');
      console.log('\nAll announcements:');
      allAnnouncements.forEach((a, i) => {
        console.log(`${i + 1}. ${a.title} (Active: ${a.isActive})`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testAnnouncements();

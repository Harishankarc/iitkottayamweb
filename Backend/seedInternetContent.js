import db from './config/database.js';
import ContentBlock from './models/ContentBlock.js';

const seedInternetContent = async () => {
  try {
    await db.authenticate();
    console.log('Database connected for Internet & Computing seeding...');

    // Delete existing internet content
    await ContentBlock.destroy({ where: { pageName: 'internet' } });
    console.log('Cleared existing internet content blocks');

    const internetBlocks = [
      // Hero Section
      {
        blockId: 'hero-section',
        pageName: 'internet',
        blockType: 'hero',
        content: JSON.stringify({
          badge: 'Technology Infrastructure',
          title: 'Internet & Computing Facilities',
          description: 'State-of-the-art computing infrastructure with high-speed internet connectivity.'
        }),
        blockOrder: 1,
        isVisible: true
      },

      // About Section
      {
        blockId: 'about-internet',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'About Our Computing Facilities',
          text: 'IIIT Kottayam provides comprehensive computing infrastructure with multiple computer labs equipped with latest hardware and software. The campus has high-speed internet connectivity available 24/7 in all academic buildings, hostels, and common areas. Students have access to specialized labs for networking, cybersecurity, and high-performance computing.'
        }),
        blockOrder: 2,
        isVisible: true
      },

      // Lab 1 Details
      {
        blockId: 'lab1-details',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Computer Lab 1',
          text: '76 Computers\nHP 280 G4 MT Business PC, i5P 16GB (2x8GB) DDR4 2400 DIMM Memory, 1TB 7200RPM SATA 3.5in, HP 125 BLK Wired Keyboard, HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor, Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN, HP P24V G5 FHD Monitor'
        }),
        blockOrder: 3,
        isVisible: true
      },

      // Lab 2 Details
      {
        blockId: 'lab2-details',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Computer Lab 2',
          text: '84 Computers\nDell Vostro Desktop 3910, Intel 7th Generation Core i7-7700, 8th Cache, 3.60GHz, 8GB DDR4 2400MHz, 1TB HDD, Dell Wired Keyboard, Dell Wired Mouse, Dell 19in Round LED Monitor, Dell wireless, Qualcomm QCA9565 Bluetooth 4.0'
        }),
        blockOrder: 4,
        isVisible: true
      },

      // Lab 3 Details
      {
        blockId: 'lab3-details',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Computer Lab 3',
          text: '75 Computers\nHP Elitec Tower 600G3 SFF, 16GB (2x8GB) DDR4 4800 UDIMM Memory, 1TB 7200RPM SATA 3.5in, HP 125 BLK Wired Keyboard, HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor, Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN'
        }),
        blockOrder: 5,
        isVisible: true
      },

      // Cyber Security Lab
      {
        blockId: 'cyber-security-lab',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Cyber Security Lab',
          text: '75 Computers\nHP Elitec Tower 600G3 SFF, 16GB (2x8GB) DDR4 4800 UDIMM Memory, 1TB 7200RPM SATA 3.5in, HP 125 BLK Wired Keyboard, HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor, Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN'
        }),
        blockOrder: 6,
        isVisible: true
      },

      // Network Lab
      {
        blockId: 'network-lab',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Network Lab',
          text: '70 Computers\nHP Elitec Tower 600G3 SFF, 16GB (2x8GB) DDR4 4800 UDIMM Memory, 1TB 7200RPM SATA 3.5in, HP 125 BLK Wired Keyboard, HP Black 125 Wired Mouse, HP P24v G5 FHD Monitor, Realtek 8822BE Wi-Fi 6 Bluetooth 5.3 WW WLAN'
        }),
        blockOrder: 7,
        isVisible: true
      },

      // Server Room
      {
        blockId: 'server-room',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'Server Room',
          text: 'High-performance servers including:\n• HPE DL380 Gen11 80PT NC CTO Server with Xeon processors\n• HPE DL385 Gen10+ with AMD EPYC processors\n• 800W-1600W power supplies\n• Multiple storage configurations\n• Advanced networking capabilities'
        }),
        blockOrder: 8,
        isVisible: true
      },

      // HPC Lab
      {
        blockId: 'hpc-lab',
        pageName: 'internet',
        blockType: 'paragraph',
        content: JSON.stringify({
          title: 'High Performance Computing Lab',
          text: 'Advanced HPC infrastructure with HPE DL380 Gen11 servers, NVIDIA A100 40GB GPU modules, high-capacity memory configurations, and specialized networking equipment for research and computational intensive tasks.'
        }),
        blockOrder: 9,
        isVisible: true
      },

      // Internet Facilities
      {
        blockId: 'internet-facilities',
        pageName: 'internet',
        blockType: 'list',
        content: JSON.stringify({
          title: 'Facilities & Services',
          items: [
            'High-speed internet connectivity 24/7',
            'WiFi coverage across campus',
            'Multiple computer labs with 380+ systems',
            'Specialized Cyber Security Lab',
            'Network Lab with advanced equipment',
            'Server room with enterprise-grade servers',
            'HPC Lab with GPU computing',
            'Licensed software and development tools',
            'Cloud computing resources',
            'Technical support and maintenance'
          ]
        }),
        blockOrder: 10,
        isVisible: true
      },

      // Gallery placeholders
      ...Array.from({ length: 12 }, (_, i) => ({
        blockId: `internet-image-${i + 1}`,
        pageName: 'internet',
        blockType: 'image',
        content: JSON.stringify({
          url: `/images/facilities/internet${i + 1}.jpg`,
          alt: `IIIT Kottayam Computing Facility - View ${i + 1}`,
          caption: `Computing facility image ${i + 1}`
        }),
        blockOrder: 11 + i,
        isVisible: true
      }))
    ];

    await ContentBlock.bulkCreate(internetBlocks);
    console.log(`✅ Successfully seeded ${internetBlocks.length} internet content blocks`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding internet content:', error);
    process.exit(1);
  }
};

seedInternetContent();

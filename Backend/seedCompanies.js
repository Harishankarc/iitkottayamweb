import sequelize from './config/database.js';
import Company from './models/Company.js';

const demoCompanies = [
  {
    name: 'Google',
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    link: 'https://www.google.com',
    category: 'recruitment',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'Microsoft',
    logo: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    link: 'https://www.microsoft.com',
    category: 'recruitment',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    link: 'https://www.amazon.com',
    category: 'recruitment',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    link: 'https://www.ibm.com',
    category: 'recruitment',
    displayOrder: 4,
    isActive: true
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    link: 'https://www.apple.com',
    category: 'recruitment',
    displayOrder: 5,
    isActive: true
  },
  {
    name: 'Meta',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    link: 'https://www.meta.com',
    category: 'recruitment',
    displayOrder: 6,
    isActive: true
  },
  {
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
    link: 'https://www.intel.com',
    category: 'recruitment',
    displayOrder: 7,
    isActive: true
  },
  {
    name: 'Infosys',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
    link: 'https://www.infosys.com',
    category: 'recruitment',
    displayOrder: 8,
    isActive: true
  },
  {
    name: 'TCS',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg',
    link: 'https://www.tcs.com',
    category: 'recruitment',
    displayOrder: 9,
    isActive: true
  },
  {
    name: 'Wipro',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg',
    link: 'https://www.wipro.com',
    category: 'recruitment',
    displayOrder: 10,
    isActive: true
  },
  {
    name: 'Cognizant',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Cognizant_logo_2022.svg',
    link: 'https://www.cognizant.com',
    category: 'recruitment',
    displayOrder: 11,
    isActive: true
  },
  {
    name: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.svg',
    link: 'https://www.adobe.com',
    category: 'recruitment',
    displayOrder: 12,
    isActive: true
  }
];

async function seedCompanies() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await Company.sync({ force: true });
    console.log('✅ Company table created');

    await Company.bulkCreate(demoCompanies);
    console.log('✅ Seeded', demoCompanies.length, 'companies');

    console.log('\n📊 Demo companies added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding companies:', error);
    process.exit(1);
  }
}

seedCompanies();

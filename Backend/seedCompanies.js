import sequelize from './config/database.js';
import CompanyLogo from './models/CompanyLogo.js';

const demoCompanies = [
  {
    name: 'Amazon',
    logo: 'amazon.png',
    link: 'https://www.amazon.com',
    category: 'recruitment',
    displayOrder: 1,
    isActive: true
  },
  {
    name: 'IBM',
    logo: 'ibm.png',
    link: 'https://www.ibm.com',
    category: 'recruitment',
    displayOrder: 2,
    isActive: true
  },
  {
    name: 'Bosch',
    logo: 'https://companieslogo.com/img/orig/BOSCHLTD.NS_BIG.D-47813f15.png',
    link: 'https://www.bosch.in',
    category: 'recruitment',
    displayOrder: 3,
    isActive: true
  },
  {
    name: 'NVIDIA',
    logo: 'https://static.vecteezy.com/system/resources/previews/019/909/411/original/nvidia-transparent-nvidia-free-free-png.png',
    link: 'https://www.nvidia.com',
    category: 'recruitment',
    displayOrder: 4,
    isActive: true
  },
  {
    name: 'TCS',
    logo: 'https://companieslogo.com/img/orig/TCS.NS-7401f1bd.png',
    link: 'https://www.tcs.com',
    category: 'recruitment',
    displayOrder: 5,
    isActive: true
  },
  {
    name: 'Infosys',
    logo: 'https://companieslogo.com/img/orig/INFY-48b0705a.png',
    link: 'https://www.infosys.com',
    category: 'recruitment',
    displayOrder: 6,
    isActive: true
  },
  {
    name: 'Reliance Jio',
    logo: 'https://companieslogo.com/img/orig/JSWSTEEL.NS_BIG-5baad08f.png',
    link: 'https://www.jio.com',
    category: 'recruitment',
    displayOrder: 7,
    isActive: true
  },
  {
    name: 'Cognizant',
    logo: 'cognizant.jpg',
    link: 'https://www.cognizant.com',
    category: 'recruitment',
    displayOrder: 8,
    isActive: true
  },
  {
    name: 'Deloitte',
    logo: 'https://companieslogo.com/img/orig/DLT-7efba0be.png',
    link: 'https://www.deloitte.com',
    category: 'recruitment',
    displayOrder: 9,
    isActive: true
  },
  {
    name: 'HP',
    logo: 'https://companieslogo.com/img/orig/HPQ-1b88e5e4.png',
    link: 'https://www.hp.com',
    category: 'recruitment',
    displayOrder: 10,
    isActive: true
  },
  {
    name: 'Wipro',
    logo: 'https://companieslogo.com/img/orig/WIPRO.NS-8e6cb9fa.png',
    link: 'https://www.wipro.com',
    category: 'recruitment',
    displayOrder: 11,
    isActive: true
  },
  {
    name: 'Capgemini',
    logo: 'https://companieslogo.com/img/orig/CAP.PA-a1dcb2d8.png',
    link: 'https://www.capgemini.com',
    category: 'recruitment',
    displayOrder: 12,
    isActive: true
  },
  {
    name: 'SAP',
    logo: 'https://companieslogo.com/img/orig/SAP-41eec5bb.png',
    link: 'https://www.sap.com',
    category: 'recruitment',
    displayOrder: 13,
    isActive: true
  },
  {
    name: 'Microsoft',
    logo: 'microsoft.png',
    link: 'https://www.microsoft.com',
    category: 'recruitment',
    displayOrder: 14,
    isActive: true
  },
  {
    name: 'Google',
    logo: 'google.png',
    link: 'https://www.google.com',
    category: 'recruitment',
    displayOrder: 15,
    isActive: true
  },
  {
    name: 'Oracle',
    logo: 'oracle.png',
    link: 'https://www.oracle.com',
    category: 'recruitment',
    displayOrder: 16,
    isActive: true
  },
  {
    name: 'Accenture',
    logo: 'accenture.png',
    link: 'https://www.accenture.com',
    category: 'recruitment',
    displayOrder: 17,
    isActive: true
  },
  {
    name: 'Adobe',
    logo: 'https://companieslogo.com/img/orig/ADBE-96468e0e.png',
    link: 'https://www.adobe.com',
    category: 'recruitment',
    displayOrder: 18,
    isActive: true
  },
  {
    name: 'Intel',
    logo: 'https://companieslogo.com/img/orig/INTC-34aba2ec.png',
    link: 'https://www.intel.com',
    category: 'recruitment',
    displayOrder: 19,
    isActive: true
  },
  {
    name: 'Cisco',
    logo: 'https://companieslogo.com/img/orig/CSCO-098b969c.png',
    link: 'https://www.cisco.com',
    category: 'recruitment',
    displayOrder: 20,
    isActive: true
  },
  {
    name: 'Qualcomm',
    logo: 'https://companieslogo.com/img/orig/QCOM-29347b2b.png',
    link: 'https://www.qualcomm.com',
    category: 'recruitment',
    displayOrder: 21,
    isActive: true
  },
  {
    name: 'Samsung',
    logo: 'samsung.png',
    link: 'https://www.samsung.com',
    category: 'recruitment',
    displayOrder: 22,
    isActive: true
  },
  {
    name: 'LG',
    logo: 'lg.png',
    link: 'https://www.lg.com',
    category: 'recruitment',
    displayOrder: 23,
    isActive: true
  },
  {
    name: 'Flipkart',
    logo: 'flipkart.png',
    link: 'https://www.flipkart.com',
    category: 'recruitment',
    displayOrder: 24,
    isActive: true
  },
  {
    name: 'Paytm',
    logo: 'https://companieslogo.com/img/orig/PAYTM.NS-84d32b35.png',
    link: 'https://www.paytm.com',
    category: 'recruitment',
    displayOrder: 25,
    isActive: true
  },
  {
    name: 'Zoho',
    logo: 'https://companieslogo.com/img/orig/ZOHOLDINGS-e749a5fa.png',
    link: 'https://www.zoho.com',
    category: 'recruitment',
    displayOrder: 26,
    isActive: true
  },
  {
    name: 'Byjus',
    logo: 'https://companieslogo.com/img/orig/BYJU.NS_BIG-a4e78adb.png',
    link: 'https://www.byjus.com',
    category: 'recruitment',
    displayOrder: 27,
    isActive: true
  },
  {
    name: 'Uber',
    logo: 'uber.png',
    link: 'https://www.uber.com',
    category: 'recruitment',
    displayOrder: 28,
    isActive: true
  },
  {
    name: 'Ola',
    logo: 'https://companieslogo.com/img/orig/ANI-4c63a34b.png',
    link: 'https://www.olacabs.com',
    category: 'recruitment',
    displayOrder: 29,
    isActive: true
  },
  {
    name: 'Swiggy',
    logo: 'https://companieslogo.com/img/orig/SWIGGY-f0e32eaa.png',
    link: 'https://www.swiggy.com',
    category: 'recruitment',
    displayOrder: 30,
    isActive: true
  },
];

async function seedCompanies() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await CompanyLogo.sync({ force: true });
    console.log('✅ CompanyLogo table created');

    await CompanyLogo.bulkCreate(demoCompanies);
    console.log('✅ Seeded', demoCompanies.length, 'companies');

    console.log('\n📊 Demo companies added successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding companies:', error);
    process.exit(1);
  }
}

seedCompanies();

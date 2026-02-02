const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'iiitkottayam',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false
  }
);

async function createNavbarTable() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to database\n');

    // Create navbar_links table
    await sequelize.query(`
      CREATE TABLE IF NOT EXISTS navbar_links (
        id INT PRIMARY KEY AUTO_INCREMENT,
        label VARCHAR(100) NOT NULL,
        url VARCHAR(500) NOT NULL,
        displayOrder INT NOT NULL DEFAULT 0,
        isVisible BOOLEAN DEFAULT true,
        openInNewTab BOOLEAN DEFAULT false,
        showOnMobile BOOLEAN DEFAULT true,
        showOnTablet BOOLEAN DEFAULT true,
        showOnDesktop BOOLEAN DEFAULT true,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Created navbar_links table\n');

    // Insert default links
    const defaultLinks = [
      { label: 'HOME', url: '/', displayOrder: 1, showOnMobile: true, showOnTablet: true, showOnDesktop: true },
      { label: 'WEBMAIL', url: 'https://webmail.iiitkottayam.ac.in', displayOrder: 2, openInNewTab: true, showOnMobile: false, showOnTablet: true, showOnDesktop: true },
      { label: 'INTRANET', url: 'https://intranet.iiitkottayam.ac.in', displayOrder: 3, openInNewTab: true, showOnMobile: false, showOnTablet: true, showOnDesktop: true },
      { label: 'TELEPHONE DIRECTORY', url: '/telephone-directory', displayOrder: 4, showOnMobile: false, showOnTablet: false, showOnDesktop: true },
      { label: 'NIWAHIKA', url: '/niwahika', displayOrder: 5, showOnMobile: false, showOnTablet: false, showOnDesktop: true },
      { label: 'RTI', url: '/rti', displayOrder: 6, showOnMobile: false, showOnTablet: false, showOnDesktop: true },
      { label: 'IMS', url: 'https://ims.iiitkottayam.ac.in', displayOrder: 7, openInNewTab: true, showOnMobile: false, showOnTablet: false, showOnDesktop: true },
      { label: 'LOGIN', url: '/login', displayOrder: 8, showOnMobile: false, showOnTablet: false, showOnDesktop: true }
    ];

    for (const link of defaultLinks) {
      await sequelize.query(`
        INSERT INTO navbar_links (label, url, displayOrder, isVisible, openInNewTab, showOnMobile, showOnTablet, showOnDesktop)
        VALUES (?, ?, ?, true, ?, ?, ?, ?)
      `, {
        replacements: [link.label, link.url, link.displayOrder, link.openInNewTab || false, link.showOnMobile, link.showOnTablet, link.showOnDesktop]
      });
    }

    console.log(`✅ Inserted ${defaultLinks.length} default navbar links\n`);

    const [results] = await sequelize.query('SELECT * FROM navbar_links ORDER BY displayOrder');
    console.log('Current navbar links:');
    results.forEach(link => {
      console.log(`  ${link.displayOrder}. ${link.label} → ${link.url} (Visible: ${link.isVisible})`);
    });

    await sequelize.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createNavbarTable();

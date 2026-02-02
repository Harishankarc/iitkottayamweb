const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iiitkottayam',
  port: process.env.DB_PORT || 3306
};

async function createFooterLinksTable() {
  let connection;
  
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database');

    // Create footer_links table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS footer_links (
        id INT AUTO_INCREMENT PRIMARY KEY,
        section VARCHAR(50) NOT NULL COMMENT 'departments, reports, social, links, legal',
        column_index INT DEFAULT 0 COMMENT 'For multi-column layouts',
        label VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        icon VARCHAR(50) DEFAULT NULL COMMENT 'For social media icons',
        displayOrder INT DEFAULT 0,
        isVisible BOOLEAN DEFAULT true,
        openInNewTab BOOLEAN DEFAULT false,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_section (section),
        INDEX idx_order (displayOrder)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Created footer_links table');

    // Insert default departments
    const departments = [
      ['departments', 0, 'B.Tech in Computer Science and Engineering', '/academics/btech-cse', null, 0, 1, 0],
      ['departments', 0, 'B.Tech in Electronics and Communication Engineering', '/academics/btech-ece', null, 1, 1, 0],
      ['departments', 0, 'B.Tech in Artificial Intelligence and Data Science', '/academics/btech-aids', null, 2, 1, 0]
    ];

    // Insert default reports
    const reports = [
      ['reports', 0, 'Annual Report', '/reports/annual', null, 0, 1, 0],
      ['reports', 0, 'Financial Report', '/reports/financial', null, 1, 1, 0],
      ['reports', 0, 'NIRF Report', '/reports/nirf', null, 2, 1, 0],
      ['reports', 0, 'NBA Accreditation', '/reports/nba', null, 3, 1, 0],
      ['reports', 0, 'NAAC Status', '/reports/naac', null, 4, 1, 0]
    ];

    // Insert default social links
    const social = [
      ['social', 0, 'Twitter', 'https://twitter.com/iiitkottayam', 'Twitter', 0, 1, 1],
      ['social', 0, 'Facebook', 'https://facebook.com/iiitkottayam', 'Facebook', 1, 1, 1],
      ['social', 0, 'LinkedIn', 'https://linkedin.com/school/iiitkottayam', 'Linkedin', 2, 1, 1],
      ['social', 0, 'YouTube', 'https://youtube.com/@iiitkottayam', 'Youtube', 3, 1, 1]
    ];

    // Insert default main links (4 columns)
    const mainLinks = [
      // Column 1 - About
      ['links', 1, 'About Us', '/about', null, 0, 1, 0],
      ['links', 1, 'Administration', '/administration', null, 1, 1, 0],
      ['links', 1, 'Faculty', '/faculty', null, 2, 1, 0],
      ['links', 1, 'Campus Life', '/campus', null, 3, 1, 0],
      
      // Column 2 - Academics
      ['links', 2, 'Admissions', '/admissions', null, 4, 1, 0],
      ['links', 2, 'Academics', '/academics', null, 5, 1, 0],
      ['links', 2, 'Research', '/research', null, 6, 1, 0],
      ['links', 2, 'Library', '/library', null, 7, 1, 0],
      
      // Column 3 - Students
      ['links', 3, 'Placements', '/placements', null, 8, 1, 0],
      ['links', 3, 'Events', '/events', null, 9, 1, 0],
      ['links', 3, 'Clubs', '/clubs', null, 10, 1, 0],
      ['links', 3, 'Gallery', '/gallery', null, 11, 1, 0],
      
      // Column 4 - Contact
      ['links', 4, 'Contact Us', '/contact', null, 12, 1, 0],
      ['links', 4, 'Career', '/career', null, 13, 1, 0],
      ['links', 4, 'Alumni', '/alumni', null, 14, 1, 0],
      ['links', 4, 'RTI', '/rti', null, 15, 1, 0]
    ];

    // Insert default legal links
    const legal = [
      ['legal', 0, 'Privacy Policy', '/privacy-policy', null, 0, 1, 0],
      ['legal', 0, 'Terms & Conditions', '/terms', null, 1, 1, 0],
      ['legal', 0, 'Disclaimer', '/disclaimer', null, 2, 1, 0],
      ['legal', 0, 'Accessibility', '/accessibility', null, 3, 1, 0],
      ['legal', 0, 'Sitemap', '/sitemap', null, 4, 1, 0]
    ];

    // Combine all links
    const allLinks = [...departments, ...reports, ...social, ...mainLinks, ...legal];

    // Insert all links
    for (const link of allLinks) {
      await connection.query(
        `INSERT INTO footer_links (section, column_index, label, url, icon, displayOrder, isVisible, openInNewTab) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        link
      );
    }
    console.log(`✅ Inserted ${allLinks.length} default footer links`);

    // Display summary
    const [counts] = await connection.query(`
      SELECT section, COUNT(*) as count 
      FROM footer_links 
      GROUP BY section 
      ORDER BY section
    `);
    
    console.log('\n📊 Footer links by section:');
    counts.forEach(row => {
      console.log(`  ${row.section}: ${row.count} links`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

createFooterLinksTable();

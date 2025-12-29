-- ============================================
-- IIIT Kottayam Website - Additional Tables Migration
-- Run this after the main database_schema.sql
-- ============================================

USE iitkottayam;

-- ============================================
-- 14. FOOTER TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS footer (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section VARCHAR(50) NOT NULL COMMENT 'e.g., about, quickLinks, contact, social',
    title VARCHAR(255) NOT NULL,
    content TEXT COMMENT 'Can be JSON for structured data',
    links TEXT COMMENT 'JSON array of {label, url} objects',
    displayOrder INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_section (section),
    INDEX idx_active (isActive),
    INDEX idx_order (displayOrder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 15. NAVIGATION TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS navigation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    path VARCHAR(255),
    parentId INT COMMENT 'Parent menu item ID for nested menus',
    displayOrder INT DEFAULT 0,
    icon VARCHAR(50),
    isExternal BOOLEAN DEFAULT FALSE,
    isActive BOOLEAN DEFAULT TRUE,
    children TEXT COMMENT 'JSON array of child menu items',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_parent (parentId),
    INDEX idx_active (isActive),
    INDEX idx_order (displayOrder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 16. COMPANY LOGOS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS company_logos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    logo VARCHAR(255) NOT NULL,
    link VARCHAR(500),
    category ENUM('incubation', 'collaboration', 'placement', 'partner') DEFAULT 'partner',
    displayOrder INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    isFeatured BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (isActive),
    INDEX idx_featured (isFeatured),
    INDEX idx_order (displayOrder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 17. NIRF RANKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS nirf_rankings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    year INT NOT NULL,
    category VARCHAR(100) NOT NULL COMMENT 'e.g., Engineering, Overall, Architecture & Planning',
    rank INT NOT NULL,
    `change` ENUM('up', 'down', 'same') DEFAULT 'same',
    previousRank INT,
    score DECIMAL(5, 2),
    isPublished BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (year),
    INDEX idx_category (category),
    INDEX idx_published (isPublished)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 18. SITE SETTINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    settingKey VARCHAR(100) NOT NULL UNIQUE COMMENT 'e.g., site_logo, site_title, contact_email',
    settingValue TEXT,
    settingType ENUM('text', 'image', 'json', 'boolean', 'number') DEFAULT 'text',
    category VARCHAR(50) DEFAULT 'general' COMMENT 'e.g., general, contact, social, appearance',
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (settingKey),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT SAMPLE DATA
-- ============================================

-- Sample Footer Data
INSERT INTO footer (section, title, content, displayOrder, isActive) VALUES
('about', 'About IIIT Kottayam', 'Indian Institute of Information Technology Kottayam is an Institute of National Importance established by an Act of Parliament.', 1, TRUE),
('quickLinks', 'Quick Links', '', 2, TRUE),
('contact', 'Contact Us', 'IIIT Kottayam, Valavoor P.O., Pala, Kerala - 686635', 3, TRUE),
('social', 'Follow Us', '', 4, TRUE);

-- Sample Navigation Data
INSERT INTO navigation (label, path, displayOrder, isActive) VALUES
('Home', '/', 1, TRUE),
('Institute', '/institute', 2, TRUE),
('Academics', '/academics', 3, TRUE),
('People', '/people', 4, TRUE),
('Research', '/research', 5, TRUE),
('Placements', '/placement', 6, TRUE),
('Media', '/media', 7, TRUE);

-- Sample Company Logos
INSERT INTO company_logos (name, logo, link, category, displayOrder, isActive, isFeatured) VALUES
('Incubation Centre (AIC)', '/assets/images/aiclogo.png', 'https://icentre.iiitkottayam.ac.in/', 'incubation', 1, TRUE, TRUE),
('Gyaan Lab', '/assets/images/gyanlogo.png', 'https://gyaan.iiitkottayam.ac.in/', 'collaboration', 2, TRUE, TRUE),
('I2CS', '/assets/images/12cslogo.png', 'https://i2cs.iiitkottayam.ac.in/', 'collaboration', 3, TRUE, TRUE),
('MSME Business Incubation Centre', '/assets/images/msmelogo.jpg', 'https://msme.iiitkottayam.ac.in/', 'incubation', 4, TRUE, TRUE);

-- Sample NIRF Rankings
INSERT INTO nirf_rankings (year, category, rank, `change`, previousRank, isPublished) VALUES
(2025, 'Engineering', 25, 'up', 28, TRUE),
(2025, 'Architecture & Planning', 18, 'up', 22, TRUE),
(2025, 'Overall', 45, 'down', 42, TRUE);

-- Sample Site Settings
INSERT INTO site_settings (settingKey, settingValue, settingType, category, description) VALUES
('site_title', 'IIIT Kottayam - Indian Institute of Information Technology Kottayam', 'text', 'general', 'Main site title'),
('site_logo', '/assets/images/iiitlogo.jpg', 'image', 'appearance', 'Site logo image'),
('contact_email', 'admin@iiitkottayam.ac.in', 'text', 'contact', 'Main contact email'),
('contact_phone', '+91-4822-292100', 'text', 'contact', 'Main contact phone'),
('address', 'IIIT Kottayam, Valavoor P.O., Pala, Kerala - 686635', 'text', 'contact', 'Institute address'),
('facebook_url', 'https://facebook.com/iiitkottayam', 'text', 'social', 'Facebook page URL'),
('twitter_url', 'https://twitter.com/iiitkottayam', 'text', 'social', 'Twitter profile URL'),
('linkedin_url', 'https://linkedin.com/school/iiitkottayam', 'text', 'social', 'LinkedIn page URL');

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'Tables created successfully' AS status;
SHOW TABLES;

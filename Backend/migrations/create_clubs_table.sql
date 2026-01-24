-- ============================================
-- CLUBS TABLE
-- For managing all clubs and student organizations
-- ============================================

CREATE TABLE IF NOT EXISTS clubs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('technical', 'cultural', 'sports', 'innovation', 'ieee', 'acm', 'security', 'other') NOT NULL,
    description TEXT,
    mission TEXT,
    vision TEXT,
    logo VARCHAR(255),
    coverImage VARCHAR(255),
    facultyCoordinators TEXT COMMENT 'JSON array of coordinators',
    studentLeads TEXT COMMENT 'JSON array of student leads',
    activities TEXT COMMENT 'JSON array of activities',
    achievements TEXT COMMENT 'JSON array of achievements',
    gallery TEXT COMMENT 'JSON array of images',
    socialLinks TEXT COMMENT 'JSON object with social media links',
    contactEmail VARCHAR(255),
    contactPhone VARCHAR(20),
    isActive BOOLEAN DEFAULT TRUE,
    displayOrder INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_slug (slug),
    INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

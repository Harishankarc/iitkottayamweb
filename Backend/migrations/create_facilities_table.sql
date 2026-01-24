-- ============================================
-- FACILITIES TABLE
-- For managing all facilities (hostel, gym, sports, medical, etc.)
-- ============================================

CREATE TABLE IF NOT EXISTS facilities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    type ENUM('hostel', 'gym', 'sports', 'medical', 'mess', 'internet', 'security', 'library', 'other') NOT NULL,
    description TEXT,
    images TEXT COMMENT 'JSON array of images',
    contact TEXT COMMENT 'JSON: {email, phone, person, designation}',
    timings TEXT COMMENT 'JSON: {weekday, weekend, holidays}',
    amenities TEXT COMMENT 'JSON array of amenities',
    wardens TEXT COMMENT 'JSON array for hostel wardens',
    halls TEXT COMMENT 'JSON array for hostel halls',
    customFields TEXT COMMENT 'JSON for type-specific data',
    isActive BOOLEAN DEFAULT TRUE,
    displayOrder INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_slug (slug),
    INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

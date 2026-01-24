-- ============================================
-- RESEARCH ACTIVITIES TABLE
-- For managing invited talks, seminars, workshops, conferences
-- ============================================

CREATE TABLE IF NOT EXISTS research_activities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    activityType ENUM('invited-talk', 'seminar', 'workshop', 'conference', 'fdp', 'webinar', 'other') NOT NULL,
    serialNumber INT,
    faculty VARCHAR(255) NOT NULL,
    topic VARCHAR(500) NOT NULL,
    institution VARCHAR(500),
    activityDate DATE NOT NULL,
    description TEXT,
    venue VARCHAR(255),
    duration VARCHAR(100),
    participants INT,
    isPublished BOOLEAN DEFAULT TRUE,
    isFeatured BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (activityType),
    INDEX idx_date (activityDate),
    INDEX idx_faculty (faculty),
    INDEX idx_published (isPublished)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

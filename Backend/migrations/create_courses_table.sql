-- Create courses table for storing academic program information
CREATE TABLE IF NOT EXISTS courses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  code VARCHAR(50),
  level ENUM('B.Tech', 'M.Tech', 'Ph.D', 'Diploma', 'Certificate') NOT NULL,
  department VARCHAR(255),
  duration VARCHAR(100),
  description TEXT,
  eligibility TEXT,
  objectives JSON,
  curriculum JSON,
  feeStructure JSON,
  admissionProcess TEXT,
  careerProspects TEXT,
  isActive BOOLEAN DEFAULT true,
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_level (level),
  INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

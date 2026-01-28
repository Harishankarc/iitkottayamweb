-- Create FDP Programs table for Faculty Development Programmes/Workshops/Webinars
CREATE TABLE IF NOT EXISTS fdp_programs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slNo INT NOT NULL,
  topic VARCHAR(500) NOT NULL,
  programme VARCHAR(100) NOT NULL,
  coordinator TEXT NOT NULL,
  startDate DATE NOT NULL,
  endDate DATE,
  brochureUrl VARCHAR(500),
  isActive BOOLEAN DEFAULT 1,
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add indexes
CREATE INDEX idx_displayOrder ON fdp_programs(displayOrder);
CREATE INDEX idx_isActive ON fdp_programs(isActive);
CREATE INDEX idx_startDate ON fdp_programs(startDate DESC);

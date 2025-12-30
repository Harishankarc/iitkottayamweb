-- Create people table for all people types
CREATE TABLE IF NOT EXISTS `people` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `designation` VARCHAR(255) NOT NULL,
  `department` VARCHAR(255),
  `email` VARCHAR(255),
  `phone` VARCHAR(20),
  `photo` VARCHAR(500),
  `qualification` VARCHAR(500),
  `specialization` TEXT,
  `experience` VARCHAR(100),
  `userType` ENUM(
    'administration',
    'hod',
    'faculty',
    'technical-staff',
    'support-staff',
    'research-scholars',
    'btech-students',
    'mtech-students',
    'gender-index'
  ) NOT NULL,
  `isActive` TINYINT(1) DEFAULT 1,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_userType (`userType`),
  INDEX idx_isActive (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

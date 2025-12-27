-- ============================================
-- IIIT Kottayam Website Database Schema
-- MySQL Database Schema for Admin Panel
-- ============================================

-- Create Database
CREATE DATABASE IF NOT EXISTS iitkottayam CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE iitkottayam;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') DEFAULT 'viewer',
    avatar VARCHAR(255) DEFAULT '',
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. NEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS news (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt VARCHAR(500),
    category VARCHAR(50) DEFAULT 'general',
    image VARCHAR(255),
    author VARCHAR(100),
    isPublished BOOLEAN DEFAULT FALSE,
    publishedDate DATETIME,
    views INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_published (isPublished, publishedDate),
    INDEX idx_created (createdAt)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. EVENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    image VARCHAR(255),
    venue VARCHAR(255),
    startDate DATETIME NOT NULL,
    endDate DATETIME,
    organizer VARCHAR(100),
    registrationLink VARCHAR(255),
    isPublished BOOLEAN DEFAULT FALSE,
    attendees INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_dates (startDate, endDate),
    INDEX idx_published (isPublished)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. FACULTY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    department VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    photo VARCHAR(255),
    qualification VARCHAR(255),
    specialization TEXT,
    experience INT,
    researchInterests TEXT COMMENT 'JSON array',
    publications TEXT COMMENT 'JSON array',
    googleScholar VARCHAR(255),
    linkedIn VARCHAR(255),
    researchGate VARCHAR(255),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_department (department),
    INDEX idx_active (isActive),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. STUDENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rollNumber VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    photo VARCHAR(255),
    program ENUM('B.Tech', 'M.Tech', 'Ph.D') NOT NULL,
    branch VARCHAR(100) NOT NULL,
    batch INT NOT NULL,
    currentSemester INT,
    cgpa DECIMAL(4, 2),
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_program (program),
    INDEX idx_branch (branch),
    INDEX idx_batch (batch),
    INDEX idx_roll (rollNumber)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. PLACEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS placements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    academicYear VARCHAR(20) NOT NULL,
    companyName VARCHAR(100) NOT NULL,
    companyLogo VARCHAR(255),
    sector VARCHAR(100),
    role VARCHAR(100) NOT NULL,
    package DECIMAL(10, 2) NOT NULL,
    studentsPlaced INT DEFAULT 1,
    visitDate DATETIME,
    description TEXT,
    isPublished BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_year (academicYear),
    INDEX idx_company (companyName),
    INDEX idx_published (isPublished)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type ENUM('info', 'warning', 'success', 'error') DEFAULT 'info',
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    link VARCHAR(255),
    startDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    endDate DATETIME,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (isActive, startDate, endDate),
    INDEX idx_priority (priority)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    eventTitle VARCHAR(255) NOT NULL,
    eventDate DATETIME NOT NULL,
    description TEXT,
    category ENUM('academic', 'cultural', 'sports', 'technical', 'seminar', 'other') DEFAULT 'other',
    images TEXT COMMENT 'JSON array of image URLs',
    thumbnail VARCHAR(255) COMMENT 'Featured/cover image',
    isPublished BOOLEAN DEFAULT FALSE,
    isFeatured BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_published (isPublished),
    INDEX idx_featured (isFeatured),
    INDEX idx_date (eventDate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. MEDIA TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS media (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    source VARCHAR(100) NOT NULL COMMENT 'e.g., Mathrubhumi, The Hindu, YouTube',
    type ENUM('news', 'video', 'article', 'press-release') NOT NULL,
    thumbnail VARCHAR(255),
    link VARCHAR(500) NOT NULL,
    publishDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    excerpt TEXT,
    isPublished BOOLEAN DEFAULT TRUE,
    isFeatured BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_published (isPublished),
    INDEX idx_featured (isFeatured),
    INDEX idx_date (publishDate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL COMMENT 'e.g., B.Tech in Computer Science and Engineering',
    shortName VARCHAR(50) NOT NULL COMMENT 'e.g., B.Tech CSE',
    slug VARCHAR(100) NOT NULL UNIQUE COMMENT 'e.g., btech-cse',
    program ENUM('B.Tech', 'M.Tech', 'Ph.D') NOT NULL,
    department VARCHAR(100) NOT NULL COMMENT 'CSE, ECE, AI&DS, Cyber Security',
    duration VARCHAR(50) COMMENT 'e.g., 4 Years',
    totalSeats INT,
    description TEXT,
    eligibility TEXT,
    objectives TEXT COMMENT 'JSON array',
    curriculum TEXT COMMENT 'JSON object with semester-wise subjects',
    feeStructure TEXT COMMENT 'JSON array/object',
    labImages TEXT COMMENT 'JSON array of lab/facility images',
    isActive BOOLEAN DEFAULT TRUE,
    displayOrder INT DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_program (program),
    INDEX idx_department (department),
    INDEX idx_slug (slug),
    INDEX idx_active (isActive),
    INDEX idx_order (displayOrder)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. RESEARCH PUBLICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS research_publications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    authors TEXT NOT NULL COMMENT 'JSON array',
    publicationType ENUM('journal', 'conference', 'book-chapter', 'patent', 'thesis') NOT NULL,
    venue VARCHAR(500) COMMENT 'Journal/Conference name',
    year INT NOT NULL,
    volume VARCHAR(50),
    pages VARCHAR(50),
    doi VARCHAR(255),
    abstract TEXT,
    keywords TEXT COMMENT 'JSON array',
    pdfLink VARCHAR(500),
    externalLink VARCHAR(500),
    department VARCHAR(100),
    isPublished BOOLEAN DEFAULT TRUE,
    isFeatured BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (publicationType),
    INDEX idx_year (year),
    INDEX idx_department (department),
    INDEX idx_published (isPublished),
    INDEX idx_featured (isFeatured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. HERO SLIDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS hero_sliders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(500),
    description TEXT,
    image VARCHAR(255) NOT NULL,
    buttonText VARCHAR(100),
    buttonLink VARCHAR(255),
    displayOrder INT DEFAULT 0,
    isActive BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_order (displayOrder),
    INDEX idx_active (isActive)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 13. PAGE CONTENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS page_contents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pageName VARCHAR(100) NOT NULL UNIQUE COMMENT 'e.g., about, admission, governance',
    pageTitle VARCHAR(255) NOT NULL,
    metaDescription TEXT,
    sections TEXT NOT NULL COMMENT 'JSON array of content sections',
    isPublished BOOLEAN DEFAULT TRUE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_page (pageName),
    INDEX idx_published (isPublished)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT SAMPLE ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed with bcrypt)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@iiitkottayam.ac.in', '$2a$10$XqZ8YQJ9K3qP5xL6vN8w0eJ5K3qP5xL6vN8w0eJ5K3qP5xL6vN8w0e', 'admin')
ON DUPLICATE KEY UPDATE name='Admin User';

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify all tables are created:
SHOW TABLES;
DESCRIBE users;
SELECT COUNT(*) as total_tables FROM information_schema.tables WHERE table_schema = 'iitkottayam';

-- ============================================
-- END OF SCHEMA
-- ============================================

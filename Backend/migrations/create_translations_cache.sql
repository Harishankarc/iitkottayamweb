-- Create translations_cache table for storing translated content
CREATE TABLE IF NOT EXISTS `translations_cache` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `entityType` VARCHAR(50) NOT NULL COMMENT 'e.g., page_contents, content_blocks, news, announcements',
  `entityId` INT(11) NOT NULL COMMENT 'Foreign key to the source table',
  `lang` VARCHAR(10) NOT NULL COMMENT 'Language code: en, hi, ml',
  `sourceHash` CHAR(64) NOT NULL COMMENT 'SHA256 hash of source payload for cache invalidation',
  `translatedJson` LONGTEXT NOT NULL COMMENT 'Translated payload stored as JSON string',
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_cache` (`entityType`, `entityId`, `lang`, `sourceHash`),
  INDEX `idx_lookup` (`entityType`, `entityId`, `lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

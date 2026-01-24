-- ============================================
-- Clean up page_contents table
-- Remove duplicate content fields
-- ALL content now lives in content_blocks table
-- ============================================

USE iitkottayam;

-- Remove columns that duplicate content_blocks data
ALTER TABLE page_contents 
  DROP COLUMN IF EXISTS heroImage,
  DROP COLUMN IF EXISTS heroTitle,
  DROP COLUMN IF EXISTS heroSubtitle,
  DROP COLUMN IF EXISTS sections,
  DROP COLUMN IF EXISTS content,
  DROP COLUMN IF EXISTS sidebar;

-- Verify changes
DESCRIBE page_contents;

-- Show what remains (should be only metadata)
SELECT 
  'Remaining columns in page_contents:' as message,
  COLUMN_NAME,
  DATA_TYPE,
  COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'iitkottayam' 
  AND TABLE_NAME = 'page_contents'
ORDER BY ORDINAL_POSITION;

-- ============================================
-- Result: page_contents now contains ONLY:
-- - id, pageName, pageTitle, pageSlug
-- - category, metaDescription, metaKeywords
-- - customFields, layout, navigationGroup
-- - parentPage, pageOrder, isPublished, sortOrder
-- - createdAt, updatedAt
--
-- ALL actual content is in content_blocks table!
-- ============================================

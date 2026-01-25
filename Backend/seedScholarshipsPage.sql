-- Seed scholarship page content blocks

-- Delete existing blocks first to avoid duplicates
DELETE FROM content_blocks WHERE pageName = 'scholarships';

-- Hero Block
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'scholarships', 
  'scholarships-hero', 
  'hero', 
  'hero', 
  'Hero Section',
  '{\"badge\":\"Financial Support\",\"title\":\"Scholarship & Educational Loans\",\"subtitle\":\"Explore financial aid options, scholarships, and bank loan schemes available to students.\"}',
  0,
  1
);

-- Bank Loans
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'scholarships', 
  'scholarships-banks', 
  'loans', 
  'list', 
  'Bank Loan Schemes',
  '{\"title\":\"Bank Loan Schemes\",\"items\":[\"State Bank of India - Scholar Loan Scheme..Click here..|#\",\"Punjab National Bank - Click here..|#\",\"Indian Bank - Loan Scheme..Click here..|#\",\"Union Bank - Loan Scheme..Click here..|#\",\"Canara Bank - MoU between Canara Bank and Ministry of Education... Click here..|#\"]}',
  1,
  1
);

-- Other Resources
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'scholarships', 
  'scholarships-resources', 
  'resources', 
  'list', 
  'Other Resources',
  '{\"title\":\"Other Resources\",\"items\":[\"Ministry of Finance (Office Memorandum) - Education Loan for IIIT Students|#\",\"National Scholarship Portal... For Details..Click here..|#\"]}',
  2,
  1
);



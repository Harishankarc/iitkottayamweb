-- Add hero block for why-iiitk page
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'why-iiitk', 
  'why-hero', 
  'hero', 
  'hero', 
  'Hero Section',
  '{"title":"Why IIIT Kottayam","subtitle":"Pioneering excellence in Information Technology education and research","badge":"Established 2015 • Institution of National Importance"}',
  0,
  1
);

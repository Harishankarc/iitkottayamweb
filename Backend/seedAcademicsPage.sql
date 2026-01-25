-- Seed academics page content blocks

-- Hero Block
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-hero', 
  'hero', 
  'hero', 
  'Hero Section',
  '{"badge":"Education at IIITK","title":"Academics","subtitle":"Innovative and dynamic curriculum focused on industry and research."}',
  0,
  1
);

-- Introduction
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-intro', 
  'intro', 
  'paragraph', 
  'Introduction',
  '{"text":"The classes for the first batch of B.Tech in Computer Science & Engineering commenced in August 2015. Senior faculty members from other Institutions of National Importance like, IITs, IISERs, NITs etc. are mentoring the vibrant faculty team of IIIT Kottayam. Only people with a Ph.D degree from reputed National Institutions and having a flare for teaching and research are engaged by IIIT Kottayam as faculty. PhD programme started in the year 2019 & M.Tech for working professionals in 2020.\n\nIIIT Kottayam follows an innovative and dynamic curriculum at par with other Institutions of National Importance with focus on the demands of industry and research. Most of the core courses are covered in the first half while the second half of the program largely comprises of need based courses focusing on the demands of the industry as well as thrust on research."}',
  1,
  1
);

-- UG Programme Links
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-ug', 
  'ug', 
  'list', 
  'UG Programme',
  '{"title":"UG Programme","items":["ODD 2025-26 - ACADEMIC CALENDAR FOR B.TECH (ADM 2024, 2023 & 2022) (Sem III,V,VII)|#","ODD 2025-26 - ACADEMIC CALENDAR FOR B.TECH (ADM 2025) (Sem I)|#","B.Tech ECE Curriculum|#","B.Tech CSE Curriculum|#","B.Tech CY Curriculum|#","B.Tech AI and Data Science Curriculum|#","UG Regulations for 2021 Batch Onwards|#"]}',
  2,
  1
);

-- PG Programme Links
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-pg', 
  'pg', 
  'list', 
  'PG Programme',
  '{"title":"PG Programme","items":["e-M.Tech Programme|#","M.Tech Programmes for Working Professionals|#"]}',
  3,
  1
);

-- PhD Programme Links
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-phd', 
  'phd', 
  'list', 
  'PhD Programme',
  '{"items":["PhD Regulations|#"]}',
  4,
  1
);

-- Request Links
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'academics', 
  'academics-requests', 
  'requests', 
  'list', 
  'Academic Requests',
  '{"title":"Request for Academic Transcript/Educational Verification","items":["Request for Academic Transcript|#","Educational Verification|#"]}',
  5,
  1
);

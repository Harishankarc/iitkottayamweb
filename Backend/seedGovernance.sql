-- Seed governance page content blocks

-- Hero Block
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'governance', 
  'governance-hero', 
  'hero', 
  'hero', 
  'Hero Section',
  '{"badge":"Structure & Reports","title":"Governance","subtitle":"Explore the foundational acts, statutes, and annual reports of the institute."}',
  0,
  1
);

-- Core Documents List
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'governance', 
  'governance-documents', 
  'documents', 
  'list', 
  'Core Documents',
  '{"title":"Core Documents","items":["⚖️ IIIT PPP Act (2017)","📖 IIIT Bill","📄 IIITK Statutes"]}',
  1,
  1
);

-- Annual Reports List
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'governance', 
  'governance-reports', 
  'reports', 
  'list', 
  'Annual Reports',
  '{"icon":"🗄️","title":"Annual Reports","badge":"Institute Archives","items":["Annual Report 2015-16","Annual Report 2016-17","Annual Report 2017-18","Annual Report 2018-19","Annual Report 2019-20","Annual Report 2020-21","Annual Report 2021-22","Annual Report 2022-23"]}',
  2,
  1
);

-- Fix governance document icons
UPDATE content_blocks 
SET content = JSON_REPLACE(
  content,
  '$.items[0]', '⚖️ IIIT PPP Act (2017)',
  '$.items[1]', '📖 IIIT Bill',
  '$.items[2]', '📄 IIITK Statutes'
)
WHERE blockId = 'governance-documents';

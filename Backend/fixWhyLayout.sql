-- Update the About Our Institute block to include the tags inside
UPDATE content_blocks 
SET content = JSON_SET(
  JSON_SET(
    content,
    '$.text',
    'The Indian Institute of Information Technology (IIIT) Kottayam is an "Institution of National Importance" established in 2015. It operates under a Public-Private Partnership (PPP) model and is located at Valavoor, Pala, in the Kottayam district of Kerala.\n\nThe institute is situated on a 53-acre campus and focuses on education, research, and development in the field of Information Technology. It also has an Atal Incubation Centre (AIC) to support startups and innovation.'
  ),
  '$.tags',
  JSON_ARRAY('🤝 PPP Model', '🌳 53 Acre Campus', '🚀 AIC Certified', '🏆 National Importance')
)
WHERE blockId = 'why-about-intro';

-- Hide the separate Key Highlights list block
UPDATE content_blocks 
SET isVisible = 0 
WHERE blockId = 'why-highlights';

-- Seed admission page content blocks

-- Delete existing blocks first to avoid duplicates
DELETE FROM content_blocks WHERE pageName = 'admission';

-- Hero Block
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-hero', 
  'hero', 
  'hero', 
  'Hero Section',
  '{\"badge\":\"Join IIIT Kottayam\",\"title\":\"Admissions\",\"subtitle\":\"Explore our Undergraduate, Postgraduate, and Doctoral programmes.\"}',
  0,
  1
);

-- Introduction
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-intro', 
  'intro', 
  'paragraph', 
  'Introduction',
  '{\"text\":\"IIIT Kottayam offers world-class education with cutting-edge programs in technology and research. Our admission process is designed to identify talented students who are passionate about innovation and academic excellence.\"}',
  1,
  1
);

-- UG Programmes
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-ug', 
  'ug', 
  'paragraph', 
  'Under Graduate Programmes',
  '{\"icon\":\"🎓\",\"title\":\"Under Graduate Programmes\",\"text\":\"UG Admission 2025 (New!)\\n\\nB.Tech/B.Tech-MS Programmes:\\n• Computer Science and Engineering (CSE)\\n• Electronics and Communication Engineering (ECE)\\n• Computer Science with specialisation in Cyber Security\\n• Computer Science with specialisation in AI & Data Science\\n\\nAdmission to the B.Tech/B.Tech-MS programme will be based on performance in the Joint Entrance Examination (JEE - Main) conducted by National Testing Agency (NTA) (subject to change if any ordered by Ministry of Education, Govt. of India) through the counselling under JoSAA/CSAB.\\n\\nThe number of seats in each branch of the B.Tech/B.Tech-MS programme for which admission is to be made will be decided by its Academic Advisory Committee/Senate. Seats are reserved for candidates belonging to the Scheduled Castes, Scheduled Tribes, Other Backward Classes, EWS Category and Physically challenged candidates as per the guidelines set by the Government of India.\",\"tags\":[\"Click here for details|#\"]}',
  2,
  1
);

-- Fee Structure - Initial Semester
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-initial-fees', 
  'fees', 
  'table', 
  'Initial First Semester Payment',
  '{\"title\":\"Fee Structure for the B.Tech program (Admission 2025)\",\"subtitle\":\"Initial First Semester Payment (Admission 2025)\",\"headers\":[\"Fee Component\",\"Amount\"],\"rows\":[[\"Tuition Fee\",\"1,45,200/-\"],[\"Hostel/Facility Maintenance Fee\",\"34,000/-\"],[\"Mess Advance\",\"30,750/-\"],[\"Medical Insurance\",\"1300/-\"],[\"Mess Equipment Maintenance\",\"300/-\"],[\"Sports Equipment Maintenance\",\"300/-\"],[\"Club Activities\",\"300/-\"],[\"Caution Deposit (One-time fee)\",\"13,000/-\"],[\"Sports (One-time fee)\",\"1100/-\"],[\"Mess (One-time fee)\",\"1100/-\"]]}',
  3,
  1
);

-- Fee Structure - DASA
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-dasa-fees', 
  'fees', 
  'table', 
  'DASA Fee Structure',
  '{\"title\":\"The Fee Structure for B.Tech program - DASA Admission 2025\",\"headers\":[\"Details\",\"First Semester\",\"Second Semester\",\"Third Semester\",\"Fourth Semester\",\"Fifth Semester\",\"Sixth Semester\",\"Seventh Semester\",\"Eighth Semester\"],\"rows\":[[\"Tuition Fee\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\",\"1,45,200/-\"],[\"Hostel/Facility maintenance fee\",\"34,000/-\",\"34,000/-\",\"37,500/-\",\"37,500/-\",\"41,250/-\",\"41,250/-\",\"45,500/-\",\"45,500/-\"],[\"Mess Advance\",\"30,750/-\",\"30,750/-\",\"33,825/-\",\"33,825/-\",\"37,250/-\",\"37,250/-\",\"40,975/-\",\"40,975/-\"],[\"Medical Insurance\",\"1300/-\",\"-\",\"1300/-\",\"-\",\"1300/-\",\"-\",\"1300/-\",\"-\"],[\"Mess Equipment Maintenance Fee\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\"],[\"Sports Equipment Maintenance Fee\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\"],[\"Club Activities\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\",\"300/-\",\"-\"],[\"Caution Deposit (One Time Fee)\",\"13,000/-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\"],[\"Convocation Fee (One-Time Fee)\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"5000/-\",\"-\"],[\"Sports (One time Fee)\",\"1100/-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\"],[\"Mess (One time Fee)\",\"1100/-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\",\"-\"]],\"notes\":[\"(b) Non SAARC & SAARC : As per DASA fee structure -> DASA Admission-2025|#\",\"Mode of reporting at the institute: Offline\",\"Date of commencement of classes: Will be finalized according to the JoSAA/CSAB schedule and will be declared later.\"]}',
  4,
  1
);

-- PG Programmes
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-pg', 
  'pg', 
  'paragraph', 
  'Post Graduate Programmes',
  '{\"icon\":\"📚\",\"title\":\"Post Graduate Programmes\",\"text\":\"(i). AI, ML and Data Science\\n(ii). Cyber Security and Digital Forensics\",\"tags\":[\"e-M.Tech Admission - Click here to view details|#\"]}',
  5,
  1
);

-- PhD Programmes
INSERT INTO content_blocks (pageName, blockId, sectionName, blockType, blockLabel, content, blockOrder, isVisible) 
VALUES (
  'admission', 
  'admission-phd', 
  'phd', 
  'paragraph', 
  'Doctoral Programmes',
  '{\"icon\":\"🔬\",\"title\":\"Doctoral Programmes\",\"text\":\"(i). Computer Science and Engineering(CSE)\\n(ii). Electronics and Communication Engineering(ECE)\\n(iii). Mathematics\",\"tags\":[\"PhD Admission - Click here view details|#\"]}',
  6,
  1
);




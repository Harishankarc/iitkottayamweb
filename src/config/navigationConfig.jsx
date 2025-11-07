export const navigationConfig = [
  {
    id: 'home',
    label: 'Home',
    hasDropdown: false,
    link: '/'
  },
  {
    id: 'why-iiitk',
    label: 'Why IIITK',
    hasDropdown: false,
    link: '/why-iiitk'
  },
  {
    id: 'nirf',
    label: 'NIRF',
    hasDropdown: true,
    submenu: [
      { id: 'nirf-2025', label: '2025', link: '/nirf/2025' }
    ]
  },
  {
    id: 'institute',
    label: 'Institute',
    hasDropdown: true,
    submenu: [
      { id: 'governance', label: 'Governance', link: '/institute/governance' },
      { id: 'admission', label: 'Admission', link: '/institute/admission' },
      { id: 'academics', label: 'Academics', link: '/institute/academics' },
      { id: 'scholarship', label: 'Scholarship/Educational Loans', link: '/institute/scholarship' }
    ]
  },
  {
    id: 'course',
    label: 'Course',
    hasDropdown: true,
    submenu: [
      { id: 'btech-cse', label: 'B.Tech CSE', link: '/course/btech-cse' },
      { id: 'btech-ece', label: 'B.Tech ECE', link: '/course/btech-ece' },
      { id: 'btech-cybersecurity', label: 'B.Tech Cybersecurity', link: '/course/btech-cybersecurity' },
      { id: 'btech-ai-ds', label: 'B.Tech AI and Data Science', link: '/course/btech-ai-ds' },
      { id: 'imtech', label: 'iM.Tech (After 12th)', link: 'https://emtech.iiitkottayam.ac.in/' },
      { id: 'e-mtech', label: 'e-M.Tech', link: 'https://mtech.iiitkottayam.ac.in/' },
      { id: 'mtech', label: 'M.Tech (After B.Tech/MCA/M.Sc)', link: 'https://imtech.iiitkottayam.ac.in/' },
      { id: 'phd', label: 'Ph.D', link: 'https://phd.iiitkottayam.ac.in/' }
    ]
  },
  {
    id: 'people',
    label: 'People',
    hasDropdown: true,
    submenu: [
      { id: 'administration', label: 'Administration', link: '/people/administration' },
      { id: 'hod', label: 'Head of Department', link: '/people/hod' },
      { id: 'faculty', label: 'Faculty', link: '/people/faculty' },
      { id: 'technical', label: 'Technical', link: '/people/technical' },
      { id: 'support-staff', label: 'Professional Support Staff', link: '/people/support-staff' },
      { id: 'research-scholars', label: 'Research Scholars', link: '/people/research-scholars' },
      { id: 'btech-students', label: 'B.Tech Students', link: '/people/btech-students' },
      { id: 'mtech-students', label: 'M.Tech Students', link: '/people/mtech-students' },
      { id: 'gender-index', label: 'Gender Index', link: '/people/gender-index' }
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    hasDropdown: true,
    submenu: [
      { id: 'hostel', label: 'Hostel', link: '/facilities/hostel' },
      { id: 'security', label: 'Security', link: '/facilities/security' },
      { id: 'campus-network', label: 'IIIT Kottayam Campus Network', link: '/facilities/campus-network' },
      { id: 'gymnasium', label: 'Gymnasium', link: '/facilities/gymnasium' },
      { id: 'sports', label: 'Sports', link: '/facilities/sports' },
      { id: 'library', label: 'Library', link: '/facilities/library' },
      { id: 'bank-atm', label: 'Bank/ATM', link: '/facilities/bank-atm' },
      { id: 'medical-centre', label: 'Medical Centre', link: '/facilities/medical-centre' },
      { id: 'student-mess', label: 'Student Co-operative Mess', link: '/facilities/student-mess' }
    ]
  },
  {
    id: 'iic-clubs',
    label: 'IIC & Clubs',
    hasDropdown: true,
    submenu: [
      { id: 'innovation-cell', label: 'Innovation Cell', link: '/iic-clubs/innovation-cell' },
      { id: 'fdp-webinars', label: 'IIIT Kottayam FDP & Webinars', link: '/iic-clubs/fdp-webinars' },
      { id: 'gallery', label: 'Gallery', link: '/iic-clubs/gallery' },
      { id: 'cultural-club', label: 'Cultural Club', link: '/iic-clubs/cultural-club' },
      { id: 'technical-club', label: 'Technical Club', link: '/iic-clubs/technical-club' },
      { id: 'sports-club', label: 'Sports Club', link: '/iic-clubs/sports-club' },
      { id: 'trendles-club', label: 'Trendles Club', link: '/iic-clubs/trendles-club' },
      { id: 'cyber-security-club', label: 'Cyber Security Club', link: '/iic-clubs/cyber-security-club' },
      { id: 'mind-quest', label: 'Mind Quest', link: '/iic-clubs/mind-quest' },
      { id: 'magazine', label: 'Magazine', link: '/iic-clubs/magazine' },
      { id: 'ieee-student-branch', label: 'IEEE Student Branch', link: '/iic-clubs/ieee-student-branch' },
      { id: 'acm-student-chapter', label: 'ACM Student Chapter', link: '/iic-clubs/acm-student-chapter' }
    ]
  },
  {
    id: 'research',
    label: 'Research',
    hasDropdown: true,
    submenu: [
      { id: 'faculty-research-papers', label: 'Faculty Research Papers', link: '/research/faculty-research-papers' },
      { id: 'research-groups', label: 'Research Groups', link: '/research/research-groups' },
      { id: 'ug-student-research', label: 'UG Student Research Papers', link: '/research/ug-student-research' },
      { id: 'research-funding', label: 'Research Project Fundings', link: '/research/research-funding' },
      { id: 'awards-recognition', label: 'Awards & Recognition', link: '/research/awards-recognition' },
      { id: 'international-collab', label: 'International Collaborations', link: '/research/international-collab' },
      { id: 'research-activities', label: 'Research Activities', link: '/research/research-activities' },
      { id: 'innovations-startups', label: 'Innovations & Startups', link: '/research/innovations-startups' }
    ]
  },
  {
    id: 'placement',
    label: 'Placement',
    hasDropdown: false,
    link: '/placement'
  },
  {
    id: 'recruters-corner',
    label: 'Recruiters Corner',
    hasDropdown: false,
    link: '/recruters_corner'
  },
  {
    id: 'media',
    label: '@Media',
    hasDropdown: false,
    link: '/media'
  },


];

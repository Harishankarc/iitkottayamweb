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
  // {
  //   id: 'nirf',
  //   label: 'NIRF',
  //   hasDropdown: true,
  //   submenu: [
  //     { id: 'nirf-2025', label: '2025', link: '/nirf/2025' }
  //   ]
  // },
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
      { id: 'library', label: 'Library', link: 'https://opac.iiitkottayam.ac.in/' },
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
      { id: 'magazine', label: 'Magazine', link: 'https://iiitkottayam.ac.in/#!/magazine' },
      { id: 'ieee-student-branch', label: 'IEEE Student Branch', link: '/iic-clubs/ieee-student-branch' },
      { id: 'acm-student-chapter', label: 'ACM Student Chapter', link: '/iic-clubs/acm' }
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
      { id: 'innovations-startups', label: 'Innovations & Startups', link: 'https://icentre.iiitkottayam.ac.in/' }
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
    link: 'https://iiitkottayam.ac.in/data/pdf/recruiterscorner.pdf'
  },
  {
    id: 'media',
    label: '@Media',
    hasDropdown: false,
    link: '/media'
  },
  

];

// Footer Links Configuration
export const footerLinks = {
  col1: [
    { id: 'lms', name: 'LMS', path: '/lms' },
    { id: 'idy-2022', name: 'IDY-2022', path: '/idy-2022' },
    { id: 'placement', name: 'Placement', path: '/placement' },
    { id: 'sitemap', name: 'Site Map', path: '/sitemap' },
    { id: 'events', name: 'Events', path: '/events' },
    { id: 'gallery', name: 'Gallery', path: 'https://drive.google.com/drive/folders/1DY5DYKzb2yzneYGRcmefoTStB0E9JfUu?usp=sharing' }
  ],
  col2: [
    { id: 'matlab', name: 'Matlab Portal', path: 'https://www.mathworks.com/academia/tah-portal/indian-institute-of-information-technology-kottayam-31453279.html' },
    { id: 'tenders', name: 'Tenders', path: '/tenders' },
    { id: 'career', name: 'Career', path: '/career' },
    { id: 'acm', name: 'ACM', path: '/iic-clubs/acm' },
    { id: 'contact', name: 'Contact', path: '/contact' },
    { id: 'email', name: 'Institute Email', path: 'https://myaccount.google.com/' }
  ],
  col3: [
    { id: 'pay-fees', name: 'Pay Your Fees', path: 'https://onlinesbi.sbi.bank.in/sbicollect/icollecthome.htm' },
    { id: 'gymnasium', name: 'Gymnasium', path: '/facilities/gymnasium' },
    { id: 'ieee', name: 'IEEE', path: '/iic-clubs/ieee-student-branch' },
    { id: 'hostel', name: 'Hostel', path: '/facilities/hostel' },
    { id: 'internet', name: 'Internet', path: '/facilities/campus-network' },
    { id: 'sports-yoga', name: 'Sports & Yoga', path: '/facilities/sports' }
  ],
  col4: [
    { id: 'rti', name: 'RTI', path: '/rti' },
    { id: 'scholarships', name: 'Scholarships', path: '/institute/scholarship' },
    { id: 'icc', name: 'ICC', path: '/icc' },
    { id: 'grievance', name: 'Grievance', path: 'https://iiitkottayam.ac.in/data/pdf/Grievance%20Redressal%20Committee.pdf' },
    { id: 'anti-ragging', name: 'Anti-Ragging', path: '/anti-ragging' },
    { id: 'reach-us', name: 'Reach Us', path: '/contact' }
  ]
};

export const footerReports = [
  { id: 'annual-reports', name: 'Annual Reports', path: '/reports/annual' },
  { id: 'accounts', name: 'Accounts', path: '/reports/accounts' },
  { id: 'budget', name: 'Budget', path: '/reports/budget' },
  { id: 'act-statutes', name: 'Act & Statutes', path: '/institute/governance' },
  { id: 'quality-policy', name: 'Quality Policy', path: '/quality-policy' },
  { id: 'iso', name: 'ISO 9001:2015', path: '/iso-certification' }
];

export const footerLegal = [
  { id: 'accessibility', name: 'Accessibility', path: '/accessibility' },
  { id: 'privacy', name: 'Privacy Policy', path: '/privacy-policy' },
  { id: 'terms', name: 'Terms of Use', path: '/terms-of-use' },
  { id: 'sitemap', name: 'Sitemap', path: '/sitemap' }
];

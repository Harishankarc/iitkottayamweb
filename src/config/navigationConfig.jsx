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
      {
        id: 'governance',
        label: 'Governance',
        link: '/institute/governance',
      },
      { id: 'admission', label: 'Admission', link: '/institute/admission' },
      {
        id: 'academics',
        label: 'Academics',
        link: '/institute/academics',

      },
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
      { id: 'imtech', label: 'iM.Tech (After 12th)', link: '/course/imtech' },
      { id: 'e-mtech', label: 'e-M.Tech', link: '/course/e-mtech' },
      { id: 'mtech', label: 'M.Tech (After B.Tech/MCA/M.Sc)', link: '/course/mtech' },
      { id: 'phd', label: 'Ph.D', link: '/course/phd' }
    ]
  }
];
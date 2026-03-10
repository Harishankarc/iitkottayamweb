const fs = require('fs');
const path = require('path');

// Translation hook to add to each file
const TRANSLATION_HOOK = `const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') return;
      try {
        const response = await API.post('/api/translate-bulk', {
          texts: ['No content available. Please add content blocks from the admin panel.', 'Loading...', 'Failed to load', 'Retry', 'No results found'],
          targetLang: language
        });
        if (response.success && response.data?.data?.translations) {
          const translationMap = {};
          response.data.data.translations.forEach((item) => {
            translationMap[item.originalText] = item.translatedText;
          });
          setTranslations(translationMap);
        }
      } catch (error) {
        console.error('Translation error:', error);
      }
    };
    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  return { t, language };
};

`;

// Files that use direct API fetch (need language refetch)
const filesWithAPIFetch = [
  'src/screens/people/faculty.jsx',
  'src/screens/people/administration.jsx',
  'src/screens/people/hod.jsx',
  'src/screens/people/btechStudents.jsx',
  'src/screens/people/mtechStudents.jsx',
  'src/screens/people/researchScholars.jsx',
  'src/screens/people/technical.jsx',
  'src/screens/people/ProfessionalSupportStaff.jsx',
  'src/screens/people/genderIndex.jsx',
  'src/screens/facilities/gym.jsx',
  'src/screens/facilities/hostel.jsx',
  'src/screens/facilities/atm.jsx',
  'src/screens/facilities/internet.jsx',
  'src/screens/facilities/sports.jsx',
  'src/screens/facilities/medicalCentre.jsx',
  'src/screens/facilities/security.jsx',
  'src/screens/facilities/studentMess.jsx',
  'src/screens/placement/placement.jsx',
  'src/screens/media/media.jsx',
  'src/screens/IIC&Clubs/innovationCell.jsx',
  'src/screens/IIC&Clubs/culturalClub.jsx',
  'src/screens/IIC&Clubs/sportsClub.jsx',
  'src/screens/IIC&Clubs/technicalClub.jsx',
  'src/screens/IIC&Clubs/acm.jsx',
  'src/screens/IIC&Clubs/IeeeStudentBranch.jsx',
  'src/screens/IIC&Clubs/mindQuest.jsx',
  'src/screens/IIC&Clubs/trendlesClub.jsx',
  'src/screens/IIC&Clubs/securityClub.jsx',
  'src/screens/IIC&Clubs/fdp.jsx',
  'src/screens/IIC&Clubs/fdpWebinar.jsx',
  'src/screens/IIC&Clubs/gallery.jsx',
  'src/screens/research/researchActivities.jsx',
  'src/screens/research/researchGroup.jsx',
  'src/screens/research/researchFunding.jsx',
  'src/screens/research/internationalCollab.jsx',
  'src/screens/research/ugResearchStudents.jsx',
  'src/screens/research/awardRecognition.jsx',
  'src/screens/footer/events.jsx',
  'src/screens/footer/antiRagging.jsx',
  'src/screens/footer/icc.jsx',
  'src/screens/footer/idy-2022.jsx',
  'src/screens/footer/tenders.jsx',
  'src/screens/footer/rti.jsx',
  'src/screens/footer/lmsLinks.jsx',
  'src/screens/footer/siteMap.jsx'
];

// Files with hardcoded data (only need translation hook for UI text)
const filesWithStaticData = [
  'src/screens/nirf/nirf.jsx',
  'src/screens/footer/contact.jsx',
  'src/screens/research/facultyResearchPaper.jsx'
];

function addTranslationToFile(filePath) {
  try {
    const fullPath = path.join(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`❌ File not found: ${filePath}`);
      return false;
    }

    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Check if already has translation
    if (content.includes('useTranslation()') || content.includes('const { t, language }')) {
      console.log(`⏭️  Already translated: ${filePath}`);
      return false;
    }

    // 1. Update imports
    if (!content.includes('useState') || !content.includes('useEffect')) {
      content = content.replace(
        /import React(.*?)from 'react';/,
        "import React, { useState, useEffect } from 'react';"
      );
    }

    // 2. Add translation hook after imports
    const lastImportIndex = content.lastIndexOf('import ');
    const nextLineAfterImport = content.indexOf('\n', lastImportIndex) + 1;
    content = content.slice(0, nextLineAfterImport) + '\n' + TRANSLATION_HOOK + content.slice(nextLineAfterImport);

    // 3. Add const { t, language } = useTranslation(); after const { darkMode } = useTheme();
    content = content.replace(
      /(const { darkMode.*?} = useTheme\(\);)/,
      '$1\n  const { t, language } = useTranslation();'
    );

    // 4. Add language to useEffect dependencies if the file has API fetch
    if (filesWithAPIFetch.includes(filePath)) {
      // Find useEffect and add language to dependency array
      content = content.replace(
        /useEffect\(\(\) => {[\s\S]*?}, \[\]\);/,
        (match) => match.replace('}, []);', '}, [language]);')
      );
    }

    // Write back
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`✅ Translated: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

console.log('🚀 Starting translation application...\n');

let successCount = 0;
let skipCount = 0;
let errorCount = 0;

const allFiles = [...filesWithAPIFetch, ...filesWithStaticData];

allFiles.forEach(file => {
  const result = addTranslationToFile(file);
  if (result === true) successCount++;
  else if (result === false) skipCount++;
  else errorCount++;
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Successfully translated: ${successCount}`);
console.log(`   ⏭️  Skipped (already done): ${skipCount}`);
console.log(`   ❌ Errors: ${errorCount}`);
console.log(`   📁 Total files processed: ${allFiles.length}`);

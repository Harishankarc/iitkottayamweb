import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENS_DIR = path.join(__dirname, 'src', 'screens');

// List of files with local translation hooks (from grep results)
const files = [
  'institute/ScholarshipLoans.jsx',
  'home/homepage.jsx',
  'whyiiit/whyIIIT.jsx',
  'institute/governance.jsx',
  'institute/admission.jsx',
  'institute/academics.jsx',
  'people/faculty.jsx',
  'research/internationalCollab.jsx',
  'research/researchActivities.jsx',
  'research/researchFunding.jsx',
  'research/researchGroup.jsx',
  'research/ugResearchStudents.jsx',
  'people/technical.jsx',
  'people/researchScholars.jsx',
  'people/ProfessionalSupportStaff.jsx',
  'people/mtechStudents.jsx',
  'people/hod.jsx',
  'people/genderIndex.jsx',
  'people/btechStudents.jsx',
  'people/administration.jsx',
  'research/facultyResearchPaper.jsx',
  'research/awardRecognition.jsx',
  'IIC&Clubs/fdp.jsx',
  'facilities/security.jsx',
  'facilities/studentMess.jsx',
  'IIC&Clubs/innovationCell.jsx',
  'facilities/sports.jsx',
  'facilities/medicalCentre.jsx',
  'IIC&Clubs/gallery.jsx',
  'facilities/internet.jsx',
  'IIC&Clubs/fdpWebinar.jsx',
  'facilities/hostel.jsx',
  'IIC&Clubs/culturalClub.jsx',
  'facilities/gym.jsx',
  'facilities/atm.jsx',
  'course/btechEce.jsx',
  'course/btechCyberSecurity.jsx',
  'course/btechCse.jsx',
  'course/btechCse(AI&DS).jsx'
];

function getRelativeImportPath(filePath) {
  const depth = filePath.split(/[\\/]/).length - 1;
  return '../'.repeat(depth) + '../hooks/useTranslation.jsx';
}

function replaceLocalTranslationHook(filePath) {
  const fullPath = path.join(SCREENS_DIR, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Check if already has import from hooks
  if (content.includes("from '../../hooks/useTranslation.jsx'") || 
      content.includes("from '../../../hooks/useTranslation.jsx'")) {
    return { success: false, reason: 'Already has centralized import' };
  }
  
  // Remove the local useTranslation hook definition
  // Pattern: const useTranslation = () => { ... }; (including the entire function)
  const hookPattern = /const useTranslation = \(\) => \{[\s\S]*?\n\};\n*/;
  
  if (!hookPattern.test(content)) {
    return { success: false, reason: 'No local hook found' };
  }
  
  content = content.replace(hookPattern, '');
  
  // Find where to add the import (after the last import statement)
  const importRegex = /import\s+.*\s+from\s+['"].*['"]\s*;?/g;
  const imports = content.match(importRegex);
  
  if (!imports || imports.length === 0) {
    return { success: false, reason: 'No imports found' };
  }
  
  const lastImportIndex = content.lastIndexOf(imports[imports.length - 1]);
  const lastImportEnd = lastImportIndex + imports[imports.length - 1].length;
  
  // Add the centralized import
  const importPath = getRelativeImportPath(filePath);
  const translationImport = `\nimport useTranslation from '${importPath}';`;
  
  content = content.slice(0, lastImportEnd) + translationImport + content.slice(lastImportEnd);
  
  // Write back
  fs.writeFileSync(fullPath, content, 'utf8');
  
  return { success: true };
}

console.log('\n' + '='.repeat(70));
console.log('🔄 REPLACING LOCAL TRANSLATION HOOKS WITH CENTRALIZED HOOK');
console.log('='.repeat(70) + '\n');

console.log(`Processing ${files.length} files...\n`);

const results = {
  success: [],
  failed: []
};

files.forEach((file, index) => {
  const displayFile = file.replace(/\\/g, '/');
  process.stdout.write(`\r[${index + 1}/${files.length}] ${displayFile.padEnd(50)}`)
  
  const result = replaceLocalTranslationHook(file);
  
  if (result.success) {
    results.success.push(file);
  } else {
    results.failed.push({ file, reason: result.reason });
  }
});

console.log('\n\n' + '='.repeat(70));
console.log('📊 REPLACEMENT RESULTS');
console.log('='.repeat(70));
console.log(`✅ Successfully updated: ${results.success.length} files`);
console.log(`❌ Skipped/Failed: ${results.failed.length} files\n`);

if (results.success.length > 0) {
  console.log('✅ Updated files:');
  results.success.forEach((file) => {
    console.log(`  - ${file}`);
  });
  console.log('');
}

if (results.failed.length > 0) {
  console.log('❌ Skipped files:');
  results.failed.forEach(({ file, reason }) => {
    console.log(`  - ${file}: ${reason}`);
  });
}

console.log('\n' + '='.repeat(70));
console.log('🎉 All pages now use the centralized translation hook!');
console.log('💡 This saves API quota by using static translations for UI labels.');
console.log('='.repeat(70) + '\n');

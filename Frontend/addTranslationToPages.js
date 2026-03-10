import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENS_DIR = path.join(__dirname, 'src', 'screens');

// Pages to exclude (admin panel and backup files)
const EXCLUDE_PATTERNS = [
  /admin\//,
  /_old\.jsx$/,
  /_backup\.jsx$/
];

function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => pattern.test(filePath));
}

function hasTranslationImport(content) {
  return /import.*useTranslation.*from.*hooks\/useTranslation/.test(content);
}

function hasTranslationUsage(content) {
  return /const\s+{\s*t\s*,\s*language\s*}\s*=\s*useTranslation\(\)/.test(content);
}

function getAllJsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllJsxFiles(filePath, fileList);
    } else if (file.endsWith('.jsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

function analyzePages() {
  const allPages = getAllJsxFiles(SCREENS_DIR);
  const results = {
    total: 0,
    hasTranslation: [],
    needsTranslation: [],
    excluded: []
  };
  
  allPages.forEach(filePath => {
    const relativePath = path.relative(SCREENS_DIR, filePath);
    
    if (shouldExclude(relativePath)) {
      results.excluded.push(relativePath);
      return;
    }
    
    results.total++;
    const content = fs.readFileSync(filePath, 'utf8');
    
    if (hasTranslationImport(content) && hasTranslationUsage(content)) {
      results.hasTranslation.push(relativePath);
    } else {
      results.needsTranslation.push(relativePath);
    }
  });
  
  return results;
}

// Run analysis
console.log('\n' + '='.repeat(70));
console.log('📊 TRANSLATION SUPPORT ANALYSIS');
console.log('='.repeat(70) + '\n');

const results = analyzePages();

console.log(`Total pages analyzed: ${results.total}`);
console.log(`✅ Pages with translation: ${results.hasTranslation.length}`);
console.log(`❌ Pages needing translation: ${results.needsTranslation.length}`);
console.log(`⏭️  Pages excluded (admin/backup): ${results.excluded.length}\n`);

if (results.needsTranslation.length > 0) {
  console.log('📝 Pages that need translation support:');
  console.log('─'.repeat(70));
  results.needsTranslation.forEach((page, index) => {
    console.log(`${index + 1}. ${page}`);
  });
}

console.log('\n' + '='.repeat(70) + '\n');

// Export results for processing
fs.writeFileSync(
  path.join(__dirname, 'translation-analysis.json'),
  JSON.stringify(results, null, 2)
);

console.log('💾 Results saved to translation-analysis.json\n');

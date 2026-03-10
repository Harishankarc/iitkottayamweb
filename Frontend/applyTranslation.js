import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SCREENS_DIR = path.join(__dirname, 'src', 'screens');

// Read the analysis results
const analysis = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'translation-analysis.json'), 'utf8')
);

function getRelativeImportPath(filePath) {
  const depth = filePath.split(path.sep).length - 1;
  return '../'.repeat(depth) + '../hooks/useTranslation.jsx';
}

function addTranslationToFile(filePath) {
  const fullPath = path.join(SCREENS_DIR, filePath);
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Skip if already has translation
  if (content.includes('useTranslation')) {
    return { success: false, reason: 'Already has translation' };
  }
  
  // Skip admin pages
  if (filePath.includes('admin')) {
    return { success: false, reason: 'Admin page - skipped' };
  }
  
  const importPath = getRelativeImportPath(filePath);
  
  // Find the last import statement
  const importRegex = /import\s+.*\s+from\s+['"].*['"]\s*;?/g;
  const imports = content.match(importRegex);
  
  if (!imports || imports.length === 0) {
    return { success: false, reason: 'No imports found' };
  }
  
  const lastImportIndex = content.lastIndexOf(imports[imports.length - 1]);
  const lastImportEnd = lastImportIndex + imports[imports.length - 1].length;
  
  // Add the import
  const translationImport = `\nimport useTranslation from '${importPath}';`;
  content = content.slice(0, lastImportEnd) + translationImport + content.slice(lastImportEnd);
  
  // Find the component function
  const componentRegex = /(?:const|function)\s+\w+\s*=\s*\([^)]*\)\s*=>\s*\{|(?:const|function)\s+\w+\s*\([^)]*\)\s*\{/;
  const componentMatch = content.match(componentRegex);
  
  if (!componentMatch) {
    return { success: false, reason: 'Could not find component function' };
  }
  
  const componentStart = content.indexOf(componentMatch[0]);
  const componentBodyStart = componentStart + componentMatch[0].length;
  
  // Add the hook usage
  const hookUsage = `\n  const { t, language } = useTranslation();\n`;
  content = content.slice(0, componentBodyStart) + hookUsage + content.slice(componentBodyStart);
  
  // Write back
  fs.writeFileSync(fullPath, content, 'utf8');
  
  return { success: true };
}

console.log('\n' + '='.repeat(70));
console.log('🔧 ADDING TRANSLATION SUPPORT TO PAGES');
console.log('='.repeat(70) + '\n');

const pagesToUpdate = analysis.needsTranslation.filter(page => !page.includes('admin'));

console.log(`Processing ${pagesToUpdate.length} pages...\n`);

const results = {
  success: [],
  failed: []
};

pagesToUpdate.forEach((page, index) => {
  process.stdout.write(`\r[${index + 1}/${pagesToUpdate.length}] ${page}...`);
  
  const result = addTranslationToFile(page);
  
  if (result.success) {
    results.success.push(page);
  } else {
    results.failed.push({ page, reason: result.reason });
  }
});

console.log('\n\n' + '='.repeat(70));
console.log('📊 RESULTS');
console.log('='.repeat(70));
console.log(`✅ Successfully updated: ${results.success.length} pages`);
console.log(`❌ Failed: ${results.failed.length} pages\n`);

if (results.failed.length > 0) {
  console.log('Failed pages:');
  results.failed.forEach(({ page, reason }) => {
    console.log(`  - ${page}: ${reason}`);
  });
}

console.log('\n' + '='.repeat(70) + '\n');

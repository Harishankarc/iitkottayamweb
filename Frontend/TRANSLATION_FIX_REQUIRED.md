# 🔍 Translation Status & Fix Guide

## ❌ Problem Identified

Translation hooks were added to all files, but **static UI text is not wrapped with `t()` function**.

### What's Working vs Not Working

#### ✅ **Working (8 files)**
- Institute: governance.jsx, admission.jsx, academics.jsx,  ScholarshipLoans.jsx
- Courses: btechCse.jsx, btechEce.jsx, btechCyberSecurity.jsx, btechCse(AI&DS).jsx
- **Why**: These use `usePageContent` and properly wrap text with `t()`

#### ⚠️ **Partially Working (50+ files)**  
- People, Research, Facilities, Clubs, Footer pages
- **Status**: Hook added ✅, Language refetch added ✅, Text NOT wrapped ❌
- **Backend translation**: Works (database content auto-translates)
- **Frontend translation**: NOT working (static UI text not wrapped)

---

## 🔧 How to Fix Each Page

### Pattern 1: Pages with `usePageContent` (Easiest)

These pages fetch content blocks from backend. Backend auto-translates content.

**What needs wrapping:**
- Loading messages
- Error messages  
- "No content available" messages

**Example:**
```jsx
// ❌ Before
<p>Loading...</p>
<p>No content available</p>

// ✅ After
<p>{t('Loading...')}</p>
<p>{t('No content available')}</p>
```

### Pattern 2: Pages with Custom API Fetch (More Work)

Pages like faculty.jsx, placement.jsx, media.jsx that fetch specific data.

**What needs wrapping:**
- All button labels
- All form labels
- All static headings
- All error/success messages
- All placeholder text

**Example:**
```jsx
// ❌ Before
<button>Search</button>
<p>No results found</p>
<input placeholder="Enter name..." />

// ✅ After
<button>{t('Search')}</button>
<p>{t('No results found')}</p>
<input placeholder={t('Enter name...')} />
```

### Pattern 3: Pages with Hardcoded Data

Pages like nirf.jsx, contact.jsx with hardcoded content.

**What needs wrapping:**
- Every single piece of text visible to users
- Section headings
- Descriptions
- Labels

**Example:**
```jsx
// ❌ Before
<h1>Contact Us</h1>
<p>General Enquiry</p>

// ✅ After
<h1>{t('Contact Us')}</h1>
<p>{t('General Enquiry')}</p>
```

---

## 📁  File-by-File Status

### Facilities (8 files) - Mostly Dynamic Content
| File | DB Content | UI Text | Priority |
|------|-----------|---------|----------|
| gym.jsx | ✅ Auto | ❌ Need t() | High |
| hostel.jsx | ✅ Auto | ❌ Need t() | High |
| atm.jsx | ✅ Auto | ❌ Need t() | Medium |
| internet.jsx | ✅ Auto | ❌ Need t() | Medium |
| sports.jsx | ✅ Auto | ❌ Need t() | Medium |
| medicalCentre.jsx | ✅ Auto | ❌ Need t() | Medium |
| security.jsx | ✅ Auto | ❌ Need t() | Medium |
| studentMess.jsx | ✅ Auto | ❌ Need t() | Medium |

**Strings to wrap:** "Loading...", "Content not available", "Retry", "Type", "Warden", etc.

### People (9 files) - Heavy UI Text
| File | DB Content | UI Text | Priority |
|------|-----------|---------|----------|
| faculty.jsx | ✅ Auto | ❌ Need t() | **CRITICAL** |
| administration.jsx | ✅ Auto | ❌ Need t() | High |
| hod.jsx | ✅ Auto | ❌ Need t() | High |
| btechStudents.jsx | ✅ Auto | ❌ Need t() | Medium |
| mtechStudents.jsx | ✅ Auto | ❌ Need t() | Medium |
| researchScholars.jsx | ✅ Auto | ❌ Need t() | Medium |
| technical.jsx | ✅ Auto | ❌ Need t() | Low |
| ProfessionalSupportStaff.jsx | ✅ Auto | ❌ Need t() | Low |
| genderIndex.jsx | ✅ Auto | ❌ Need t() | Medium |

**Strings to wrap:** "Search faculty...", "All", "No results found", "Clear Filters", "Loading faculty data...", "Qualification", "Specialization", "Research Focus", "Academic Profiles", "Google Scholar", "LinkedIn", "ResearchGate", etc.

**faculty.jsx needs ~30+ strings wrapped**

### Research (7 files) - Mostly Dynamic
| File | DB Content | UI Text | Priority |
|------|-----------|---------|----------|
| facultyResearchPaper.jsx | ⚠️ Hardcoded | ❌ Need t() | High |
| researchActivities.jsx | ✅ Auto | ❌ Need t() | Medium |
| researchGroup.jsx | ✅ Auto | ❌ Need t() | Medium |
| researchFunding.jsx | ✅ Auto | ❌ Need t() | Medium |
| internationalCollab.jsx | ✅ Auto | ❌ Need t() | Medium |
| ugResearchStudents.jsx | ✅ Auto | ❌ Need t() | Low |
| awardRecognition.jsx | ✅ Auto | ❌ Need t() | Medium |

**facultyResearchPaper.jsx is hardcoded data - needs major work**

### Clubs & IIC (12 files) - Mixed
| File | DB Content | UI Text | Priority |
|------|-----------|---------|----------|
| innovationCell.jsx | ✅ Auto | ❌ Need t() | High |
| culturalClub.jsx | ✅ Auto | ❌ Need t() | Medium |
| sportsClub.jsx | ✅ Auto | ❌ Need t() | Medium |
| technicalClub.jsx | ✅ Auto | ❌ Need t() | Medium |
| acm.jsx | ✅ Auto | ❌ Need t() | Medium |
| IeeeStudentBranch.jsx | ✅ Auto | ❌ Need t() | Medium |
| mindQuest.jsx | ✅ Auto | ❌ Need t() | Medium |
| trendlesClub.jsx | ✅ Auto | ❌ Need t() | Medium |
| securityClub.jsx | ✅ Auto | ❌ Need t() | Low |
| fdp.jsx | ✅ Auto | ❌ Need t() | Medium |
| fdpWebinar.jsx | ✅ Auto | ❌ Need t() | Medium |
| gallery.jsx | ✅ Auto | ❌ Need t() | High |

### Footer & Other (12 files) - Mixed
| File | DB Content | UI Text | Priority |
|------|-----------|---------|----------|
| contact.jsx | ⚠️ Hardcoded | ❌ Need t() | **CRITICAL** |
| placement.jsx | ✅ Auto | ❌ Need t() | **CRITICAL** |
| media.jsx | ✅ Auto | ❌ Need t() | High |
| nirf.jsx | ⚠️ Hardcoded | ❌ Need t() | High |
| events.jsx | ✅ Auto | ❌ Need t() | Medium |
| antiRagging.jsx | ✅ Auto | ❌ Need t() | Low |
| icc.jsx | ✅ Auto | ❌ Need t() | Low |
| idy-2022.jsx | ✅ Auto | ❌ Need t() | Low |
| tenders.jsx | ✅ Auto | ❌ Need t() | Low |
| rti.jsx | ✅ Auto | ❌ Need t() | Low |
| lmsLinks.jsx | ✅ Auto | ❌ Need t() | Low |
| siteMap.jsx | ✅ Auto | ❌ Need t() | Low |

---

## 🎯 Priority Tasks

### CRITICAL (Do First)
1. **contact.jsx** - Hardcoded labels ("General Enquiry", "Contact Us", etc.)
2. **faculty.jsx** - Heavy UI text (~30+ strings)
3. **placement.jsx** - Important public page

### HIGH (Do Next)
4. **nirf.jsx** - Hardcoded data  
5. **facultyResearchPaper.jsx** - Hardcoded researcher data
6. **administration.jsx** - People page
7. **hod.jsx** - Key personnel page
8. **innovationCell.jsx** - High traffic
9. **gallery.jsx** - Image descriptions need translation

### MEDIUM (Do After High)
- All remaining facilities pages
- All remaining clubs pages
- All remaining research pages
- All remaining people pages

### LOW (Do Last)
- Footer pages (lower traffic)
- Archive/legacy pages

---

## 🚀 Quick Fix Script

Create this file: `fix-translation-text.js`

```javascript
const fs = require('fs');
const path = require('path');

// Common UI strings to wrap
const commonStrings = [
  'Loading...', 'No content available', 'Failed to load', 'Retry',
  'No results found', 'Search', 'All', 'Clear Filters',
  'Contact Us', 'General Enquiry', 'Type', 'Warden',
  'Loading faculty data...', 'Qualification', 'Specialization',
  'Academic Profiles', 'Google Scholar', 'LinkedIn', 'ResearchGate'
];

function wrapString(content, str) {
  // Wrap string with t() if not already wrapped
  const regex = new RegExp(`(['"\`])${str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`, 'g');
  return content.replace(regex, (match) => {
    if (match.includes('t(')) return match; // Already wrapped
    return match.replace(str, `{t('${str}')}`);
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  commonStrings.forEach(str => {
    content = wrapString(content, str);
  });
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Processed: ${filePath}`);
}

// Process all facility files
const facilityDir = path.join(__dirname, 'src/screens/facilities');
fs.readdirSync(facilityDir).forEach(file => {
  if (file.endsWith('.jsx')) {
    processFile(path.join(facilityDir, file));
  }
});
```

---

## 📝 Manual Fix Checklist

For each file:

1. **Find all JSX text content**
   - Look for `>text<` patterns
   - Look for `placeholder="text"` 
   - Look for hardcoded strings

2. **Wrap with t()**
   ```jsx
   // Before
   <p>Loading...</p>
   
   // After  
   <p>{t('Loading...')}</p>
   ```

3. **Add to translation texts array** (if using inline hook)
   ```jsx
   texts: ['Loading...', 'No results found', 'Retry']
   ```

4. **Test**
   - Switch language to Hindi/Malayalam
   - Verify text translates
   - Check browser console for errors

---

## 💡 Why This Happened

The subagent that applied translations:
- ✅ Added translation hooks correctly
- ✅ Added language to useEffect dependencies  
- ✅ Imported useTranslation
- ❌ **Did NOT wrap static text with t()**

This is the missing piece that needs to be completed.

---

## 📊 Estimated Work

- **Per file**: 10-30 minutes (depending on complexity)
- **Total**: ~20-40 hours for all 50 files
- **With script**: ~10-15 hours

---

## ✅ Success Criteria

Page is fully translated when:
1. Backend data translates (already working for most)
2. All UI text wrapped with t()
3. Language toggle triggers re-fetch
4. No hardcoded English text visible in Hindi/Malayalam mode

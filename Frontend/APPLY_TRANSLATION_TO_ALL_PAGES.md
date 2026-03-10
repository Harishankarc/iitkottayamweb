# Apply Translation to All Pages - Step-by-Step Guide

## Overview

This guide explains how to add **backend-side translation** to every page in the IIIT Kottayam website. 

**Important**: Translation is done on the backend, not frontend. Dynamic content from the database is automatically translated by the backend. Frontend only translates static UI text.

## Quick Start

### For Pages Already Using `usePageContent` Hook

If a page already fetches content using `usePageContent()`, you only need to:

1. Add translation hook
2. Add language dependency
3. Pass `t` function to renderContentBlock
4. Wrap static UI text with `t()`

**Template**: See [TRANSLATION_TEMPLATE.jsx](./TRANSLATION_TEMPLATE.jsx)

## Pages That Need Translation

### ✅ Already Translated (3 pages)
- [x] `home/homepage.jsx` - Fully translated
- [x] `whyiiit/whyIIIT.jsx` - Fully translated  
- [x] `institute/ScholarshipLoans.jsx` - Just completed

### 🔄 Need Translation (60+ pages)

#### Institute Pages (3 pages)
- [ ] `institute/governance.jsx`
- [ ] `institute/admission.jsx`
- [ ] `institute/academics.jsx`

#### Course Pages (4 pages)
- [ ] `course/btechCse.jsx`
- [ ] `course/btechEce.jsx`
- [ ] `course/btechCyberSecurity.jsx`
- [ ] `course/btechCse(AI&DS).jsx`

#### People Pages (10 pages)
- [ ] `people/faculty.jsx`
- [ ] `people/administration.jsx`
- [ ] `people/hod.jsx`
- [ ] `people/btechStudents.jsx`
- [ ] `people/mtechStudents.jsx`
- [ ] `people/researchScholars.jsx`
- [ ] `people/technical.jsx`
- [ ] `people/ProfessionalSupportStaff.jsx`
- [ ] `people/genderIndex.jsx`

#### Research Pages (7 pages)
- [ ] `research/researchActivities.jsx`
- [ ] `research/researchGroup.jsx`
- [ ] `research/researchFunding.jsx`
- [ ] `research/facultyResearchPaper.jsx`
- [ ] `research/ugResearchStudents.jsx`
- [ ] `research/awardRecognition.jsx`
- [ ] `research/internationalCollab.jsx`

#### IIC & Clubs Pages (14 pages)
- [ ] `IIC&Clubs/innovationCell.jsx`
- [ ] `IIC&Clubs/acm.jsx`
- [ ] `IIC&Clubs/IeeeStudentBranch.jsx`
- [ ] `IIC&Clubs/technicalClub.jsx`
- [ ] `IIC&Clubs/culturalClub.jsx`
- [ ] `IIC&Clubs/sportsClub.jsx`
- [ ] `IIC&Clubs/mindQuest.jsx`
- [ ] `IIC&Clubs/securityClub.jsx`
- [ ] `IIC&Clubs/trendlesClub.jsx`
- [ ] `IIC&Clubs/fdp.jsx`
- [ ] `IIC&Clubs/fdpWebinar.jsx`
- [ ] `IIC&Clubs/gallery.jsx`

#### Footer Pages (4 pages)
- [ ] `footer/contact.jsx`
- [ ] `footer/events.jsx`
- [ ] `footer/antiRagging.jsx`
- [ ] `footer/icc.jsx`

#### Other Pages (6 pages)
- [ ] `placement/placement.jsx`
- [ ] `media/media.jsx`
- [ ] `nirf/nirf.jsx`
- [ ] `facilities/*` (various facility pages)

## Step-by-Step Process for Each Page

### Step 1: Add Translation Hook

Add this at the top of your component (after imports):

```jsx
import React, { useState, useEffect } from 'react';

const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';

  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') return;
      
      try {
        const response = await API.post('/api/translate-bulk', {
          texts: [
            // Add all static UI text here
            'No content available. Please add content blocks from the admin panel.',
            'Loading...',
            // Add other hardcoded strings
          ],
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
        setTranslations({});
      }
    };
    fetchTranslations();
  }, [language]);

  const t = (text) => translations[text] || text;
  return { t, language };
};
```

### Step 2: Update Component

```jsx
export default function YourPage() {
  const { darkMode } = useTheme();
  const { t, language } = useTranslation(); // ADD THIS
  
  // If using dynamic content:
  const { blocks: contentBlocks, loading, refetch } = usePageContent('page-name');
  
  // ADD THIS: Re-fetch when language changes
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  
  // ... rest of component
}
```

### Step 3: Wrap Static Text

**Before:**
```jsx
<h1>Welcome to IIIT Kottayam</h1>
<p>This is static text</p>
<button>Click Me</button>
```

**After:**
```jsx
<h1>{t('Welcome to IIIT Kottayam')}</h1>
<p>{t('This is static text')}</p>
<button>{t('Click Me')}</button>
```

### Step 4: Pass `t` to renderContentBlock

**Before:**
```jsx
{renderContentBlock(block, { darkMode, color1, color2 })}
```

**After:**
```jsx
{renderContentBlock(block, { darkMode, color1, color2, t })}
```

## Bulk Update Script

For efficiency, you can update multiple pages at once. Here's a recommended order:

### Phase 1: High-Traffic Pages (Week 1)
1. Institute pages (governance, admission, academics)
2. Course pages (all 4 B.Tech programs)
3. People pages (faculty, students)

### Phase 2: Medium-Traffic Pages (Week 2)
1. Research pages (all 7)
2. Placement page
3. Media/NIRF pages

### Phase 3: Club & Event Pages (Week 3)
1. All IIC & Clubs pages
2. Footer pages (contact, events, etc.)
3. Gallery and other pages

## Testing Each Page

After implementing translation on a page:

1. **Start servers**:
   ```bash
   # Backend
   cd iiitbackend
   npm run dev
   
   # Frontend
   cd Frontend
   npm run dev
   ```

2. **Test the page**:
   - Navigate to the page
   - Change language to Malayalam (മലയാളം)
   - Wait 3-5 seconds
   - Verify ALL text translates (both UI and content)

3. **Check backend console** for translation logs:
   ```
   [Translation] Translating content_blocks ID X to ml
   [Translation] Found N strings to translate
   [Translation] Saved to cache
   ```

4. **Test cache**:
   - Refresh the page in Malayalam
   - Should load instantly (from cache)
   - Backend console should show "Cache hit"

## Common Patterns

### Pattern 1: Page with Dynamic Content

```jsx
const { blocks, loading, refetch } = usePageContent('page-name');

useEffect(() => {
  refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [language]);

return (
  <>
    {loading ? (
      <div>{t('Loading...')}</div>
    ) : (
      blocks.map(block => renderContentBlock(block, { darkMode, color1, color2, t }))
    )}
  </>
);
```

### Pattern 2: Page with Static Content

```jsx
const { t, language } = useTranslation();

return (
  <div>
    <h1>{t('Page Title')}</h1>
    <p>{t('Static description text')}</p>
    <button>{t('Click Here')}</button>
  </div>
);
```

### Pattern 3: Mixed Content (Static + Dynamic)

```jsx
const { t, language } = useTranslation();
const { blocks, refetch } = usePageContent('page-name');

useEffect(() => {
  refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [language]);

return (
  <div>
    {/* Static content */}
    <h1>{t('Page Title')}</h1>
    
    {/* Dynamic content from database */}
    {blocks.map(block => renderContentBlock(block, { darkMode, color1, color2, t }))}
    
    {/* More static content */}
    <footer>{t('Footer Text')}</footer>
  </div>
);
```

## What NOT to Translate

❌ Don't translate:
- URLs: `/about`, `/contact`
- File paths: `/images/logo.png`
- Class names: `className="text-center"`
- IDs: `id="main-content"`
- Email addresses: `info@iiitkottayam.ac.in`
- Phone numbers: `+91 1234567890`
- Variable names: `const userName = "John"`
- Technical terms: API endpoints, database names
- Numbers (but format them appropriately)

## Performance Optimization

### Static UI Text
- Loaded once per language change
- Cached in component state
- ~500ms first load, instant after

### Dynamic Content
- Translated by backend automatically
- Cached in MySQL database
- First load: 2-5 seconds (API call)
- Cached: 50-100ms (database query)

## Troubleshooting

### Translation not working?

1. **Check backend is running**:
   ```bash
   curl http://localhost:5000/api/events
   # Should return data
   ```

2. **Check language header**:
   ```javascript
   // In browser console
   localStorage.getItem('language') // Should be 'ml' or 'hi'
   ```

3. **Clear cache**:
   ```bash
   cd iiitbackend
   npm run clear:cache
   ```

4. **Check backend logs**:
   - Look for `[Translation]` logs
   - If not present, backend needs restart

## Files Created

- ✅ `TRANSLATION_TEMPLATE.jsx` - Copy-paste template for any page
- ✅ `APPLY_TRANSLATION_TO_ALL_PAGES.md` - This guide
- ✅ `homepage.jsx` - Reference implementation
- ✅ `whyIIIT.jsx` - Reference implementation
- ✅ `ScholarshipLoans.jsx` - Reference implementation

## Next Steps

1. **Pick a page** from the list above
2. **Open the file** in VS Code
3. **Follow the template** in TRANSLATION_TEMPLATE.jsx
4. **Test** the page with language toggle
5. **Commit** your changes
6. **Move to next page**

## Progress Tracking

Update this file as you complete pages. Mark completed pages with `[x]` instead of `[ ]`.

**Target**: All 60+ pages translated by end of March 2026

**Current**: 3/67 pages complete (4.5%)

## Questions?

- See [TRANSLATION_SYSTEM_GUIDE.md](../../iiitbackend/TRANSLATION_SYSTEM_GUIDE.md) for system overview
- See [TRANSLATION_QUICK_TEST.md](../../iiitbackend/TRANSLATION_QUICK_TEST.md) for testing guide
- See [TRANSLATION_FIX_APPLIED.md](../../iiitbackend/TRANSLATION_FIX_APPLIED.md) for troubleshooting

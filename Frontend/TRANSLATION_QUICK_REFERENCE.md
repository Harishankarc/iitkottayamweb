# Translation Quick Reference Card

## 🚀 Quick Implementation (5 Minutes Per Page)

### 1. Add Translation Hook (Copy-Paste)

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
          texts: ['Text 1', 'Text 2'], // Add your static UI text
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
```

### 2. Use in Component

```jsx
export default function MyPage() {
  const { t, language } = useTranslation(); // ADD THIS
  const { blocks, refetch } = usePageContent('page-name');
  
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]); // ADD THIS
  
  return (
    <>
      <h1>{t('My Title')}</h1>  {/* Wrap static text */}
      {blocks.map(b => renderContentBlock(b, { darkMode, color1, t }))} {/* Pass t */}
    </>
  );
}
```

## ⚡ Complete Example

```jsx
import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/createContext.jsx';
import API from '../../api/api.jsx';
import { usePageContent, getVisibleBlocks, renderContentBlock } from '../../hooks/usePageContent.jsx';

// Translation hook
const useTranslation = () => {
  const [translations, setTranslations] = useState({});
  const language = localStorage.getItem('language') || 'en';
  useEffect(() => {
    const fetchTranslations = async () => {
      if (language === 'en') return;
      try {
        const response = await API.post('/api/translate-bulk', {
          texts: ['Loading...', 'No content available'],
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

// Component
export default function MyPage() {
  const { darkMode } = useTheme();
  const { t, language } = useTranslation();
  const color1 = API.color1;
  const { blocks, loading, refetch } = usePageContent('my-page');
  
  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);
  
  const visibleBlocks = blocks ? getVisibleBlocks(blocks) : [];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <main className="mx-auto py-8" style={{ paddingLeft: '1cm', paddingRight: '1cm' }}>
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4" style={{ borderTopColor: color1 }}></div>
          </div>
        ) : visibleBlocks.length > 0 ? (
          <div className="space-y-6">
            {visibleBlocks.map((block, index) => (
              <div key={block.blockId || index}>
                {renderContentBlock(block, { darkMode, color1, t })}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p>{t('No content available')}</p>
          </div>
        )}
      </main>
    </div>
  );
}
```

## 📋 Checklist

For each page:

- [ ] Import: `import React, { useState, useEffect } from 'react';`
- [ ] Add `useTranslation` hook function
- [ ] Add static UI text to `texts` array
- [ ] Add `const { t, language } = useTranslation();`
- [ ] Add `const { refetch } = usePageContent('page-name');`
- [ ] Add `useEffect` with language dependency
- [ ] Wrap all static text: `"Text"` → `{t('Text')}`
- [ ] Pass `t` to renderContentBlock: `{ darkMode, color1, t }`
- [ ] Test: Change language toggle

## 🧪 Quick Test

1. Navigate to page
2. Change language to Malayalam (മലയാളം)
3. Wait 3 seconds
4. Check browser console: Should see "Fetching translations..."
5. Check backend console: Should see "[Translation] Translating..."
6. Verify text is in Malayalam

## ❌ Common Mistakes

1. **Forgetting to add `language` dependency**:
   ```jsx
   // ❌ Wrong - infinite loop
   useEffect(() => { refetch(); }, [language, refetch]);
   
   // ✅ Correct
   useEffect(() => { refetch(); }, [language]);
   ```

2. **Not passing `t` to renderContentBlock**:
   ```jsx
   // ❌ Wrong - won't translate
   renderContentBlock(block, { darkMode, color1 })
   
   // ✅ Correct
   renderContentBlock(block, { darkMode, color1, t })
   ```

3. **Translating URLs/paths**:
   ```jsx
   // ❌ Wrong - don't translate URLs
   <Link to={t('/about')}>
   
   // ✅ Correct - only translate text
   <Link to="/about">{t('About Us')}</Link>
   ```

## 📊 What Gets Translated

### ✅ Frontend Translates (Static UI)
- Button labels: "Submit", "Cancel", "Learn More"
- Form labels: "Name", "Email", "Message"
- Headings: "Welcome", "Contact Us"
- Error messages: "Required field", "Invalid email"
- Tooltips and hints

### ✅ Backend Translates (Dynamic Content)
- Event titles and descriptions
- News articles
- Content blocks (all fields)
- Faculty names and bios
- Course descriptions
- Research papers

### ❌ Never Translate
- URLs: `/about`, `/contact`
- File paths: `/images/logo.png`
- Email: `info@iiit.ac.in`
- Phone: `+91 1234567890`
- Class names: `bg-blue-500`
- IDs: `#main-content`

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Text not translating | Check backend is running (`npm run dev`) |
| Page reloading infinitely | Remove `refetch` from dependency array |
| Some text translates, some doesn't | Add missing text to `texts` array |
| Translation slow first time | Normal - API call takes 2-5 seconds |
| Backend logs not showing | Restart backend server |

## 📁 Files to Reference

- **Template**: `Frontend/TRANSLATION_TEMPLATE.jsx`
- **Example 1**: `screens/home/homepage.jsx`
- **Example 2**: `screens/whyiiit/whyIIIT.jsx`
- **Example 3**: `screens/institute/ScholarshipLoans.jsx`
- **Guide**: `Frontend/APPLY_TRANSLATION_TO_ALL_PAGES.md`

## 🎯 Success Criteria

Page is correctly translated when:

1. ✅ All static UI text shows in selected language
2. ✅ All dynamic content (from database) shows in selected language
3. ✅ Changing language re-fetches and re-translates content
4. ✅ No infinite reload loops
5. ✅ Backend console shows translation logs
6. ✅ Second load is fast (from cache)

## ⏱️ Time Estimate Per Page

- **Simple page** (static content only): 5 minutes
- **Medium page** (with usePageContent): 10 minutes
- **Complex page** (mixed static/dynamic): 15 minutes

**Total for 60 pages**: ~10-15 hours of work

---

💡 **Pro Tip**: Do 5-10 pages per day. You'll get faster with practice!

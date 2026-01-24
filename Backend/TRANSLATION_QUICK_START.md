# 🚀 Quick Start: Translation System

## ⚡ 3-Step Setup

### Step 1: Create Database Table (2 minutes)

Open **phpMyAdmin** → Select `iitkottayam` database → SQL tab → Copy and run:

```sql
CREATE TABLE IF NOT EXISTS `translations_cache` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `entityType` VARCHAR(50) NOT NULL,
  `entityId` INT(11) NOT NULL,
  `lang` VARCHAR(10) NOT NULL,
  `sourceHash` CHAR(64) NOT NULL,
  `translatedJson` LONGTEXT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_cache` (`entityType`, `entityId`, `lang`, `sourceHash`),
  INDEX `idx_lookup` (`entityType`, `entityId`, `lang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### Step 2: Get Google Translate API Key (5 minutes)

1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Search "Cloud Translation API" → Enable it
4. Go to "Credentials" → Create API Key
5. Copy the key (looks like: `AIzaSyXXXXXXXXXXXXXXXXXX`)

### Step 3: Add API Key to .env

Edit `Backend/.env` (or create if doesn't exist):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=iitkottayam

PORT=5000
JWT_SECRET=your-secret-key

# Add this line with your actual API key:
GOOGLE_TRANSLATE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
```

---

## ✅ Verify It Works

### 1. Restart backend:
```bash
cd Backend
npm run dev
```

### 2. Test in browser:

**English (default):**
```
http://localhost:5000/api/news
```

**Hindi:**
Open browser console and run:
```javascript
localStorage.setItem('language', 'hi');
```
Refresh page → Should show Hindi content!

**Malayalam:**
```javascript
localStorage.setItem('language', 'ml');
```
Refresh page → Should show Malayalam content!

---

## 🎯 What's Translated?

✅ News articles (title, content)
✅ Announcements (title, message)
✅ Events (title, description)
✅ Pages (titles, descriptions, hero text)
✅ Content blocks (paragraphs, headings, lists)

❌ NOT translated:
- URLs, images, file paths
- IDs, slugs, dates
- JSON keys (only values)

---

## 🐛 Troubleshooting

**Not translating?**
1. Check `.env` has `GOOGLE_TRANSLATE_API_KEY=...`
2. Check backend console for errors
3. Verify table `translations_cache` exists
4. Try: `curl -H "X-Language: hi" http://localhost:5000/api/news`

**Still English?**
- Make sure language is `hi` or `ml` (lowercase)
- Check browser console localStorage
- Clear browser cache

---

## 💡 How It Works

```
User changes language in frontend
        ↓
Frontend sends X-Language: hi header
        ↓
Backend checks cache
        ↓
If not cached: Call Google Translate
        ↓
Save to cache (next time instant!)
        ↓
Return translated JSON
```

**First request**: 2-3 seconds (Google API)
**Next requests**: 50ms (from cache) ⚡

---

## 📊 Cost

- **$20 per 1 million characters**
- Your site (~200k chars) = **~$4 per language**
- **Total for Hindi + Malayalam: ~$8 ONE-TIME**
- After that: FREE (everything cached)

---

**Need help?** Check `IMPLEMENTATION_STATUS.md` for details.

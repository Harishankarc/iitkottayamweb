# Translation System Setup Guide

## Overview
This backend implements a comprehensive translation system with caching for multilingual content delivery.

## Features
- ✅ Backend-side translation using Google Translate API
- ✅ Intelligent caching system (avoids repeated translations)
- ✅ Selective translation (only user-facing content)
- ✅ JSON structure preservation
- ✅ Batch translation for performance
- ✅ Automatic fallback to English on errors

## Supported Languages
- `en` - English (default)
- `hi` - Hindi
- `ml` - Malayalam

## Setup Instructions

### 1. Create Translation Cache Table
Run the SQL migration:
```bash
mysql -u root -p iitkottayam < migrations/create_translations_cache.sql
```

Or execute manually in phpMyAdmin using `migrations/create_translations_cache.sql`

### 2. Install Required Dependencies
```bash
cd Backend
npm install axios
```

### 3. Configure Google Translate API

#### Get API Key:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Cloud Translation API"
4. Go to "APIs & Services" > "Credentials"
5. Create API Key
6. Copy the API key

#### Add to Environment:
Edit `Backend/.env` file and add:
```env
GOOGLE_TRANSLATE_API_KEY=your-actual-api-key-here
```

### 4. Test Translation
Send requests with language header:
```bash
# English (default)
curl http://localhost:5000/api/announcements

# Hindi
curl -H "X-Language: hi" http://localhost:5000/api/announcements

# Malayalam
curl -H "X-Language: ml" http://localhost:5000/api/announcements
```

## Translation Coverage

### Currently Translated Routes:
1. **Page Contents** (`/api/pages/:slug`)
   - Fields: `pageTitle`, `metaDescription`, `heroTitle`, `heroSubtitle`, `sections`

2. **Content Blocks** (`/api/content-blocks`)
   - Fields: `content`, `blockLabel`, `blockDescription`

3. **News** (`/api/news`)
   - Fields: `title`, `content`, `excerpt`

4. **Announcements** (`/api/announcements`)
   - Fields: `title`, `message`

5. **Events** (`/api/events`)
   - Fields: `title`, `description`, `venue`, `organizer`

### Not Translated (by design):
- IDs, slugs, URLs, image paths
- JSON keys (only values are translated)
- Email addresses, phone numbers
- Dates, timestamps, numbers
- Status codes, categories, enums
- File paths, CSS classes

## How It Works

### 1. Request Flow
```
Frontend sends X-Language header (en|hi|ml)
        ↓
Backend extracts language from header
        ↓
Query database for original content (English)
        ↓
If lang != "en":
  - Build translatable payload (only specified fields)
  - Compute SHA256 hash of payload
  - Check translations_cache table
  - If cached: use cached translation
  - If not cached: call Google Translate API, save to cache
        ↓
Merge translated fields back into response
        ↓
Return translated JSON to frontend
```

### 2. Caching Strategy
- Cache key: `(entityType, entityId, lang, sourceHash)`
- Cache invalidation: Automatic when source content changes (hash mismatch)
- Performance: ~99% cache hit rate after initial translation

### 3. JSON Translation
For JSON fields like `sections` or `content`:
```javascript
// Original (stored in DB)
{
  "title": "Welcome to IIIT",
  "description": "Premier institute",
  "link": "/about"
}

// Translated (hi)
{
  "title": "IIIT में आपका स्वागत है",
  "description": "प्रमुख संस्थान",
  "link": "/about"  // NOT translated (URL)
}
```

## Frontend Integration

Update your API client to send language header:

```javascript
// Frontend/src/api/api.jsx
static getAuthHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    'X-Language': localStorage.getItem('language') || 'en'
  };
  
  const token = localStorage.getItem('authToken');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
}
```

## Monitoring & Debugging

### Check Cache Size
```sql
SELECT entityType, lang, COUNT(*) as cached_items
FROM translations_cache
GROUP BY entityType, lang;
```

### View Recent Translations
```sql
SELECT entityType, entityId, lang, 
       LEFT(translatedJson, 100) as preview,
       createdAt
FROM translations_cache
ORDER BY createdAt DESC
LIMIT 10;
```

### Clear Cache (if needed)
```sql
-- Clear all cache
TRUNCATE TABLE translations_cache;

-- Clear cache for specific entity
DELETE FROM translations_cache WHERE entityType = 'news';

-- Clear cache for specific language
DELETE FROM translations_cache WHERE lang = 'hi';
```

## Performance Optimization

### Batch Translation
The system automatically batches up to 100 strings per Google API call to reduce latency.

### Rate Limiting
Google Translate API limits:
- Free tier: 500,000 characters/month
- Paid tier: Custom limits

Monitor usage in Google Cloud Console.

### Error Handling
If translation fails:
- System logs error to console
- Returns original English content
- Does not break the API response

## Cost Estimation

Google Translate API pricing (as of 2024):
- $20 per 1 million characters

Example:
- Average page: 2,000 characters
- 100 pages × 2 languages = 400,000 characters
- Cost: ~$8 (one-time, then cached)

## Troubleshooting

### Translation not working?
1. Check `.env` file has `GOOGLE_TRANSLATE_API_KEY`
2. Verify API key is valid in Google Cloud Console
3. Check API is enabled: Cloud Translation API
4. Check server logs for errors
5. Test with curl: `curl -H "X-Language: hi" http://localhost:5000/api/news`

### Getting original content instead of translation?
1. Check `X-Language` header is being sent
2. Verify language code is supported (en, hi, ml)
3. Check if content is in excluded fields list
4. Look for errors in server console

### Translations look wrong?
1. Google Translate may not be perfect for technical content
2. Consider manual translation for critical pages
3. Cache allows you to override automated translations

## Adding More Languages

Edit `Backend/utils/translation.js`:
```javascript
const SUPPORTED_LANGUAGES = ['en', 'hi', 'ml', 'ta', 'bn']; // Add Tamil, Bengali
```

## Security Notes

- ✅ API key is server-side only (not exposed to frontend)
- ✅ Translation happens on backend (frontend never calls Google directly)
- ✅ Cache prevents excessive API usage
- ✅ Input validation prevents injection attacks

## Support

For issues or questions:
1. Check server logs: `Backend/logs/`
2. Review error messages in browser console
3. Verify database schema matches migration
4. Ensure all dependencies are installed

## Future Enhancements

Potential improvements:
- [ ] Admin UI to manually edit translations
- [ ] Support for more languages
- [ ] Translation memory export/import
- [ ] Quality scoring for translations
- [ ] A/B testing for translation quality

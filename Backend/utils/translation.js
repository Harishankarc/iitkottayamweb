import crypto from 'crypto';
import mysql from 'mysql2/promise';
import axios from 'axios';

// MySQL connection config
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'iitkottayam',
  port: process.env.DB_PORT || 3306
};

// Supported languages
const SUPPORTED_LANGUAGES = ['en', 'hi', 'ml'];
const DEFAULT_LANGUAGE = 'en';

// Keys to exclude from translation
const EXCLUDE_KEYS = [
  'id', '_id', 'slug', 'pageSlug', 'url', 'link', 'href', 'path', 'to',
  'src', 'image', 'logo', 'icon', 'backgroundImage', 'thumbnail', 'photo',
  'createdAt', 'updatedAt', 'publishedDate', 'startDate', 'endDate', 'eventDate',
  'date', 'visitDate', 'email', 'phone', 'password', 'token', 'key', 'api',
  'category', 'type', 'status', 'role', 'program', 'department', 'branch',
  'displayOrder', 'blockOrder', 'sortOrder', 'pageOrder', 'isActive', 'isPublished',
  'isFeatured', 'isVisible', 'isExternal', 'views', 'attendees', 'studentsPlaced',
  'level', 'columns', 'gridColumns', 'width', 'height', 'padding', 'margin',
  'fontSize', 'color', 'backgroundColor', 'metaKeywords', 'metaTitle'
];

// Regex patterns to identify non-translatable content
const URL_REGEX = /^(https?:\/\/|www\.|\/[a-z])/i;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FILE_PATH_REGEX = /^\/?(images|assets|uploads|files|static|public)\//i;
const CODE_LIKE_REGEX = /^[a-f0-9]{8,}$|^[A-Z_]{3,}$/;

/**
 * Extract language code from request headers
 * @param {Object} req - Express request object
 * @returns {string} Language code (en, hi, ml)
 */
export function getLangFromHeader(req) {
  const lang = (req.headers['x-language'] || req.headers['X-Language'] || DEFAULT_LANGUAGE).toLowerCase();
  return SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;
}

/**
 * Compute SHA256 hash of payload for caching
 * @param {Object} payload - Data to hash
 * @returns {string} SHA256 hash
 */
export function computeSourceHash(payload) {
  const jsonString = JSON.stringify(payload);
  return crypto.createHash('sha256').update(jsonString).digest('hex');
}

/**
 * Get cached translation from database
 * @param {string} entityType - Type of entity (e.g., 'page_contents')
 * @param {number} entityId - Entity ID
 * @param {string} lang - Language code
 * @param {string} sourceHash - Hash of source content
 * @returns {Object|null} Cached translation or null
 */
async function getCachedTranslation(entityType, entityId, lang, sourceHash) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      `SELECT translatedJson FROM translations_cache 
       WHERE entityType = ? AND entityId = ? AND lang = ? AND sourceHash = ?
       LIMIT 1`,
      [entityType, entityId, lang, sourceHash]
    );
    await connection.end();
    
    if (rows.length > 0) {
      return JSON.parse(rows[0].translatedJson);
    }
    return null;
  } catch (error) {
    console.error('Error fetching cached translation:', error);
    return null;
  }
}

/**
 * Save translated content to cache
 * @param {string} entityType - Type of entity
 * @param {number} entityId - Entity ID
 * @param {string} lang - Language code
 * @param {string} sourceHash - Hash of source content
 * @param {Object} translatedPayload - Translated data
 */
async function saveCachedTranslation(entityType, entityId, lang, sourceHash, translatedPayload) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const translatedJson = JSON.stringify(translatedPayload);
    
    await connection.execute(
      `INSERT INTO translations_cache (entityType, entityId, lang, sourceHash, translatedJson)
       VALUES (?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE translatedJson = ?, updatedAt = CURRENT_TIMESTAMP`,
      [entityType, entityId, lang, sourceHash, translatedJson, translatedJson]
    );
    await connection.end();
  } catch (error) {
    console.error('Error saving translation cache:', error);
  }
}

/**
 * Check if a string should NOT be translated
 * @param {string} value - String to check
 * @param {string} key - Object key name
 * @returns {boolean} True if should skip translation
 */
function shouldSkipTranslation(value, key = '') {
  if (typeof value !== 'string' || !value.trim()) return true;
  if (EXCLUDE_KEYS.includes(key)) return true;
  if (URL_REGEX.test(value)) return true;
  if (EMAIL_REGEX.test(value)) return true;
  if (FILE_PATH_REGEX.test(value)) return true;
  if (CODE_LIKE_REGEX.test(value)) return true;
  if (value.length < 2) return true; // Skip single characters
  return false;
}

/**
 * Recursively translate values in an object/array
 * @param {any} obj - Object to translate
 * @param {string} targetLang - Target language
 * @param {Array} stringsToTranslate - Accumulator for strings
 * @param {Array} paths - Accumulator for paths
 * @param {string} currentPath - Current path in object
 */
function collectStringsToTranslate(obj, targetLang, stringsToTranslate = [], paths = [], currentPath = '') {
  if (typeof obj === 'string') {
    if (!shouldSkipTranslation(obj)) {
      stringsToTranslate.push(obj);
      paths.push(currentPath);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      collectStringsToTranslate(item, targetLang, stringsToTranslate, paths, `${currentPath}[${index}]`);
    });
  } else if (obj && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const newPath = currentPath ? `${currentPath}.${key}` : key;
      if (!shouldSkipTranslation(value, key)) {
        collectStringsToTranslate(value, targetLang, stringsToTranslate, paths, newPath);
      }
    }
  }
  
  return { stringsToTranslate, paths };
}

/**
 * Set value at path in object
 * @param {Object} obj - Object to modify
 * @param {string} path - Dot notation path
 * @param {any} value - Value to set
 */
function setValueAtPath(obj, path, value) {
  const parts = path.split(/\.|\[|\]/).filter(p => p !== '');
  let current = obj;
  
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    const nextPart = parts[i + 1];
    
    if (!current[part]) {
      current[part] = /^\d+$/.test(nextPart) ? [] : {};
    }
    current = current[part];
  }
  
  current[parts[parts.length - 1]] = value;
}

/**
 * Translate text using MyMemory Translation API (Free)
 * @param {Array<string>} texts - Array of texts to translate
 * @param {string} targetLang - Target language code
 * @returns {Array<string>} Translated texts
 */
async function myMemoryTranslateBatch(texts, targetLang) {
  try {
    const translatedTexts = [];
    
    // MyMemory API endpoint (free, no API key required)
    const baseUrl = 'https://api.mymemory.translated.net/get';
    
    // Process texts one by one
    for (const text of texts) {
      try {
        const response = await axios.get(baseUrl, {
          params: {
            q: text,
            langpair: `en|${targetLang}`
          }
        });
        console.log(response.data);
        if (response.data && response.data.responseData && response.data.responseData.translatedText) {
          translatedTexts.push(response.data.responseData.translatedText);
        } else {
          translatedTexts.push(text); // Fallback to original
        }
      } catch (error) {
        console.error(`MyMemory API error for text "${text.substring(0, 50)}...":`, error.message);
        translatedTexts.push(text); // Fallback to original on error
      }
      
      // Small delay to be respectful to the API
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    return translatedTexts;
  } catch (error) {
    console.error('MyMemory Translation API error:', error.message);
    return texts; // Return original on error
  }
}

/**
 * Translate strings in batches
 * @param {Array<string>} strings - Strings to translate
 * @param {string} targetLang - Target language
 * @returns {Array<string>} Translated strings
 */
async function batchTranslateStrings(strings, targetLang) {
  if (strings.length === 0) return [];
  
  // MyMemory API: process in batches of 10
  const BATCH_SIZE = 10;
  const translated = [];
  
  for (let i = 0; i < strings.length; i += BATCH_SIZE) {
    const batch = strings.slice(i, i + BATCH_SIZE);
    const batchTranslated = await myMemoryTranslateBatch(batch, targetLang);
    translated.push(...batchTranslated);
  }
  
  return translated;
}

/**
 * Translate object values recursively
 * @param {Object} payload - Object to translate
 * @param {string} targetLang - Target language
 * @returns {Object} Translated object
 */
async function translateObjectValues(payload, targetLang) {
  if (targetLang === DEFAULT_LANGUAGE) {
    return payload;
  }

  const cloned = JSON.parse(JSON.stringify(payload));
  const { stringsToTranslate, paths } = collectStringsToTranslate(cloned, targetLang);
  
  if (stringsToTranslate.length === 0) {
    return cloned;
  }

  const translatedStrings = await batchTranslateStrings(stringsToTranslate, targetLang);
  
  // Apply translated strings back to cloned object
  for (let i = 0; i < paths.length; i++) {
    setValueAtPath(cloned, paths[i], translatedStrings[i]);
  }
  
  return cloned;
}

/**
 * Translate a single text string
 * @param {string} text - Text to translate
 * @param {string} targetLang - Target language code
 * @returns {string} Translated text
 */
export async function translateText(text, targetLang) {
  if (!text || targetLang === DEFAULT_LANGUAGE) {
    return text;
  }
  
  const result = await myMemoryTranslateBatch([text], targetLang);
  return result[0];
}

/**
 * Translate a database row with caching
 * @param {string} entityType - Entity type
 * @param {number} entityId - Entity ID
 * @param {Object} row - Database row
 * @param {Array<string>} fieldsToTranslate - Fields to translate
 * @param {string} lang - Target language
 * @returns {Object} Translated row
 */
export async function translateRow(entityType, entityId, row, fieldsToTranslate, lang) {
  if (lang === DEFAULT_LANGUAGE) {
    return row;
  }

  // Build translatable payload
  const translatablePayload = {};
  for (const field of fieldsToTranslate) {
    if (row[field] !== undefined && row[field] !== null) {
      // Parse JSON strings
      if (typeof row[field] === 'string' && (field === 'sections' || field === 'content' || field === 'links')) {
        try {
          translatablePayload[field] = JSON.parse(row[field]);
        } catch {
          translatablePayload[field] = row[field];
        }
      } else {
        translatablePayload[field] = row[field];
      }
    }
  }

  const sourceHash = computeSourceHash(translatablePayload);
  
  // Check cache
  let translatedPayload = await getCachedTranslation(entityType, entityId, lang, sourceHash);
  
  if (!translatedPayload) {
    // Translate
    translatedPayload = await translateObjectValues(translatablePayload, lang);
    // Save to cache
    await saveCachedTranslation(entityType, entityId, lang, sourceHash, translatedPayload);
  }

  // Merge translated fields back into row
  const result = { ...row };
  for (const field of fieldsToTranslate) {
    if (translatedPayload[field] !== undefined) {
      // Convert back to JSON string if needed
      if (typeof row[field] === 'string' && (field === 'sections' || field === 'content' || field === 'links')) {
        result[field] = JSON.stringify(translatedPayload[field]);
      } else {
        result[field] = translatedPayload[field];
      }
    }
  }

  return result;
}

export { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE };

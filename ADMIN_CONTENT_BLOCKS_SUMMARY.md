# Admin Panel - Content Blocks Integration

## ✅ Components Using content_blocks Table

### 1. **UnifiedContentEditor.jsx** (Primary Content Editor)
- **Route:** `/admin/content-editor`
- **Purpose:** Main content management interface with 3-step workflow
- **Features:**
  - Step 1: Select page from all 57 pages
  - Step 2: Edit page metadata (SEO, title, slug, isPublished)
  - Step 3: Edit content blocks (hero, heading, paragraph, list, image, statistics, button)
- **API Endpoints:**
  - `GET /api/pages` - Fetch all pages
  - `GET /api/content-blocks/page/:pageName` - Fetch blocks for specific page
  - `POST /api/content-blocks` - Create new block
  - `PUT /api/content-blocks/:id` - Update block
  - `DELETE /api/content-blocks/:id` - Delete block
- **Status:** ✅ **FULLY FUNCTIONAL** - Uses content_blocks for all content

### 2. **VisualPageEditor.jsx** (Visual Page Builder)
- **Route:** `/admin/visual-editor`
- **Purpose:** Visual editor with live preview
- **API Endpoints:**
  - `GET /api/content-blocks/page/:pageName`
  - `PUT /api/content-blocks/:id`
  - `DELETE /api/content-blocks/:id`
- **Status:** ✅ **FULLY FUNCTIONAL** - Uses content_blocks for all content

### 3. **ManagePages.jsx** (Page Metadata Management)
- **Route:** `/admin/pages`
- **Purpose:** Manage page metadata (not content)
- **API Endpoints:**
  - `GET /api/pages` - List all pages
  - `POST /api/pages` - Create new page
  - `PUT /api/pages/:id` - Update page metadata
- **What it edits:**
  - pageName, pageTitle, pageSlug
  - metaDescription, metaKeywords
  - isPublished
- **Status:** ✅ **CORRECT** - Manages metadata only, content is in content_blocks

### 4. **ManageContentBlocks.jsx** (Direct Block Management)
- **Route:** `/admin/content-blocks`
- **Purpose:** Raw content blocks CRUD interface
- **Status:** ✅ Uses content_blocks table

## ❌ Removed Components (Used Old Schema)

### ManagePageContent.jsx (DELETED)
- **Reason:** Used old schema with `heroTitle`, `heroSubtitle`, `sections` fields
- **Replacement:** Use `UnifiedContentEditor.jsx` instead
- **Old fields removed from database:**
  - heroTitle, heroSubtitle, heroImage
  - sections, content, sidebar
  - customFields, layout
  - navigationGroup, parentPage
  - pageOrder, sortOrder

## Database Architecture

### page_contents Table (10 columns - Metadata Only)
```sql
- id (Primary key)
- pageName (Unique identifier)
- pageTitle (Display title)
- pageSlug (URL path)
- category (Organization)
- metaDescription (SEO)
- metaKeywords (SEO)
- isPublished (Visibility control)
- createdAt, updatedAt (Timestamps)
```

### content_blocks Table (Content Storage)
```sql
- id (Primary key)
- blockId (Unique block identifier)
- pageName (Foreign key to page_contents)
- sectionName (Section grouping)
- blockType (hero, heading, paragraph, list, image, etc.)
- blockLabel (Admin label)
- content (JSON - actual content data)
- blockOrder (Display order)
- isVisible (Show/hide)
- createdAt, updatedAt (Timestamps)
```

## Content Coverage

- **Total Pages:** 57
- **Pages with content:** 57 (100% coverage)
- **Total content blocks:** 166
- **Average blocks per page:** 2.9

## Frontend Integration

### usePageContent Hook
```javascript
// Frontend/src/hooks/usePageContent.jsx
// Fetches content from content_blocks API, not from page metadata
const { content, blocks, loading, error } = usePageContent(pageName);
```

## Recommended Workflow

1. **For Content Editing:**
   - Use `UnifiedContentEditor` (/admin/content-editor)
   - Select page → Edit metadata → Edit content blocks
   
2. **For Quick Metadata Updates:**
   - Use `ManagePages` (/admin/pages)
   - Edit SEO, title, slug, publish status

3. **For Visual Editing:**
   - Use `VisualPageEditor` (/admin/visual-editor)
   - Live preview with block editing

## Summary

✅ **All admin components now use content_blocks table for content**
✅ **Clean separation: page_contents = metadata, content_blocks = content**
✅ **No duplication, no deprecated fields**
✅ **100% page coverage with content blocks**

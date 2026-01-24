# 🎯 Unified Content Management System

## Overview

The admin panel has been completely restructured with a new **Unified Content Editor** that merges all 4 previous content editing sections into one streamlined, user-friendly interface.

## What Changed?

### ❌ Old System (4 Separate Sections)
1. **Manage Pages** - Page metadata management
2. **Content Blocks** - JSON-based block editing
3. **Visual Editor** - Preview-based editing
4. **Page Content** - Legacy content system

**Problems:**
- Confusing navigation (which section to use?)
- JSON editing required technical knowledge
- No clear workflow
- Duplicate functionality

### ✅ New System (1 Unified Editor)
**Single entry point:** Admin → Content Management

**3-Step Workflow:**
1. **Select Page** → Choose which page to edit
2. **Page Settings** → Configure SEO and metadata  
3. **Edit Content** → Add/edit content blocks with text-based editors

## Key Features

### 📝 Text-Based Editing (No More JSON!)

Instead of editing raw JSON:
```json
{
  "title": "Welcome",
  "subtitle": "To IIIT Kottayam"
}
```

Now you get user-friendly forms:
```
Hero Title: [Welcome to IIIT Kottayam         ]
Subtitle:   [Pioneering Excellence           ]
```

### 🎨 Smart Content Editors

Each block type has a custom editor:

**Hero Banner:**
- Title, Subtitle, Description fields
- Button text and link
- Background image uploader

**Paragraph:**
- Icon emoji
- Title field
- Rich text area for content
- Optional link with text

**List:**
- List title
- Icon selection
- Dynamic item management
- Add/remove items easily

**Image:**
- Title field
- Image uploader
- Caption and alt text

**Statistics:**
- Section title
- Add multiple stat items
- Value + Label for each stat

**Button:**
- Button text
- Link URL
- Style selection (Primary/Secondary/Outline)

### 🔄 Streamlined Workflow

```
Step 1: Select Page
├─ Search through all pages
├─ Click to select
└─ Shows page info & metadata

Step 2: Page Settings
├─ Page Title (for browser/SEO)
├─ URL Slug
├─ Meta Description
├─ Meta Keywords
└─ Publish status

Step 3: Edit Content
├─ View all content blocks
├─ Add new blocks
├─ Edit existing blocks
├─ Duplicate blocks
├─ Show/hide blocks
└─ Delete blocks
```

### 💡 Improved User Experience

**Visual Block List:**
- Color-coded block types
- Numbered for easy reference
- Quick actions (Edit, Duplicate, Show/Hide, Delete)
- Expandable to view content

**Block Editor Modal:**
- Large, focused editing experience
- No distractions
- Clear form labels
- Helpful placeholders
- Save/Cancel buttons

**Progress Indicator:**
- See which step you're on
- Click to navigate between steps
- Can't skip steps (guided workflow)

## How to Use

### 1. Access the Editor

```
Admin Dashboard → Content Management
```

### 2. Select a Page

- Use the search box to find pages
- Click on any page card to select it
- Automatically moves to Step 2

### 3. Configure Page Settings

- Set page title (appears in browser)
- Set URL slug (e.g., `/about`)
- Add SEO meta description
- Add SEO keywords
- Toggle publish status
- Click "Save & Continue"

### 4. Edit Content Blocks

**To Add a Block:**
1. Click "+ Add Content Block"
2. Choose block type
3. Fill in the content using the form
4. Click "Create Block"

**To Edit a Block:**
1. Click the "Edit" icon on any block
2. Modify the content
3. Click "Update Block"

**To Duplicate a Block:**
- Click the "Copy" icon
- Creates a new block with same content

**To Hide a Block:**
- Click the "Eye" icon
- Block won't show on website but saved in database

**To Delete a Block:**
- Click the "Trash" icon
- Confirm deletion

## Block Types Available

| Block Type | Icon | Use For |
|-----------|------|---------|
| 🎯 Hero Banner | Purple | Large header sections with CTA |
| 📝 Heading | Blue | Section titles |
| 📄 Paragraph | Green | Text content with optional links |
| 🖼️ Image | Orange | Single images with captions |
| 🎨 Gallery | Pink | Multiple images (grid layout) |
| 📋 List | Indigo | Bullet points or feature lists |
| 🃏 Card | Teal | Boxed content sections |
| 📊 Statistics | Green | Number highlights (100+ Students) |
| 🔘 Button | Red | Call-to-action buttons |

## Benefits

### For Content Editors

✅ **No Technical Knowledge Needed**
- No JSON editing
- No code required
- Simple forms and buttons

✅ **Clear Workflow**
- Step-by-step process
- Can't get lost
- Visual progress indicator

✅ **Faster Editing**
- Find pages quickly with search
- Edit content in focused modal
- Duplicate blocks to save time

✅ **Less Errors**
- Form validation
- Required fields marked
- Can't save invalid content

### For Developers

✅ **Easier Maintenance**
- One codebase instead of four
- Consistent editing experience
- Reusable components

✅ **Better Code Organization**
- Clear separation of concerns
- Modular content editors
- Type-safe block definitions

## Migration Notes

### Old Links Still Work

The old admin pages are still accessible:
- `/admin/pages`
- `/admin/content-blocks`
- `/admin/visual-editor`
- `/admin/page-content`

But the sidebar now only shows:
- **Content Management** (new unified editor)

### Gradual Adoption

- Start using the new editor immediately
- Old data is fully compatible
- No migration script needed
- All existing content blocks work as-is

## Technical Details

### File Structure

```
Frontend/src/admin/pages/
├── UnifiedContentEditor.jsx (NEW - 1100 lines)
│   ├── Step 1: Page Selection
│   ├── Step 2: Page Metadata
│   ├── Step 3: Content Blocks
│   └── Block Editor Modal
│
├── ManagePages.jsx (kept for legacy access)
├── ManageContentBlocks.jsx (kept for legacy access)
├── ManagePageContent.jsx (kept for legacy access)
└── VisualPageEditor.jsx (kept for legacy access)
```

### State Management

```javascript
const [step, setStep] = useState(1);              // Current workflow step
const [selectedPage, setSelectedPage] = useState(null);  // Selected page
const [blocks, setBlocks] = useState([]);         // Page content blocks
const [editingBlock, setEditingBlock] = useState(null);  // Currently editing
const [pageMetadata, setPageMetadata] = useState({...}); // Page settings
```

### API Integration

Same backend APIs as before:
- `GET /api/pages` - List all pages
- `PUT /api/pages/:id` - Update page metadata
- `GET /api/content-blocks/page/:pageName` - Get blocks
- `POST /api/content-blocks` - Create block
- `PUT /api/content-blocks/:id` - Update block
- `DELETE /api/content-blocks/:id` - Delete block

## Examples

### Example 1: Creating a Welcome Section

1. Go to Content Management
2. Select "Homepage"
3. Click "Save & Continue" (if metadata is OK)
4. Click "+ Add Content Block"
5. Choose "🎯 Hero Banner"
6. Fill in:
   - Hero Title: "Welcome to IIIT Kottayam"
   - Subtitle: "Excellence in Technology Education"
   - Description: "Shaping future tech leaders..."
   - Button Text: "Learn More"
   - Button Link: "/about"
7. Upload background image
8. Click "Create Block"

### Example 2: Adding a Feature List

1. Select your page
2. Add block → "📋 List"
3. Fill in:
   - List Title: "Why Choose Us?"
   - Icon: "✓"
4. Add items:
   - Click "+ Add Item"
   - Type: "World-class faculty"
   - Click "+ Add Item"
   - Type: "Modern infrastructure"
   - Continue...
5. Click "Create Block"

### Example 3: Editing Existing Content

1. Find the block you want to edit
2. Click the "Edit" icon (pencil)
3. Modify the text in the form
4. Click "Update Block"
5. Done! Changes are live

## Best Practices

### ✅ DO

- Use meaningful block names ("Welcome Hero", "Features List")
- Add section names for organization ("hero", "about", "features")
- Fill in alt text for images (SEO + accessibility)
- Use appropriate block types for content
- Test with "Hide" before deleting blocks

### ❌ DON'T

- Don't leave block names as "New Block"
- Don't forget to save page settings before editing content
- Don't delete blocks if you might need them later (hide instead)
- Don't use Hero banners for simple paragraphs
- Don't skip meta descriptions (hurts SEO)

## Troubleshooting

**Q: I can't see my changes on the website**

A: Make sure the block is set to "visible" (eye icon should be open, not crossed)

**Q: The page doesn't appear on the website**

A: Check if "isPublished" is enabled in Page Settings (Step 2)

**Q: I accidentally deleted a block**

A: Unfortunately deleted blocks can't be recovered. Use "Hide" instead of "Delete" to be safe.

**Q: How do I reorder blocks?**

A: Currently blocks appear in the order they were created. To reorder, you'll need to recreate them or adjust the blockOrder manually via the old Content Blocks editor.

**Q: Can I see a preview before saving?**

A: Not in the current version. You can use the "Hide" feature to test changes safely.

## Future Enhancements

Planned features:
- Drag-and-drop block reordering
- Live preview while editing
- Block templates (save and reuse)
- Undo/redo functionality
- Bulk operations (duplicate, delete multiple)
- Rich text editor for paragraphs
- Image library browser
- AI-assisted content suggestions

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments in `UnifiedContentEditor.jsx`
3. Test with the old editors to compare behavior
4. Contact the development team

---

**Version:** 1.0  
**Last Updated:** January 2026  
**Author:** IIIT Kottayam Development Team

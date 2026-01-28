# Quick Start Guide - Unified Content Management

## 🎯 One Interface, Complete Control

### Access the New System
**Admin Panel** → **Content Management** (single menu item - no dropdown!)

---

## 📋 Pages View - Your Starting Point

### What You See:
```
┌─────────────────────────────────────────────────────────┐
│  Content Management                                       │
│  Manage all website pages and their content blocks      │
├─────────────────────────────────────────────────────────┤
│  🔍 Search...          [All] [Main] [Courses] [...] │
├─────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Homepage │  │ About    │  │ Gym      │              │
│  │ /homepage│  │ /about   │  │ /gym     │  →           │
│  │ 📦 24    │  │ 📦 12    │  │ 📦 13    │              │
│  │ ✅ Pub   │  │ ✅ Pub   │  │ ✅ Pub   │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
```

### Features:
- **Visual Cards** - Each page is a card with all key info
- **Search Bar** - Find pages instantly
- **Category Tabs** - Filter by type (Main, Courses, Facilities, etc.)
- **Block Count** - See how many content blocks each page has (📦 number)
- **Status Badge** - Published ✅ or Draft status
- **Click to Edit** - Click any card to start editing

---

## ✏️ Editor View - Edit Any Page

Click a page card → Opens the editor:

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to Pages    |    Gymnasium (/gym)    [💾 Save] [➕ Add]│
├──────────────┬──────────────────────────────────────────────────┤
│              │                                                  │
│ 🔧 Settings  │  📦 Content Blocks (13)                         │
│              │                                                  │
│ Page Title   │  ┌─────────────────────────────────────┐        │
│ [____]       │  │ 1  🎯 Hero Banner          👁️ ✏️ 🗑️│        │
│              │  └─────────────────────────────────────┘        │
│ Slug         │  ┌─────────────────────────────────────┐        │
│ [____]       │  │ 2  📄 About Gym            👁️ ✏️ 🗑️│        │
│              │  └─────────────────────────────────────┘        │
│ Meta Desc    │  ┌─────────────────────────────────────┐        │
│ [____]       │  │ 3  📋 Equipment List       👁️ ✏️ 🗑️│        │
│              │  └─────────────────────────────────────┘        │
│ Keywords     │  ┌─────────────────────────────────────┐        │
│ [____]       │  │ 4  📄 Guidance            👁️ ✏️ 🗑️│        │
│              │  └─────────────────────────────────────┘        │
│ Published    │  ┌─────────────────────────────────────┐        │
│ [●─────]  ✓  │  │ 5  🖼️ Image 1             👁️ ✏️ 🗑️│        │
│              │  └─────────────────────────────────────┘        │
└──────────────┴──────────────────────────────────────────────────┘
```

### Left Panel - Page Settings
Edit page metadata:
- **Page Title** - Display name
- **Slug** - URL path
- **Meta Description** - SEO description
- **Keywords** - SEO keywords
- **Published** - Toggle switch

Click **"💾 Save Metadata"** to save changes

### Center Panel - Content Blocks
Manage all content blocks:
- **Numbered badges** - Shows block order
- **Color-coded** - Each block type has a color
- **Quick actions**:
  - 👁️ Show/Hide - Toggle visibility
  - ✏️ Edit - Open block editor
  - 🗑️ Delete - Remove block
  - ▶️ Expand - View JSON content

Click **"➕ Add Block"** to create new content

---

## 🎨 Block Editor Modal

Click ✏️ on any block → Opens editor:

```
┌────────────────────────────────────────────────┐
│  Edit Block                              ✕     │
├────────────────────────────────────────────────┤
│                                                │
│  Block ID: [gym-equipment-list_________]       │
│                                                │
│  Block Type: [📋 List            ▼]           │
│                                                │
│  Block Order: [3]                             │
│                                                │
│  ─────────────────────────────────            │
│  Content:                                      │
│                                                │
│  List Title:                                   │
│  [Available Equipment____________]             │
│                                                │
│  List Items (one per line):                    │
│  ┌────────────────────────────┐               │
│  │ Spinning Bike - Cardio     │               │
│  │ Treadmill - Running        │               │
│  │ Bench Press - Upper body   │               │
│  │ ...                        │               │
│  └────────────────────────────┘               │
│                                                │
├────────────────────────────────────────────────┤
│                    [Cancel]  [💾 Save Block]  │
└────────────────────────────────────────────────┘
```

### Block Types Supported:
- **🎯 Hero Banner** - Badge, title, description
- **📄 Paragraph** - Title, text content
- **📋 List** - Title, multiple items
- **🖼️ Image** - Upload image, alt text, caption
- **And more...** (Gallery, Card, Table, Statistics, etc.)

---

## 🚀 Quick Workflows

### Edit Page Content
1. Click page card in grid
2. Edit settings in left panel
3. Click "💾 Save Metadata"
4. Edit blocks in center panel
5. Click "← Back to Pages" when done

### Add New Content Block
1. Click "➕ Add Block" button
2. Set Block ID (e.g., `new-section`)
3. Choose Block Type from dropdown
4. Fill in content fields
5. Click "💾 Save Block"

### Upload Image
1. Edit an image block (or create new)
2. In Block Editor, find "Upload Image" section
3. Click upload button
4. Select image file
5. Image automatically uploaded and URL set
6. Add alt text and caption
7. Click "💾 Save Block"

### Hide/Show Content
1. Find block in center panel
2. Click 👁️ (eye icon)
3. Block toggles between visible/hidden
4. Hidden blocks show "Hidden" badge
5. Changes save automatically

### Delete Block
1. Click 🗑️ (trash icon) on block
2. Confirm deletion
3. Block removed from page
4. Changes save automatically

---

## 📊 Page Categories

### Main Pages
Homepage, About, Why IIITK, Admissions, Academics, Research, Placements, NIRF

### Courses
B.Tech CSE, ECE, Cybersecurity, AI & Data Science

### Facilities
Hostel, Gym, Internet, Medical Centre, Student Mess, Security, Sports, Bank/ATM

### Clubs
Innovation Cell, Cultural, Technical, Sports, IEEE, ACM, Cyber Security, etc.

### Others
Gallery, Campus Life, Contact, Governance, Scholarships

---

## 💡 Tips & Tricks

### Quick Search
Type in search bar to find pages instantly:
- Search by page title: "Gym"
- Search by path: "facilities"
- Partial matches work: "tech" finds "B.Tech CSE"

### Category Filtering
Click category tabs to show only specific types:
- "Facilities" → Shows only facility pages
- "Courses" → Shows only course pages
- "All" → Shows everything

### Block Management
- **Order matters** - Lower numbers appear first
- **Use descriptive IDs** - e.g., `hero-section`, `about-text`
- **Test visibility** - Hide blocks to test layout changes
- **Expand to inspect** - Click ▶️ to see full JSON content

### Image Best Practices
- Upload high-quality images (1920x1080 recommended)
- Always add alt text (for accessibility)
- Use descriptive captions
- Images auto-saved to `/uploads/` folder

---

## ❓ Common Questions

**Q: Where did the 3 menu items go?**
A: They're now ONE unified interface! Much simpler.

**Q: Can I edit the same pages as before?**
A: Yes! All existing pages and content blocks work perfectly.

**Q: How do I create a new page?**
A: Pages are pre-defined in the system. Edit existing ones or contact developer to add new pages.

**Q: What if I make a mistake?**
A: Each save is independent. Page metadata and blocks save separately, so you can undo by re-editing.

**Q: Can I preview changes?**
A: Visit the actual page on the website to see live changes after saving.

**Q: Where are my images stored?**
A: All uploaded images go to `Backend/uploads/` folder automatically.

---

## 🎉 You're Ready!

The new unified interface makes content management:
- ✅ **Simpler** - One place for everything
- ✅ **Faster** - No navigation between screens  
- ✅ **Visual** - See all pages at once
- ✅ **Powerful** - Full control over content

**Start managing content now:** Admin Panel → Content Management

---

**Need Help?** Check `UNIFIED_CONTENT_MANAGEMENT.md` for detailed documentation.

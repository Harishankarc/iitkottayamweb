# 🎯 Universal Page Management System - Complete Guide

## Overview

You can now **control and change the content of EVERY page** from the admin panel! No more editing code files - just use the admin interface to manage all your website content.

## 🚀 How It Works

### 1. **Manage Pages** (Admin Panel)
- **Location**: Admin Panel → Institute → **Manage Pages**
- **Purpose**: Create and configure pages
- **What it does**: 
  - Lists all pages on your website
  - Create new pages
  - Edit page titles, URLs, and metadata
  - Link to content editing

### 2. **Content Blocks** (Admin Panel)
- **Location**: Admin Panel → Institute → **Content Blocks**
- **Purpose**: Add and edit actual page content
- **What it does**:
  - Add hero banners, text, images, lists, etc.
  - Drag to reorder content
  - Full visual editor for each block type

## 📝 Step-by-Step: How to Change Page Content

### **Example: Editing "Why IIIT" Page**

#### Step 1: Go to Manage Pages
1. Login to admin panel (`/admin`)
2. Click **Institute** → **Manage Pages**
3. You'll see all pages listed

#### Step 2: Select Page to Edit
1. Find "Why IIIT Kottayam" card
2. Click **"Edit Content"** button
3. You'll be taken to Content Blocks editor

#### Step 3: Add/Edit Content Blocks
1. Select page from dropdown (why-iiitk)
2. Click **"+ Add Block"** to create new content
3. Choose block type:
   - **Hero Banner**: Large header with image
   - **Heading**: Section titles
   - **Paragraph**: Text content
   - **Image**: Pictures with captions
   - **List**: Bullet points or numbered lists
   - **Statistics**: Number highlights
   - **Button**: Call-to-action links

#### Step 4: Fill in Content
For a **Paragraph Block**, fill in:
- Title: "About IIIT Kottayam"
- Text: "The Indian Institute of Information Technology..."
- Save

#### Step 5: Publish
1. Make sure "Visible" is checked
2. Click **Save**
3. View your changes on the live page!

## 🎨 Available Block Types

### 1. **Hero Banner**
Perfect for page headers
- Title
- Subtitle  
- Description
- Background image
- Call-to-action button

### 2. **Heading**
Section titles
- Title text
- Icon (optional)

### 3. **Paragraph**
Regular text content
- Title
- Body text
- Link (optional)

### 4. **Image**
Photos and graphics
- Image upload
- Alt text
- Caption

### 5. **List**
Bullet points or numbered
- Title
- Multiple items
- List style (bullets/numbers/checkmarks)

### 6. **Statistics**
Highlight numbers
- Multiple stats
- Value + label pairs
- Example: "500+ Students"

### 7. **Button**
Action buttons
- Button text
- Link URL
- Style variant

## 🗂️ Managing Different Pages

### Currently Available Pages

| Page Name | URL | Admin Edit Link |
|-----------|-----|----------------|
| Homepage | `/` | [Edit Content](/admin/content-blocks?page=homepage) |
| Why IIIT | `/why-iiitk` | [Edit Content](/admin/content-blocks?page=why-iiitk) |
| About | `/about` | [Edit Content](/admin/content-blocks?page=about) |
| Admissions | `/admissions` | [Edit Content](/admin/content-blocks?page=admissions) |
| Research | `/research` | [Edit Content](/admin/content-blocks?page=research) |
| Placements | `/placements` | [Edit Content](/admin/content-blocks?page=placements) |

### Adding a New Page

1. Go to **Manage Pages**
2. Click **"+ Add Page"**
3. Fill in:
   - **Page Name (ID)**: `campus-life` (unique identifier)
   - **Page Title**: "Campus Life"
   - **Page Slug**: `/campus-life` (URL)
   - **Meta Description**: For SEO
4. Click **"Create Page"**
5. Now click **"Edit Content"** to add content blocks

## 💡 Pro Tips

### For Best Results:

1. **Use Hero Banners** for page headers
2. **Organize with Headings** to break up content
3. **Add Images** to make pages visual
4. **Use Lists** for easy-to-scan information
5. **Keep Paragraphs** short and readable

### Content Strategy:

```
Page Structure Example:
├── Hero Banner (page header with image)
├── Heading (section title)
├── Paragraph (intro text)
├── Image (supporting visual)
├── List (key points)
├── Statistics (impressive numbers)
└── Button (call to action)
```

## 🔧 For Advanced Users

### Dynamic vs Static Content

**Dynamic Content** (Managed from Admin):
- Stored in database
- Editable from admin panel
- No code changes needed
- Instant updates

**Static Content** (Coded in Files):
- Written in JSX files
- Requires developer to change
- Faster performance
- Complex layouts possible

### How to Convert Static to Dynamic

1. Page automatically checks for dynamic content
2. If found: Shows dynamic blocks
3. If not found: Shows static fallback
4. Admin sees message to add content blocks

### The `usePageContent` Hook

Technical: Pages use this hook to fetch content:

```jsx
const { content, blocks, loading } = usePageContent('page-name');
```

This automatically:
- Fetches page metadata
- Loads content blocks
- Handles loading states
- Provides rendering helpers

## 📊 Visual Guide

### Admin Interface Flow

```
Login to Admin Panel
    ↓
Manage Pages
    ↓
Select Page → Edit Content
    ↓
Content Blocks Editor
    ↓
Add/Edit Blocks
    ↓
Save → View on Website
```

### Content Block Editor

```
┌─────────────────────────────────────┐
│  Select Page: [why-iiitk ▼]        │
├─────────────────────────────────────┤
│  [+ Add Block]                      │
├─────────────────────────────────────┤
│  ☰ Hero Banner - "Why Choose IIIT" │
│     [Edit] [Delete] [👁]            │
├─────────────────────────────────────┤
│  ☰ Paragraph - "About Institute"   │
│     [Edit] [Delete] [👁]            │
├─────────────────────────────────────┤
│  ☰ List - "Key Features"           │
│     [Edit] [Delete] [👁]            │
└─────────────────────────────────────┘
```

## 🎯 Quick Actions

### I want to...

**Change homepage hero image**
→ Admin → Content Blocks → Select "homepage" → Edit hero block → Upload new image

**Add new section to About page**
→ Admin → Content Blocks → Select "about" → + Add Block → Choose type → Fill content

**Update contact information**
→ Admin → Content Blocks → Select "contact" → Edit paragraph block → Update text

**Create new page**
→ Admin → Manage Pages → + Add Page → Fill details → Edit Content → Add blocks

**Reorder content sections**
→ Admin → Content Blocks → Select page → Drag blocks up/down → Save

**Hide a section temporarily**
→ Admin → Content Blocks → Select page → Click eye icon on block → Uncheck "Visible"

## 🔐 Permissions

- **Admin**: Full access to create/edit/delete pages and content
- **Editor**: Can edit content blocks, cannot delete pages
- **Viewer**: Read-only access

## ✅ Summary

### What You Can Now Do:

✅ **Create** new pages from admin panel  
✅ **Edit** any page content without coding  
✅ **Add** images, text, lists, and more  
✅ **Reorder** content with drag-and-drop  
✅ **Preview** changes before publishing  
✅ **Publish/Hide** content with one click  
✅ **Manage** all pages from one interface  

### What You DON'T Need:

❌ Edit code files  
❌ Know programming  
❌ Deploy changes manually  
❌ Wait for developers  

## 🚀 Get Started Now!

1. Login to admin panel: `yoursite.com/admin`
2. Go to **Manage Pages**
3. Click **Edit Content** on any page
4. Start adding content blocks!

**That's it!** Your changes appear instantly on the website. 🎉

---

## Need Help?

**Can't find a page?**  
Create it in Manage Pages first, then add content.

**Content not showing?**  
Make sure blocks are marked as "Visible" and page is "Published".

**Want complex layouts?**  
Use multiple block types together for rich pages.

**Need to revert changes?**  
Each save is stored - contact admin for version history.

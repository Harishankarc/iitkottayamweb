# 🎯 Quick Reference - Edit Website Content

## 📝 How to Edit Any Text on the Website

### Step 1: Access Admin Panel
```
URL: http://localhost:5173/login
Login with your admin credentials
Navigate to: Institute → Page Content
```

### Step 2: Find the Page
```
Use search box or filter by category
Click "Edit" button on the page you want to modify
```

### Step 3: Edit Content
The page editor shows these sections:

#### Basic Info:
- **Page Title** - Display title
- **Hero Title** - Main heading
- **Hero Subtitle** - Subheading

#### Content Sections:
Each section has:
- **ID** - Identifier (e.g., "vision", "mission")
- **Type** - text, list, statistics, or links
- **Title** - Section heading
- **Content** - The actual content

#### SEO:
- **Meta Description** - For Google
- **Meta Keywords** - For search engines

### Step 4: Save Changes
Click "Update Page" button at bottom

---

## 🏠 Homepage Content - What You Can Edit

### Vision Statement
```
Section ID: vision
Type: text
Edit: The vision text content
```

### Mission Points
```
Section ID: mission
Type: list
Edit: Array of mission items (JSON format)
Example:
[
  "Point 1",
  "Point 2",
  "Point 3"
]
```

### Placement Statistics
```
Section ID: placement-stats
Type: statistics
Edit: Array of statistics (JSON format)
Example:
[
  { "label": "Highest Package", "value": "45 LPA" },
  { "label": "Average Package", "value": "14 LPA" },
  { "label": "Companies Visited", "value": "100+" },
  { "label": "Placement Rate", "value": "95%" }
]
```

### Quick Links
```
Section ID: quick-links
Type: links
Edit: Array of links (JSON format)
Example:
[
  { "name": "Admissions", "path": "/institute/admission" },
  { "name": "Academics", "path": "/institute/academics" }
]
```

---

## 🎨 Section Types

### Type: TEXT
For paragraphs and text content
```json
{
  "id": "intro",
  "type": "text",
  "title": "Introduction",
  "content": "Your text here..."
}
```

### Type: LIST
For bullet points or numbered lists
```json
{
  "id": "features",
  "type": "list",
  "title": "Features",
  "items": [
    "Feature 1",
    "Feature 2",
    "Feature 3"
  ]
}
```

### Type: STATISTICS
For numbers/stats display
```json
{
  "id": "stats",
  "type": "statistics",
  "title": "Our Stats",
  "statistics": [
    { "label": "Students", "value": "500+" },
    { "label": "Faculty", "value": "50+" }
  ]
}
```

### Type: LINKS
For navigation links
```json
{
  "id": "nav",
  "type": "links",
  "title": "Quick Links",
  "links": [
    { "name": "Link Name", "path": "/page-url" }
  ]
}
```

---

## 📋 Common Tasks

### Task: Change Homepage Vision
1. Login → Institute → Page Content
2. Edit "Homepage"
3. Find section with id: "vision"
4. Edit content field
5. Save

### Task: Update Placement Numbers
1. Edit "Homepage"
2. Find section: "placement-stats"
3. Edit statistics array values
4. Save

### Task: Add New Mission Point
1. Edit "Homepage"
2. Find section: "mission"
3. Add new item to items array
4. Save

### Task: Create New Page
1. Click "Create New Page"
2. Fill basic info
3. Click "Add Section" for each content block
4. Configure sections
5. Set Published = true
6. Save

---

## 🔍 Available Pages to Edit

### Main Pages (2):
- homepage
- why-iiitk

### Institute Pages (4):
- governance
- admission
- academics
- scholarship

### Course Pages (2):
- btech-cse
- btech-ece

### Facilities Pages (2):
- hostel
- library

### Footer Pages (3):
- rti (Right to Information)
- icc (Internal Complaints Committee)
- anti-ragging

**Total: 13 pages ready to edit**

---

## ⚠️ Important Notes

### JSON Format:
When editing lists, statistics, or links, keep valid JSON:
- Use double quotes: `"text"` not `'text'`
- Separate items with commas
- Check for matching brackets

### Section IDs:
Don't change section IDs if frontend code references them:
- "vision" → Used by homepage
- "mission" → Used by homepage
- "placement-stats" → Used by homepage

### Publish Status:
- Checked = Live on website
- Unchecked = Draft (not visible)

---

## 🆘 Troubleshooting

### Content Not Showing:
1. Check if page is Published
2. Refresh browser (Ctrl+F5)
3. Check section ID matches frontend code

### JSON Error:
1. Use JSON validator tool
2. Check quotes and commas
3. Copy example format

### Can't Save:
1. Check required fields filled
2. Ensure page name is unique
3. Check network connection

---

## 📞 Quick Access URLs

**Admin Panel:**
- Login: http://localhost:5173/login
- Page Content: http://localhost:5173/admin/page-content
- Dashboard: http://localhost:5173/admin

**Website:**
- Homepage: http://localhost:5173
- All Pages: Check navigation menu

**API (for reference):**
- All Pages: http://localhost:5000/api/pages
- Homepage: http://localhost:5000/api/pages/homepage

---

## 💡 Pro Tips

1. **Preview Changes**: Open website in another tab to see changes
2. **Use Search**: Type page name in search box to find quickly
3. **Categories**: Filter by category to find related pages
4. **Order Pages**: Use Sort Order field to control display order
5. **SEO**: Always fill Meta Description for better Google rankings

---

## ✅ That's It!

You can now edit any text on the website through the admin panel!

**Most Common Use:**
1. Login to admin
2. Go to Page Content
3. Edit page
4. Change content in sections
5. Save
6. Done! ✨

No coding required! 🎉

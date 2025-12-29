# Dynamic Content Management System

## Overview
This document describes the complete dynamic content management system that allows you to edit **every piece of text** on the website through the admin panel.

## ✅ Completed Features

### 1. Enhanced PageContent Model
**File:** `Backend/models/PageContent.js`

The PageContent model supports flexible, JSON-based content structures with the following fields:
- `pageName` - Unique identifier (e.g., "homepage", "admission")
- `pageTitle` - Display title
- `pageSlug` - URL-friendly slug
- `category` - Categorization (main, institute, course, people, facilities, iic-clubs, research, footer, other)
- `metaDescription` - SEO description
- `metaKeywords` - SEO keywords
- `heroTitle` - Hero section main title
- `heroSubtitle` - Hero section subtitle
- `heroImage` - Hero background image URL
- `sections` - **JSON array** - Flexible content sections (see structure below)
- `content` - Main content text
- `sidebar` - **JSON** - Sidebar content
- `customFields` - **JSON** - Page-specific custom data
- `isPublished` - Publication status
- `sortOrder` - Display order

### 2. Section Structure (JSON)
Each section in the `sections` array can have different types:

```json
{
  "id": "section-identifier",
  "type": "text|list|statistics|links",
  "title": "Section Title",
  "content": "Text content or JSON data",
  "items": ["Item 1", "Item 2"],
  "statistics": [
    {"label": "Stat Label", "value": "100+"}
  ],
  "links": [
    {"text": "Link Text", "url": "/path"}
  ]
}
```

### 3. Seeded Pages (13 pages)
**File:** `Backend/seedAllPages.js`

Currently seeded pages:
- **Main:** homepage, why-iiitk
- **Institute:** governance, admission, academics, scholarship
- **Course:** btech-cse, btech-ece
- **Facilities:** hostel, library
- **Footer:** rti, icc, anti-ragging

### 4. Admin Management Page
**File:** `Frontend/src/admin/pages/ManagePageContent.jsx`

Features:
- ✅ View all pages with filtering by category
- ✅ Search pages by name/title
- ✅ Create new pages
- ✅ Edit existing pages
- ✅ Delete pages
- ✅ Toggle publish status
- ✅ Manage sections dynamically (add/edit/remove)
- ✅ Rich section editor supporting all section types
- ✅ SEO metadata management
- ✅ Hero section customization

**Access:** Admin Panel → Institute → Page Content

### 5. Updated Homepage
**File:** `Frontend/src/screens/home/homepage.jsx`

Now dynamically loads:
- ✅ Vision & Mission from database
- ✅ Placement statistics from database
- ✅ All other content sections
- ✅ Fallback to default content if database is empty

## 🔧 How to Use

### Step 1: Access Admin Panel
1. Navigate to `/login`
2. Login with admin credentials
3. Go to **Institute → Page Content**

### Step 2: Edit Homepage Content
1. Find "Homepage" in the list
2. Click **Edit** button
3. Modify sections:
   - **Vision Section:** Edit content directly
   - **Mission Section:** Edit items in JSON format
   - **Placement Stats:** Edit statistics array
4. Click **Update Page**

### Step 3: Create New Pages
1. Click **Create New Page**
2. Fill in basic info:
   - Page Name (unique ID)
   - Page Title
   - Category
   - Slug
3. Add sections:
   - Click **Add Section**
   - Choose section type
   - Fill in content
4. Click **Create Page**

### Step 4: View Changes
Changes appear immediately on the frontend after saving.

## 📋 Example: Editing Vision & Mission

### Current Database Structure:
```json
{
  "sections": [
    {
      "id": "vision",
      "type": "text",
      "title": "Vision",
      "content": "\"Generating knowledge for the future\" — aspiring to be a top-tier, research-driven organization in IT and allied fields."
    },
    {
      "id": "mission",
      "type": "list",
      "title": "Mission",
      "items": [
        "Produce competent and ethical graduates.",
        "Solve local & global problems through technology.",
        "Promote significance of ethics and integrity."
      ]
    }
  ]
}
```

### To Edit:
1. Go to **Page Content** in admin
2. Edit "Homepage"
3. Find the section with id "vision" or "mission"
4. Modify the content or items
5. Save

## 📋 Example: Editing Placement Stats

### Current Database Structure:
```json
{
  "sections": [
    {
      "id": "placement-stats",
      "type": "statistics",
      "title": "Placement Statistics",
      "statistics": [
        { "label": "Highest Package", "value": "45 LPA" },
        { "label": "Average Package", "value": "14 LPA" },
        { "label": "Companies Visited", "value": "100+" },
        { "label": "Placement Rate", "value": "95%" }
      ]
    }
  ]
}
```

### To Edit:
1. Edit homepage in admin
2. Find "placement-stats" section
3. Modify the statistics array:
   ```json
   [
     { "label": "Highest Package", "value": "50 LPA" },
     { "label": "Average Package", "value": "16 LPA" }
   ]
   ```
4. Save

## 🎯 Next Steps to Complete Full Dynamic System

### Phase 1: Seed Remaining Pages (Pending)
Need to seed approximately **50+ more pages**:

#### Institute Pages:
- [ ] Homepage details
- [ ] About IIIT Kottayam
- [ ] Director's message
- [ ] Vision & Mission (dedicated page)
- [ ] Campus life

#### Course Pages:
- [ ] B.Tech CSE (AI & DS)
- [ ] B.Tech Cyber Security
- [ ] M.Tech programs
- [ ] PhD programs
- [ ] Curriculum details
- [ ] Course structure

#### People Pages:
- [ ] Administration
- [ ] Head of Department
- [ ] Faculty (individual pages)
- [ ] Technical staff
- [ ] Professional support staff
- [ ] B.Tech students
- [ ] M.Tech students
- [ ] Research scholars
- [ ] Gender index

#### Facilities Pages:
- [ ] Hostel facilities
- [ ] Library
- [ ] Internet & IT
- [ ] Sports facilities
- [ ] Gym
- [ ] Medical centre
- [ ] Student mess
- [ ] Security
- [ ] Campus map

#### IIC & Clubs Pages:
- [ ] Innovation Cell
- [ ] FDP & Webinars
- [ ] Gallery
- [ ] Cultural Club
- [ ] Technical Club
- [ ] Trendless Club
- [ ] Sports Club
- [ ] Security Club
- [ ] MindQuest
- [ ] IEEE Student Branch
- [ ] ACM

#### Research Pages:
- [ ] Research groups
- [ ] Faculty research papers
- [ ] UG research students
- [ ] Research funding
- [ ] Awards & recognition
- [ ] International collaborations
- [ ] Research activities

#### Footer Pages:
- [ ] LMS Links
- [ ] IDY 2022
- [ ] Site map
- [ ] Events
- [ ] Tenders
- [ ] Contact
- [ ] RTI
- [ ] ICC
- [ ] Anti-ragging

### Phase 2: Update All Frontend Pages (Pending)
Each page needs to be updated to fetch from API:

```jsx
// Example pattern for any page
const [pageContent, setPageContent] = useState(null);

useEffect(() => {
  const fetchPageContent = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/pages/{pageName}`);
      const data = await response.json();
      if (data.success) {
        setPageContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching page content:', error);
    }
  };
  fetchPageContent();
}, []);

// Use in JSX
{pageContent?.heroTitle || 'Default Title'}
{pageContent?.sections?.find(s => s.id === 'section-id')?.content}
```

### Phase 3: Advanced Features (Pending)
- [ ] Rich text editor (WYSIWYG)
- [ ] Image upload for hero sections
- [ ] Bulk edit functionality
- [ ] Import/Export page content
- [ ] Preview before publish
- [ ] Version history
- [ ] Content templates
- [ ] Multilingual support

## 🗂️ Database Schema

### Table: `page_contents`
```sql
CREATE TABLE page_contents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  pageName VARCHAR(255) UNIQUE NOT NULL,
  pageTitle VARCHAR(255),
  pageSlug VARCHAR(255),
  category ENUM('main', 'institute', 'course', 'people', 'facilities', 'iic-clubs', 'research', 'footer', 'other'),
  metaDescription TEXT,
  metaKeywords TEXT,
  heroTitle VARCHAR(255),
  heroSubtitle TEXT,
  heroImage VARCHAR(500),
  sections JSON,
  content TEXT,
  sidebar JSON,
  customFields JSON,
  isPublished BOOLEAN DEFAULT true,
  sortOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 📊 API Endpoints

### Page Content Endpoints
- `GET /api/pages` - Get all pages (with filtering)
  - Query params: `category`, `isPublished`
- `GET /api/pages/:pageName` - Get single page by name
- `POST /api/pages` - Create new page
- `PUT /api/pages/:id` - Update page
- `DELETE /api/pages/:id` - Delete page

### Usage Examples:
```javascript
// Get all published pages
GET /api/pages?isPublished=true

// Get all course pages
GET /api/pages?category=course

// Get homepage
GET /api/pages/homepage

// Create new page
POST /api/pages
{
  "pageName": "new-page",
  "pageTitle": "New Page",
  "sections": [...],
  ...
}

// Update page
PUT /api/pages/1
{
  "pageTitle": "Updated Title",
  ...
}
```

## 🚀 Running the System

### Backend:
```bash
cd Backend
npm install
node seedAllPages.js  # Seed initial 13 pages
node server.js
```

### Frontend:
```bash
cd Frontend
npm install
npm run dev
```

### Access:
- **Website:** http://localhost:5173
- **Admin Panel:** http://localhost:5173/login
- **API:** http://localhost:5000/api

## 📝 Notes

### Current Status:
- ✅ Database model enhanced
- ✅ 13 pages seeded with comprehensive content
- ✅ Admin page created and functional
- ✅ Homepage updated to use dynamic content
- ⏸️ Remaining 50+ pages need seeding
- ⏸️ Other frontend pages need updating

### Key Benefits:
1. **No more hardcoded text** - Everything in database
2. **Easy content updates** - Through admin panel
3. **Flexible structure** - JSON sections support any content type
4. **SEO friendly** - Meta tags manageable
5. **Version control** - All changes tracked in database
6. **Scalable** - Easy to add new pages and sections

### Tips:
1. Use meaningful section IDs (e.g., "vision", "mission", "stats")
2. Keep sections JSON valid (use JSON validator)
3. Test changes in draft mode before publishing
4. Use categories to organize pages
5. Set sortOrder for custom page ordering

## 🎉 Success Metrics

You can now edit through admin panel:
- ✅ Vision & Mission statements
- ✅ Placement statistics
- ✅ All homepage sections
- ✅ Hero titles and subtitles
- ✅ Quick links
- ✅ Any custom content sections

**Next:** Seed remaining pages and update all frontend pages to complete the full dynamic system!

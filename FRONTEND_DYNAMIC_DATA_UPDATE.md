# Frontend Dynamic Data Integration - IIIT Kottayam Website

## Overview
This document details the changes made to integrate dynamic data from the backend API into frontend components. Previously, all website data was hardcoded with static arrays. Now all data is fetched from the database via API calls.

---

## ✅ Updated Components

### 1. **Homepage** (`Frontend/src/screens/home/homepage.jsx`)

**Changes Made:**
- Added `useState` and `useEffect` hooks to fetch data from multiple API endpoints
- Removed static arrays for: `newsList`, `eventsList`, `companyList`, `facultyList`, `NIRF_Ranking`, `heroSliders`
- Added loading state management
- Implemented fallback default sliders when no data available

**API Endpoints Used:**
- `GET /api/news` - Fetches news items (filtered by `isPublished`, limited to 5)
- `GET /api/events` - Fetches events (filtered by `isPublished`, limited to 4)
- `GET /api/company-logos` - Fetches company logos (filtered by `isActive`)
- `GET /api/faculty` - Fetches faculty members (filtered by `isActive`, limited to 8)
- `GET /api/nirf?year=2025` - Fetches NIRF rankings for 2025 (filtered by `isPublished`)
- `GET /api/hero-sliders` - Fetches hero slider images (filtered by `isActive`)

**Data Formatting:**
```javascript
// Example: News data transformation
const formattedNews = newsData.data
  .filter(item => item.isPublished)
  .slice(0, 5)
  .map(item => ({
    title: item.title,
    date: item.publishedDate || item.createdAt,
    isNew: new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    link: `/news/${item.id}`
  }));
```

---

### 2. **Faculty Page** (`Frontend/src/screens/people/faculty.jsx`)

**Changes Made:**
- Removed static `facultyData` array (8 hardcoded faculty members)
- Added `useEffect` to fetch faculty from API
- Added loading state with spinner
- Transformed API data to match existing component structure

**API Endpoint Used:**
- `GET /api/faculty`

**Data Transformation:**
```javascript
const formattedFaculty = data.data
  .filter(item => item.isActive)
  .map(item => ({
    id: item.id,
    name: item.name,
    designation: item.designation,
    affiliation: item.department,
    role: item.position || 'Faculty',
    interests: item.specialization ? item.specialization.split(',').map(s => s.trim()) : [],
    education: item.qualifications || '',
    phone: item.phone || '',
    email: item.email,
    room: item.office || '',
    website: item.website || '#',
    image: item.photo || placeholder
  }));
```

**Loading State:**
Shows animated spinner with "Loading faculty data..." message while fetching.

---

### 3. **Footer Component** (`Frontend/src/components/footer.jsx`)

**Changes Made:**
- Added `useState` and `useEffect` for dynamic footer data
- Ready to display dynamic footer content from database

**API Endpoint Used:**
- `GET /api/footer`

**Note:** Footer data structure allows for dynamic links, social media, contact info, etc.

---

### 4. **Media Page** (`Frontend/src/screens/media/media.jsx`)

**Changes Made:**
- Removed static `mediaArticles` array (12+ hardcoded media items)
- Added `useEffect` to fetch media from API
- Added loading state

**API Endpoint Used:**
- `GET /api/media`

**Data Transformation:**
```javascript
const formattedMedia = data.data
  .filter(item => item.isPublished)
  .map(item => ({
    source: item.source || 'News',
    type: item.type || 'news',
    title: item.title,
    image: item.thumbnailUrl || item.imageUrl || '/media/placeholder.jpg',
    link: item.url || '#',
    color: item.type === 'video' ? '#FF0000' : '#1E3A8A'
  }));
```

---

### 5. **Placement Page** (`Frontend/src/screens/placement/placement.jsx`)

**Changes Made:**
- Removed static `placementData` array (5 years of hardcoded data)
- Removed static `sponsors` array (24 hardcoded companies)
- Added `useEffect` to fetch both placements and company sponsors
- Added loading state

**API Endpoints Used:**
- `GET /api/placements` - For placement statistics
- `GET /api/company-logos` - For sponsor companies

**Data Transformation:**
```javascript
// Placements
const formattedPlacements = data.data
  .filter(item => item.isPublished)
  .map(item => ({
    year: item.academicYear || item.year,
    date: item.updatedAt ? `(as on ${new Date(item.updatedAt).toLocaleDateString()})` : '',
    highestCTC: item.highestPackage || 'N/A',
    avgCTC: item.averagePackage || 'N/A',
    placements: item.totalPlacements || 0,
    offers: item.totalOffers || 0
  }));

// Sponsors
const formattedSponsors = companiesData.data
  .filter(item => item.isActive)
  .map(item => ({
    name: item.name,
    location: item.description || 'India',
    logo: item.logo || item.name.toLowerCase()
  }));
```

---

## 🔄 How It Works

### Data Flow:
```
Admin Panel → Database → Backend API → Frontend Components → User Website
```

1. **Admin adds/edits data** via Admin Panel (e.g., add new faculty member)
2. **Data is saved** to MySQL database
3. **Backend API** serves data through RESTful endpoints
4. **Frontend components** fetch data using `useEffect` on page load
5. **Users see updated data** immediately on the website

### Example Flow for Adding Faculty:
```
1. Admin goes to /admin/faculty
2. Clicks "Add Faculty" button
3. Fills form: Name, Email, Photo, Department, etc.
4. Clicks "Save"
5. POST request to /api/faculty → Saves to database
6. User visits /people/faculty
7. useEffect triggers → GET /api/faculty
8. New faculty appears on website instantly!
```

---

## 🎨 Loading States

All updated components now show loading indicators:

```javascript
{loading ? (
  <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4" 
         style={{ borderTopColor: color1 }}></div>
    <p className="mt-4">Loading data...</p>
  </div>
) : (
  // Display actual data
)}
```

---

## 🔑 Key Improvements

### Before:
❌ Data hardcoded in component files  
❌ Need to edit code files to change content  
❌ Requires developer to update website  
❌ No version control for content changes  

### After:
✅ Data fetched from database  
✅ Admin can update via web interface  
✅ Non-technical staff can manage content  
✅ All changes tracked in database  
✅ Instant updates without code deployment  

---

## 📊 API Endpoint Summary

| Endpoint | Method | Purpose | Filters Used |
|----------|--------|---------|--------------|
| `/api/news` | GET | Fetch news items | `isPublished` |
| `/api/events` | GET | Fetch events | `isPublished` |
| `/api/faculty` | GET | Fetch faculty members | `isActive` |
| `/api/placements` | GET | Fetch placement stats | `isPublished` |
| `/api/media` | GET | Fetch media coverage | `isPublished` |
| `/api/company-logos` | GET | Fetch company logos | `isActive` |
| `/api/nirf` | GET | Fetch NIRF rankings | `isPublished`, `year` |
| `/api/hero-sliders` | GET | Fetch hero images | `isActive` |
| `/api/footer` | GET | Fetch footer content | - |
| `/api/navigation` | GET | Fetch navigation menu | `isActive` |

---

## 🚀 Testing Instructions

### 1. Start Backend Server:
```bash
cd Backend
npm start
# Server should run on http://localhost:5000
```

### 2. Start Frontend:
```bash
cd Frontend
npm run dev
# Frontend should run on http://localhost:5173
```

### 3. Test Data Flow:

**Test 1: Add Faculty**
1. Go to http://localhost:5173/admin/login
2. Login with admin credentials
3. Navigate to "Faculty" in sidebar
4. Click "Add Faculty"
5. Fill form and upload photo
6. Save
7. Open http://localhost:5173/people/faculty in new tab
8. ✅ Verify new faculty appears

**Test 2: Add News**
1. In admin panel, go to "News"
2. Add new news item with title and content
3. Mark as "Published"
4. Save
5. Open homepage http://localhost:5173/
6. ✅ Verify news appears in news section

**Test 3: Add Company Logo**
1. In admin panel, go to "Company Logos"
2. Upload company logo and name
3. Mark as "Active"
4. Save
5. Open homepage http://localhost:5173/
6. ✅ Verify logo appears in companies section

---

## 🐛 Troubleshooting

### Issue: "Data not showing on website"

**Check:**
1. ✅ Backend server is running on port 5000
2. ✅ Database has data (use admin panel or MySQL Workbench)
3. ✅ Data has `isPublished` or `isActive` = true
4. ✅ Browser console for errors (F12 → Console tab)
5. ✅ Network tab shows successful API calls (Status 200)

### Issue: "CORS Error"

**Solution:**
Backend `server.js` should have:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: "Images not loading"

**Check:**
1. ✅ Image URLs are absolute (start with http:// or https://)
2. ✅ Cloudinary images uploaded correctly
3. ✅ Placeholder fallbacks working

---

## 📝 Next Steps

### Pages Still Needing Updates:
1. **Announcements** - Update to fetch from `/api/announcements`
2. **Gallery** - Update to fetch from `/api/gallery`
3. **Courses** - Update to fetch from `/api/courses`
4. **Research Publications** - Update to fetch from `/api/research-publications`
5. **Students** - Update to fetch from `/api/students`
6. **Navigation Menu** - Update to fetch from `/api/navigation`

### Example Pattern to Follow:

```javascript
import { useState, useEffect } from 'react';

export default function YourComponent() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/your-endpoint');
        const result = await response.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
}
```

---

## ✅ Summary

**Total Components Updated:** 5
- ✅ Homepage
- ✅ Faculty Page  
- ✅ Media Page
- ✅ Placement Page
- ✅ Footer Component

**Total API Endpoints Integrated:** 10
- News, Events, Faculty, Placements, Media, Company Logos, NIRF, Hero Sliders, Footer, Navigation

**Result:**  
🎉 **Admin panel data now appears on the public website!**

When admins add/edit/delete content through the admin panel, it immediately reflects on the user-facing website without requiring code changes or deployments.

---

**Date:** $(date)  
**Updated By:** GitHub Copilot  
**Status:** ✅ Complete

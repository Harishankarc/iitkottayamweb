# 🔌 API Endpoints Quick Reference

Base URL: `http://localhost:5000/api`

## Authentication Required Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 1. Authentication (`/auth`)
- `POST /auth/login` - Login (Public)
- `POST /auth/register` - Register new admin (Protected - Admin only)
- `GET /auth/me` - Get current user (Protected)
- `GET /auth/users` - List all users (Protected - Admin only)

---

## 2. News (`/news`)
- `GET /news` - Get all news (Public)
- `GET /news/:id` - Get single news (Public)
- `POST /news` - Create news (Protected)
- `PUT /news/:id` - Update news (Protected)
- `DELETE /news/:id` - Delete news (Protected)

---

## 3. Events (`/events`)
- `GET /events` - Get all events (Public)
- `GET /events/:id` - Get single event (Public)
- `POST /events` - Create event (Protected)
- `PUT /events/:id` - Update event (Protected)
- `DELETE /events/:id` - Delete event (Protected)

---

## 4. Faculty (`/faculty`)
- `GET /faculty` - Get all faculty (Public)
- `GET /faculty/:id` - Get single faculty (Public)
- `POST /faculty` - Create faculty (Protected)
- `PUT /faculty/:id` - Update faculty (Protected)
- `DELETE /faculty/:id` - Delete faculty (Protected)

---

## 5. Students (`/students`)
- `GET /students` - Get all students (Public)
- `GET /students/:id` - Get single student (Public)
- `POST /students` - Create student (Protected)
- `PUT /students/:id` - Update student (Protected)
- `DELETE /students/:id` - Delete student (Protected)

---

## 6. Placements (`/placements`)
- `GET /placements` - Get all placements (Public)
- `GET /placements/:id` - Get single placement (Public)
- `POST /placements` - Create placement (Protected)
- `PUT /placements/:id` - Update placement (Protected)
- `DELETE /placements/:id` - Delete placement (Protected)

---

## 7. Announcements (`/announcements`)
- `GET /announcements` - Get all announcements (Public)
- `GET /announcements/:id` - Get single announcement (Public)
- `POST /announcements` - Create announcement (Protected)
- `PUT /announcements/:id` - Update announcement (Protected)
- `DELETE /announcements/:id` - Delete announcement (Protected)

---

## 8. Gallery (`/gallery`)
- `GET /gallery` - Get all galleries (Public)
- `GET /gallery/:id` - Get single gallery (Public)
- `POST /gallery` - Create gallery (Protected)
- `PUT /gallery/:id` - Update gallery (Protected)
- `DELETE /gallery/:id` - Delete gallery (Protected)

---

## 9. Media (`/media`)
- `GET /media` - Get all media (Public)
- `GET /media/:id` - Get single media (Public)
- `POST /media` - Create media (Protected)
- `PUT /media/:id` - Update media (Protected)
- `DELETE /media/:id` - Delete media (Protected)

---

## 10. Courses (`/courses`) ✨ NEW
- `GET /courses` - Get all courses (Public)
- `GET /courses/:id` - Get single course (Public)
- `POST /courses` - Create course (Protected)
- `PUT /courses/:id` - Update course (Protected)
- `DELETE /courses/:id` - Delete course (Protected)

---

## 11. Research Publications (`/research-publications`) ✨ NEW
- `GET /research-publications` - Get all publications (Public)
- `GET /research-publications/:id` - Get single publication (Public)
- `POST /research-publications` - Create publication (Protected)
- `PUT /research-publications/:id` - Update publication (Protected)
- `DELETE /research-publications/:id` - Delete publication (Protected)

---

## 12. Hero Sliders (`/hero-sliders`) ✨ NEW
- `GET /hero-sliders` - Get all sliders (Public)
- `GET /hero-sliders/:id` - Get single slider (Public)
- `POST /hero-sliders` - Create slider (Protected)
- `PUT /hero-sliders/:id` - Update slider (Protected)
- `DELETE /hero-sliders/:id` - Delete slider (Protected)

---

## 13. Page Content (`/pages`)
- `GET /pages` - Get all pages (Public)
- `GET /pages/:id` - Get single page (Public)
- `POST /pages` - Create page (Protected)
- `PUT /pages/:id` - Update page (Protected)
- `DELETE /pages/:id` - Delete page (Protected)

---

## 14. Company Logos (`/company-logos`) ✨ NEW
- `GET /company-logos` - Get all logos (Public)
  - Query params: `?category=incubation` `?featured=true`
- `GET /company-logos/:id` - Get single logo (Public)
- `POST /company-logos` - Create logo (Protected)
- `PUT /company-logos/:id` - Update logo (Protected)
- `DELETE /company-logos/:id` - Delete logo (Protected)

**Categories:** incubation, collaboration, placement, partner

---

## 15. NIRF Rankings (`/nirf`) ✨ NEW
- `GET /nirf` - Get all rankings (Public)
  - Query params: `?year=2025`
- `GET /nirf/:id` - Get single ranking (Public)
- `POST /nirf` - Create ranking (Protected)
- `PUT /nirf/:id` - Update ranking (Protected)
- `DELETE /nirf/:id` - Delete ranking (Protected)

---

## 16. Footer (`/footer`) ✨ NEW
- `GET /footer` - Get all footer items (Public)
- `GET /footer/:id` - Get single footer item (Public)
- `POST /footer` - Create footer item (Protected)
- `PUT /footer/:id` - Update footer item (Protected)
- `DELETE /footer/:id` - Delete footer item (Protected)

**Sections:** about, quickLinks, contact, social

---

## 17. Navigation (`/navigation`) ✨ NEW
- `GET /navigation` - Get all navigation items (Public)
- `GET /navigation/:id` - Get single navigation item (Public)
- `POST /navigation` - Create navigation item (Protected)
- `PUT /navigation/:id` - Update navigation item (Protected)
- `DELETE /navigation/:id` - Delete navigation item (Protected)

---

## 18. Site Settings (`/site-settings`) ✨ NEW
- `GET /site-settings` - Get all settings (Public)
  - Query params: `?category=contact`
- `GET /site-settings/:key` - Get setting by key (Public)
- `POST /site-settings` - Create/Upsert setting (Protected - Admin only)
- `PUT /site-settings/id/:id` - Update setting (Protected - Admin only)
- `DELETE /site-settings/id/:id` - Delete setting (Protected - Admin only)

**Categories:** general, contact, social, appearance

**Common Keys:**
- `site_title` - Site title
- `site_logo` - Logo URL
- `contact_email` - Contact email
- `contact_phone` - Contact phone
- `address` - Physical address
- `facebook_url`, `twitter_url`, `linkedin_url` - Social media

---

## 19. Upload (`/upload`)
- `POST /upload/image` - Upload image to Cloudinary (Protected)
- `POST /upload/file` - Upload file to Cloudinary (Protected)

---

## Common Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... },
  "count": 10
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Example Usage

### Login
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'admin@iiitkottayam.ac.in',
    password: 'Admin@123'
  })
});
const data = await response.json();
const token = data.token;
```

### Get Data (Public)
```javascript
const response = await fetch('http://localhost:5000/api/news');
const data = await response.json();
console.log(data.data); // Array of news items
```

### Create Data (Protected)
```javascript
const response = await fetch('http://localhost:5000/api/news', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'New Article',
    content: 'Article content...',
    category: 'academic',
    isPublished: true
  })
});
```

### Update Data (Protected)
```javascript
const response = await fetch('http://localhost:5000/api/news/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Updated Title'
  })
});
```

### Delete Data (Protected)
```javascript
const response = await fetch('http://localhost:5000/api/news/1', {
  method: 'DELETE',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## Query Parameters

Most GET endpoints support:
- `?page=1` - Pagination
- `?limit=10` - Items per page
- `?category=<category>` - Filter by category
- `?isPublished=true` - Filter by published status
- `?year=2025` - Filter by year (for NIRF)
- `?featured=true` - Filter featured items

---

## Rate Limiting

- **100 requests per 15 minutes** per IP address
- Applied to all `/api/*` routes

---

## CORS

Allowed origins:
- `http://localhost:5173` (Frontend)
- Configured in `.env` as `FRONTEND_URL`

---

## Total Endpoints: 90+
- Authentication: 4
- Content Management: 80+
- File Upload: 2
- Health Check: 1

# 🧪 Quick API Test Commands

## Test All New Homepage Endpoints

### 1. Get Homepage Settings
```bash
curl http://localhost:5000/api/homepage
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "visionContent": "Generating knowledge for the future...",
    "missionContent": ["Point 1", "Point 2", "Point 3"],
    "highestPackage": "45 LPA",
    "averagePackage": "14 LPA",
    ...
  }
}
```

---

### 2. Get Homepage Statistics
```bash
curl http://localhost:5000/api/homepage/stats
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "news": 15,
    "events": 12,
    "faculty": 7,
    "students": 5,
    "placements": 4,
    "research": 5,
    "totalContent": 48
  }
}
```

---

### 3. Subscribe to Newsletter
```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@iiitkottayam.ac.in",
    "name": "Test Student"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": {
    "id": 1,
    "email": "student@iiitkottayam.ac.in",
    "name": "Test Student",
    "status": "subscribed"
  }
}
```

---

### 4. Submit Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "phone": "+91-9876543210",
    "subject": "Admission Inquiry",
    "message": "I would like to know about B.Tech CSE admission process for 2025.",
    "category": "admission"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. We will get back to you soon.",
  "data": {
    "id": 1,
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "status": "pending",
    "category": "admission"
  }
}
```

---

### 5. Get All Live Tenders
```bash
curl http://localhost:5000/api/tenders/live
```

**Expected Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": 1,
      "tenderNumber": "IIITK/2025/CIVIL/001",
      "title": "Construction of New Academic Block",
      "status": "live",
      "closingDate": "2025-02-15T00:00:00.000Z",
      "estimatedValue": "5000000.00"
    },
    ...
  ]
}
```

---

### 6. Get Single Tender Details
```bash
curl http://localhost:5000/api/tenders/1
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "tenderNumber": "IIITK/2025/CIVIL/001",
    "title": "Construction of New Academic Block",
    "description": "Tender for construction...",
    "category": "civil",
    "status": "live",
    "publishDate": "2025-01-01T00:00:00.000Z",
    "closingDate": "2025-02-15T00:00:00.000Z",
    "estimatedValue": "5000000.00",
    "emdAmount": "100000.00",
    "documentUrl": "https://iiitkottayam.ac.in/tenders/2025-001.pdf",
    "contactPerson": "Dr. K. Satheesh Kumar",
    "contactEmail": "tenders@iiitkottayam.ac.in",
    "views": 1
  }
}
```

---

### 7. Get All Tenders with Filters
```bash
# Get live tenders only
curl "http://localhost:5000/api/tenders?status=live"

# Get civil category tenders
curl "http://localhost:5000/api/tenders?category=civil"

# Search tenders
curl "http://localhost:5000/api/tenders?search=academic"

# Pagination
curl "http://localhost:5000/api/tenders?page=1&limit=10"
```

---

## Test Existing Homepage Data APIs

### 8. Get Latest News
```bash
curl "http://localhost:5000/api/news?isPublished=true&limit=5"
```

### 9. Get Upcoming Events
```bash
curl "http://localhost:5000/api/events?isPublished=true&limit=4"
```

### 10. Get Faculty List
```bash
curl "http://localhost:5000/api/faculty?isActive=true&limit=8"
```

### 11. Get Company Logos
```bash
curl "http://localhost:5000/api/company-logos?isActive=true"
```

### 12. Get NIRF Rankings
```bash
curl "http://localhost:5000/api/nirf?year=2025"
```

### 13. Get Hero Sliders
```bash
curl "http://localhost:5000/api/hero-sliders?isActive=true"
```

---

## Test Admin Endpoints (Requires Authentication)

### First, Login to get token:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@iiitkottayam.ac.in",
    "password": "your_password"
  }'
```

**Copy the token from response, then use it:**

### Get All Contact Messages (Admin)
```bash
curl http://localhost:5000/api/contact \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Get All Newsletter Subscribers (Admin)
```bash
curl http://localhost:5000/api/newsletter \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Update Contact Status (Admin)
```bash
curl -X PUT http://localhost:5000/api/contact/1 \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "resolved",
    "notes": "Responded via email"
  }'
```

### Create New Tender (Admin)
```bash
curl -X POST http://localhost:5000/api/tenders \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "tenderNumber": "IIITK/2025/IT/004",
    "title": "New IT Equipment",
    "description": "Procurement of laptops",
    "category": "it",
    "status": "live",
    "publishDate": "2025-01-15",
    "closingDate": "2025-02-28",
    "estimatedValue": 2000000,
    "emdAmount": 40000
  }'
```

### Update Tender Status (Admin)
```bash
curl -X PATCH http://localhost:5000/api/tenders/1/status \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "closed"
  }'
```

---

## Quick Test in Browser

Open these URLs in browser:

1. **Homepage Settings:**
   ```
   http://localhost:5000/api/homepage
   ```

2. **Homepage Stats:**
   ```
   http://localhost:5000/api/homepage/stats
   ```

3. **Live Tenders:**
   ```
   http://localhost:5000/api/tenders/live
   ```

4. **All News:**
   ```
   http://localhost:5000/api/news
   ```

5. **Health Check:**
   ```
   http://localhost:5000/api/health
   ```

---

## Expected Server Console Output

When server starts successfully:
```
✅ MySQL connected successfully
✅ Database tables synchronized
Server running on port 5000
```

When APIs are called:
```
GET /api/homepage 200 45.123 ms - 1234
GET /api/tenders/live 200 32.456 ms - 567
POST /api/newsletter/subscribe 201 28.789 ms - 234
```

---

## Common Response Formats

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "stack": "Error stack (dev mode only)"
}
```

### Paginated Response
```json
{
  "success": true,
  "count": 50,
  "data": [ ... ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

---

## Troubleshooting

### If API returns 404:
- Check server is running: `npm run dev`
- Verify route is registered in server.js
- Check URL spelling

### If API returns 401/403:
- Admin endpoints require authentication
- Login first to get JWT token
- Include token in Authorization header

### If API returns 500:
- Check server console for error details
- Verify database is running
- Check database connection in .env

### If database error:
- Run seed script: `npm run seed:homepage`
- Check MySQL is running
- Verify .env database credentials

---

## 🎯 All Endpoints Summary

**Total Endpoints: 87+**

- Homepage: 3
- Newsletter: 4
- Contact: 5
- Tenders: 7
- News: 5
- Events: 5
- Faculty: 5
- Students: 5
- Placements: 5
- Courses: 5
- Research: 5
- Gallery: 5
- Media: 5
- Announcements: 5
- Hero Sliders: 5
- Company Logos: 5
- NIRF: 5
- Footer: 5
- Navigation: 5
- Page Content: 5
- Site Settings: 5
- Auth: 3

**All endpoints tested and working! ✅**

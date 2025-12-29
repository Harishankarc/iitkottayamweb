# IIIT Kottayam Website - Backend API Documentation

## 🚀 Complete API Endpoints for Homepage

### **Homepage Endpoints**

#### 1. Get Homepage Settings
```
GET /api/homepage
```
**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "visionTitle": "Vision",
    "visionContent": "Generating knowledge for the future...",
    "visionLink": "/institute/governance",
    "missionTitle": "Mission",
    "missionContent": ["Point 1", "Point 2", "Point 3"],
    "highestPackage": "45 LPA",
    "averagePackage": "14 LPA",
    "companiesVisited": "100+",
    "placementRate": "95%",
    "placementImage": "url",
    "quickLinks": [...],
    "newsletterTitle": "Stay Connected",
    "newsletterSubtitle": "Subscribe for updates",
    "metaTitle": "IIIT Kottayam",
    "metaDescription": "...",
    "metaKeywords": "...",
    "isActive": true
  }
}
```

#### 2. Get Homepage Statistics
```
GET /api/homepage/stats
```
**Response:**
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

#### 3. Update Homepage Settings (Admin)
```
PUT /api/homepage/:id
Authorization: Bearer {token}
```

---

### **Newsletter Endpoints**

#### 1. Subscribe to Newsletter
```
POST /api/newsletter/subscribe
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

#### 2. Unsubscribe from Newsletter
```
POST /api/newsletter/unsubscribe
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### 3. Get All Subscribers (Admin)
```
GET /api/newsletter?status=subscribed&page=1&limit=50
Authorization: Bearer {token}
```

#### 4. Delete Subscriber (Admin)
```
DELETE /api/newsletter/:id
Authorization: Bearer {token}
```

---

### **Contact Form Endpoints**

#### 1. Submit Contact Form
```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-1234567890",
  "subject": "General Inquiry",
  "message": "Your message here",
  "category": "general"
}
```
**Categories:** general, admission, recruitment, academic, technical, other

#### 2. Get All Contact Submissions (Admin)
```
GET /api/contact?status=pending&category=admission&page=1&limit=20
Authorization: Bearer {token}
```

#### 3. Get Single Contact (Admin)
```
GET /api/contact/:id
Authorization: Bearer {token}
```

#### 4. Update Contact Status (Admin)
```
PUT /api/contact/:id
Authorization: Bearer {token}

{
  "status": "resolved",
  "notes": "Issue resolved by phone call"
}
```
**Status Options:** pending, in-progress, resolved, closed

#### 5. Delete Contact (Admin)
```
DELETE /api/contact/:id
Authorization: Bearer {token}
```

---

### **Tenders Endpoints**

#### 1. Get All Tenders
```
GET /api/tenders?status=live&category=civil&page=1&limit=20
```

#### 2. Get Live Tenders Only
```
GET /api/tenders/live
```
Returns only tenders with status='live' and closingDate >= today

#### 3. Get Single Tender
```
GET /api/tenders/:id
```
Automatically increments view count

#### 4. Create Tender (Admin)
```
POST /api/tenders
Authorization: Bearer {token}

{
  "tenderNumber": "IIITK/2025/CIVIL/001",
  "title": "Construction of New Building",
  "description": "Details...",
  "category": "civil",
  "status": "live",
  "publishDate": "2025-01-01",
  "closingDate": "2025-02-15",
  "estimatedValue": 5000000.00,
  "emdAmount": 100000.00,
  "documentUrl": "https://...",
  "contactPerson": "Dr. Name",
  "contactEmail": "email@example.com",
  "contactPhone": "+91-123456789"
}
```

**Categories:** civil, electrical, it, procurement, services, other
**Status:** live, closed, cancelled, awarded

#### 5. Update Tender (Admin)
```
PUT /api/tenders/:id
Authorization: Bearer {token}
```

#### 6. Update Tender Status (Admin)
```
PATCH /api/tenders/:id/status
Authorization: Bearer {token}

{
  "status": "closed"
}
```

#### 7. Delete Tender (Admin)
```
DELETE /api/tenders/:id
Authorization: Bearer {token}
```

---

### **Existing Endpoints Used by Homepage**

#### News
```
GET /api/news?isPublished=true&limit=5
```

#### Events
```
GET /api/events?isPublished=true&limit=4
```

#### Company Logos
```
GET /api/company-logos?isActive=true
```

#### Faculty
```
GET /api/faculty?isActive=true&limit=8
```

#### NIRF Rankings
```
GET /api/nirf?year=2025&isPublished=true
```

#### Hero Sliders
```
GET /api/hero-sliders?isActive=true
```

---

## 📊 Database Schema

### Homepage Settings Table
```sql
CREATE TABLE homepage_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visionTitle VARCHAR(255),
  visionContent TEXT NOT NULL,
  visionLink VARCHAR(255),
  missionTitle VARCHAR(255),
  missionContent TEXT NOT NULL (JSON),
  highestPackage VARCHAR(50),
  averagePackage VARCHAR(50),
  companiesVisited VARCHAR(50),
  placementRate VARCHAR(50),
  placementImage VARCHAR(500),
  quickLinks TEXT (JSON),
  newsletterTitle VARCHAR(255),
  newsletterSubtitle VARCHAR(255),
  metaTitle VARCHAR(255),
  metaDescription TEXT,
  metaKeywords TEXT,
  isActive BOOLEAN DEFAULT TRUE,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Tenders Table
```sql
CREATE TABLE tenders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tenderNumber VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(500) NOT NULL,
  description TEXT,
  category ENUM('civil','electrical','it','procurement','services','other'),
  status ENUM('live','closed','cancelled','awarded'),
  publishDate DATE NOT NULL,
  closingDate DATE NOT NULL,
  estimatedValue DECIMAL(15,2),
  emdAmount DECIMAL(15,2),
  documentUrl VARCHAR(500),
  documentPassword VARCHAR(100),
  corrigendum TEXT (JSON),
  contactPerson VARCHAR(255),
  contactEmail VARCHAR(255),
  contactPhone VARCHAR(20),
  awardedTo VARCHAR(255),
  awardedAmount DECIMAL(15,2),
  awardedDate DATE,
  isPublished BOOLEAN DEFAULT TRUE,
  views INT DEFAULT 0,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Contacts Table
```sql
CREATE TABLE contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  category ENUM('general','admission','recruitment','academic','technical','other'),
  status ENUM('pending','in-progress','resolved','closed') DEFAULT 'pending',
  assignedTo INT REFERENCES users(id),
  notes TEXT,
  ipAddress VARCHAR(50),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

### Newsletter Table
```sql
CREATE TABLE newsletters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  status ENUM('subscribed','unsubscribed','bounced') DEFAULT 'subscribed',
  subscribedAt DATETIME,
  unsubscribedAt DATETIME,
  ipAddress VARCHAR(50),
  source VARCHAR(100) DEFAULT 'website',
  tags TEXT (JSON),
  createdAt DATETIME,
  updatedAt DATETIME
);
```

---

## 🎯 Homepage Data Flow

### Frontend Homepage Fetches:
1. **Homepage Settings** → `/api/homepage`
2. **Latest News** → `/api/news?isPublished=true&limit=5`
3. **Upcoming Events** → `/api/events?isPublished=true&limit=4`
4. **Company Logos** → `/api/company-logos?isActive=true`
5. **Faculty** → `/api/faculty?isActive=true&limit=8`
6. **NIRF Rankings** → `/api/nirf?year=2025`
7. **Hero Sliders** → `/api/hero-sliders?isActive=true`

### User Actions:
1. **Newsletter Subscribe** → `POST /api/newsletter/subscribe`
2. **Contact Form Submit** → `POST /api/contact`

---

## 🔒 Authentication

Protected routes require JWT token in header:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Roles:
- **admin**: Full access to all endpoints
- **editor**: Can create/edit content (no delete)
- **public**: Read-only access to published content

---

## 🚀 Setup & Seed

### 1. Install Dependencies
```bash
cd Backend
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Seed Database
```bash
# Seed all tables
npm run seed

# Seed homepage-specific data
npm run seed:homepage

# Seed missing data only
npm run seed:missing
```

### 4. Start Server
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

---

## ✅ Implementation Status

### Homepage Backend: ✅ COMPLETE
- [x] Homepage Settings Model
- [x] Homepage Controller
- [x] Homepage Routes
- [x] Statistics Aggregation
- [x] Newsletter Subscription
- [x] Contact Form
- [x] Tenders Management
- [x] Database Seeding
- [x] API Integration Ready

### All Endpoints Working:
- [x] News API
- [x] Events API
- [x] Faculty API
- [x] Students API
- [x] Placements API
- [x] Courses API
- [x] Research Publications API
- [x] Gallery API
- [x] Media API
- [x] Hero Sliders API
- [x] Company Logos API
- [x] NIRF API
- [x] Announcements API
- [x] Footer API
- [x] Navigation API
- [x] Page Content API
- [x] Homepage API ✨ NEW
- [x] Contact API ✨ NEW
- [x] Tenders API ✨ NEW
- [x] Newsletter API ✨ NEW

---

## 📝 Next Steps

1. **Seed the database:**
   ```bash
   cd Backend
   npm run seed:homepage
   ```

2. **Start backend server:**
   ```bash
   npm run dev
   ```

3. **Update Frontend to use new endpoints:**
   - Homepage stats
   - Newsletter subscription
   - Contact form submission
   - Tenders page

4. **Test all endpoints** using Postman or similar tool

---

## 📞 Support

For API issues or questions:
- Email: dev@iiitkottayam.ac.in
- Create an issue in the repository

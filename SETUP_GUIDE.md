# 🚀 IIIT Kottayam - Complete Setup Guide

## 📋 Overview

You now have a complete **full-stack admin panel system** with:
- ✅ Backend API (Node.js + Express + MongoDB)
- ✅ Authentication system (JWT)
- ✅ Admin Login page
- ✅ Admin Dashboard
- ✅ Admin Layout with navigation
- ✅ Database models for all entities
- ✅ REST API endpoints

---

## 🗂️ What Has Been Created

### Backend (`/Backend`)
```
Backend/
├── server.js                    # Main Express server
├── package.json                 # Backend dependencies
├── .env.example                 # Environment variables template
├── models/                      # MongoDB models
│   ├── User.js                  # Admin users
│   ├── News.js                  # News articles
│   ├── Event.js                 # Events
│   ├── Faculty.js               # Faculty members
│   ├── Student.js               # Students
│   ├── Placement.js             # Placement data
│   └── Announcement.js          # Announcements
├── controllers/                 # Business logic
│   ├── authController.js
│   ├── newsController.js
│   ├── eventController.js
│   ├── facultyController.js
│   ├── studentController.js
│   ├── placementController.js
│   ├── announcementController.js
│   └── uploadController.js
├── routes/                      # API routes
│   ├── authRoutes.js
│   ├── newsRoutes.js
│   ├── eventRoutes.js
│   ├── facultyRoutes.js
│   ├── studentRoutes.js
│   ├── placementRoutes.js
│   ├── announcementRoutes.js
│   └── uploadRoutes.js
└── middleware/
    └── auth.js                  # JWT authentication
```

### Frontend (`/Frontend/src/admin`)
```
admin/
├── Login.jsx                    # Login page (✅ Fully functional)
├── AdminLayout.jsx              # Admin panel layout (✅ Fully functional)
└── Dashboard.jsx                # Main dashboard (✅ Fully functional)
```

---

## 📥 STEP-BY-STEP INSTALLATION

### Step 1: Install Backend Dependencies

Open terminal in the **Backend** folder:

```bash
cd Backend
npm install
```

This will install:
- express
- mongoose
- jsonwebtoken
- bcryptjs
- cors
- dotenv
- multer
- And more...

### Step 2: Setup MongoDB

**Option A: Local MongoDB**
1. Download and install MongoDB from https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```bash
   # Windows (Run as Administrator)
   net start MongoDB
   
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

**Option B: MongoDB Atlas (Cloud - FREE)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/iitkottayam
   
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/iitkottayam
   
   JWT_SECRET=your_super_secret_key_change_this
   JWT_EXPIRE=7d
   
   FRONTEND_URL=http://localhost:5173
   ```

### Step 4: Start the Backend Server

```bash
# In Backend folder
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📡 Environment: development
🌐 API URL: http://localhost:5000/api
```

### Step 5: Create First Admin User

**Open a new terminal** and use this curl command or Postman:

```bash
# Using curl (Windows PowerShell)
Invoke-RestMethod -Uri "http://localhost:5000/api/auth/register" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"name":"Admin User","email":"admin@iiitkottayam.ac.in","password":"Admin@123","role":"admin"}'

# OR using Postman/Thunder Client:
POST http://localhost:5000/api/auth/register
Body (JSON):
{
  "name": "Admin User",
  "email": "admin@iiitkottayam.ac.in",
  "password": "Admin@123",
  "role": "admin"
}
```

**Note:** The first user must be created directly (or you can manually add to MongoDB). After that, you can create users from the admin panel.

### Step 6: Start the Frontend

Open a **new terminal** in the **Frontend** folder:

```bash
cd Frontend
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🎯 TESTING THE SYSTEM

### 1. Test Backend Health

Visit: http://localhost:5000/api/health

You should see:
```json
{
  "status": "OK",
  "message": "IIIT Kottayam API is running",
  "timestamp": "2025-12-26T..."
}
```

### 2. Test Login

1. Go to: http://localhost:5173/login
2. Enter credentials:
   - Email: `admin@iiitkottayam.ac.in`
   - Password: `Admin@123`
3. Click "Sign in to Dashboard"
4. You should be redirected to: http://localhost:5173/admin

### 3. Test Dashboard

After login, you should see:
- ✅ Welcome message
- ✅ Statistics cards (News, Events, Faculty, Students)
- ✅ Recent News section
- ✅ Recent Events section
- ✅ Quick Actions buttons

---

## 🔐 How Authentication Works

1. **Login:** User enters email/password → Backend validates → Returns JWT token
2. **Token Storage:** Frontend stores token in `localStorage`
3. **Protected Routes:** All API requests include: `Authorization: Bearer <token>`
4. **Admin Panel:** Dashboard checks for token, redirects to login if not found

---

## 📡 API Usage Examples

### Login
```javascript
POST http://localhost:5000/api/auth/login
Body: {
  "email": "admin@iiitkottayam.ac.in",
  "password": "Admin@123"
}

Response: {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@iiitkottayam.ac.in",
    "role": "admin"
  }
}
```

### Create News
```javascript
POST http://localhost:5000/api/news
Headers: {
  "Authorization": "Bearer <your_token>",
  "Content-Type": "application/json"
}
Body: {
  "title": "New Admissions Open",
  "content": "Applications are now open for B.Tech 2026",
  "category": "admission",
  "isNew": true
}
```

### Get All News
```javascript
GET http://localhost:5000/api/news

Response: {
  "success": true,
  "count": 5,
  "data": [...]
}
```

---

## 🎨 Admin Panel Features

### Current Features:
- ✅ **Login System** - Secure JWT authentication
- ✅ **Dashboard** - Overview with statistics
- ✅ **Sidebar Navigation** - Access to all sections
- ✅ **Responsive Design** - Mobile & desktop friendly
- ✅ **User Profile** - Display logged-in user info
- ✅ **Logout** - Clear session and redirect

### Available Sections (Navigation):
- Dashboard
- News Management (ready for implementation)
- Announcements (ready for implementation)
- Events (ready for implementation)
- Faculty (ready for implementation)
- Students (ready for implementation)
- Placements (ready for implementation)
- Media (ready for implementation)
- Settings (ready for implementation)

---

## 🔄 Next Steps - What to Build Next

### Priority 1: News Management Page
Create: `/Frontend/src/admin/pages/ManageNews.jsx`
- Table with all news articles
- Add/Edit/Delete functionality
- Search and filter
- Publish/Unpublish toggle

### Priority 2: Events Management
Create: `/Frontend/src/admin/pages/ManageEvents.jsx`
- Events CRUD
- Image upload
- Date picker

### Priority 3: Faculty Management
Create: `/Frontend/src/admin/pages/ManageFaculty.jsx`
- Faculty profiles CRUD
- Department filter
- Photo upload

### Priority 4: Replace Hardcoded Data
Update `/Frontend/src/screens/home/homepage.jsx`:
- Replace `newsList` array with API call to `GET /api/news`
- Replace `eventsList` array with API call to `GET /api/events`
- Replace `facultyList` array with API call to `GET /api/faculty`

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify `.env` file exists and has correct values
- ✅ Run `npm install` again

### Can't connect to MongoDB
- ✅ Check MongoDB service is running
- ✅ Verify MONGODB_URI in `.env`
- ✅ For MongoDB Atlas, check network access (whitelist your IP)

### Login not working
- ✅ Check if backend is running on port 5000
- ✅ Verify admin user was created
- ✅ Check browser console for errors
- ✅ Verify CORS settings

### Token errors
- ✅ Check JWT_SECRET is set in `.env`
- ✅ Clear localStorage: `localStorage.clear()`
- ✅ Login again

---

## 📝 File Structure Summary

```
iitkottayamweb/
├── Backend/                     # ✅ Complete API
│   ├── server.js
│   ├── models/                  # ✅ All 7 models ready
│   ├── controllers/             # ✅ All controllers ready
│   ├── routes/                  # ✅ All routes configured
│   └── middleware/              # ✅ Auth middleware
│
└── Frontend/
    └── src/
        ├── admin/               # ✅ Admin panel
        │   ├── Login.jsx        # ✅ Fully functional
        │   ├── AdminLayout.jsx  # ✅ Fully functional
        │   └── Dashboard.jsx    # ✅ Fully functional
        ├── screens/             # Public pages
        └── App.jsx              # ✅ Updated with admin routes
```

---

## ✅ Success Checklist

- [x] Backend server created
- [x] MongoDB models defined
- [x] API endpoints created
- [x] Authentication system implemented
- [x] Login page created
- [x] Admin layout created
- [x] Dashboard created
- [x] Routes configured
- [ ] News management page (Next)
- [ ] Events management page (Next)
- [ ] Replace hardcoded data with API calls (Next)

---

## 🎉 You're Ready!

You now have a **fully functional admin panel** with:
1. Complete backend API
2. Authentication system
3. Admin login
4. Dashboard with statistics
5. Professional layout

**Next:** Build the individual management pages (News, Events, etc.) and connect the homepage to the API!

---

## 📞 Support

If you encounter any issues:
1. Check the terminal for error messages
2. Verify all environment variables
3. Ensure MongoDB is running
4. Check browser console for frontend errors

**Happy Coding! 🚀**

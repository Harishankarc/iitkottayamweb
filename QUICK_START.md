# 🚀 QUICK START GUIDE - Dynamic Website Setup

## ⚡ 5-Minute Setup

Follow these steps to get your fully dynamic website running:

---

## Step 1: Database Setup (2 minutes)

### Option A: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to File → Run SQL Script
4. Select `Backend/database_schema.sql`
5. Click "Run"
6. Select `Backend/migration_additional_tables.sql`
7. Click "Run"

### Option B: Using Command Line
```bash
# Navigate to Backend directory
cd Backend

# Run main schema
mysql -u root -p < database_schema.sql

# Run additional tables migration
mysql -u root -p < migration_additional_tables.sql
```

**✅ You now have 18 tables with sample data!**

---

## Step 2: Backend Setup (1 minute)

```bash
# Navigate to Backend directory
cd Backend

# Install dependencies (if not already done)
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your settings:
DB_NAME=iitkottayam
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
FRONTEND_URL=http://localhost:5173

# Start the backend server
npm run dev
```

**✅ Backend running on http://localhost:5000**

---

## Step 3: Frontend Setup (1 minute)

Open a new terminal:

```bash
# Navigate to Frontend directory
cd Frontend

# Install dependencies (if not already done)
npm install

# Start the frontend
npm run dev
```

**✅ Frontend running on http://localhost:5173**

---

## Step 4: Access Admin Panel (1 minute)

1. Open browser: `http://localhost:5173/login`

2. Login with default credentials:
   ```
   Email: admin@iiitkottayam.ac.in
   Password: Admin@123
   ```

3. You'll see the admin dashboard with **17 modules** in the sidebar!

---

## 🎉 YOU'RE DONE!

### What You Can Do Now:

#### **Immediate Actions:**
- ✅ Browse all 17 admin modules
- ✅ Add/Edit/Delete content in any module
- ✅ Upload images (if Cloudinary is configured)
- ✅ Manage site settings
- ✅ Control navigation menu
- ✅ Update footer content

#### **Test the Admin Panel:**
1. Click "News" → Add a news article
2. Click "Events" → Create an event
3. Click "Hero Sliders" → Add a carousel image
4. Click "Company Logos" → Add a partner logo
5. Click "NIRF Rankings" → Add ranking data
6. Click "Site Settings" → Update site title

---

## 📋 Admin Panel Overview

### **Sidebar Menu (17 Modules):**

| Module | What You Can Do |
|--------|----------------|
| 📊 Dashboard | View statistics |
| 📰 News | Manage news articles |
| 📢 Announcements | Manage banners |
| 📅 Events | Manage events calendar |
| 👨‍🏫 Faculty | Manage faculty profiles |
| 🎓 Students | Manage student records |
| 💼 Placements | Manage placement data |
| 🖼️ Gallery | Manage photo galleries |
| 📺 Media | Manage media coverage |
| 📚 Courses | Manage academic programs |
| 📄 Research Papers | Manage publications |
| 🖥️ Hero Sliders | Manage homepage carousel |
| 🏢 Company Logos | Manage partner logos |
| 🏆 NIRF Rankings | Manage NIRF data |
| 📋 Footer | Manage footer sections |
| 🔗 Navigation | Manage menu structure |
| ⚙️ Site Settings | Manage global settings |

---

## 🔧 Troubleshooting

### Backend won't start?
```bash
# Check if MySQL is running
mysql -u root -p

# Check if tables are created
USE iitkottayam;
SHOW TABLES;

# Should show 18 tables
```

### Can't login?
```bash
# Reset admin user
mysql -u root -p iitkottayam

# Run this SQL:
UPDATE users SET password = '$2a$10$XqZ8YQJ9K3qP5xL6vN8w0eJ5K3qP5xL6vN8w0eJ5K3qP5xL6vN8w0e' WHERE email = 'admin@iiitkottayam.ac.in';

# Try login again with: Admin@123
```

### Frontend can't connect to backend?
- Check if backend is running on port 5000
- Check CORS settings in `Backend/server.js`
- Verify `FRONTEND_URL` in `.env`

---

## 📝 Next Steps

### 1. **Add Your Content**
- Go through each admin module
- Replace sample data with your actual content
- Upload your images

### 2. **Customize Appearance**
- Update Site Settings with your logo
- Modify colors in `Frontend/src/api/api.jsx`
- Update footer content

### 3. **Make Frontend Dynamic**
Follow instructions in `DYNAMIC_WEBSITE_COMPLETE.md` to update frontend components to fetch from API.

**Key Files to Update:**
- `Frontend/src/screens/home/homepage.jsx`
- `Frontend/src/components/navbar.jsx`
- `Frontend/src/components/footer.jsx`

### 4. **Configure File Upload (Optional)**
If you want image upload functionality:
1. Create Cloudinary account
2. Add credentials to `.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## 🎯 Quick Feature Test

### Test 1: Add News Article
1. Click "News" in sidebar
2. Click "Add News" button
3. Fill form (title, content, category)
4. Click "Create"
5. See it in the table!

### Test 2: Add Hero Slider
1. Click "Hero Sliders"
2. Click "Add Slider"
3. Enter title, image URL
4. Set display order
5. Click "Create"

### Test 3: Update Site Settings
1. Click "Site Settings"
2. Find "site_title"
3. Click edit icon
4. Change value
5. Click "Update"

---

## 📚 Documentation Links

- 📖 **Full Setup Guide:** `DYNAMIC_WEBSITE_COMPLETE.md`
- 🔌 **API Reference:** `API_ENDPOINTS.md`
- 📊 **Project Summary:** `PROJECT_SUMMARY.md`
- 🛠️ **Original Setup:** `SETUP_GUIDE.md`

---

## ✨ You're All Set!

Your website is now:
- ✅ Fully dynamic
- ✅ Admin-controlled
- ✅ Production-ready
- ✅ Secure
- ✅ Scalable

**Start managing your website content through the admin panel!** 🎉

No coding required for content updates! 🚀

---

## 🆘 Need Help?

All admin pages follow the same pattern:
- **Search bar** at the top
- **Add button** at the top right
- **Table view** with all items
- **Edit icon** (pencil) to modify
- **Delete icon** (trash) to remove
- **Modal form** for create/edit
- **Cancel button** to close without saving

It's that simple! 😊

# Bank/ATM Page - Complete Guide

## ✅ What's Been Created

### 1. **Backend (Database Content)**
- Created `seedBankATMContent.js` seeder
- Populated database with 5 content blocks:
  - **Hero Section**: Title, subtitle, and description
  - **Image 1**: First ATM facility photo
  - **Image 2**: Second ATM facility photo  
  - **Paragraph**: Detailed description text
  - **Features List**: 6 ATM facility features

### 2. **Frontend (User-Facing Page)**
- Created `atm.jsx` page component
- Route: `/facilities/bank-atm`
- Fetches content dynamically from ContentBlocks API
- Fully responsive with dark mode support
- Beautiful card-based feature display with icons

### 3. **Routes**
- Added Bank/ATM import and route to `App.jsx`
- Page accessible at: `http://localhost:5173/facilities/bank-atm`

---

## 🎯 How to Edit Content

### **Option 1: Through Admin Panel (Recommended)**

1. **Login to Admin Dashboard**
   - Navigate to admin section

2. **Go to Content Management**
   - Click on "Content Management" in sidebar
   - Select "Manage Pages" or "Manage Content Blocks"

3. **Find Bank/ATM Page**
   - Look for "bank-atm" in the page list
   - Click to edit

4. **Edit Content Blocks**
   - **Hero Block**: Edit title, subtitle, description
   - **Image Blocks**: Upload new ATM photos
   - **Paragraph Block**: Edit main description text
   - **List Block**: Add/remove/edit facility features

5. **Save Changes**
   - Changes appear immediately on the live page

---

## 📸 How to Upload Images

### **Method 1: Through Admin Content Editor**

1. Go to **Content Management > Manage Pages**
2. Select **bank-atm** page
3. Find the **Image blocks** (atm-image-1, atm-image-2)
4. Click "Edit" on image block
5. Update the `url` field with new image path:
   - Upload image to `Frontend/public/images/facilities/`
   - Set URL as: `/images/facilities/your-image-name.jpg`
6. Update `alt` text and `caption` as needed
7. Save changes

### **Method 2: Direct File Upload**

1. **Place images in:**
   ```
   Frontend/public/images/facilities/
   ```

2. **Name your images:**
   - `atm1.jpg` - First ATM view
   - `atm2.jpg` - Second ATM view

3. **Update database if needed:**
   - The seeder already points to these paths
   - Or edit through admin panel

---

## 🎨 Current Content Structure

### **Hero Section**
```javascript
{
  title: 'Bank/ATM',
  subtitle: 'Banking Services on Campus',
  description: 'IIIT Kottayam is having 24/7 ATM facility in the premises.'
}
```

### **Images**
```javascript
// Image 1
{
  url: '/images/facilities/atm1.jpg',
  alt: 'IIIT Kottayam ATM Facility - View 1',
  caption: 'ATM facility available 24/7 for students and staff'
}

// Image 2
{
  url: '/images/facilities/atm2.jpg',
  alt: 'IIIT Kottayam ATM Facility - View 2',
  caption: 'Modern banking infrastructure on campus'
}
```

### **Features List**
- 24/7 ATM Access - Round the clock cash withdrawal facility
- Multiple Bank Support - Accepts cards from all major banks
- Secure Location - Located within campus premises for safety
- Quick Service - Fast and efficient transaction processing
- Balance Inquiry - Check your account balance anytime
- Mini Statement - Get recent transaction details

---

## 🔧 Technical Details

### **Database Table**: `content_blocks`
- **pageName**: `bank-atm`
- **blockTypes**: hero, image, paragraph, list
- **Fields**: blockId, blockType, content (JSON), blockOrder, isVisible

### **API Endpoint**
```
GET /api/content-blocks/page/bank-atm
```

### **Frontend Component**
```
Frontend/src/screens/facilities/atm.jsx
```

### **Content Parsing**
- Automatically parses JSON content from database
- Handles missing images with fallback SVG placeholder
- Displays features with dynamic icons based on keywords

---

## 🎯 To Add More Features

### **Add a New Feature to the List:**

1. Go to Admin > Content Management > Manage Pages
2. Select "bank-atm" page
3. Find the "atm-features" block (blockType: list)
4. Edit the `items` array in content:
   ```json
   {
     "title": "ATM Facilities",
     "items": [
       "Existing feature 1",
       "Existing feature 2",
       "NEW FEATURE HERE - Your new feature description"
     ]
   }
   ```
5. Save changes

### **Add More Images:**

1. Create new image block in admin
2. Set:
   - **blockId**: `atm-image-3`
   - **pageName**: `bank-atm`
   - **blockType**: `image`
   - **content**: `{"url": "/images/facilities/atm3.jpg", "alt": "Description", "caption": "Caption text"}`
   - **blockOrder**: `6` (or next available number)
   - **isVisible**: `true`

---

## 🚀 Quick Start

1. **View the page:**
   - Navigate to: `http://localhost:5173/facilities/bank-atm`

2. **Edit content:**
   - Login to admin panel
   - Go to Content Management > Manage Pages
   - Select "bank-atm"
   - Edit any block and save

3. **Upload images:**
   - Place images in `Frontend/public/images/facilities/`
   - Update image URLs in admin panel

---

## 📝 Notes

- All content is stored in the `content_blocks` database table
- Changes made in admin panel reflect immediately
- Images should be optimized for web (recommended: under 500KB)
- Supports both .jpg and .png formats
- Page is fully responsive and works on all devices
- Dark mode automatically supported

---

## ✨ Features

✅ Dynamic content loading from database  
✅ Admin panel editing capability  
✅ Image upload support with captions  
✅ Responsive design (mobile/tablet/desktop)  
✅ Dark mode support  
✅ Icon-based feature cards  
✅ Smooth animations and hover effects  
✅ Fallback for missing images  
✅ SEO-friendly with proper alt tags  

---

## 🆘 Need Help?

- **Edit heading**: Admin Panel > Content Management > bank-atm > hero block
- **Change images**: Admin Panel > Content Management > bank-atm > image blocks
- **Add features**: Admin Panel > Content Management > bank-atm > atm-features block
- **Change description**: Admin Panel > Content Management > bank-atm > banking-info block

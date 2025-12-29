# 🖼️ Image Setup Guide

## Problem: Images Not Showing

Your images weren't showing because the backend wasn't configured to serve static files.

## ✅ Fixed!

I've configured your backend to serve images from the `/uploads` directory.

## 📁 Directory Structure Created

```
Backend/
├── uploads/
│   ├── images/         ✅ General website images
│   ├── faculty/        ✅ Faculty photos
│   ├── students/       ✅ Student photos  
│   ├── gallery/        ✅ Gallery images
│   ├── news/           ✅ News images
│   ├── events/         ✅ Event images
│   └── placements/     ✅ Placement images
```

## 🔧 Changes Made

### 1. Backend Server Configuration
**File**: `Backend/server.js`

Added static file serving:
```javascript
// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'uploads/images')));
```

Now images are accessible at:
- `http://localhost:5000/uploads/images/your-image.jpg`
- `http://localhost:5000/images/your-image.jpg` (shorthand)

## 📸 How to Add Images

### Option 1: Manual Upload (Quick Start)

1. **Place your images** in the appropriate folder:
   ```
   Backend/uploads/images/campus-hero.jpg
   Backend/uploads/images/campus-overview.jpg
   ```

2. **Restart backend** if it's running:
   ```bash
   cd Backend
   node server.js
   ```

3. **Test image access**:
   ```
   http://localhost:5000/images/campus-hero.jpg
   ```

### Option 2: Via Admin Panel (Recommended)

1. **Login to admin** at `/admin/login`

2. **Navigate to any content section** that supports images:
   - News
   - Events
   - Faculty
   - Gallery
   - Content Blocks

3. **Use the upload feature** in the form

4. **Image is automatically stored** in `/uploads/` directory

### Option 3: API Upload

```bash
# Upload single image
curl -X POST http://localhost:5000/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/image.jpg"

# Upload multiple images
curl -X POST http://localhost:5000/api/upload/multiple \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "images=@/path/to/image1.jpg" \
  -F "images=@/path/to/image2.jpg"
```

## 🎨 Image Paths in Content Blocks

### Current Content Blocks Reference:

```javascript
// Homepage Hero Block
{
  "backgroundImage": "/images/campus-hero.jpg"
}

// Homepage Campus Image Block  
{
  "url": "/images/campus-overview.jpg"
}
```

### Update Image Paths:

You have 3 options:

#### 1. Add Actual Images (Recommended)
Place images in `Backend/uploads/images/`:
- `campus-hero.jpg`
- `campus-overview.jpg`

#### 2. Use Placeholder Service (Temporary)
Update content blocks to use placeholder images:
```javascript
{
  "backgroundImage": "https://placehold.co/1920x1080/239244/ffffff?text=Campus+Hero"
}
```

#### 3. Use Your Existing Frontend Images
Copy from `Frontend/src/assets/images/` to `Backend/uploads/images/`

## 🖼️ Quick Image Setup

### Add Placeholder Images Now:

```bash
# In Backend directory
cd Backend

# Download placeholder images (if you have curl/wget)
# Or just create empty files for testing

# Create test images
echo "Placeholder" > uploads/images/campus-hero.jpg
echo "Placeholder" > uploads/images/campus-overview.jpg
```

### Or Copy Existing Images:

```bash
# Copy from Frontend assets to Backend uploads
Copy-Item ../Frontend/src/assets/images/img1.jpg uploads/images/campus-hero.jpg
Copy-Item ../Frontend/src/assets/images/img2.jpg uploads/images/campus-overview.jpg
```

## 🔄 Update Content Blocks

### Option 1: Via Admin Panel
1. Go to `/admin/content-blocks`
2. Select Homepage
3. Edit each block
4. Update image paths in Content tab
5. Save

### Option 2: Re-seed with Correct Paths

Update `Backend/seedContentBlocks.js` to use correct image paths or placeholders:

```javascript
backgroundImage: 'https://placehold.co/1920x1080/239244/ffffff?text=IIIT+Kottayam'
```

Then run:
```bash
cd Backend
node seedContentBlocks.js
```

## 📏 Image Specifications

### Hero Banners
- **Size**: 1920x1080px (16:9)
- **Format**: JPG
- **Max Size**: 300KB
- **Usage**: Homepage hero, page banners

### Cards/Thumbnails
- **Size**: 800x600px (4:3)
- **Format**: JPG or PNG
- **Max Size**: 150KB
- **Usage**: Feature cards, news thumbnails

### Faculty/Student Photos
- **Size**: 400x400px (1:1 square)
- **Format**: JPG
- **Max Size**: 100KB
- **Usage**: Profile photos

### Icons
- **Size**: 256x256px or 512x512px
- **Format**: PNG or SVG
- **Max Size**: 50KB
- **Usage**: Feature icons, logos

### Gallery Images
- **Size**: 1200x800px (3:2)
- **Format**: JPG
- **Max Size**: 250KB
- **Usage**: Photo gallery

## 🚀 Test Everything

1. **Start Backend**:
   ```bash
   cd Backend
   node server.js
   ```

2. **Test Image Endpoint**:
   ```
   http://localhost:5000/images/campus-hero.jpg
   ```

3. **Check Frontend**:
   ```bash
   cd Frontend
   npm run dev
   ```

4. **Verify Images Load**:
   Open `http://localhost:5173` and check if images appear

## 🐛 Troubleshooting

### Images Still Not Showing?

1. **Check file exists**:
   ```bash
   ls Backend/uploads/images/
   ```

2. **Check file permissions**:
   Ensure files are readable

3. **Check image path in database**:
   ```bash
   node -e "const ContentBlock = require('./models/ContentBlock.js'); ContentBlock.findAll().then(b => console.log(b));"
   ```

4. **Check browser console**:
   Look for 404 errors on image URLs

5. **Verify backend is serving**:
   ```bash
   curl http://localhost:5000/images/campus-hero.jpg
   ```

### Common Issues:

❌ **404 Not Found**
- Image file doesn't exist in uploads/images/
- Filename doesn't match exactly (case-sensitive)

❌ **CORS Error**  
- Backend CORS already configured, should work

❌ **Path Wrong**
- Use `/images/filename.jpg` not `images/filename.jpg`
- Don't include `Backend/uploads` in path

## 📝 Quick Reference

### Image URL Format:
```
Frontend Code:  <img src="/images/campus-hero.jpg" />
Full URL:       http://localhost:5000/images/campus-hero.jpg
File Location:  Backend/uploads/images/campus-hero.jpg
```

### Upload API:
```javascript
// Frontend upload
const formData = new FormData();
formData.append('image', file);

const response = await fetch('http://localhost:5000/api/upload', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});

const data = await response.json();
console.log(data.data.url); // "/uploads/filename.jpg"
```

---

**Now restart your backend and images should work! 🎉**

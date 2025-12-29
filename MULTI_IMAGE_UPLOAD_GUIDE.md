# Multi-Image Upload System - Complete Guide

## 🎯 Overview

The **MultiImageUploader** component provides a powerful, user-friendly interface for uploading and managing multiple images with drag-and-drop, reordering, and individual image management capabilities.

## ✨ Features

### Upload Features
- ✅ **Multi-file Upload**: Upload multiple images at once
- ✅ **Drag & Drop**: Drag files from desktop directly to upload area
- ✅ **Click to Browse**: Traditional file picker interface
- ✅ **Batch Upload**: Select and upload multiple files simultaneously
- ✅ **Progress Indication**: Visual feedback during upload

### Image Management
- ✅ **Grid Preview**: All images displayed in responsive grid
- ✅ **Drag to Reorder**: Click and drag images to change order
- ✅ **Individual Delete**: Remove specific images with confirmation
- ✅ **Image Numbering**: Each image shows its position number
- ✅ **Hover Effects**: Interactive hover states for better UX

### Visual Design
- ✅ **Professional Grid Layout**: Responsive 2-4 column grid
- ✅ **Aspect Ratio Support**: Maintain proper image proportions
- ✅ **Drag Handle**: Visual grip icon for reordering
- ✅ **Number Badges**: Position indicators on each image
- ✅ **Delete Buttons**: Hover-to-reveal delete action
- ✅ **Upload Progress**: Loading spinner during uploads

## 📦 Component Props

```jsx
<MultiImageUploader
  value={[]}                    // Array of image URLs
  onChange={(images) => {...}}   // Callback with updated array
  label="Images"                 // Field label
  folder="images"                // Upload destination folder
  maxImages={20}                 // Maximum number of images
  maxSize={5}                    // Max file size in MB per image
  aspectRatio="16/9"            // Display aspect ratio
  required={false}               // Required field validation
/>
```

### Prop Details

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Array of image URLs |
| `onChange` | `function` | required | Callback: `(images: string[]) => void` |
| `label` | `string` | `"Images"` | Label displayed above component |
| `folder` | `string` | `"images"` | Server folder for uploads |
| `maxImages` | `number` | `20` | Maximum allowed images |
| `maxSize` | `number` | `5` | Max file size in MB |
| `aspectRatio` | `string` | `"16/9"` | CSS aspect ratio (e.g., "4/3", "1/1") |
| `required` | `boolean` | `false` | Show required indicator |

## 🎨 Usage Examples

### 1. Gallery Images (Most Common)

```jsx
import MultiImageUploader from '../components/MultiImageUploader';

const [formData, setFormData] = useState({
  eventTitle: '',
  images: []  // Array of image URLs
});

// In your form:
<MultiImageUploader
  value={formData.images || []}
  onChange={(images) => setFormData({...formData, images})}
  label="Gallery Images"
  folder="gallery"
  maxImages={30}
  aspectRatio="4/3"
/>
```

### 2. Lab/Facility Images

```jsx
<MultiImageUploader
  value={formData.labImages || []}
  onChange={(images) => setFormData({...formData, labImages: images})}
  label="Lab/Facility Images"
  folder="courses"
  maxImages={15}
  aspectRatio="16/9"
/>
```

### 3. Product Images

```jsx
<MultiImageUploader
  value={formData.productImages || []}
  onChange={(images) => setFormData({...formData, productImages: images})}
  label="Product Images"
  folder="products"
  maxImages={10}
  aspectRatio="1/1"
  required={true}
/>
```

### 4. Portfolio Images

```jsx
<MultiImageUploader
  value={formData.portfolio || []}
  onChange={(images) => setFormData({...formData, portfolio: images})}
  label="Portfolio Images"
  folder="portfolio"
  maxImages={50}
  aspectRatio="3/2"
  maxSize={10}  // Allow larger files
/>
```

## 🔧 Integration Guide

### Step 1: Import Component

```jsx
import MultiImageUploader from '../components/MultiImageUploader';
```

### Step 2: Add Field to FormData

```jsx
const [formData, setFormData] = useState({
  // ... other fields
  images: [],  // Array for multiple images
});
```

### Step 3: Add Component to Form

```jsx
<form onSubmit={handleSubmit}>
  {/* Other form fields */}
  
  <MultiImageUploader
    value={formData.images || []}
    onChange={(images) => setFormData({...formData, images})}
    label="Your Images"
    folder="your-folder"
    maxImages={20}
  />
  
  {/* Submit button */}
</form>
```

### Step 4: Handle Form Submission

The images array is automatically included in formData:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // formData.images is an array of URLs
  console.log(formData.images);
  // ["uploads/gallery/123.jpg", "uploads/gallery/456.jpg", ...]
  
  // Send to backend (it will be automatically JSON stringified)
  const response = await fetch('/api/gallery', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)  // images array included
  });
};
```

## 📊 Currently Integrated Pages

### 1. **ManageGallery** ✅
```jsx
<MultiImageUploader
  value={formData.images || []}
  onChange={(images) => setFormData({...formData, images})}
  label="Gallery Images"
  folder="gallery"
  maxImages={30}
  aspectRatio="4/3"
/>
```
- **Field**: `images` (JSON array)
- **Max**: 30 images
- **Ratio**: 4:3 (photo gallery standard)

### 2. **ManageCourses** ✅
```jsx
<MultiImageUploader
  value={formData.labImages || []}
  onChange={(images) => setFormData({...formData, labImages: images})}
  label="Lab/Facility Images"
  folder="courses"
  maxImages={15}
  aspectRatio="16/9"
/>
```
- **Field**: `labImages` (JSON array)
- **Max**: 15 images
- **Ratio**: 16:9 (landscape)

## 💡 User Guide - How to Use

### Uploading Images

**Method 1: Drag and Drop** (Recommended)
1. Open the file explorer on your computer
2. Select multiple images (hold Ctrl/Cmd to select multiple)
3. Drag them over the upload area
4. Drop to upload all at once

**Method 2: Click to Browse**
1. Click on the "Drop images here or click to upload" area
2. In the file picker, select one or multiple images
3. Click "Open" to start upload

### Managing Images

**Reorder Images**
1. Click and hold on any image
2. Drag it to the desired position
3. Release to drop in new position
4. Order is automatically saved

**Delete Image**
1. Hover over the image you want to delete
2. Click the red X button that appears in bottom-right corner
3. Confirm deletion in the popup

**View Upload Progress**
- Upload area shows spinner while uploading
- Counter shows: `(current/maximum)` e.g., `(5/30)`
- Each image appears in grid after upload completes

### Visual Indicators

- **Drag Handle** (☰): Top-left corner on hover - drag to reorder
- **Number Badge** (#1, #2, etc.): Top-right corner - shows position
- **Delete Button** (X): Bottom-right on hover - removes image
- **Border Highlight**: Blue border when dragging image
- **Upload Area**: Dashed border, changes when dragging files over

## 🎯 Design Specifications

### Grid Layout
```css
/* Responsive columns */
Mobile:   2 columns
Tablet:   3 columns  
Desktop:  4 columns
```

### Image Cards
- **Aspect Ratio**: Configurable per use case
- **Border**: 2px, gray-200 (blue-500 on drag)
- **Rounded**: 8px (rounded-lg)
- **Hover**: Border changes to blue-400
- **Dragging**: 50% opacity, slight scale down

### Upload Area
- **Border**: 2px dashed, gray-300
- **Padding**: 24px (p-6)
- **Hover**: Border blue-400, background gray-50
- **Active Drag**: Border blue-500, background blue-50

### Buttons & Icons
- **Drag Handle**: White background, 90% opacity on hover
- **Number Badge**: Black 70% opacity, white text
- **Delete Button**: Red-500, appears on hover only
- **Icons**: 16px (w-4 h-4) for buttons, 32px (w-8 h-8) for upload

## 🔒 Validation & Security

### Client-Side Validation
```javascript
// File type check
if (!file.type.startsWith('image/')) {
  alert('Only image files allowed');
}

// File size check
if (file.size > maxSize * 1024 * 1024) {
  alert(`File too large. Max ${maxSize}MB`);
}

// Max images check
if (images.length + files.length > maxImages) {
  alert(`Maximum ${maxImages} images allowed`);
}
```

### Server-Side Upload
- JWT authentication required
- File type validation on server
- Unique filename generation (timestamp-based)
- Organized folder structure
- Error handling for failed uploads

## 📁 Folder Organization

```
Backend/uploads/
├── gallery/       # Gallery event images (30 max)
├── courses/       # Lab/facility images (15 max)
├── products/      # Product showcase (if added)
├── portfolio/     # Portfolio projects (if added)
└── images/        # General content images
```

## 🎓 Advanced Features

### Drag-to-Reorder Algorithm
```javascript
// When user drags image at index 2 to position 4:
1. Remove image from index 2: [0,1,3,4,5]
2. Insert at index 4: [0,1,3,4,2,5]
3. Update state with new order
4. onChange callback fires with new array
```

### Batch Upload Flow
```javascript
1. User selects 5 images
2. For each image:
   - Validate type & size
   - Create FormData
   - Upload to server
   - Receive URL
   - Add to array
3. Update parent state with all new URLs
4. Display all images in grid
```

### Error Handling
- Invalid file type → Alert with filename
- File too large → Alert with size limit
- Too many files → Alert with remaining slots
- Upload failure → Alert and continue with next
- Network error → Alert and stop upload

## 🚀 Performance Optimization

### Lazy Loading
- Images load as they enter viewport
- Placeholder shown during load
- Error fallback for broken images

### Efficient Updates
- Only re-render affected images
- Debounced drag operations
- Optimistic UI updates

### Memory Management
- File cleanup after upload
- No storing of File objects
- URL-based state management

## 📱 Responsive Design

### Mobile (< 640px)
- 2 column grid
- Larger touch targets
- Simplified drag handle
- Tap to delete (no hover)

### Tablet (640px - 1024px)
- 3 column grid
- Medium touch targets
- Full hover effects

### Desktop (> 1024px)
- 4 column grid
- Precise drag-and-drop
- Keyboard shortcuts ready
- All hover effects

## 🎨 Customization Options

### Change Grid Columns
```jsx
// In MultiImageUploader.jsx, modify:
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
//                                              Change ↑ this number
```

### Change Max File Size
```jsx
<MultiImageUploader
  maxSize={10}  // Allow 10MB files
/>
```

### Change Aspect Ratio
```jsx
<MultiImageUploader
  aspectRatio="1/1"    // Square
  aspectRatio="16/9"   // Landscape
  aspectRatio="9/16"   // Portrait
  aspectRatio="21/9"   // Ultra-wide
  aspectRatio="4/3"    // Standard photo
/>
```

## 🐛 Troubleshooting

### Images Not Uploading
1. Check backend server is running (port 5000)
2. Verify JWT token is valid
3. Check browser console for errors
4. Verify upload folder exists and has write permissions

### Images Not Displaying
1. Check image URL format in state
2. Verify `API.getImageUrl()` is working
3. Check browser network tab for 404 errors
4. Ensure backend serves static files correctly

### Drag-and-Drop Not Working
1. Ensure browser supports drag-drop API
2. Check no other drag handlers conflict
3. Verify state updates on drop
4. Test with mouse instead of trackpad

### Order Not Saving
1. Check `onChange` callback fires
2. Verify parent state updates
3. Ensure form submission includes images array
4. Check backend receives correct order

## 📚 Related Components

- **ImageUploader**: Single image upload (for thumbnails, logos)
- **MultiImageUploader**: Multiple images (for galleries, portfolios)

### When to Use Each

| Use Case | Component | Reason |
|----------|-----------|--------|
| Profile photo | ImageUploader | One image only |
| Company logo | ImageUploader | One image only |
| News featured image | ImageUploader | One image only |
| Event banner | ImageUploader | One image only |
| Gallery event | MultiImageUploader | Multiple images |
| Lab facilities | MultiImageUploader | Multiple images |
| Product showcase | MultiImageUploader | Multiple images |
| Portfolio projects | MultiImageUploader | Multiple images |

## 🎉 Summary

The **MultiImageUploader** component provides:

✅ **Easy to use**: Drag-drop, click, or paste to upload
✅ **Flexible**: Configurable limits, sizes, and aspect ratios
✅ **Visual**: Grid preview with reordering and management
✅ **Validated**: Client and server-side validation
✅ **Organized**: Folder-based file structure
✅ **Responsive**: Works on all device sizes
✅ **Professional**: Modern UI with smooth interactions

**Integrated on 2 pages**: ManageGallery (30 images) and ManageCourses (15 lab images)

**Ready for**: Product galleries, portfolio showcases, event albums, facility tours, and more!

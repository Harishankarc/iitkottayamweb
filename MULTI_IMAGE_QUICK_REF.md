# Multi-Image Upload - Quick Reference

## 🎯 Quick Start

```jsx
import MultiImageUploader from '../components/MultiImageUploader';

<MultiImageUploader
  value={formData.images || []}
  onChange={(images) => setFormData({...formData, images})}
  label="Gallery Images"
  folder="gallery"
  maxImages={30}
/>
```

## ✨ Key Features

### 🖱️ Upload Methods
- **Drag & Drop**: Drag files from desktop
- **Click to Browse**: Traditional file picker
- **Multi-Select**: Upload multiple files at once

### 🎨 Image Management
- **Drag to Reorder**: Click & drag images to change order
- **Delete Individual**: Click X button on each image
- **Preview Grid**: Responsive 2-4 column grid
- **Number Badges**: Shows position (#1, #2, etc.)
- **Progress Tracking**: Shows current/max count (5/30)

## 📊 Currently Integrated

| Page | Field | Max | Folder | Aspect Ratio |
|------|-------|-----|--------|--------------|
| **ManageGallery** | `images` | 30 | `gallery` | 4:3 |
| **ManageCourses** | `labImages` | 15 | `courses` | 16:9 |

## 🎨 Visual Design

```
┌─────────────────────────────────────────┐
│   Gallery Images (5/30)                 │
├─────────────────────────────────────────┤
│  ┌────┐  ┌────┐  ┌────┐  ┌────┐        │
│  │ ☰#1│  │ ☰#2│  │ ☰#3│  │ ☰#4│        │
│  │img │  │img │  │img │  │img │        │
│  │  X │  │  X │  │  X │  │  X │        │
│  └────┘  └────┘  └────┘  └────┘        │
│                                         │
│  ┌────┐                                 │
│  │ ☰#5│                                 │
│  │img │                                 │
│  │  X │                                 │
│  └────┘                                 │
├─────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │         +                        │  │
│  │   Add more images                │  │
│  │   25 remaining                   │  │
│  └──────────────────────────────────┘  │
│                                         │
│  💡 Drag images to reorder • Click X   │
│     to delete • Upload multiple at once│
└─────────────────────────────────────────┘
```

## 🔧 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | `[]` | Image URLs array |
| `onChange` | `function` | required | Update callback |
| `label` | `string` | `"Images"` | Field label |
| `folder` | `string` | `"images"` | Upload folder |
| `maxImages` | `number` | `20` | Max images |
| `maxSize` | `number` | `5` | Max MB per file |
| `aspectRatio` | `string` | `"16/9"` | Display ratio |
| `required` | `boolean` | `false` | Required field |

## 💡 Usage Tips

### For Gallery Events (30 images)
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

### For Lab/Facilities (15 images)
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

### For Product Showcase (10 images)
```jsx
<MultiImageUploader
  value={formData.productImages || []}
  onChange={(images) => setFormData({...formData, productImages: images})}
  label="Product Images"
  folder="products"
  maxImages={10}
  aspectRatio="1/1"
/>
```

## 🎯 User Actions

| Action | Method |
|--------|--------|
| **Upload** | Drag files OR click upload area |
| **Reorder** | Click & drag image to new position |
| **Delete** | Hover image → Click X button |
| **View Count** | Check "(5/30)" counter |

## 🚀 Ready to Use!

The MultiImageUploader is fully integrated and ready for:
- ✅ Gallery event albums
- ✅ Course lab/facility tours
- ✅ Product image galleries
- ✅ Portfolio showcases
- ✅ Any multi-image content!

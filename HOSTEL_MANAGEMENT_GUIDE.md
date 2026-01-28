# Hostel Management Guide

## Overview
The hostel page is now fully dynamic with two data sources:
1. **Content Blocks** - Text content, lists, and images
2. **Facilities API** - Wardens and halls information

## What's Available

### User-Facing Page
**URL:** `/facilities/hostel`

**Content Displayed:**
- ✅ Hero Section (from ContentBlocks)
- ✅ About Hostel paragraph (from ContentBlocks)
- ✅ Hostel Facilities list - 8 items (from ContentBlocks)
- ✅ Boys Hostel Info (from ContentBlocks)
- ✅ Girls Hostel Info (from ContentBlocks)
- ✅ Hostel Rules & Guidelines (from ContentBlocks)
- ✅ 12 Hostel Images gallery (from ContentBlocks)
- ✅ Hostel Administration - 5 wardens (from Facilities API)
- ✅ Halls of Residence - 3 halls (from Facilities API)

### Admin Panel

#### 1. Unified Content Manager
**URL:** `/admin/content`

**Manage:**
- Text content (hero, paragraphs, rules)
- Hostel facilities list
- Upload/manage 12 hostel images
- Set visibility and order

**How to Use:**
1. Login to admin panel
2. Go to "Content" in sidebar
3. Select "Hostel" from page dropdown
4. Edit/add content blocks
5. Upload images using the image uploader
6. Click "Save Changes"

#### 2. Hostel Management (NEW!)
**URL:** `/admin/hostel`

**Manage:**
- Hostel Administration (Wardens)
- Halls of Residence
- Profile images for wardens

**How to Use:**

**Add a Warden:**
1. Go to `/admin/hostel`
2. Click "Add Warden" button
3. Fill in details:
   - Name (required)
   - Role (required)
   - Designation
   - Gender
   - Phone
   - Email
   - Upload profile image
4. Click "Save"
5. Click "Save All Changes" at top

**Edit a Warden:**
1. Click the edit icon (pencil) next to the warden
2. Modify the details
3. Click "Save"
4. Click "Save All Changes" at top

**Delete a Warden:**
1. Click the delete icon (trash) next to the warden
2. Confirm deletion
3. Click "Save All Changes" at top

**Add a Hall:**
1. Click "Add Hall" button
2. Fill in details:
   - Hall Name (required)
   - Gender (Boys/Girls)
   - Warden Type
   - Contact
   - Email
3. Click "Save"
4. Click "Save All Changes" at top

**Edit/Delete Hall:**
- Same process as wardens

## Current Data

### Wardens (5)
1. Dr Rajkumar P - Associate Dean (Hostel Affairs & Student Events)
2. Capt. Bijumon P Nair - Security Officer
3. Anoop Kumar T V - Asst Registrar | Hostel Manager
4. Dr John Paul Martin - Faculty In Charge(GIIT) Hostel Coordinator
5. Dr Chullikkattil Padinjarekutti - Associate FC

### Halls of Residence (3)
1. Dr. Rajendra Garge - Resident Warden (Boys)
2. Dr. Elon Vincent George - Resident Warden (Boys)
3. Dr. Alvin P Baby - Assistant Warden (Boys)

### Content Blocks (18)
- 1 hero section
- 5 paragraphs (about, boys info, girls info, rules, etc.)
- 1 list (8 facilities)
- 12 images

## API Endpoints

### Get Hostel Data
```
GET /api/facilities/slug/hostel
```
Returns: Complete hostel data including wardens and halls

### Update Hostel Data
```
PUT /api/facilities/{id}
Headers: Authorization: Bearer {token}
Body: {
  wardens: [...],
  halls: [...]
}
```

### Get Content Blocks
```
GET /api/content-blocks/page/hostel
```
Returns: All content blocks for hostel page

## File Structure

```
Frontend/
  src/
    screens/
      facilities/
        hostel.jsx              # User-facing hostel page
      admin/
        HostelManagement.jsx    # Admin page for wardens/halls

Backend/
  seedHostelAdmin.js            # Script to seed wardens and halls
  routes/
    facilityRoutes.js           # API routes for facilities
  controllers/
    facilityController.js       # Facility CRUD operations
```

## Quick Commands

### Reseed Hostel Admin Data
```bash
cd Backend
node seedHostelAdmin.js
```

### Check Current Data
```powershell
$response = Invoke-WebRequest -Uri "http://localhost:5000/api/facilities/slug/hostel" -UseBasicParsing
$response.Content | ConvertFrom-Json | ConvertTo-Json -Depth 5
```

## Notes

- All changes in `/admin/hostel` require clicking "Save All Changes" button
- Content blocks (text/images) are managed separately in `/admin/content`
- Warden images are uploaded through the hostel management page
- Hostel facility images are uploaded through the content manager
- Both data sources are displayed together on the user-facing page

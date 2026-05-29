# Hostel Page - Content Blocks Checklist

## Admin Should Create These Blocks for `/hostel` page:

### 1. **Hero Block**
- **blockType**: hero
- **blockId**: (auto-generated)
- **content.title**: "Hostel Information" (or similar)
- **content.subtitle**: (optional description)

### 2. **Paragraph Block - About Hostel**
- **blockType**: paragraph
- **blockId**: `about-hostel`
- **content.text**: General information about hostels
- **isVisible**: true

### 3. **List Block - Hostel Facilities**
- **blockType**: list
- **blockId**: `hostel-facilities`
- **content.items**: Array of facility names
  - Example: ["WiFi", "Laundry Service", "Dining Hall", "Sports Equipment", etc.]
- **isVisible**: true

### 4. **Paragraph Block - Boys Hostel Info**
- **blockType**: paragraph
- **blockId**: `boys-hostel-info`
- **content.text**: Information about boys hostel
- **isVisible**: true

### 5. **Paragraph Block - Girls Hostel Info**
- **blockType**: paragraph
- **blockId**: `girls-hostel-info`
- **content.text**: Information about girls hostel
- **isVisible**: true

### 6. **Paragraph Block - Hostel Rules**
- **blockType**: paragraph
- **blockId**: `hostel-rules`
- **content.text**: Hostel rules and guidelines
- **isVisible**: true

### 7. **Image Blocks - Hostel Gallery** (Multiple)
- **blockType**: image
- **blockId**: (auto-generated or `hostel-gallery-1`, etc.)
- **content.src** or **content.url**: Image URL
- **content.alt**: "Hostel Facility"
- **content.caption**: (optional)
- **isVisible**: true

## Facility Data (via `/api/facilities/slug/hostel`):

These should be managed in **HostelManagement.jsx** admin page:

### From API Fields:
1. **wardens** - Array of warden objects with:
   - name, role, designation, phone, email, image

2. **halls** - Array of hall objects with:
   - name, gender (Boys/Girls), wardenType, contact, email

3. **customFields.messCommittee** - Array with:
   - name, role, email, phone

4. **customFields.services** - Array of service names

5. **customFields.hostelCareTaker** - String with name/info

## What User-Side Expects:

The hostel.jsx user page displays blocks in this order:
1. Hero section
2. About Hostel paragraph
3. Hostel Facilities list (with checkmarks)
4. Boys Hostel Info paragraph
5. Girls Hostel Info paragraph
6. Hostel Rules paragraph
7. Any additional paragraphs not listed above
8. Hostel gallery images
9. Services section
10. Hostel Administration (wardens)
11. Halls of Residence (Girls) - table format
12. Halls of Residence (Boys) - card format
13. Mess Committee section

## Current Implementation Status:

✅ **Working**: Facility data (wardens, halls, mess committee)
⚠️ **May Be Missing**: Content blocks - check if all blocks are created and visible in admin

## Action Items:

1. Go to content blocks management or **VisualPageEditor.jsx** or **UnifiedContentEditor.jsx**
2. Select page: `hostel`
3. Create all missing blocks from the checklist above
4. Ensure **isVisible = true** for all blocks
5. Save and verify on user-side page

## Debug Logs to Check:

Check browser console for these logs in hostel.jsx:
- `Image blocks:` - should show image blocks
- `All content blocks:` - should show all blocks including hero, paragraphs, lists

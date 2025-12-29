# 🎨 VISUAL GUIDE - Component-Based Page Builder

## 🏗️ System Structure

```
┌─────────────────────────────────────────────────────────┐
│                    NAVBAR ELEMENTS                      │
│  Institute | Course | People | Facilities | Research    │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    PAGES (per navbar)                   │
│  ├── Admission      ├── B.Tech CSE    ├── Faculty       │
│  ├── Academics      ├── B.Tech ECE    ├── Students      │
│  ├── Governance     └── M.Tech        └── Staff         │
│  └── Scholarship                                        │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              SECTIONS (within each page)                │
│  ├── hero           ├── intro          ├── highlights   │
│  ├── about          ├── content        ├── gallery      │
│  └── features       └── sidebar        └── footer       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│          CONTENT BLOCKS (within each section)           │
│                                                         │
│  📦 Block 1: Hero Banner                               │
│    ├── Content: Title, Subtitle, Image, Buttons       │
│    ├── Styling: Colors, Fonts, Shadows                │
│    ├── Layout: Grid, Width, Spacing                   │
│    └── Responsive: Mobile, Tablet, Desktop            │
│                                                         │
│  📦 Block 2: Feature Cards                             │
│    ├── Content: Cards with icons and text             │
│    ├── Styling: Background, Borders, Padding          │
│    ├── Layout: 3-column grid                          │
│    └── Responsive: 1 column on mobile                 │
│                                                         │
│  📦 Block 3: Statistics                                │
│    └── ... and so on                                   │
└─────────────────────────────────────────────────────────┘
```

## 📱 Admin Interface

```
┌─────────────────────────────────────────────────────────┐
│  Page Builder - Content Blocks                  [+ Add] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Select Page: [Homepage ▼]                             │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ≡ #1  🖼️  Main Hero Banner            [👁️📋✏️🗑️] │   │
│  │       hero | homepage-hero                      │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ≡ #2  📄  Vision Statement Card      [👁️📋✏️🗑️] │   │
│  │       card | about | homepage-vision            │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ≡ #3  📝  Mission Points List        [👁️📋✏️🗑️] │   │
│  │       list | about | homepage-mission           │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │ ≡ #4  📊  Placement Stats Grid       [👁️📋✏️🗑️] │   │
│  │       statistics | highlights                   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## ✏️ Block Editor

```
┌─────────────────────────────────────────────────────────┐
│  Edit Block: Main Hero Banner                      [×]  │
├─────────────────────────────────────────────────────────┤
│  [Content] [Styling] [Layout] [Responsive]             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  CONTENT TAB:                                          │
│  ┌────────────────┬────────────────┐                  │
│  │ Block Type     │ Block Label    │                  │
│  │ [Hero ▼]      │ [Main Hero...] │                  │
│  └────────────────┴────────────────┘                  │
│                                                         │
│  Content (JSON):                                       │
│  ┌───────────────────────────────────────────────┐    │
│  │ {                                             │    │
│  │   "title": "Welcome to IIIT Kottayam",       │    │
│  │   "subtitle": "Building the future",          │    │
│  │   "backgroundImage": "/images/hero.jpg",      │    │
│  │   "buttons": [                                │    │
│  │     {                                         │    │
│  │       "text": "Explore Programs",            │    │
│  │       "link": "/course",                      │    │
│  │       "type": "primary"                       │    │
│  │     }                                         │    │
│  │   ]                                           │    │
│  │ }                                             │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  STYLING TAB:                                          │
│  ┌───────────────────────────────────────────────┐    │
│  │ {                                             │    │
│  │   "backgroundColor": "#239244",               │    │
│  │   "textColor": "#ffffff",                     │    │
│  │   "titleFontSize": "48px",                    │    │
│  │   "padding": "100px 20px",                    │    │
│  │   "textAlign": "center"                       │    │
│  │ }                                             │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  LAYOUT TAB:                                           │
│  ┌───────────────────────────────────────────────┐    │
│  │ {                                             │    │
│  │   "height": "600px",                          │    │
│  │   "fullWidth": true,                          │    │
│  │   "contentPosition": "center"                 │    │
│  │ }                                             │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│  RESPONSIVE TAB:                                       │
│  ┌───────────────────────────────────────────────┐    │
│  │ {                                             │    │
│  │   "mobile": {                                 │    │
│  │     "titleFontSize": "32px",                  │    │
│  │     "padding": "60px 15px",                   │    │
│  │     "height": "400px"                         │    │
│  │   }                                           │    │
│  │ }                                             │    │
│  └───────────────────────────────────────────────┘    │
│                                                         │
│                           [Cancel]  [💾 Save Block]    │
└─────────────────────────────────────────────────────────┘
```

## 🎨 25+ Block Types

```
┌──────────────────┬──────────────────┬──────────────────┐
│  📝 Text         │  🖼️ Media        │  📊 Data         │
├──────────────────┼──────────────────┼──────────────────┤
│  • Heading       │  • Image         │  • List          │
│  • Paragraph     │  • Gallery       │  • Table         │
│  • Quote         │  • Video         │  • Statistics    │
│  • Code          │  • Carousel      │  • Accordion     │
│                  │                  │  • Tabs          │
├──────────────────┼──────────────────┼──────────────────┤
│  🎨 Layout       │  🔘 Interactive  │  ⚙️ Utility      │
├──────────────────┼──────────────────┼──────────────────┤
│  • Hero          │  • Button        │  • Divider       │
│  • Card          │  • Link          │  • Spacer        │
│  • Divider       │  • Form          │  • Icon          │
│                  │                  │  • Map           │
│                  │                  │  • Custom        │
└──────────────────┴──────────────────┴──────────────────┘
```

## 📐 Design Properties

```
┌─────────────────────────────────────────────────────────┐
│  STYLING PROPERTIES                                     │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Colors:                                               │
│  • backgroundColor    • textColor                       │
│  • borderColor        • shadowColor                     │
│                                                         │
│  Typography:                                           │
│  • fontSize           • fontWeight                      │
│  • fontFamily         • lineHeight                      │
│  • textAlign          • textTransform                   │
│                                                         │
│  Spacing:                                              │
│  • padding            • margin                          │
│  • gap                • space                           │
│                                                         │
│  Borders:                                              │
│  • border             • borderRadius                    │
│  • borderWidth        • borderStyle                     │
│                                                         │
│  Effects:                                              │
│  • boxShadow          • opacity                         │
│  • transform          • transition                      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  LAYOUT PROPERTIES                                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  Sizing:                                               │
│  • width              • height                          │
│  • maxWidth           • maxHeight                       │
│  • minWidth           • minHeight                       │
│                                                         │
│  Positioning:                                          │
│  • position           • top/right/bottom/left           │
│  • zIndex             • overflow                        │
│                                                         │
│  Display:                                              │
│  • display            • visibility                      │
│  • flexDirection      • justifyContent                  │
│  • alignItems         • flexWrap                        │
│                                                         │
│  Grid:                                                 │
│  • gridColumns        • gridRows                        │
│  • gridGap            • gridTemplateAreas               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  RESPONSIVE BREAKPOINTS                                 │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  📱 Mobile (< 768px)                                   │
│  {                                                      │
│    "fontSize": "14px",                                 │
│    "padding": "15px",                                  │
│    "gridColumns": "1"                                  │
│  }                                                      │
│                                                         │
│  📱 Tablet (768px - 1024px)                            │
│  {                                                      │
│    "fontSize": "16px",                                 │
│    "padding": "25px",                                  │
│    "gridColumns": "2"                                  │
│  }                                                      │
│                                                         │
│  💻 Desktop (> 1024px)                                 │
│  {                                                      │
│    "fontSize": "18px",                                 │
│    "padding": "40px",                                  │
│    "gridColumns": "3"                                  │
│  }                                                      │
└─────────────────────────────────────────────────────────┘
```

## 🏗️ Example Page Structure

```
┌─────────────────────────────────────────────────────────┐
│                     HOMEPAGE                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓  │
│  ┃  HERO SECTION                                   ┃  │
│  ┃  Block: homepage-hero (hero)                    ┃  │
│  ┃  ┌────────────────────────────────────────────┐ ┃  │
│  ┃  │   Welcome to IIIT Kottayam                 │ ┃  │
│  ┃  │   Building the future through innovation   │ ┃  │
│  ┃  │                                            │ ┃  │
│  ┃  │   [Explore Programs]  [Apply Now]         │ ┃  │
│  ┃  └────────────────────────────────────────────┘ ┃  │
│  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛  │
│                                                         │
│  ┌──────────────────┬──────────────────┐               │
│  │  VISION CARD     │  MISSION CARD    │               │
│  │  Block: card     │  Block: list     │               │
│  │  ┌────────────┐  │  ┌────────────┐  │               │
│  │  │ 🎯 Vision  │  │  │ 🎯 Mission │  │               │
│  │  │            │  │  │            │  │               │
│  │  │ "Generating│  │  │ • Point 1  │  │               │
│  │  │  knowledge"│  │  │ • Point 2  │  │               │
│  │  │            │  │  │ • Point 3  │  │               │
│  │  └────────────┘  │  └────────────┘  │               │
│  └──────────────────┴──────────────────┘               │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  PLACEMENT STATISTICS                           │   │
│  │  Block: statistics (4-column grid)              │   │
│  ├──────┬──────┬──────┬──────┐                     │   │
│  │  45  │  14  │ 100+ │  95% │                     │   │
│  │ LPA  │ LPA  │ Cos  │ Rate │                     │   │
│  └──────┴──────┴──────┴──────┘                     │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  CAMPUS IMAGE                                   │   │
│  │  Block: image                                   │   │
│  │  [        Campus Overview Photo        ]       │   │
│  └─────────────────────────────────────────────────┘   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## 🎯 Real-World Example

### Building Admission Page:

```
Step 1: Create Hero Block
  Type: hero
  Content: "Admissions Open 2025"
  Styling: Green gradient, white text
  Layout: Full width, 400px height

Step 2: Create Programs Grid
  Type: card
  Content: [B.Tech CSE, B.Tech ECE cards]
  Styling: White cards, shadows
  Layout: 2-column grid
  Responsive: 1 column on mobile

Step 3: Create Timeline
  Type: accordion
  Content: Important dates with icons
  Styling: Light background
  Layout: Centered, 800px max

Step 4: Create Apply Button
  Type: button
  Content: "Apply Now"
  Styling: Green background, large
  Layout: Centered

Result: Complete admission page with 4 designed blocks!
```

## 📊 Current Database

```
content_blocks table:
  • 10 blocks total
  • 3 pages (homepage, admission, faculty)
  • 8 different block types used
  
Homepage:
  ✅ Hero banner
  ✅ Vision card
  ✅ Mission list
  ✅ Stats grid
  ✅ Campus image

Admission:
  ✅ Hero banner
  ✅ Programs cards
  ✅ Timeline accordion

Faculty:
  ✅ Intro paragraph
  ✅ Photo gallery
```

## 🚀 Workflow

```
1. Login to Admin
   ↓
2. Go to Content Blocks
   ↓
3. Select Page
   ↓
4. Add New Block
   ↓
5. Choose Block Type
   ↓
6. Add Content (JSON)
   ↓
7. Design Styling
   ↓
8. Configure Layout
   ↓
9. Set Responsive
   ↓
10. Save Block
    ↓
11. Block appears on page!
```

## 🎨 Color System

```
Primary Colors:
  #239244  ██████  Green (Primary)
  #1a7a36  ██████  Dark Green
  #e8f5f0  ██████  Light Green

Backgrounds:
  #ffffff  ██████  White
  #f8faf9  ██████  Off White
  #f0f9f4  ██████  Mint

Text:
  #333333  ██████  Dark Gray
  #666666  ██████  Medium Gray
  #999999  ██████  Light Gray
```

## 📞 Quick Reference

```
Access:     /admin/content-blocks
API:        /api/content-blocks
Database:   content_blocks table
Blocks:     25+ types available
Current:    10 blocks seeded
Features:   Full design control
```

---

**Ready to build! 🎉**

Every navbar element → pages → sections → designable blocks!

# IIIT Kottayam Backend

Backend API for IIIT Kottayam website content management system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. **Install dependencies:**
```bash
cd Backend
npm install
```

2. **Setup environment variables:**
```bash
cp .env.example .env
```

Then edit `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/iitkottayam
JWT_SECRET=your_secret_key_here
```

3. **Start MongoDB (if running locally):**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

4. **Run the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will run on: **http://localhost:5000**

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user (Admin only)
- `GET /api/auth/me` - Get current user

### News
- `GET /api/news` - Get all news
- `POST /api/news` - Create news (Protected)
- `PUT /api/news/:id` - Update news (Protected)
- `DELETE /api/news/:id` - Delete news (Admin only)

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create event (Protected)
- `PUT /api/events/:id` - Update event (Protected)
- `DELETE /api/events/:id` - Delete event (Admin only)

### Faculty
- `GET /api/faculty` - Get all faculty
- `POST /api/faculty` - Create faculty (Protected)
- `PUT /api/faculty/:id` - Update faculty (Protected)
- `DELETE /api/faculty/:id` - Delete faculty (Admin only)

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student (Protected)
- `PUT /api/students/:id` - Update student (Protected)
- `DELETE /api/students/:id` - Delete student (Admin only)

### Placements
- `GET /api/placements` - Get all placement data
- `POST /api/placements` - Create placement (Protected)
- `PUT /api/placements/:id` - Update placement (Protected)
- `DELETE /api/placements/:id` - Delete placement (Admin only)

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement (Protected)
- `PUT /api/announcements/:id` - Update announcement (Protected)
- `DELETE /api/announcements/:id` - Delete announcement (Admin only)

## 🔒 Authentication

Protected routes require JWT token in headers:
```
Authorization: Bearer <your_token>
```

## 🗄️ Database Models

- **User** - Admin users
- **News** - News articles
- **Event** - Events
- **Faculty** - Faculty members
- **Student** - Students
- **Placement** - Placement statistics
- **Announcement** - Banner announcements

## 👤 Default Admin Credentials

After first setup, create admin user manually or use these defaults:
- Email: `admin@iiitkottayam.ac.in`
- Password: `Admin@123`

**⚠️ Change these immediately in production!**

## 📦 Tech Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

## 📄 License

© 2025 IIIT Kottayam

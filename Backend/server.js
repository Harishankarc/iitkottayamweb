import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import sequelize from './config/database.js';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import placementRoutes from './routes/placementRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import researchPublicationRoutes from './routes/researchPublicationRoutes.js';
import heroSliderRoutes from './routes/heroSliderRoutes.js';
import pageContentRoutes from './routes/pageContentRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // Logging

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database connection and sync
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected successfully');
    return sequelize.sync({ alter: false }); // Set to true for development to auto-update tables
  })
  .then(() => console.log('✅ Database tables synchronized'))
  .catch((err) => console.error('❌ MySQL connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/research-publications', researchPublicationRoutes);
app.use('/api/hero-sliders', heroSliderRoutes);
app.use('/api/pages', pageContentRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'IIIT Kottayam API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
}).on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

export default app;

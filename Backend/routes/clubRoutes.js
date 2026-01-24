import express from 'express';
import { 
  getAllClubs, 
  getClub,
  getClubBySlug,
  getClubsByType,
  createClub, 
  updateClub, 
  deleteClub 
} from '../controllers/clubController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllClubs);
router.get('/slug/:slug', getClubBySlug);
router.get('/type/:type', getClubsByType);
router.get('/:id', getClub);

// Protected routes (require authentication)
router.post('/', authenticate, createClub);
router.put('/:id', authenticate, updateClub);
router.delete('/:id', authenticate, deleteClub);

export default router;

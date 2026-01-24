import express from 'express';
import { 
  getAllActivities, 
  getActivity,
  getActivitiesByType,
  createActivity, 
  updateActivity, 
  deleteActivity 
} from '../controllers/researchActivityController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllActivities);
router.get('/type/:type', getActivitiesByType);
router.get('/:id', getActivity);

// Protected routes (require authentication)
router.post('/', authenticate, createActivity);
router.put('/:id', authenticate, updateActivity);
router.delete('/:id', authenticate, deleteActivity);

export default router;

import express from 'express';
import { 
  getAllFacilities, 
  getFacility,
  getFacilityBySlug,
  getFacilitiesByType,
  createFacility, 
  updateFacility, 
  deleteFacility 
} from '../controllers/facilityController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllFacilities);
router.get('/slug/:slug', getFacilityBySlug);
router.get('/type/:type', getFacilitiesByType);
router.get('/:id', getFacility);

// Protected routes (require authentication)
router.post('/', authenticate, createFacility);
router.put('/:id', authenticate, updateFacility);
router.delete('/:id', authenticate, deleteFacility);

export default router;

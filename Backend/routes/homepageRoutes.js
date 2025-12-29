import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getHomepageSettings,
  updateHomepageSettings,
  getHomepageStats
} from '../controllers/homepageController.js';

const router = express.Router();

router.get('/', getHomepageSettings);
router.get('/stats', getHomepageStats);
router.put('/:id', protect, authorize('admin', 'editor'), updateHomepageSettings);

export default router;

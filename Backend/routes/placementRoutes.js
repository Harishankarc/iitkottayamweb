import express from 'express';
import { getAllPlacements, createPlacement, updatePlacement, deletePlacement } from '../controllers/placementController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllPlacements);
router.post('/', protect, authorize('admin', 'editor'), createPlacement);
router.put('/:id', protect, authorize('admin', 'editor'), updatePlacement);
router.delete('/:id', protect, authorize('admin'), deletePlacement);

export default router;

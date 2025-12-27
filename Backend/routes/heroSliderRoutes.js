import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider
} from '../controllers/heroSliderController.js';

const router = express.Router();

router.get('/', getAllSliders);
router.get('/:id', getSliderById);
router.post('/', protect, authorize('admin', 'editor'), createSlider);
router.put('/:id', protect, authorize('admin', 'editor'), updateSlider);
router.delete('/:id', protect, authorize('admin'), deleteSlider);

export default router;

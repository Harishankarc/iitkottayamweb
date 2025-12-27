import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery
} from '../controllers/galleryController.js';

const router = express.Router();

router.get('/', getAllGallery);
router.get('/:id', getGalleryById);
router.post('/', protect, authorize('admin', 'editor'), createGallery);
router.put('/:id', protect, authorize('admin', 'editor'), updateGallery);
router.delete('/:id', protect, authorize('admin'), deleteGallery);

export default router;

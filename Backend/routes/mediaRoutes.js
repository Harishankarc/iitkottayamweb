import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia
} from '../controllers/mediaController.js';

const router = express.Router();

router.get('/', getAllMedia);
router.get('/:id', getMediaById);
router.post('/', protect, authorize('admin', 'editor'), createMedia);
router.put('/:id', protect, authorize('admin', 'editor'), updateMedia);
router.delete('/:id', protect, authorize('admin'), deleteMedia);

export default router;

import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllPublications,
  getPublicationById,
  createPublication,
  updatePublication,
  deletePublication
} from '../controllers/researchPublicationController.js';

const router = express.Router();

router.get('/', getAllPublications);
router.get('/:id', getPublicationById);
router.post('/', protect, authorize('admin', 'editor'), createPublication);
router.put('/:id', protect, authorize('admin', 'editor'), updatePublication);
router.delete('/:id', protect, authorize('admin'), deletePublication);

export default router;

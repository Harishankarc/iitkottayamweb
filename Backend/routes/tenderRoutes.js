import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllTenders,
  getLiveTenders,
  getTender,
  createTender,
  updateTender,
  deleteTender,
  updateTenderStatus
} from '../controllers/tenderController.js';

const router = express.Router();

router.get('/', getAllTenders);
router.get('/live', getLiveTenders);
router.get('/:id', getTender);
router.post('/', protect, authorize('admin', 'editor'), createTender);
router.put('/:id', protect, authorize('admin', 'editor'), updateTender);
router.patch('/:id/status', protect, authorize('admin', 'editor'), updateTenderStatus);
router.delete('/:id', protect, authorize('admin'), deleteTender);

export default router;

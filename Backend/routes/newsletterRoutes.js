import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  subscribe,
  unsubscribe,
  getAllSubscribers,
  deleteSubscriber
} from '../controllers/newsletterController.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.get('/', protect, authorize('admin', 'editor'), getAllSubscribers);
router.delete('/:id', protect, authorize('admin'), deleteSubscriber);

export default router;

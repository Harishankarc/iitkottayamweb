import express from 'express';
import { getAllEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/', protect, authorize('admin', 'editor'), createEvent);
router.put('/:id', protect, authorize('admin', 'editor'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

export default router;

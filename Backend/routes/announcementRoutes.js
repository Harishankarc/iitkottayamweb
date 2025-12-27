import express from 'express';
import { getAllAnnouncements, createAnnouncement, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllAnnouncements);
router.post('/', protect, authorize('admin', 'editor'), createAnnouncement);
router.put('/:id', protect, authorize('admin', 'editor'), updateAnnouncement);
router.delete('/:id', protect, authorize('admin'), deleteAnnouncement);

export default router;

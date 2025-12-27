import express from 'express';
import { getAllFaculty, createFaculty, updateFaculty, deleteFaculty } from '../controllers/facultyController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllFaculty);
router.post('/', protect, authorize('admin', 'editor'), createFaculty);
router.put('/:id', protect, authorize('admin', 'editor'), updateFaculty);
router.delete('/:id', protect, authorize('admin'), deleteFaculty);

export default router;

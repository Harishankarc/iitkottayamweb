import express from 'express';
import { getAllStudents, createStudent, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllStudents);
router.post('/', protect, authorize('admin', 'editor'), createStudent);
router.put('/:id', protect, authorize('admin', 'editor'), updateStudent);
router.delete('/:id', protect, authorize('admin'), deleteStudent);

export default router;

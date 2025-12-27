import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllCourses,
  getCourseBySlug,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/courseController.js';

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:slug', getCourseBySlug);
router.post('/', protect, authorize('admin', 'editor'), createCourse);
router.put('/:id', protect, authorize('admin', 'editor'), updateCourse);
router.delete('/:id', protect, authorize('admin'), deleteCourse);

export default router;

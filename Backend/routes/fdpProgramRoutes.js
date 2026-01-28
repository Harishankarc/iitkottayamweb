import express from 'express';
import {
  getAllFdpPrograms,
  getFdpProgramById,
  createFdpProgram,
  updateFdpProgram,
  deleteFdpProgram
} from '../controllers/fdpProgramController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllFdpPrograms);
router.get('/:id', getFdpProgramById);

// Admin routes
router.post('/', protect, authorize('admin'), createFdpProgram);
router.put('/:id', protect, authorize('admin'), updateFdpProgram);
router.delete('/:id', protect, authorize('admin'), deleteFdpProgram);

export default router;

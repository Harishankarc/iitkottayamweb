import express from 'express';
import {
  getBlocksByPage,
  getBlockById,
  createBlock,
  updateBlock,
  deleteBlock,
  reorderBlocks,
  cloneBlock,
  getBlocksGrouped
} from '../controllers/contentBlockController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/page/:pageName', getBlocksByPage);
router.get('/grouped', getBlocksGrouped);
router.get('/:id', getBlockById);

// Protected routes (admin only)
router.post('/', protect, createBlock);
router.put('/:id', protect, updateBlock);
router.delete('/:id', protect, deleteBlock);
router.post('/reorder', protect, reorderBlocks);
router.post('/:id/clone', protect, cloneBlock);

export default router;

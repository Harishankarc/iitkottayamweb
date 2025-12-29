import express from 'express';
import {
  getNavigationItems,
  getNavigationItem,
  createNavigationItem,
  updateNavigationItem,
  deleteNavigationItem
} from '../controllers/navigationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getNavigationItems)
  .post(protect, authorize('admin', 'editor'), createNavigationItem);

router.route('/:id')
  .get(getNavigationItem)
  .put(protect, authorize('admin', 'editor'), updateNavigationItem)
  .delete(protect, authorize('admin'), deleteNavigationItem);

export default router;

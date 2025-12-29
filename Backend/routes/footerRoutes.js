import express from 'express';
import {
  getFooterItems,
  getFooterItem,
  createFooterItem,
  updateFooterItem,
  deleteFooterItem
} from '../controllers/footerController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getFooterItems)
  .post(protect, authorize('admin', 'editor'), createFooterItem);

router.route('/:id')
  .get(getFooterItem)
  .put(protect, authorize('admin', 'editor'), updateFooterItem)
  .delete(protect, authorize('admin'), deleteFooterItem);

export default router;

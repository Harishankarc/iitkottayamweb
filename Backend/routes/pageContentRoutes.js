import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  getAllPages,
  getPageByName,
  createPage,
  updatePage,
  deletePage
} from '../controllers/pageContentController.js';

const router = express.Router();

router.get('/', getAllPages);
router.get('/:pageName', getPageByName);
router.post('/', protect, authorize('admin', 'editor'), createPage);
router.put('/:id', protect, authorize('admin', 'editor'), updatePage);
router.delete('/:id', protect, authorize('admin'), deletePage);

export default router;

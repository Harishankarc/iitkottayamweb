import express from 'express';
import { 
  getAllNews, 
  getNewsById, 
  createNews, 
  updateNews, 
  deleteNews,
  getNewsByCategory 
} from '../controllers/newsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllNews);
router.get('/category/:category', getNewsByCategory);
router.get('/:id', getNewsById);
router.post('/', protect, authorize('admin', 'editor'), createNews);
router.put('/:id', protect, authorize('admin', 'editor'), updateNews);
router.delete('/:id', protect, authorize('admin'), deleteNews);

export default router;

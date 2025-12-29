import express from 'express';
import {
  getNIRFRankings,
  getNIRFRanking,
  createNIRFRanking,
  updateNIRFRanking,
  deleteNIRFRanking
} from '../controllers/nirfController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getNIRFRankings)
  .post(protect, authorize('admin', 'editor'), createNIRFRanking);

router.route('/:id')
  .get(getNIRFRanking)
  .put(protect, authorize('admin', 'editor'), updateNIRFRanking)
  .delete(protect, authorize('admin'), deleteNIRFRanking);

export default router;

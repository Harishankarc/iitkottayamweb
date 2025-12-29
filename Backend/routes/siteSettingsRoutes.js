import express from 'express';
import {
  getSiteSettings,
  getSiteSetting,
  upsertSiteSetting,
  updateSiteSetting,
  deleteSiteSetting
} from '../controllers/siteSettingsController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getSiteSettings)
  .post(protect, authorize('admin'), upsertSiteSetting);

router.route('/:key')
  .get(getSiteSetting);

router.route('/id/:id')
  .put(protect, authorize('admin'), updateSiteSetting)
  .delete(protect, authorize('admin'), deleteSiteSetting);

export default router;

import express from 'express';
import {
  getCompanyLogos,
  getCompanyLogo,
  createCompanyLogo,
  updateCompanyLogo,
  deleteCompanyLogo
} from '../controllers/companyLogoController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(getCompanyLogos)
  .post(protect, authorize('admin', 'editor'), createCompanyLogo);

router.route('/:id')
  .get(getCompanyLogo)
  .put(protect, authorize('admin', 'editor'), updateCompanyLogo)
  .delete(protect, authorize('admin'), deleteCompanyLogo);

export default router;

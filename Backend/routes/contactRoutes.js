import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import {
  submitContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, authorize('admin', 'editor'), getAllContacts);
router.get('/:id', protect, authorize('admin', 'editor'), getContact);
router.put('/:id', protect, authorize('admin', 'editor'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

export default router;

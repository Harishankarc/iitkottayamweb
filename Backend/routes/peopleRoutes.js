import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  getPeopleByType,
  getAllPeople,
  getPerson,
  createPerson,
  updatePerson,
  deletePerson
} from '../controllers/peopleController.js';

const router = express.Router();

// Get all people
router.get('/', protect, getAllPeople);

// Get people by type
router.get('/type/:type', protect, getPeopleByType);

// Get single person
router.get('/:id', protect, getPerson);

// Create person
router.post('/', protect, createPerson);

// Update person
router.put('/:id', protect, updatePerson);

// Delete person
router.delete('/:id', protect, deletePerson);

export default router;

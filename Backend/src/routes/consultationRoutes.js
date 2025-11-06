import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getAllConsultations,
  getConsultationById,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from '../controllers/consultationController.js';

const router = express.Router();

// Public route (no authentication required)
router.post('/', createConsultation);

// Protected routes (require authentication)
router.use(authenticateToken);

router.get('/', getAllConsultations);
router.get('/:id', getConsultationById);
router.put('/:id', updateConsultation);
router.delete('/:id', deleteConsultation);

export default router;


import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  getAllMilestones,
  getMilestoneById,
  createMilestone,
  updateMilestone,
  deleteMilestone
} from '../controllers/milestoneController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllMilestones);
router.get('/:id', getMilestoneById);

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/', createMilestone);
router.put('/:id', updateMilestone);
router.delete('/:id', deleteMilestone);

export default router;


import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import upload, { handleMulterError } from '../middleware/upload.js';
import {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
} from '../controllers/teamController.js';

const router = express.Router();

// Public routes
router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/', upload.single('image'), handleMulterError, createTeamMember);
router.put('/:id', upload.single('image'), handleMulterError, updateTeamMember);
router.delete('/:id', deleteTeamMember);

export default router;


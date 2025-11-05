import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import upload, { handleMulterError } from '../middleware/upload.js';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/', upload.array('images', 10), handleMulterError, createProject);
router.put('/:id', upload.array('images', 10), handleMulterError, updateProject);
router.delete('/:id', deleteProject);

export default router;


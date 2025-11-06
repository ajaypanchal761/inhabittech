import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import upload, { handleMulterError } from '../middleware/upload.js';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  uploadIcon
} from '../controllers/serviceController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (require authentication)
router.use(authenticateToken);

router.post('/upload-icon', upload.single('icon'), handleMulterError, uploadIcon);
router.post('/', upload.single('icon'), handleMulterError, createService);
router.put('/:id', upload.single('icon'), handleMulterError, updateService);
router.delete('/:id', deleteService);

export default router;


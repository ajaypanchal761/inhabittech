import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import upload, { handleMulterError } from '../middleware/upload.js';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController.js';

const router = express.Router();

// Public routes (no authentication required)
router.get('/', getAllServices);
router.get('/:id', getServiceById);

// Protected routes (require authentication)
router.use(authenticateToken);

// Removed upload-icon route - icons are now uploaded directly with service create/update
router.post('/', upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), handleMulterError, createService);
router.put('/:id', upload.fields([{ name: 'icon', maxCount: 1 }, { name: 'image', maxCount: 1 }]), handleMulterError, updateService);
router.delete('/:id', deleteService);

export default router;


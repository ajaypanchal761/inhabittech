import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  changePassword
} from '../controllers/adminController.js';

const router = express.Router();

// Public routes
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);

// Protected routes (require authentication)
router.use(authenticateToken);

router.get('/profile', getAdminProfile);
router.put('/change-password', changePassword);
router.get('/', getAllAdmins);
router.get('/:id', getAdminById);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;


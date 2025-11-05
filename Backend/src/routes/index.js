import express from 'express';
import adminRoutes from './adminRoutes.js';
import projectRoutes from './projectRoutes.js';

const router = express.Router();

// Admin routes
router.use('/admin', adminRoutes);

// Project routes
router.use('/projects', projectRoutes);

// Base route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Admin Panel API is working',
    version: '1.0.0'
  });
});

export default router;


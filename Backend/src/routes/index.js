import express from 'express';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// Admin routes
router.use('/admin', adminRoutes);

// Base route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Admin Panel API is working',
    version: '1.0.0'
  });
});

export default router;


import express from 'express';
import adminRoutes from './adminRoutes.js';
import projectRoutes from './projectRoutes.js';
import teamRoutes from './teamRoutes.js';
import milestoneRoutes from './milestoneRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import consultationRoutes from './consultationRoutes.js';

const router = express.Router();

// Admin routes
router.use('/admin', adminRoutes);

// Project routes
router.use('/projects', projectRoutes);

// Team routes
router.use('/team', teamRoutes);

// Milestone routes
router.use('/milestones', milestoneRoutes);

// Service routes
router.use('/services', serviceRoutes);

// Consultation routes
router.use('/consultations', consultationRoutes);

// Base route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Admin Panel API is working',
    version: '1.0.0'
  });
});

export default router;


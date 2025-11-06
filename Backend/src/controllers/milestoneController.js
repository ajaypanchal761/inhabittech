import Milestone from '../models/Milestone.js';
import { sendSuccess, sendError } from '../utils/response.js';

// Get all milestones
export const getAllMilestones = async (req, res, next) => {
  try {
    const { isActive } = req.query;
    const query = {};

    if (isActive !== undefined) {
      if (isActive === 'true' || isActive === true) {
        query.isActive = true;
      } else if (isActive === 'false' || isActive === false) {
        query.isActive = false;
      }
    }

    const milestones = await Milestone.find(query).sort({ order: 1, year: 1, createdAt: -1 });
    sendSuccess(res, 'Milestones retrieved successfully', { milestones, count: milestones.length });
  } catch (error) {
    next(error);
  }
};

// Get milestone by ID
export const getMilestoneById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const milestone = await Milestone.findById(id);

    if (!milestone) {
      return sendError(res, 'Milestone not found', 404);
    }

    sendSuccess(res, 'Milestone retrieved successfully', { milestone });
  } catch (error) {
    next(error);
  }
};

// Create milestone
export const createMilestone = async (req, res, next) => {
  try {
    const { year, title, description, position, order, isActive } = req.body;

    // Validate required fields
    if (!year || !title || !description) {
      return sendError(res, 'Year, title, and description are required', 400);
    }

    // Validate position
    if (position && !['left', 'right'].includes(position)) {
      return sendError(res, 'Position must be either "left" or "right"', 400);
    }

    const milestone = await Milestone.create({
      year,
      title,
      description,
      position: position || 'left',
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive === 'true' || isActive === true || isActive === undefined,
    });

    const createdMilestone = await Milestone.findById(milestone._id);
    sendSuccess(res, 'Milestone created successfully', { milestone: createdMilestone }, 201);
  } catch (error) {
    const errorMessage = error.message || 'Failed to create milestone';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Update milestone
export const updateMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { year, title, description, position, order, isActive } = req.body;

    const milestone = await Milestone.findById(id);
    if (!milestone) {
      return sendError(res, 'Milestone not found', 404);
    }

    // Validate position if provided
    if (position && !['left', 'right'].includes(position)) {
      return sendError(res, 'Position must be either "left" or "right"', 400);
    }

    // Update fields
    if (year) milestone.year = year;
    if (title) milestone.title = title;
    if (description !== undefined) milestone.description = description;
    if (position) milestone.position = position;
    if (order !== undefined) milestone.order = Number(order);
    if (isActive !== undefined) milestone.isActive = isActive === 'true' || isActive === true;

    await milestone.save();

    const updatedMilestone = await Milestone.findById(milestone._id);
    sendSuccess(res, 'Milestone updated successfully', { milestone: updatedMilestone });
  } catch (error) {
    const errorMessage = error.message || 'Failed to update milestone';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Delete milestone
export const deleteMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const milestone = await Milestone.findById(id);

    if (!milestone) {
      return sendError(res, 'Milestone not found', 404);
    }

    await Milestone.findByIdAndDelete(id);
    sendSuccess(res, 'Milestone deleted successfully');
  } catch (error) {
    next(error);
  }
};


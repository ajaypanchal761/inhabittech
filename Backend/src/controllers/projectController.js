import Project from '../models/Project.js';
import cloudinary from '../config/cloudinary.js';
import { sendSuccess, sendError } from '../utils/response.js';

// Get all projects
export const getAllProjects = async (req, res, next) => {
  try {
    const { isActive } = req.query;
    const query = {};

    // Handle isActive filter - can be 'true', 'false', or undefined
    if (isActive !== undefined) {
      // Convert string to boolean
      if (isActive === 'true' || isActive === true) {
        query.isActive = true;
      } else if (isActive === 'false' || isActive === false) {
        query.isActive = false;
      }
      // If neither true nor false, don't filter by isActive
    }
    // If isActive is not provided, return all projects (both active and inactive)

    const projects = await Project.find(query).sort({ createdAt: -1 });

    sendSuccess(res, 'Projects retrieved successfully', { projects, count: projects.length });
  } catch (error) {
    next(error);
  }
};

// Get project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    sendSuccess(res, 'Project retrieved successfully', { project });
  } catch (error) {
    next(error);
  }
};

// Create project
export const createProject = async (req, res, next) => {
  try {
    const {
      title,
      client,
      category,
      solutionType,
      description,
      location,
      completionYear,
      projectType,
      status,
      technologies,
      challenges,
      solutions
    } = req.body;

    // Validate required fields
    if (!title || !client || !category || !description) {
      return sendError(res, 'Title, client, category, and description are required', 400);
    }

    // Handle images from upload
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        // CloudinaryStorage returns: secure_url, url, public_id, etc.
        // Memory storage returns: buffer
        let imageUrl, publicId;

        if (file.secure_url || file.url || file.path) {
          // Cloudinary storage
          imageUrl = file.secure_url || file.url || file.path;
          publicId = file.public_id || file.filename;
        } else if (file.buffer) {
          // Memory storage (fallback) - would need to upload to Cloudinary manually
          // Skip these files as Cloudinary may not be configured
          return;
        }

        if (imageUrl && publicId) {
          images.push({
            url: imageUrl,
            publicId: publicId,
            isPrimary: index === 0
          });
        }
      });
    }

    // Parse arrays if they are strings (from FormData)
    let technologiesArray = [];
    let challengesArray = [];
    let solutionsArray = [];

    try {
      if (technologies) {
        if (typeof technologies === 'string') {
          technologiesArray = JSON.parse(technologies);
        } else if (Array.isArray(technologies)) {
          technologiesArray = technologies;
        }
      }
    } catch (e) {
      technologiesArray = [];
    }

    try {
      if (challenges) {
        if (typeof challenges === 'string') {
          challengesArray = JSON.parse(challenges);
        } else if (Array.isArray(challenges)) {
          challengesArray = challenges;
        }
      }
    } catch (e) {
      challengesArray = [];
    }

    try {
      if (solutions) {
        if (typeof solutions === 'string') {
          solutionsArray = JSON.parse(solutions);
        } else if (Array.isArray(solutions)) {
          solutionsArray = solutions;
        }
      }
    } catch (e) {
      solutionsArray = [];
    }

    const project = await Project.create({
      title,
      client,
      category,
      solutionType,
      description,
      location,
      completionYear,
      projectType,
      status: status || 'completed',
      technologies: technologiesArray,
      challenges: challengesArray,
      solutions: solutionsArray,
      images
    });

    sendSuccess(res, 'Project created successfully', { project }, 201);
  } catch (error) {
    // Delete uploaded images if project creation fails
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const publicId = file.public_id || file.filename;
        if (publicId) {
          cloudinary.uploader.destroy(publicId).catch(() => { });
        }
      });
    }
    // Pass error with proper message
    const errorMessage = error.message || 'Failed to create project';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Update project
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      client,
      category,
      solutionType,
      description,
      location,
      completionYear,
      projectType,
      status,
      technologies,
      challenges,
      solutions,
      deleteImages
    } = req.body;

    const project = await Project.findById(id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    // Handle new images
    const newImages = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        // CloudinaryStorage returns: secure_url, url, public_id, etc.
        const imageUrl = file.secure_url || file.url || file.path;
        const publicId = file.public_id || file.filename;

        if (imageUrl && publicId) {
          newImages.push({
            url: imageUrl,
            publicId: publicId,
            isPrimary: index === 0 && project.images.length === 0
          });
        }
      });
    }

    // Handle image deletion
    if (deleteImages) {
      const deleteIds = typeof deleteImages === 'string'
        ? JSON.parse(deleteImages)
        : deleteImages;

      for (const publicId of deleteIds) {
        await cloudinary.uploader.destroy(publicId).catch(console.error);
      }

      project.images = project.images.filter(
        img => !deleteIds.includes(img.publicId)
      );
    }

    // Add new images
    if (newImages.length > 0) {
      project.images.push(...newImages);
    }

    // Update other fields
    if (title) project.title = title;
    if (client) project.client = client;
    if (category) project.category = category;
    if (solutionType !== undefined) project.solutionType = solutionType;
    if (description) project.description = description;
    if (location !== undefined) project.location = location;
    if (completionYear !== undefined) project.completionYear = completionYear;
    if (projectType !== undefined) project.projectType = projectType;
    if (status) project.status = status;

    if (technologies !== undefined) {
      project.technologies = typeof technologies === 'string'
        ? JSON.parse(technologies)
        : technologies;
    }
    if (challenges !== undefined) {
      project.challenges = typeof challenges === 'string'
        ? JSON.parse(challenges)
        : challenges;
    }
    if (solutions !== undefined) {
      project.solutions = typeof solutions === 'string'
        ? JSON.parse(solutions)
        : solutions;
    }

    await project.save();
    sendSuccess(res, 'Project updated successfully', { project });
  } catch (error) {
    // Delete uploaded images if update fails
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        const publicId = file.public_id || file.filename;
        if (publicId) {
          cloudinary.uploader.destroy(publicId).catch(() => { });
        }
      });
    }
    // Pass error with proper message
    const errorMessage = error.message || 'Failed to update project';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Delete project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    // Delete images from Cloudinary
    if (project.images && project.images.length > 0) {
      for (const image of project.images) {
        await cloudinary.uploader.destroy(image.publicId).catch(() => { });
      }
    }

    await Project.findByIdAndDelete(id);
    sendSuccess(res, 'Project deleted successfully');
  } catch (error) {
    next(error);
  }
};


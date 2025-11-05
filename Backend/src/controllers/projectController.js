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
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];

        // CloudinaryStorage returns file object with Cloudinary upload response
        // The file object itself IS the Cloudinary upload result
        // Properties: url, secure_url, public_id, path, filename, etc.
        const imageUrl = file.secure_url || file.url || file.path;
        const publicId = file.public_id || file.filename;

        if (imageUrl && publicId) {
          // File is from CloudinaryStorage - already uploaded
          images.push({
            url: imageUrl,
            publicId: publicId,
            isPrimary: i === 0
          });
        } else if (file.buffer) {
          // File is from memory storage - need to upload to Cloudinary manually
          // This happens when CloudinaryStorage fails or Cloudinary is not configured
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: 'inhabittech/projects',
                  allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                  transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result && (result.secure_url || result.url)) {
              images.push({
                url: result.secure_url || result.url,
                publicId: result.public_id,
                isPrimary: i === 0
              });
            }
          } catch (uploadError) {
            // If upload fails, skip this image
            // Continue with other images
          }
        }
      }
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

    // Fetch the created project to ensure all fields are included
    const createdProject = await Project.findById(project._id);

    sendSuccess(res, 'Project created successfully', { project: createdProject }, 201);
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
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];

        // CloudinaryStorage returns file object with Cloudinary upload response
        // The file object itself IS the Cloudinary upload result
        // Properties: url, secure_url, public_id, path, filename, etc.
        const imageUrl = file.secure_url || file.url || file.path;
        const publicId = file.public_id || file.filename;

        if (imageUrl && publicId) {
          // File is from CloudinaryStorage - already uploaded
          newImages.push({
            url: imageUrl,
            publicId: publicId,
            isPrimary: i === 0 && project.images.length === 0
          });
        } else if (file.buffer) {
          // File is from memory storage - need to upload to Cloudinary manually
          // This happens when CloudinaryStorage fails or Cloudinary is not configured
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                {
                  folder: 'inhabittech/projects',
                  allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                  transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
                },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result && (result.secure_url || result.url)) {
              newImages.push({
                url: result.secure_url || result.url,
                publicId: result.public_id,
                isPrimary: i === 0 && project.images.length === 0
              });
            }
          } catch (uploadError) {
            // If upload fails, skip this image
            // Continue with other images
          }
        }
      }
    }

    // Handle image deletion
    if (deleteImages && deleteImages !== 'undefined' && deleteImages !== 'null') {
      let deleteIds = [];

      try {
        if (typeof deleteImages === 'string') {
          // Check if it's a valid JSON string
          if (deleteImages.trim().startsWith('[') || deleteImages.trim().startsWith('{')) {
            deleteIds = JSON.parse(deleteImages);
          } else if (deleteImages.trim() !== '' && deleteImages.trim() !== 'undefined') {
            // If it's not JSON, treat as single value array
            deleteIds = [deleteImages];
          }
        } else if (Array.isArray(deleteImages)) {
          deleteIds = deleteImages;
        }

        // Only proceed if we have valid delete IDs
        if (Array.isArray(deleteIds) && deleteIds.length > 0) {
          for (const publicId of deleteIds) {
            if (publicId) {
              await cloudinary.uploader.destroy(publicId).catch(() => { });
            }
          }

          project.images = project.images.filter(
            img => !deleteIds.includes(img.publicId)
          );
        }
      } catch (e) {
        // If parsing fails, skip image deletion
        // Don't throw error, just log and continue
      }
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

    if (technologies !== undefined && technologies !== null && technologies !== 'undefined' && technologies !== 'null') {
      try {
        project.technologies = typeof technologies === 'string'
          ? JSON.parse(technologies)
          : Array.isArray(technologies) ? technologies : [];
      } catch (e) {
        project.technologies = Array.isArray(technologies) ? technologies : [];
      }
    }
    if (challenges !== undefined && challenges !== null && challenges !== 'undefined' && challenges !== 'null') {
      try {
        project.challenges = typeof challenges === 'string'
          ? JSON.parse(challenges)
          : Array.isArray(challenges) ? challenges : [];
      } catch (e) {
        project.challenges = Array.isArray(challenges) ? challenges : [];
      }
    }
    if (solutions !== undefined && solutions !== null && solutions !== 'undefined' && solutions !== 'null') {
      try {
        project.solutions = typeof solutions === 'string'
          ? JSON.parse(solutions)
          : Array.isArray(solutions) ? solutions : [];
      } catch (e) {
        project.solutions = Array.isArray(solutions) ? solutions : [];
      }
    }

    await project.save();

    // Fetch the updated project to ensure all fields are included
    const updatedProject = await Project.findById(project._id);

    sendSuccess(res, 'Project updated successfully', { project: updatedProject });
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


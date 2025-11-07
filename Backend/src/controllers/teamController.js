import Team from '../models/Team.js';
import cloudinary from '../config/cloudinary.js';
import { sendSuccess, sendError } from '../utils/response.js';

const isCloudinaryConfigured = () => {
  return (
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

// Get all team members
export const getAllTeamMembers = async (req, res, next) => {
  try {
    const { isActive } = req.query;
    const query = {};

    // Handle isActive filter
    if (isActive !== undefined) {
      if (isActive === 'true' || isActive === true) {
        query.isActive = true;
      } else if (isActive === 'false' || isActive === false) {
        query.isActive = false;
      }
    }

    const teamMembers = await Team.find(query).sort({ order: 1, createdAt: -1 });

    sendSuccess(res, 'Team members retrieved successfully', { teamMembers, count: teamMembers.length });
  } catch (error) {
    next(error);
  }
};

// Get team member by ID
export const getTeamMemberById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return sendError(res, 'Team member not found', 404);
    }

    sendSuccess(res, 'Team member retrieved successfully', { teamMember });
  } catch (error) {
    next(error);
  }
};

// Create team member
export const createTeamMember = async (req, res, next) => {
  try {
    const { name, role, description, order } = req.body;

    // Validate required fields
    if (!name || !role || !description) {
      return sendError(res, 'Name, role, and description are required', 400);
    }

    // Handle image from upload
    // When using upload.single(), the file is in req.file, not req.files
    let imageData = null;
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    
    if (file) {
      // Check if file is from CloudinaryStorage (already uploaded)
      const imageUrl = file.secure_url || file.url || file.path;
      const publicId = file.public_id || file.filename;
      
      if (imageUrl && publicId) {
        // File is from CloudinaryStorage - already uploaded
        imageData = {
          url: imageUrl,
          publicId: publicId
        };
      } else if (file.buffer) {
        if (!isCloudinaryConfigured()) {
          return sendError(res, 'Failed to upload image: Cloudinary credentials are not configured on the server', 500);
        }
        // File is from memory storage - need to upload to Cloudinary manually
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'inhabittech/team',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  if (result) {
                    file.public_id = result.public_id;
                    file.secure_url = result.secure_url || result.url;
                  }
                  resolve(result);
                }
              }
            );
            uploadStream.end(file.buffer);
          });

          if (result && (result.secure_url || result.url) && result.public_id) {
            imageData = {
              url: result.secure_url || result.url,
              publicId: result.public_id
            };
          } else {
            return sendError(res, 'Failed to upload image: Invalid upload result', 400);
          }
        } catch (uploadError) {
          // If upload fails, return error
          console.error('Error uploading team image:', uploadError);
          return sendError(res, 'Failed to upload image: ' + (uploadError.message || 'Unknown error'), 400);
        }
      }
    }

    if (!imageData) {
      return sendError(res, 'Image is required', 400);
    }

    const teamMember = await Team.create({
      name,
      role,
      description,
      image: imageData,
      order: order || 0,
      isActive: true
    });

    // Fetch the created team member to ensure all fields are included
    const createdTeamMember = await Team.findById(teamMember._id);

    sendSuccess(res, 'Team member created successfully', { teamMember: createdTeamMember }, 201);
  } catch (error) {
    console.error('Error creating team member:', error);
    // Delete uploaded image if team member creation fails
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    if (file) {
      const publicId = file.public_id || file.filename;
      if (publicId) {
        cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }
    const errorMessage = error.message || 'Failed to create team member';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Update team member
export const updateTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById(id);
    if (!teamMember) {
      return sendError(res, 'Team member not found', 404);
    }

    const updates = {};

    const normalizeBoolean = (value) => {
      if (value === undefined || value === null || value === '') return undefined;
      if (value === true || value === 'true') return true;
      if (value === false || value === 'false') return false;
      return undefined;
    };

    const normalizeNumber = (value) => {
      if (value === undefined || value === null || value === '') return undefined;
      const numberValue = Number(value);
      return Number.isNaN(numberValue) ? undefined : numberValue;
    };

    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.role !== undefined) updates.role = req.body.role;
    if (req.body.description !== undefined) updates.description = req.body.description;

    const normalizedOrder = normalizeNumber(req.body.order);
    if (normalizedOrder !== undefined) {
      updates.order = normalizedOrder;
    }

    const normalizedIsActive = normalizeBoolean(req.body.isActive);
    if (normalizedIsActive !== undefined) {
      updates.isActive = normalizedIsActive;
    }

    // Handle new image if uploaded
    // When using upload.single(), the file is in req.file, not req.files
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    let oldImagePublicId = null;

    if (file) {
      let imageData = null;

      const imageUrl = file.secure_url || file.url || file.path;
      const publicId = file.public_id || file.filename;

      if (imageUrl && publicId) {
        // File is from CloudinaryStorage - already uploaded
        imageData = {
          url: imageUrl,
          publicId: publicId
        };
      } else if (file.buffer) {
        if (!isCloudinaryConfigured()) {
          return sendError(res, 'Failed to upload image: Cloudinary credentials are not configured on the server', 500);
        }
        // File is from memory storage - need to upload to Cloudinary manually
        try {
          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: 'inhabittech/team',
                allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
                transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });

          if (result && (result.secure_url || result.url)) {
            imageData = {
              url: result.secure_url || result.url,
              publicId: result.public_id
            };
          }
        } catch (uploadError) {
          return sendError(res, 'Failed to upload image: ' + (uploadError.message || 'Unknown error'), 400);
        }
      }

      if (!imageData) {
        return sendError(res, 'Failed to process uploaded image', 400);
      }

      updates.image = imageData;
      if (teamMember.image && teamMember.image.publicId) {
        oldImagePublicId = teamMember.image.publicId;
      }
    }

    // If no fields to update
    if (Object.keys(updates).length === 0) {
      return sendSuccess(res, 'No changes detected', { teamMember });
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedTeamMember) {
      return sendError(res, 'Failed to update team member', 500);
    }

    // Delete old image from Cloudinary after successful update
    if (oldImagePublicId) {
      await cloudinary.uploader.destroy(oldImagePublicId).catch(() => {});
    }

    sendSuccess(res, 'Team member updated successfully', { teamMember: updatedTeamMember });
  } catch (error) {
    console.error('Error updating team member:', error);
    // Delete uploaded image if update fails
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    if (file) {
      const publicId = file.public_id || file.filename;
      if (publicId) {
        cloudinary.uploader.destroy(publicId).catch(() => {});
      }
    }
    const errorMessage = error.message || 'Failed to update team member';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Delete team member
export const deleteTeamMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const teamMember = await Team.findById(id);

    if (!teamMember) {
      return sendError(res, 'Team member not found', 404);
    }

    // Delete image from Cloudinary
    if (teamMember.image && teamMember.image.publicId) {
      try {
        await cloudinary.uploader.destroy(teamMember.image.publicId);
      } catch (cloudinaryError) {
        console.error('Error deleting team member image from Cloudinary:', cloudinaryError);
      }
    }

    await Team.findByIdAndDelete(id);
    sendSuccess(res, 'Team member deleted successfully');
  } catch (error) {
    console.error('Error deleting team member:', error);
    next(error);
  }
};


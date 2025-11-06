import Service from '../models/Service.js';
import { sendSuccess, sendError } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';

// Get all services
export const getAllServices = async (req, res, next) => {
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

    const services = await Service.find(query).sort({ order: 1, createdAt: -1 });
    sendSuccess(res, 'Services retrieved successfully', { services, count: services.length });
  } catch (error) {
    next(error);
  }
};

// Get service by ID
export const getServiceById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    sendSuccess(res, 'Service retrieved successfully', { service });
  } catch (error) {
    next(error);
  }
};

// Create service
export const createService = async (req, res, next) => {
  try {
    const { title, description, keyFeatures, technologies, benefits, implementationSteps, successStory, order, isActive, iconUrl, iconPublicId } = req.body;

    // Validate required fields
    if (!title || !description) {
      return sendError(res, 'Title and description are required', 400);
    }

    // Handle icon upload
    // When using upload.fields(), files are in req.files
    let iconData = null;
    let imageData = null;

    // First check if icon URL is provided directly (from IconSelector)
    if (iconUrl) {
      iconData = {
        url: iconUrl,
        publicId: iconPublicId || ''
      };
    }
    // Otherwise, handle icon file upload
    else {
      // Handle icon file
      const iconFile = req.files?.icon ? req.files.icon[0] : (req.file?.fieldname === 'icon' ? req.file : null);

      if (iconFile) {
        const file = iconFile;
        // Check if file is from CloudinaryStorage (already uploaded)
        const imageUrl = file.secure_url || file.url || file.path;
        const publicId = file.public_id || file.filename;

        if (imageUrl && publicId) {
          // File is from CloudinaryStorage - already uploaded
          iconData = {
            url: imageUrl,
            publicId: publicId
          };
        } else if (file.buffer) {
          // File is from memory storage - need to upload to Cloudinary manually
          try {
            // Check if file is SVG
            const isSVG = file.mimetype === 'image/svg+xml' || file.mimetype === 'image/svg' || file.originalname?.endsWith('.svg');

            let uploadOptions = {
              folder: 'inhabittech/icons',
              resource_type: 'image',
            };

            if (isSVG) {
              // For SVG files, upload as image without format restrictions or transformations
              // Don't use allowed_formats for SVG - Cloudinary handles it automatically
            } else {
              // For non-SVG files, apply transformations
              uploadOptions.allowed_formats = ['jpg', 'jpeg', 'png', 'webp'];
              uploadOptions.transformation = [{ width: 200, height: 200, crop: 'fill', format: 'png' }];
            }

            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result && (result.secure_url || result.url)) {
              iconData = {
                url: result.secure_url || result.url,
                publicId: result.public_id
              };
            }
          } catch (uploadError) {
            // If upload fails, return error
            return sendError(res, 'Failed to upload icon: ' + (uploadError.message || 'Unknown error'), 400);
          }
        }
      }
    }

    // Handle image upload
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (imageFile) {
      const file = imageFile;

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
        // File is from memory storage - need to upload to Cloudinary manually
        try {
          const uploadOptions = {
            folder: 'inhabittech/services',
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 1200, height: 800, crop: 'limit' }],
          };

          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              uploadOptions,
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
          // If upload fails, return error
          return sendError(res, 'Failed to upload image: ' + (uploadError.message || 'Unknown error'), 400);
        }
      }
    }

    // Parse arrays if they are strings (from form data)
    let parsedKeyFeatures = keyFeatures;
    let parsedTechnologies = technologies;
    let parsedBenefits = benefits;
    let parsedImplementationSteps = implementationSteps;
    let parsedSuccessStory = successStory;

    if (typeof keyFeatures === 'string') {
      try {
        parsedKeyFeatures = JSON.parse(keyFeatures);
      } catch {
        parsedKeyFeatures = keyFeatures.split(',').map(item => item.trim()).filter(Boolean);
      }
    }

    if (typeof technologies === 'string') {
      try {
        parsedTechnologies = JSON.parse(technologies);
      } catch {
        parsedTechnologies = technologies.split(',').map(item => item.trim()).filter(Boolean);
      }
    }

    if (typeof benefits === 'string') {
      try {
        parsedBenefits = JSON.parse(benefits);
      } catch {
        parsedBenefits = benefits.split(',').map(item => item.trim()).filter(Boolean);
      }
    }

    if (typeof implementationSteps === 'string') {
      try {
        parsedImplementationSteps = JSON.parse(implementationSteps);
      } catch {
        parsedImplementationSteps = [];
      }
    }

    if (typeof successStory === 'string') {
      try {
        parsedSuccessStory = JSON.parse(successStory);
      } catch {
        parsedSuccessStory = {};
      }
    }

    const service = await Service.create({
      title,
      description,
      icon: iconData || {},
      image: imageData || {},
      keyFeatures: parsedKeyFeatures || [],
      technologies: parsedTechnologies || [],
      benefits: parsedBenefits || [],
      implementationSteps: parsedImplementationSteps || [],
      successStory: parsedSuccessStory || {},
      order: order !== undefined ? Number(order) : 0,
      isActive: isActive === 'true' || isActive === true || isActive === undefined,
    });

    const createdService = await Service.findById(service._id);
    sendSuccess(res, 'Service created successfully', { service: createdService }, 201);
  } catch (error) {
    // Delete uploaded icon if service creation fails
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    if (file) {
      const publicId = file.public_id || file.filename;
      if (publicId) {
        cloudinary.uploader.destroy(publicId).catch(() => { });
      }
    }
    const errorMessage = error.message || 'Failed to create service';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Update service
export const updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, keyFeatures, technologies, benefits, implementationSteps, successStory, order, isActive, deleteIcon, deleteImage } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    // Handle icon upload
    // When using upload.fields(), files are in req.files
    let iconData = null;

    // First check if icon URL is provided directly (from IconSelector)
    if (iconUrl) {
      // Delete old icon from Cloudinary if exists and different
      if (service.icon && service.icon.publicId && service.icon.publicId !== iconPublicId) {
        await cloudinary.uploader.destroy(service.icon.publicId).catch(() => { });
      }
      iconData = {
        url: iconUrl,
        publicId: iconPublicId || ''
      };
    }
    // Otherwise, handle icon file upload
    else {
      const iconFile = req.files?.icon ? req.files.icon[0] : (req.file?.fieldname === 'icon' ? req.file : null);

      if (iconFile) {
        const file = iconFile;
        // Delete old icon from Cloudinary if exists
        if (service.icon && service.icon.publicId) {
          await cloudinary.uploader.destroy(service.icon.publicId).catch(() => { });
        }

        // Check if file is from CloudinaryStorage (already uploaded)
        const imageUrl = file.secure_url || file.url || file.path;
        const publicId = file.public_id || file.filename;

        if (imageUrl && publicId) {
          // File is from CloudinaryStorage - already uploaded
          iconData = {
            url: imageUrl,
            publicId: publicId
          };
        } else if (file.buffer) {
          // File is from memory storage - need to upload to Cloudinary manually
          try {
            // Check if file is SVG
            const isSVG = file.mimetype === 'image/svg+xml' || file.mimetype === 'image/svg' || file.originalname?.endsWith('.svg');

            let uploadOptions = {
              folder: 'inhabittech/icons',
              resource_type: 'image',
            };

            if (isSVG) {
              // For SVG files, upload as image without format restrictions or transformations
              // Don't use allowed_formats for SVG - Cloudinary handles it automatically
            } else {
              // For non-SVG files, apply transformations
              uploadOptions.allowed_formats = ['jpg', 'jpeg', 'png', 'webp'];
              uploadOptions.transformation = [{ width: 200, height: 200, crop: 'fill', format: 'png' }];
            }

            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                uploadOptions,
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result);
                }
              );
              uploadStream.end(file.buffer);
            });

            if (result && (result.secure_url || result.url)) {
              iconData = {
                url: result.secure_url || result.url,
                publicId: result.public_id
              };
            }
          } catch (uploadError) {
            // If upload fails, return error
            return sendError(res, 'Failed to upload icon: ' + (uploadError.message || 'Unknown error'), 400);
          }
        }
      }
    }

    // Update icon if iconData is set
    if (iconData) {
      service.icon = iconData;
    }

    // Handle image upload
    const imageFile = req.files?.image ? req.files.image[0] : null;

    if (imageFile) {
      const file = imageFile;

      // Delete old image from Cloudinary if exists
      if (service.image && service.image.publicId) {
        await cloudinary.uploader.destroy(service.image.publicId).catch(() => { });
      }

      // Check if file is from CloudinaryStorage (already uploaded)
      const imageUrl = file.secure_url || file.url || file.path;
      const publicId = file.public_id || file.filename;

      if (imageUrl && publicId) {
        // File is from CloudinaryStorage - already uploaded
        service.image = {
          url: imageUrl,
          publicId: publicId
        };
      } else if (file.buffer) {
        // File is from memory storage - need to upload to Cloudinary manually
        try {
          const uploadOptions = {
            folder: 'inhabittech/services',
            resource_type: 'image',
            allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
            transformation: [{ width: 1200, height: 800, crop: 'limit' }],
          };

          const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              uploadOptions,
              (error, result) => {
                if (error) reject(error);
                else resolve(result);
              }
            );
            uploadStream.end(file.buffer);
          });

          if (result && (result.secure_url || result.url)) {
            service.image = {
              url: result.secure_url || result.url,
              publicId: result.public_id
            };
          }
        } catch (uploadError) {
          // If upload fails, return error
          return sendError(res, 'Failed to upload image: ' + (uploadError.message || 'Unknown error'), 400);
        }
      }
    }

    // Handle icon deletion if deleteIcon flag is set
    if (deleteIcon === 'true' && service.icon && service.icon.publicId) {
      await cloudinary.uploader.destroy(service.icon.publicId).catch(() => { });
      service.icon = {};
    }

    // Handle image deletion if deleteImage flag is set
    if (deleteImage === 'true' && service.image && service.image.publicId) {
      await cloudinary.uploader.destroy(service.image.publicId).catch(() => { });
      service.image = {};
    }

    // Parse arrays if they are strings
    if (keyFeatures !== undefined) {
      if (typeof keyFeatures === 'string') {
        try {
          service.keyFeatures = JSON.parse(keyFeatures);
        } catch {
          service.keyFeatures = keyFeatures.split(',').map(item => item.trim()).filter(Boolean);
        }
      } else {
        service.keyFeatures = keyFeatures;
      }
    }

    if (technologies !== undefined) {
      if (typeof technologies === 'string') {
        try {
          service.technologies = JSON.parse(technologies);
        } catch {
          service.technologies = technologies.split(',').map(item => item.trim()).filter(Boolean);
        }
      } else {
        service.technologies = technologies;
      }
    }

    if (benefits !== undefined) {
      if (typeof benefits === 'string') {
        try {
          service.benefits = JSON.parse(benefits);
        } catch {
          service.benefits = benefits.split(',').map(item => item.trim()).filter(Boolean);
        }
      } else {
        service.benefits = benefits;
      }
    }

    if (implementationSteps !== undefined) {
      if (typeof implementationSteps === 'string') {
        try {
          service.implementationSteps = JSON.parse(implementationSteps);
        } catch {
          service.implementationSteps = [];
        }
      } else {
        service.implementationSteps = implementationSteps;
      }
    }

    if (successStory !== undefined) {
      if (typeof successStory === 'string') {
        try {
          service.successStory = JSON.parse(successStory);
        } catch {
          service.successStory = {};
        }
      } else {
        service.successStory = successStory;
      }
    }

    // Update other fields
    if (title) service.title = title;
    if (description) service.description = description;
    if (order !== undefined) service.order = Number(order);
    if (isActive !== undefined) service.isActive = isActive === 'true' || isActive === true;

    await service.save();

    const updatedService = await Service.findById(service._id);
    sendSuccess(res, 'Service updated successfully', { service: updatedService });
  } catch (error) {
    // Delete uploaded icon if update fails
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);
    if (file) {
      const publicId = file.public_id || file.filename;
      if (publicId) {
        cloudinary.uploader.destroy(publicId).catch(() => { });
      }
    }
    const errorMessage = error.message || 'Failed to update service';
    const customError = new Error(errorMessage);
    customError.statusCode = error.statusCode || 500;
    next(customError);
  }
};

// Upload icon only
export const uploadIcon = async (req, res, next) => {
  try {
    // Handle icon upload
    const file = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);

    if (!file) {
      return sendError(res, 'Icon file is required', 400);
    }

    // Check if file is from CloudinaryStorage (already uploaded)
    const imageUrl = file.secure_url || file.url || file.path;
    const publicId = file.public_id || file.filename;

    let iconData = null;

    if (imageUrl && publicId) {
      // File is from CloudinaryStorage - already uploaded
      iconData = {
        url: imageUrl,
        publicId: publicId
      };
    } else if (file.buffer) {
      // File is from memory storage - need to upload to Cloudinary manually
      try {
        // Check if file is SVG
        const isSVG = file.mimetype === 'image/svg+xml' || file.mimetype === 'image/svg' || file.originalname?.endsWith('.svg');

        let uploadOptions = {
          folder: 'inhabittech/icons',
          resource_type: 'image', // Explicitly set resource type
        };

        if (isSVG) {
          // For SVG files, upload as image without format restrictions or transformations
          // Don't use allowed_formats for SVG - Cloudinary handles it automatically
        } else {
          // For non-SVG files, apply transformations
          uploadOptions.allowed_formats = ['jpg', 'jpeg', 'png', 'webp'];
          uploadOptions.transformation = [{ width: 200, height: 200, crop: 'fill', format: 'png' }];
        }

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            uploadOptions,
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        if (result && (result.secure_url || result.url)) {
          iconData = {
            url: result.secure_url || result.url,
            publicId: result.public_id
          };
        }
      } catch (uploadError) {
        // If upload fails, return error
        return sendError(res, 'Failed to upload icon: ' + (uploadError.message || 'Unknown error'), 400);
      }
    }

    if (!iconData) {
      return sendError(res, 'Failed to process icon', 400);
    }

    sendSuccess(res, 'Icon uploaded successfully', { icon: iconData });
  } catch (error) {
    next(error);
  }
};

// Delete service
export const deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return sendError(res, 'Service not found', 404);
    }

    // Delete icon from Cloudinary if exists
    if (service.icon && service.icon.publicId) {
      await cloudinary.uploader.destroy(service.icon.publicId).catch(() => { });
    }

    await Service.findByIdAndDelete(id);
    sendSuccess(res, 'Service deleted successfully');
  } catch (error) {
    next(error);
  }
};


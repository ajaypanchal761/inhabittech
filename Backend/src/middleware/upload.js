import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary.js';

// Check if Cloudinary is configured
const isCloudinaryConfigured = () => {
  return process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;
};

// Helper function to check if file is SVG
const isSVGFile = (file) => {
  return file.mimetype === 'image/svg+xml' ||
    file.mimetype === 'image/svg' ||
    file.originalname?.endsWith('.svg');
};

// Configure Cloudinary storage for multer
let cloudinaryStorage;
if (isCloudinaryConfigured()) {
  try {
    cloudinaryStorage = new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
        // Determine folder based on field name
        let folder = 'inhabittech/projects';
        let transformation = [{ width: 1920, height: 1080, crop: 'limit' }];

        if (file.fieldname === 'icon') {
          folder = 'inhabittech/icons';
          transformation = [{ width: 200, height: 200, crop: 'fill', format: 'png' }];
        } else if (file.fieldname === 'image') {
          folder = 'inhabittech/team';
          transformation = [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }];
        }

        return {
          folder: folder,
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
          transformation: transformation,
        };
      },
    });
  } catch (error) {
    // Fallback to memory storage if Cloudinary fails
    cloudinaryStorage = null;
  }
}

// Custom storage that uses memory storage for SVG files
const getStorage = () => {
  return {
    _handleFile: (req, file, cb) => {
      // For SVG files, always use memory storage to avoid CloudinaryStorage issues
      if (isSVGFile(file)) {
        const memoryStorage = multer.memoryStorage();
        return memoryStorage._handleFile(req, file, cb);
      }
      // For other files, use CloudinaryStorage if available, otherwise memory storage
      if (cloudinaryStorage) {
        return cloudinaryStorage._handleFile(req, file, cb);
      }
      const memoryStorage = multer.memoryStorage();
      return memoryStorage._handleFile(req, file, cb);
    },
    _removeFile: (req, file, cb) => {
      if (cloudinaryStorage && !isSVGFile(file)) {
        return cloudinaryStorage._removeFile(req, file, cb);
      }
      cb(null);
    }
  };
};

// Configure multer
const upload = multer({
  storage: getStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
  fileFilter: (req, file, cb) => {
    // Allow image files including SVG
    const allowedMimeTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/svg'
    ];

    // Check if file is SVG
    const isSVG = isSVGFile(file);

    if (file.mimetype.startsWith('image/') || allowedMimeTypes.includes(file.mimetype) || isSVG) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Error handling middleware for multer
export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size too large. Maximum size is 10MB.'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error'
    });
  }
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload error'
    });
  }
  next();
};

export default upload;

import Admin from '../models/Admin.js';
import jwt from 'jsonwebtoken';
import { sendSuccess, sendError } from '../utils/response.js';

// Generate JWT Token
const generateToken = (adminId) => {
  return jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET || 'your-secret-key',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

// Register Admin
export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return sendError(res, 'Name, email, and password are required', 400);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return sendError(res, 'Admin with this email already exists', 409);
    }

    // Create new admin
    const admin = await Admin.create({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'admin'
    });

    // Generate token
    const token = generateToken(admin._id);

    // Remove password from response
    const adminData = admin.toJSON();

    sendSuccess(res, 'Admin registered successfully', {
      admin: adminData,
      token
    }, 201);
  } catch (error) {
    next(error);
  }
};

// Login Admin
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return sendError(res, 'Email and password are required', 400);
    }

    // Find admin and include password field
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Check if admin is active
    if (!admin.isActive) {
      return sendError(res, 'Admin account is deactivated', 403);
    }

    // Check password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return sendError(res, 'Invalid email or password', 401);
    }

    // Generate token
    const token = generateToken(admin._id);

    // Remove password from response
    const adminData = admin.toJSON();

    sendSuccess(res, 'Login successful', {
      admin: adminData,
      token
    });
  } catch (error) {
    next(error);
  }
};

// Get Admin Profile
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.admin.id);
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }
    sendSuccess(res, 'Admin profile retrieved', { admin });
  } catch (error) {
    next(error);
  }
};

// Get All Admins
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    sendSuccess(res, 'Admins retrieved successfully', { admins, count: admins.length });
  } catch (error) {
    next(error);
  }
};

// Get Admin by ID
export const getAdminById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findById(id);
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }
    sendSuccess(res, 'Admin retrieved successfully', { admin });
  } catch (error) {
    next(error);
  }
};

// Update Admin
export const updateAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role, isActive } = req.body;

    const admin = await Admin.findById(id);
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    // Update fields
    if (name) admin.name = name;
    if (email) admin.email = email.toLowerCase();
    if (role) admin.role = role;
    if (typeof isActive === 'boolean') admin.isActive = isActive;

    await admin.save();

    sendSuccess(res, 'Admin updated successfully', { admin });
  } catch (error) {
    if (error.code === 11000) {
      return sendError(res, 'Email already exists', 409);
    }
    next(error);
  }
};

// Delete Admin
export const deleteAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const admin = await Admin.findById(id);
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    await Admin.findByIdAndDelete(id);
    sendSuccess(res, 'Admin deleted successfully');
  } catch (error) {
    next(error);
  }
};

// Change Password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.admin.id;

    // Validate required fields
    if (!currentPassword || !newPassword) {
      return sendError(res, 'Current password and new password are required', 400);
    }

    // Validate new password length
    if (newPassword.length < 6) {
      return sendError(res, 'New password must be at least 6 characters long', 400);
    }

    // Find admin and include password field
    const admin = await Admin.findById(adminId).select('+password');
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    // Check current password
    const isPasswordValid = await admin.comparePassword(currentPassword);
    if (!isPasswordValid) {
      return sendError(res, 'Current password is incorrect', 401);
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    sendSuccess(res, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};


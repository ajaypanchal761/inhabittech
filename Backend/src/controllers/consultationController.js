import Consultation from '../models/Consultation.js';
import { sendSuccess, sendError } from '../utils/response.js';

// Get all consultations (protected - admin only)
export const getAllConsultations = async (req, res, next) => {
  try {
    const { status } = req.query;
    
    const filter = {};
    if (status) {
      filter.status = status;
    }

    const consultations = await Consultation.find(filter)
      .populate('consultationInterest', 'title')
      .sort({ createdAt: -1 });

    sendSuccess(res, 'Consultations retrieved successfully', {
      consultations,
      count: consultations.length,
    });
  } catch (error) {
    next(error);
  }
};

// Get consultation by ID (protected - admin only)
export const getConsultationById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id)
      .populate('consultationInterest', 'title description');

    if (!consultation) {
      return sendError(res, 'Consultation not found', 404);
    }

    sendSuccess(res, 'Consultation retrieved successfully', { consultation });
  } catch (error) {
    next(error);
  }
};

// Create consultation (public)
export const createConsultation = async (req, res, next) => {
  try {
    const { fullName, email, company, phone, consultationInterest, message } = req.body;

    // Validate required fields
    if (!fullName || !email || !message) {
      return sendError(res, 'Full name, email, and message are required', 400);
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return sendError(res, 'Please provide a valid email address', 400);
    }

    // Validate message length
    if (message.length > 500) {
      return sendError(res, 'Message cannot exceed 500 characters', 400);
    }

    // Create consultation
    const consultation = await Consultation.create({
      fullName,
      email: email.toLowerCase(),
      company,
      phone,
      consultationInterest: consultationInterest || null,
      message,
      status: 'pending',
    });

    const createdConsultation = await Consultation.findById(consultation._id)
      .populate('consultationInterest', 'title');

    sendSuccess(res, 'Consultation request submitted successfully', { consultation: createdConsultation }, 201);
  } catch (error) {
    next(error);
  }
};

// Update consultation (protected - admin only)
export const updateConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return sendError(res, 'Consultation not found', 404);
    }

    // Update fields
    if (status) {
      const validStatuses = ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'];
      if (validStatuses.includes(status)) {
        consultation.status = status;
      } else {
        return sendError(res, 'Invalid status', 400);
      }
    }

    if (notes !== undefined) {
      consultation.notes = notes;
    }

    await consultation.save();

    const updatedConsultation = await Consultation.findById(consultation._id)
      .populate('consultationInterest', 'title');

    sendSuccess(res, 'Consultation updated successfully', { consultation: updatedConsultation });
  } catch (error) {
    next(error);
  }
};

// Delete consultation (protected - admin only)
export const deleteConsultation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const consultation = await Consultation.findById(id);

    if (!consultation) {
      return sendError(res, 'Consultation not found', 404);
    }

    await Consultation.findByIdAndDelete(id);

    sendSuccess(res, 'Consultation deleted successfully');
  } catch (error) {
    next(error);
  }
};


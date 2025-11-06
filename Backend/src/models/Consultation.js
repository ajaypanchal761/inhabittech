import mongoose from 'mongoose';

const consultationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  company: {
    type: String,
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  consultationInterest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: false, // Optional - can be null if service is deleted
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [500, 'Message cannot exceed 500 characters'],
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

consultationSchema.index({ status: 1 });
consultationSchema.index({ createdAt: -1 });
consultationSchema.index({ email: 1 });

const Consultation = mongoose.model('Consultation', consultationSchema);

export default Consultation;


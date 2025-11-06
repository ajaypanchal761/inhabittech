import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, 'Year is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  position: {
    type: String,
    enum: ['left', 'right'],
    default: 'left',
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

milestoneSchema.index({ order: 1 });
milestoneSchema.index({ year: 1 });
milestoneSchema.index({ isActive: 1 });

const Milestone = mongoose.model('Milestone', milestoneSchema);

export default Milestone;


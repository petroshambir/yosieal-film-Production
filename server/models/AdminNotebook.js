import mongoose from 'mongoose';

const adminNotebookSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    bookingDate: {
      type: String,
      required: true,
    },

    packageName: {
      type: String,
      default: '',
    },

    packagePrice: {
      type: String,
      default: '',
    },

    tier: {
      type: String,
      default: '',
    },

    packageServices: {
      type: [String],
      default: [],
    },

    packageFeatures: {
      type: [String],
      default: [],
    },

    timestamp: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const AdminNotebook = mongoose.model(
  'AdminNotebook',
  adminNotebookSchema
);

export default AdminNotebook;
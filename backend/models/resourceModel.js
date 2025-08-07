// backend/models/resourceModel.js
import mongoose from 'mongoose';

const resourceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: [true, 'Please add a subject'],
    },
    semester: {
      type: String,
      required: [true, 'Please add a semester'],
    },
    resourceType: {
      type: String,
      enum: ['notes', 'pyq'],
      required: [true, 'Please select a resource type'],
    },
    fileUrl: {
      type: String,
      required: [true, 'Please provide the file URL'],
    },
    frontPageImage: {
      type: String,
      required: false,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;

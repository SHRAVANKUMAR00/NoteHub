// backend/routes/resourceRoutes.js
import express from 'express';
const router = express.Router();
import multer from 'multer';
import Resource from '../models/resourceModel.js'; // Note the .js extension
import protect from '../middleware/authMiddleware.js'; // Note the .js extension

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in a folder named 'uploads'
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// @desc    Upload a new resource
// @route   POST /api/resources
// @access  Private (Admin only)
router.post('/', protect, upload.single('file'), async (req, res) => {
  const { title, description, subject, course, resourceType } = req.body;

  try {
    const resource = await Resource.create({
      title,
      description,
      subject,
      course,
      resourceType,
      fileUrl: `/uploads/${req.file.filename}`,
      // uploadedBy: req.user._id, // Will be set by the 'protect' middleware
    });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ message: 'Error uploading resource', error });
  }
});

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
router.get('/', async (req, res) => {
  const resources = await Resource.find();
  res.status(200).json(resources);
});

export default router; // Change module.exports to export default
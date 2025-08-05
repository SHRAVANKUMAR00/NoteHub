// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import User from '../models/userModel.js'; // Note the .js extension
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js'; // Note the .js extension
import asyncHandler from 'express-async-handler';

// @desc    Register a new admin user (for one-time use)
// @route   POST /api/users/register
// @access  Public
router.post('/register', asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Check if user already exists
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({ username, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      message: 'Admin user created successfully',
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}));


// @desc    Admin login
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      token: generateToken(user._id), // Send the JWT token
      message: 'Login successful',
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

export default router; // Change module.exports to export default
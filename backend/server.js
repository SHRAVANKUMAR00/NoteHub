// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Import your routes
const userRoutes = require('./routes/userRoutes');
const resourceRoutes = require('./routes/resourceRoutes'); // Import your new routes

dotenv.config();
connectDB();

const app = express();

// Middleware
// This allows your server to accept JSON data in the body of requests
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes); // Use your new resource routes

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
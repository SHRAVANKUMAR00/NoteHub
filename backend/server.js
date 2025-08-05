// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js'; // Note the .js extension and destructuring
import cors from 'cors'; // <--- IMPORT CORS HERE

// Import your routes
import userRoutes from './routes/userRoutes.js'; // Note the .js extension
import resourceRoutes from './routes/resourceRoutes.js'; // Note the .js extension

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // <--- USE CORS MIDDLEWARE HERE

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/resources', resourceRoutes);

// Serve static files from the 'uploads' directory
// This is crucial for serving the uploaded files publicly
import path from 'path';
import { fileURLToPath } from 'url'; // <--- CORRECTED LINE HERE

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
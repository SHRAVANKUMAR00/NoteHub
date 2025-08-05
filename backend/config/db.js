// backend/config/db.js
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // Keep MONGO_URI for consistency with your .env
    console.log("Database Connected");
  } catch (error) {
    console.log(error);
  }
};
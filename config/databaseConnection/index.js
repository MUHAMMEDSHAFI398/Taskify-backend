import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const dbconnect = async () => {
  try {
    const uri = process.env.MONGO_URL
    await mongoose.connect(uri, {});
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

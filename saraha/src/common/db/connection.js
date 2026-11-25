
import mongoose from "mongoose";
import { DATABASE } from "../../config/config.js";

export async function connectDB() {
    try {
        await mongoose.connect(DATABASE);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

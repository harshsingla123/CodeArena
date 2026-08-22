import mongoose from "mongoose";
import { ENV } from "./env.js";
export const connectDB = async () => {
    if (!ENV.DB_URL) {
        throw new Error("DB_URL is not configured");
    }

    const conn = await mongoose.connect(ENV.DB_URL);
    console.log(`MongoDB connected: ${conn.connection.host}`);
};

import mongoose from "mongoose";
import { DB_NAME } from "../constants/index.js"

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`Connected to MongoDB !! \n MongoDB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1);
    }
}
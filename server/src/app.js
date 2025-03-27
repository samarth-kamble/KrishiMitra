import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import dotenv from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";

dotenv.config(); // Load environment variables

const app = express();

// CORS setup for React Native
app.use(
    cors({
        origin: process.env.CORS_ORIGIN || "*", // Allow all origins for testing
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());


// Routes Import
import userRoutes from "./routes/users.routes.js";
import trendsRoutes from "./routes/trends.routes.js";
import communityRoutes from "./routes/community.routes.js"; //server\src\routes\community.routes.js

// API Routes
app.use("/api/auth", userRoutes);
app.use("/api/trends", trendsRoutes);
app.use("/api/community", communityRoutes);

// Health Check Route
app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "API is running!" });
});

// Global Error Handling
app.use(errorHandler);

export { app };

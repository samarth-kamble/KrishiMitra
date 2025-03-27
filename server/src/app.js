import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";

import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();


app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(cookieParser());



//routes import
import userRoutes from "./routes/users.routes.js";
import trendsRoutes from "./routes/trends.routes.js";

// routes declaration
app.use("/api/auth", userRoutes);
app.use("/api/trends", trendsRoutes);



// Error handling middleware
app.use(errorHandler);

export { app };

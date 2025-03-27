import "dotenv/config";  // Loads environment variables
import {app} from "./app.js";
import { connectDB } from "./db/index.db.js";


const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, "0.0.0.0",() => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
    process.exit(1);
});


// import express from "express";
// import multer from "multer";

// const app = express();
// const upload = multer({ dest: "uploads/" });

// app.post("/test-upload", upload.single("image"), (req, res) => {
//     console.log("🟢 Multer Test Executed");
//     console.log("🟢 Received File:", req.file);
//     console.log("🟢 Request Body:", req.body);
//     res.send("File uploaded!");
// });

app.listen(3000, () => console.log("🟢 Server running on port 3000"));

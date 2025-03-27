import "dotenv/config";  // Loads environment variables
import {app} from "./app.js";
import { connectDB } from "./db/index.db.js";


const PORT = process.env.PORT || 8080;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log("MongoDB connection failed", error);
    process.exit(1);
});



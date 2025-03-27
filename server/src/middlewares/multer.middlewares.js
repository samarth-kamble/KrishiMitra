import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "community-posts", // Change as needed
    format: async (req, file) => "png", // Or 'jpeg', 'jpg', etc.
    public_id: (req, file) => file.originalname.split(".")[0], // Use file name without extension
  },
});

export const upload = multer({ storage });

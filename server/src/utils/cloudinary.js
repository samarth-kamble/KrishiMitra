import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Upload Image to Cloudinary
export const uploadOnCloudinary = async (fileBuffer) => {
  try {
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${fileBuffer}`, {
      folder: "farmer_posts",
    });
    return result.secure_url;
  } catch (error) {
    throw new Error("Cloudinary upload failed");
  }
};

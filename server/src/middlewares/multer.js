import multer from "multer";

// ✅ Multer Config (Store in Memory)
export const upload = multer({
  storage: multer.memoryStorage(), // Store in RAM instead of disk
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

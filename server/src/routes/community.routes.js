import { Router } from "express";
// import { upload } from "../middlewares/multer.middlewares.js"; // Import the new multer config
import {
  getAllPosts,
  addPost,
  likePost,
  unlikePost,
  deletePost,
  getComments,
  addComment,
  deleteComment,
} from "../controllers/community.controller.js";

import { upload } from "../middlewares/multer.js";

const router = Router();

// ✅ Get all posts
router.get("/all-posts", getAllPosts);

// ✅ Add a post (User ID required, Direct Upload to Cloudinary)
router.post("/add-post/:userId", upload.single("image"), addPost);

// ✅ Like a post
router.post("/like-post/:postId/:userId", likePost);

// ✅ Unlike a post
router.post("/unlike-post/:postId/:userId", unlikePost);

// ✅ Delete a post
router.post("/delete-post/:postId", deletePost);

// ✅ Get comments for a post
router.get("/:postId/comments", getComments);

// ✅ Add a comment to a post
router.post("/:postId/comments", addComment);

// ✅ Delete a comment
router.post("/:postId/comments/:commentId", deleteComment);

export default router;

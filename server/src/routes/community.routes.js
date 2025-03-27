import { Router } from "express";
import { 
    getAllPosts, 
    addPost, 
    likePost, 
    unlikePost, 
    deletePost, 
    getComments, 
    addComment, 
    deleteComment 
} from "../controllers/community.controller.js";

const router = Router();

// ✅ Get all posts
router.get("/all-posts", getAllPosts);

// ✅ Add a post (User ID required)
router.post("/add-post/:userId", addPost);

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

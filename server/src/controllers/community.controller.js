import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Post } from "../models/posts.models.js";
import { Comment } from "../models/comments.models.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// ✅ Get all posts
const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
        .populate("author", "name") // Populate author's name
        .populate("comments") 
        .populate("likes", "name"); // Populate likes with user names

    res.status(200).json(new ApiResponse(200, { posts }, "All posts fetched successfully"));
});

// ✅ Add a new post with Base64 image storage
const addPost = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { description } = req.body;

    if (!description) throw new ApiError(400, "Post description is required");

    let imageUrl = null;
    // console.log(req.file);
    if (req.file) {
        imageUrl = await uploadOnCloudinary(req.file.buffer.toString("base64"));
    }

    const post = await Post.create({ author: userId, description, image: imageUrl });

    res.status(201).json(new ApiResponse(201, { post }, "Post created successfully"));
});



// ✅ Like a post
const likePost = asyncHandler(async (req, res) => {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");

    if (!post.likes.includes(userId)) {
        post.likes.push(userId);
        await post.save();
    }

    res.status(200).json(new ApiResponse(200, { post }, "Post liked successfully"));
});

// ✅ Unlike a post
const unlikePost = asyncHandler(async (req, res) => {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");

    post.likes = post.likes.filter(id => id.toString() !== userId);
    await post.save();

    res.status(200).json(new ApiResponse(200, { post }, "Post unliked successfully"));
});

// ✅ Delete a post
const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) throw new ApiError(404, "Post not found");

    await User.findByIdAndUpdate(post.author, { $pull: { posts: postId } });
    await post.deleteOne();

    res.status(200).json(new ApiResponse(200, null, "Post deleted successfully"));
});

// ✅ Get comments for a post
const getComments = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    const post = await Post.findById(postId).populate({
        path: "comments",
        populate: { path: "user", select: "name" },
    });

    if (!post) throw new ApiError(404, "Post not found");

    res.status(200).json(new ApiResponse(200, { comments: post.comments }, "Comments fetched successfully"));
});

// ✅ Add a comment
const addComment = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { userId, message } = req.body;

    if (!message) throw new ApiError(400, "Comment message is required");

    const comment = await Comment.create({ user: userId, message });
    await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

    res.status(201).json(new ApiResponse(201, { comment }, "Comment added successfully"));
});

// ✅ Delete a comment
const deleteComment = asyncHandler(async (req, res) => {
    const { postId, commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) throw new ApiError(404, "Comment not found");

    await comment.deleteOne();
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    res.status(200).json(new ApiResponse(200, null, "Comment deleted successfully"));
});

export { 
    getAllPosts, 
    addPost, 
    likePost, 
    unlikePost, 
    deletePost, 
    getComments, 
    addComment, 
    deleteComment 
};
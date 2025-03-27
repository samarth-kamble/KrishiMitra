import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
        },
        image: {
            type: String, // Store image URL
        },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
        comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }], // Comments on the post
    },
    { timestamps: true }
);

export const Post = mongoose.model("Post", postSchema);

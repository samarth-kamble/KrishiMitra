import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        message: {
            type: String,
            required: [true, "Message is required"],
        },
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);

import mongoose, { Schema } from "mongoose";

const schemeSchema = new Schema(
    {
        State: {
            type: String,
            required: [true, "State is required"],
        },
        Scheme_Name: {
            type: String,
            required: [true, "Scheme name is required"],
        },
        Description: {
            type: String,
            required: [true, "Description is required"],
        },
        Eligibility: {
            type: String,
            required: [true, "Eligibility is required"],
        },
        Link: {
            type: String,
            required: [true, "Link is required"],
        },
    },
    { timestamps: true }
);

export const Scheme = mongoose.model("Scheme", schemeSchema);

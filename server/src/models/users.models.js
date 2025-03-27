import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Define user roles
const userRoles = {
    farmer: "farmer",
    expert: "expert",
    admin: "admin",
};

// Define the schema
const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"], // Password is required for ALL
        },
        role: {
            type: String,
            enum: Object.values(userRoles), // Restrict role values
            required: [true, "Role is required"],
        },
        posts: [],
        follwers: [],
        following: [],
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

// Validate student-specific fields
userSchema.pre("validate", function (next) {
    if (this.role === userRoles.STUDENT) {
        if (!this.prn) {
            return next(new Error("PRN is required for students."));
        }
        if (!this.rollNo) {
            return next(new Error("Roll number is required for students."));
        }
    }
    next();
});

// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate Access Token
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Generate Refresh Token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);

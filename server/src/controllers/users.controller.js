import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/users.models.js";

// Generate tokens
const generateAccessAndRefreshToken = async (user) => {
    try {
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Token generation failed");
    }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if (![name, email, password].every(Boolean)) {
        throw new ApiError(400, "All required fields must be provided");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({ name, email, password, role });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "User registration failed");
    }

    res.status(201).json(new ApiResponse(201, { user: createdUser }, "User registered successfully"));
});

// Login User
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(200).json(new ApiResponse(200, { 
        user: loggedInUser, 
        accessToken, 
        refreshToken 
    }, "Login successful"));
});

// Logout User
const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: "" }, { new: true });

    res.status(200).json(new ApiResponse(200, {}, "Logout successful"));
});

// Get logged-in user profile
const getMe = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, { user }, "User details fetched successfully"));
});

// Get specific user by ID
const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    res.status(200).json(new ApiResponse(200, { user }, "User details fetched successfully"));
});

export { registerUser, loginUser, logoutUser, getMe, getUser };

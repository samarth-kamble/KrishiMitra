import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Scheme } from "../models/schemes.models.js";

// Get weather data based on latitude & longitude
const getWeather = asyncHandler(async (req, res) => {
    const { lat, lon } = req.query;

    // Validate Latitude & Longitude
    if (!lat || !lon) {
        throw new ApiError(400, "Latitude and Longitude are required");
    }

    // Get API Key from Environment Variables
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
        throw new ApiError(500, "Weather API key is missing");
    }

    // Construct OpenWeather API URL
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);
        const weatherData = response.data;

        // Format the Response Data
        const formattedWeather = {
            temperature: weatherData.main.temp,
            weather: weatherData.weather[0].description,
            humidity: weatherData.main.humidity,
            windSpeed: weatherData.wind.speed,
            location: weatherData.name || "Unknown",
        };

        res.status(200).json(new ApiResponse(200, formattedWeather, "Weather data fetched successfully"));
    } catch (error) {
        console.error("⚠ Weather API Error:", error.response?.data || error.message);

        if (error.response) {
            // Handle API-specific errors
            const errorMessage = error.response.data?.message || "Error fetching weather data";
            throw new ApiError(error.response.status, errorMessage);
        }

        throw new ApiError(500, "Failed to fetch weather data");
    }
});

// Get Government Schemes based on state
const getSchemes = asyncHandler(async (req, res) => {
    const { state } = req.query; 

    let query = state ? { $or: [{ State: state }, { State: "All India" }] } : { State: "All India" };

    const schemes = await Scheme.find(query);

    if (!schemes.length) {
        throw new ApiError(404, "No schemes found");
    }

    res.status(200).json(new ApiResponse(200, { schemes }, "Schemes fetched successfully"));
});

export { getWeather, getSchemes };

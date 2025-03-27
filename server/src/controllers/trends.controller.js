import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Scheme } from "../models/schemes.models.js";

// Get weather data based on latitude & longitude
const getWeather = asyncHandler(async (req, res) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
        throw new ApiError(400, "Latitude and Longitude are required");
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;  
    if (!apiKey) {
        throw new ApiError(500, "Weather API key is missing");
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await axios.get(weatherUrl);

        res.status(200).json(
            new ApiResponse(200, {
                temperature: response.data.main.temp,
                weather: response.data.weather[0].description,
                humidity: response.data.main.humidity,
                windSpeed: response.data.wind.speed,
                location: response.data.name,
            }, "Weather data fetched successfully")
        );
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);
        throw new ApiError(500, error.response?.data?.message || "Failed to fetch weather data");
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

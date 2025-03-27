import { Router } from "express";
import { getSchemes, getWeather } from "../controllers/trends.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/schemes").get(getSchemes);
router.route("/weather").get(getWeather);

export default router;

import { Router } from "express";
import { cattle, crop } from "../controllers/diagnosis.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route("/cattle").get(cattle);
router.route("/crop").get(crop);

export default router;

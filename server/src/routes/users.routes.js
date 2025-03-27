import { Router } from "express";
import { registerUser, loginUser, logoutUser, getMe, getUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// secured routes
router.route("/me").get(verifyJWT(["farmer","admin","vet"]), getMe);
router.route("/:id").get(verifyJWT(["farmer","admin","vet"]), getUser);
router.route("/logout").post(verifyJWT(["farmer","admin","vet"]), logoutUser);

export default router;  
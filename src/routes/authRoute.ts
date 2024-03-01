import experss from "express";
const router = experss.Router();

// importing controllers
import { Register, Login, getProfile } from "../controller/AuthService";
import { jwtValidateToken } from "../config/Authentication";

// using routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/getProfile", jwtValidateToken, getProfile);
export default router;

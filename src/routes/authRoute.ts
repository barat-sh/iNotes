import experss from "express";
const router = experss.Router();

// importing controllers
import { Register, Login, getProfile } from "../controller/AuthService";

// using routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/getProfile", getProfile);
export default router;

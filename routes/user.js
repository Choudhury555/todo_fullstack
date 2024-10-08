import express from "express";
import { forgotPassword, getMyProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);//"isAuthenticated" is to check if user is logged in or not

router.post("/forgotpassword",forgotPassword);


export default router;
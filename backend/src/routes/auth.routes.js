import express from "express"
import {login, logout, signup,checkAuth,updateProfile} from "../controller/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.post("/signup",signup)// we handling signup route which is handle in auth.controller

router.post("/login",login)

router.post("/logout",logout)
router.put( "/update-profile", protectRoute,updateProfile) //initializing middleware protectRoute which confirm user then allow to change dp
router.get("/check",protectRoute,checkAuth)
export default router;
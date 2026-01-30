import express from "express";
import { protectRoute } from "../middlewar/auth.middleware.js";

import { signup , login ,logout ,onboard ,me} from "../controllers/auth.controller.js";

const router =express.Router();

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout);

router.get("/me",protectRoute,me);

router.post("/onboard",protectRoute,onboard);

export default router;
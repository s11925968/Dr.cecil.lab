import { Router } from "express";
import * as AuthController from "./controller/auth.controller.js";
const router = Router();
router.post("/signup", AuthController.userSignup);
router.post("/signin", AuthController.userSignin);
router.get("/confirmEmail/:token", AuthController.confirmEmail);
router.patch("/sendCode", AuthController.sendCode);
router.patch("/forgetPassword", AuthController.forgetPassword);

export default router;

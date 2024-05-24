import { Router } from "express";
import authController from "@/controllers/auth.ts";

const router = Router();

router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/register", authController.register);

export default router;

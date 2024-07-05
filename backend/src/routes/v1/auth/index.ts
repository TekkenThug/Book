import { Router } from "express";
import validate from "@/middlewares/validate";
import auth from "@/middlewares/auth";
import authValidation from "@/validations/auth";
import authController from "@/controllers/auth";

const router = Router();

router.post("/login", validate(authValidation.login), authController.login);
router.post("/logout", auth, authController.logout);
router.post("/register", validate(authValidation.register), authController.register);
router.post("/refresh", auth, authController.refreshTokens);
router.post("/verify-email", validate(authValidation.verifyEmail), authController.verifyEmail)

export default router;

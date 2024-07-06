import { Router } from "express";
import auth from "@/middlewares/auth";
import validate from "@/middlewares/validate";
import userValidation from "@/validations/user";
import userController from "@/controllers/users";

const router = Router();

router.route("/settings").patch(auth(), validate(userValidation.update), userController.update);

export default router;

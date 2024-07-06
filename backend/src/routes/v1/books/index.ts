import { Router } from "express";
import auth from "@/middlewares/auth";
import validate from "@/middlewares/validate";
import bookValidation from "@/validations/book";
import bookController from "@/controllers/books";

const router = Router();

router.route("/").get(auth(), validate(bookValidation.find), bookController.get);

export default router;

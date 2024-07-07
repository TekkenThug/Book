import { Router } from "express";
import auth from "@/middlewares/auth";
import recordsController from "@/controllers/records";

const router = Router();

router.route("/").post(auth(), recordsController.createRecordToEvent);

export default router;

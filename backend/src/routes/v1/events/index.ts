import { Router } from "express";
import auth from "@/middlewares/auth";
import eventController from "@/controllers/events";
import validate from "@/middlewares/validate";
import eventsValidation from "@/validations/event";

const router = Router();

router
  .route("/")
  .post(auth(), validate(eventsValidation.create), eventController.create)
  .get(validate(eventsValidation.get), eventController.get);

router.get("/my", auth(), eventController.getEventsOfUser);
router.get("/with-checked", auth(), validate(eventsValidation.get), eventController.getChecked);

export default router;

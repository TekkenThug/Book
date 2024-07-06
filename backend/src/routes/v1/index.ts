import { Router } from "express";
import config from "@/configs/config";

import authRouter from "./auth";
import usersRouter from "./users";
import docsRouter from "./docs";
import booksRouter from "./books";
import eventsRouter from "./events";

const router = Router();

router.use("/auth", authRouter);
router.use("/books", booksRouter);
router.use("/users", usersRouter);
router.use("/events", eventsRouter);

if (config.env === "dev") {
  router.use("/docs", docsRouter);
}

export default router;

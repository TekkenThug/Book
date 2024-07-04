import https from "https";
import fs from "fs";
import { AppDataSource } from "@/database";
import logger from "@/configs/logger";
import config from "@/configs/config";
import app from "@/app";

let server: ReturnType<typeof app.listen> | null = null;
AppDataSource.initialize().then(() => {
  logger.info("Connected to Postgres");

  server = (
    config.env === "prod"
      ? https.createServer(
          {
            key: fs.readFileSync("localhost-key.pem"),
            cert: fs.readFileSync("localhost.pem"),
          },
          app,
        )
      : app
  ).listen(config.port, () => {
    logger.info(`Server started at ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

import morgan from "morgan";
import * as http from "http";
import config from "./config";
import logger from "./logger";

morgan.token<http.IncomingMessage, http.ServerResponse & { locals: { errorMessage?: string } }>(
  "message",
  (_, res) => res.locals.errorMessage || "",
);

const getIpFormat = () => (config.env === "prod" ? ":remote-addr - " : "");
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (_, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export default {
  successHandler,
  errorHandler,
};

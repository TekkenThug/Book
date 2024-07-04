import { Options } from "swagger-jsdoc";
import config from "@/configs/config";

const swaggerDef: Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Books API documentation",
      version: config.appVersion,
    },
    servers: [
      {
        url: `${config.appUrl}:${config.port}/api/v1`,
      },
    ],
  },
};

export default swaggerDef;

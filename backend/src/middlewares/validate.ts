import { ZodSchema } from "zod";
import { fromError } from "zod-validation-error";
import pick from "lodash.pick";
import status from "statuses";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "@/utils/errors";

export default (schema: ZodSchema) => (req: Request, _: Response, next: NextFunction) => {
  const object = pick(req, ["params", "query", "body"]);
  const result = schema.safeParse(object);

  if (!result.success) {
    return next(new ApiError(status("Bad request"), fromError(result.error).toString()));
  }

  Object.assign(req, result.data)

  return next();
};

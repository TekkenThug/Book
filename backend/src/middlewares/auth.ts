import passport from "passport";
import { NextFunction, Request, Response } from "express";
import status from "statuses";
import { ApiError } from "@/utils/errors";
import { Roles } from "@/configs/roles";

const verifyCallback = (req: Request, resolve, reject, role: Roles) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(status("Unauthorized"), "Please authenticate"));
  }

  req.user = user;

  if (user.role !== role) {
    return reject(new ApiError(status("Forbidden"), "Forbidden"));
  }

  resolve();
};

export default (role: Roles = Roles.USER) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new Promise((resolve, reject) => {
        passport.authenticate(
          "jwt",
          {
            session: false,
          },
          verifyCallback(req, resolve, reject, role),
        )(req, res, next);
      });
      return next();
    } catch (err) {
      return next(err);
    }
  };

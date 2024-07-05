import status from "statuses";
import { getUnixTime } from "date-fns";
import { Response } from "express";
import { catchAsync } from "@/utils/errors";
import UserService from "@/services/UserService";
import AuthService from "@/services/AuthService";
import TokenService from "@/services/TokenService";

const setRefreshToken = (res: Response, token: Awaited<ReturnType<typeof TokenService.generateAuthTokens>>["refresh"]) => {
  res.cookie("refreshToken", token.token, {
    maxAge: token.expires - getUnixTime(new Date()) * 1000,
    path: "/api/v1/auth",
    httpOnly: true,
  });
};

const register = catchAsync(async (req, res) => {
  await UserService.registerNewUser(req.body);

  res.status(status("Created")).send({ message: "Check your email for confirmation registration" });
});

const login = catchAsync(async (req, res) => {
  const user = await AuthService.login(req.body);
  const tokens = await TokenService.generateAuthTokens(user);
  setRefreshToken(res, tokens.refresh);

  res.send(tokens.access);
});

const logout = catchAsync(async (req, res) => {
  await AuthService.logout(req.cookies.refreshToken);
  res.clearCookie("refreshToken");
  res.status(status("OK")).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await AuthService.refreshAuth(req.cookies.refreshToken);
  setRefreshToken(res, tokens.refresh);

  res.send(tokens.access);
});

const verifyEmail = catchAsync(async (req, res) => {
  await AuthService.verifyEmail(req.body.token);
  res.send({ message: "Email is verified successfully" });
});

export default { register, login, logout, refreshTokens, verifyEmail };

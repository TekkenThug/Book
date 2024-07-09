import jwt from "jsonwebtoken";
import { addDays, addMinutes, getTime } from "date-fns";
import status from "statuses";
import { User } from "@/database/entity/User";
import config from "@/configs/config";
import { TokenTypes } from "@/configs/tokens";
import { AppDataSource } from "@/database";
import { Token } from "@/database/entity/Token";
import UserService from "@/services/UserService";
import { Timestamp } from "@/types/common";
import { ApiError } from "@/utils/errors";

export default class TokenService {
  private static repository = AppDataSource.getRepository(Token);

  private static async generateToken(userId: number, expires: Timestamp, type: string, secret = config.jwt.secret) {
    const payload = {
      sub: userId,
      iat: getTime(new Date()),
      exp: expires,
      type,
    };
    return jwt.sign(payload, secret);
  }

  private static async saveToken(token: string, userId: number, expires: number, type: TokenTypes) {
    const user = await UserService.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const newToken = new Token();

    newToken.token = token;
    newToken.user = user;
    newToken.type = type;
    newToken.expires = expires;

    return await TokenService.repository.save(newToken);
  }

  static async generateAuthTokens(user: User) {
    const accessTokenExpires = getTime(addMinutes(new Date(), +config.jwt.accessExpirationMinutes));
    const accessToken = await TokenService.generateToken(user.id, accessTokenExpires, TokenTypes.ACCESS);

    const refreshTokenExpires = getTime(addDays(new Date(), +config.jwt.refreshExpirationDays));
    const refreshToken = await TokenService.generateToken(user.id, refreshTokenExpires, TokenTypes.REFRESH);
    await TokenService.saveToken(refreshToken, user.id, refreshTokenExpires, TokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires,
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires,
      },
    };
  }

  static async invalidateRefreshToken(token: string) {
    const foundToken = await TokenService.repository.findOneBy({ token });

    if (!foundToken) {
      throw new ApiError(status("Not found"), "Not found");
    }

    await TokenService.repository.remove(foundToken);
  }

  static async deleteEmailVerifyTokens(user: User) {
    await TokenService.repository.delete({ user, type: TokenTypes.VERIFY_EMAIL });
  }

  static async verifyToken(token: string, type: TokenTypes) {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenRecord = await TokenService.repository.findOne({
      where: { token, type, user: { id: Number(payload.sub) } },
      relations: ["user"],
    });

    if (!tokenRecord) {
      throw new Error("Not found");
    }

    return tokenRecord;
  }

  static async generateEmailToken(user: User) {
    const expires = getTime(addMinutes(new Date(), +config.jwt.emailVerifyExpirationMinutes));
    const verifyEmailToken = await TokenService.generateToken(user.id, expires, TokenTypes.VERIFY_EMAIL);
    await TokenService.saveToken(verifyEmailToken, user.id, expires, TokenTypes.VERIFY_EMAIL);
    return verifyEmailToken;
  }
}

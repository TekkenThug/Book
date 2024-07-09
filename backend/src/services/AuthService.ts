import status from "statuses";
import UserService from "@/services/UserService";
import { ApiError } from "@/utils/errors";
import TokenService from "@/services/TokenService";
import { TokenTypes } from "@/configs/tokens";

interface Credentials {
  email: string;
  password: string;
}

export default class AuthService {
  static async login(credentials: Credentials) {
    const user = await UserService.getByEmail(credentials.email);

    if (!user || !(await UserService.comparePasswords(credentials.password, user.password))) {
      throw new ApiError(status("Unauthorized"), "Incorrect email or password");
    }

    if (!user.verified_email) {
      throw new ApiError(status("Unauthorized"), "Email is not verified");
    }

    return user;
  }

  static async logout(refreshToken: string) {
    await TokenService.invalidateRefreshToken(refreshToken);
  }

  static async refreshAuth(refreshToken: string) {
    try {
      const token = await TokenService.verifyToken(refreshToken, TokenTypes.REFRESH);
      const user = await UserService.getById(token.user.id);

      if (!user) {
        throw new Error();
      }

      await TokenService.invalidateRefreshToken(token.token);

      return await TokenService.generateAuthTokens(user);
    } catch (e) {
      throw new ApiError(status("Unauthorized"), "Please authenticate");
    }
  }

  static async verifyEmail(token: string) {
    try {
      const verifiedToken = await TokenService.verifyToken(token, TokenTypes.VERIFY_EMAIL);
      const user = await UserService.getById(verifiedToken.user.id);

      if (!user) {
        throw new ApiError(status("Unauthorized"), 'Email verification failed');
      }

      await TokenService.deleteEmailVerifyTokens(user);
      await UserService.markVerifiedEmail(user);
    } catch (e) {
      throw new ApiError(status("Unauthorized"), 'Email verification failed');
    }
  }
}

import bcrypt from "bcrypt";
import status from "statuses";
import pick from "lodash.pick";
import { User } from "@/database/entity/User";
import { AppDataSource } from "@/database";
import { ApiError } from "@/utils/errors";
import MailService from "@/services/MailService";
import TokenService from "@/services/TokenService";

interface RegisterCredentials {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

export default class UserService {
  private static repository = AppDataSource.getRepository(User);

  static async create(data: RegisterCredentials) {
    const user = new User();

    user.email = data.email;
    user.password = data.password;
    user.first_name = data.first_name;
    user.last_name = data.last_name;

    return await UserService.repository.save(user);
  }

  static async registerNewUser(credentials: RegisterCredentials) {
    const user = await UserService.getByEmail(credentials.email);

    if (user) {
      throw new ApiError(status("Unprocessable Entity"), "User already exist");
    }

    const createdUser = await UserService.create({
      ...credentials,
      password: await bcrypt.hash(credentials.password, 8),
    });

    const token = await TokenService.generateEmailToken(createdUser);
    MailService.sendWelcomeMail(credentials.first_name, token);
  }

  static async getByEmail(email: string) {
    return await UserService.repository.findOneBy({ email });
  }

  static async getById(id: number) {
    return await UserService.repository.findOneBy({ id });
  }

  static async comparePasswords(source: string, password: string) {
    return await bcrypt.compare(source, password);
  }

  static async markVerifiedEmail(user: User) {
    await UserService.repository.update({ id: user.id }, { verified_email: true });
  }

  static async updateUser(user: User, payload: Partial<Pick<User, "first_name" | "last_name" | "password">>) {
    const processedPayload = { ...payload };
    if (payload.password) {
      processedPayload.password = await bcrypt.hash(payload.password, 8);
    }

    await UserService.repository.update({ id: user.id }, processedPayload);
  }

  static async getEditableSettings(user: User) {
    return pick(await UserService.repository.findOneBy({ id: user.id }), ["first_name", "last_name", "email"])
  }
}

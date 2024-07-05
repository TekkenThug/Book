import bcrypt from "bcrypt";
import status from "statuses";
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

  static async getAll() {
    return await UserService.repository.find();
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
}

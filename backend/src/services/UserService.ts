import bcrypt from "bcrypt";
import status from "statuses";
import { User } from "@/database/entity/User";
import { AppDataSource } from "@/database";
import { ApiError } from "@/utils/errors";

interface RegisterCredentials {
  email: string;
  password: string;
}

export default class UserService {
  private static repository = AppDataSource.getRepository(User);

  static async create(data: RegisterCredentials) {
    const user = new User();

    user.email = data.email;
    user.password = data.password;

    return await UserService.repository.save(user);
  }

  static async registerNewUser(credentials: RegisterCredentials) {
    const user = await UserService.getByEmail(credentials.email);

    if (user) {
      throw new ApiError(status("Unprocessable Entity"), "User already exist");
    }

    return await UserService.create({ ...credentials, password: await bcrypt.hash(credentials.password, 8) });
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

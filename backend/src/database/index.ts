import { DataSource } from "typeorm";
import config from "@/configs/config";
import { User } from "@/database/entity/User";
import { Event } from "@/database/entity/Event";
import { Book } from "@/database/entity/Book";
import { Token } from "@/database/entity/Token";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: [User, Book, Event, Token],
  synchronize: true,
  logging: false,
});

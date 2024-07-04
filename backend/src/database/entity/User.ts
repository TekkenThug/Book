import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  first_name: string;

  @Column("varchar")
  last_name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  password: string;

  @Column({ type: "boolean", default: false })
  verified_email: boolean;
}

import { Column, ManyToOne, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Book } from "@/database/entity/Book";
import { User } from "@/database/entity/User";
import { Record } from "@/database/entity/Record";

@Entity({ name: "events" })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Book, (book) => book.events)
  book: Book;

  @Column("varchar")
  title: string;

  @Column("timestamp")
  date: string;

  @Column("integer")
  members_count: number;

  @Column("interval")
  duration: string;

  @OneToMany(() => Record, (record) => record.event)
  records: Record[];
}

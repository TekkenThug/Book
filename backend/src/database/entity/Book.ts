import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Event } from "@/database/entity/Event";

@Entity({ name: "books" })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  title: string;

  @OneToMany(() => Event, (event) => event.book)
  events: Event[];
}

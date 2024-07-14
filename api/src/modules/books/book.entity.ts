import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm';
import { Event } from '@/modules/events/event.entity';

@Entity({ name: 'books' })
export class Book {
  @PrimaryColumn('varchar')
  id: string;

  @Column('varchar')
  title: string;

  @Column('varchar', { array: true })
  author: string[];

  @OneToMany(() => Event, (event) => event.book)
  events: Event[];
}

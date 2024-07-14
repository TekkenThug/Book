import {
  Column,
  ManyToOne,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Book } from '@/modules/books/book.entity';
import { User } from '@/modules/users/user.entity';
import { Record } from '@/modules/records/record.entity';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Book, (book) => book.events)
  book: Book;

  @Column('varchar')
  title: string;

  @Column('timestamp')
  date: string;

  @Column('integer', { default: 0 })
  members_count: number;

  @Column('interval')
  duration: string;

  @OneToMany(() => Record, (record) => record.event)
  records: Record[];
}

import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Event } from '@/modules/events/event.entity';
import { User } from '@/modules/users/user.entity';

export type ChatMessage = {
  id: string;
  text: string;
  fullname: string;
  datetime: string;
};

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryColumn()
  event_id: number;

  @Column({ type: 'json', default: () => "'[]'" })
  chat_log: ChatMessage[];

  @ManyToMany(() => User)
  @JoinTable()
  participants: User[];

  @OneToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}

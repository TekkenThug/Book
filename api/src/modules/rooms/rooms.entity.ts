import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';
import { Event } from '@/modules/events/event.entity';

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

  @OneToOne(() => Event)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}

import { PrimaryColumn, JoinColumn, ManyToOne, Entity } from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';

@Entity({ name: 'records' })
export class Record {
  @PrimaryColumn({ type: 'integer' })
  user_id: number;

  @PrimaryColumn({ type: 'integer' })
  event_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Event, (event) => event.records)
  @JoinColumn({ name: 'event_id' })
  event: Event;
}

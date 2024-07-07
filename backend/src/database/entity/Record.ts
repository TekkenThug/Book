import { PrimaryColumn, JoinColumn, ManyToOne, Entity } from "typeorm";
import { Event } from "@/database/entity/Event";
import { User } from "@/database/entity/User";

@Entity({ name: "records" })
export class Record {
  @PrimaryColumn({ type: "integer" })
  user_id: number;

  @PrimaryColumn({ type: "integer" })
  event_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Event)
  @JoinColumn({ name: "event_id" })
  event: Event;
}

import { Event } from "@/database/entity/Event";

export interface CreatePayload {
  title: string;
  datetime: string;
  bookId: string;
  duration: string;
}

export interface FilterOptions {
  book?: string | null;
  withChecked?: boolean;
  userId?: number;
  future?: boolean;
}

export interface EventWithChecked extends Event {
  checked: boolean;
}

export interface EventWithRole extends Omit<Event, "author"> {
  role: "owner" | "member";
}

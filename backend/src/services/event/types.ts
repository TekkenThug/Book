import { Event } from "@/database/entity/Event";

export interface CreatePayload {
  userId: number;
  title: string;
  date: string;
  bookId: number;
  duration: string;
}

export interface FilterOptions {
  book?: string | null;
  withChecked?: boolean;
  userId?: number;
}

export interface EventWithChecked extends Event {
  checked: boolean;
}

export interface EventWithRole extends Omit<Event, "author"> {
  role: "owner" | "member";
}

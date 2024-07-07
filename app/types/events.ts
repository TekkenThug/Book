import type { Book } from "~/types/books";

export interface Event {
  id: number;
  members_count: number;
  title: string;
  date: string;
  book: Book;
  duration: {
    hours?: number;
    minutes?: number;
  }
}

export interface EventWithChecked extends Event{
  checked?: boolean
}

export interface MappedEvent extends Omit<Event, "duration"> {
  duration: string;
}

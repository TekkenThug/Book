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

import { z } from "zod";

const create = z.object({
  body: z.object({
    title: z.string(),
    date: z.string().datetime(),
    bookId: z.number(),
    duration: z.string(),
  }),
});

const get = z.object({
  query: z.object({
    book: z.string().optional(),
  }),
});

export default {
  get,
  create,
};

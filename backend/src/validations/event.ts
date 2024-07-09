import { z } from "zod";
import { INTERVAL_REGEXP } from "@/data/regexp";

const create = z.object({
  body: z.object({
    title: z.string(),
    bookId: z.string().min(1),
    datetime: z.string().datetime(),
    duration: z.string().regex(INTERVAL_REGEXP, "Duration is not to match interval template"),
  }),
});

const get = z.object({
  query: z.object({
    book: z.string().optional(),
    future: z.coerce.boolean().optional(),
  }),
});

export default {
  get,
  create,
};

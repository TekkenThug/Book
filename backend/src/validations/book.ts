import { z } from "zod";

const find = z.object({
  query: z.object({
    search: z.string().optional(),
  }),
});

export default { find };

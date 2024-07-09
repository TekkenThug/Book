import { z } from "zod";

const find = z.object({
  query: z.object({
    title: z.string().optional(),
  }),
});

export default { find };

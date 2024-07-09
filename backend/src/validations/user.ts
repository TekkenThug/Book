import { z } from "zod";
import { PASSWORD_REGEXP } from "@/data/regexp";

const update = z.object({
  body: z
    .object({
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      repeat_password: z.string().min(1),
      password: z
        .string()
        .min(1)
        .regex(
          PASSWORD_REGEXP,
          "Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit",
        ),
    })
    .partial()
    .superRefine((data, ctx) => {
      if (Object.values(data).every((v) => v === undefined)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "New settings is empty" });
      }

      if (data.password !== data.repeat_password) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords don`t match" });
      }
    }),
});

export default {
  update,
};

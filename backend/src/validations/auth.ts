import { z } from "zod";
import { PASSWORD_REGEXP } from "@/data/regexp";

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(3),
  }),
});

const register = z.object({
  body: z
    .object({
      email: z.string().min(1).email(),
      first_name: z.string().min(2),
      last_name: z.string().min(2),
      password: z
        .string()
        .min(1)
        .regex(
          PASSWORD_REGEXP,
          "Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit",
        ),
      repeat_password: z.string().min(1),
    })
    .refine((data) => data.password === data.repeat_password, {
      message: "Passwords don`t match",
    }),
});

const verifyEmail = z.object({
  body: z.object({
    token: z.string(),
  }),
});

export default { login, register, verifyEmail };

import { z } from "zod";
import { PASSWORD_REGEXP } from "~/data/regexp";

export const login = z.object({
  email: z.string().email(),
  password: z.string()
});

export const register = z.object({
  email: z.string().min(1).email(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z
    .string()
    .min(1)
    .regex(
      PASSWORD_REGEXP,
      "Password must contains at least 1 character in lower case, 1 in upper case, symbol and digit",
    ),
  repeatPassword: z.string().min(1),
})
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don`t match",
  })

export const createEvent = z.object({
  title: z.string().min(5),
  datetime: z.date(),
  bookId: z.string(),
  duration: z.date()
})

import { z } from "zod";

export const userLoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

export const userRegisterSchema = z.object({
  fullname: z.object({
    firstname: z
      .string()
      .min(3, { message: "First name must be atleast 3 characters" }),
    lastname: z.string().optional(),
  }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 6 characters" }),
});

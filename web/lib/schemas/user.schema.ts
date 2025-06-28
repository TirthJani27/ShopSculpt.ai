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

export const userOnboardingSchema = z.object({
  age: z
    .number()
    .min(10, "Age must be at least 10")
    .max(100, "Age must be realistic"),
  gender: z.enum(["Male", "Female", "Other", "PreferNotToSay"]),
  region: z.string().min(2, "Region is required"),
  interestCategory: z
    .array(z.string())
    .min(1, "At least one interest category is required"),
  persona: z
    .array(z.string())
    .min(1, "At least one persona required")
    .max(2, "Maximum 2 personas allowed"),
  priceRange: z.enum(["Budget_Friendly", "Mid_Range", "Premium"]),
  shoppingFrequency: z.enum(["Rarely", "Monthly", "Weekly", "Daily"]),
});

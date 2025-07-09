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
  gender: z.enum(["Male", "Female", "Other", "PreferNotToSay"]),
  region: z.string().min(10, "Region is required"),
  interestCategory: z
    .array(z.string())
    .min(1, "At least one interest category is required"),
  persona: z.array(z.string()).min(3, "At least one persona required"),
  priceRange: z.enum(["Budget_Friendly", "Mid_Range", "Premium"]),
  shoppingFrequency: z.enum(["Rarely", "Monthly", "Weekly", "Daily"]),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  pincode: z.string().min(6, "Min 6 numbers").max(6, "Max 6 numbers"),
  state: z.string(),
});

export const userUpdateSchema = z.object({
  dob: z.coerce.date({
    required_error: "Date of birth is required",
    invalid_type_error: "DOB must be a valid date",
  }),
  gender: z.enum(["Male", "Female", "Other", "PreferNotToSay"]),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^\+?[\d\s\-()]{10,}$/, "Invalid phone number"),
  region: z
    .string()
    .max(255, "Region must be less than 255 characters")
    .optional(),
  state: z
    .string()
    .max(100, "State must be less than 100 characters")
    .optional(),
  pincode: z
    .string()
    .length(6, "Pincode must be exactly 6 digits")
    .regex(/^\d{6}$/, "Invalid pincode")
    .optional(),
});

export const personaUpdateSchema = z.object({
  persona: z.array(z.string()).min(1, "Select at least one persona"),
});

export const interestUpdateSchema = z.object({
  interestCategory: z.array(z.string()).min(1, "Select at least one interest"),
});

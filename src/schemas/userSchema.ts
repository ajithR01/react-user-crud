import { z } from "zod";

export const userSchema = z.object({
  id: z.union([z.number(), z.string()]).optional(),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  avatar: z.string().optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;

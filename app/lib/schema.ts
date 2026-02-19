// app/lib/schema.ts
import { z } from "zod";

export const UserSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.email("Invalid email address"),
});

// Create a type from the schema
export type UserInput = z.infer<typeof UserSchema>;
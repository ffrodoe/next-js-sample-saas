'use server'

import { prisma } from "@/app/lib/prisma";
import { UserSchema } from "@/app/lib/schema";
import { revalidatePath } from "next/cache";

export async function addUser(formData: FormData) {
    // Extract data from formData
    const rawData = {
        name: formData.get("name"),
        email: formData.get("email"),
    };

    // Validate data against schema
    const validatedFields = UserSchema.safeParse(rawData);

    // If validation fails, throw an error
    if (!validatedFields.success) {
        const errorMessages = validatedFields.error.issues
            .map((err) => err.message)
            .join(", ");
        throw new Error(errorMessages);
    }

    const { name, email } = validatedFields.data;

    try {
        await prisma.user.create({
            data: { name, email },
        });
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Database error:", error);
        throw new Error("Failed to create user. Maybe email already exists?");
    }
}

export async function deleteUser(formData: FormData) {
    const userId = formData.get("id") as string;

    if (!userId) return;

    try {
        await prisma.user.delete({
            where: {
                id: parseInt(userId),
            },
        });

        // Refresh the page data
        revalidatePath("/dashboard");
    } catch (error) {
        console.error("Failed to delete user:", error);
        throw new Error("User not found or database error");
    }
}
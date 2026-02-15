'use server'

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addUser(formData: FormData) {
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;

    if (!email || !email.includes('@')) {
        throw new Error("Invalid email");
    }

    // Write to the database
    try {
        await prisma.user.create({
            data: {
                email,
                name,
            },
        });
    } catch (error) {
        console.error("Failed to add user:", error);
        throw new Error("Failed to add user");
    }

    // Make Next.js revalidate the dashboard page
    revalidatePath("/dashboard");
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
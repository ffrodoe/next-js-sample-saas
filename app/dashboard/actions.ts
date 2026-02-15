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
    await prisma.user.create({
        data: {
            email,
            name,
        },
    });

    // Make Next.js revalidate the dashboard page
    revalidatePath("/dashboard");
}
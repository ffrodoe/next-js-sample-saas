import { prisma } from "@/app/lib/prisma";
import { addUser } from "./actions";

export default async function Dashboard() {
    const userCount = await prisma.user.count();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Control panel MARIO SAAS</h1>
            <p className="text-gray-600">Welcome to the Next.js powered backend!</p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded">
                    <h2 className="font-semibold">Users</h2>
                    <p className="text-2xl">{userCount}</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
                    <h2 className="text-xl font-bold mb-4">Add New User</h2>
                    <form action={addUser} className="flex flex-col gap-4">
                        <input name="name" placeholder="Name" className="p-3 border rounded-md" />
                        <input name="email" type="email" placeholder="Email" required className="p-3 border rounded-md" />
                        <button type="submit" className="bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition">
                            Create User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
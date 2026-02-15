import { prisma } from "@/app/lib/prisma";
import { AddUserForm } from "./AddUserForm";
import { DeleteButton } from "./DeleteButton";

export default async function Dashboard() {
    const userCount = await prisma.user.count();
    const allUsers = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="p-8 max-w-4xl mx-auto text-black">
            <h1 className="text-3xl font-bold mb-8">MARIO SAAS control panel</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT COLUMN: Form */}
                <div className="space-y-6">
                    <div className="p-6 bg-white border rounded-xl shadow-sm">
                        <h2 className="text-sm font-medium text-slate-500 uppercase mb-4">Stats</h2>
                        <p className="text-5xl font-black text-blue-600">{userCount}</p>
                        <p className="text-gray-400 text-sm">Total users in DB</p>
                    </div>

                    <AddUserForm />
                </div>

                {/* RIGHT COLUMN: List */}
                <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
                    <h2 className="p-4 border-b font-bold bg-slate-50">Latest registrations</h2>
                    <ul className="divide-y divide-slate-100">
                        {allUsers.length === 0 ? (
                            <li className="p-8 text-center text-gray-400">No users yet</li>
                        ) : (
                            allUsers.map((user) => (
                                <li key={user.id} className="p-4 hover:bg-slate-50 transition flex justify-between items-center">
                                    <div>
                                        <p className="font-bold">{user.name || "Anonymous"}</p>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] uppercase font-bold text-gray-400">
                                                {user.createdAt.toLocaleDateString()}
                                            </p>
                                        </div>

                                        <DeleteButton userId={user.id} />
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
'use client'; // Required for toast and form resetting

import { useRef } from 'react';
import { toast } from 'sonner';
import { addUser } from './actions';

export function AddUserForm() {
    // We use a ref to access the form element directly to reset it
    const formRef = useRef<HTMLFormElement>(null);

    async function handleSubmit(formData: FormData) {
        const email = formData.get('email');

        // Show a loading toast that resolves when the action is finished
        const promise = addUser(formData);

        toast.promise(promise, {
            loading: 'Adding user...',
            success: () => {
                // Reset the form fields on success
                formRef.current?.reset();
                return `User ${email} has been added`;
            },
            error: 'Failed to add user',
        });
    }

    return (
        <div className="p-6 bg-slate-100 border rounded-xl">
            <h2 className="text-lg font-semibold mb-4 text-black">New User</h2>
            <form
                ref={formRef}
                action={handleSubmit}
                className="flex flex-col gap-3"
            >
                <input
                    name="name"
                    placeholder="Name"
                    className="p-2 border rounded bg-white text-black"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    className="p-2 border rounded bg-white text-black"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded font-bold hover:bg-blue-700 transition"
                >
                    Add User
                </button>
            </form>
        </div>
    );
}
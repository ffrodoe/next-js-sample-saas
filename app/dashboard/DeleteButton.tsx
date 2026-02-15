'use client'; // This is a Client Component

import { toast } from 'sonner';
import { deleteUser } from './actions';

interface DeleteButtonProps {
    userId: number;
}

export function DeleteButton({ userId }: DeleteButtonProps) {
    const handleDelete = async (formData: FormData) => {
        // 1. Show loading state or immediate message
        const promise = deleteUser(formData);

        toast.promise(promise, {
            loading: 'Deleting user...',
            success: 'User has been deleted',
            error: 'Could not delete user',
        });
    };

    return (
        <form action={handleDelete}>
            <input type="hidden" name="id" value={userId} />
            <button
                type="submit"
                className="text-red-400 hover:text-red-600 transition p-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
            </button>
        </form>
    );
}
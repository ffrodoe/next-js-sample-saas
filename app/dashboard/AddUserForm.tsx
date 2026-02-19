'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from 'sonner';
import { UserSchema, UserInput } from "@/app/lib/schema";
import { addUser } from './actions';

export function AddUserForm() {
    // 1. Initialize the form with Zod validation
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<UserInput>({
        resolver: zodResolver(UserSchema),
        defaultValues: { name: '', email: '' }
    });

    // 2. This function only runs if client-side validation passes
    const onSubmit = async (data: UserInput) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);

        const promise = addUser(formData);

        toast.promise(promise, {
            loading: 'Saving user...',
            success: () => {
                reset();
                return `User ${data.email} has been added`;
            },
            error: (err) => err.message,
        });
    };

    return (
        <div className="p-6 bg-slate-100 border rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-black">New Users</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                {/* Name Field */}
                <div className="flex flex-col gap-1">
                    <input
                        {...register("name")}
                        placeholder="Name"
                        className={`p-2 border rounded bg-white text-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && (
                        <span className="text-xs text-red-500 font-medium">{errors.name.message}</span>
                    )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1">
                    <input
                        {...register("email")}
                        type="email"
                        placeholder="Email"
                        className={`p-2 border rounded bg-white text-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && (
                        <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`p-2 rounded font-bold transition ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                >
                    {isSubmitting ? 'Processing...' : 'Add User'}
                </button>
            </form>
        </div>
    );
}
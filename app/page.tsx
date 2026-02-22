// app/page.tsx
import { signIn } from "@/auth";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Mario SaaS Admin</h1>

      <form
        action={async () => {
          "use server";
          await signIn("github", { redirectTo: "/dashboard" });
        }}
      >
        <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
          Sign in with GitHub
        </button>
      </form>
    </div>
  );
}
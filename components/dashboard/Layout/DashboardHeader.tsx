"use client";

import { useUser } from "@/lib/store/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const DashboardHeader = () => {
  const router = useRouter();
  const user = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/sign-in");
  };

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email}</span>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

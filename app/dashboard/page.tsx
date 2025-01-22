"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/sign-in");
      }
    };
    checkUser();
  }, [router, supabase]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 p-4">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-4 text-gray-600">Welcome to your dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MobileNav } from "@/components/ui/mobile-nav";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/supabase";
import { Pacifico } from "next/font/google";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
    };

    getUser();
  }, [supabase]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#cbd5e1_2px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 px-4 md:px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span
            className={`${pacifico.className} text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600 font-extrabold`}
          >
            CashNado
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative p-0">
                      <Avatar>
                        <AvatarFallback>
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-56 rounded-lg border border-gray-100 bg-white p-2 shadow-md"
                  >
                    <DropdownMenuItem className="text-sm px-2 py-1.5 text-gray-600">
                      Signed in as {user.email}
                    </DropdownMenuItem>
                    <DropdownMenuItem className="px-2 py-1.5 hover:bg-gray-50 rounded-md cursor-pointer">
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="px-2 py-1.5 text-red-600 hover:bg-red-50 rounded-md cursor-pointer"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link href="/sign-in">
                    <Button variant={"outline"}>Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant={"default"}>Register</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <MobileNav user={user} onSignOut={handleSignOut} />
      </nav>

      {/* Header */}
      <header className="flex-1 flex items-center justify-center p-4 md:px-6">
        <div className="w-full max-w-[90%] md:max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            Watch your cash
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">
              {" "}
              whirl
            </span>
            , but keep it under control
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4"
          >
            Take control of your finances with our powerful tracking and
            budgeting tools
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="px-4"
          >
            {user ? (
              <Link href="/dashboard">
                <InteractiveHoverButton>Go to Dashboard</InteractiveHoverButton>
              </Link>
            ) : (
              <Link href="/register">
                <InteractiveHoverButton>
                  Start Your Journey
                </InteractiveHoverButton>
              </Link>
            )}
          </motion.div>
        </div>
      </header>
    </div>
  );
}

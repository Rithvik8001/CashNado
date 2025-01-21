"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { MobileNav } from "@/components/ui/mobile-nav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Mesh Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#cbd5e1_2px,transparent_1px)] bg-[length:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      </div>

      {/* Navbar */}
      <nav className="px-4 md:px-6 h-16 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8">
            <Image
              src="/logo.svg"
              alt="CashNado Logo"
              width={32}
              height={32}
              className="w-full h-full"
            />
          </div>
          <span className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-orange-600">
            CashNado
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/login">
            <Button variant={"outline"}>Login</Button>
          </Link>
          <Link href="/register">
            <Button variant={"default"}>Register</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </nav>

      {/* Header */}
      <header className="flex-1 flex items-center justify-center px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
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
            className="text-lg md:text-xl text-gray-600 mb-8"
          >
            Take control of your finances with our powerful tracking and
            budgeting tools
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/register">
              <InteractiveHoverButton>
                Start Your Journey
              </InteractiveHoverButton>
            </Link>
          </motion.div>
        </div>
      </header>
    </div>
  );
}

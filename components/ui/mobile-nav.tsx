"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MobileNavProps {
  user: any;
  onSignOut: () => Promise<void>;
}

export const MobileNav = ({ user, onSignOut }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    setIsOpen(false);
    await onSignOut();
  };

  return (
    <div className="lg:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-8 h-8 flex flex-col justify-center items-center"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
            className="absolute w-5 h-0.5 bg-gray-900 transform-gpu"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="absolute w-5 h-0.5 bg-gray-900 transform-gpu"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
            className="absolute w-5 h-0.5 bg-gray-900 transform-gpu"
          />
        </div>
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-start pt-20 px-6"
          >
            <div className="w-full max-w-sm space-y-6">
              {user ? (
                <>
                  {/* User Profile Info */}
                  <div className="text-center mb-8">
                    <div className="mx-auto mb-4 flex justify-center">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-2xl">
                          {user.email?.[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>

                  <div className="space-y-3">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="block w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full py-6 text-base"
                      >
                        Dashboard
                      </Button>
                    </Link>

                    <Button
                      variant="default"
                      className="w-full bg-red-600 hover:bg-red-700 py-6 text-base"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/sign-in"
                    onClick={() => setIsOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="outline" className="w-full py-6 text-base">
                      Login
                    </Button>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full"
                  >
                    <Button variant="default" className="w-full py-6 text-base">
                      Register
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

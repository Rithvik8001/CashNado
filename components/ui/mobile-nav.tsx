"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-10 h-10 flex flex-col justify-center items-center"
        aria-label="Toggle menu"
      >
        <div className="flex flex-col gap-1 justify-center items-center w-full h-full">
          <motion.span
            animate={isOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
            className="absolute w-6 h-0.5 bg-gray-900 transform-gpu"
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="absolute w-6 h-0.5 bg-gray-900 transform-gpu"
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
            className="absolute w-6 h-0.5 bg-gray-900 transform-gpu"
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
            className="fixed inset-0 bg-white z-40 flex flex-col items-center justify-center px-4 overflow-y-auto"
          >
            <div className="w-full max-w-sm space-y-4 py-8">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <Button variant="default" className="w-full">
                  Register
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

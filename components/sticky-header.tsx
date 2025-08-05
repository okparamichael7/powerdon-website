"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MarqueeText } from "./magicui/marquee-text";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CgMenuGridO } from "react-icons/cg";

interface StickyHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function StickyHeader({ isMenuOpen, setIsMenuOpen }: StickyHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            layoutId="menu"
            initial={{ borderRadius: 12 }}
            animate={{ borderRadius: 16 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-6 right-6 w-64 md:w-80 bg-[#989899] p-4 rounded-xl shadow-lg z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2"
            >
              <X className="w-4 h-4 text-white" />
              <span className="text-white text-sm font-medium">Close</span>
            </button>

            {/* Nav Links */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 space-y-4"
            >
              <Link
                href="/reserve"
                className="block text-white text-sm font-medium"
              >
                Reserve station
              </Link>
              <Link
                href="/advertising"
                className="block text-white text-sm font-medium"
              >
                Advertising
              </Link>
              <Link
                href="/about"
                className="block text-white text-sm font-medium"
              >
                The company
              </Link>
              <Link
                href="/contact"
                className="block text-white text-sm font-medium"
              >
                Contact
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header - Responsive */}
      <header className="transition-all duration-300 ease-in-out z-40 fixed top-0 left-0 right-0 bg-blue-900/95 backdrop-blur-md border-b border-blue-700/50">
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 lg:px-6 lg:py-6 bg-white">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/powerdon-logo-black.png"
              alt="Powerdon Logo"
              width={200}
              height={60}
              className="h-6 sm:h-8 w-auto transition-all duration-300"
            />
          </Link>

          {/* Pre-launch Banner - Responsive visibility */}
          <div
            className={cn(
              "relative max-w-xl overflow-hidden",
              "hidden md:block" // Show on sm screens and up
            )}
          >
            <MarqueeText pauseOnHover className="[--duration:20s]">
              <div className={cn("text-black text-xs font-medium")}>
                PowerDon is currently in testing phase - Join our pre-launch
                program for exclusive early access. Be part of our pilot
                program.
              </div>
            </MarqueeText>
          </div>

          {/* Menu Button - Responsive sizing */}
          <div className="w-[80px] sm:w-[100px] flex justify-end">
            <motion.button
              layoutId="menu"
              onClick={() => setIsMenuOpen(true)}
              className={cn(
                "flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#989899] !rounded-md shadow-sm text-white text-xs tracking-wide",
                isMenuOpen && "invisible"
              )}
            >
              <CgMenuGridO className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
              <span>Menu</span>
            </motion.button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && <div className="h-16 sm:h-20"></div>}
    </>
  );
}

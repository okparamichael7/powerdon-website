"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MarqueeText } from "./ui/marquee-text";

interface StickyHeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export function StickyHeader({ isMenuOpen, setIsMenuOpen }: StickyHeaderProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Make header sticky after scrolling 350px
      setIsSticky(scrollPosition > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-95 z-50 flex flex-col items-center justify-center">
          <nav className="text-center space-y-8">
            <Link
              href="/"
              className="block text-white text-2xl hover:text-blue-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/reserve"
              className="block text-white text-2xl hover:text-blue-300 transition-colors"
            >
              Reserve Station
            </Link>
            <Link
              href="/advertising"
              className="block text-white text-2xl hover:text-blue-300 transition-colors"
            >
              Advertising
            </Link>
            <Link
              href="/about"
              className="block text-white text-2xl hover:text-blue-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-white text-2xl hover:text-blue-300 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}

      {/* Main Header */}
      <header className="transition-all duration-300 ease-in-out z-50 fixed top-0 left-0 right-0 bg-blue-900/95 backdrop-blur-md border-b border-blue-700/50">
        <div className="flex items-center justify-between p-6 lg:p-8 lg:px-2 lg:py-6 bg-white">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/images/powerdon-logo-black.png"
              alt="Powerdon Logo"
              width={200}
              height={60}
              className="h-8 w-auto transition-all duration-300"
            />
          </Link>
          {/* Pre-launch Banner */}
          <MarqueeText pauseOnHover className="text-black text-sm font-medium">
            PowerDon is currently in testing phase - Join our pre-launch program
            for exclusive early access. Be part of our pilot program.
          </MarqueeText>
          {/* <div className="flex-1 flex justify-center items-center px-4">
            <div className="text-center">
              <p className="text-black text-sm font-medium animate-fade-text">
                
              </p>
            </div>
          </div> */}
          <Button
            variant="outline"
            size="sm"
            className={`bg-blue-700 hover:bg-blue-600 border-blue-600 border-transparent bg-[rgba(233,233,233,1)] text-black`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="mr-2 text-xs tracking-wider font-normal">
              MENU
            </span>
            {isMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Spacer to prevent content jump when header becomes fixed */}
      {isSticky && <div className="h-20"></div>}
    </>
  );
}

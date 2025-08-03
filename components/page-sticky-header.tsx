"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface PageStickyHeaderProps {
  currentPage: "advertising" | "reserve";
}

export function PageStickyHeader({ currentPage }: PageStickyHeaderProps) {
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show sticky header after scrolling 350px (same as main header)
      setShowHeader(scrollPosition > 350);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showHeader) {
    return null;
  }

  const handleAdvertisingClick = () => {
    window.location.href = "/advertising";
  };

  const handleReserveClick = () => {
    window.location.href = "/reserve";
  };

  return (
    <div
      className={`fixed z-40 bg-blue-900/95 border-blue-700/50 backdrop-blur-md border transition-all duration-300 ease-out shadow-lg`}
      style={{
        width: "500px",
        height: "auto",
        top: "528.4px",
        left: "950px",
      }}
    >
      <div className="flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/powerdon-logo.png"
            alt="Powerdon"
            width={120}
            height={36}
            className="h-6 w-auto brightness-0 invert"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={handleAdvertisingClick}
            className={`bg-blue-700 hover:bg-blue-600 border-blue-600 text-white text-sm font-medium transform hover:scale-105 transition-all duration-200 ${
              currentPage === "advertising"
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            variant="outline"
            disabled={currentPage === "advertising"}
            style={{
              width: "140px",
              height: "36px",
              fontSize: "12px",
              animationDuration: "0ms",
            }}
          >
            Advertising
          </Button>

          <Button
            onClick={handleReserveClick}
            className={`bg-blue-700 hover:bg-blue-600 border-blue-600 text-white text-sm font-medium transform hover:scale-105 transition-all duration-200 ${
              currentPage === "reserve" ? "opacity-50 cursor-not-allowed" : ""
            }`}
            variant="outline"
            disabled={currentPage === "reserve"}
            style={{
              width: "140px",
              height: "36px",
              fontSize: "12px",
              animationDuration: "0ms",
            }}
          >
            Reserve Station
          </Button>
        </div>
      </div>
    </div>
  );
}

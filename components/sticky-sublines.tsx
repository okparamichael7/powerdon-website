"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function StickySublines() {
  const [showSublines, setShowSublines] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show sublines when scrolling past 100% viewport height
      setShowSublines(scrollPosition > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on home page
  if (pathname !== "/" || !showSublines) {
    return null;
  }

  const handleAdvertisingClick = () => {
    // Instant navigation with 0ms animation duration
    window.location.href = "/advertising";
  };

  const handleReserveClick = () => {
    // Instant navigation with 0ms animation duration
    window.location.href = "/reserve";
  };

  return (
    <div
      className={`fixed z-40 leading-3 backdrop-blur-lg transition-all duration-500 ease-out rounded-xl shadow-2xl pb-2`}
      style={{
        width: "auto",
        height: "auto",
        bottom: "65px",
        right: "20px",
        transform: showSublines
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(0.95)",
        opacity: showSublines ? 1 : 0,
      }}
    >
      <div className="p-2 py-0">
        <div className="text-center mb-4"></div>

        <div className="flex gap-2 flex-col sm:flex-row">
          <Button
            onClick={handleAdvertisingClick}
            className={`bg-blue-700/90 hover:bg-blue-600 border-blue-500/50 text-white shadow-lg font-medium transform hover:scale-105 transition-all duration-200 leading-3 px-4`}
            variant="outline"
            style={{
              height: "40px",
              gap: "8px",
              borderRadius: "4px",
              paddingTop: "11px",
              paddingRight: "16px",
              paddingBottom: "13px",
              paddingLeft: "16px",
              fontSize: "clamp(12px, 3vw, 14px)",
              animationDuration: "0ms",
            }}
          >
            Advertising on Powerdon
          </Button>

          <Button
            onClick={handleReserveClick}
            className={`bg-blue-700/90 hover:bg-blue-600 border-blue-500/50 text-white shadow-lg font-medium transform hover:scale-105 transition-all duration-200 leading-3 px-5`}
            variant="outline"
            style={{
              height: "40px",
              gap: "8px",
              borderRadius: "4px",
              paddingTop: "11px",
              paddingRight: "16px",
              paddingBottom: "13px",
              paddingLeft: "16px",
              fontSize: "clamp(12px, 3vw, 14px)",
              animationDuration: "0ms",
            }}
          >
            Reserve a station
          </Button>
        </div>
      </div>
    </div>
  );
}

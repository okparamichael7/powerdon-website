import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Remove Inter import since we'll use system Helvetica

export const metadata: Metadata = {
  title: "Powerdon - Portable & Fast Charging Solutions",
  description:
    "Your partner for any event or location. Premium charging stations with advertising opportunities.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use system Helvetica font stack
  const helveticaFont = "font-helvetica";
  return (
    <html className="text-left" lang="en">
      <body className={helveticaFont}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

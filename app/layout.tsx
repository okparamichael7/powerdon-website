import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";
import { StructuredDataServer } from "@/components/seo/structured-data-server";

// Remove Inter import since we'll use system Helvetica

export const metadata: Metadata = generateSEOMetadata({
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [
    "portable charging stations",
    "power bank rental",
    "event charging solutions",
    "festival charging",
    "LED screen advertising",
    "mobile charging",
    "charging stations Netherlands",
    "event power solutions",
    "portable power banks",
    "fast charging",
    "digital signage",
    "event technology",
  ],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Use system Helvetica font stack
  const helveticaFont = "font-helvetica";
  return (
    <html className="text-left" lang="en">
      <head>
        <StructuredDataServer />
      </head>
      <body className={helveticaFont}>
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SLDP7D8PQ6"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-SLDP7D8PQ6');
</script>
        <Analytics />
      </body>
    </html>
  );
}

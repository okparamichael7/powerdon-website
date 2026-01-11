import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Privacy Policy - PowerDon",
  description:
    "PowerDon Privacy Policy. Learn how we collect, use, and protect your personal information in compliance with GDPR and Dutch data protection laws.",
  keywords: ["privacy policy", "data protection", "GDPR", "privacy statement"],
  path: "/privacy",
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

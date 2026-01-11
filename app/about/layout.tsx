import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "About Us - Our Mission at PowerDon",
  description:
    "Learn about PowerDon's mission to eliminate battery anxiety with reliable, accessible, and fast charging solutions. Discover our values: innovation, sustainability, community, and excellence.",
  keywords: [
    "about PowerDon",
    "charging station company",
    "mission statement",
    "sustainable charging",
    "event technology company",
    "Netherlands charging solutions",
  ],
  path: "/about",
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

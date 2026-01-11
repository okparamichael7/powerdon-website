import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact Us - Get in Touch with PowerDon",
  description:
    "Contact PowerDon for questions about charging stations, advertising opportunities, or partnership inquiries. Reach us via email, phone, or our contact form.",
  keywords: [
    "contact PowerDon",
    "charging station support",
    "customer service",
    "business inquiries",
    "partnership contact",
  ],
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

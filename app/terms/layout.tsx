import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Terms of Use - PowerDon",
  description:
    "PowerDon Terms of Use. Read our terms and conditions for using PowerDon charging stations, power bank rental services, and related services.",
  keywords: ["terms of use", "terms and conditions", "user agreement", "legal terms"],
  path: "/terms",
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

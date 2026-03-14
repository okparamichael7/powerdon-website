import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("terms");
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

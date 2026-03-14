import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("about");
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("affiliate", { noindex: true });
}

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

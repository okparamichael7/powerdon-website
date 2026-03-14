import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("advertisingQuote");
}

export default function AdvertisingQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

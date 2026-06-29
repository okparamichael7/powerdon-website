import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("affiliateSignup");
}

export default function AffiliateSignupLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

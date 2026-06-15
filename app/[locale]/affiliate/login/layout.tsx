import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate admin sign-in — PowerDon",
  robots: { index: false, follow: false },
};

export default function AffiliateLoginLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

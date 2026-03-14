import type { Metadata } from "next";
import { getLocalizedPageMetadata } from "@/lib/seo-page";

export async function generateMetadata(): Promise<Metadata> {
  return getLocalizedPageMetadata("reserveForm", { noindex: true });
}

export default function ReserveFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

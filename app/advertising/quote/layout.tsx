import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Request Advertising Quote - PowerDon",
  description:
    "Get a custom advertising quote for your campaign on PowerDon charging stations. Request pricing for digital display ads, branded stations, and event partnerships.",
  keywords: [
    "advertising quote",
    "charging station advertising pricing",
    "event advertising rates",
    "digital signage pricing",
  ],
  path: "/advertising/quote",
});

export default function AdvertisingQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

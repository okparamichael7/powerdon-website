import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Advertising on PowerDon - Maximize Your Brand Reach",
  description:
    "Advertise on PowerDon charging stations with high-visibility digital displays. Reach engaged audiences at events, festivals, and high-traffic locations. Flexible ad campaigns with real-time updates.",
  keywords: [
    "advertising on charging stations",
    "digital signage advertising",
    "event advertising",
    "LED screen advertising",
    "brand visibility",
    "event marketing",
    "festival advertising",
    "targeted advertising",
  ],
  path: "/advertising",
});

export default function AdvertisingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

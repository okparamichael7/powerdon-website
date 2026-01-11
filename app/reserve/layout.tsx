import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Reserve Charging Stations - Partner with PowerDon",
  description:
    "Reserve PowerDon charging stations for your event or festival. Zero investment required. Generate revenue, keep attendees connected, and enhance your event experience.",
  keywords: [
    "reserve charging stations",
    "event charging stations",
    "festival charging",
    "rent charging stations",
    "event power solutions",
    "partner with PowerDon",
  ],
  path: "/reserve",
});

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Reserve Station Form - PowerDon",
  description:
    "Fill out the form to reserve PowerDon charging stations for your event. Get a custom proposal within 24 hours.",
  keywords: ["reserve station form", "event booking", "charging station reservation"],
  path: "/reserve/form",
  noindex: true, // Form pages typically shouldn't be indexed
});

export default function ReserveFormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

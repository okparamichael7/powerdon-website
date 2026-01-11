import { getFAQSchema } from "@/lib/seo";

interface FAQ {
  question: string;
  answer: string;
}

interface FAQStructuredDataProps {
  faqs: FAQ[];
}

/**
 * FAQ Structured Data Component (Server Component)
 * Renders FAQPage schema for SEO
 */
export function FAQStructuredData({ faqs }: FAQStructuredDataProps) {
  const schema = getFAQSchema(faqs);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}

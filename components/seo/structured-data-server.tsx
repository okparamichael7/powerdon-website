import {
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getWebSiteSchema,
} from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";

/**
 * Structured Data Component (Server Component)
 * Renders JSON-LD structured data for SEO
 */
export function StructuredDataServer({
  locale,
  serviceDescription,
}: {
  locale: Locale;
  serviceDescription: string;
}) {
  const organizationSchema = getOrganizationSchema();
  const localBusinessSchema = getLocalBusinessSchema();
  const serviceSchema = {
    ...getServiceSchema(),
    description: serviceDescription,
    inLanguage: locale,
  };
  const websiteSchema = getWebSiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({ ...websiteSchema, inLanguage: locale }),
        }}
      />
    </>
  );
}

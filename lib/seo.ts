import { Metadata } from "next";

/**
 * SEO Configuration and Utilities
 * Centralized SEO management for PowerDon website
 */

// Base URL - Update this to your production domain
export const siteConfig = {
  name: "PowerDon",
  description:
    "Fast charging and instant visibility in one compact form. Premium portable charging stations with built-in LED screens for events, festivals, and high-traffic locations. Reserve stations or advertise with PowerDon.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://powerdon.nl",
  ogImage: "/images/powerdon-logo-black.png",
  links: {
    twitter: "https://twitter.com/powerdon",
    linkedin: "https://linkedin.com/company/powerdon",
    instagram: "https://instagram.com/powerdon",
  },
  contact: {
    email: "support@powerdon.nl",
    phone: "+31 (06)13071536",
    address: {
      street: "Luzacstraat 7A01",
      city: "Rotterdam",
      postalCode: "3038 VT",
      country: "Netherlands",
    },
  },
  organization: {
    name: "PowerDon B.V.",
    legalName: "PowerDon B.V.",
    url: "https://powerdon.nl",
    logo: "https://powerdon.nl/images/powerdon-logo-black.png",
    foundingDate: "2024",
    sameAs: [
      "https://twitter.com/powerdon",
      "https://linkedin.com/company/powerdon",
      "https://instagram.com/powerdon",
    ],
  },
};

/**
 * Generate metadata for pages
 */
export function generateMetadata({
  title,
  description,
  keywords,
  image,
  path = "",
  noindex = false,
  nofollow = false,
  type = "website",
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  noindex?: boolean;
  nofollow?: boolean;
  type?: "website" | "article";
}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description.split(".")[0]}`;
  const pageDescription = description || siteConfig.description;
  const pageImage = image || `${siteConfig.url}${siteConfig.ogImage}`;
  const pageUrl = `${siteConfig.url}${path}`;

  const robots = {
    index: !noindex,
    follow: !nofollow,
    googleBot: {
      index: !noindex,
      follow: !nofollow,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords?.join(", "),
    authors: [{ name: siteConfig.organization.name }],
    creator: siteConfig.organization.name,
    publisher: siteConfig.organization.name,
    robots: robots as Metadata["robots"],
    openGraph: {
      type,
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: "@powerdon",
    },
    alternates: {
      canonical: pageUrl,
    },
    metadataBase: new URL(siteConfig.url),
    verification: {
      // Add verification codes when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

/**
 * Generate structured data (JSON-LD) for Organization
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.organization.url,
    logo: siteConfig.organization.logo,
    foundingDate: siteConfig.organization.foundingDate,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      email: siteConfig.contact.email,
      areaServed: "NL",
      availableLanguage: ["en", "nl"],
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    sameAs: siteConfig.organization.sameAs,
  };
}

/**
 * Generate structured data for LocalBusiness
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.organization.name,
    image: siteConfig.organization.logo,
    "@id": `${siteConfig.url}#organization`,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.contact.address.street,
      addressLocality: siteConfig.contact.address.city,
      postalCode: siteConfig.contact.address.postalCode,
      addressCountry: siteConfig.contact.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "51.9225", // Rotterdam coordinates - update if needed
      longitude: "4.4772",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "23:00",
      },
    ],
    priceRange: "€€",
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
  };
}

/**
 * Generate structured data for Product/Service
 */
export function getServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Portable Charging Station Rental",
    provider: {
      "@type": "Organization",
      name: siteConfig.organization.name,
    },
    areaServed: {
      "@type": "Country",
      name: "Netherlands",
    },
    description:
      "Premium portable charging stations with built-in LED screens for events, festivals, and high-traffic locations. Fast charging solutions with advertising opportunities.",
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Generate structured data for WebSite
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * Generate FAQPage schema
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Article schema for blog posts (if applicable)
 */
export function getArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
}: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: image || siteConfig.ogImage,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Organization",
      name: author || siteConfig.organization.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.organization.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.organization.logo,
      },
    },
  };
}

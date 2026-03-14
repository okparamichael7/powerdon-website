import { MetadataRoute } from "next";
import { localizePath } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/seo";

/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml for search engines
 *
 * Next.js automatically serves this at /sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const currentDate = new Date();

  const routes = [
    {
      path: "/",
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      path: "/about",
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      path: "/advertising",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/advertising/quote",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/reserve",
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      path: "/reserve/form",
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      path: "/contact",
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      path: "/privacy",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      path: "/terms",
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return routes.flatMap((route) => {
    const englishPath = localizePath(route.path, "en");
    const dutchPath = localizePath(route.path, "nl");

    return [
      {
        url: `${baseUrl}${englishPath}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${baseUrl}${englishPath}`,
            nl: `${baseUrl}${dutchPath}`,
            "x-default": `${baseUrl}${englishPath}`,
          },
        },
      },
      {
        url: `${baseUrl}${dutchPath}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority * 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}${englishPath}`,
            nl: `${baseUrl}${dutchPath}`,
            "x-default": `${baseUrl}${englishPath}`,
          },
        },
      },
    ];
  });
}

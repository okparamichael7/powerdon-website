import { getRequestLocale } from "@/lib/i18n/detectLocale";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { generateMetadata } from "@/lib/seo";
import type { Messages } from "@/lib/i18n/messages/en";

type PageKey = keyof Messages["seo"]["pages"];

const pagePaths: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  advertising: "/advertising",
  advertisingQuote: "/advertising/quote",
  contact: "/contact",
  reserve: "/reserve",
  reserveForm: "/reserve/form",
  privacy: "/privacy",
  terms: "/terms",
};

export async function getLocalizedPageMetadata(page: PageKey, options?: { noindex?: boolean }) {
  const locale = await getRequestLocale();
  const messages = await getTranslations(locale);
  const seoPage = messages.seo.pages[page];

  return generateMetadata({
    locale,
    title: seoPage.title,
    description: seoPage.description,
    keywords: [...seoPage.keywords],
    path: pagePaths[page],
    noindex: options?.noindex,
  });
}
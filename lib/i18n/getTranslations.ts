import { defaultLocale, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages/en";

export async function getTranslations(
  locale: Locale = defaultLocale,
): Promise<Messages> {
  if (locale === "nl") {
    const { nlMessages } = await import("@/lib/i18n/messages/nl");
    return nlMessages;
  }

  const { enMessages } = await import("@/lib/i18n/messages/en");
  return enMessages;
}

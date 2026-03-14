import { cookies, headers } from "next/headers";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  getPathLocale,
  isLocale,
  localeCookieName,
  localeHeaderName,
  normalizeLocale,
  type Locale,
} from "@/lib/i18n/config";

function detectFromAcceptLanguage(headerValue: string | null): Locale {
  if (!headerValue) {
    return defaultLocale;
  }

  const languages = headerValue
    .split(",")
    .map((entry) => entry.trim().split(";")[0])
    .filter(Boolean);

  for (const language of languages) {
    const locale = normalizeLocale(language);
    if (isLocale(locale)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function detectRequestLocale(request: NextRequest): Locale {
  const pathLocale = getPathLocale(request.nextUrl.pathname);
  if (pathLocale) {
    return pathLocale;
  }

  const manualLocale = request.cookies.get(localeCookieName)?.value;
  if (isLocale(manualLocale)) {
    return manualLocale;
  }

  return detectFromAcceptLanguage(request.headers.get("accept-language"));
}

export async function getRequestLocale(): Promise<Locale> {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get(localeHeaderName);
  if (isLocale(headerLocale)) {
    return headerLocale;
  }

  const cookieStore = await cookies();
  const manualLocale = cookieStore.get(localeCookieName)?.value;
  if (isLocale(manualLocale)) {
    return manualLocale;
  }

  return detectFromAcceptLanguage(requestHeaders.get("accept-language"));
}

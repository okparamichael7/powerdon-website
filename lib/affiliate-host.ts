// Helpers for routing the affiliate area on its own subdomain.
//
// Strategy:
// - On the main host (e.g. powerdon.nl) the affiliate area lives at /affiliate/*
// - On affiliates.powerdon.nl the same routes are exposed without the
//   /affiliate prefix (/, /login, /signup) by rewriting in proxy.ts.
// - All in-app links use affiliateHref() (from useTranslation) which strips
//   or keeps the prefix depending on the host the request came from.

import {
  defaultLocale,
  getPathLocale,
  isLocale,
  localizePath,
  type Locale,
} from "@/lib/i18n/config";

export const AFFILIATE_HOST_PREFIX = "affiliates.";
export const AFFILIATE_HOST_HEADER = "x-powerdon-affiliate-host";

export function isAffiliateHostname(
  host: string | null | undefined,
): boolean {
  if (!host) {
    return false;
  }
  const hostname = host.toLowerCase().split(":")[0];
  return hostname.startsWith(AFFILIATE_HOST_PREFIX);
}

// Returns { locale, rest } where rest never starts with /affiliate.
// Examples:
//   "/affiliate" → { locale: "en", rest: "/" }
//   "/affiliate/login" → { locale: "en", rest: "/login" }
//   "/nl/affiliate/signup" → { locale: "nl", rest: "/signup" }
//   "/nl" → { locale: "nl", rest: "/" }
//   "/" → { locale: "en", rest: "/" }
export function parseAffiliatePath(pathname: string): {
  locale: Locale;
  rest: string;
} {
  const locale = getPathLocale(pathname) ?? defaultLocale;
  const withoutLocale =
    locale === defaultLocale
      ? pathname
      : pathname.slice(`/${locale}`.length) || "/";

  if (withoutLocale === "/affiliate") {
    return { locale, rest: "/" };
  }
  if (withoutLocale.startsWith("/affiliate/")) {
    return { locale, rest: withoutLocale.slice("/affiliate".length) };
  }
  return { locale, rest: withoutLocale === "" ? "/" : withoutLocale };
}

// Build the canonical path under /affiliate for a given locale + sub-path.
export function buildAffiliatePath(locale: Locale, rest: string): string {
  const cleanRest = rest === "/" ? "" : rest;
  const composed = `/affiliate${cleanRest}`;
  return localizePath(composed, locale);
}

// For use inside the affiliate area: turn an internal href like "/affiliate/login"
// into the clean version "/login" when serving on the affiliate subdomain.
export function stripAffiliatePrefix(path: string): string {
  // Preserve external + special links
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.startsWith("/_next") ||
    path.startsWith("/api")
  ) {
    return path;
  }

  const locale = getPathLocale(path);
  const withoutLocale = locale
    ? path.slice(`/${locale}`.length) || "/"
    : path;

  if (withoutLocale === "/affiliate") {
    return locale ? `/${locale}` : "/";
  }
  if (withoutLocale.startsWith("/affiliate/")) {
    const tail = withoutLocale.slice("/affiliate".length);
    return locale ? `/${locale}${tail}` : tail;
  }
  return path;
}

export { isLocale };

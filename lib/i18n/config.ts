export const locales = ["en", "nl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "powerdon_locale";
export const localeHeaderName = "x-powerdon-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalized = value.toLowerCase().split("-")[0];
  return isLocale(normalized) ? normalized : defaultLocale;
}

export function getPathLocale(pathname: string): Locale | null {
  const [, maybeLocale] = pathname.split("/");
  return isLocale(maybeLocale) ? maybeLocale : null;
}

export function stripLocalePrefix(pathname: string): string {
  const locale = getPathLocale(pathname);

  if (!locale) {
    return pathname || "/";
  }

  const stripped = pathname.slice(`/${locale}`.length);
  return stripped.length > 0 ? stripped : "/";
}

export function localizePath(path: string, locale: Locale): string {
  if (!path) {
    return locale === defaultLocale ? "/" : `/${locale}`;
  }

  if (
    /^(https?:)?\/\//.test(path) ||
    path.startsWith("#") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:")
  ) {
    return path;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalPath = stripLocalePrefix(normalizedPath);

  if (locale === defaultLocale) {
    return canonicalPath;
  }

  return canonicalPath === "/" ? `/${locale}` : `/${locale}${canonicalPath}`;
}

export function getHtmlLang(locale: Locale): string {
  return locale;
}

export function getOpenGraphLocale(locale: Locale): string {
  return locale === "nl" ? "nl_NL" : "en_US";
}

export function getLocaleDisplayName(locale: Locale): string {
  return locale === "nl" ? "Nederlands" : "English";
}

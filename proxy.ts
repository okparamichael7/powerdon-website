import { NextResponse, type NextRequest } from "next/server";
import {
  defaultLocale,
  getPathLocale,
  localizePath,
  localeCookieName,
  localeHeaderName,
  stripLocalePrefix,
} from "@/lib/i18n/config";
import { detectRequestLocale } from "@/lib/i18n/detectLocale";

const publicFile = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next();
  }

  const pathLocale = getPathLocale(pathname);

  if (pathLocale === defaultLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = stripLocalePrefix(pathname);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(localeCookieName, defaultLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const resolvedLocale = pathLocale ?? detectRequestLocale(request);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeaderName, resolvedLocale);

  if (!pathLocale && resolvedLocale !== defaultLocale) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = localizePath(pathname, resolvedLocale);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set(localeCookieName, resolvedLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (pathLocale) {
    response.cookies.set(localeCookieName, pathLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
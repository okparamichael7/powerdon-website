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
import {
  AFFILIATE_SESSION_COOKIE,
  isAffiliateProtectedPath,
  verifyAffiliateSession,
} from "@/lib/affiliate-auth";
import {
  AFFILIATE_HOST_HEADER,
  buildAffiliatePath,
  isAffiliateHostname,
  parseAffiliatePath,
} from "@/lib/affiliate-host";

const publicFile = /\.(.*)$/;

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    publicFile.test(pathname)
  ) {
    return NextResponse.next();
  }

  const host = request.headers.get("host");
  const onAffiliateHost = isAffiliateHostname(host);

  // On affiliates.powerdon.nl, redirect anyone hitting /affiliate/* back to
  // the clean URL so the canonical form is /login, /signup, etc.
  if (onAffiliateHost && pathname.includes("/affiliate")) {
    const { locale, rest } = parseAffiliatePath(pathname);
    const cleanPath =
      locale === defaultLocale
        ? rest === "/"
          ? "/"
          : rest
        : rest === "/"
          ? `/${locale}`
          : `/${locale}${rest}`;
    if (cleanPath !== pathname) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = cleanPath;
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  // Auth gate. On the affiliate subdomain every page except /login + /signup
  // is protected. On the main host the existing /affiliate-prefixed paths
  // are protected.
  const isProtectedOnAffiliateHost =
    onAffiliateHost && !isCleanPublicAffiliatePath(pathname);
  if (
    isProtectedOnAffiliateHost ||
    (!onAffiliateHost && isAffiliateProtectedPath(pathname))
  ) {
    const token = request.cookies.get(AFFILIATE_SESSION_COOKIE)?.value;
    const session = await verifyAffiliateSession(token);
    if (!session) {
      const loginLocale = getPathLocale(pathname) ?? defaultLocale;
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = onAffiliateHost
        ? localizePath("/login", loginLocale)
        : localizePath("/affiliate/login", loginLocale);
      loginUrl.searchParams.set(
        "next",
        request.nextUrl.pathname + request.nextUrl.search,
      );
      return NextResponse.redirect(loginUrl);
    }
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
  if (onAffiliateHost) {
    requestHeaders.set(AFFILIATE_HOST_HEADER, "1");
  }

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

  // On the affiliate subdomain rewrite the URL into the /affiliate route
  // tree before Next.js renders. The user keeps the clean URL in the
  // browser; Next.js renders /affiliate/* internally.
  if (onAffiliateHost) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = buildAffiliatePath(resolvedLocale, getRest(pathname));
    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
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

// On the affiliate host, /login and /signup are the only paths reachable
// without an active session. Everything else (dashboard, payouts, /) needs auth.
function isCleanPublicAffiliatePath(pathname: string): boolean {
  const stripped = stripLocalePrefix(pathname);
  return stripped === "/login" || stripped === "/signup";
}

function getRest(pathname: string): string {
  const stripped = stripLocalePrefix(pathname);
  return stripped === "" ? "/" : stripped;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};

"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  AFFILIATE_SESSION_COOKIE,
  AFFILIATE_SESSION_MAX_AGE,
  createAffiliateSession,
} from "@/lib/affiliate-auth";

type LoginResult = { ok: true; next: string } | { ok: false; error: string };

function safeNext(input: FormDataEntryValue | null): string {
  const value = typeof input === "string" ? input : "";
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }
  return "/affiliate";
}

export async function loginAction(
  _previous: LoginResult | null,
  formData: FormData,
): Promise<LoginResult> {
  const password = String(formData.get("password") ?? "");
  const next = safeNext(formData.get("next"));
  const adminPassword = process.env.AFFILIATE_ADMIN_PASSWORD;

  if (!adminPassword || adminPassword.length < 8) {
    return { ok: false, error: "Server is missing AFFILIATE_ADMIN_PASSWORD." };
  }
  if (password.length === 0 || password !== adminPassword) {
    return { ok: false, error: "invalid" };
  }

  const token = await createAffiliateSession("admin");
  const cookieStore = await cookies();
  const cookieDomain = process.env.AFFILIATE_COOKIE_DOMAIN;
  cookieStore.set(AFFILIATE_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AFFILIATE_SESSION_MAX_AGE,
    path: "/",
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });

  return { ok: true, next };
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  const cookieDomain = process.env.AFFILIATE_COOKIE_DOMAIN;
  cookieStore.set(AFFILIATE_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
    ...(cookieDomain ? { domain: cookieDomain } : {}),
  });
  redirect("/affiliate/login");
}

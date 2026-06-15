"use client";

import { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick } from "@/lib/analytics";
import { loginAction } from "./actions";

export default function AffiliateLoginPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("affiliate").login;
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/affiliate";

  const [state, formAction, pending] = useActionState(loginAction, null);

  if (state?.ok) {
    if (typeof window !== "undefined") {
      window.location.href = state.next || "/affiliate";
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-gradient-to-br from-blue-50 via-blue-100/70 to-white px-6 py-16 pt-32">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_8px_40px_-12px_rgba(29,78,216,0.18)] sm:p-10">
          <Link
            href={href("/")}
            className="inline-flex items-center"
            onClick={() => trackButtonClick("affiliate_login_logo")}
          >
            <Image
              src="/images/powerdon-logo-black.png"
              alt="PowerDon"
              width={200}
              height={48}
              className="h-7 w-auto"
              priority
            />
          </Link>

          <h1 className="mt-8 text-2xl font-semibold tracking-tight text-gray-900">
            {copy.title}
          </h1>
          <p className="mt-2 text-sm text-gray-500">{copy.description}</p>

          <form action={formAction} className="mt-8 space-y-5">
            <input type="hidden" name="next" value={next} />
            <div>
              <Label
                htmlFor="password"
                className="text-xs font-semibold text-gray-700"
              >
                {copy.passwordLabel}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder={copy.passwordPlaceholder}
                className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
              />
            </div>

            {state && !state.ok && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700"
              >
                {state.error === "invalid" ? copy.error : state.error}
              </p>
            )}

            <Button
              type="submit"
              disabled={pending}
              className="h-12 w-full rounded-full bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              {pending ? copy.submitting : copy.submit}
            </Button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

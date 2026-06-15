"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick, trackFormSubmit } from "@/lib/analytics";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  notifications: boolean;
  agreement: boolean;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phone: "",
  notifications: false,
  agreement: false,
};

function renderWithBold(
  template: string,
  className = "font-semibold text-gray-900",
) {
  const parts = template.split(/(\{bold\}.*?\{\/bold\})/g);
  return parts.map((part, index) => {
    const match = part.match(/^\{bold\}(.*)\{\/bold\}$/);
    if (match) {
      return (
        <strong key={index} className={className}>
          {match[1]}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function AffiliateSignupPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("affiliate").signup;

  const canSubmit =
    form.firstName.trim() !== "" &&
    form.lastName.trim() !== "" &&
    form.email.trim() !== "" &&
    form.password.length >= 8 &&
    form.phone.trim() !== "" &&
    form.agreement;

  const handleChange =
    <K extends keyof FormState>(key: K) =>
    (value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canSubmit || submitting) {
      return;
    }
    setSubmitting(true);
    trackFormSubmit("affiliate_signup_form");
    window.setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="pt-24 lg:pt-28">
        <div className="grid min-h-[calc(100vh-7rem)] lg:grid-cols-2">
          {/* LEFT — Pitch panel */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100/70 to-white px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
            {/* Decorative isometric backdrop */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-60"
            >
              <svg
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-12 -right-12 h-[520px] w-[520px]"
              >
                <defs>
                  <linearGradient
                    id="iso-fill"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient
                    id="iso-stroke"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                <polygon
                  points="120,400 240,340 240,500 120,560"
                  fill="url(#iso-fill)"
                  stroke="url(#iso-stroke)"
                />
                <polygon
                  points="240,340 360,400 360,500 240,500"
                  fill="url(#iso-fill)"
                  stroke="url(#iso-stroke)"
                />
                <polygon
                  points="240,260 360,200 360,340 240,400"
                  fill="url(#iso-fill)"
                  stroke="url(#iso-stroke)"
                />
                <polygon
                  points="360,200 480,260 480,400 360,340"
                  fill="url(#iso-fill)"
                  stroke="url(#iso-stroke)"
                />
                <polygon
                  points="360,80 480,140 480,260 360,200"
                  fill="url(#iso-fill)"
                  stroke="url(#iso-stroke)"
                />
              </svg>
            </div>

            <div className="relative mx-auto max-w-xl">
              <Link
                href={href("/")}
                className="inline-flex items-center"
                onClick={() => trackButtonClick("affiliate_signup_logo")}
              >
                <Image
                  src="/images/powerdon-logo-black.png"
                  alt={copy.logoAlt}
                  width={200}
                  height={48}
                  className="h-8 w-auto"
                  priority
                />
              </Link>

              <h1 className="mt-12 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
                {copy.pitch.title}
              </h1>

              <ol className="mt-12 space-y-10">
                {copy.pitch.steps.map((step) => (
                  <li key={step.title}>
                    <div className="flex items-baseline gap-3">
                      <span
                        aria-hidden="true"
                        className="text-xl leading-none"
                      >
                        {step.emoji}
                      </span>
                      <h2 className="text-base font-semibold text-gray-900">
                        {step.title}
                      </h2>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">
                      {renderWithBold(step.description)}
                    </p>
                    {"highlight" in step && step.highlight ? (
                      <p className="mt-2 text-sm font-semibold text-gray-900">
                        {step.highlight}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>

              <p className="mt-12 text-sm text-gray-500">
                {copy.pitch.moreInfoPrefix}{" "}
                <a
                  href="/documents/powerdon-affiliate-memorandum.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackButtonClick("affiliate_signup_memorandum")
                  }
                  className="font-medium text-blue-700 underline-offset-4 hover:underline"
                >
                  {copy.pitch.moreInfoLink}
                </a>
              </p>
            </div>
          </section>

          {/* RIGHT — Sign-up card */}
          <section className="flex items-start justify-center bg-blue-50/40 px-6 py-16 sm:px-12 lg:px-16 lg:py-24">
            <div className="w-full max-w-md rounded-3xl bg-blue-100/60 p-8 shadow-[0_8px_40px_-12px_rgba(29,78,216,0.18)] backdrop-blur-sm sm:p-10">
              {submitted ? (
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {copy.form.successTitle}
                  </h2>
                  <p className="mt-4 text-sm text-gray-600">
                    {copy.form.successDescription}
                  </p>
                  <Link
                    href={href("/affiliate")}
                    className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                  >
                    {copy.pitch.title}
                  </Link>
                </div>
              ) : (
                <>
                  <h2 className="text-center text-2xl font-semibold text-gray-900">
                    {copy.form.title}
                  </h2>

                  <button
                    type="button"
                    onClick={() => trackButtonClick("affiliate_signup_google")}
                    className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-800 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <FcGoogle className="h-5 w-5" aria-hidden="true" />
                    {copy.form.google}
                  </button>

                  <div className="my-6 flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                    <div className="h-px flex-1 bg-blue-200" />
                    <span>{copy.form.divider}</span>
                    <div className="h-px flex-1 bg-blue-200" />
                  </div>

                  <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <Label
                          htmlFor="firstName"
                          className="text-xs font-semibold text-gray-700"
                        >
                          {copy.form.firstName}{" "}
                          <span className="text-blue-700">
                            {copy.form.required}
                          </span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          autoComplete="given-name"
                          required
                          placeholder={copy.form.firstNamePlaceholder}
                          value={form.firstName}
                          onChange={(event) =>
                            handleChange("firstName")(event.target.value)
                          }
                          className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="lastName"
                          className="text-xs font-semibold text-gray-700"
                        >
                          {copy.form.lastName}{" "}
                          <span className="text-blue-700">
                            {copy.form.required}
                          </span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          autoComplete="family-name"
                          required
                          placeholder={copy.form.lastNamePlaceholder}
                          value={form.lastName}
                          onChange={(event) =>
                            handleChange("lastName")(event.target.value)
                          }
                          className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className="text-xs font-semibold text-gray-700"
                      >
                        {copy.form.email}{" "}
                        <span className="text-blue-700">
                          {copy.form.required}
                        </span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        placeholder={copy.form.emailPlaceholder}
                        value={form.email}
                        onChange={(event) =>
                          handleChange("email")(event.target.value)
                        }
                        className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="password"
                        className="text-xs font-semibold text-gray-700"
                      >
                        {copy.form.password}{" "}
                        <span className="text-blue-700">
                          {copy.form.required}
                        </span>
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        minLength={8}
                        placeholder={copy.form.passwordPlaceholder}
                        value={form.password}
                        onChange={(event) =>
                          handleChange("password")(event.target.value)
                        }
                        className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
                      />
                    </div>

                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-xs font-semibold text-gray-700"
                      >
                        {copy.form.phone}{" "}
                        <span className="text-blue-700">
                          {copy.form.required}
                        </span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        placeholder={copy.form.phonePlaceholder}
                        value={form.phone}
                        onChange={(event) =>
                          handleChange("phone")(event.target.value)
                        }
                        className="mt-2 h-11 rounded-xl border-blue-200 bg-white"
                      />
                    </div>

                    <div className="space-y-3 pt-1">
                      <label
                        htmlFor="notifications"
                        className="flex items-center gap-3 text-xs text-gray-700"
                      >
                        <Checkbox
                          id="notifications"
                          checked={form.notifications}
                          onCheckedChange={(value) =>
                            handleChange("notifications")(value === true)
                          }
                          className="border-blue-300 data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700"
                        />
                        <span>{copy.form.notifications}</span>
                      </label>
                      <label
                        htmlFor="agreement"
                        className="flex items-center gap-3 text-xs text-gray-700"
                      >
                        <Checkbox
                          id="agreement"
                          checked={form.agreement}
                          onCheckedChange={(value) =>
                            handleChange("agreement")(value === true)
                          }
                          required
                          className="border-blue-300 data-[state=checked]:bg-blue-700 data-[state=checked]:border-blue-700"
                        />
                        <span>
                          {copy.form.agreementPrefix}{" "}
                          <Link
                            href={href("/terms")}
                            className="font-medium text-blue-700 underline-offset-4 hover:underline"
                          >
                            {copy.form.agreementLink}
                          </Link>{" "}
                          <span className="text-blue-700">
                            {copy.form.required}
                          </span>
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={!canSubmit || submitting}
                      className="h-12 w-full rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:bg-blue-300 disabled:text-white"
                    >
                      {submitting ? copy.form.submitting : copy.form.submit}
                    </Button>

                    <p className="text-center text-xs text-gray-500">
                      {copy.form.signinPrompt}{" "}
                      <Link
                        href={href("/affiliate")}
                        className="font-semibold text-blue-700 underline-offset-4 hover:underline"
                      >
                        {copy.form.signinLink}
                      </Link>
                    </p>
                  </form>
                </>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

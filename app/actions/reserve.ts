"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createReserveSchema, reserveSchema } from "@/schema";
import { sendPartnershipEmail } from "@/lib/mail";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { verifyTurnstile } from "@/lib/turnstile";
import { checkRateLimits } from "@/lib/rate-limit";
import { buildTrustReport } from "@/lib/trust-score";
import { generateRequestId } from "@/lib/utils";
import { CONTRACT_VERSION } from "@/lib/reserve-form-schema";

export type ReserveFormData = z.infer<typeof reserveSchema>;

async function getRequestMeta() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";
  const userAgent = headerList.get("user-agent") || "unknown";
  return { ip, userAgent };
}

export async function reserve(
  values: ReserveFormData,
  locale: Locale = defaultLocale,
) {
  const messages = await getTranslations(locale);
  const { ip, userAgent } = await getRequestMeta();

  try {
    // 1. Honeypot — bots that fill the hidden field get a silent success.
    // Never reveal that detection happened.
    if (values.website && values.website.trim().length > 0) {
      console.warn(`[form-abuse] honeypot — ip=${ip} ua=${userAgent}`);
      return { success: messages.forms.reserve.successResponse, status: 200 };
    }

    // 2. Server-side validation (locale-aware, re-validated regardless of
    // client-side react-hook-form checks).
    const validation = createReserveSchema(
      messages.forms.validation,
    ).safeParse(values);

    if (!validation.success) {
      console.warn(`[form] validation-failed — ip=${ip}`);
      return {
        error: messages.forms.feedback.invalid,
        details: validation.error.format(),
        status: 400,
      };
    }

    const { data } = validation;

    // 3. Bot challenge
    const turnstileResult = await verifyTurnstile(data.turnstileToken, ip);
    if (!turnstileResult.success) {
      console.warn(`[form-abuse] turnstile-failed — ip=${ip} ua=${userAgent}`);
      return { error: messages.forms.feedback.error, status: 403 };
    }

    // 4. Rate limiting
    const rateLimitResult = await checkRateLimits(ip, data.email);
    if (!rateLimitResult.allowed) {
      console.warn(
        `[form-abuse] ${rateLimitResult.reason} — ip=${ip} ua=${userAgent}`,
      );
      return { error: messages.forms.feedback.error, status: 429 };
    }

    // 5. Trust scoring for human review — never blocks submission
    const trust = buildTrustReport(
      {
        contact: data.contact,
        email: data.email,
        eventStart: data.eventStart,
        attendees: data.attendees,
      },
      { ip, userAgent },
    );

    const requestId = generateRequestId("PTN");

    // Server-stamped acceptance provenance — the client's own timestamp is
    // never trusted for this. contractAccepted/acceptTerms are already
    // guaranteed `true` by the schema's literal-true refinement above.
    const record = {
      ...data,
      contractAcceptedAt: new Date().toISOString(),
      contractVersion: CONTRACT_VERSION,
      acceptanceIp: ip,
      acceptanceUserAgent: userAgent,
    };

    // 6. Notification email — failure here must not block the applicant's
    // response, they did everything right.
    try {
      await sendPartnershipEmail(record, locale, trust, requestId);
    } catch (emailError) {
      console.error(`[form] ${requestId} — notification email failed:`, emailError);
    }

    console.info(
      `[form] ${requestId} — result=received trust=${trust.score} ip=${ip}`,
    );

    return {
      success: messages.forms.reserve.successResponse,
      status: 200,
      requestId,
    };
  } catch (error) {
    console.error("Error processing reservation:", error);
    return { error: messages.forms.feedback.internalError, status: 500 };
  }
}

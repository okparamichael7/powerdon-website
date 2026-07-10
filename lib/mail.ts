import { Resend } from "resend";

import {
  ConfirmationTemplate,
  ContactNotificationTemplate,
  PartnershipNotificationTemplate,
  PilotTestingNotificationTemplate,
  QuoteNotificationTemplate,
} from "@/emails";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { generateRequestId } from "./utils";
import type { TrustReport } from "@/lib/trust-score";
import { SCREEN_TIERS, type ScreenTierId } from "@/lib/reserve-form-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

// Contact Email to Admin
export async function sendContactEmail(values: any) {
  try {
    const { firstName, lastName, email, phone, company, subject, message } =
      values;
    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: `Contact Form Submission: ${subject}`,
      react: ContactNotificationTemplate({
        firstName,
        lastName,
        email,
        phone,
        company,
        subject,
        message,
      }),
    });

    if (error) throw new Error("An error occurred while sending the email.");
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

// CONTACT confirmation email
export async function sendContactConfirmationEmail(
  values: any,
  locale: Locale = defaultLocale,
) {
  try {
    const { firstName, email, ...submissionData } = values;
    const messages = await getTranslations(locale);

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `${messages.emails.subjects.contact} 💬`,
      react: ConfirmationTemplate({
        firstName,
        formType: "contact",
        submissionData,
        locale,
        messages: messages.emails,
      }),
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(`Contact confirmation failed: ${error.message}`);
  }
}

// Partnership Email to Admin
export async function sendPartnershipEmail(
  values: any,
  locale: Locale = defaultLocale,
  trust?: TrustReport,
  requestId: string = generateRequestId("PTN"),
) {
  try {
    const {
      organizer,
      contact,
      email,
      phone,
      eventName,
      eventStart,
      address,
      location,
      attendees,
      eventType,
      additionalInfo,
      deploymentAt,
      screenTier,
      screenContentDetails,
      contractAcceptedAt,
      contractVersion,
      acceptanceIp,
      acceptanceUserAgent,
    } = values;

    const dateFormatter = new Intl.DateTimeFormat(
      locale === "nl" ? "nl-NL" : "en-US",
      { dateStyle: "long", timeStyle: "short" },
    );

    // eventStart/deploymentAt arrive as Dates (Zod-coerced); templates render
    // them as text.
    const eventDateDisplay =
      eventStart instanceof Date ? dateFormatter.format(eventStart) : eventStart;
    const deploymentDisplay =
      deploymentAt instanceof Date
        ? dateFormatter.format(deploymentAt)
        : deploymentAt;
    const screenTierLabel = SCREEN_TIERS[screenTier as ScreenTierId]?.label;

    const trustPrefix = trust
      ? trust.score < 50
        ? "🚨"
        : trust.score < 80
          ? "⚠️"
          : "✅"
      : "";

    // Send to admin
    const adminEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: trust
        ? `${trustPrefix} [${requestId}] Partnership application: ${eventName} (trust ${trust.score}/100)`
        : `[${requestId}] Partnership Application Received: ${eventName}`,
      react: PartnershipNotificationTemplate({
        requestId,
        organizer,
        contact,
        email,
        phone,
        eventName,
        eventDate: eventDateDisplay,
        address,
        location,
        attendees: attendees != null ? String(attendees) : undefined,
        eventType,
        additionalInfo: additionalInfo || "",
        deploymentAt: deploymentDisplay,
        screenTier: screenTierLabel,
        screenContentDetails: screenContentDetails || "",
        contractAcceptedAt,
        contractVersion,
        acceptanceIp,
        acceptanceUserAgent,
        trustScore: trust?.score,
        trustFlags: trust?.flags,
      }),
    });

    if (adminEmail.error) throw new Error("Failed to send admin email");

    // Send confirmation to user — exclude internal-only fields (honeypot,
    // Turnstile token, IP/UA, raw acceptance flags) from the submission
    // summary the applicant sees.
    const messages = await getTranslations(locale);
    const {
      website,
      turnstileToken,
      acceptanceIp: _acceptanceIp,
      acceptanceUserAgent: _acceptanceUserAgent,
      acceptTerms,
      acceptContract,
      ...visibleFields
    } = values;
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] ${messages.emails.subjects.partnership} 🤝`,
      react: ConfirmationTemplate({
        firstName: organizer,
        formType: "partnership",
        submissionData: {
          ...visibleFields,
          eventDate: eventDateDisplay,
          deploymentAt: deploymentDisplay,
          screenTier: screenTierLabel,
          attendees: attendees != null ? String(attendees) : undefined,
        },
        requestId,
        locale,
        messages: messages.emails,
      }),
    });

    if (confirmationEmail.error)
      throw new Error("Failed to send confirmation email");

    return { admin: adminEmail.data, confirmation: confirmationEmail.data };
  } catch (error: any) {
    throw new Error(`Partnership email failed: ${error.message}`);
  }
}

// Advertising / Quote Email to Admin
export async function sendAdvertisingEmail(
  values: any,
  locale: Locale = defaultLocale,
) {
  try {
    const requestId = generateRequestId("CAM");
    const {
      company,
      contact,
      email,
      phone,
      industry,
      budget,
      timeline,
      targetLocations,
      goals,
    } = values;

    // Send to admin
    const adminEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: `[${requestId}] Campaign Quote Request Received`,
      react: QuoteNotificationTemplate({
        requestId,
        company,
        contact,
        email,
        phone,
        industry,
        budget,
        timeline,
        targetLocations,
        goals,
      }),
    });

    if (adminEmail.error) throw new Error("Failed to send admin email");

    // Send confirmation to user
    const messages = await getTranslations(locale);
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] ${messages.emails.subjects.advertising} 📈`,
      react: ConfirmationTemplate({
        firstName: contact,
        formType: "advertising",
        submissionData: values,
        requestId,
        locale,
        messages: messages.emails,
      }),
    });

    if (confirmationEmail.error)
      throw new Error("Failed to send confirmation email");

    return { admin: adminEmail.data, confirmation: confirmationEmail.data };
  } catch (error: any) {
    throw new Error(`Advertising email failed: ${error.message}`);
  }
}

// Pilot Testing Email
export async function sendPilotTestingEmail(
  values: any,
  locale: Locale = defaultLocale,
) {
  try {
    const requestId = generateRequestId("PLT");
    const {
      company,
      contact,
      email,
      phone,
      industry,
      budget,
      timeline,
      targetLocations,
      goals,
    } = values;

    // Send to admin
    const adminEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: `[${requestId}] Pilot Testing Request Received`,
      react: PilotTestingNotificationTemplate({
        requestId,
        company,
        contact,
        email,
        phone,
        industry,
        budget,
        timeline,
        targetLocations,
        goals,
      }),
    });

    if (adminEmail.error) throw new Error("Failed to send admin email");

    // Send confirmation to user
    const messages = await getTranslations(locale);
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] ${messages.emails.subjects.pilotTesting} 🚀`,
      react: ConfirmationTemplate({
        firstName: contact,
        formType: "pilot-testing",
        submissionData: values,
        requestId,
        locale,
        messages: messages.emails,
      }),
    });

    if (confirmationEmail.error)
      throw new Error("Failed to send confirmation email");

    return { admin: adminEmail.data, confirmation: confirmationEmail.data };
  } catch (error: any) {
    throw new Error(`Pilot testing email failed: ${error.message}`);
  }
}

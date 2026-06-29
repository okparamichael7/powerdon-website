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
) {
  try {
    const requestId = generateRequestId("PTN");
    const {
      organizer,
      contact,
      email,
      phone,
      eventName,
      eventDate,
      address,
      location,
      attendees,
      eventType,
      additionalInfo,
    } = values;

    // Send to admin
    const adminEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: process.env.TO_EMAIL!,
      subject: `[${requestId}] Partnership Application Received: ${eventName}`,
      react: PartnershipNotificationTemplate({
        requestId,
        organizer,
        contact,
        email,
        phone,
        eventName,
        eventDate,
        address,
        location,
        attendees,
        eventType,
        additionalInfo: additionalInfo || "",
      }),
    });

    if (adminEmail.error) throw new Error("Failed to send admin email");

    // Send confirmation to user
    const messages = await getTranslations(locale);
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] ${messages.emails.subjects.partnership} 🤝`,
      react: ConfirmationTemplate({
        firstName: organizer,
        formType: "partnership",
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

// Affiliate Signup Email — plain HTML to admin + applicant ack
export async function sendAffiliateSignupEmail(values: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notifications: boolean;
}) {
  const requestId = generateRequestId("AFF");
  const { firstName, lastName, email, phone, notifications } = values;
  const fromEmail = process.env.FROM_EMAIL;
  const adminEmail = process.env.AFFILIATE_ADMIN_EMAIL ?? process.env.TO_EMAIL;

  if (!fromEmail || !adminEmail) {
    throw new Error("FROM_EMAIL or affiliate admin recipient is not configured.");
  }

  const adminHtml = `
    <h2>New affiliate application</h2>
    <p><strong>Reference:</strong> ${requestId}</p>
    <ul>
      <li><strong>Name:</strong> ${firstName} ${lastName}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Phone:</strong> ${phone}</li>
      <li><strong>Notifications opt-in:</strong> ${notifications ? "Yes" : "No"}</li>
    </ul>
    <p>Reply directly to this thread to onboard the applicant.</p>
  `;

  const adminResult = await resend.emails.send({
    from: `PowerDon <${fromEmail}>`,
    to: adminEmail,
    replyTo: email,
    subject: `[${requestId}] New affiliate application — ${firstName} ${lastName}`,
    html: adminHtml,
  });
  if (adminResult.error) {
    throw new Error("Failed to send affiliate admin email");
  }

  const ackHtml = `
    <p>Hi ${firstName},</p>
    <p>Thanks for applying to the PowerDon Affiliate Program. We've received your application (reference <strong>${requestId}</strong>) and our partner team will reach out within 48 hours with next steps and your personal affiliate code.</p>
    <p>While you wait, you can review the affiliate memorandum here:<br/>
    <a href="https://powerdon.nl/documents/powerdon-affiliate-memorandum.pdf">powerdon.nl/documents/powerdon-affiliate-memorandum.pdf</a></p>
    <p>— PowerDon Partner Team</p>
  `;

  const ackResult = await resend.emails.send({
    from: `PowerDon <${fromEmail}>`,
    to: email,
    subject: `[${requestId}] Welcome to the PowerDon Affiliate Program 🤝`,
    html: ackHtml,
  });
  if (ackResult.error) {
    throw new Error("Failed to send affiliate confirmation email");
  }

  return { requestId, admin: adminResult.data, ack: ackResult.data };
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

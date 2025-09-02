import { Resend } from "resend";

import {
  ConfirmationTemplate,
  ContactNotificationTemplate,
  PartnershipNotificationTemplate,
  PilotTestingNotificationTemplate,
  QuoteNotificationTemplate,
} from "@/emails";
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
export async function sendContactConfirmationEmail(values: any) {
  try {
    const { firstName, email, ...submissionData } = values;

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "Thank you for contacting us 💬",
      react: ConfirmationTemplate({
        firstName,
        formType: "contact",
        submissionData,
      }),
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(`Contact confirmation failed: ${error.message}`);
  }
}

// Partnership Email to Admin
export async function sendPartnershipEmail(values: any) {
  try {
    const requestId = generateRequestId("PTN");
    const {
      organizer,
      contact,
      email,
      phone,
      eventName,
      eventDate,
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
        location,
        attendees,
        eventType,
        additionalInfo: additionalInfo || "",
      }),
    });

    if (adminEmail.error) throw new Error("Failed to send admin email");

    // Send confirmation to user
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] Your partnership request 🤝`,
      react: ConfirmationTemplate({
        firstName: organizer,
        formType: "partnership",
        submissionData: values,
        requestId,
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
export async function sendAdvertisingEmail(values: any) {
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
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] We've received your quote request 📈`,
      react: ConfirmationTemplate({
        firstName: contact,
        formType: "advertising",
        submissionData: values,
        requestId,
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
export async function sendPilotTestingEmail(values: any) {
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
    const confirmationEmail = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `[${requestId}] Pilot testing request received 🚀`,
      react: ConfirmationTemplate({
        firstName: contact,
        formType: "pilot-testing",
        submissionData: values,
        requestId,
      }),
    });

    if (confirmationEmail.error)
      throw new Error("Failed to send confirmation email");

    return { admin: adminEmail.data, confirmation: confirmationEmail.data };
  } catch (error: any) {
    throw new Error(`Pilot testing email failed: ${error.message}`);
  }
}

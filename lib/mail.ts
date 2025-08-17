import { Resend } from "resend";

import {
  ConfirmationTemplate,
  ContactNotificationTemplate,
  PartnershipNotificationTemplate,
  PilotTestingNotificationTemplate,
  QuoteNotificationTemplate,
} from "@/emails";

const resend = new Resend(process.env.RESEND_API_KEY);

// Partnership Email
export async function sendPartnershipEmail(values: any) {
  try {
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

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: values.email,
      subject: `Partnership Application Received: ${values.eventName}`,
      react: PartnershipNotificationTemplate({
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

    if (error) throw new Error("An error occurred while sending the email.");
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

// PARTNERSHIP confirmation email
export async function sendPartnershipConfirmationEmail(values: any) {
  try {
    const { organizer: firstName, email, ...submissionData } = values;

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "Your partnership request 🤝",
      react: ConfirmationTemplate({
        firstName,
        formType: "partnership",
        submissionData,
      }),
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(`Partnership confirmation failed: ${error.message}`);
  }
}

// Contact Email
export async function sendContactEmail(values: any) {
  try {
    const { firstName, lastName, email, phone, company, subject, message } =
      values;
    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: `We've received your message: ${subject}`,
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

// Advertising / Quote Email
export async function sendAdvertisingEmail(values: any) {
  try {
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
    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "Campaign Quote Request Received",
      react: QuoteNotificationTemplate({
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

    if (error) throw new Error("An error occurred while sending the email.");
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

// ADVERTISING (quote) confirmation email
export async function sendAdvertisingConfirmationEmail(values: any) {
  try {
    const { contact: firstName, email, ...submissionData } = values;

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "We've received your quote request 📈",
      react: ConfirmationTemplate({
        firstName,
        formType: "advertising",
        submissionData,
      }),
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(`Advertising confirmation failed: ${error.message}`);
  }
}

// Pilot Testing Email
export async function sendPilotTestingEmail(values: any) {
  try {
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
    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "Pilot Testing Request Received",
      react: PilotTestingNotificationTemplate({
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

    if (error) throw new Error("An error occurred while sending the email.");
    return data;
  } catch (error: any) {
    throw new Error(`An error occurred: ${error.message}`);
  }
}

// PILOT TESTING confirmation email
export async function sendPilotTestingConfirmationEmail(values: any) {
  try {
    const { contact: firstName, email, ...submissionData } = values;

    const { data, error } = await resend.emails.send({
      from: `PowerDon <${process.env.FROM_EMAIL!}>`,
      to: email,
      subject: "Pilot testing request received 🚀",
      react: ConfirmationTemplate({
        firstName,
        formType: "pilot-testing",
        submissionData,
      }),
    });

    if (error) throw new Error(error.message);
    return data;
  } catch (error: any) {
    throw new Error(`Pilot testing confirmation failed: ${error.message}`);
  }
}

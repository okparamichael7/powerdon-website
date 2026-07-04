import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";
import { enMessages } from "@/lib/i18n/messages/en";
import { isDisposableEmail } from "@/lib/disposable-domains";

type ValidationCopy = typeof enMessages.forms.validation;

// Matches Dutch mobile/landline numbers after stripping spaces/dashes/parens,
// e.g. 0612345678, +31612345678, 0031612345678.
const DUTCH_PHONE_REGEX = /^(\+31|0031|0)([1-9][0-9]{8})$/;
const MIN_EVENT_LEAD_DAYS = 3;

export function createCampaignSchema(copy: ValidationCopy) {
  return z.object({
    company: z.string().min(1, copy.companyRequired),
    contact: z.string().min(1, copy.contactRequired),
    email: z.string().email(copy.invalidEmail),
    phone: z.string().min(1, copy.phoneRequired),
    industry: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    targetLocations: z.string().optional(),
    goals: z.string().optional(),
    isCollaboration: z.boolean().optional(),
  });
}

export function createContactSchema(copy: ValidationCopy) {
  return z.object({
    firstName: z.string().min(1, copy.firstNameRequired),
    lastName: z.string().min(1, copy.lastNameRequired),
    email: z.string().email(copy.invalidEmail),
    phone: z.string().optional(),
    company: z.string().optional(),
    subject: z.string().min(1, copy.subjectRequired),
    message: z.string().min(1, copy.messageRequired),
  });
}

export function createReserveSchema(copy: ValidationCopy) {
  return z.object({
    organizer: z
      .string()
      .min(2, copy.organizerRequired)
      .max(120, copy.organizerRequired),
    contact: z
      .string()
      .min(2, copy.contactRequired)
      .max(80, copy.contactRequired),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.string().email(copy.invalidEmail))
      .refine((email) => !isDisposableEmail(email), copy.disposableEmail),
    phone: z
      .string()
      .min(1, copy.phoneRequired)
      .refine(
        (phone) => DUTCH_PHONE_REGEX.test(phone.replace(/[\s\-()]/g, "")),
        copy.invalidPhone,
      ),
    eventName: z
      .string()
      .min(3, copy.eventNameRequired)
      .max(120, copy.eventNameRequired),
    eventDate: z.coerce
      .date({ invalid_type_error: copy.eventDateTooSoon })
      .refine(
        (date) => differenceInCalendarDays(date, new Date()) >= MIN_EVENT_LEAD_DAYS,
        copy.eventDateTooSoon,
      ),
    address: z
      .string()
      .min(3, copy.addressRequired)
      .max(200, copy.addressRequired),
    location: z
      .string()
      .min(2, copy.locationRequired)
      .max(80, copy.locationRequired),
    attendees: z.coerce
      .number({ invalid_type_error: copy.attendeesRequired })
      .int(copy.attendeesRange)
      .min(1, copy.attendeesRequired)
      .max(1_000_000, copy.attendeesRange),
    eventType: z
      .string()
      .min(2, copy.eventTypeRequired)
      .max(80, copy.eventTypeRequired),
    additionalInfo: z.string().optional(),
    // Honeypot: real users never see or fill this field. Any content means bot.
    website: z.string().max(0).optional().default(""),
    // Not required at the schema level: Turnstile may not be configured yet
    // (no NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY). The actual
    // check — including failing closed once configured — happens in
    // verifyTurnstile() inside the server action, which is the single
    // source of truth for whether a submission passes the bot challenge.
    turnstileToken: z.string().optional().default(""),
  });
}

export function createPilotTestingSchema(copy: ValidationCopy) {
  return z.object({
    company: z.string().min(1, copy.companyRequired),
    contact: z.string().min(1, copy.contactRequired),
    email: z.string().email(copy.invalidEmail),
    phone: z.string().min(1, copy.phoneRequired),
    industry: z.string().optional(),
    budget: z.string().optional(),
    timeline: z.string().optional(),
    targetLocations: z.string().optional(),
    goals: z.string().min(1, copy.pilotGoalsRequired),
  });
}

const campaignSchema = createCampaignSchema(enMessages.forms.validation);
const contactSchema = createContactSchema(enMessages.forms.validation);
const reserveSchema = createReserveSchema(enMessages.forms.validation);
const pilotTestingSchema = createPilotTestingSchema(
  enMessages.forms.validation,
);

export { campaignSchema, contactSchema, reserveSchema, pilotTestingSchema };

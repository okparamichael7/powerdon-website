import { z } from "zod";
import { differenceInCalendarDays } from "date-fns";
import { enMessages } from "@/lib/i18n/messages/en";
import { isDisposableEmail } from "@/lib/disposable-domains";
import { SCREEN_TIER_IDS, isDeploymentWithinWindow } from "@/lib/reserve-form-schema";

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
  return z
    .object({
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
      // Event date now carries a start time (datetime-local), because the
      // deployment window below is computed from it.
      eventStart: z.coerce
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
      // Deployment moment: must fall within [eventStart - 24h, eventStart].
      // The window itself is enforced below via superRefine so it can be
      // checked against eventStart; this only catches missing/invalid input.
      deploymentAt: z.coerce.date({ invalid_type_error: copy.deploymentRequired }),
      // Screen usage tier (contract §5.1) — validated against the whitelist
      // rather than z.enum so a bogus/tampered value fails closed with a
      // normal validation error instead of a type-level surprise.
      screenTier: z
        .string()
        .min(1, copy.screenTierRequired)
        .refine(
          (tier) => (SCREEN_TIER_IDS as string[]).includes(tier),
          copy.screenTierRequired,
        ),
      screenContentDetails: z.string().optional(),
      acceptTerms: z.boolean().refine((v) => v === true, copy.acceptTermsRequired),
      acceptContract: z.boolean().refine((v) => v === true, copy.acceptContractRequired),
      // Honeypot: real users never see or fill this field. Any content means bot.
      website: z.string().max(0).optional().default(""),
      // Not required at the schema level: Turnstile may not be configured yet
      // (no NEXT_PUBLIC_TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY). The actual
      // check — including failing closed once configured — happens in
      // verifyTurnstile() inside the server action, which is the single
      // source of truth for whether a submission passes the bot challenge.
      turnstileToken: z.string().optional().default(""),
    })
    .superRefine((data, ctx) => {
      // Client bounds on <input type="datetime-local"> are UX only — a
      // scripted POST ignores them, so the window is always re-derived here.
      if (
        !Number.isNaN(data.eventStart?.getTime?.()) &&
        !Number.isNaN(data.deploymentAt?.getTime?.()) &&
        !isDeploymentWithinWindow(data.eventStart, data.deploymentAt)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: copy.deploymentOutOfWindow,
          path: ["deploymentAt"],
        });
      }
      if (data.screenTier !== "none" && !data.screenContentDetails?.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: copy.screenContentRequired,
          path: ["screenContentDetails"],
        });
      }
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

// Shared with components/reserve/ReserveFormFields.tsx so its props are
// typed against the real form shape instead of react-hook-form's generic
// FieldValues (which is structurally incompatible with a concrete Control).
export type ReserveFormInput = z.input<typeof reserveSchema>;
export type ReserveFormOutput = z.output<typeof reserveSchema>;

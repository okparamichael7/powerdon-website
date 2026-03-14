import { z } from "zod";
import { enMessages } from "@/lib/i18n/messages/en";

type ValidationCopy = typeof enMessages.forms.validation;

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
    organizer: z.string().min(1, copy.organizerRequired),
    contact: z.string().min(1, copy.contactRequired),
    email: z.string().email(copy.invalidEmail),
    phone: z.string().min(1, copy.phoneRequired),
    eventName: z.string().min(1, copy.eventNameRequired),
    eventDate: z.string().optional(),
    address: z.string().min(1, copy.addressRequired),
    location: z.string().optional(),
    attendees: z.string().optional(),
    eventType: z.string().optional(),
    additionalInfo: z.string().optional(),
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

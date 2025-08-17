import { z } from "zod";

const campaignSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  industry: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  targetLocations: z.string().optional(),
  goals: z.string().optional(),
});

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required"),
});

const reserveSchema = z.object({
  organizer: z.string().min(1, "Event organizer is required"),
  contact: z.string().min(1, "Contact person is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  eventName: z.string().min(1, "Event name is required"),
  eventDate: z.string().optional(),
  location: z.string().optional(),
  attendees: z.string().optional(),
  eventType: z.string().optional(),
  additionalInfo: z.string().optional(),
});

export { campaignSchema, contactSchema, reserveSchema };

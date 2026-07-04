import { describe, it, expect } from "vitest";
import { createReserveSchema } from "@/schema/schema";
import { enMessages } from "@/lib/i18n/messages/en";

const schema = createReserveSchema(enMessages.forms.validation);

function isoDateDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

const validPayload = {
  organizer: "Acme Events BV",
  contact: "Jan de Vries",
  email: "jan@acme-events.nl",
  phone: "0612345678",
  eventName: "Amsterdam Summer Festival",
  eventDate: isoDateDaysFromNow(30),
  address: "Museumplein 1, 1071 DJ Amsterdam",
  location: "Amsterdam, Netherlands",
  attendees: "5000",
  eventType: "Music Festival",
  additionalInfo: "",
  website: "",
  turnstileToken: "test-token",
};

describe("createReserveSchema", () => {
  it("accepts a fully valid payload", () => {
    const result = schema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it("rejects an event date of today (the Latino Gang Festival bug)", () => {
    const result = schema.safeParse({
      ...validPayload,
      eventDate: isoDateDaysFromNow(0),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an event date only 2 days ahead", () => {
    const result = schema.safeParse({
      ...validPayload,
      eventDate: isoDateDaysFromNow(2),
    });
    expect(result.success).toBe(false);
  });

  it("accepts an event date 4 days ahead", () => {
    const result = schema.safeParse({
      ...validPayload,
      eventDate: isoDateDaysFromNow(4),
    });
    expect(result.success).toBe(true);
  });

  // Note: the incident brief describes "0674746198" as an invalid 10-digit
  // number, but against the required regex it is structurally identical to
  // a valid one (single "0" prefix + 9-digit subscriber number) — it would
  // actually pass. These cases exercise genuinely invalid inputs instead.
  it("accepts a valid Dutch mobile number", () => {
    const result = schema.safeParse({ ...validPayload, phone: "0612345678" });
    expect(result.success).toBe(true);
  });

  it("rejects a phone number with an extra digit", () => {
    const result = schema.safeParse({
      ...validPayload,
      phone: "06123456789",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a non-Dutch phone number", () => {
    const result = schema.safeParse({
      ...validPayload,
      phone: "+14155552671",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a disposable email domain", () => {
    const result = schema.safeParse({
      ...validPayload,
      email: "bot@mailinator.com",
    });
    expect(result.success).toBe(false);
  });

  it("trims and lowercases the email before format-checking it", () => {
    const result = schema.safeParse({
      ...validPayload,
      email: "  Jan@ACME-Events.NL  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("jan@acme-events.nl");
    }
  });

  it("rejects attendee counts above 1,000,000", () => {
    const result = schema.safeParse({
      ...validPayload,
      attendees: "1000001",
    });
    expect(result.success).toBe(false);
  });

  // The honeypot field itself is enforced upstream in the server action
  // (silent 200 before validation ever runs) — at the schema level a filled
  // honeypot simply fails max(0), which is exercised here.
  it("rejects a filled honeypot field", () => {
    const result = schema.safeParse({
      ...validPayload,
      website: "https://spam.example.com",
    });
    expect(result.success).toBe(false);
  });
});

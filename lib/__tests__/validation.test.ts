import { describe, it, expect } from "vitest";
import { createReserveSchema } from "@/schema/schema";
import { enMessages } from "@/lib/i18n/messages/en";
import { toLocalInputValue } from "@/lib/reserve-form-schema";

const schema = createReserveSchema(enMessages.forms.validation);

function isoDateDaysFromNow(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

// Derives a datetime-local-ish value a given number of hours before the
// supplied event start, so deployment-window fixtures stay correct
// regardless of what time of day the test happens to run.
//
// Must format with LOCAL date/time components (toLocalInputValue), not
// toISOString: a string like "2026-08-10T01:00" has no timezone marker, so
// `new Date(...)` (used by the schema's z.coerce.date) parses it as local
// time. Formatting with UTC components (toISOString) would silently shift
// the instant by the runner's UTC offset and produce a flaky test.
function hoursBeforeEventStart(eventStartIso: string, hours: number): string {
  const eventStart = new Date(eventStartIso);
  return toLocalInputValue(
    new Date(eventStart.getTime() - hours * 60 * 60 * 1000),
  );
}

const eventStart = isoDateDaysFromNow(30);

const validPayload = {
  organizer: "Acme Events BV",
  contact: "Jan de Vries",
  email: "jan@acme-events.nl",
  phone: "0612345678",
  eventName: "Amsterdam Summer Festival",
  eventStart,
  address: "Museumplein 1, 1071 DJ Amsterdam",
  location: "Amsterdam, Netherlands",
  attendees: "5000",
  eventType: "Music Festival",
  additionalInfo: "",
  deploymentAt: hoursBeforeEventStart(eventStart, 2),
  screenTier: "none",
  screenContentDetails: "",
  acceptTerms: true,
  acceptContract: true,
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
      eventStart: isoDateDaysFromNow(0),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an event date only 2 days ahead", () => {
    const result = schema.safeParse({
      ...validPayload,
      eventStart: isoDateDaysFromNow(2),
    });
    expect(result.success).toBe(false);
  });

  it("accepts an event date 4 days ahead", () => {
    const start = isoDateDaysFromNow(4);
    const result = schema.safeParse({
      ...validPayload,
      eventStart: start,
      deploymentAt: hoursBeforeEventStart(start, 2),
    });
    expect(result.success).toBe(true);
  });

  it("rejects a deployment moment more than 24h before the event start", () => {
    const result = schema.safeParse({
      ...validPayload,
      deploymentAt: hoursBeforeEventStart(eventStart, 25),
    });
    expect(result.success).toBe(false);
  });

  it("rejects a deployment moment after the event start", () => {
    const result = schema.safeParse({
      ...validPayload,
      deploymentAt: hoursBeforeEventStart(eventStart, -1),
    });
    expect(result.success).toBe(false);
  });

  it("accepts a deployment moment exactly at the event start", () => {
    const result = schema.safeParse({
      ...validPayload,
      deploymentAt: hoursBeforeEventStart(eventStart, 0),
    });
    expect(result.success).toBe(true);
  });

  it("rejects an unknown screen tier", () => {
    const result = schema.safeParse({
      ...validPayload,
      screenTier: "unlimited_everything",
    });
    expect(result.success).toBe(false);
  });

  it("requires screen content details when a non-'none' tier is chosen", () => {
    const result = schema.safeParse({
      ...validPayload,
      screenTier: "event_display",
      screenContentDetails: "",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a non-'none' tier when content details are provided", () => {
    const result = schema.safeParse({
      ...validPayload,
      screenTier: "event_display",
      screenContentDetails: "Program schedule and sponsor logos",
    });
    expect(result.success).toBe(true);
  });

  it("rejects submission when terms are not accepted", () => {
    const result = schema.safeParse({ ...validPayload, acceptTerms: false });
    expect(result.success).toBe(false);
  });

  it("rejects submission when the contract is not accepted", () => {
    const result = schema.safeParse({ ...validPayload, acceptContract: false });
    expect(result.success).toBe(false);
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

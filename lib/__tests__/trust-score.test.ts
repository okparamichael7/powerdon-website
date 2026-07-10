import { describe, it, expect } from "vitest";
import { buildTrustReport } from "@/lib/trust-score";

const meta = {
  ip: "203.0.113.5",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

function daysFromNow(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

describe("buildTrustReport", () => {
  it("scores a clean application at 100 with no risk flags", () => {
    const report = buildTrustReport(
      {
        contact: "Sanne Bakker",
        email: "sanne@acme-events.nl",
        eventStart: daysFromNow(60),
        attendees: 500,
      },
      meta,
    );

    expect(report.score).toBe(100);
    expect(report.flags).toEqual(["✅ No risk flags"]);
  });

  it("penalizes a free-email, large-attendee, short-lead-time application", () => {
    const report = buildTrustReport(
      {
        contact: "Jan Bakker",
        email: "randomuser123@gmail.com",
        eventStart: daysFromNow(2),
        attendees: 15000,
      },
      meta,
    );

    expect(report.score).toBeLessThanOrEqual(60);
    expect(
      report.flags.some((flag) => flag.includes("Free email domain")),
    ).toBe(true);
    expect(
      report.flags.some((flag) => flag.includes("Large event claimed")),
    ).toBe(true);
  });

  it("never drops the score below 0 even with every deduction stacked", () => {
    const report = buildTrustReport(
      {
        contact: "Zzz",
        email: "randomuser123@gmail.com",
        eventStart: daysFromNow(1),
        attendees: 999_999,
      },
      meta,
    );

    expect(report.score).toBeGreaterThanOrEqual(0);
  });
});

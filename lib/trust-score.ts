import { isFreeEmailDomain } from "@/lib/disposable-domains";
import { getFirstName } from "@/lib/utils";

export interface PartnershipApplication {
  contact: string;
  email: string;
  eventDate: Date;
  attendees: number;
}

export interface TrustReportMeta {
  ip: string;
  userAgent: string;
}

export interface TrustReport {
  score: number;
  flags: string[];
}

const MOBILE_UA_PATTERN = /mobile|android|iphone|ipad/i;
const LARGE_EVENT_THRESHOLD = 10_000;
const SHORT_LEAD_TIME_DAYS = 14;

function daysUntil(date: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((date.getTime() - Date.now()) / msPerDay);
}

export function buildTrustReport(
  app: PartnershipApplication,
  meta: TrustReportMeta,
): TrustReport {
  let score = 100;
  const flags: string[] = [];

  const freeEmail = isFreeEmailDomain(app.email);
  const daysToEvent = daysUntil(app.eventDate);

  if (freeEmail) {
    score -= 20;
    flags.push("⚠️ Free email domain — no company domain");
  }

  if (daysToEvent < SHORT_LEAD_TIME_DAYS) {
    score -= 20;
    flags.push(`⚠️ Very short lead time: event in ${daysToEvent} days`);
  }

  if (app.attendees >= LARGE_EVENT_THRESHOLD && freeEmail) {
    score -= 20;
    flags.push("⚠️ Large event claimed but consumer email — verify");
  }

  const localPart = app.email.split("@")[0]?.toLowerCase() ?? "";
  const firstName = getFirstName(app.contact).toLowerCase();
  if (firstName && !localPart.includes(firstName)) {
    score -= 5;
    flags.push("ℹ️ Email local-part doesn't match contact name");
  }

  if (MOBILE_UA_PATTERN.test(meta.userAgent)) {
    flags.push("ℹ️ Submitted from mobile device");
  }

  score = Math.max(0, score);

  if (flags.length === 0) {
    flags.push("✅ No risk flags");
  }

  return { score, flags };
}

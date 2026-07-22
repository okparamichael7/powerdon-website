// Shared helpers for the "Apply for Partnership" reserve form: screen-usage
// tiers and deployment-window math. Framework-agnostic so both the zod
// schema (schema/schema.ts, used for client + server-side re-validation)
// and the form UI (components/reserve/*) stay in sync off one source.

// The three screen tiers mirror contract §5.1 verbatim. Keep these in sync
// with components/reserve/ContractDocument.tsx so the form and the signed
// agreement never disagree. Deliberately not run through i18n: these
// describe binding revenue-share terms tied to the (Dutch-only) contract
// text and must not diverge from it by locale.
export const SCREEN_TIERS = {
  none: {
    id: "none",
    label: "Nee — alleen het standaard festivalscherm",
    contractTier: "Tier 1 — Basis",
    revShare: "30% aandeel in de verhuurinkomsten",
  },
  event_display: {
    id: "event_display",
    label: "Ja — programma, aankondigingen en QR-code tonen",
    contractTier: "Tier 2 — Evenementweergave inbegrepen",
    revShare: "20% aandeel + beperkte advertentierotatie (40%)",
  },
  full_branding: {
    id: "full_branding",
    label: "Ja — volledige controle over het scherm (eigen branding)",
    contractTier: "Tier 3 — Volledige brandingcontrole",
    revShare: "Geen aandeel in de verhuurinkomsten",
  },
} as const;

export type ScreenTierId = keyof typeof SCREEN_TIERS;
export const SCREEN_TIER_IDS = Object.keys(SCREEN_TIERS) as ScreenTierId[];

export const HOURS_24_MS = 24 * 60 * 60 * 1000;
export const INSTALL_DURATION_MINUTES = 20;

// Minimum number of days between "today" and the event date, enforced by
// createReserveSchema's eventStart refinement (schema/schema.ts). Lives here
// (not schema.ts) so the event-date picker's `min` bound can't drift from
// the rule the server actually re-validates.
export const MIN_EVENT_LEAD_DAYS = 3;

// Bump when the contract text in components/reserve/ContractDocument.tsx
// changes, so accepted submissions always carry the version the applicant
// actually read. Lives here (not in the client component) so server code
// (app/actions/reserve.ts) can import it without pulling in a "use client"
// module.
export const CONTRACT_VERSION = "2026-07-11";

// Converts a Date to the "YYYY-MM-DDTHH:mm" format <input type="datetime-local">
// expects, in local time (toISOString would shift it to UTC).
export function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
    `T${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

// "YYYY-MM-DD" local date part, for the event-date Calendar/min bound.
export function toLocalDateValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// "HH:mm" local time part (24h), for the wheel time pickers.
export function toLocalTimeValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

// Splits the combined "YYYY-MM-DDTHH:mm" value the schema expects into the
// separate date/time parts the two-input UI edits independently.
export function splitLocalDateTime(
  value: string | null | undefined,
): { datePart: string; timePart: string } {
  if (!value) return { datePart: "", timePart: "" };
  const [datePart = "", timePart = ""] = value.split("T");
  return { datePart, timePart };
}

// Recombines date + time parts back into the "YYYY-MM-DDTHH:mm" format.
export function combineLocalDateTime(datePart: string, timePart: string): string {
  if (!datePart) return "";
  return `${datePart}T${timePart || "00:00"}`;
}

// Earliest selectable event date, mirroring createReserveSchema's
// MIN_EVENT_LEAD_DAYS refinement — keeps the Calendar's disabled-dates in
// sync with the rule the server actually re-validates.
export function getMinEventDateValue(): string {
  const min = new Date();
  min.setDate(min.getDate() + MIN_EVENT_LEAD_DAYS);
  return toLocalDateValue(min);
}

// For events starting at/after noon, installers may arrive as early as a
// normal mid-morning hour the day before, rather than being pinned to the
// exact 24h mark (which would otherwise land at an odd hour, e.g. an 8pm
// event would only allow deployment from 8pm the day before). Earlier
// events keep the strict "exactly 24h before" floor.
const EARLY_EVENT_TIME = "12:00";
const DAY_BEFORE_EARLIEST_ARRIVAL = "10:00";

// Single source of truth for how early deployment may start, so the day
// toggle's bounds (UI) and isDeploymentWithinWindow (client + server
// validation) can't drift apart.
function deploymentWindowStart(eventStart: Date): Date {
  if (toLocalTimeValue(eventStart) < EARLY_EVENT_TIME) {
    return new Date(eventStart.getTime() - HOURS_24_MS);
  }
  const [hours, minutes] = DAY_BEFORE_EARLIEST_ARRIVAL.split(":").map(Number);
  const windowStart = new Date(eventStart);
  windowStart.setDate(windowStart.getDate() - 1);
  windowStart.setHours(hours, minutes, 0, 0);
  return windowStart;
}

// The deployment window spans exactly two calendar dates (the event's date
// and the day before). Splits it into those two selectable "day" options,
// each carrying the sub-range of times that's actually valid on that
// specific day, so the UI can offer a day toggle + a time-only wheel picker
// instead of a single free-ranging datetime control.
export function getDeploymentDayOptions(eventStart: Date): Array<{
  date: string; // "YYYY-MM-DD"
  minTime: string; // "HH:mm"
  maxTime: string; // "HH:mm"
}> {
  const eventTime = toLocalTimeValue(eventStart);
  const dayBefore = toLocalDateValue(new Date(eventStart.getTime() - HOURS_24_MS));
  const dayOf = toLocalDateValue(eventStart);
  return [
    { date: dayBefore, minTime: toLocalTimeValue(deploymentWindowStart(eventStart)), maxTime: "23:59" },
    { date: dayOf, minTime: "00:00", maxTime: eventTime },
  ];
}

// Single source of truth for the deployment-window rule so the zod schema
// (client resolver + server action re-validation) can't drift apart.
export function isDeploymentWithinWindow(eventStart: Date, deploymentAt: Date): boolean {
  const start = eventStart.getTime();
  const deploy = deploymentAt.getTime();
  if (Number.isNaN(start) || Number.isNaN(deploy)) return false;
  return deploy <= start && deploy >= deploymentWindowStart(eventStart).getTime();
}

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

// Client-side min/max for the deployment <input> — UX only, not a security
// boundary. The real check is isDeploymentWithinWindow, re-run server-side.
// Accepts a Date too because react-hook-form's watched value is typed as
// Date (the schema coerces eventStart to a Date on parse) even though its
// live, pre-submit runtime value is the raw datetime-local string.
export function getDeploymentBounds(
  eventStartIso: string | Date | null | undefined,
) {
  if (!eventStartIso) return { min: undefined, max: undefined };
  const eventStart = new Date(eventStartIso);
  if (Number.isNaN(eventStart.getTime())) return { min: undefined, max: undefined };
  return {
    min: toLocalInputValue(new Date(eventStart.getTime() - HOURS_24_MS)),
    max: toLocalInputValue(eventStart),
  };
}

// Single source of truth for the deployment-window rule so the zod schema
// (client resolver + server action re-validation) can't drift apart.
export function isDeploymentWithinWindow(eventStart: Date, deploymentAt: Date): boolean {
  const start = eventStart.getTime();
  const deploy = deploymentAt.getTime();
  if (Number.isNaN(start) || Number.isNaN(deploy)) return false;
  return deploy <= start && deploy >= start - HOURS_24_MS;
}

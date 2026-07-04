# Partnership Form Security Hardening

## 1. Overview

On 2026-07-04 a fake partnership application ("Latino Gang Festival", event
date = today, 12,000 attendees, free Gmail address, malformed phone number)
was submitted through `/reserve/form` and landed unfiltered in the founder's
inbox. At the time, the form had almost no server-side validation:
`eventDate`, `location`, `attendees`, and `eventType` were all optional Zod
fields with no format or range checks, and there was no bot detection, rate
limiting, or risk scoring of any kind.

This document describes the hardening pipeline added on top of the existing
form infrastructure.

### Recon findings that shaped this implementation

Before writing any code, the existing codebase was read (not assumed):

- `/reserve/form` (`app/reserve/form/page.tsx`) is **not** backed by an API
  route — it calls a **Server Action**, `reserve()` in
  `app/actions/reserve.ts`. There is no `app/api/**` route for this form and
  none was created; the defense pipeline lives inside the server action.
- Real field names are `organizer, contact, email, phone, eventName,
  eventDate, address, location, attendees, eventType, additionalInfo` — not
  the generic names in the original brief (`festivalName`, `organization`,
  `contactPerson`, `city`, `venueAddress`, `expectedAttendees`). See §5 for
  the full mapping.
- All transactional email (contact, reserve, campaign, pilot forms) already
  goes through **Resend** (`lib/mail.ts`) with React Email templates and an
  existing `generateRequestId(prefix)` helper. Nodemailer + SiteGround SMTP
  was **not** added, since it would duplicate working infrastructure and
  fragment email delivery across two providers for one form. The trust
  report is instead folded into the existing `sendPartnershipEmail()` call.
- Zod was already installed and already used via a `create*Schema(copy)`
  factory pattern (locale-aware error messages) in `schema/schema.ts` — the
  reserve schema was hardened in place rather than replaced.
- No test runner existed. Vitest was added (dev dependency) since it needed
  zero config to resolve the `@/` path alias used throughout the repo.
- `middleware.ts` doesn't exist; this project's Next middleware is
  `proxy.ts` (i18n locale routing only) and does not touch `/reserve/form`
  or need changes for this work.

## 2. Defense pipeline

The pipeline runs inside `reserve()` (`app/actions/reserve.ts`), cheapest
checks first:

```
 submit
   │
   ▼
┌─────────────────────┐  filled → silent 200, no email sent, WARN logged
│ 1. Honeypot check    ├───────────────────────────────────────────────►
│    (values.website)  │
└──────────┬───────────┘
           │ empty
           ▼
┌─────────────────────┐  fails → { error, status: 400 }, details attached
│ 2. Zod validation    ├───────────────────────────────────────────────►
│    (locale-aware)     │
└──────────┬───────────┘
           │ passes
           ▼
┌─────────────────────┐  fails → { error, status: 403 }, WARN logged
│ 3. Turnstile verify  ├───────────────────────────────────────────────►
└──────────┬───────────┘
           │ passes
           ▼
┌─────────────────────┐  exceeded → { error, status: 429 }, WARN logged
│ 4. Rate limit        ├───────────────────────────────────────────────►
│    (IP + email)      │
└──────────┬───────────┘
           │ allowed
           ▼
┌─────────────────────┐
│ 5. Trust score        │  never blocks — informs the admin email only
└──────────┬───────────┘
           ▼
┌─────────────────────┐  failure caught + logged, does NOT block the 200 —
│ 6. Notification email │  the applicant did everything right
└──────────┬───────────┘
           ▼
   { success, status: 200, requestId }
```

Every outcome is logged:

- Normal outcomes at INFO: `[form] ${requestId} — result=received trust=${score} ip=${ip}`
- Abuse signals at WARN: `[form-abuse] ${type} — ip=${ip} ua=${userAgent}`
  (honeypot fill, Turnstile failure, rate-limit exceeded)

**Deviation from the original brief:** validation failures return HTTP-style
status `400`, not `422`. Every other server action in this codebase
(`contact.ts`, `campaign.ts`, `pilot.ts`) already returns `400` for Zod
validation failures via the same `{ error, details, status }` shape, and the
frontend only branches on `data.success` / `data.error` — the `status` field
is metadata, not read by the UI. `400` was kept for consistency with the
other three forms rather than introducing a one-off `422`.

## 3. Why the Latino Gang Festival submission would have been caught

| Signal in the fake submission | Defense that catches it | Where |
| --- | --- | --- |
| Event date = today | `eventDate` must be ≥ 3 calendar days out | `schema/schema.ts` → `createReserveSchema` |
| 12,000 attendees, unvalidated | `attendees` now required, integer, 1–1,000,000 | `schema/schema.ts` |
| Free Gmail address | Not blocked outright (see §8), but scored | `lib/trust-score.ts` — free-email flag |
| Free Gmail **+** 12,000 attendees together | Extra deduction for this specific combination | `lib/trust-score.ts` |
| Malformed/no real phone format | Dutch phone regex enforced | `schema/schema.ts` |
| No lead time to review | Trust score flags event < 14 days out | `lib/trust-score.ts` |
| Scripted/bot submission (if applicable) | Honeypot + Turnstile | `app/actions/reserve.ts` steps 1 & 3 |
| Rapid repeat submissions | 3/hr per IP, 2/day per email | `lib/rate-limit.ts` |

Even in the case where a human *did* fill in all fields "validly" but the
event is implausible, the trust score (📉 in the subject line, flags in the
email body) puts the burden of a 10-second gut check on the founder instead
of silence.

### Note on the phone number example in the original incident brief

The brief cites `0674746198` as an example that the required regex
(`/^(\+31|0031|0)([1-9][0-9]{8})$/`) should reject, describing it as having
"10 digits after 06." Checked against the actual string, that number is
structurally identical to a valid one — `0` + 9-digit subscriber number,
same as the example valid number `0612345678`. Both are 10 characters
total. The regex was implemented exactly as specified in the brief; the
test suite (`lib/__tests__/validation.test.ts`) uses genuinely-invalid
numbers (extra digit, non-Dutch country code) instead of repeating that
example, since asserting the original claim would have made the test
suite lie about what the code does.

## 4. Environment variables

| Variable | Purpose | Where to get it |
| --- | --- | --- |
| `RESEND_API_KEY` | Sends admin + confirmation email (existing) | resend.com dashboard → API Keys |
| `FROM_EMAIL` | Sender address for all form emails (existing) | Must be a verified domain sender in Resend |
| `TO_EMAIL` | Founder's inbox that receives admin notifications (existing) | — |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO metadata (existing) | Defaults to `https://powerdon.nl` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Public site key for the Turnstile widget | Cloudflare dashboard → Turnstile → add a site for `powerdon.nl`, choose "Managed" mode |
| `TURNSTILE_SECRET_KEY` | Server-side secret to verify Turnstile tokens | Same Cloudflare Turnstile site, "Secret Key" |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint for rate limiting | Upstash console → create a Redis database (EU region, close to Vercel deployment region) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token | Same Upstash database → REST API tab |

`turnstileToken` is intentionally **not** a required field in
`createReserveSchema` (`schema/schema.ts`) — it's optional, defaulting to
`""`. The real Turnstile check happens in `verifyTurnstile()`, the single
source of truth for pass/fail. This matters because the frontend only
renders `<TurnstileWidget>` and gates the submit button on having a token
when `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is actually set
(`app/reserve/form/page.tsx`); requiring the token at the schema level would
have permanently disabled the submit button in production before Cloudflare
is configured, since the widget would never render and `onToken` would
never fire.

If `UPSTASH_REDIS_REST_URL`/`TOKEN` are unset, `checkRateLimits()` logs a
warning once and allows all requests through — rate limiting fails open when
unconfigured, never crashes the form. `verifyTurnstile()` follows the same
fail-open-when-unconfigured rule: if `TURNSTILE_SECRET_KEY` is missing, it
logs a warning once and treats the challenge as passed, so the form keeps
accepting real leads before Cloudflare is set up in Vercel. Once the secret
*is* configured, a real verification failure or an unreachable Cloudflare
endpoint fails **closed** (submission rejected, status 403) — the fail-open
path only covers the "not configured yet" case, not an active check that
failed.

## 5. Field name mapping

The original brief used generic field names. The actual form field names
(unchanged) were used throughout instead:

| Brief's generic name | Actual field in this codebase |
| --- | --- |
| `festivalName` | `eventName` |
| `organization` | `organizer` |
| `contactPerson` | `contact` |
| `city` | `location` |
| `venueAddress` | `address` |
| `expectedAttendees` | `attendees` |
| `eventType` | `eventType` (unchanged) |
| `website` (honeypot) | `website` (unchanged, added) |
| `turnstileToken` | `turnstileToken` (unchanged, added) |

`website` and `turnstileToken` are new fields added to `createReserveSchema`,
the form's `defaultValues`, and `ReserveFormData`. No existing field was
renamed, and no visible label, layout, or style changed — `eventDate`,
`location`, `attendees`, and `eventType` gained a `*` in their label copy
(`en.ts` / `locales/nl/forms.json`) since they went from optional to
required; this is a copy-only change, not a layout change.

## 6. Testing

```bash
npm test
```

Runs `vitest run` against:

- `lib/__tests__/validation.test.ts` — schema-level rules (event lead time,
  phone format, disposable email, attendee range, honeypot)
- `lib/__tests__/trust-score.test.ts` — scoring math and the 0 floor
- `lib/__tests__/disposable-domains.test.ts` — block-list and free-domain
  list lookups

`lib/turnstile.ts` and `lib/rate-limit.ts` are not unit tested here since
both are thin, side-effecting wrappers around external HTTP/Redis calls —
their fail-open/fail-closed behavior is exercised structurally in code
review rather than mocked network calls.

## 7. GDPR note

Every submission logs the requester's IP address and User-Agent string
(`app/actions/reserve.ts`, `lib/trust-score.ts`) for abuse detection and the
trust score shown to the admin. This is personal data under the AVG/GDPR.

- **Legal basis**: legitimate interest, art. 6(1)(f) AVG — protecting the
  form and the founder's inbox from fraudulent/abusive submissions.
- **Data logged**: IP address, User-Agent, submitted form fields, computed
  trust score and flags.
- **Suggested retention**: 90 days for server/application logs, after which
  they should be purged or aggregated. Email notifications themselves
  (which contain the same data) follow whatever retention policy applies to
  the founder's mailbox already.
- **Action item**: add one line to the privacy policy noting that IP/UA are
  logged for fraud prevention on the partnership form.

## 8. What is NOT included, and why

- **Email address verification (send-a-code-to-confirm)** — removed from
  scope. It adds friction to a B2B lead-gen form where the whole point is a
  low-friction inbound channel; disposable-domain blocking + trust scoring
  covers the same risk more cheaply.
- **ML-based scoring** — overkill at current submission volume (a handful
  of applications a week). The heuristic trust score is transparent,
  debuggable, and good enough for a human to sanity-check in 10 seconds.
- **Blocking free email domains outright (Gmail, Outlook, etc.)** — not
  implemented as a hard block. Many legitimate small festival/event
  organizers only have a Gmail address, not a company domain. Free domains
  are *flagged* in the trust score, not rejected.

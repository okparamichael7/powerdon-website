# What changed on the partnership application form (deployment, screen usage, contract)

## The ask

Three additions to the "Apply for Partnership" form (`/reserve/form`):

1. A **deployment moment** — when Powerdon shows up to install the
   equipment, which has to fall within 24 hours before the event starts.
2. A **screen usage question** — does the organizer want their own content
   on the LED screen, and if so, what content? This maps directly to the
   revenue-share tiers in §5.1 of the partnership contract.
3. **Reading and accepting the actual contract** inside the form itself,
   with a second checkbox (separate from the general terms checkbox) that
   has to be ticked before the applicant can submit.

## What was built

### 1. Deployment moment

A new required date-and-time field appears right after "Venue address."
It only unlocks once you've filled in the event's date and start time
(the old date-only field was upgraded to also capture a start time, since
the 24-hour window is measured from it). The helper text under the field
says: *"De installatie duurt ongeveer 20 minuten."*

The 24-hour window shown in the browser (you can't even click a date
outside it) is just a convenience — the real enforcement happens again on
the server after submit, so a bot or a hand-crafted request can't skip
past it by editing the page.

### 2. Screen usage

A required set of three options, worded to match the contract:

- **Nee** — alleen het standaard festivalscherm (Tier 1, 30% revenue share)
- **Ja** — programma, aankondigingen en QR-code tonen (Tier 2, 20% share +
  limited ad rotation)
- **Ja** — volledige controle over het scherm (Tier 3, no revenue share)

Choosing either "Ja" option reveals a required text box asking what
content they want to show. Choosing "Nee" hides it — nothing to fill in.

### 3. Contract acceptance

There's now a "product- & dienstenovereenkomst" (product & services
agreement) link inside the form that opens the full contract in a popup,
with the organizer's own answers (name, address, event date, attendee
count, deployment date, chosen tier) filled into the contract text live as
they type — so what they read matches what they're about to submit.

A brand new second checkbox sits under the existing terms/privacy
checkbox: *"Ik heb de overeenkomst gelezen en ga hiermee akkoord."* The
Submit button stays disabled until **both** checkboxes are ticked.

## Important: how the server double-checks everything

Same principle as the earlier anti-fraud hardening (see
`WHATS_NEW_FORM_SECURITY.md`) — anything the browser enforces is treated as
a convenience for honest users, never as the real gate, because a scripted
submission skips the browser entirely. On submit, the server independently
re-checks:

- The deployment moment is really within [event start − 24h, event start]
  — recomputed from the submitted event date, not trusted from the form.
- The screen tier is one of the three real options (not some made-up
  value someone typed into a raw POST request).
- If a tier other than "Nee" was chosen, the content description isn't
  empty.
- **Both** checkboxes are actually `true` — not just present.

If any of these fail, the submission is rejected with the same
locale-aware error messages the form already uses for every other field —
no separate/parallel validation path was added.

When a submission does pass, the confirmation record now also captures,
server-side (never taken from the browser): the moment it was accepted,
which version of the contract text was shown, and the submitter's IP
address and browser (user agent) — the same audit-trail idea as the trust
score in the existing hardening, but for contract acceptance. There's no
database in this project (forms only send email), so "record" means these
details are now included in the admin notification email alongside the
existing trust score — not the confirmation email the applicant receives.

## A judgment call worth knowing about

This site shows the form in both English and Dutch. The new field labels,
help text, and error messages were added in both languages, matching how
every other field on this form already works.

The **contract text itself**, and the three tier descriptions/revenue
splits shown next to the screen-usage question, were deliberately left
Dutch-only, regardless of which language the visitor is browsing in. That
text is the actual binding agreement — auto-translating it would risk an
English version quietly drifting out of sync with the real Dutch contract
over time. If you want an official English version later, that needs a
deliberate translation pass, not an automatic one.

## How to test this yourself

### 1. The automated check (2 minutes)

```
npm install
npm test
```

You should see `Test Files 3 passed (3)` and `Tests 26 passed (26)` —
8 of those are new, covering the deployment window, the screen-tier
whitelist, the "content required unless tier is none" rule, and both
acceptance checkboxes.

### 2. Trying the real form in your browser (10 minutes)

1. `npm run dev`, then open `http://localhost:3000/reserve/form`.
2. Fill in an event name, address, and an **event date & start time** a
   week or more out.
3. Notice the new **deployment moment** field only becomes usable once
   step 2 is filled in, and that the date picker won't let you go earlier
   than 24 hours before your event start, or later than the event start
   itself.
4. Pick **"Ja — programma, aankondigingen..."** for screen usage and
   confirm a required text box appears; switch back to "Nee" and confirm
   it disappears.
5. Try clicking Submit with only one of the two checkboxes ticked — the
   button should stay disabled.
6. Click the contract link/button, confirm the popup shows the agreement
   with your organizer name, address, event date, and chosen tier already
   filled in.
7. Tick both checkboxes and submit a fully valid application. Check the
   inbox configured in `TO_EMAIL` for the admin email — it should now show
   the deployment moment, the screen tier, any content details you typed,
   and a "Contract Acceptance" section with a timestamp, the contract
   version, and your IP/browser info.

## Where to look for more detail

- `lib/reserve-form-schema.ts` — the screen tiers, the 24-hour window math,
  and the contract version number, all in one place so the form and the
  contract can't drift apart.
- `components/reserve/ContractDocument.tsx` — the actual contract text.
- `components/reserve/ReserveFormFields.tsx` — the three new form sections.
- `schema/schema.ts` (`createReserveSchema`) — where both the browser form
  and the server re-validation get their rules from (one schema, used
  twice).
- `app/actions/reserve.ts` — where the server stamps the acceptance
  timestamp, contract version, IP, and user agent before emailing.
- `lib/__tests__/validation.test.ts` — the automated tests mentioned above.

## Status

Not committed yet — everything above is sitting as uncommitted changes in
the working tree, ready for you to review (and test in the browser) before
it's committed.

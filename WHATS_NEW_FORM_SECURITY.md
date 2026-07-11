# What changed on the partnership application form

## The problem

Someone submitted a fake application through the "Apply for Partnership"
form (`/reserve/form`) — a made-up festival, today's date as the event date,
a free Gmail address, 12,000 "attendees," and a phone number that wasn't
really valid. Nothing stopped it. It landed in the inbox looking just like
a real lead.

## What was built

Think of it as five checkpoints a submission has to pass before it reaches
the inbox — cheapest and simplest first:

1. **A trap for bots** (the "honeypot"). There's an invisible field on the
   form that no human ever sees or fills in, because it's hidden with CSS.
   Scripts that blindly fill out every field on a page will fill it in
   anyway. If it's not empty, we quietly accept the submission on-screen (so
   the bot doesn't learn it got caught) but never actually send an email
   about it.

2. **Sanity checks on the answers.** This is the big one for your specific
   incident:
   - The event date must be at least **3 days from today** — "today" or
     "yesterday" is no longer accepted.
   - Expected attendees must be a real number between **1 and 1,000,000** —
     no more blank/unlimited field.
   - The phone number has to actually look like a Dutch phone number.
   - The email can't be a known disposable/throwaway address
     (Mailinator, Guerrilla Mail, etc.).

3. **"Prove you're not a robot"** (Cloudflare Turnstile). A well-known,
   free anti-bot check. In its normal mode it's invisible — most real
   visitors never see a puzzle or checkbox at all.

4. **A speed limit.** The same computer can only submit 3 times per hour,
   and the same email address only twice per day. Stops someone from
   spamming the form over and over.

5. **A "trust score" on the email you receive.** Every application that
   makes it through now arrives with a score out of 100 and a short list of
   plain-English flags, e.g.:
   - "⚠️ Free email domain — no company domain"
   - "⚠️ Very short lead time: event in 5 days"
   - "⚠️ Large event claimed but consumer email — verify"

   A low score doesn't block the email — you still see everything — but the
   subject line gets a 🚨 or ⚠️ so you know at a glance which ones deserve a
   closer look before you reply.

## Important: nothing is broken right now

Steps 3 and 4 (the bot-proof check and the speed limit) need two free
external services set up — **Cloudflare Turnstile** and **Upstash Redis** —
which nobody has created accounts for yet. The form was built so that
**until those are set up, it just skips those two checks and keeps working
normally** — it does not block or break real submissions. Steps 1, 2, and 5
(the trap, the sanity checks, and the trust score) are active right now,
with no setup needed.

When you're ready to turn on the last two layers:

1. Create a free Cloudflare account → Turnstile → add a site for
   `powerdon.nl` (choose "Managed" mode).
2. Create a free Upstash account → a Redis database (pick an EU region).
3. Add the resulting keys as environment variables in the Vercel project
   settings (the exact variable names are listed in `.env.example` and in
   `SECURITY_HARDENING.md`).

## How to test this yourself

There are two ways to check it's working: a quick automated check, and
trying the real form in your browser.

### 1. The quick automated check (2 minutes)

This runs 18 small checks that verify the rules themselves (dates, phone
numbers, attendee limits, disposable emails, trust scoring) without needing
the website running at all.

1. Open a terminal in the project folder.
2. Run:
   ```
   npm install
   npm test
   ```
3. You should see something like `Test Files 3 passed (3)` and
   `Tests 18 passed (18)`. If anything says "failed," something broke —
   stop and ask before deploying.

### 2. Trying the real form in your browser (10 minutes)

1. Start the site locally:
   ```
   npm run dev
   ```
2. Open `http://localhost:3000/reserve/form` in your browser.
3. **Try to recreate the original bad submission** and confirm it's now
   rejected:
   - Set the event date to **today**.
   - Set expected attendees to something huge, e.g. `9999999`.
   - Leave everything else filled in with anything.
   - Click submit. You should see the form's error message, and no email
     should be sent — because the date and attendee-count rules now catch
     this before it ever reaches your inbox.
4. **Try a date only 1–2 days away** — should also be rejected (the rule is
   "at least 3 days from today").
5. **Try a phone number that isn't a real Dutch number** (e.g.
   `123`) — should be rejected.
6. **Now fill in a fully legitimate-looking application**: a real-shaped
   Dutch phone number (e.g. `0612345678`), an event date at least a week
   out, a reasonable attendee count (e.g. `500`), and a normal-looking
   email address. Submit it.
   - You should see the success message on the page.
   - Check the inbox configured in `TO_EMAIL` — you should receive the
     admin notification email, and it should show a **trust score**
     near the top (100/100 for a clean submission like this one).
   - The email address you submitted with should also receive a
     confirmation email.
7. **Optional — see the trust score flag something**: submit again using a
   free address like a Gmail account and a very large attendee number
   (e.g. `50000`). The admin email you receive should now show a lower
   score with flags like "Free email domain" and "Large event claimed but
   consumer email."

Note: since Cloudflare Turnstile and Upstash rate limiting aren't set up
yet (see the section above), you won't see a "prove you're human" widget
and you can submit more than 3 times in an hour without being blocked —
that's expected until those two accounts are created.

## Where to look for more detail

- `SECURITY_HARDENING.md` — the full technical writeup (env vars, how the
  pipeline is wired, what got tested, GDPR notes).
- `lib/__tests__/` — 18 automated tests that check this all actually works
  (run with `npm test`).

## Status

Already committed and pushed to `main`.

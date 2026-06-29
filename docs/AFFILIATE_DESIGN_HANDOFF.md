# PowerDon Affiliate — Figma Design Handoff

Spec for the affiliate sign-up page and dashboard. Hand this to your designer alongside the live preview URL so they can rebuild a polished mobile design in Figma.

**Live references (production-ready, click-through):**
- Sign-up: https://powerdon-git-claude-affiliate-dash-98b48e-okpara-3751s-projects.vercel.app/affiliate/signup
- Dashboard: https://powerdon-git-claude-affiliate-dash-98b48e-okpara-3751s-projects.vercel.app/affiliate
- Dutch: append `/nl` before the path

**Fast Figma path:** install the `html.to.design` Figma plugin → paste the two URLs above → it imports each screen as a real frame with structured layers, fonts, colours and assets matching this spec exactly.

---

## 1. Design tokens

### Colour

| Token | Hex | Tailwind | Use |
|---|---|---|---|
| `blue/50` | `#eff6ff` | `blue-50` | Soft panel backgrounds, stat-icon tile, dialog wash |
| `blue/100` | `#dbeafe` | `blue-100` | Sign-up form card wash, hero badge bg |
| `blue/200` | `#bfdbfe` | `blue-200` | Input borders, divider lines |
| `blue/300` | `#93c5fd` | `blue-300` | Outline pill borders, disabled primary |
| `blue/500` | `#3b82f6` | `blue-500` | Method-option active border |
| `blue/600` | `#2563eb` | `blue-600` | **Primary action** (Sign Up, Add) |
| `blue/700` | `#1d4ed8` | `blue-700` | Primary hover, accent text, links |
| `blue/900` | `#1e3a8a` | `blue-900` | Header bar bg (`/95` alpha) |
| `gray/900` | `#111827` | `gray-900` | Headings, primary text |
| `gray/700` | `#374151` | `gray-700` | Body text emphasis |
| `gray/600` | `#4b5563` | `gray-600` | Body text |
| `gray/500` | `#6b7280` | `gray-500` | Secondary text |
| `gray/400` | `#9ca3af` | `gray-400` | Tertiary text, placeholders |
| `gray/200` | `#e5e7eb` | `gray-200` | Card borders, dividers |
| `gray/100` | `#f3f4f6` | `gray-100` | Tab list bg |
| `white` | `#ffffff` | `white` | Card surface |
| `black` | `#000000` | `black` | Avatar, header logo |

**Status accents (used on dashboard event status pills + thread status):**
| Status | Bg | Text |
|---|---|---|
| Active / Open | `emerald-100 #d1fae5` | `emerald-900 #064e3b` |
| Upcoming | `blue-100 #dbeafe` | `blue-900 #1e3a8a` |
| Awaiting reply | `amber-100 #fef3c7` | `amber-900 #78350f` |
| Completed / Closed | `gray-100 #f3f4f6` | `gray-700 #374151` |

**Role tags (thread messages):**
| Role | Bg | Text |
|---|---|---|
| Affiliate | `blue-100 #dbeafe` | `blue-800 #1e40af` |
| Organiser | `purple-100 #f3e8ff` | `purple-800 #6b21a8` |

### Typography

Font: **Geist Sans** (already loaded via `geist` package). System fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

| Style | Size / line-height | Weight | Tracking |
|---|---|---|---|
| Display (hero h1) | 48 / 56 desktop, 36 / 44 mobile | 300 light | -0.005em |
| H2 section | 24 / 32 | 600 semibold | -0.01em |
| H3 card title | 18 / 24 | 600 semibold | 0 |
| Body | 16 / 24 | 400 regular | 0 |
| Body-sm | 14 / 20 | 400 regular | 0 |
| Caption | 12 / 16 | 500 medium | 0.04em uppercase |
| Micro | 10 / 14 | 600 semibold | 0.16em uppercase |
| Mono (referral codes, currency) | 14 / 20 | 500 / 600 | 0 |

### Spacing scale (4-pt)
4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 96 px.

### Radii
- Pill / button: **fully rounded** (radius = height / 2)
- Card (form): **24 px** (`rounded-3xl`)
- Card (general): **8 px** (`rounded-lg`)
- Input: **12 px** (`rounded-xl`)
- Avatar: **fully rounded** circle

### Shadows
- Card subtle: `0 1px 2px rgba(0,0,0,0.05)`
- Form card (sign-up): `0 8px 40px -12px rgba(29,78,216,0.18)` — PowerDon-blue glow
- Hover lift on pill: `0 4px 12px rgba(0,0,0,0.08)`

### Grid & breakpoints
- Container max-width: **1152 px** (`max-w-6xl`)
- Gutter: 24 px mobile, 48 px desktop
- Breakpoints: `sm 640`, `md 768`, `lg 1024`, `xl 1280`

---

## 2. Sign-up page (`/affiliate/signup`)

### Layout
Two equal columns on `lg+`, stacks on mobile. Min height = viewport − header (≈ 112 px).

**Left — Pitch panel**
- Background: linear gradient 135° `blue-50 → blue-100/70 → white`
- Decorative isometric SVG bottom-right, 520 × 520 px, opacity 60 %, blue stops `#93c5fd → #1d4ed8`
- Content max-width 576 px, padding 64 px desktop / 48 px mobile

**Right — Sign-up card**
- Background: `blue-50/40`
- Card: `blue-100/60`, radius 24 px, padding 40 px, max-width 448 px, shadow as above

### Pitch content (EN)
- Logo: `/images/powerdon-logo-black.png` — height 32 px
- H1: **PowerDon Affiliate Program** — 36 px semibold
- Numbered steps (16 px between):
  1. 📝  **1. Apply** — "It only takes a minute to join — fill out the form and our partner team will reach out within 48 hours."
  2. 🔗  **2. Connect events & brands** — "Get your personal affiliate code and start introducing festivals, venues, and brands to PowerDon's charging stations and LED ad network."
  3. 💸  **3. Earn on every rental** — "Earn up to **22 % commission** on every power bank rental at your events, plus a share of advertising revenue." Highlight: *"No caps. No expiration. Real, recurring income."*
- Footer link: "For more info, click here →" — opens `/documents/powerdon-affiliate-memorandum.pdf` in a new tab.

### Pitch content (NL)
- H1: **PowerDon Affiliate Program**
  1. 📝 **1. Meld je aan** — "Het kost maar een minuut — vul het formulier in en ons partnerteam neemt binnen 48 uur contact met je op."
  2. 🔗 **2. Verbind evenementen & merken** — "Ontvang je persoonlijke affiliate-code en introduceer festivals, locaties en merken bij PowerDon's laad- en LED-advertentienetwerk."
  3. 💸 **3. Verdien op elke verhuring** — "Verdien tot **22 % commissie** op elke powerbank-verhuring op jouw evenementen, plus een deel van de advertentie-omzet." Highlight: *"Geen plafond. Geen einddatum. Echte, terugkerende inkomsten."*
- Footer link: "Meer weten? Klik hier →"

### Form (top → bottom)
- Heading: **Sign Up** / **Aanmelden** — 24 px semibold, centred
- **Continue with Google** white pill (full width, 48 px tall, soft shadow, Google "G" logo 20 × 20)
- "OR" divider — caps, 11 px, `gray-400`, with `blue-200` hairlines
- 2-col grid: **First Name** / **Last Name** (placeholders "John" / "Doe")
- **Email** (placeholder "Enter your email")
- **Password** (placeholder "Enter your password", min 8 chars)
- **Phone Number** (placeholder "+31 6 1234 5678")
- Inputs: 44 px tall, white, `blue-200` border, 12 px radius
- Required `*` glyph in `blue-700`
- Checkboxes (checked = `blue-600`, border `blue-300`):
  - "Receive notifications"
  - "I agree to **affiliate terms & conditions** *" (link to `/terms`)
- Primary CTA: **Sign Up** — full-width pill, 48 px, `blue-600` / hover `blue-700` / disabled `blue-300`
- Footer link: "Already have an account? **Sign In**" — centred 12 px

### States
- Default, focus (`ring-2 ring-blue-200`), error (`text-red-600`, `border-red-300`), disabled (CTA `blue-300`)
- Submitting: button label changes to "Creating account…"
- Success: card replaced by centred message:
  - H2: "You're in!" / "Je bent erbij!"
  - Body description (see EN/NL strings)
  - Pill CTA back to dashboard

### Mobile rules
- Columns stack
- Left panel padding 24 px sides, 48 px top/bottom
- Right column padding 24 px sides
- Form card padding 24 px, radius unchanged
- Steps stay numbered but emoji can scale down to 18 px

---

## 3. Dashboard (`/affiliate`)

Page bg: vertical gradient `white → gray-50 → gray-100`. Container `max-w-6xl`, padding 24 px sides, 48 px top (under fixed header).

### 3.1 Hero
- Badge pill: caps text 10 px, `text-blue-700 / bg-blue-50 / border-blue-200` — content: "AFFILIATE DASHBOARD"
- H1: "Track your events, brands & commissions" — 48 px light
- Sub: 16 px `gray-600`, max-width 768 px

### 3.2 Identity card
- White card, `gray-200` border, `shadow-sm`
- Avatar circle 56 px, `black` bg, white initials (font-semibold 18 px)
- Stack: caps label "Viewing dashboard for" / Name 20 px semibold / Email 14 px `gray-500`
- Right side: affiliate switcher Select (white, 40 px tall, full width on mobile / 256 px on `md+`), followed by 12 px micro line:
  - "Referral code **MILAGROOT**" — mono semibold
  - "Joined February 14, 2024"

### 3.3 Stat grid — 4 cards (2 × 2 mobile, 1 × 4 desktop)
Each card: white, `gray-200` border, 20 px padding, 16 px gap; icon tile 36 × 36 `bg-blue-50 text-blue-700 rounded-md`; label caps 12 px `gray-500`; value 24 px semibold.

| Icon | Label | Sample |
|---|---|---|
| Calendar | Active & upcoming events | 3 |
| Handshake | Brand partnerships | 2 |
| Zap | Total power bank rentals | 5,850 |
| TrendingUp | Estimated commission earned | €6,288 |

### 3.4 Tabs
Tab list: pill bar `bg-gray-100`, 4 px padding, 6 px radius. Active tab: white bg, soft shadow, `gray-900` text. Three tabs:
1. Events & Brands
2. Email Threads
3. Payouts

### 3.5 Events table (Tab 1)
- Wrapped in white card with `gray-200` border
- Header: "Events you are powering" + 14 px description
- Table columns (mobile: horizontal scroll):

| Col | Style |
|---|---|
| Event | Name 14 px medium + location 12 px `gray-500` with map-pin icon |
| Date | 14 px `gray-700` |
| Brand | 14 px `gray-700` |
| Rentals | Mono right-aligned |
| Rental price | Mono right-aligned |
| **Your %** | Pill `bg-blue-600 text-white` semibold |
| Est. earnings | Mono right-aligned semibold `gray-900` |
| Status | Caps pill (emerald/blue/gray per status) |

### 3.6 Brand partnership cards (Tab 1, below table)
Grid 1 / 2 / 3 cols by breakpoint. Each card: white, `gray-200` border, 20 px padding, hover border `blue-300`. Name semibold + industry caps 12 px + 14 px description.

### 3.7 Email threads (Tab 2)
Two-column split `340 px | 1fr` on `lg+`, stacked on mobile.

**Left list card**
- Caps header "Conversations"
- Items: subject (14 px medium 2-line clamp) / organiser (12 px `gray-500`) / preview (12 px `gray-400` 1-line clamp) / micro timestamp
- Active item: `bg-blue-50/60`
- Status pill aligned right (emerald/amber/gray per status)

**Right detail card**
- Header: subject 18 px semibold + "Event: {name}" + status pill, then 2-col participant block (Affiliate / Organiser)
- Message list: role pill (blue=affiliate, purple=organiser) + author + email + timestamp; body 14 px whitespace-pre
- Composer: textarea 4 rows + disclaimer 12 px `gray-400` + primary button `bg-black hover:bg-gray-800` (admin-only: not transmitted)

### 3.8 Payouts (Tab 3)
Outer panel: gradient `blue-50/70 → blue-50/40 → white`, radius 16 px, padding 24 / 40 px.

- H2 "Payouts" 24 px semibold

**Two cards side-by-side (`md:grid-cols-2`)**
- Both: `border-blue-200`, `bg-white/80`
- "Payout terms" — heading 14 px semibold, "Monthly / Net-7" 14 px semibold `gray-700`, body "This month's commission will be paid next month on the 7th if the payout amount is over €50."
- "Selected payout method" — heading + outline pill **"+ Set Payout Method"** (`border-blue-300 text-blue-700 hover:bg-blue-50`) + label "No payout method set". After saving: button label becomes **"Change"**, label becomes e.g. "Payouts will be sent to you@paypal.com via PayPal."

**Filter pill** — 36 × 36 circle, white, `blue-200` border, list-filter icon

**Empty state** — centred:
- 80 × 80 circle, `bg-blue-50`, receipt icon (`blue-400`, stroke 1.5)
- "Payouts" 16 px semibold
- "You do not have any payouts yet." 14 px `gray-500`

**Set Payout Method dialog**
- 448 px max-width modal, radius 24 px, gradient `blue-50 → white`, padding 32 px
- Top: "Go Back" link with arrow (12 px, `blue-700`)
- Title centred: "Select a payout method" — 24 px semibold
- Two stacked options (white, 16 px radius, `blue-200` border, hover `blue-300`, active `blue-500` + 2 px `blue-100` ring):
  - PayPal icon (#003087) + label
  - Bank landmark icon (`blue-700`) + label
- Contextual input appears after select (PayPal email or IBAN)
- Footer: outline pill "Go Back" + primary pill "Add" (`bg-blue-600` / disabled `bg-blue-200`)

---

## 4. Mobile design directions (for the designer)

1. **Sign-up:** keep card padding at 24 px and the Sign-Up CTA pinned in a sticky bottom bar (safe-area inset). Move "Continue with Google" above the form so it's always visible without scrolling.
2. **Dashboard hero & identity:** combine into a single stacked block. Move the affiliate switcher into a sheet triggered from the avatar.
3. **Stat grid:** 2 × 2 on mobile, swipeable carousel optional.
4. **Events table:** convert each row to a card (Event title + location, then a 2-col stat grid: Rentals / Commission / Earnings / Status). Keep the commission % as a coloured chip top-right.
5. **Email threads:** master/detail navigation — list is the default mobile view, tap opens detail full-screen with a back arrow. Composer becomes a sticky bottom input.
6. **Payouts:** stack the two cards vertically; keep the empty state centred. The "Select a payout method" modal becomes a bottom sheet.

---

## 5. Assets the designer needs

| Asset | Path in repo | Notes |
|---|---|---|
| Black logo | `/images/powerdon-logo-black.png` | Used on sign-up & dashboard header |
| White logo | `/images/powerdon-logo-white.png` | Footer |
| Affiliate memorandum (PDF) | `/documents/powerdon-affiliate-memorandum.pdf` | Linked from sign-up |
| Google "G" mark | `react-icons/fc` (`FcGoogle`) | Vector — export as SVG from live preview |
| PayPal mark | `react-icons/fa` (`FaPaypal`) | Vector — `#003087` |
| Bank icon | `lucide-react` (`Landmark`) | Stroke 1.5, `blue-700` |
| Status / category icons | `lucide-react` (Calendar, Handshake, Zap, TrendingUp, MapPin, ListFilter, ReceiptText) | Stroke 2 default |

---

## 6. Copy (use these strings verbatim)

All EN strings live in `lib/i18n/messages/en.ts` under `affiliate.*`. All NL strings live in `locales/nl/affiliate.json`. The designer can copy / paste from those files directly so the Figma file matches production word-for-word.

---

## 7. Recommended Figma file structure

```
PowerDon — Affiliate (cover)
├── 00 Foundations
│   ├── Colour styles (blue-* + gray-* + status + role)
│   ├── Text styles (Display / H2 / H3 / Body / Body-sm / Caption / Micro / Mono)
│   └── Effects (shadow-sm, form-glow, hover-lift)
├── 01 Components
│   ├── Button — primary / outline / google / disabled (states)
│   ├── Input — default / focus / error / filled
│   ├── Checkbox
│   ├── Tabs
│   ├── Card (form / dashboard / payouts)
│   ├── Avatar
│   ├── Stat tile
│   ├── Pill — status / commission / role / hero badge
│   ├── Table row
│   ├── Thread list item
│   ├── Message bubble
│   └── Method option
├── 02 Sign-up
│   ├── Desktop 1440
│   ├── Tablet 768
│   ├── Mobile 390
│   └── Success state
├── 03 Dashboard
│   ├── Desktop — Events & Brands tab
│   ├── Desktop — Email Threads tab
│   ├── Desktop — Payouts tab (incl. modal)
│   ├── Mobile — each tab
│   └── Empty / loading states
└── 04 Localisation (NL frames mirroring 02 + 03)
```

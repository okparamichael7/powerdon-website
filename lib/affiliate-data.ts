export type AffiliateEvent = {
  id: string;
  name: string;
  date: string;
  location: string;
  brandId: string;
  rentals: number;
  rentalPrice: number;
  commissionPercent: number;
  status: "upcoming" | "active" | "completed";
};

export type AffiliateBrand = {
  id: string;
  name: string;
  logo: string;
  industry: string;
  description: string;
};

export type ThreadMessage = {
  id: string;
  from: "affiliate" | "organiser";
  authorName: string;
  authorEmail: string;
  sentAt: string;
  body: string;
};

export type EmailThread = {
  id: string;
  subject: string;
  affiliateId: string;
  affiliateName: string;
  organiserName: string;
  organiserEmail: string;
  eventId: string;
  eventName: string;
  status: "open" | "awaiting-reply" | "closed";
  lastActivityAt: string;
  messages: ThreadMessage[];
};

export type Affiliate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedAt: string;
  avatarInitials: string;
  referralCode: string;
  eventIds: string[];
  brandIds: string[];
};

export const brands: AffiliateBrand[] = [
  {
    id: "brand-heineken",
    name: "Heineken",
    logo: "/images/powerdon-logo-black.png",
    industry: "Beverages",
    description:
      "Premium lager sponsoring music festivals across the Benelux.",
  },
  {
    id: "brand-klm",
    name: "KLM",
    logo: "/images/powerdon-logo-black.png",
    industry: "Aviation",
    description: "Dutch flag carrier running a summer travel campaign.",
  },
  {
    id: "brand-ing",
    name: "ING",
    logo: "/images/powerdon-logo-black.png",
    industry: "Finance",
    description:
      "Retail banking campaign targeting young professionals at urban events.",
  },
  {
    id: "brand-bolt",
    name: "Bolt",
    logo: "/images/powerdon-logo-black.png",
    industry: "Mobility",
    description: "Ride-hailing and scooter brand activating at city events.",
  },
];

export const events: AffiliateEvent[] = [
  {
    id: "event-awakenings",
    name: "Awakenings Festival",
    date: "2026-06-27",
    location: "Spaarnwoude, NL",
    brandId: "brand-heineken",
    rentals: 1240,
    rentalPrice: 6,
    commissionPercent: 18,
    status: "upcoming",
  },
  {
    id: "event-mysteryland",
    name: "Mysteryland",
    date: "2026-08-22",
    location: "Haarlemmermeer, NL",
    brandId: "brand-heineken",
    rentals: 980,
    rentalPrice: 6,
    commissionPercent: 15,
    status: "upcoming",
  },
  {
    id: "event-amsterdam-dance",
    name: "Amsterdam Dance Event",
    date: "2026-10-17",
    location: "Amsterdam, NL",
    brandId: "brand-bolt",
    rentals: 2150,
    rentalPrice: 7,
    commissionPercent: 20,
    status: "upcoming",
  },
  {
    id: "event-kingsday-rdam",
    name: "Kingsday Rotterdam",
    date: "2026-04-27",
    location: "Rotterdam, NL",
    brandId: "brand-ing",
    rentals: 1620,
    rentalPrice: 5,
    commissionPercent: 22,
    status: "active",
  },
  {
    id: "event-pinkpop",
    name: "Pinkpop",
    date: "2025-06-14",
    location: "Landgraaf, NL",
    brandId: "brand-heineken",
    rentals: 1480,
    rentalPrice: 6,
    commissionPercent: 16,
    status: "completed",
  },
  {
    id: "event-mojo-trade",
    name: "Mojo Trade Fair",
    date: "2025-11-03",
    location: "Utrecht, NL",
    brandId: "brand-klm",
    rentals: 410,
    rentalPrice: 5,
    commissionPercent: 12,
    status: "completed",
  },
];

export const affiliates: Affiliate[] = [
  {
    id: "aff-mila",
    name: "Mila de Groot",
    email: "mila@hypeagency.nl",
    phone: "+31 6 24 55 21 90",
    joinedAt: "2024-02-14",
    avatarInitials: "MG",
    referralCode: "MILAGROOT",
    eventIds: [
      "event-awakenings",
      "event-mysteryland",
      "event-amsterdam-dance",
      "event-pinkpop",
    ],
    brandIds: ["brand-heineken", "brand-bolt"],
  },
  {
    id: "aff-thijs",
    name: "Thijs van Leeuwen",
    email: "thijs@leeuwenmedia.nl",
    phone: "+31 6 18 34 07 22",
    joinedAt: "2023-09-08",
    avatarInitials: "TL",
    referralCode: "THIJSVL",
    eventIds: ["event-kingsday-rdam", "event-mojo-trade"],
    brandIds: ["brand-ing", "brand-klm"],
  },
  {
    id: "aff-sara",
    name: "Sara El Amrani",
    email: "sara@nextwave.partners",
    phone: "+31 6 47 12 88 05",
    joinedAt: "2025-01-03",
    avatarInitials: "SA",
    referralCode: "SARAEA",
    eventIds: ["event-mysteryland", "event-amsterdam-dance"],
    brandIds: ["brand-heineken", "brand-bolt"],
  },
];

export const emailThreads: EmailThread[] = [
  {
    id: "thread-awakenings-stations",
    subject: "Station placement for Awakenings main stage",
    affiliateId: "aff-mila",
    affiliateName: "Mila de Groot",
    organiserName: "Lars Berends — Monumental",
    organiserEmail: "lars@monumental.events",
    eventId: "event-awakenings",
    eventName: "Awakenings Festival",
    status: "awaiting-reply",
    lastActivityAt: "2026-04-18T15:42:00Z",
    messages: [
      {
        id: "msg-1",
        from: "affiliate",
        authorName: "Mila de Groot",
        authorEmail: "mila@hypeagency.nl",
        sentAt: "2026-04-16T09:12:00Z",
        body: "Hi Lars,\n\nKicking off the Awakenings prep. We are penciling in 14 PowerDon stations: 4 near the main stage, 4 at the food court, and the rest spread across secondary stages. Could you confirm the final footprint so we can lock logistics?\n\nBest,\nMila",
      },
      {
        id: "msg-2",
        from: "organiser",
        authorName: "Lars Berends",
        authorEmail: "lars@monumental.events",
        sentAt: "2026-04-17T11:30:00Z",
        body: "Hi Mila,\n\nFootprint looks good. One request: can we add two stations at the VIP deck? Heineken would like to wrap those with their new visual.\n\nCheers,\nLars",
      },
      {
        id: "msg-3",
        from: "affiliate",
        authorName: "Mila de Groot",
        authorEmail: "mila@hypeagency.nl",
        sentAt: "2026-04-18T15:42:00Z",
        body: "Done — 16 stations total. I will send the station wrap artwork proof tomorrow for Heineken sign-off.\n\nCan you confirm the revenue split remains 18% on rentals for the whole event? Just want it in writing before we print.",
      },
    ],
  },
  {
    id: "thread-kingsday-payout",
    subject: "Kingsday payout schedule + rental numbers",
    affiliateId: "aff-thijs",
    affiliateName: "Thijs van Leeuwen",
    organiserName: "Eva Jansen — City of Rotterdam",
    organiserEmail: "evajansen@rotterdam.nl",
    eventId: "event-kingsday-rdam",
    eventName: "Kingsday Rotterdam",
    status: "open",
    lastActivityAt: "2026-04-19T08:05:00Z",
    messages: [
      {
        id: "msg-1",
        from: "organiser",
        authorName: "Eva Jansen",
        authorEmail: "evajansen@rotterdam.nl",
        sentAt: "2026-04-15T14:22:00Z",
        body: "Hi Thijs,\n\nWe expect rentals to peak on the 27th between 14:00 and 22:00. ING is keen to see a station on the Erasmus bridge as well. Any constraints?",
      },
      {
        id: "msg-2",
        from: "affiliate",
        authorName: "Thijs van Leeuwen",
        authorEmail: "thijs@leeuwenmedia.nl",
        sentAt: "2026-04-19T08:05:00Z",
        body: "Hi Eva,\n\nBridge placement is approved by PowerDon ops. On the commercial side: my contract shows 22% on rentals for Kingsday. Payout within 14 days after event close. Can you confirm the same on your end so I can send the PO?",
      },
    ],
  },
  {
    id: "thread-ade-branding",
    subject: "Bolt branding assets for ADE takeover",
    affiliateId: "aff-sara",
    affiliateName: "Sara El Amrani",
    organiserName: "Tom Visser — ADE",
    organiserEmail: "tom@ade.nl",
    eventId: "event-amsterdam-dance",
    eventName: "Amsterdam Dance Event",
    status: "open",
    lastActivityAt: "2026-04-14T17:10:00Z",
    messages: [
      {
        id: "msg-1",
        from: "affiliate",
        authorName: "Sara El Amrani",
        authorEmail: "sara@nextwave.partners",
        sentAt: "2026-04-10T10:00:00Z",
        body: "Hi Tom,\n\nSharing Bolt's creative package for the ADE station wraps. They want the primary green on the front display and a rotating 15s video during peak charging hours.",
      },
      {
        id: "msg-2",
        from: "organiser",
        authorName: "Tom Visser",
        authorEmail: "tom@ade.nl",
        sentAt: "2026-04-14T17:10:00Z",
        body: "Looks great. Let's do a creative review next week. Also: confirming the 20% affiliate commission on station rentals stays on file for ADE 2026.",
      },
    ],
  },
  {
    id: "thread-mysteryland-ops",
    subject: "Re: Logistics + rental forecast Mysteryland",
    affiliateId: "aff-mila",
    affiliateName: "Mila de Groot",
    organiserName: "Noa Bakker — ID&T",
    organiserEmail: "noa@id-t.com",
    eventId: "event-mysteryland",
    eventName: "Mysteryland",
    status: "closed",
    lastActivityAt: "2026-03-22T13:45:00Z",
    messages: [
      {
        id: "msg-1",
        from: "organiser",
        authorName: "Noa Bakker",
        authorEmail: "noa@id-t.com",
        sentAt: "2026-03-20T09:10:00Z",
        body: "Hi Mila, forecast is 12k-15k attendees on Saturday. We want 20 stations minimum. Can PowerDon commit?",
      },
      {
        id: "msg-2",
        from: "affiliate",
        authorName: "Mila de Groot",
        authorEmail: "mila@hypeagency.nl",
        sentAt: "2026-03-22T13:45:00Z",
        body: "Confirmed 22 stations. 15% commission on rentals as discussed. Closing this thread — ops take it from here.",
      },
    ],
  },
];

export function getBrandById(id: string) {
  return brands.find((brand) => brand.id === id);
}

export function getEventById(id: string) {
  return events.find((event) => event.id === id);
}

export function getAffiliateEvents(affiliateId: string) {
  const affiliate = affiliates.find((item) => item.id === affiliateId);
  if (!affiliate) {
    return [];
  }
  return events.filter((event) => affiliate.eventIds.includes(event.id));
}

export function getAffiliateBrands(affiliateId: string) {
  const affiliate = affiliates.find((item) => item.id === affiliateId);
  if (!affiliate) {
    return [];
  }
  return brands.filter((brand) => affiliate.brandIds.includes(brand.id));
}

export function getAffiliateThreads(affiliateId: string) {
  return emailThreads.filter((thread) => thread.affiliateId === affiliateId);
}

export function estimateEventEarnings(event: AffiliateEvent) {
  return event.rentals * event.rentalPrice * (event.commissionPercent / 100);
}

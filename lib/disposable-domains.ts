const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "throwawaymail.com",
  "yopmail.com",
  "sharklasers.com",
  "getnada.com",
  "maildrop.cc",
  "trashmail.com",
  "fakeinbox.com",
  "dispostable.com",
  "mintemail.com",
  "mytemp.email",
  "tempinbox.com",
  "spamgourmet.com",
  "mailnesia.com",
  "emailondeck.com",
  "burnermail.io",
]);

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "live.nl",
  "hotmail.nl",
  "yahoo.com",
  "icloud.com",
  "ziggo.nl",
  "kpnmail.nl",
]);

function extractDomain(email: string): string {
  return email.trim().toLowerCase().split("@")[1] ?? "";
}

export function isDisposableEmail(email: string): boolean {
  return DISPOSABLE_DOMAINS.has(extractDomain(email));
}

export function isFreeEmailDomain(email: string): boolean {
  return FREE_EMAIL_DOMAINS.has(extractDomain(email));
}
